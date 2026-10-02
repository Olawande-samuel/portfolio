import type { ImageMetadata } from "astro";

import careerminds from "../assets/projects/careerminds.png";
import classpodia from "../assets/projects/classpodia.png";
import ejik from "../assets/projects/ejik.png";
import excelmind from "../assets/projects/excelmind.png";
import fulazo from "../assets/projects/fulazo.png";
import gotocourse from "../assets/projects/gotocourse.png";
import haiven from "../assets/projects/haiven.png";
import meetifix from "../assets/projects/meetifix.png";
import spilleet from "../assets/projects/spilleet.png";
import veripass from "../assets/projects/veripass.png";
import weyzDriverOffline from "../assets/projects/weyz-driver-offline.png";
import weyzRider from "../assets/projects/weyz-rider.png";
import weyzSuccess from "../assets/projects/weyz-success.png";

export const links = {
	email: "olawandesamuel@gmail.com",
	github: "https://github.com/Olawande-samuel",
	linkedin: "https://www.linkedin.com/in/olawande-akinmosin",
	resume: "/Olawande_Akinmosin_Frontend_CV.pdf",
};

export interface Project {
	name: string;
	sector: string;
	kind: string;
	blurb: string;
	role: string;
	outcome: string;
	stack: string[];
	/** Single screenshot. Omit when the project uses phone shots instead. */
	image?: ImageMetadata;
	/** Phone screenshots shown side by side on a gradient panel. */
	phones?: ImageMetadata[];
	/** Subset of `phones` used on the compact /work card. */
	phonesCompact?: ImageMetadata[];
}

/** Featured projects. Home and /work both read from this list. */
export const projects: Project[] = [
	{
		name: "Haiven",
		sector: "PropTech",
		kind: "Employed · current",
		blurb:
			"Residential communities were running access, billing and requests across WhatsApp groups and spreadsheets. Haiven is one multi-tenant platform for all of it — wallets, payments, smart-lock access, resident and admin apps.",
		role: "Frontend lead — architecture, design system, mobile + web builds",
		outcome: "10+ communities, 1,000+ users on one codebase",
		stack: ["React", "React Native", "Next.js", "TypeScript", "TanStack Query", "Xpress Wallet"],
		image: haiven,
	},
	{
		name: "ExcelMind",
		sector: "EdTech",
		kind: "Contract",
		blurb:
			"Schools needed their own branded portal without a separate deployment each. Multi-tenant school management with role-based access for admins, teachers, students and parents, and per-tenant theming.",
		role: "Frontend engineer — RBAC surfaces, tenant branding system",
		outcome: "Built and handed off to the client team",
		stack: ["Next.js", "TypeScript", "Tailwind"],
		image: excelmind,
	},
	{
		name: "Veripass",
		sector: "LegalTech",
		kind: "Product",
		blurb:
			"Migration applicants were tracking document checks, lawyer consultations and course material across email and WhatsApp. Built from scratch: one role-based portal where applicants see their progress, documents and bookings, and consultants pick up cases at their stage.",
		role: "Frontend engineer — greenfield build",
		outcome: "Casework tracked end to end in one system",
		stack: ["React", "TypeScript", "React Hook Form", "Zod", "REST"],
		image: veripass,
	},
	{
		name: "Weyz",
		sector: "Transportation",
		kind: "Contract",
		blurb:
			"Campus transport ran on cash and paper shifts. Two React Native apps on one core: riders top up a wallet and tap their phone or scan a QR to pay for a trip, drivers check in to a vehicle, run a route and validate boarding.",
		role: "Mobile engineer — Rider and Driver apps",
		outcome: "NFC tap-to-pay, 2FA and passkey sign-in shipped in both apps",
		stack: ["React Native", "TypeScript", "NativeWind", "NFC", "2FA", "Passkeys"],
		phones: [weyzRider, weyzDriverOffline, weyzSuccess],
		phonesCompact: [weyzRider, weyzSuccess],
	},
];

export interface ArchiveProject {
	name: string;
	meta: string;
	line: string;
	stack: string[];
	image: ImageMetadata;
	live?: string;
	code?: string;
}

export const archive: ArchiveProject[] = [
	{
		name: "CareerMinds",
		meta: "EdTech · Independent",
		line: "Cybersecurity career training built around video, audio and transcribed lessons.",
		stack: [],
		image: careerminds,
	},
	{
		name: "EJik Group",
		meta: "Corporate",
		line: "Website for a conglomerate in pharmaceuticals, travel and engineering, with a news section and a custom blog.",
		stack: ["React", "Next.js", "TypeScript"],
		image: ejik,
		live: "https://ejik.vercel.app/",
		code: "https://github.com/olawande-samuel/Ejik",
	},
	{
		name: "Gotocourse",
		meta: "EdTech · Employed",
		line: "A platform to launch, automate and scale online courses, with live classes and school management.",
		stack: ["React", "Next.js", "TypeScript", "AWS Amplify", "Vercel"],
		image: gotocourse,
		code: "https://github.com/olawande-samuel/olawande-gotocourse",
	},
	{
		name: "Meetifix",
		meta: "Communications",
		line: "One place to meet customers and leads, from anywhere, at any time.",
		stack: ["React", "Next.js", "TypeScript", "Styled Components", "AWS Chime"],
		image: meetifix,
		code: "https://github.com/olawande-samuel/meetifix",
	},
	{
		name: "Classpodia",
		meta: "EdTech",
		line: "An online platform for teaching and learning.",
		stack: ["React", "Styled Components", "CSS"],
		image: classpodia,
		code: "https://github.com/Olawande-samuel/olawande_gotocourse",
	},
	{
		name: "Fulazo",
		meta: "PropTech",
		line: "A decentralised real estate platform offering affordable property.",
		stack: ["Vite", "React", "Tailwind", "SCSS"],
		image: fulazo,
		live: "https://fulazo.vercel.app",
		code: "https://github.com/Olawande-samuel/fulazo",
	},
	{
		name: "Spilleet",
		meta: "Social",
		line: "Subscription-based social media and micro-blogging app, moved from Next.js to React.",
		stack: ["React", "Next.js", "Vercel"],
		image: spilleet,
		code: "https://github.com/Olawande-samuel/React_spilleet",
	},
];

