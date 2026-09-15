import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import {
  HONEYPOT_FIELD,
  MAX_TEXT_LENGTH,
  RESUME_MAX_BYTES,
  isNonEmpty,
  isValidEmail,
  isValidPhone,
  isWithinLength,
  hasAllowedResumeExtension,
} from "@/lib/validation";
import { contactInfo } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const get = (name: string) => String(formData.get(name) ?? "");

  if (isNonEmpty(get(HONEYPOT_FIELD))) {
    return NextResponse.json({ ok: true });
  }

  const name = get("name");
  const email = get("email");
  const phone = get("phone");
  const location = get("location");
  const position = get("position");
  const startDate = get("startDate");
  const comments = get("comments");
  const mailingList = get("mailingList");
  const resume = formData.get("resume");

  const errors: string[] = [];
  if (!isNonEmpty(name) || !isWithinLength(name, MAX_TEXT_LENGTH)) {
    errors.push("A valid name is required.");
  }
  if (!isValidEmail(email)) {
    errors.push("A valid email address is required.");
  }
  if (!isValidPhone(phone)) {
    errors.push("A valid phone number is required.");
  }
  if (!isNonEmpty(location)) {
    errors.push("A location is required.");
  }
  if (!isNonEmpty(position) || !isWithinLength(position, MAX_TEXT_LENGTH)) {
    errors.push("A position is required.");
  }
  if (!isNonEmpty(startDate)) {
    errors.push("A preferred start date is required.");
  }
  if (mailingList !== "yes" && mailingList !== "no") {
    errors.push("Please indicate a mailing list preference.");
  }

  // Resume: never written to disk / a public directory — read into memory
  // and forwarded as an email attachment only.
  let resumeBuffer: Buffer | null = null;
  let resumeFilename = "";
  let resumeType = "application/octet-stream";

  if (!(resume instanceof File) || resume.size === 0) {
    errors.push("A resume upload is required.");
  } else {
    if (resume.size > RESUME_MAX_BYTES) {
      errors.push("The resume file must be 10MB or smaller.");
    }
    if (!hasAllowedResumeExtension(resume.name)) {
      errors.push("The resume must be a PDF, DOC, or DOCX file.");
    }
    if (errors.length === 0) {
      resumeBuffer = Buffer.from(await resume.arrayBuffer());
      resumeFilename = resume.name;
      resumeType = resume.type || resumeType;
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    await sendMail({
      to: contactInfo.email,
      replyTo: email,
      subject: `New career application from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Location: ${location}`,
        `Position: ${position}`,
        `Preferred Start Date: ${startDate}`,
        `Mailing list opt-in: ${mailingList}`,
        "",
        "Comments:",
        comments || "(none)",
      ].join("\n"),
      attachments: resumeBuffer
        ? [{ filename: resumeFilename, content: resumeBuffer, contentType: resumeType }]
        : undefined,
    });
  } catch (error) {
    console.error("[api/career] Failed to send email", error);
    return NextResponse.json(
      { error: "We couldn't submit your application right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
