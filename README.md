# Moxify

Moxify is a React, TypeScript, Vite, and Tailwind site for senior delivery and programme management services. It includes a Supabase-backed contact form and Vercel deployment headers.

## Local Setup

Use Node and npm versions compatible with the current Vite toolchain. This workspace has been checked with:

- Node `v24.14.0`
- npm `11.9.0`

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview -- --host 127.0.0.1 --port 4173
```

## Environment Variables

The contact form reads Supabase configuration from Vite environment variables:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

If either value is missing or invalid, the form shows a fallback message asking users to email `info@moxify.co.uk`.

## Contact Form Requirements

The browser submits directly to the Supabase `enquiries` table. Before production use, confirm these settings in Supabase:

- Row Level Security is enabled on `enquiries`.
- The anonymous role can insert only the intended enquiry columns.
- The anonymous role cannot select, update, or delete enquiries.
- Database constraints match the front end limits:
  - `name` up to 100 characters
  - `company` up to 100 characters, nullable
  - `email` up to 254 characters
  - `message` up to 5000 characters
- Spam controls are acceptable for the current risk level. The front end includes a honeypot, but stronger protection should be added if spam appears.

## Deployment Notes

The Vercel headers live in `vercel.json`.

- The Content Security Policy currently allows the production Supabase origin, Vercel Analytics, Google Fonts, self-hosted images, and app assets.
- If `VITE_SUPABASE_URL` changes, update `connect-src` in `vercel.json` at the same time.
- HSTS is enabled. Confirm HTTPS and canonical-domain redirects are correct before relying on preload behavior.

## Verification Checklist

Run these before release:

```bash
npm run lint
npm run build
npm audit --omit=dev
npm audit
```

Then smoke test the production build locally:

- Load the preview URL and confirm HTTP 200.
- Check desktop and mobile viewports.
- Confirm the hero heading, intro copy, and CTAs are visible above the fold.
- Submit the contact form blank and confirm validation errors appear.
- Try an invalid email and short message.
- Confirm long fields are constrained by the front end limits.
- Confirm a valid-looking submission either reaches Supabase or shows the configured fallback when Supabase is not configured.

External production checks:

- Google PageSpeed Insights for `https://moxify.co.uk/`.
- Google Search Console Core Web Vitals field data.
- Vercel production headers and environment variables.
- Supabase RLS and table policies.
- Real-device smoke tests on iPhone Safari and Android Chrome.
