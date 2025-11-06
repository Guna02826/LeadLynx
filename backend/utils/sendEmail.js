import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error(
      "❌ Error sending email:",
      error.response?.body || error.message
    );
  }
};
