
# Meditrack — Vercel-ready prototype

This generated project is a minimal, deployable prototype of **Meditrack**, an attendance system for janitorial and security teams.

## What I included
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Simple login using facility passwords:
  - General Hospital → `admin1`
  - LASUCOM → `admin2`
  - Admin override (edits/submits) → `admin`
- Shift assignment via dashboard (basic; uses localStorage; intended to be switched to Firebase Realtime DB)
- Attendance form with PDF generation (jsPDF)
- Simple Firebase client utility (reads JSON from `NEXT_PUBLIC_FIREBASE_CONFIG_JSON`)

## How to use
1. Install deps:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```
3. To connect Firebase Realtime DB:
   - Create a Firebase Web app, copy the config object.
   - Set environment variable `NEXT_PUBLIC_FIREBASE_CONFIG_JSON` to the JSON representation of the config (Vercel -> Environment Variables).
   - The prototype currently uses `localStorage` for shifts/attendance; you can wire the firebase client in `components/attendance-form.tsx` and `app/dashboard/page.tsx`.

## Files provided from your upload
The uploaded file `/mnt/data/med.zip` was extracted into the project root so any configs you added are included.

## Deploying to Vercel
- Push this repository to GitHub.
- Import the repo into Vercel, set the environment variable `NEXT_PUBLIC_FIREBASE_CONFIG_JSON` if you want Firebase.
- Vercel will run `npm install` and `npm run build`.

