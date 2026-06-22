import { getRiskySupabaseClient } from "@/app/_lib/supabase/supabaseRiskyClient";
import { syncAirbnbForRoom } from "@/app/_lib/supabase/syncAirbnb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  const secretKey = process.env.SYNC_SECRET_KEY || "wayside_sync_secret";

  if (key !== secretKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getRiskySupabaseClient();

  // 1. Fetch rooms
  let rooms = [];
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("id, name, airbnb_ical_url");

    if (error) {
      if (error.message.includes("column rooms.airbnb_ical_url does not exist") || error.message.includes("column \"airbnb_ical_url\" does not exist")) {
        return NextResponse.json(
          {
            error: "Database schema incomplete. Please run: 'ALTER TABLE rooms ADD COLUMN airbnb_ical_url TEXT;' in your Supabase SQL Editor.",
          },
          { status: 400 }
        );
      }
      throw error;
    }
    rooms = data || [];
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch rooms: " + err.message }, { status: 500 });
  }

  // Filter only rooms that have an Airbnb iCal URL configured
  const roomsToSync = rooms.filter(
    (room) => room.airbnb_ical_url && room.airbnb_ical_url.trim() !== ""
  );

  if (roomsToSync.length === 0) {
    return NextResponse.json({ message: "No rooms configured with an Airbnb iCal URL to sync." });
  }

  const results = [];

  // 2. Sync each room
  for (const room of roomsToSync) {
    try {
      const syncResult = await syncAirbnbForRoom(room.id);
      if (syncResult.success) {
        // Reset the in-memory cache for this room since we just did a manual full sync
        if (global.airbnbSyncCache) {
          global.airbnbSyncCache[room.id] = Date.now();
        }
        results.push({
          room: room.name,
          success: true,
          inserted: syncResult.inserted,
          updated: syncResult.updated,
          deleted: syncResult.deleted,
          totalEvents: syncResult.totalEvents,
          failedUrls: syncResult.failedUrls,
        });
      } else {
        results.push({
          room: room.name,
          success: false,
          error: syncResult.error,
        });
      }
    } catch (roomErr) {
      results.push({ room: room.name, success: false, error: roomErr.message });
    }
  }

  return NextResponse.json({ success: true, results });
}
