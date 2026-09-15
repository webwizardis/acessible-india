import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import healthRouter from './routes/health.js';
import visionRouter from './routes/vision.js';
import accessibilityRouter from './routes/accessibility.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = Number(process.env.PORT || 3001);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.disable('x-powered-by');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api/health', healthRouter);
app.use('/api/vision', visionRouter);
app.use('/api/accessibility', accessibilityRouter);

const clientDist = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDist));
app.get(/.*/, (_request, response) => response.sendFile(path.join(clientDist, 'index.html')));
app.use(errorHandler);

app.listen(port, '0.0.0.0', () => console.log(`Accessible India API listening on port ${port}`));