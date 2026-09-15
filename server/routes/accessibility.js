import { Router } from 'express';
import locations from '../../data/accessibility-locations.json' with { type: 'json' };

const router = Router();
router.get('/locations', (_request, response) => response.json({ locations, source: 'curated-demo-data', verifiedNationwide: false }));
export default router;