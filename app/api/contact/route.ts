import { NextResponse } from "next/server";

type ContactPayload = {
	name?: string;
	email?: string;
	message?: string;
	subject?: string;
	body?: string;
};

function isValidEmail(value: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
	let payload: ContactPayload;

	try {
		payload = (await request.json()) as ContactPayload;
	} catch {
		return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
	}

	if (!payload.name || payload.name.trim().length < 2) {
		return NextResponse.json({ error: "Name is required." }, { status: 400 });
	}

	if (!payload.email || !isValidEmail(payload.email)) {
		return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
	}

	if (!payload.message || payload.message.trim().length < 10) {
		return NextResponse.json({ error: "Message is required." }, { status: 400 });
	}

	const apiKey = process.env.RESEND_API_KEY;
	const toEmail = process.env.CONTACT_TO_EMAIL ?? "iamsyedhasnain04@gmail.com";
	const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

	if (!apiKey) {
		return NextResponse.json(
			{
				error: "Contact service is not configured.",
				message: "Set RESEND_API_KEY, CONTACT_TO_EMAIL, and optionally CONTACT_FROM_EMAIL.",
			},
			{ status: 503 },
		);
	}

	const response = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: fromEmail,
			to: [toEmail],
			subject: payload.subject ?? `Portfolio enquiry from ${payload.name}`,
			test: false,
			text: payload.body ?? `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
			reply_to: payload.email,
		}),
	});

	if (!response.ok) {
		const details = await response.text();
		return NextResponse.json({ error: "Failed to send email.", details }, { status: 502 });
	}

	return NextResponse.json({ ok: true });
}