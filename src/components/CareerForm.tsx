"use client";

import { useState, type FormEvent } from "react";
import { FormField, inputClasses } from "@/components/form/FormField";
import { FormStatusBanner, type SubmitStatus } from "@/components/form/FormStatus";
import { Honeypot } from "@/components/form/Honeypot";
import { FileDropzone } from "@/components/form/FileDropzone";
import { CtaButton } from "@/components/CtaButton";
import {
  MAX_TEXT_LENGTH,
  isNonEmpty,
  isValidEmail,
  isValidPhone,
  isWithinLength,
} from "@/lib/validation";

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "location"
  | "position"
  | "startDate"
  | "resume"
  | "mailingList";

type Errors = Partial<Record<FieldName, string>>;

// Kept as a single option today; add more here when NEA opens new
// locations — the <select> and validation both stay unchanged.
const LOCATIONS = ["Columbus, Ohio — 2169 Cleveland Ave"];

export function CareerForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  function validate(formData: FormData): Errors {
    const nextErrors: Errors = {};
    const get = (name: string) => String(formData.get(name) || "");

    if (!isNonEmpty(get("name")) || !isWithinLength(get("name"), MAX_TEXT_LENGTH)) {
      nextErrors.name = "Please enter your name.";
    }
    if (!isValidEmail(get("email"))) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isValidPhone(get("phone"))) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    if (!isNonEmpty(get("location"))) {
      nextErrors.location = "Please select a location.";
    }
    if (!isNonEmpty(get("position")) || !isWithinLength(get("position"), MAX_TEXT_LENGTH)) {
      nextErrors.position = "Please enter the position you're interested in.";
    }
    if (!isNonEmpty(get("startDate"))) {
      nextErrors.startDate = "Please choose a preferred start date.";
    }
    if (!resumeFile) {
      nextErrors.resume = resumeError || "Please upload your resume.";
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
      const response = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
      setResumeFile(null);
      setResumeError(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate encType="multipart/form-data" className="flex flex-col gap-5">
      <Honeypot />

      <FormField id="career-name" label="Your Name" required error={errors.name}>
        <input
          id="career-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          className={inputClasses(Boolean(errors.name))}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="career-email" label="Email" required error={errors.email}>
          <input
            id="career-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            className={inputClasses(Boolean(errors.email))}
          />
        </FormField>

        <FormField id="career-phone" label="Phone" required error={errors.phone}>
          <input
            id="career-phone"
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

      <FormField
        id="career-location"
        label="Which location are you interested in?"
        required
        error={errors.location}
      >
        <select
          id="career-location"
          name="location"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.location)}
          defaultValue={LOCATIONS[0]}
          className={inputClasses(Boolean(errors.location))}
        >
          {LOCATIONS.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        id="career-position"
        label="Position You Are Interested In:"
        required
        error={errors.position}
      >
        <input
          id="career-position"
          name="position"
          type="text"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.position)}
          className={inputClasses(Boolean(errors.position))}
        />
      </FormField>

      <FormField
        id="career-start-date"
        label="Preferred Start Date:"
        required
        error={errors.startDate}
      >
        <input
          id="career-start-date"
          name="startDate"
          type="date"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.startDate)}
          className={inputClasses(Boolean(errors.startDate))}
        />
      </FormField>

      <FormField id="career-comments" label="Comments/notes">
        <textarea
          id="career-comments"
          name="comments"
          rows={4}
          className={inputClasses(false)}
        />
      </FormField>

      <FileDropzone
        name="resume"
        required
        error={errors.resume}
        onFileChange={(file, error) => {
          setResumeFile(file);
          setResumeError(error);
          setErrors((prev) => ({ ...prev, resume: error || undefined }));
        }}
      />

      <FormField
        id="career-mailing-list"
        label="May we add you to our mailing list?"
        required
        error={errors.mailingList}
      >
        <select
          id="career-mailing-list"
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
        successMessage="Thank you for applying! We've received your information and will be in touch."
        errorMessage="Something went wrong submitting your application. Please check the form and try again."
      />

      <CtaButton type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Submitting…" : "Submit"}
      </CtaButton>
    </form>
  );
}
