import { Router } from 'express';
import { describeImage } from '../services/gemini.js';

const router = Router();
router.post('/analyze', async (request, response, next) => {
  try {
    const image = request.body?.image;
    if (typeof image !== 'string' || !image.startsWith('data:image/')) {
      return response.status(400).json({ error: 'Please send a captured image.' });
    }
    if (image.length > 8_000_000) return response.status(413).json({ error: 'That image is too large. Please try again.' });
    return response.json({ description: await describeImage(image) });
  } catch (error) {
    return next(error);
  }
});
export default router;