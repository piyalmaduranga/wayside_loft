// Automatically generated from email.mjml compiler
import { format } from "date-fns";

function getCommonData(data) {
  const {
    guestName,
    roomName,
    checkIn, // YYYY-MM-DD
    checkOut, // YYYY-MM-DD
    guests,
    totalPrice,
    bookingId,
    roomPrice = 0,
    roomThumbnail = "",
    roomSleeps = 2
  } = data;

  let nightsCount = 0;
  try {
    const s = new Date(checkIn);
    const e = new Date(checkOut);
    nightsCount = Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)));
  } catch (err) {
    nightsCount = data.nightsCount || 1;
  }

  let baseRate = Number(roomPrice) || (Number(totalPrice) / nightsCount);
  let baseTotal = baseRate * nightsCount;
  let extraFeeAmount = Math.max(0, Number(totalPrice) - baseTotal);
  let extraFeeLabel = extraFeeAmount > 0 ? "Additional guest fees" : "Fees";

  // Format dates
  let checkInFormatted = checkIn;
  let checkOutFormatted = checkOut;
  let dateRangeShort = "";

  try {
    const s = new Date(checkIn);
    const e = new Date(checkOut);
    checkInFormatted = format(s, "EEE, dd MMM yyyy");
    checkOutFormatted = format(e, "EEE, dd MMM yyyy");
    dateRangeShort = `${format(s, "d")}–${format(e, "d MMM yyyy")}`;
  } catch (err) {
    // fallback
  }

  const confirmationCode = "WSL-" + (String(bookingId).split("-")[0]?.toUpperCase() || String(bookingId).toUpperCase());
  const viewReservationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reservations/edit/${bookingId}`;
  const manageBookingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/account/history`;
  const bookNewStayUrl = `${process.env.NEXT_PUBLIC_APP_URL}/rooms`;

  const roomImgUrl = roomThumbnail
    ? (roomThumbnail.startsWith("https") ? roomThumbnail : `${process.env.NEXT_PUBLIC_SUPABASE_IMGS_URL}/${roomThumbnail}`)
    : "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80";

  const roomSpecs = `${guests} guest${guests > 1 ? "s" : ""} · Base Capacity: ${roomSleeps} Sleeps`;

  return {
    guestName,
    roomName,
    guests,
    totalPrice: Number(totalPrice).toFixed(2),
    bookingId,
    nightsCount,
    roomPrice: baseRate.toFixed(2),
    baseTotal: baseTotal.toFixed(2),
    extraFeeAmount: extraFeeAmount.toFixed(2),
    extraFeeLabel,
    checkInFormatted,
    checkOutFormatted,
    dateRangeShort,
    confirmationCode,
    viewReservationUrl,
    manageBookingUrl,
    bookNewStayUrl,
    roomImgUrl,
    roomSpecs
  };
}


