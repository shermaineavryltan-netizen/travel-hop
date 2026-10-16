import React, { useState } from 'react';
import { Itinerary, ItineraryStop } from '../types/index.ts';
import { CURATED_ITINERARIES } from '../data/mockOutings.ts';
import { Umbrella, Sun, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Clock, MapPin, DollarSign, Users, ChevronRight, Vote } from 'lucide-react';

interface ItineraryComparisonProps {
  isRainActive: boolean;
  partySize: number;
  onVoteForItinerary: (itineraryId: string) => void;
}

export const ItineraryComparison: React.FC<ItineraryComparisonProps> = ({
  isRainActive,
  partySize,
  onVoteForItinerary,
}) => {
  // Pair 1: Marina Bay Fair (itin-marina-fair) vs Marina Bay Rain (itin-marina-rain)
  // Pair 2: Sentosa Fair (itin-sentosa-fair) vs Sentosa Rain (itin-sentosa-rain)
  const [selectedPairIndex, setSelectedPairIndex] = useState<number>(0);

  const itineraryPairs = [
    {
      title: 'Marina Bay Skyline vs Sheltered Cultural Trail',
      primary: CURATED_ITINERARIES.find(i => i.id === 'itin-marina-fair')!,
      secondary: CURATED_ITINERARIES.find(i => i.id === 'itin-marina-rain')!,
      area: 'Marina Bay / Downtown'
    },
    {
      title: 'Sentosa Outdoor Thrills vs S.E.A. Ocean Sanctuary',
      primary: CURATED_ITINERARIES.find(i => i.id === 'itin-sentosa-fair')!,
      secondary: CURATED_ITINERARIES.find(i => i.id === 'itin-sentosa-rain')!,
      area: 'Sentosa Island'
    }
  ];

  const currentPair = itineraryPairs[selectedPairIndex];
  const recommendedItinerary = isRainActive ? currentPair.secondary : currentPair.primary;

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wide uppercase mb-1">
          <span>Sub-Goal 4: Weather Contingency System</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Outfit']">
          Primary vs Proposed Secondary Itinerary
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Singapore tropical weather changes rapidly. When Data.gov.sg detects thundery showers or heavy rain, Trip Hop automatically activates the proposed secondary sheltered itinerary so your group outing never gets washed out.
        </p>
      </div>

      {/* Itinerary Pair Selector Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {itineraryPairs.map((pair, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPairIndex(idx)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedPairIndex === idx
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {pair.title}
          </button>
        ))}
      </div>

      {/* Weather Alert Banner if rain active */}
      {isRainActive ? (
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Umbrella className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                Inclement Weather Alert Active — Secondary Itinerary Recommended
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Outdoor trails and open boardwalks are prohibited due to heavy rain. The secondary plan replaces open-air stops with 100% sheltered biodomes, underground MRT links, and indoor food halls.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-200 text-amber-900 rounded-md">
              Secondary Plan Active
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-900">
                Fair Skies Forecasted — Primary Itinerary Active
              </h4>
              <p className="text-xs text-emerald-700">
                Weather conditions permit outdoor walks and open-air skyline experiences. Secondary plan remains on standby.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Card 1: Primary Itinerary */}
        <div
          className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
            !isRainActive
              ? 'bg-white border-slate-300 shadow-md ring-2 ring-slate-900/5'
              : 'bg-slate-50/80 border-slate-200 opacity-85'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Primary Itinerary
                </span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Sunny / Fair Weather
                </span>
              </div>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentPair.primary.shelterPercentage}% Sheltered</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              {currentPair.primary.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {currentPair.primary.tagline}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-100/70 rounded-xl text-center">
              <div>
                <span className="text-[11px] text-slate-500 block">Est. Cost / Pax</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  S${currentPair.primary.estimatedCostPerPax.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Group ({partySize} pax)</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  S${(currentPair.primary.estimatedCostPerPax * partySize).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Duration</span>
                <span className="text-sm font-bold text-slate-900">
                  {currentPair.primary.duration}
                </span>
              </div>
            </div>

            {/* Timeline Stops */}
            <div className="mt-5 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Itinerary Schedule & Stops
              </h5>
              <div className="space-y-2.5">
                {currentPair.primary.stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="flex items-start gap-3 p-2.5 bg-white rounded-lg border border-slate-100 shadow-2xs text-xs"
                  >
                    <span className="font-bold text-slate-900 tabular-nums shrink-0 w-16 pt-0.5">
                      {stop.time}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{stop.name}</span>
                        <span className="font-bold text-slate-700 tabular-nums shrink-0">
                          {stop.costPerPersonSGD === 0 ? 'Free' : `S$${stop.costPerPersonSGD.toFixed(2)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{stop.notes}</p>
                      <div className="mt-1 flex items-center gap-2 text-[10px]">
                        <span
                          className={`font-medium ${
                            stop.isSheltered ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {stop.isSheltered ? '✓ Sheltered' : '⚠️ Open Outdoor (Rain Risk)'}
                        </span>
                        <span>·</span>
                        <span className="text-slate-400">{stop.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transit Advice */}
            <div className="mt-4 p-3 rounded-lg bg-slate-100 text-[11px] text-slate-600">
              <strong>Transit:</strong> {currentPair.primary.transportAdvice}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => onVoteForItinerary(currentPair.primary.id)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <Vote className="w-4 h-4 text-slate-600" />
              <span>Vote for Primary Itinerary ({currentPair.primary.votes} votes)</span>
            </button>
          </div>
        </div>

        {/* Card 2: Proposed Secondary Itinerary (Wet Weather Contingency) */}
        <div
          className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
            isRainActive
              ? 'bg-amber-50/40 border-amber-300 shadow-lg ring-2 ring-amber-500/30'
              : 'bg-white border-slate-300 shadow-md ring-2 ring-slate-900/5'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Proposed Secondary
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>100% Weather-Proof</span>
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Umbrella className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Rain Risk</span>
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              {currentPair.secondary.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {currentPair.secondary.tagline}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-100/70 rounded-xl text-center">
              <div>
                <span className="text-[11px] text-slate-500 block">Est. Cost / Pax</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  S${currentPair.secondary.estimatedCostPerPax.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Group ({partySize} pax)</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums">
                  S${(currentPair.secondary.estimatedCostPerPax * partySize).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Duration</span>
                <span className="text-sm font-bold text-slate-900">
                  {currentPair.secondary.duration}
                </span>
              </div>
            </div>

            {/* Timeline Stops */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sheltered Itinerary Schedule
                </h5>
                <span className="text-[11px] font-semibold text-emerald-700">
                  All Undercover / Air-con
                </span>
              </div>

              <div className="space-y-2.5">
                {currentPair.secondary.stops.map((stop) => (
                  <div
                    key={stop.id}
                    className="flex items-start gap-3 p-2.5 bg-white rounded-lg border border-slate-100 shadow-2xs text-xs"
                  >
                    <span className="font-bold text-slate-900 tabular-nums shrink-0 w-16 pt-0.5">
                      {stop.time}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{stop.name}</span>
                        <span className="font-bold text-slate-700 tabular-nums shrink-0">
                          {stop.costPerPersonSGD === 0 ? 'Free' : `S$${stop.costPerPersonSGD.toFixed(2)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{stop.notes}</p>
                      <div className="mt-1 flex items-center gap-2 text-[10px]">
                        <span className="font-medium text-emerald-700">✓ 100% Undercover Transit</span>
                        <span>·</span>
                        <span className="text-slate-400">{stop.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transit Advice */}
            <div className="mt-4 p-3 rounded-lg bg-emerald-50 text-[11px] text-emerald-800 border border-emerald-100">
              <strong>Sheltered Transit:</strong> {currentPair.secondary.transportAdvice}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={() => onVoteForItinerary(currentPair.secondary.id)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm ${
                isRainActive
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>
                {isRainActive ? 'Adopt & Vote for Sheltered Plan' : 'Vote for Secondary Plan'} ({currentPair.secondary.votes} votes)
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
