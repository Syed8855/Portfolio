# Syed Hasnain Peeran Portfolio

A responsive Next.js App Router portfolio based on the supplied résumé. It includes semantic accessible UI, Framer Motion transitions, metadata, sitemap, robots rules, and a downloadable résumé.

## Run locally

1. Install Node 20+.
2. Run `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.

## Deploy

Push this directory to GitHub and import it in Vercel or Netlify. Update the production domain in `app/sitemap.ts` and `app/layout.tsx`.

## Contact form

The contact form submits to `app/api/contact/route.ts`. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in your deployment environment. `CONTACT_FROM_EMAIL` is optional and defaults to Resend's onboarding sender.

## Content notes

The project deliberately avoids inventing social-profile URLs, metrics, testimonials, certificates, or live demos. Update `data/portfolio.ts` with verified links and details as they become available.