function getEmailHtml(data, emailTitle, emailPreview, greetingText, bodyMessage, options = {}) {
  const common = getCommonData(data);
  const {
    guestName,
    roomName,
    totalPrice,
    nightsCount,
    roomPrice,
    baseTotal,
    extraFeeAmount,
    extraFeeLabel,
    checkInFormatted,
    checkOutFormatted,
    dateRangeShort,
    confirmationCode,
    viewReservationUrl,
    manageBookingUrl,
    bookNewStayUrl,
    roomImgUrl,
    roomSpecs
  } = common;

  const mainButtonUrl = options.isCancelled ? bookNewStayUrl : viewReservationUrl;
  const mainButtonText = options.isCancelled ? "BOOK A NEW STAY" : "VIEW YOUR RESERVATION";
  
  const secondaryButtonUrl = manageBookingUrl;
  const secondaryButtonText = options.isCancelled ? "View Booking History" : "Manage Booking";

  const totalLabel = options.isCancelled ? "Total Price" : "Total (Pay on arrival)";

  return `<!doctype html>
<html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>${emailTitle}</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }

      .mj-column-per-38 {
        width: 38% !important;
        max-width: 38%;
      }

      .mj-column-per-62 {
        width: 62% !important;
        max-width: 62%;
      }

      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }

      .mj-column-per-60 {
        width: 60% !important;
        max-width: 60%;
      }

      .mj-column-per-40 {
        width: 40% !important;
        max-width: 40%;
      }

      .mj-column-per-20 {
        width: 20% !important;
        max-width: 20%;
      }

      .mj-column-per-80 {
        width: 80% !important;
        max-width: 80%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }

    .moz-text-html .mj-column-per-38 {
      width: 38% !important;
      max-width: 38%;
    }

    .moz-text-html .mj-column-per-62 {
      width: 62% !important;
      max-width: 62%;
    }

    .moz-text-html .mj-column-per-50 {
      width: 50% !important;
      max-width: 50%;
    }

    .moz-text-html .mj-column-per-60 {
      width: 60% !important;
      max-width: 60%;
    }

    .moz-text-html .mj-column-per-40 {
      width: 40% !important;
      max-width: 40%;
    }

    .moz-text-html .mj-column-per-20 {
      width: 20% !important;
      max-width: 20%;
    }

    .moz-text-html .mj-column-per-80 {
      width: 80% !important;
      max-width: 80%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:479px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
    .serif {
      font-family: Georgia, 'Times New Roman', Times, serif;
    }

    .pill-btn a {
      border-radius: 999px !important;
    }

    .divider-dash {
      border-top: 1px dashed #E3DDD2 !important;
    }
  </style>
</head>

<body style="word-spacing:normal;background-color:#F7F4EE;">
  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${emailPreview}</div>
  <div aria-label="Your reservation is confirmed — Wayside Loft Mirissa" aria-roledescription="email" role="article" lang="und" dir="auto" style="word-spacing:normal;background-color:#F7F4EE;">
    <!-- Top brand bar -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:24px 24px 8px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:552px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;font-weight:700;letter-spacing:3px;line-height:1.6;text-align:center;color:#A8895E;">WAYSIDE LOFT</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    
    <!-- Greeting card -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="card-shadow-outlook" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div class="card-shadow" style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;border-radius:16px;overflow:hidden;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-collapse:separate;">
        <tbody>
          <tr>
            <td style="border-radius:16px;direction:ltr;font-size:0px;padding:32px 8px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0 24px 16px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" class="serif" style="font-size:0px;padding:10px 25px;padding-bottom:6px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:20px;font-weight:600;line-height:1.6;text-align:left;color:#1A1815;">${greetingText}</div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#6C6760;">${bodyMessage}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
              <!-- Room card -->
              <!--[if mso | IE]><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:16px 24px 8px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:203.68px;" ><![endif]-->
                        <div class="mj-column-per-38 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                    <tbody>
                                      <tr>
                                        <td style="width:203px;">
                                          <img alt="${roomName} Room" src="${roomImgUrl}" style="border:0;border-radius:12px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="203" height="auto" />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td><td class="" style="vertical-align:middle;width:332.32px;" ><![endif]-->
                        <div class="mj-column-per-62 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td style="vertical-align:middle;padding-left:16px;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                    <tbody>
                                      <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:2px;word-break:break-word;">
                                          <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;line-height:1.6;text-align:left;color:#C4A87A;">ACCOMMODATION</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="left" class="serif" style="font-size:0px;padding:10px 25px;padding-bottom:6px;word-break:break-word;">
                                          <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:17px;font-weight:600;line-height:1.6;text-align:left;color:#1A1815;">${roomName}</div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                          <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#6C6760;">${roomSpecs}</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:16px 24px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                  <p style="border-top:dashed 1px #E3DDD2;font-size:1px;margin:0px auto;width:100%;">
                                  </p>
                                  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:dashed 1px #E3DDD2;font-size:1px;margin:0px auto;width:536px;" role="presentation" width="536px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
              <!-- Check-in / check-out -->
              <!--[if mso | IE]><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 24px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:268px;" ><![endif]-->
                        <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:4px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;line-height:1.6;text-align:left;color:#6C6760;">CHECK-IN</div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:2px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:600;line-height:1.6;text-align:left;color:#1A1815;">${checkInFormatted}</div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:1.6;text-align:left;color:#6C6760;">After 2:00 PM</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:268px;" ><![endif]-->
                        <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:4px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;line-height:1.6;text-align:left;color:#6C6760;">CHECK-OUT</div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:2px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:600;line-height:1.6;text-align:left;color:#1A1815;">${checkOutFormatted}</div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:1.6;text-align:left;color:#6C6760;">Before 11:00 AM</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 24px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                  <p style="border-top:dashed 1px #E3DDD2;font-size:1px;margin:0px auto;width:100%;">
                                  </p>
                                  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:dashed 1px #E3DDD2;font-size:1px;margin:0px auto;width:536px;" role="presentation" width="536px" ><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table><![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
              <!-- Confirmation code -->
              <!--[if mso | IE]><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 24px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:4px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;line-height:1.6;text-align:left;color:#6C6760;">CONFIRMATION CODE</div>
                                </td>
                              </tr>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:18px;font-weight:700;letter-spacing:2px;line-height:1.6;text-align:left;color:#1A1815;">${confirmationCode}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
              <!-- Price breakdown -->
              <!--[if mso | IE]><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" bgcolor="#F7F4EE" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-collapse:separate;">
                  <tbody>
                    <tr>
                      <td style="border-radius:12px;direction:ltr;font-size:0px;padding:24px 24px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:10px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:600;line-height:1.6;text-align:left;color:#1A1815;">Price Details</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" bgcolor="#F7F4EE" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0 24px 4px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:321.6px;" ><![endif]-->
                        <div class="mj-column-per-60 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#6C6760;">${nightsCount} night${nightsCount > 1 ? 's' : ''} × ${roomPrice}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:214.4px;" ><![endif]-->
                        <div class="mj-column-per-40 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="right" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.6;text-align:right;color:#1A1815;">${baseTotal}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" bgcolor="#F7F4EE" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0 24px 4px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:321.6px;" ><![endif]-->
                        <div class="mj-column-per-60 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.6;text-align:left;color:#6C6760;">${extraFeeLabel}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:214.4px;" ><![endif]-->
                        <div class="mj-column-per-40 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="right" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.6;text-align:right;color:#1A1815;">${extraFeeAmount}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" bgcolor="#F7F4EE" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-collapse:separate;">
                  <tbody>
                    <tr>
                      <td style="border-radius:0 0 12px 12px;direction:ltr;font-size:0px;padding:0 24px 16px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:321.6px;" ><![endif]-->
                        <div class="mj-column-per-60 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;padding-top:8px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:700;line-height:1.6;text-align:left;color:#1A1815;">${totalLabel}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:214.4px;" ><![endif]-->
                        <div class="mj-column-per-40 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="right" style="font-size:0px;padding:10px 25px;padding-top:8px;word-break:break-word;">
                                  <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:700;line-height:1.6;text-align:right;color:#1A1815;">${totalPrice}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><![endif]-->
              <!-- CTA buttons -->
              <!--[if mso | IE]><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:28px 24px 8px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                    <tbody>
                                      <tr>
                                        <td align="center" bgcolor="#C4A87A" role="presentation" style="border:none;border-radius:999px;cursor:auto;mso-padding-alt:16px 32px;background:#C4A87A;" valign="middle">
                                          <a href="${mainButtonUrl}" style="display:inline-block;background:#C4A87A;color:#1A1815;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;font-weight:700;line-height:120%;letter-spacing:1px;margin:0;text-decoration:none;text-transform:none;padding:16px 32px;mso-padding-alt:0px;border-radius:999px;" target="_blank"> ${mainButtonText} </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:584px;" width="584" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:584px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0 24px 8px;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                    <tbody>
                                      <tr>
                                        <td align="center" bgcolor="#ffffff" role="presentation" style="border:1.5px solid #E3DDD2;border-radius:999px;cursor:auto;mso-padding-alt:14px 32px;background:#ffffff;" valign="middle">
                                          <a href="${secondaryButtonUrl}" style="display:inline-block;background:#ffffff;color:#1A1815;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:13px;font-weight:600;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:14px 32px;mso-padding-alt:0px;border-radius:999px;" target="_blank"> ${secondaryButtonText} </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <div style="height:24px;line-height:24px;">&#8202;</div>
    <!-- Footer -->
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0 24px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:552px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:4px;word-break:break-word;">
                        <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:1.6;text-align:center;color:#6C6760;">Wayside Loft Mirissa · Matara District, Southern Province, Sri Lanka</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:16px;word-break:break-word;">
                        <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:1.6;text-align:center;color:#6C6760;">Questions about your stay? Reply to this email or call +94 77 123 4567</div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:0;word-break:break-word;">
                        <div style="font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:11px;line-height:1.6;text-align:center;color:#B0A99F;">You're receiving this email because you made a reservation at Wayside Loft.</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
    <div style="height:24px;line-height:24px;">&#8202;</div>
  </div>
</body>

</html>`;
}

