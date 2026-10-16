// Serverless function for Data.gov.sg real-time 2-hour weather forecast

export default async function handler(req, res) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const headers = { 'Accept': 'application/json' };
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
    return res.status(200).json(data);
  } catch (err) {
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
