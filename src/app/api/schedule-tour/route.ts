import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import {
  HONEYPOT_FIELD,
  MAX_TEXT_LENGTH,
  isNonEmpty,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from "@/lib/validation";
import { contactInfo } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isNonEmpty(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true });
  }

  const parentName = String(body.parentName ?? "");
  const email = String(body.email ?? "");
  const phone = String(body.phone ?? "");
  const childName = String(body.childName ?? "");
  const childAge = String(body.childAge ?? "");
  const comments = String(body.comments ?? "");
  const mailingList = String(body.mailingList ?? "");

  const errors: string[] = [];
  if (!isNonEmpty(parentName) || !isWithinLength(parentName, MAX_TEXT_LENGTH)) {
    errors.push("A valid parent name is required.");
  }
  if (!isValidEmail(email)) {
    errors.push("A valid email address is required.");
  }
  if (!isValidPhone(phone)) {
    errors.push("A valid phone number is required.");
  }
  if (!isNonEmpty(childName) || !isWithinLength(childName, MAX_TEXT_LENGTH)) {
    errors.push("The child's name is required.");
  }
  if (!isNonEmpty(childAge) || !isWithinLength(childAge, 40)) {
    errors.push("The child's age is required.");
  }
  if (mailingList !== "yes" && mailingList !== "no") {
    errors.push("Please indicate a mailing list preference.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    await sendMail({
      to: contactInfo.email,
      replyTo: email,
      subject: `New tour request from ${parentName}`,
      text: [
        `Parent's Name: ${parentName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Child's Name: ${childName}`,
        `Child's Age: ${childAge}`,
        `Mailing list opt-in: ${mailingList}`,
        "",
        "Comments:",
        comments || "(none)",
      ].join("\n"),
    });
  } catch (error) {
    console.error("[api/schedule-tour] Failed to send email", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
