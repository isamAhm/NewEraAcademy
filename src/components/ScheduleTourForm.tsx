"use client";

import { useState, type FormEvent } from "react";
import { FormField, inputClasses } from "@/components/form/FormField";
import { FormStatusBanner, type SubmitStatus } from "@/components/form/FormStatus";
import { Honeypot } from "@/components/form/Honeypot";
import { CtaButton } from "@/components/CtaButton";
import {
  HONEYPOT_FIELD,
  MAX_TEXT_LENGTH,
  MAX_MESSAGE_LENGTH,
  isNonEmpty,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from "@/lib/validation";

type FieldName =
  | "parentName"
  | "email"
  | "phone"
  | "childName"
  | "childAge"
  | "mailingList";

type Errors = Partial<Record<FieldName, string>>;

export function ScheduleTourForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(formData: FormData): Errors {
    const nextErrors: Errors = {};
    const get = (name: string) => String(formData.get(name) || "");

    if (!isNonEmpty(get("parentName")) || !isWithinLength(get("parentName"), MAX_TEXT_LENGTH)) {
      nextErrors.parentName = "Please enter the parent's name.";
    }
    if (!isValidEmail(get("email"))) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isValidPhone(get("phone"))) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!isNonEmpty(get("childName")) || !isWithinLength(get("childName"), MAX_TEXT_LENGTH)) {
      nextErrors.childName = "Please enter your child's name.";
    }
    if (!isNonEmpty(get("childAge")) || !isWithinLength(get("childAge"), 40)) {
      nextErrors.childAge = "Please enter your child's age.";
    }
    if (get("mailingList") !== "yes" && get("mailingList") !== "no") {
      nextErrors.mailingList = "Please let us know your preference.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/schedule-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: formData.get("parentName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          childName: formData.get("childName"),
          childAge: formData.get("childAge"),
          comments: formData.get("comments"),
          mailingList: formData.get("mailingList"),
          [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD),
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Honeypot />

      <FormField id="tour-parent-name" label="Parent's Name" required error={errors.parentName}>
        <input
          id="tour-parent-name"
          name="parentName"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.parentName)}
          className={inputClasses(Boolean(errors.parentName))}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="tour-email" label="Email" required error={errors.email}>
          <input
            id="tour-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            className={inputClasses(Boolean(errors.email))}
          />
        </FormField>

        <FormField id="tour-phone" label="Phone" required error={errors.phone}>
          <input
            id="tour-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            className={inputClasses(Boolean(errors.phone))}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="tour-child-name" label="Your Child's Name" required error={errors.childName}>
          <input
            id="tour-child-name"
            name="childName"
            type="text"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.childName)}
            className={inputClasses(Boolean(errors.childName))}
          />
        </FormField>

        <FormField
          id="tour-child-age"
          label="Your Child's Age"
          required
          error={errors.childAge}
          hint="e.g. 4 years, or 6 months"
        >
          <input
            id="tour-child-age"
            name="childAge"
            type="text"
            inputMode="numeric"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.childAge)}
            className={inputClasses(Boolean(errors.childAge))}
          />
        </FormField>
      </div>

      <FormField
        id="tour-comments"
        label="Comments, questions, or special requirements"
      >
        <textarea
          id="tour-comments"
          name="comments"
          rows={4}
          maxLength={MAX_MESSAGE_LENGTH}
          className={inputClasses(false)}
        />
      </FormField>

      <FormField
        id="tour-mailing-list"
        label="May we add you to our mailing list?"
        required
        error={errors.mailingList}
      >
        <select
          id="tour-mailing-list"
          name="mailingList"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.mailingList)}
          defaultValue=""
          className={inputClasses(Boolean(errors.mailingList))}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </FormField>

      <FormStatusBanner
        status={status}
        successMessage="Thank you! Your tour request has been sent. We'll reach out shortly to confirm a time."
        errorMessage="Something went wrong sending your request. Please check the form and try again, or call us directly."
      />

      <CtaButton type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending…" : "Submit"}
      </CtaButton>
    </form>
  );
}
