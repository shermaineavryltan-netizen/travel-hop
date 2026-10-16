import React from 'react';
import { CloudRain, Sun, Cloud, RefreshCw, AlertTriangle, ShieldCheck, Umbrella } from 'lucide-react';
import { WeatherResult } from '../services/api.ts';

interface WeatherBannerProps {
  weather: WeatherResult;
  isSimulatedRain: boolean;
  onToggleSimulateRain: () => void;
  onRefreshWeather: () => void;
  onSwitchToContingency: () => void;
}

export const WeatherBanner: React.FC<WeatherBannerProps> = ({
  weather,
  isSimulatedRain,
  onToggleSimulateRain,
  onRefreshWeather,
  onSwitchToContingency,
}) => {
  const isRain = isSimulatedRain || weather.isRainDetected;

  // Selected key tourist & local outing areas in Singapore
  const priorityAreas = ['City', 'Marina Bay', 'Sentosa', 'Southern Islands', 'Orchard', 'Queenstown'];
  const displayedForecasts = weather.forecasts.filter(f =>
    priorityAreas.some(area => f.area.toLowerCase().includes(area.toLowerCase()))
  ).slice(0, 5);

  return (
    <section className="bg-slate-900 text-white border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Left: Weather Status & Provider attribution */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isRain ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
            }`}>
              {isRain ? <CloudRain className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
                  Data.gov.sg 2-Hour Singapore Forecast
                </span>
                {weather.status === 'loading' && (
                  <span className="text-xs text-slate-400">Fetching live API...</span>
                )}
                {weather.updateTime && weather.status === 'success' && (
                  <span className="text-[11px] text-slate-400">
                    Updated {new Date(weather.updateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>

              {/* Sub-goal 3: Plain words status messages */}
              {weather.status === 'slow' && (
                <p className="text-xs text-amber-300 font-medium">
                  {weather.message}
                </p>
              )}
              {weather.status === 'refused' && (
                <p className="text-xs text-rose-300 font-medium">
                  {weather.message}
                </p>
              )}
              {weather.status === 'empty' && (
                <p className="text-xs text-slate-300 font-medium">
                  {weather.message}
                </p>
              )}
              {weather.status === 'success' && (
                <p className="text-xs text-slate-200">
                  {isRain ? (
                    <span className="text-amber-300 font-medium">
                      ⚠️ Inclement weather detected ({isSimulatedRain ? 'Simulated rain mode' : weather.rainAreas.join(', ')}). Outdoor itineraries may be affected.
                    </span>
                  ) : (
                    <span>Fair weather across major Singapore outing belts. Outdoor walks suitable.</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Center: Live regional forecast chips (unboxed clean labels) */}
          {weather.status === 'success' && displayedForecasts.length > 0 && (
            <div className="hidden lg:flex items-center gap-3 text-xs text-slate-300 overflow-x-auto py-1">
              {displayedForecasts.map((f, idx) => {
                const hasRain = f.forecast.toLowerCase().includes('rain') || f.forecast.toLowerCase().includes('shower');
                return (
                  <div key={idx} className="flex items-center gap-1.5 shrink-0 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
                    <span className="font-medium text-slate-200">{f.area}:</span>
                    <span className={hasRain ? 'text-amber-300 font-medium' : 'text-slate-300'}>{f.forecast}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Right: Actions (Refresh & Wet Weather Simulator toggle) */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={onToggleSimulateRain}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                isSimulatedRain
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
              title="Toggle wet weather condition to test secondary itinerary recommendation"
            >
              <Umbrella className="w-3.5 h-3.5" />
              <span>{isSimulatedRain ? 'Rain Mode (On)' : 'Simulate Rain'}</span>
            </button>

            <button
              onClick={onRefreshWeather}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Refresh live weather from Data.gov.sg"
              aria-label="Refresh live weather"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${weather.status === 'loading' ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Rain Alert Banner when weather is prohibiting users (Sub-goal 4) */}
        {isRain && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-amber-950/30 -mx-4 px-4 py-2.5 sm:rounded-lg">
            <div className="flex items-center gap-2 text-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Weather Advisory:</strong> Rain or thunderstorms prohibit open-air exploration. A 100% sheltered secondary itinerary is prepared.
              </span>
            </div>

            <button
              onClick={onSwitchToContingency}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold rounded-md transition-colors whitespace-nowrap self-start sm:self-auto shrink-0 shadow-sm"
            >
              View Proposed Secondary Itinerary →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
