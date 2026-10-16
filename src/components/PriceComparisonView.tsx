import React, { useState } from 'react';
import { DollarSign, Users, Check, ArrowRight, Shield, Globe, Award, Sparkles, Building2 } from 'lucide-react';
import { CURATED_ITINERARIES } from '../data/mockOutings.ts';

interface PriceComparisonViewProps {
  partySize: number;
  setPartySize: (size: number) => void;
  onSelectItinerary: (id: string) => void;
}

export const PriceComparisonView: React.FC<PriceComparisonViewProps> = ({
  partySize,
  setPartySize,
  onSelectItinerary,
}) => {
  const [isResident, setIsResident] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<'SGD' | 'USD' | 'EUR' | 'GBP' | 'AUD'>('SGD');

  // Currency exchange rates relative to SGD
  const exchangeRates = {
    SGD: { rate: 1.0, symbol: 'S$' },
    USD: { rate: 0.75, symbol: '$' },
    EUR: { rate: 0.69, symbol: '€' },
    GBP: { rate: 0.59, symbol: '£' },
    AUD: { rate: 1.15, symbol: 'A$' },
  };

  const curr = exchangeRates[selectedCurrency];

  const formatPrice = (sgdAmount: number) => {
    const converted = sgdAmount * curr.rate;
    return `${curr.symbol}${converted.toFixed(2)}`;
  };

  // Canvas tiers from context: Free up to 2, Pro tiered for 3-4, Corporate pricing for large groups
  const getSubscriptionTierInfo = (size: number) => {
    if (size <= 2) {
      return {
        name: 'Free Couple & Duo Tier',
        costNotice: '100% Free for party of 1 to 2 travelers',
        badge: 'Free Tier',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      };
    }
    if (size <= 4) {
      return {
        name: 'Friends & Family Tier',
        costNotice: 'Group split calculations & voting active',
        badge: 'Family / Small Group',
        badgeColor: 'bg-blue-100 text-blue-800'
      };
    }
    return {
      name: 'Corporate & HR Outing Tier',
      costNotice: 'Large party volume discounts & GST receipts',
      badge: 'Team / Corporate',
      badgeColor: 'bg-purple-100 text-purple-800'
    };
  };

  const tier = getSubscriptionTierInfo(partySize);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wide uppercase mb-1">
            <span>Price Comparison Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Outfit']">
            Compare Outing Budgets & Booking Channels
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Transparent price breakdowns for food, admissions, transport, and resident concessions for a party of{' '}
            <span className="font-semibold text-slate-900">{partySize} pax</span>.
          </p>
        </div>

        {/* Currency & Resident Toggle Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Resident status toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 text-xs">
            <button
              onClick={() => setIsResident(false)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                !isResident ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tourist Standard
            </button>
            <button
              onClick={() => setIsResident(true)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                isResident ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SG Citizen / PR Concession
            </button>
          </div>

          {/* Currency Dropdown */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select
              value={selectedCurrency}
              onChange={(e: any) => setSelectedCurrency(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              aria-label="Select currency"
            >
              <option value="SGD">SGD (S$)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Party Size & Canvas Tier Indicator Banner */}
      <div className="mb-8 p-4 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold">{tier.name}</h4>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.badgeColor}`}>
                {tier.badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{tier.costNotice}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Select Travel Party:</span>
          {[2, 4, 8, 15, 25].map((size) => (
            <button
              key={size}
              onClick={() => setPartySize(size)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                partySize === size
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {size} pax
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {CURATED_ITINERARIES.slice(0, 3).map((itinerary) => {
          // Calculate resident discount factor if applicable
          const residentDiscountRate = isResident ? 0.82 : 1.0;
          const costPerPax = itinerary.estimatedCostPerPax * residentDiscountRate;
          const totalCost = costPerPax * partySize;

          return (
            <div
              key={itinerary.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                    {itinerary.targetAudience} Outing
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{itinerary.duration}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  {itinerary.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {itinerary.tagline}
                </p>

                {/* Big Price Highlight */}
                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 uppercase font-medium">Per Person</span>
                      <div className="text-2xl font-bold text-slate-900 tabular-nums">
                        {formatPrice(costPerPax)}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 uppercase font-medium">Total ({partySize} pax)</span>
                      <div className="text-lg font-bold text-rose-600 tabular-nums">
                        {formatPrice(totalCost)}
                      </div>
                    </div>
                  </div>

                  {isResident && (
                    <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px] text-emerald-700 font-medium">
                      ✓ Concession savings included
                    </div>
                  )}
                </div>

                {/* Category Cost Breakdown Estimate */}
                <div className="mt-5 space-y-2 text-xs">
                  <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
                    Cost Distribution / Pax
                  </h5>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 text-slate-600">
                    <span>Admissions & Tickets</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatPrice(costPerPax * 0.55)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100 text-slate-600">
                    <span>Food & Hawker Dining</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatPrice(costPerPax * 0.35)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-slate-600">
                    <span>MRT / SimplyGo Transport</span>
                    <span className="font-semibold text-slate-900 tabular-nums">
                      {formatPrice(costPerPax * 0.10)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onSelectItinerary(itinerary.id)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Select & Vote for this Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Channel Comparison Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Singapore Booking Channel & Discount Comparison
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Compare walk-up retail tickets against local resident passes and online platforms.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 pr-4">Channel / Option</th>
                <th className="pb-3 px-4">Best For</th>
                <th className="pb-3 px-4">Price Advantage</th>
                <th className="pb-3 px-4">Flexibility</th>
                <th className="pb-3 pl-4">Instant Confirmation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-slate-900">Official Walk-up Counters</td>
                <td className="py-3.5 px-4">Spontaneous visits</td>
                <td className="py-3.5 px-4 text-slate-500">Retail price (100%)</td>
                <td className="py-3.5 px-4">High (subject to queues)</td>
                <td className="py-3.5 pl-4 text-emerald-700 font-medium">✓ Immediate</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-slate-900">Singapore Resident Concession</td>
                <td className="py-3.5 px-4">Citizens, PRs & Work Pass holders</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">Up to 40% off or Free</td>
                <td className="py-3.5 px-4">Requires Singpass / IC</td>
                <td className="py-3.5 pl-4 text-emerald-700 font-medium">✓ Immediate</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-slate-900">Online Passes (Ticketmaster / Klook)</td>
                <td className="py-3.5 px-4">Tourists & pre-planners</td>
                <td className="py-3.5 px-4 text-blue-700 font-semibold">10% - 25% bundle savings</td>
                <td className="py-3.5 px-4">Fixed time-slot bookings</td>
                <td className="py-3.5 pl-4 text-emerald-700 font-medium">✓ E-ticket barcode</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-semibold text-slate-900">Trip Hop Group Booking (&gt;8 pax)</td>
                <td className="py-3.5 px-4">Corporate teams & large families</td>
                <td className="py-3.5 px-4 text-purple-700 font-semibold">15% - 20% group rebate</td>
                <td className="py-3.5 px-4">Single consolidated invoice</td>
                <td className="py-3.5 pl-4 text-emerald-700 font-medium">✓ Dedicated concierge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
