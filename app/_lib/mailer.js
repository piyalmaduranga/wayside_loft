import nodemailer from "nodemailer";

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

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #c9a96e; padding-bottom: 10px; margin-top: 0;">
        🏡 Booking Confirmed – Wayside Loft
      </h2>
      <p style="color: #444;">Dear <strong>${guestName}</strong>,</p>
      <p style="color: #444;">Thank you for choosing Wayside Loft! Your reservation has been confirmed. Here are your booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555; width: 150px;">Booking Number</td>
          <td style="padding: 10px 12px; color: #222;">#${String(bookingId).padStart(6, "0")}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Room</td>
          <td style="padding: 10px 12px; color: #222;">${roomName}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Check-in</td>
          <td style="padding: 10px 12px; color: #222;">${checkIn}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Check-out</td>
          <td style="padding: 10px 12px; color: #222;">${checkOut}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Guests</td>
          <td style="padding: 10px 12px; color: #222;">${guests}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Total Price</td>
          <td style="padding: 10px 12px; color: #222; font-size: 16px;"><strong>$${Number(totalPrice).toFixed(2)}</strong></td>
        </tr>
      </table>

      <div style="background: #fef9ec; border-left: 4px solid #c9a96e; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; color: #7a5c1e; font-weight: bold;">📍 Wayside Loft, Yatipila Road, Mirissa, Sri Lanka</p>
        <p style="margin: 4px 0 0; color: #7a5c1e; font-size: 13px;">Payment is due on arrival. Please bring a valid ID.</p>
      </div>

      <p style="color: #444;">For any queries, contact us at <a href="mailto:${process.env.SMTP_USER}" style="color: #c9a96e;">${process.env.SMTP_USER}</a>.</p>
      <p style="color: #888; font-size: 12px; margin-top: 24px;">
        We look forward to welcoming you!<br/>
        <strong>The Wayside Loft Team</strong>
      </p>
    </div>
  `;

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking Confirmed – ${roomName} | Wayside Loft #${String(bookingId).padStart(6, "0")}`,
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

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1a1a2e; border-bottom: 2px solid #5a78af; padding-bottom: 10px; margin-top: 0;">
        🔄 Booking Updated – Wayside Loft
      </h2>
      <p style="color: #444;">Dear <strong>${guestName}</strong>,</p>
      <p style="color: #444;">Your reservation at Wayside Loft has been updated. Here are your new booking details:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555; width: 150px;">Booking Number</td>
          <td style="padding: 10px 12px; color: #222;">#${String(bookingId).padStart(6, "0")}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Room</td>
          <td style="padding: 10px 12px; color: #222;">${roomName}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Check-in</td>
          <td style="padding: 10px 12px; color: #222;">${checkIn}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Check-out</td>
          <td style="padding: 10px 12px; color: #222;">${checkOut}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Guests</td>
          <td style="padding: 10px 12px; color: #222;">${guests}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Total Price</td>
          <td style="padding: 10px 12px; color: #222; font-size: 16px;"><strong>$${Number(totalPrice).toFixed(2)}</strong></td>
        </tr>
      </table>

      <div style="background: #e8f0fe; border-left: 4px solid #5a78af; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; color: #2b4a83; font-weight: bold;">📍 Wayside Loft, Yatipila Road, Mirissa, Sri Lanka</p>
        <p style="margin: 4px 0 0; color: #2b4a83; font-size: 13px;">If you didn't request this change, please contact us immediately.</p>
      </div>

      <p style="color: #444;">For any queries, contact us at <a href="mailto:${process.env.SMTP_USER}" style="color: #c9a96e;">${process.env.SMTP_USER}</a>.</p>
      <p style="color: #888; font-size: 12px; margin-top: 24px;">
        The Wayside Loft Team
      </p>
    </div>
  `;

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking UPDATED – ${roomName} | Wayside Loft #${String(bookingId).padStart(6, "0")}`,
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

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #d32f2f; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; margin-top: 0;">
        ❌ Booking CANCELLED – Wayside Loft
      </h2>
      <p style="color: #444;">Dear <strong>${guestName}</strong>,</p>
      <p style="color: #444;">This email confirms that your reservation at Wayside Loft has been cancelled.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555; width: 150px;">Booking Number</td>
          <td style="padding: 10px 12px; color: #222;">#${String(bookingId).padStart(6, "0")}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Room</td>
          <td style="padding: 10px 12px; color: #222;">${roomName}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Check-in</td>
          <td style="padding: 10px 12px; color: #222;">${checkIn}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #555;">Check-out</td>
          <td style="padding: 10px 12px; color: #222;">${checkOut}</td>
        </tr>
      </table>

      <div style="background: #fff5f5; border-left: 4px solid #d32f2f; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
        <p style="margin: 0; color: #c62828; font-weight: bold;">Reservation Cancelled</p>
        <p style="margin: 4px 0 0; color: #c62828; font-size: 13px;">If this was a mistake, please reach out to us to re-book.</p>
      </div>

      <p style="color: #444;">For any queries, contact us at <a href="mailto:${process.env.SMTP_USER}" style="color: #c9a96e;">${process.env.SMTP_USER}</a>.</p>
      <p style="color: #888; font-size: 12px; margin-top: 24px;">
        The Wayside Loft Team
      </p>
    </div>
  `;

    const adminEmails = [
        process.env.CONTACT_RECEIVER_EMAIL,
        process.env.CONTACT_CC_EMAILS
    ].filter(Boolean).join(",");

    await transporter.sendMail({
        from: `"Wayside Loft" <${process.env.SMTP_USER}>`,
        to: guestEmail,
        cc: adminEmails,
        subject: `Booking CANCELLED – ${roomName} | Wayside Loft #${String(bookingId).padStart(6, "0")}`,
        html,
    });
}