export const stackGroups = [
	{ label: "Frontend", items: ["React", "Next.js", "React Native (Expo)", "TypeScript", "Tailwind", "shadcn/ui", "Material UI"] },
	{ label: "State / Data", items: ["TanStack Query", "Zustand", "Redux Toolkit", "React Hook Form", "Zod"] },
	{ label: "Backend / APIs", items: ["Laravel", "Node.js", "Express", "Supabase", "MySQL", "REST", "GraphQL"] },
	{ label: "Payments", items: ["Stripe", "Paystack", "Flutterwave", "Xpress Wallet"] },
	{ label: "Infra", items: ["GitHub Actions", "Vercel", "DigitalOcean", "AWS Amplify", "Render"] },
];

export interface Step {
	n: string;
	title: string;
	body: string;
}

/** Short process copy for the Home teaser. */
export const processShort: Step[] = [
	{ n: "01", title: "Discovery", body: "What the site has to do, who it has to do it for, what counts as working." },
	{ n: "02", title: "Design & build", body: "Structure and screens first, then the build, reviewed as it goes." },
	{ n: "03", title: "Launch", body: "Domain, analytics, handover. You own the accounts." },
	{ n: "04", title: "Support", body: "A fixed window for fixes, then optional ongoing care." },
];

/** Full process copy for /work-with-me. */
export const process: Step[] = [
	{ n: "01", title: "Discovery", body: "A call. What the site has to do, who for, and what counts as working. Then a written scope and a price." },
	{ n: "02", title: "Design & build", body: "Structure and screens first, then the build. You see it as it goes, not at the end." },
	{ n: "03", title: "Launch", body: "Domain, analytics, handover. The accounts are in your name, not mine." },
	{ n: "04", title: "Support", body: "A fixed window for fixes after launch, then optional ongoing work if you want it." },
];

export const services: Step[] = [
	{ n: "01", title: "Marketing sites", body: "The public face of the business. Fast on a phone, easy for you to update." },
	{ n: "02", title: "Booking & scheduling", body: "Customers pick a slot, you get the calendar. Reminders, cancellations, no double-booking." },
	{ n: "03", title: "Ordering & payments", body: "Carts, checkout, deposits. Stripe, Paystack or Flutterwave wired up properly." },
	{ n: "04", title: "Internal dashboards", body: "The screen your staff live in. Records, roles, reports — not a spreadsheet." },
	{ n: "05", title: "MVP builds", body: "A first real version of a product idea, built to be extended rather than thrown away." },
	{ n: "06", title: "Mobile apps", body: "React Native for iOS and Android from one codebase, shipped to both stores." },
	{ n: "07", title: "Rescue work", body: "A site somebody else left broken, slow or half-finished. I’ll assess it before promising a fix." },
	{ n: "08", title: "Retainer", body: "Ongoing development once it’s live, for businesses that keep changing." },
];

/** Project types for the /contact business select (singular, as in the design). */
export const projectKinds = [
	"Marketing site",
	"Booking & scheduling",
	"Ordering & payments",
	"Internal dashboard",
	"MVP build",
	"Mobile app",
	"Rescue work",
	"Retainer",
	"Not sure yet",
];

export const included = [
	"A written scope before any work starts",
	"Design and build, mobile-first",
	"Payments, bookings and forms wired to real services",
	"Analytics, domain setup and launch",
	"Handover in your accounts, with a walkthrough",
	"A fixed window of post-launch fixes",
];

export const excluded = ["Logo and brand identity design", "Copywriting", "SEO campaigns and ongoing marketing"];

export const jobs = [
	{
		org: "Managerr Solutions",
		title: "Senior Frontend Engineer (Web & Mobile)",
		dates: "Feb 2024 – Present",
		meta: "Current",
		body: "Lead frontend engineer for Haiven, a multi-tenant digital operations platform serving residential and commercial communities through web and mobile applications.",
	},
	{
		org: "Avancier Technologies",
		title: "Frontend Engineer",
		dates: "Jul 2024 – Jul 2025",
		meta: "Contract",
		body: "Worked across multiple greenfield SaaS products spanning EdTech, LegalTech, Transportation and enterprise operations, including ExcelMind, Veripass and the Weyz Rider & Driver apps.",
	},
	{
		org: "Gotocourse",
		title: "Lead Frontend Developer",
		dates: "Jun 2022 – Jan 2024",
		meta: "Remote · Full time",
		body: "Led frontend engineering for an EdTech platform serving about 600 users across five schools.",
	},
	{
		org: "FireSwitch Technologies",
		title: "Frontend Developer",
		dates: "Mar 2021 – Jun 2022",
		meta: "Hybrid, Ibadan · Full time",
		body: "Developed production web applications for hospitality, fintech and entertainment clients.",
	},
];

export const education = [
	{ dates: "2019 – 2021", degree: "M.A. English", school: "University of Ibadan" },
	{ dates: "2014 – 2018", degree: "B.A. English", school: "University of Ibadan" },
];
