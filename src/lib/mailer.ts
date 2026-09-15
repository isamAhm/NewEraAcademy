import nodemailer from "nodemailer";

/**
 * Email delivery, stubbed behind environment variables.
 *
 * TODO(NEA): supply real SMTP credentials in production. Until SMTP_HOST is
 * set, submissions are logged to the server console instead of emailed so
 * the forms remain fully testable in development. See .env.example.
 *
 * Swap this file for Resend if preferred later — every call site only
 * depends on the `sendMail` function below.
 */

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
};

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_SECURE } =
    process.env;

  if (!SMTP_HOST) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: SMTP_SECURE === "true",
    auth: SMTP_USER
      ? {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        }
      : undefined,
  });
}

export async function sendMail(input: SendMailInput): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.MAIL_FROM || "no-reply@neweraacademy.org";

  if (!transporter) {
    // Stub mode — no SMTP credentials configured yet.
    console.warn(
      "[mailer] STUB MODE — SMTP_HOST is not set, email was not sent. " +
        "Set SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASSWORD in .env to enable real delivery.",
    );
    console.info("[mailer] Would have sent:", {
      to: input.to,
      subject: input.subject,
      text: input.text,
      attachments: input.attachments?.map((a) => ({
        filename: a.filename,
        contentType: a.contentType,
        sizeBytes: a.content.length,
      })),
    });
    return;
  }

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
    replyTo: input.replyTo,
    attachments: input.attachments,
  });
}
