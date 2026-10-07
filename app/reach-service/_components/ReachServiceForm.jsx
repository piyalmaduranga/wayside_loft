"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReachServiceForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    serviceRequirement: "Full Arrival & Concierge Assistance",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate clean form processing
    setTimeout(() => {
      setSubmittedData({ ...formData });
      setStatus("success");
    }, 400);
  };

  // Structured WhatsApp Message as requested by prompt
  const buildWhatsAppUrl = (data) => {
    const rawMessage = `Hello Wayside Loft,

I would like to request the Reach Service.

Name: ${data.fullname || "N/A"}
Date: ${data.date || "N/A"}
Time: ${data.time || "N/A"}
Guests: ${data.guests || "N/A"}
Requirement: ${data.serviceRequirement || "N/A"}

Additional details:
${data.message || "None"}

Please let me know the availability and next steps.

Thank you.`;

    return `https://wa.me/94760087674?text=${encodeURIComponent(rawMessage)}`;
  };

  if (status === "success" && submittedData) {
    const whatsappUrl = buildWhatsAppUrl(submittedData);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#C4A87A]/30 shadow-md space-y-6 animate-fadeIn">
        <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50/80 px-4 py-3 rounded-2xl border border-emerald-200/60">
          <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-serif font-semibold text-base text-[#1A1815]">Request Received</h4>
            <p className="text-xs text-[#6C6760] font-sans">Thank you for your request. Our team will review the details and get back to you shortly.</p>
          </div>
        </div>

        {/* Request Summary */}
        <div className="bg-[#FAF9F5] rounded-2xl p-5 border border-border/50 space-y-3 font-sans text-xs sm:text-sm">
          <h5 className="font-serif font-semibold text-sm text-[#1A1815] pb-2 border-b border-border/40">
            Request Summary
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-[#6C6760] block text-[11px] uppercase tracking-wider font-medium">Name</span>
              <span className="text-[#1A1815] font-semibold">{submittedData.fullname}</span>
            </div>
            <div>
              <span className="text-[#6C6760] block text-[11px] uppercase tracking-wider font-medium">Phone / WhatsApp</span>
              <span className="text-[#1A1815] font-semibold">{submittedData.phone}</span>
            </div>
            <div>
              <span className="text-[#6C6760] block text-[11px] uppercase tracking-wider font-medium">Date & Time</span>
              <span className="text-[#1A1815] font-semibold">{submittedData.date} {submittedData.time && `at ${submittedData.time}`}</span>
            </div>
            <div>
              <span className="text-[#6C6760] block text-[11px] uppercase tracking-wider font-medium">Requirement</span>
              <span className="text-[#1A1815] font-semibold">{submittedData.serviceRequirement}</span>
            </div>
          </div>
          {submittedData.message && (
            <div className="pt-2 border-t border-border/30">
              <span className="text-[#6C6760] block text-[11px] uppercase tracking-wider font-medium">Special Request</span>
              <p className="text-[#1A1815] text-xs leading-relaxed italic">{submittedData.message}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.122.942 11.998.942c-5.437 0-9.864 4.371-9.868 9.8.001 1.814.502 3.59 1.451 5.158L2.613 21.33l5.59-1.455c.002-.001.002-.001.044-.021zM17.48 14.65c-.302-.152-1.793-.883-2.073-.984-.282-.102-.487-.152-.692.152-.205.304-.795.984-.974 1.186-.18.203-.36.228-.662.076-1.566-.783-2.584-1.378-3.611-2.148-.82-.618-1.517-1.332-1.929-2.043-.18-.305-.019-.47.132-.621.136-.137.302-.355.454-.533.151-.178.202-.304.302-.508.101-.203.05-.38-.025-.532-.075-.152-.693-1.67-.949-2.28-.25-.6-.525-.52-.722-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.406-.293.324-1.12 1.09-1.12 2.659 0 1.57 1.144 3.09 1.304 3.3 1.6 2.1 3.099 3.2 4.979 3.82.912.3 1.81.35 2.47.25.75-.11 2.29-.93 2.61-1.83.32-.9 0-1.67-.1-1.83-.1-.15-.3-.23-.6-.38z" />
            </svg>
            <span>Continue on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex items-center justify-center py-3.5 px-6 border border-border text-[#6C6760] hover:text-[#1A1815] font-sans text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-black/5 transition-all duration-200"
          >
            Submit Another Request
          </button>
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-[#C4A87A] hover:underline font-sans font-medium">
            ← Return to Wayside Loft Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-border/50 shadow-xs space-y-6">
      <div>
        <h3 className="font-serif font-medium text-2xl text-[#1A1815]">
          Submit Reach Service Request
        </h3>
        <p className="text-xs text-[#6C6760] font-sans mt-1">
          Fill in your details below and our team will review and confirm your Reach Service arrangements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-sans">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
            Full Name <span className="text-amber-600">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            required
            value={formData.fullname}
            onChange={handleChange}
            placeholder="e.g. Sarah Jenkins"
            className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] placeholder-[#B0A99F] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
            Email Address <span className="text-amber-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. sarah@example.com"
            className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] placeholder-[#B0A99F] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all"
          />
        </div>

        {/* WhatsApp / Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
            WhatsApp / Phone Number <span className="text-amber-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +44 7123 456789"
            className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] placeholder-[#B0A99F] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all"
          />
        </div>

        {/* Number of Guests */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
            Number of Guests
          </label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all cursor-pointer"
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5+">5+ Guests</option>
          </select>
        </div>

        {/* Preferred Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
            Preferred Date <span className="text-amber-600">*</span>
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all"
          />
        </div>

        {/* Preferred Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
            Preferred Time / ETA
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all"
          />
        </div>
      </div>

      {/* Service Requirement Option */}
      <div className="space-y-1.5 font-sans">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
          Service Requirement <span className="text-amber-600">*</span>
        </label>
        <select
          name="serviceRequirement"
          value={formData.serviceRequirement}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all cursor-pointer"
        >
          <option value="Full Arrival & Concierge Assistance">Full Arrival & Concierge Assistance</option>
          <option value="Airport / Station Pickup Coordination">Airport / Station Pickup Coordination</option>
          <option value="Luggage & Special Transport">Luggage & Special Transport</option>
          <option value="Pre-Arrival Scooter Setup">Pre-Arrival Scooter Setup</option>
          <option value="Custom Tour & Activity Planning">Custom Tour & Activity Planning</option>
          <option value="Other Special Request">Other Special Request</option>
        </select>
      </div>

      {/* Special Request Message */}
      <div className="space-y-1.5 font-sans">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#6C6760] block">
          Additional Message / Special Request
        </label>
        <textarea
          name="message"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please share any flight numbers, station arrival times, luggage details, or specific preferences..."
          className="w-full px-4 py-3 bg-[#FAF9F5] border border-border/60 rounded-xl text-xs sm:text-sm text-[#1A1815] placeholder-[#B0A99F] focus:outline-none focus:border-[#C4A87A] focus:ring-1 focus:ring-[#C4A87A] transition-all resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 bg-[#C4A87A] hover:bg-[#A8895E] disabled:bg-neutral-300 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm cursor-pointer"
      >
        {status === "submitting" ? "Processing Request..." : "Submit Service Request"}
      </button>
    </form>
  );
}
