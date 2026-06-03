import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || "BrazenBox <onboarding@resend.dev>";
const projectRecipients = (process.env.PROJECT_REQUEST_RECIPIENT || "roy.manil@gmail.com")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const isEmailConfigured = Boolean(resend);

export async function sendProjectRequestEmail({ name, email, organization, project }) {
  if (!resend) {
    return { sent: false, reason: "Email provider is not configured." };
  }

  const subject = `New BrazenBox V2 project request from ${name}`;
  const text = [
    "New Start a Project request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization || "Not provided"}`,
    "",
    "Project / challenge:",
    project
  ].join("\n");

  const { data, error } = await resend.emails.send({
    from: resendFrom,
    to: projectRecipients,
    replyTo: email,
    subject,
    text
  });

  if (error) {
    return { sent: false, reason: error.message || "Email could not be sent." };
  }

  return { sent: true, id: data?.id };
}
