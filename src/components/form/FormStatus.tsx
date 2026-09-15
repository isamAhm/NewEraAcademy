export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function FormStatusBanner({
  status,
  successMessage,
  errorMessage,
}: {
  status: SubmitStatus;
  successMessage: string;
  errorMessage: string;
}) {
  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-xl bg-brand-green-light px-4 py-3 text-sm font-semibold text-brand-green-dark"
      >
        {successMessage}
      </p>
    );
  }

  if (status === "error") {
    // Deliberate break from the brand palette: errors need to read as errors
    // at a glance, and the on-brand magenta/orange did not.
    return (
      <p
        role="alert"
        className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-200"
      >
        <svg
          viewBox="0 0 20 20"
          className="mt-0.5 h-4 w-4 shrink-0"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM9 5.75a1 1 0 112 0v5a1 1 0 11-2 0v-5zM10 15.25a1.15 1.15 0 110-2.3 1.15 1.15 0 010 2.3z" />
        </svg>
        {errorMessage}
      </p>
    );
  }

  return null;
}