export function getBookingConfirmedHtml(data) {
  const common = getCommonData(data);
  const emailTitle = "Your reservation is confirmed — Wayside Loft Mirissa";
  const emailPreview = `You're all set! Booking confirmed at Wayside Loft Mirissa for ${common.dateRangeShort}.`;
  const greetingText = `You're all set, ${common.guestName}`;
  const bodyMessage = "Your stay at Wayside Loft has been confirmed. We can't wait to host you — here's everything you need for your trip.";
  return getEmailHtml(data, emailTitle, emailPreview, greetingText, bodyMessage);
}

export function getBookingReceivedHtml(data) {
  const common = getCommonData(data);
  const emailTitle = "We've received your booking request — Wayside Loft Mirissa";
  const emailPreview = `We've received your booking request at Wayside Loft Mirissa for ${common.dateRangeShort}.`;
  const greetingText = `Booking Request Received, ${common.guestName}`;
  const bodyMessage = "We have received your booking request and are verifying availability. We will send a confirmation email once your stay is officially confirmed.";
  return getEmailHtml(data, emailTitle, emailPreview, greetingText, bodyMessage);
}

export function getBookingUpdateHtml(data) {
  const common = getCommonData(data);
  const emailTitle = "Your reservation details have been updated — Wayside Loft Mirissa";
  const emailPreview = `Your booking at Wayside Loft Mirissa for ${common.dateRangeShort} has been updated.`;
  const greetingText = `Reservation Updated, ${common.guestName}`;
  const bodyMessage = "Your reservation details at Wayside Loft have been updated. Please find your revised stay details below.";
  return getEmailHtml(data, emailTitle, emailPreview, greetingText, bodyMessage);
}

export function getBookingCancellationHtml(data) {
  const common = getCommonData(data);
  const emailTitle = "Your reservation has been cancelled — Wayside Loft Mirissa";
  const emailPreview = `Your booking at Wayside Loft Mirissa for ${common.dateRangeShort} has been cancelled.`;
  const greetingText = `Reservation Cancelled, ${common.guestName}`;
  const bodyMessage = "This email confirms that your reservation at Wayside Loft has been cancelled. If you did not request this cancellation, please contact us immediately.";
  return getEmailHtml(data, emailTitle, emailPreview, greetingText, bodyMessage, { isCancelled: true });
}
