type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorFor(control: Control): string {
	const value = control.value.trim();
	if (control.required && !value) {
		if (control.type === "email") return "Add an email so I can reply.";
		if (control.tagName === "TEXTAREA") return "Tell me a little about it.";
		return "This one’s required.";
	}
	if (value && control.type === "email" && !EMAIL_RE.test(value)) return "That email doesn’t look right.";
	if (value && control.type === "url") {
		try {
			const url = new URL(value);
			if (!/^https?:$/.test(url.protocol)) throw new Error();
		} catch {
			return "Use a full link, starting with https://";
		}
	}
	return "";
}

function setError(control: Control, message: string) {
	const slot = document.getElementById(`${control.id}-error`);
	if (slot) slot.textContent = message;
	if (message) control.setAttribute("aria-invalid", "true");
	else control.removeAttribute("aria-invalid");
}

function validate(form: HTMLFormElement): boolean {
	const controls = Array.from(form.querySelectorAll<Control>(".input"));
	let firstInvalid: Control | null = null;
	for (const control of controls) {
		const message = errorFor(control);
		setError(control, message);
		if (message && !firstInvalid) firstInvalid = control;
	}
	firstInvalid?.focus();
	return !firstInvalid;
}

interface Options {
	/** Called after a successful submission. */
	onSuccess: () => void;
}

/**
 * Validates and submits a contact form to its `action` (/api/contact) with fetch.
 * Without JS the form still posts natively to the same endpoint.
 */
export function initForm(form: HTMLFormElement, { onSuccess }: Options) {
	const button = form.querySelector<HTMLButtonElement>("button[type=submit]");
	const errorBox = form.querySelector<HTMLElement>("[data-form-error]");
	const label = button?.textContent ?? "";

	// Re-check a field once the user has been told it's wrong, so the error clears as they fix it.
	form.addEventListener("input", (e) => {
		const control = e.target as Control;
		if (control.getAttribute("aria-invalid") === "true") setError(control, errorFor(control));
	});

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		if (errorBox) errorBox.hidden = true;
		if (!validate(form)) return;

		if (button) {
			button.disabled = true;
			button.textContent = "Sending…";
		}

		try {
			const res = await fetch(form.action, {
				method: "POST",
				body: new FormData(form),
				headers: { Accept: "application/json" },
			});
			if (res.status === 422) {
				// Server-side validation caught something the client didn't: show it inline.
				const { errors = {} } = (await res.json()) as { errors?: Record<string, string> };
				let first: Control | null = null;
				for (const [name, message] of Object.entries(errors)) {
					const control = form.elements.namedItem(name) as Control | null;
					if (!control) continue;
					setError(control, message);
					first ??= control;
				}
				first?.focus();
				return;
			}
			if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
			form.reset();
			onSuccess();
		} catch (err) {
			console.error(err);
			if (errorBox) errorBox.hidden = false;
		} finally {
			if (button) {
				button.disabled = false;
				button.textContent = label;
			}
		}
	});
}
