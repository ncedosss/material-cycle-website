function buildConsultationEmail({ fullName, companyName, email, phone, service, location, message }) {
  const now = new Date().toLocaleDateString('en-ZA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Consultation Request</title>
</head>
<body style="margin:0;padding:0;background:#F0EEE9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F0EEE9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1A1F1C;border-radius:16px 16px 0 0;padding:36px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#4A8C5D;">
                      Incoming Request
                    </p>
                    <h1 style="margin:0 0 4px 0;font-size:28px;font-weight:800;color:#F4F3EF;letter-spacing:-0.02em;line-height:1.1;">
                      New Consultation
                    </h1>
                    <p style="margin:0;font-size:13px;color:rgba(244,243,239,0.45);">
                      ${now}
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <!-- Logo mark -->
                    <div style="width:48px;height:48px;background:#4A8C5D;border-radius:13px;display:inline-block;text-align:center;line-height:48px;">
                      <span style="color:#fff;font-size:22px;font-weight:800;">M</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Green accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#4A8C5D,#6DC98A);"></td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Intro -->
              <p style="margin:0 0 28px 0;font-size:14px;color:#6B7280;line-height:1.6;">
                A new consultation request has been submitted through the Material Cycle website. Review the details below and follow up at your earliest convenience.
              </p>

              <!-- Contact details grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding-bottom:12px;" width="50%">
                    <p style="margin:0 0 3px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">Full Name</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1C1C1E;">${fullName}</p>
                  </td>
                  <td style="padding-bottom:12px;" width="50%">
                    <p style="margin:0 0 3px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">Company</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1C1C1E;">${companyName || '—'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:12px;">
                    <p style="margin:0 0 3px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">Email</p>
                    <p style="margin:0;">
                      <a href="mailto:${email}" style="font-size:15px;font-weight:600;color:#4A8C5D;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                  <td style="padding-bottom:12px;">
                    <p style="margin:0 0 3px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">Phone</p>
                    <p style="margin:0;">
                      <a href="tel:${phone}" style="font-size:15px;font-weight:600;color:#4A8C5D;text-decoration:none;">${phone || '—'}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:0;">
                    <p style="margin:0 0 3px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">Service Requested</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1C1C1E;">${service || '—'}</p>
                  </td>
                  <td style="padding-bottom:0;">
                    <p style="margin:0 0 3px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">Location</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#1C1C1E;">${location || '—'}</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="height:1px;background:#F0EEE9;"></td>
                </tr>
              </table>

              <!-- Message block -->
              <p style="margin:0 0 10px 0;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#9CA3AF;">
                Requirements / Message
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#F8F7F4;border:1px solid #ECEAE4;border-left:3px solid #4A8C5D;border-radius:0 10px 10px 0;padding:18px 20px;">
                    <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- CTA footer -->
          <tr>
            <td style="background:#F8F7F4;border:1px solid #ECEAE4;border-top:none;padding:24px 40px;border-radius:0 0 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.5;">
                      Sent via <strong style="color:#6B7280;">Material Cycle</strong> contact form.<br/>
                      Please do not reply directly to this email.
                    </p>
                  </td>
                  <td align="right" valign="middle">
                    <a href="mailto:${email}"
                       style="display:inline-block;background:#1A1F1C;color:#F4F3EF;text-decoration:none;font-size:13px;font-weight:700;padding:12px 22px;border-radius:10px;letter-spacing:0.01em;white-space:nowrap;">
                      Reply to ${fullName.split(' ')[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

module.exports = { buildConsultationEmail };
