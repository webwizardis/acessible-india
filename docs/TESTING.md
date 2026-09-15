# Testing checklist

## Automated setup checks

- `npm run build` — verifies the Vite client bundles.
- `GET /api/health` — verifies the Express process.
- `GET /api/accessibility/locations` — verifies the mobility dataset.

## Browser checklist

- [ ] Homepage loads with no console-breaking errors.
- [ ] All three mode cards navigate correctly.
- [ ] Keyboard navigation has visible focus.
- [ ] Vision camera permission success and denial states are useful.
- [ ] Vision capture sends a frame and displays either the Gemini result or a clear configuration/service error.
- [ ] Read Aloud works where the browser provides speech synthesis; text remains available otherwise.
- [ ] Communication phrase buttons update the large live message.
- [ ] Manual communication fallback works without camera or MediaPipe.
- [ ] Hand model loading failure leaves manual mode usable.
- [ ] Mobility records load and accessibility attributes are clearly labeled.
- [ ] Demo records are not presented as nationwide verified accessibility claims.
- [ ] Layout remains readable at mobile widths.

Test camera and speech on a real phone over HTTPS. Browser support, lighting and device voices vary.