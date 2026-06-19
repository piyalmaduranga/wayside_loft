"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck, faDownload, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

function ICalExport({ room }) {
  const [copied, setCopied] = useState(false);
  const [feedUrl, setFeedUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setFeedUrl(`${origin}/api/rooms/${room.slug}/ical`);
    }
  }, [room.slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="py-8 text-left">
      <h3 className="font-serif text-2xl font-semibold text-ink mb-4">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-brand" />
        Calendar Integration (iCal)
      </h3>
      <p className="text-sm text-ink-muted mb-6 max-w-2xl leading-relaxed">
        Sync this room's real-time reservations with external platforms like Airbnb, Booking.com, Google Calendar, or Apple Calendar. Import the URL feed below to keep calendars synchronized automatically.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch max-w-2xl">
        <div className="relative flex-grow">
          <input
            type="text"
            readOnly
            value={feedUrl}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-border text-sm text-ink px-4 py-3 rounded-md pr-12 focus:outline-none select-all font-mono"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-md text-sm font-semibold transition-all duration-300 w-full sm:w-auto cursor-pointer ${
              copied
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white"
            }`}
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-4 h-4" />
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
          <a
            href={`/api/rooms/${room.slug}/ical`}
            download={`${room.slug}-calendar.ics`}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold transition-all duration-300 w-full sm:w-auto cursor-pointer"
          >
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ICalExport;
