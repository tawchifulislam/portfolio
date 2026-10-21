# Technical notes

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, Payload CMS 3, MongoDB Atlas, Vercel Blob, Vercel. The site is JavaScript; the Payload configuration is TypeScript.

## How it works

- The public site (`src/app/(site)`) and the admin (`src/app/(payload)`) are separate route groups in one Next.js app.
- Pages read content on the server through `src/lib/cms.js` (Payload Local API) and are statically generated.
- Saving or deleting content in the admin revalidates the site (`src/revalidate.ts`), so changes go live without a rebuild. If a revalidation fails, the last good page keeps being served.
- Images are stored in Vercel Blob. `next/image` handles resizing and format conversion.
- The contact form is a server action (`src/lib/actions.js`) with validation, a honeypot field and a rate limit. Messages are saved to the admin inbox; EmailJS sends a backup notification.

## Key files

| Path | Purpose |
| --- | --- |
| `src/collections.ts`, `src/globals.ts` | Content model |
| `src/payload.config.ts` | Payload configuration |
| `src/lib/cms.js` | Data layer used by the site |
| `src/lib/defaults.json`, `public/images/` | Original content and images used by the reset function |
| `src/resetSite.ts` | Reset endpoint |
| `src/components/admin/` | Custom admin components |
| `src/app/(payload)/admin/importMap.js` | Lists admin components. Commit it after changes |

## Run locally

Requires Node.js 20.18.1 or newer, npm, a MongoDB database and a public Vercel Blob store.

```bash
npm install
cp .env.example .env
npm run dev
```

1. Fill in `.env`.
2. Open `http://localhost:3000/admin` and create the first admin user.
3. To load the original content, open the dashboard, expand Danger zone and run Reset site.

Use a separate database and Blob store for local development, never the production ones.

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | MongoDB connection string, including the database name |
| `PAYLOAD_SECRET` | Yes | Random string used to sign sessions. Use a different value per environment |
| `BLOB_READ_WRITE_TOKEN` | Yes | Token of a public Vercel Blob store |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | No | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | No | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | No | EmailJS public key |

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Content notes

- Deleting a document is permanent. Image files are not removed automatically; delete unused ones from Media.
- Upload images at full quality (photos: at least 1200 px on the long edge). Do not pre-compress them.
- Reset site replaces Projects, Capstones, Experience, Tech Stack, Media, Profile and About with `src/lib/defaults.json` and `public/images`. Messages and users are kept. It cannot be undone. To change the baseline, edit `defaults.json` and redeploy.

## Deployment (Vercel)

1. Import the repository and connect a public Blob store.
2. Add the environment variables for Production, Preview and Development.
3. In MongoDB Atlas, allow network access from anywhere (`0.0.0.0/0`), because Vercel uses dynamic IP addresses. Use a dedicated database user limited to the portfolio database.
4. Deploy, then check: home page, `/admin` login, a content edit appearing on the site, a contact submission and an image upload.

When adding a custom domain, update `SITE_URL` in `src/lib/constants.js` and any allowed-origin settings in `src/payload.config.ts`.

## Operations

- Enable two-factor authentication on GitHub, Vercel and Atlas.
- Export the database regularly. Managed backups depend on the Atlas tier.
- Keep `next` and `payload` packages up to date, and run `npm audit --omit=dev` periodically.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Build fails at "Running TypeScript" with an `"id" argument must be of type string` error | Install `typescript@6`. TypeScript 7 is not supported by Next.js 16.2 |
| `PayloadComponent not found in importMap` | Restart the dev server or run `npx payload generate:importmap`. If that fails, add the entry to `importMap.js` manually and commit it |
| `/admin` fails on Vercel with a `sharp` error | Do not pass `sharp` to the Payload configuration. `next/image` handles image processing |
| Local `next build` fails while generating Open Graph images (seen on some Windows setups) | Vercel builds are not affected. Use `npm run dev` locally |
| Images look soft | Upload the original at full quality. `next/image` defaults to quality 75; to raise it, set `quality` on the image and list the value in `images.qualities` in `next.config.mjs` |
