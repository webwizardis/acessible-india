# Accessible India

**One app. Different abilities. Equal access.**

Accessible India is a mobile-first web MVP with three practical tools:

- **Vision Assistance** — capture a camera frame and request a concise, accessibility-focused description through a server-side Gemini integration.
- **Essential Sign Communication** — show essential phrases in very large text, with a manual fallback and an optional MediaPipe hand-presence check.
- **Accessible Route Finder** — compare a small curated demo dataset by step-free entrances, ramps, elevators and accessible toilets.

This project is intentionally honest about its limits: vision output is not certified safety guidance, the communication vocabulary is not full Indian Sign Language translation, and mobility records are not nationwide verified coverage.

## Run locally

```bash
npm install
npm --prefix client install
cp .env.example .env
npm run dev
```

The client is available at `http://localhost:5000`; the Express API runs on port 3001 and is proxied by Vite in development.

For a production-style client build:

```bash
npm run build
npm start
```

## Environment variables

Names only belong in `.env.example`. Put real values in a local ignored `.env` file or Replit Secrets:

- `GEMINI_API_KEY` — optional for the Vision Assistance API. Without it, the app shows a clear setup message and the other modes remain usable.
- `GEMINI_MODEL` — optional model name; defaults to `gemini-2.0-flash`.
- `GOOGLE_MAPS_API_KEY` — reserved for a future server-side real routing integration; this MVP does not claim real-time routing.

Never put a server key in React/Vite code or commit `.env`.

## Architecture

The React/Vite client in `client/` provides accessible pages and browser-only capabilities such as camera access, speech synthesis and MediaPipe. The Express server in `server/` owns the `/api` endpoints. Captured images are posted to `/api/vision/analyze`; only the server communicates with Gemini. Curated mobility records live in `data/accessibility-locations.json`.

## Accessibility choices

The interface uses semantic headings and labels, keyboard-visible focus, strong contrast, large controls, text alternatives for speech, camera permission explanations, status/error announcements and a manual fallback for the communication demo. Reduced-motion preferences are respected.

## Testing status

The build is checked with `npm run build` and the API health/data endpoints are smoke-tested during setup. Camera, speech and MediaPipe behavior still depend on the browser/device and should be tested on a real HTTPS-enabled phone before a public demo. See `docs/TESTING.md` for the checklist.

## AI-assisted development and credits

See `docs/AI_USAGE.md` for the AI-assisted development disclosure. External libraries include React, Vite, Express, CORS, dotenv, MediaPipe Tasks Vision and the browser Web Speech API. They remain under their respective licenses and documentation.

## Replit

Add `GEMINI_API_KEY` through Replit Secrets if you want live vision analysis. The Replit run workflow should use `npm run dev` for preview; the production run command is `npm run start` after `npm run build`.