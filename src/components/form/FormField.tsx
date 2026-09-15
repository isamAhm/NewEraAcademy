import type { ReactNode } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

/**
 * Consistent label + control + hint/error wrapper used by every field in
 * every form, so accessibility wiring (ids, aria-describedby, aria-invalid
 * hookups on the control itself) stays uniform.
 */
export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && (
          <span className="text-cta" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && (
        <p id={hintId} className="text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-semibold text-cta">
          {error}
        </p>
      )}
    </div>
  );
}

export function fieldDescribedBy(id: string, hint?: string, error?: string) {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(
    Boolean,
  );
  return ids.length ? ids.join(" ") : undefined;
}

const controlClasses =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink-soft/60 transition-colors duration-150 focus:border-brand-purple focus:outline-none";

export const inputClasses = (hasError?: boolean) =>
  `${controlClasses} ${hasError ? "border-cta" : ""}`;
