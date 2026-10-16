import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// 1. Ticketmaster API route - Guardrail: Read key from process.env inside api/ only.
// If key is empty, return 503 "key not configured" without calling provider.
app.get(['/api/events', '/api/ticketmaster'], async (req: Request, res: Response) => {
  const apiKey = process.env.TICKETMASTER_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return res.status(503).json({
      error: 'key not configured',
      provider: 'Ticketmaster',
      message: 'TICKETMASTER_API_KEY is not configured in process.env. Real-time Ticketmaster events require an active API key.'
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const keyword = typeof req.query.keyword === 'string' ? req.query.keyword : '';
    const size = typeof req.query.size === 'string' ? req.query.size : '20';

    const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('countryCode', 'SG');
    url.searchParams.set('size', size);
    if (keyword) {
      url.searchParams.set('keyword', keyword);
    }

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Provider refused request (${response.status})`,
        provider: 'Ticketmaster',
        message: `Ticketmaster API refused connection with status ${response.status}: ${response.statusText}`
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return res.status(504).json({
        error: 'timeout',
        provider: 'Ticketmaster',
        message: 'Ticketmaster API request timed out (connection slow).'
      });
    }
    return res.status(502).json({
      error: 'connection_failed',
      provider: 'Ticketmaster',
      message: err.message || 'Ticketmaster connection failed or was refused.'
    });
  }
});

// Helper for Data.gov.sg 2-hour weather forecast handler
async function handleDataGovSgWeather(req: Request, res: Response) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
    if (process.env.DATA_GOV_SG_API_KEY && process.env.DATA_GOV_SG_API_KEY.trim()) {
      headers['api-key'] = process.env.DATA_GOV_SG_API_KEY.trim();
    }

    const response = await fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast', {
      signal: controller.signal,
      headers
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Provider refused request (${response.status})`,
        provider: 'Data.gov.sg',
        message: `Data.gov.sg weather service refused request with status ${response.status}: ${response.statusText}`
      });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return res.status(504).json({
        error: 'timeout',
        provider: 'Data.gov.sg',
        message: 'Data.gov.sg real-time weather API was slow and timed out.'
      });
    }
    return res.status(502).json({
      error: 'connection_failed',
      provider: 'Data.gov.sg',
      message: err.message || 'Failed to connect to Data.gov.sg weather service.'
    });
  }
}

// 2. Weather route - matched both standard route and the exact path specified in PDF Goal #2:
// </api/https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast>
app.get('/api/https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast', handleDataGovSgWeather);
app.get('/api/weather', handleDataGovSgWeather);
app.get('/api/two-hr-forecast', handleDataGovSgWeather);

// Start server with Vite middleware in development or static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Trip Hop server listening on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
