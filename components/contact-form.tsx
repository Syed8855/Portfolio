"use client";
import type { FormEvent } from "react";
import { useState } from "react";
import { z } from "zod";
const schema = z.object({
	name: z.string().min(2, "Please enter your name."),
	email: z.string().email("Please enter a valid email address."),
	message: z.string().min(10, "Please add a slightly longer message."),
});

const contactEmail = "iamsyedhasnain04@gmail.com";
const contactEndpoint = "/api/contact";

export function ContactForm() {
	const [notice, setNotice] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const parsed = schema.safeParse(Object.fromEntries(formData));

		if (!parsed.success) {
			setNotice("");
			setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
			return;
		}

		const values = parsed.data;
		const subject = `Portfolio enquiry from ${values.name}`;
		const body = `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`;

		setErrors({});
		setNotice("Sending your message...");

		void fetch(contactEndpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...values, subject, body }),
		})
			.then(async (response) => {
				if (response.ok) {
					setNotice("Message sent. I’ll reply as soon as possible.");
					event.currentTarget.reset();
					return;
				}

				throw new Error("Submission failed");
			})
			.catch(() => {
				setNotice("Email client opened as a fallback.");
				window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			});
	}

	return (
		<form className="contact-form" onSubmit={submit} noValidate>
			<label>
				<span>Name</span>
				<input name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
				{errors.name && (
					<small id="name-error" role="alert">
						{errors.name}
					</small>
				)}
			</label>
			<label>
				<span>Email</span>
				<input name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
				{errors.email && (
					<small id="email-error" role="alert">
						{errors.email}
					</small>
				)}
			</label>
			<label>
				<span>Message</span>
				<textarea name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
				{errors.message && (
					<small id="message-error" role="alert">
						{errors.message}
					</small>
				)}
			</label>
			<button className="button primary" type="submit">
				Send message
			</button>
			{notice && (
				<p className="notice" role="status" aria-live="polite">
					{notice}
				</p>
			)}
		</form>
	);
}
