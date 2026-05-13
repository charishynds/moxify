# Moxify Codebase Review Plan

Date: 2026-05-13

This document tracks the codebase review plan and the current findings so the review does not disappear into chat or task history.

## Pause Status

Paused on 2026-05-13 before launch. The code-side Must Do and Should Do items from this pass are implemented and locally verified. The remaining Must/Should work depends on external accounts, a real deployment URL, or real-device access.

Important context for tomorrow:

- `moxify.co.uk` is not the new site yet; it currently points at a different website.
- Do not treat current `moxify.co.uk` PageSpeed, headers, or Search Console data as evidence for this codebase until DNS/deployment points at the new site.
- Local artifacts from browser checks are in `.codex-review/`.

## Review Scope

- Core Web Vitals and performance
- Browser and responsive device checks
- Security, vulnerability, and deployment headers
- Contact form front end validation
- Build, lint, and dependency health
- Follow-up checks that require live production data or external account access

## Current Baseline

| Area | Check | Result |
| --- | --- | --- |
| Build | `npm run build` | Passes; Vite still warns that the main JS chunk is larger than 500 kB |
| Lint | `npm run lint` | Passes |
| Production dependency audit | `npm audit --omit=dev` | 0 vulnerabilities |
| Full dependency audit | `npm audit` | 0 vulnerabilities |
| Production preview | Vite preview at `http://127.0.0.1:4173/` | HTTP 200 |
| Desktop screenshot | Headless Edge, 1440 x 1200 | Hero heading, intro copy, and CTAs visible |
| Mobile screenshot | Headless Edge, 390 x 844 | Hero content visible; plain headless capture is not a true mobile device emulation |
| Live PageSpeed Insights | PageSpeed Insights API | Deferred until the new site is deployed to a real URL |
| Live production headers | Production URL | Deferred until the new site is deployed; current `moxify.co.uk` points at a different website |

## Core Web Vitals Targets

Google's current Core Web Vitals are:

- Largest Contentful Paint (LCP): good at 2.5 seconds or less.
- Interaction to Next Paint (INP): good at 200 ms or less.
- Cumulative Layout Shift (CLS): good at 0.1 or less.
- Google evaluates page/site status at the 75th percentile of real page views.

References:

- https://web.dev/articles/defining-core-web-vitals-thresholds
- https://support.google.com/webmasters/answer/9205520

## Findings And Recommendations

### P0: Hero content depended on client-side animation to become visible

Evidence:

- Earlier headless Edge screenshots at 1440 x 1200 and 390 x 844 showed the navigation and background, but not the hero heading, intro copy, or hero buttons.
- The hero used Framer Motion elements starting at `opacity: 0`.

Resolution:

- Hero heading, intro copy, and CTAs now render as plain visible HTML rather than motion elements.
- Re-test desktop and mobile screenshots after deployment or local preview.

### P1: Lint failures

Evidence:

- `Contact.tsx` previously failed `react-hooks/refs`.
- `button.tsx` previously exported `buttonVariants` alongside a component.
- `form.tsx` previously exported `useFormField` alongside components.

Resolution:

- The honeypot check now reads from submitted `FormData` instead of a ref.
- `buttonVariants` now lives in a helper module.
- `useFormField` is internal to `form.tsx`.
- `npm run lint` now passes.

### P1: Contact form depends on Supabase browser insert policy

Evidence:

- `Contact.tsx` inserts directly into `supabase.from('enquiries')` from the browser.

Risk:

- Without strict Row Level Security and insert-only policies, the public anon key could expose more than intended.
- Honeypot-only spam control is weak.

Recommended resolution:

- Verify Supabase RLS is enabled on `enquiries`.
- Allow anonymous users to insert only the intended columns.
- Deny select, update, and delete to the anon role.
- Add database constraints matching the front end limits: name <= 100, company <= 100, email <= 254, message <= 5000.
- Keep the current direct browser insert for now; add a serverless proxy, rate limiting, or CAPTCHA only if Supabase controls are not enough.

### P1: CSP hardcodes the Supabase project URL

Evidence:

- `vercel.json` has `connect-src` pinned to `https://dmqroeaweklqmgczcaej.supabase.co`.

Risk:

- The form will fail in preview/staging/prod if `VITE_SUPABASE_URL` changes but CSP does not.

Recommended resolution:

- Keep the hardcoded origin only if this project intentionally uses one Supabase environment.
- If multiple environments exist later, generate environment-specific headers or route form submissions through the app origin.
- Validate the deployed CSP after each production deploy.
- Confirm the production domain is actually served by the deployment that uses this `vercel.json` before validating live headers.

### P2: Bundle size should be watched

Evidence:

- Production build passes but Vite warns that the main JS chunk is larger than 500 kB.
- Current built JS is about 686 kB minified, 203 kB gzip.

Risk:

- The site is small, so a large single chunk can hurt LCP, Total Blocking Time, and INP on mobile.

Recommended resolution:

- Run PageSpeed Insights or Lighthouse on production.
- Only add bundle analysis if lab or field data shows JavaScript is materially hurting performance.
- Consider lazy-loading below-the-fold form integrations if performance data justifies it.

### P2: Retired credentials and sectors sections

Evidence:

- `Credentials.tsx` and `Sectors.tsx` existed but were not rendered in `App.tsx`.

Resolution:

- These sections were deliberately removed from the product experience.
- The retired component files have been deleted rather than archived.

### P2: README was the default Vite template

Resolution:

- README now documents setup, env vars, Supabase requirements, deployment notes, and verification checks.

## Contact Form Validation Plan

Current front end validation:

