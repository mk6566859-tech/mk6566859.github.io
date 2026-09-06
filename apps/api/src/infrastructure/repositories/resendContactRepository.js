const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "your-verified-sender@yourdomain.com";
const toEmail = process.env.RESEND_TO_EMAIL || "hr6566859@gmail.com";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const resendContactRepository = {
  async sendMessage(message) {
    const emailSubject = message.subject || "Portfolio inquiry";

    if (!apiKey) {
      console.log("New portfolio contact (Resend not configured):", {
        ...message,
        receivedAt: new Date().toISOString()
      });

      return { accepted: true, mode: "console-fallback", subject: emailSubject };
    }

    if (!fromEmail || fromEmail === "onboarding@resend.dev" || fromEmail.includes("yourdomain.com")) {
      throw new Error("Set RESEND_FROM_EMAIL to a verified sender from your Resend account, such as hello@yourdomain.com.");
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const emailHtml = `
      <h2>New portfolio contact</h2>
      <p><strong>Subject:</strong> ${escapeHtml(emailSubject)}</p>
      <p><strong>Name:</strong> ${escapeHtml(message.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(message.email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message.message).replace(/\n/g, "<br />")}</p>
    `;

    const response = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      reply_to: message.email,
      subject: emailSubject,
      html: emailHtml,
      text: `Subject: ${emailSubject}\nName: ${message.name}\nEmail: ${message.email}\n\nMessage:\n${message.message}`
    });

    if (response.error) {
      throw new Error(response.error.message || "Your message could not be sent.");
    }

    return {
      accepted: true,
      emailId: response.data?.id || null,
      mode: "resend",
      subject: emailSubject
    };
  }
};
