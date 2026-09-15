import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import {
  HONEYPOT_FIELD,
  MAX_MESSAGE_LENGTH,
  MAX_TEXT_LENGTH,
  isNonEmpty,
  isValidEmail,
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

  // Honeypot: bots that fill in every field trip this. Pretend success.
  if (isNonEmpty(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "");
  const email = String(body.email ?? "");
  const message = String(body.message ?? "");

  const errors: string[] = [];
  if (!isNonEmpty(name) || !isWithinLength(name, MAX_TEXT_LENGTH)) {
    errors.push("A valid name is required.");
  }
  if (!isValidEmail(email)) {
    errors.push("A valid email address is required.");
  }
  if (!isNonEmpty(message) || !isWithinLength(message, MAX_MESSAGE_LENGTH)) {
    errors.push("A message is required.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    await sendMail({
      to: contactInfo.email,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
  } catch (error) {
    console.error("[api/contact] Failed to send email", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
