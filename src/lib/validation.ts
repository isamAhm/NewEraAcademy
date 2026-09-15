/**
 * Small hand-rolled validation helpers shared by every form (Contact,
 * Schedule Tour, Career) on both the client and the server — no extra
 * dependency needed for a handful of field checks.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts common US formats: 614-826-3983, (614) 826-3983, 614.826.3983,
// 6148263983, +1 614 826 3983 — at least 10 digits overall.
const PHONE_RE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(value: unknown): boolean {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

export function isValidPhone(value: unknown): boolean {
  return typeof value === "string" && PHONE_RE.test(value.trim());
}

export const MAX_TEXT_LENGTH = 200;
export const MAX_MESSAGE_LENGTH = 4000;

export function isWithinLength(value: unknown, max: number): boolean {
  return typeof value === "string" && value.length <= max;
}

export const RESUME_MAX_BYTES = 10 * 1024 * 1024; // 10MB
export const RESUME_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
export const RESUME_ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export function hasAllowedResumeExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return RESUME_ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/** A field name real users never see or fill in — bots that autofill every
 * field will trip it. */
export const HONEYPOT_FIELD = "company_website";