- `name`: required, trimmed, min 2, max 100.
- `company`: optional, trimmed, max 100, normalized to `undefined` before submit when blank.
- `email`: required, trimmed, valid email, max 254.
- `message`: required, trimmed, min 10, max 5000.
- Honeypot field exists.
- Required user-facing fields show error text and `aria-invalid`.
- Inputs include `maxLength` and appropriate `autoComplete` attributes.
- Submit is disabled while `isSubmitting` is true.

Server-side requirement:

- Mirror all validation in Supabase constraints or a future server-side submission layer.

## Browser And Device Testing Plan

Automated or local checks for this pass:

- Production preview HTTP smoke test.
- Headless Edge screenshot at desktop viewport, 1440 x 1200.
- Headless Edge screenshot at mobile viewport, 390 x 844.
- Confirm hero heading, intro copy, and CTA are visible above the fold.

Manual checks still recommended:

- iPhone Safari.
- Android Chrome.
- Desktop Chrome, Edge, Firefox, and Safari if available.
- Keyboard-only navigation.
- Screen reader smoke test with VoiceOver or NVDA.

Nice-to-have later:

- Add Playwright smoke tests if the site starts changing frequently or browser checks catch repeated regressions.

## Security And Vulnerability Plan

Already present in `vercel.json`:

- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- `Strict-Transport-Security`
- `Content-Security-Policy`

Recommended next checks:

- Validate headers on the deployed site, not just in `vercel.json`.
- Confirm CSP does not block fonts, Supabase, analytics, favicons, Open Graph images, or future assets.
- Confirm Supabase RLS and table constraints.

Nice-to-have later:

- Add Dependabot or Renovate.
- Add repository secret scanning if the repo is hosted on a platform that does not already provide it.

## Performance And Core Web Vitals Plan

Local checks:

- Confirm the production bundle builds.
- Confirm no obvious blank hero or above-the-fold rendering issue remains.

Production checks:

- Run PageSpeed Insights once the new site is deployed to a real URL.
- Check Search Console Core Web Vitals report for field data after the new site is live.
- Check Chrome UX Report data if the origin has enough traffic.
- Compare mobile and desktop separately, while keeping the same Google thresholds.

Likely performance recommendations:

- Keep H1 and primary CTA visible without waiting for JavaScript animation.
- Keep the page mostly static and minimize hydration work above the fold.
- Lazy-load below-the-fold form integrations only if performance data supports it.
- Avoid loading unused assets and template SVGs.
- Keep Open Graph and icon images compressed.

## Resolution Tiers

### Must Do

- Fix hero visibility so critical above-the-fold content is not animation-dependent. Done in source; desktop screenshot passes and mobile content is visible in headless capture.
- Fix lint failures. Done; `npm run lint` passes.
- Keep contact form validation aligned with production risk. Front end improved; Supabase policy checks still external.
- Validate CSP and deployed security headers. Local config reviewed; live check deferred until the new site is deployed.
- Run baseline validation and browser checks. Done locally; real-device checks still external.

### Should Do

- Remove retired credentials and sectors components. Done.
- Improve form polish with trimming, `maxLength`, `autoComplete`, explicit errors, and blank company normalization. Done.
- Run PageSpeed Insights or Lighthouse and act on actual Core Web Vitals data. Deferred until a real deployment URL exists.
- Do real mobile and desktop browser passes. Pending user/device checks.
- Update README with setup, env, deployment, and verification notes. Done.

### Nice To Have

- Add Playwright tests if site changes become frequent.
- Run bundle analysis if Lighthouse/PageSpeed shows JavaScript is a material bottleneck.
- Add a Vercel serverless form proxy if Supabase RLS and spam controls are not sufficient.
- Add Dependabot/Renovate and extra secret scanning as ongoing maintenance.

## Checks That Need You Or External Tools

### Must/Should Checks For You

- Supabase dashboard: confirm RLS is enabled on `enquiries`.
- Supabase dashboard: confirm anonymous users can insert enquiries but cannot select, update, or delete them.
- Supabase dashboard: confirm database constraints match the front end limits: name <= 100, company <= 100, email <= 254, message <= 5000.
- Vercel or deployment dashboard: confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured for the deployment.
- Vercel or deployment dashboard: confirm the deployed response includes the intended security headers from `vercel.json`.
- Domain/DNS provider: when ready, point the intended production domain at the new deployment and confirm HTTPS/canonical redirects.
- Real-device QA: smoke test on iPhone Safari and Android Chrome once there is a preview or production URL.
- PageSpeed Insights: run mobile and desktop reports for the new deployed URL, not the current `moxify.co.uk` placeholder/old site.
- Google Search Console: check Core Web Vitals field data only after the new site has been live long enough to collect data.

### Optional Later Tasks

- Add Playwright smoke tests if the site starts changing frequently or manual checks catch regressions.
- Run bundle analysis if PageSpeed/Lighthouse shows JavaScript is a material bottleneck.
- Add a Vercel serverless form proxy, rate limiting, or CAPTCHA if Supabase RLS and honeypot controls are not enough.
- Add Dependabot/Renovate and extra repository secret scanning as ongoing maintenance.

## Resume Checklist

When work resumes:

1. Run `git status --short` and preserve existing unrelated changes.
2. Run `npm run lint`.
3. Run `npm run build`.
4. If dependencies changed, rerun `npm audit --omit=dev` and `npm audit`.
5. Start a local preview and quickly re-check desktop/mobile hero rendering.
6. Decide whether to deploy to a preview URL.
7. Use the preview/deployed URL for PageSpeed, deployed-header checks, and real-device QA.
8. Complete the Supabase dashboard checks above before enabling the live form.
