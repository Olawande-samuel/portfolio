import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://olawande-akinmosin.vercel.app',
	// Pages stay static; only routes that opt out of prerendering (the contact API) run as functions.
	output: 'static',
	adapter: vercel(),
	redirects: {
		'/projects': '/work',
		'/techstack': '/#stack',
	},
	env: {
		schema: {
			MAIL_HOST: envField.string({ context: 'server', access: 'secret' }),
			MAIL_PORT: envField.number({ context: 'server', access: 'secret', default: 587 }),
			MAIL_USERNAME: envField.string({ context: 'server', access: 'secret' }),
			MAIL_PASSWORD: envField.string({ context: 'server', access: 'secret' }),
			MAIL_ENCRYPTION: envField.enum({ context: 'server', access: 'secret', values: ['tls', 'ssl'], default: 'tls' }),
			MAIL_FROM_ADDRESS: envField.string({ context: 'server', access: 'secret' }),
			MAIL_FROM_NAME: envField.string({ context: 'server', access: 'secret', default: 'Portfolio Contact' }),
			/** Where enquiries are delivered. Defaults to the from address. */
			MAIL_TO_ADDRESS: envField.string({ context: 'server', access: 'secret', optional: true }),
		},
	},
});
