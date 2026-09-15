import { Router } from 'express';

const router = Router();
router.get('/', (_request, response) => response.json({ ok: true, service: 'accessible-india-api' }));
export default router;