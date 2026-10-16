import { WeatherForecastItem, TicketmasterEvent } from '../types/index.ts';

export interface WeatherResult {
  status: 'loading' | 'success' | 'empty' | 'slow' | 'refused' | 'error';
  message: string;
  updateTime?: string;
  forecasts: WeatherForecastItem[];
  isRainDetected: boolean;
  rainAreas: string[];
}

export interface EventsResult {
  status: 'loading' | 'success' | 'empty' | 'slow' | 'refused' | 'unconfigured' | 'error';
  message: string;
  events: TicketmasterEvent[];
}

// Fetch real-time Singapore 2-hour weather forecast
// Using the exact route requested in PDF: /api/https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast
export async function fetchLiveSingaporeWeather(): Promise<WeatherResult> {
  const primaryEndpoint = '/api/https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast';
  const fallbackEndpoint = '/api/weather';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    let res: Response;
    try {
      res = await fetch(primaryEndpoint, { signal: controller.signal });
      if (!res.ok && res.status === 404) {
        // Fallback to /api/weather if reverse proxy route didn't match
        res = await fetch(fallbackEndpoint, { signal: controller.signal });
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        clearTimeout(timeoutId);
        return {
          status: 'slow',
          message: 'Data.gov.sg weather request was slow and timed out after 7.5 seconds.',
          forecasts: [],
          isRainDetected: false,
          rainAreas: []
        };
      }
      // Attempt fallback endpoint
      res = await fetch(fallbackEndpoint, { signal: controller.signal });
    }
    clearTimeout(timeoutId);

    if (res.status === 504) {
      return {
        status: 'slow',
        message: 'Data.gov.sg weather server connection was too slow (504 Gateway Timeout).',
        forecasts: [],
        isRainDetected: false,
        rainAreas: []
      };
    }

    if (!res.ok) {
      return {
        status: 'refused',
        message: `Data.gov.sg connection was refused (HTTP ${res.status}: ${res.statusText}).`,
        forecasts: [],
        isRainDetected: false,
        rainAreas: []
      };
    }

    const json = await res.json();

    // Data.gov.sg v2 structure: json.data.items[0].forecasts or json.items[0].forecasts
    const items = json?.data?.items || json?.items || [];
    if (!items || items.length === 0) {
      return {
        status: 'empty',
        message: 'Data.gov.sg weather feed returned empty items for the current 2-hour window.',
        forecasts: [],
        isRainDetected: false,
        rainAreas: []
      };
    }

    const currentItem = items[0];
    const forecasts: WeatherForecastItem[] = currentItem?.forecasts || [];
    if (forecasts.length === 0) {
      return {
        status: 'empty',
        message: 'No regional weather forecasts currently available from Data.gov.sg.',
        forecasts: [],
        isRainDetected: false,
        rainAreas: []
      };
    }

    // Check for precipitation keywords in forecast
    const rainKeywords = ['rain', 'shower', 'showers', 'thundery', 'heavy', 'storm'];
    const rainAreas: string[] = [];

    for (const f of forecasts) {
      const lower = f.forecast.toLowerCase();
      if (rainKeywords.some(keyword => lower.includes(keyword))) {
        rainAreas.push(f.area);
      }
    }

    return {
      status: 'success',
      message: 'Live 2-hour Singapore weather updated from Data.gov.sg.',
      updateTime: currentItem?.update_timestamp || new Date().toISOString(),
      forecasts,
      isRainDetected: rainAreas.length > 0,
      rainAreas
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return {
        status: 'slow',
        message: 'Data.gov.sg weather request was slow and timed out.',
        forecasts: [],
        isRainDetected: false,
        rainAreas: []
      };
    }

    return {
      status: 'refused',
      message: `Data.gov.sg service connection failed: ${err.message || 'Network refused request.'}`,
      forecasts: [],
      isRainDetected: false,
      rainAreas: []
    };
  }
}

// Fetch live Ticketmaster events via /api/events
// Guardrail: Never invent data. If API fails or key is missing, show a message, not sample rows.
export async function fetchLiveTicketmasterEvents(keyword = ''): Promise<EventsResult> {
  const endpoint = `/api/events${keyword ? `?keyword=${encodeURIComponent(keyword)}` : ''}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    const res = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.status === 503) {
      const data = await res.json().catch(() => ({}));
      return {
        status: 'unconfigured',
        message: data.message || 'Ticketmaster API key is not configured (503). Set TICKETMASTER_API_KEY in your server environment to display live concerts & attractions.',
        events: []
      };
    }

    if (res.status === 504) {
      return {
        status: 'slow',
        message: 'Ticketmaster API request was slow and timed out (504 Gateway Timeout).',
        events: []
      };
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        status: 'refused',
        message: errData.message || `Ticketmaster connection was refused (HTTP ${res.status}).`,
        events: []
      };
    }

    const data = await res.json();
    const embeddedEvents = data?._embedded?.events || [];

    if (!Array.isArray(embeddedEvents) || embeddedEvents.length === 0) {
      return {
        status: 'empty',
        message: 'No live events found on Ticketmaster for Singapore at this time.',
        events: []
      };
    }

    const parsedEvents: TicketmasterEvent[] = embeddedEvents.map((e: any) => ({
      id: e.id,
      name: e.name,
      url: e.url,
      dates: {
        start: {
          localDate: e.dates?.start?.localDate || '',
          localTime: e.dates?.start?.localTime || '',
        }
      },
      priceRanges: e.priceRanges || [],
      venues: e._embedded?.venues?.map((v: any) => ({
        name: v.name,
        city: { name: v.city?.name || 'Singapore' }
      })) || [],
      images: e.images || []
    }));

    return {
      status: 'success',
      message: `Found ${parsedEvents.length} live events from Ticketmaster Singapore.`,
      events: parsedEvents
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return {
        status: 'slow',
        message: 'Ticketmaster API was slow and timed out.',
        events: []
      };
    }

    return {
      status: 'refused',
      message: `Ticketmaster connection was refused: ${err.message || 'Unable to connect to /api/events.'}`,
      events: []
    };
  }
}
