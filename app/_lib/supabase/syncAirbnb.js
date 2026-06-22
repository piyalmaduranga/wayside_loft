import { getRiskySupabaseClient } from "./supabaseRiskyClient";

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
  if (val && val.length >= 8) {
    const year = val.substring(0, 4);
    const month = val.substring(4, 6);
    const day = val.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  return null;
}

export async function syncAirbnbForRoom(roomId) {
  const supabase = getRiskySupabaseClient();

  // 1. Fetch room
  const { data: room, error: roomErr } = await supabase
    .from("rooms")
    .select("id, name, airbnb_ical_url")
    .eq("id", roomId)
    .single();

  if (roomErr || !room) {
    return { success: false, error: roomErr?.message || "Room not found" };
  }

  if (!room.airbnb_ical_url || room.airbnb_ical_url.trim() === "") {
    return { success: true, message: "No Airbnb iCal URL configured for this room.", totalEvents: 0 };
  }

  // 2. Get or create Airbnb Dummy Guest
  let dummyGuestId = null;
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

  // 3. Sync iCal URLs
  const urls = room.airbnb_ical_url
    .split(/[\s,;\n\r]+/)
    .map((u) => u.trim())
    .filter((u) => u.startsWith("http://") || u.startsWith("https://"));

  if (urls.length === 0) {
    return { success: false, error: "No valid URLs found in configuration" };
  }

  const events = [];
  const failedUrls = [];

  for (const url of urls) {
    try {
      const icsRes = await fetch(url, { cache: "no-store" });
      if (!icsRes.ok) {
        failedUrls.push({ url, error: `Status ${icsRes.status}` });
        continue;
      }
      const icsText = await icsRes.text();
      const parsed = parseICS(icsText);
      events.push(...parsed);
    } catch (err) {
      failedUrls.push({ url, error: err.message });
    }
  }

  // If ALL urls failed, abort so we don't accidentally delete existing blocks
  if (failedUrls.length === urls.length) {
    return { success: false, error: `Failed to fetch all feeds: ${failedUrls.map(f => f.error).join(", ")}` };
  }

  // Fetch existing Airbnb bookings in DB for this room
  const { data: dbReservations, error: dbErr } = await supabase
    .from("reservations")
    .select("*")
    .eq("room_id", room.id)
    .not("external_uid", "is", null);

  if (dbErr) throw dbErr;

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

  return {
    success: true,
    inserted,
    updated,
    deleted,
    totalEvents: events.length,
    failedUrls: failedUrls.length > 0 ? failedUrls : null
  };
}
