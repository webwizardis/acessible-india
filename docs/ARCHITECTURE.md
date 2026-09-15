# Architecture

The app is a small two-process web application:

```text
Browser
  ├─ React/Vite client :5000
  │   ├─ Camera + canvas capture
  │   ├─ Web Speech API
  │   └─ MediaPipe hand-landmarker (optional)
  └─ relative /api requests → Express server :3001
      ├─ GET  /api/health
      ├─ POST /api/vision/analyze → Gemini REST API (server-side key)
      └─ GET  /api/accessibility/locations → curated JSON
```

Vite proxies `/api` to Express during local development. The production server can serve `client/dist` after `npm run build`. The client never receives `GEMINI_API_KEY`.

## Important paths

- `client/src/pages/` — the three user-facing modes and the home page.
- `client/src/hooks/` — camera and speech lifecycle helpers.
- `client/src/services/` — browser API clients.
- `server/routes/` — small API route handlers.
- `server/services/gemini.js` — server-only vision integration and safety prompt.
- `data/accessibility-locations.json` — explicitly curated demo records.