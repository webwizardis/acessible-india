# Security notes

- Store `GEMINI_API_KEY` in Replit Secrets or an ignored local `.env`; never in React source, screenshots, fixtures or README content.
- The browser posts captured image data to the app server only. The server owns the provider credential.
- The vision endpoint validates that a request contains a data URL and rejects oversized payloads.
- Camera access is requested only after a user action, and streams are stopped when the mode unmounts.
- This MVP does not store images or mobility selections.
- If a key is ever committed, rotate it immediately. Removing the line does not remove it from Git history.
- Real Google Maps routing is not implemented; `GOOGLE_MAPS_API_KEY` is not read by the client.