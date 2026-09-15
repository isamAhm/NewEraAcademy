import { HONEYPOT_FIELD } from "@/lib/validation";

/**
 * Hidden field real visitors never see or fill in. Kept off-screen with
 * CSS (not `display:none`/`hidden`, which some bots skip) and out of the
 * tab order so it doesn't interfere with keyboard/screen-reader users.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Leave this field blank</label>
      <input
        type="text"
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
