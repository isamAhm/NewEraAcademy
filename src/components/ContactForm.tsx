"use client";

import { useState, type FormEvent } from "react";
import { FormField, inputClasses } from "@/components/form/FormField";
import { FormStatusBanner, type SubmitStatus } from "@/components/form/FormStatus";
import { Honeypot } from "@/components/form/Honeypot";
import { CtaButton } from "@/components/CtaButton";
import {
  HONEYPOT_FIELD,
  MAX_MESSAGE_LENGTH,
  MAX_TEXT_LENGTH,
  isNonEmpty,
  isValidEmail,
  isWithinLength,
} from "@/lib/validation";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(formData: FormData): Errors {
    const nextErrors: Errors = {};
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    if (!isNonEmpty(name) || !isWithinLength(name, MAX_TEXT_LENGTH)) {
      nextErrors.name = "Please enter your name.";
    }
    if (!isValidEmail(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isNonEmpty(message) || !isWithinLength(message, MAX_MESSAGE_LENGTH)) {
      nextErrors.message = "Please enter a message.";
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
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

      <FormField id="contact-name" label="Name" required error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          className={inputClasses(Boolean(errors.name))}
        />
      </FormField>

      <FormField id="contact-email" label="Email" required error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          className={inputClasses(Boolean(errors.email))}
        />
      </FormField>

      <FormField id="contact-message" label="Message" required error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          className={inputClasses(Boolean(errors.message))}
        />
      </FormField>

      <FormStatusBanner
        status={status}
        successMessage="Thanks for reaching out! We'll get back to you soon."
        errorMessage="Something went wrong sending your message. Please check the form and try again, or call us directly."
      />

      <CtaButton type="submit" disabled={status === "submitting"} className="self-start">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </CtaButton>
    </form>
  );
}
