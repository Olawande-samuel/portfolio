import type { APIRoute } from "astro";
import {
	MAIL_ENCRYPTION,
	MAIL_FROM_ADDRESS,
	MAIL_FROM_NAME,
	MAIL_HOST,
	MAIL_PASSWORD,
	MAIL_PORT,
	MAIL_TO_ADDRESS,
	MAIL_USERNAME,
} from "astro:env/server";
import nodemailer from "nodemailer";

// Runs as a serverless function; every other page is prerendered.
export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Fields each path may send, with display labels, in the order they appear in the email. */
const FIELDS = {
	hiring: { name: "Name", email: "Work email", company: "Company", role: "Role", type: "Type", jd: "Job description", message: "Message" },
	business: { name: "Name", email: "Email", business: "Business", project: "Kind of project", message: "What should it do?" },
} as const;

type Path = keyof typeof FIELDS;

const transporter = nodemailer.createTransport({
	host: MAIL_HOST,
	port: MAIL_PORT,
	// "ssl" means implicit TLS (port 465); "tls" means STARTTLS upgrade (port 587).
	secure: MAIL_ENCRYPTION === "ssl",
	requireTLS: MAIL_ENCRYPTION === "tls",
	auth: { user: MAIL_USERNAME, pass: MAIL_PASSWORD },
});

function clean(value: FormDataEntryValue | null, max: number): string {
	return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(path: Path, data: Record<string, string>): Record<string, string> {
	const errors: Record<string, string> = {};
	if (!data.name) errors.name = "This one’s required.";
	if (!data.email) errors.email = "Add an email so I can reply.";
	else if (!EMAIL_RE.test(data.email)) errors.email = "That email doesn’t look right.";
	if (!data.message) errors.message = "Tell me a little about it.";
	if (path === "hiring" && data.jd) {
		try {
			if (!/^https?:$/.test(new URL(data.jd).protocol)) throw new Error();
		} catch {
			errors.jd = "Use a full link, starting with https://";
		}
	}
	return errors;
}

function respond(request: Request, status: number, body: Record<string, unknown>) {
	if (request.headers.get("accept")?.includes("application/json")) {
		return Response.json(body, { status });
	}
	// No-JS fallback: a plain page with a way back.
	const ok = status === 200;
	const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${ok ? "Thanks" : "Something went wrong"}</title><body style="font-family:system-ui,sans-serif;background:#16131a;color:#f1eef4;padding:48px 24px;max-width:560px;margin:auto;line-height:1.6"><h1>${ok ? "Thanks. I’ll be in touch." : "Something went wrong."}</h1><p>${ok ? "I read everything that comes through here myself." : 'Please email me at <a style="color:#ee7752" href="mailto:olawandesamuel@gmail.com">olawandesamuel@gmail.com</a> instead.'}</p><p><a style="color:#ee7752" href="/">← Back to the site</a></p></body>`;
	return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export const POST: APIRoute = async ({ request }) => {
	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return respond(request, 400, { ok: false, error: "Invalid form data" });
	}

	// Honeypot: real visitors never see or fill this field. Pretend it worked.
	if (clean(form.get("website"), 200)) return respond(request, 200, { ok: true });

	const path = clean(form.get("path"), 20);
	if (path !== "hiring" && path !== "business") {
		return respond(request, 400, { ok: false, error: "Unknown enquiry type" });
	}

	const labels = FIELDS[path];
	const data: Record<string, string> = {};
	for (const key of Object.keys(labels)) {
		data[key] = clean(form.get(key), key === "message" ? 5000 : 300);
	}

	const errors = validate(path, data);
	if (Object.keys(errors).length) {
		return respond(request, 422, { ok: false, errors });
	}

	const source = clean(form.get("source"), 100) || "unknown";
	// Strip line breaks so a name can't inject extra headers into the subject.
	const name = data.name.replace(/[\r\n]+/g, " ");
	const subject = path === "hiring" ? `[Hiring] ${name}${data.company ? ` — ${data.company.replace(/[\r\n]+/g, " ")}` : ""}` : `[Business] ${name}${data.business ? ` — ${data.business.replace(/[\r\n]+/g, " ")}` : ""}`;

	const text = [
		...Object.entries(labels)
			.filter(([key]) => key !== "message" && data[key])
			.map(([key, label]) => `${label}: ${data[key]}`),
		"",
		`${labels.message}:`,
		data.message,
		"",
		"—",
		`Sent from ${source} (path: ${path})`,
	].join("\n");

	try {
		await transporter.sendMail({
			from: { name: MAIL_FROM_NAME, address: MAIL_FROM_ADDRESS },
			to: MAIL_TO_ADDRESS || MAIL_FROM_ADDRESS,
			replyTo: { name, address: data.email },
			subject,
			text,
		});
	} catch (err) {
		console.error("Contact form: failed to send mail", err);
		return respond(request, 502, { ok: false, error: "Mail delivery failed" });
	}

	return respond(request, 200, { ok: true });
};
