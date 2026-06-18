import nodemailer from "nodemailer";
import { getBookingConfirmedHtml, getBookingReceivedHtml, getBookingUpdateHtml, getBookingCancellationHtml } from "./emailTemplates";

/**
 * Creates and returns a configured Nodemailer transporter.
 * Configure SMTP settings in your .env.local file.
 */
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

/**
 * Sends a contact form email notification to the hotel.
 */
export async function sendContactEmail({ fullname, email, phone, message }) {
    const transporter = createTransporter();

    await transporter.sendMail({
        from: `"${fullname}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL,
        replyTo: email,
        cc: process.env.CONTACT_CC_EMAILS || "ishikaushalya@gmail.com",
        subject: `New Contact Message from ${fullname}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a1a2e; border-bottom: 2px solid #c9a96e; padding-bottom: 10px;">
          New Contact Form Submission – Wayside Loft
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #222;">${fullname}</td>
          </tr>
          <tr style="background: #f9f9f9;">
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${email}" style="color: #c9a96e;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 8px 0; color: #222;">${phone || "—"}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
          <div style="background: #f4f4f4; padding: 16px; border-radius: 6px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>

        <p style="margin-top: 24px; font-size: 12px; color: #999;">
          This email was sent from the contact form at Wayside Loft website.
          Reply to this email to respond directly to ${fullname}.
        </p>
      </div>
    `,
    });
}

import { getRiskySupabaseClient } from "./supabase/supabaseRiskyClient";

/**
 * Sends a booking confirmation email to the guest (and CCs the hotel).
 */
export async function sendBookingConfirmationEmail({
    guestName,
    guestEmail,
    roomName,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    bookingId,
}) {
    const transporter = createTransporter();

    // Fetch full details from database to complete template info
    let roomPrice = 0;
    let roomThumbnail = "";
    let roomSleeps = 2;
    try {
        const { data: res, error } = await getRiskySupabaseClient()
            .from("reservations")
            .select("*, rooms(*)")
            .eq("id", bookingId)
            .single();
        if (res?.rooms) {
            roomPrice = res.rooms.price;
            roomThumbnail = res.rooms.thumbnail;
            roomSleeps = res.rooms.sleeps || res.rooms.capacity || 2;
        }
    } catch (dbErr) {
        console.error("[mailer] db fetch failed for confirmation email:", dbErr.message);
    }

    const html = getBookingConfirmedHtml({
        guestName,
        roomName,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        bookingId,
        roomPrice,
        roomThumbnail,
        roomSleeps
    });

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking Confirmed – ${roomName} | Wayside Loft #${String(bookingId).split("-")[0]?.toUpperCase() || bookingId}`,
        html,
    });
}

/**
 * Sends a booking request received email to the guest (and CCs the hotel).
 */
export async function sendBookingReceivedEmail({
    guestName,
    guestEmail,
    roomName,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    bookingId,
}) {
    const transporter = createTransporter();

    // Fetch full details from database to complete template info
    let roomPrice = 0;
    let roomThumbnail = "";
    let roomSleeps = 2;
    try {
        const { data: res, error } = await getRiskySupabaseClient()
            .from("reservations")
            .select("*, rooms(*)")
            .eq("id", bookingId)
            .single();
        if (res?.rooms) {
            roomPrice = res.rooms.price;
            roomThumbnail = res.rooms.thumbnail;
            roomSleeps = res.rooms.sleeps || res.rooms.capacity || 2;
        }
    } catch (dbErr) {
        console.error("[mailer] db fetch failed for received email:", dbErr.message);
    }

    const html = getBookingReceivedHtml({
        guestName,
        roomName,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        bookingId,
        roomPrice,
        roomThumbnail,
        roomSleeps
    });

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking Request Received – ${roomName} | Wayside Loft #${String(bookingId).split("-")[0]?.toUpperCase() || bookingId}`,
        html,
    });
}

/**
 * Sends a booking update email to the guest (and CCs the hotel).
 */
export async function sendBookingUpdateEmail({
    guestName,
    guestEmail,
    roomName,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    bookingId,
}) {
    const transporter = createTransporter();

    // Fetch full details from database to complete template info
    let roomPrice = 0;
    let roomThumbnail = "";
    let roomSleeps = 2;
    try {
        const { data: res, error } = await getRiskySupabaseClient()
            .from("reservations")
            .select("*, rooms(*)")
            .eq("id", bookingId)
            .single();
        if (res?.rooms) {
            roomPrice = res.rooms.price;
            roomThumbnail = res.rooms.thumbnail;
            roomSleeps = res.rooms.sleeps || res.rooms.capacity || 2;
        }
    } catch (dbErr) {
        console.error("[mailer] db fetch failed for update email:", dbErr.message);
    }

    const html = getBookingUpdateHtml({
        guestName,
        roomName,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        bookingId,
        roomPrice,
        roomThumbnail,
        roomSleeps
    });

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking UPDATED – ${roomName} | Wayside Loft #${String(bookingId).split("-")[0]?.toUpperCase() || bookingId}`,
        html,
    });
}

/**
 * Sends a booking cancellation email to the guest and the hotel.
 */
export async function sendBookingCancellationEmail({
    guestName,
    guestEmail,
    roomName,
    checkIn,
    checkOut,
    bookingId,
}) {
    const transporter = createTransporter();

    // Fetch full details from database to complete template info
    let roomPrice = 0;
    let roomThumbnail = "";
    let roomSleeps = 2;
    let guests = 2;
    let totalPrice = 0;
    try {
        const { data: res, error } = await getRiskySupabaseClient()
            .from("reservations")
            .select("*, rooms(*)")
            .eq("id", bookingId)
            .single();
        if (res) {
            guests = res.guests_count || 2;
            totalPrice = res.reserved_price || 0;
            if (res.rooms) {
                roomPrice = res.rooms.price;
                roomThumbnail = res.rooms.thumbnail;
                roomSleeps = res.rooms.sleeps || res.rooms.capacity || 2;
            }
        }
    } catch (dbErr) {
        console.error("[mailer] db fetch failed for cancellation email:", dbErr.message);
    }

    const html = getBookingCancellationHtml({
        guestName,
        roomName,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        bookingId,
        roomPrice,
        roomThumbnail,
        roomSleeps
    });

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking CANCELLED – ${roomName} | Wayside Loft #${String(bookingId).split("-")[0]?.toUpperCase() || bookingId}`,
        html,
    });
}

/**
 * Sends a welcome email to new newsletter subscribers.
 */
export async function sendNewsletterWelcomeEmail(email) {
    const transporter = createTransporter();

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #5a78af; padding-bottom: 10px; margin-top: 0;">
        Welcome to Wayside Loft! 🌴
      </h2>
      <p style="color: #444;">Hi there,</p>
      <p style="color: #444;">Thank you for subscribing to the Wayside Loft newsletter. We're thrilled to have you with us!</p>
      <p style="color: #444;">You'll be the first to know about our special offers, new rooms, and the best travel tips for Mirissa.</p>

      <div style="background: #e8f0fe; border-left: 4px solid #5a78af; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; color: #2b4a83; font-weight: bold;">Ready to visit?</p>
        <p style="margin: 4px 0 0; color: #2b4a83; font-size: 13px;">Check our website for availability and book your stay.</p>
      </div>

      <p style="color: #888; font-size: 12px; margin-top: 24px;">
        The Wayside Loft Team
      </p>
    </div>
  `;

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Welcome to Wayside Loft Newsletter!`,
        html,
    });
}
