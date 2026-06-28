import { getRoomById } from "@/app/_lib/supabase/rooms";
import { getRiskySupabaseClient } from "@/app/_lib/supabase/supabaseRiskyClient";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { room_slug } = params;

  try {
    // 1. Fetch room details
    const room = await getRoomById(room_slug);
    if (!room) {
      return new Response("Room not found", { status: 404 });
    }

    // 2. Fetch all active reservations for the room
    const { data: reservations, error } = await getRiskySupabaseClient()
      .from("reservations")
      .select("*")
      .eq("room_id", room.id)
      .neq("status", "cancelled")
      .is("deleted_at", null);

    if (error) {
      console.error(`Error fetching reservations for room ${room.id}:`, error);
      return new Response("Internal Server Error", { status: 500 });
    }

    // 3. Build iCal content matching RFC 5545 specifications
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wayside Loft//NONSGML Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    const formatDateTime = (dateStr) => {
      try {
        if (!dateStr) throw new Error("No date provided");
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) throw new Error("Invalid date");
        return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      } catch (err) {
        return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      }
    };

    const cleanDateStr = (dateStr) => {
      if (!dateStr) return "";
      return dateStr.split(" ")[0].split("T")[0].replace(/-/g, "");
    };

    reservations?.forEach((res) => {
      const start = cleanDateStr(res.start_date);
      const end = cleanDateStr(res.end_date);
      const uid = res.external_uid || `res_${res.id}@waysideloft.com`;
      const stamp = formatDateTime(res.created_at);

      icsLines.push("BEGIN:VEVENT");
      icsLines.push(`UID:${uid}`);
      icsLines.push(`DTSTAMP:${stamp}`);
      icsLines.push(`DTSTART;VALUE=DATE:${start}`);
      icsLines.push(`DTEND;VALUE=DATE:${end}`);
      icsLines.push(`SUMMARY:Wayside Loft Booking #${res.id}`);
      icsLines.push(`DESCRIPTION:Guests: ${res.guests_count}`);
      icsLines.push("LOCATION:Wayside Loft, Mirissa, Sri Lanka");
      icsLines.push("END:VEVENT");
    });

    icsLines.push("END:VCALENDAR");

    // Fold lines to 75 characters max according to RFC 5545 folding rule
    const foldLine = (line) => {
      if (line.length <= 75) return line;
      let folded = line.substring(0, 75);
      let remaining = line.substring(75);
      while (remaining.length > 0) {
        folded += "\r\n " + remaining.substring(0, 74);
        remaining = remaining.substring(74);
      }
      return folded;
    };

    const foldedLines = icsLines.map(foldLine);

    // Joining with CRLF (\r\n) and ensuring a trailing CRLF at the end
    const icsContent = foldedLines.join("\r\n") + "\r\n";

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${room_slug}-calendar.ics"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch (err) {
    console.error("iCal export endpoint error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
