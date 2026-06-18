import { getRiskySupabaseClient } from "@/app/_lib/supabase/supabaseRiskyClient";
import { NextResponse } from "next/server";

// Simple, lightweight, dependency-free iCal ICS parser
function parseICS(icsText) {
  const events = [];
  const lines = icsText.split(/\r?\n/);
  let currentEvent = null;

  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine === "BEGIN:VEVENT") {
      currentEvent = {};
    } else if (cleanLine === "END:VEVENT") {
      if (currentEvent && currentEvent.start && currentEvent.end && currentEvent.uid) {
        events.push(currentEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      const parts = cleanLine.split(":");
      if (parts.length >= 2) {
        const keyPart = parts[0];
        const val = parts.slice(1).join(":");

        if (keyPart.startsWith("DTSTART")) {
          currentEvent.start = parseICSDate(val);
        } else if (keyPart.startsWith("DTEND")) {
          currentEvent.end = parseICSDate(val);
        } else if (keyPart.startsWith("UID")) {
          currentEvent.uid = val;
        } else if (keyPart.startsWith("SUMMARY")) {
          currentEvent.summary = val;
        }
      }
    }
  }
  return events;
}

function parseICSDate(val) {
  // val can be "20260616" or "20260616T120000Z"
  if (val && val.length >= 8) {
    const year = val.substring(0, 4);
    const month = val.substring(4, 6);
    const day = val.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  return null;
}

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

  // Filter only rooms that have an airbnb_ical_url configured
  const roomsToSync = rooms.filter(
    (room) => room.airbnb_ical_url && room.airbnb_ical_url.trim() !== ""
  );

  if (roomsToSync.length === 0) {
    return NextResponse.json({ message: "No rooms configured with an Airbnb iCal URL to sync." });
  }

  // 2. Get or create Airbnb Dummy Guest
  let dummyGuestId = null;
  try {
    const { data: guest, error: guestErr } = await supabase
      .from("guests")
      .select("id")
      .eq("email", "airbnb-sync@waysideloft.com")
      .maybeSingle();

    if (guestErr) throw guestErr;

    if (guest) {
      dummyGuestId = guest.id;
    } else {
      const { data: newGuest, error: createErr } = await supabase
        .from("guests")
        .insert({
          fullname: "Airbnb Sync Service",
          email: "airbnb-sync@waysideloft.com",
          phone: "0000000000",
          nationality: "Airbnb",
          countryFlag: "https://flagcdn.com/us.svg",
          nationalID: "AIRBNB-SYNC",
        })
        .select("id")
        .single();

      if (createErr) throw createErr;
      dummyGuestId = newGuest.id;
    }
  } catch (err) {
    return NextResponse.json({ error: "Failed to resolve sync guest: " + err.message }, { status: 500 });
  }

  const results = [];

  // 3. Sync each room
  for (const room of roomsToSync) {
    try {
      // Fetch the iCal feed
      const icsRes = await fetch(room.airbnb_ical_url);
      if (!icsRes.ok) {
        results.push({ room: room.name, success: false, error: `Failed to fetch iCal feed (status ${icsRes.status})` });
        continue;
      }
      const icsText = await icsRes.text();

      // Parse current feed events
      const events = parseICS(icsText);

      // Fetch existing Airbnb bookings in DB for this room
      const { data: dbReservations, error: dbErr } = await supabase
        .from("reservations")
        .select("*")
        .eq("room_id", room.id)
        .not("external_uid", "is", null);

      if (dbErr) {
        if (dbErr.message.includes("column reservations.external_uid does not exist") || dbErr.message.includes("column \"external_uid\" does not exist")) {
          return NextResponse.json(
            {
              error: "Database schema incomplete. Please run: 'ALTER TABLE reservations ADD COLUMN external_uid TEXT;' in your Supabase SQL Editor.",
            },
            { status: 400 }
          );
        }
        throw dbErr;
      }

      const activeUids = new Set();
      let inserted = 0;
      let updated = 0;
      let deleted = 0;

      // Reconcile events from Airbnb feed
      for (const event of events) {
        activeUids.add(event.uid);

        const existing = dbReservations?.find((res) => res.external_uid === event.uid);

        if (existing) {
          // Check if dates shifted
          if (existing.start_date !== event.start || existing.end_date !== event.end) {
            const { error: updateErr } = await supabase
              .from("reservations")
              .update({
                start_date: event.start,
                end_date: event.end,
                status: "confirmed",
              })
              .eq("id", existing.id);

            if (updateErr) throw updateErr;
            updated++;
          }
        } else {
          // Insert new reservation block
          const { error: insertErr } = await supabase.from("reservations").insert({
            room_id: room.id,
            guest_id: dummyGuestId,
            guests_count: 1,
            reserved_price: 0,
            start_date: event.start,
            end_date: event.end,
            status: "confirmed",
            external_uid: event.uid,
            message: event.summary || "Airbnb Block",
          });

          if (insertErr) throw insertErr;
          inserted++;
        }
      }

      // Reconcile deleted/cancelled events (exist in DB but not in latest feed)
      const orphanedReservations = dbReservations?.filter((res) => !activeUids.has(res.external_uid)) || [];

      for (const orphan of orphanedReservations) {
        const { error: deleteErr } = await supabase
          .from("reservations")
          .delete()
          .eq("id", orphan.id);

        if (deleteErr) throw deleteErr;
        deleted++;
      }

      results.push({
        room: room.name,
        success: true,
        inserted,
        updated,
        deleted,
        totalEvents: events.length,
      });
    } catch (roomErr) {
      results.push({ room: room.name, success: false, error: roomErr.message });
    }
  }

  return NextResponse.json({ success: true, results });
}
