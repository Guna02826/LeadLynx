import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER,
    subject,
    text,
  };

  await sgMail.send(msg);
};
