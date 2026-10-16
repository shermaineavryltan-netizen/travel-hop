import React, { useEffect, useState } from 'react';
import { TicketmasterEvent } from '../types/index.ts';
import { fetchLiveTicketmasterEvents, EventsResult } from '../services/api.ts';
import { Ticket, Calendar, MapPin, ExternalLink, RefreshCw, AlertCircle, Info, Clock } from 'lucide-react';

export const LiveTicketmasterSection: React.FC = () => {
  const [eventsResult, setEventsResult] = useState<EventsResult>({
    status: 'loading',
    message: 'Connecting to /api/events for live Singapore listings...',
    events: []
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const loadEvents = async (keyword = '') => {
    setEventsResult(prev => ({ ...prev, status: 'loading', message: 'Fetching from /api/events...' }));
    const result = await fetchLiveTicketmasterEvents(keyword);
    setEventsResult(result);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <section className="py-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wide uppercase mb-1">
              <span>Sub-Goal 2: Live Ticketmaster Integration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Outfit']">
              Live Singapore Events & Shows
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Live data from Ticketmaster fetched exclusively via <code className="text-xs bg-slate-200 px-1.5 py-0.5 rounded text-slate-800">/api/events</code>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadEvents(searchKeyword)}
              placeholder="Search concerts or theatre..."
              className="text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
            <button
              onClick={() => loadEvents(searchKeyword)}
              className="p-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors"
              title="Refresh Ticketmaster live events"
              aria-label="Refresh events"
            >
              <RefreshCw className={`w-4 h-4 ${eventsResult.status === 'loading' ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Status display: Sub-goal 3 "When the data is empty, slow or refused, the screen says so in plain words." */}
        {eventsResult.status === 'loading' && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <RefreshCw className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">{eventsResult.message}</p>
          </div>
        )}

        {/* Unconfigured 503 Guardrail state */}
        {eventsResult.status === 'unconfigured' && (
          <div className="p-6 bg-white rounded-2xl border border-slate-300 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Ticketmaster Live Data Status: Key Not Configured (HTTP 503)
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {eventsResult.message}
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 font-mono">
                  Guardrail Invariant: If a key variable is empty, /api/events returns 503 "key not configured" and does not call the provider. No mock data is invented.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slow / Gateway Timeout state */}
        {eventsResult.status === 'slow' && (
          <div className="p-6 bg-white rounded-2xl border border-amber-300 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">
                  Data Status: Slow / Timed Out
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {eventsResult.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Refused state */}
        {eventsResult.status === 'refused' && (
          <div className="p-6 bg-white rounded-2xl border border-rose-300 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-900">
                  Data Status: Request Refused
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {eventsResult.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {eventsResult.status === 'empty' && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-600 font-medium">{eventsResult.message}</p>
          </div>
        )}

        {/* Live Events Success state */}
        {eventsResult.status === 'success' && eventsResult.events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsResult.events.map((event) => {
              const price = event.priceRanges?.[0];
              const venue = event.venues?.[0]?.name || 'Singapore Venue';
              const image = event.images?.[0]?.url;

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {image && (
                    <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                      <img
                        src={image}
                        alt={event.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{event.dates.start.localDate}</span>
                        {event.dates.start.localTime && (
                          <>
                            <span>·</span>
                            <span>{event.dates.start.localTime.slice(0, 5)}</span>
                          </>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900 line-clamp-2">
                        {event.name}
                      </h4>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span className="truncate">{venue}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Tickets From</span>
                        <div className="text-sm font-bold text-slate-900 tabular-nums">
                          {price ? `${price.currency} $${price.min.toFixed(2)}` : 'Pricing at Ticketmaster'}
                        </div>
                      </div>

                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <span>Book</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
