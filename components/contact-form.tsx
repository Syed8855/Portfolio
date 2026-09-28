"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Please enter a message with at least 10 characters."),
});

const contactEmail = "iamsyedhasnain04@gmail.com";
const contactEndpoint = "/api/contact";

export function ContactForm() {
  const [notice, setNotice] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(formData));

    if (!parsed.success) {
      setNotice(null);
      setErrors(
        Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]))
      );
      return;
    }

    const values = parsed.data;
    const subject = `Portfolio enquiry from ${values.name}`;
    const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;

    setErrors({});
    setIsSubmitting(true);
    setNotice({ type: "info", text: "Sending your message..." });

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subject, body }),
      });

      if (response.ok) {
        setNotice({
          type: "success",
          text: "Message sent successfully. I will reply to you as soon as possible.",
        });
        (event.target as HTMLFormElement).reset();
        setIsSubmitting(false);
        return;
      }

      throw new Error("Submission failed");
    } catch {
      setIsSubmitting(false);
      setNotice({
        type: "info",
        text: "Direct submission endpoint unavailable. Opening your default email client as a fallback.",
      });
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <form className="contact-form-modern" onSubmit={submit} noValidate>
      <div className="form-field">
        <label htmlFor="name-input" className="form-label">
          Name
        </label>
        <input
          id="name-input"
          name="name"
          type="text"
          placeholder="e.g. Alex Morgan"
          autoComplete="name"
          required
          className={`form-input ${errors.name ? "input-error" : ""}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <small id="name-error" className="field-error-text" role="alert">
            {errors.name}
          </small>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email-input" className="form-label">
          Email address
        </label>
        <input
          id="email-input"
          name="email"
          type="email"
          placeholder="alex@company.com"
          autoComplete="email"
          required
          className={`form-input ${errors.email ? "input-error" : ""}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <small id="email-error" className="field-error-text" role="alert">
            {errors.email}
          </small>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="message-input" className="form-label">
          Message
        </label>
        <textarea
          id="message-input"
          name="message"
          rows={5}
          placeholder="Tell me about your project, idea, or questions..."
          required
          className={`form-textarea ${errors.message ? "input-error" : ""}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <small id="message-error" className="field-error-text" role="alert">
            {errors.message}
          </small>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="contact-submit-btn"
      >
        <span>{isSubmitting ? "Sending..." : "Send message"}</span>
        <Send size={15} />
      </button>

      {notice && (
        <div
          className={`form-notice-box notice-${notice.type}`}
          role="status"
          aria-live="polite"
        >
          {notice.type === "success" && <CheckCircle2 size={16} />}
          {notice.type === "error" && <AlertCircle size={16} />}
          <span>{notice.text}</span>
        </div>
      )}
    </form>
  );
}
