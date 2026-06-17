# Nomichi Trip Desk

A trip enquiry and lead management tool for Nomichi, built for the engineering
intern assignment. This README is updated as the build progresses; it
currently reflects the **UI-first pass** — all three surfaces (public site,
team admin, trips CMS) are built and navigable end to end on mock data.
Supabase, auth, and the real AI call come next.

## What's built so far

**Public site**
- Homepage with hero and a grid of open trips, closed trips shown separately and dimmed
- Trip detail page with full description, dates, price (incl. GST), seat availability
- Enquiry form with inline validation, loading state, success state, and a simulated error state
- Trip-not-found page for bad or expired links

**Team admin** (not yet behind real auth — see Decisions)
- Login screen (currently accepts any `@thenomichi.com` email)
- Dashboard: total leads, leads by pipeline stage, leads per trip, team load
- Lead list with search (name, phone, email) and filters (status, trip, owner)
- Lead detail page: pipeline stepper, owner assignment, call log with add-note form, AI WhatsApp message generator
- Trips CMS: list, create, edit, with open/closed status controlling public visibility

**AI feature**
- Chose Option 1: first WhatsApp message generator, since it's the most directly useful
  thing a Nomichi associate would do right after a lead comes in
- Runs through `/api/ai/whatsapp-message`, a server-side route. Right now it returns a
  templated message so the UI is fully testable; swapping in a real Anthropic call is a
  contained change to one file and won't touch the frontend
- No API key will ever ship to the client — enforced by the route living server-side and
  reading from `process.env` only

## Decisions made (and why)

- **Mock data first.** `src/lib/mock-data.ts` mirrors the exact shape of the planned
  Postgres tables (`trips`, `leads`, `call_logs`). Swapping it for real Supabase queries
  later should mean changing imports, not rewriting components.
- **Owner is a flat list, not full multi-user auth.** Three seeded team members
  (`src/lib/mock-data.ts`) stand in for `auth.users`. Given the 7-day window, modeling
  "owner" as a simple assignable field was a better use of time than building out
  role-based team accounts. This is the first thing to revisit if there's time left over.
- **Stamp-style status badges** (dashed border) as the one deliberate visual signature,
  tying into the "slow travel, send a postcard" feel without leaning on generic
  rounded pill badges everywhere.
- **Self-hosted fonts via `@fontsource`** instead of `next/font/google`. Functionally
  identical output, but doesn't depend on reaching Google's font CDN at build time,
  which matters in network-restricted environments and avoids a class of build flakiness.
- **Not a fit** sits outside the main pipeline line, not at the end of it, since it's a
  branch outcome rather than a stage everyone passes through.

## Still to do

- Wire Supabase: schema, RLS policies, real auth, replacing every mock-data import
- Replace the templated AI route with a real Anthropic API call
- CSV export, activity timeline (stretch)
- Seed script for 3-4 trips + leads in the real database
- Vercel deployment

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres + Auth, pending) · Vercel (pending)

## Running locally

```bash
npm install
npm run dev
```

No environment variables are required yet since the app runs entirely on mock data.
Once Supabase is wired up, copy `.env.example` to `.env.local` and fill in real values.
