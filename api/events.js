// Serverless function for Ticketmaster Discovery API (Singapore)
// Guardrail: Read key from process.env inside api/ only.
// If key is empty, return 503 "key not configured" and do not call provider.

export default async function handler(req, res) {
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
    const countryCode = req.query?.countryCode || 'SG';
    const keyword = req.query?.keyword || '';
    const size = req.query?.size || '20';

    const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
    url.searchParams.set('apikey', apiKey);
    url.searchParams.set('countryCode', countryCode);
    url.searchParams.set('size', size);
    if (keyword) {
      url.searchParams.set('keyword', keyword);
    }

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
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
    return res.status(200).json(data);
  } catch (err) {
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
}
