import React, { useState } from 'react';
import { Activity, CategoryType, AudienceType } from '../types/index.ts';
import { SINGAPORE_ACTIVITIES } from '../data/mockOutings.ts';
import { Search, MapPin, Clock, Umbrella, Sun, Check, Plus, Shield, ArrowUpDown } from 'lucide-react';

interface SuggestedActivitiesProps {
  partySize: number;
  onSelectForComparison: (activity: Activity) => void;
  selectedActivityIds: string[];
}

export const SuggestedActivities: React.FC<SuggestedActivitiesProps> = ({
  partySize,
  onSelectForComparison,
  selectedActivityIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');

  const categories: { label: string; value: CategoryType }[] = [
    { label: 'All Activities', value: 'all' },
    { label: 'Attractions', value: 'attractions' },
    { label: 'Food & Hawkers', value: 'food' },
    { label: 'Sheltered / Indoor', value: 'indoor' },
    { label: 'Heritage & Culture', value: 'culture' },
    { label: 'Team Bonding', value: 'team-bonding' },
  ];

  const audiences = [
    { label: 'Everyone', value: 'all' },
    { label: 'Couples / Dates', value: 'couples' },
    { label: 'Families & Kids', value: 'families' },
    { label: 'Friend Groups', value: 'friends' },
    { label: 'Corporate & HR', value: 'corporate' },
    { label: 'Tourists', value: 'tourists' },
  ];

  const filteredActivities = SINGAPORE_ACTIVITIES.filter((activity) => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesAudience = selectedAudience === 'all' || activity.recommendedAudiences.includes(selectedAudience as AudienceType);
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAudience && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricing.standardSGD - b.pricing.standardSGD;
    if (sortBy === 'price-desc') return b.pricing.standardSGD - a.pricing.standardSGD;
    return 0;
  });

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wide uppercase mb-1">
            <span>Sub-Goal 1: Verified Pricing & Suggestions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Outfit']">
            Curated Singapore Things To Do
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real SGD admission rates, resident concessions, and scalable group rates calculated for your party of{' '}
            <span className="font-semibold text-slate-900">{partySize} pax</span>.
          </p>
        </div>

        {/* Sort & Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attractions or areas..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs bg-transparent text-slate-700 focus:outline-none cursor-pointer"
              aria-label="Sort activities"
            >
              <option value="recommended">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Filter Bars */}
      <div className="space-y-3 mb-8">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Audience filters */}
        <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1">
          <span className="font-medium text-slate-700 shrink-0">Audience:</span>
          {audiences.map((aud) => (
            <button
              key={aud.value}
              onClick={() => setSelectedAudience(aud.value)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
                selectedAudience === aud.value
                  ? 'bg-rose-100 text-rose-800 font-semibold'
                  : 'hover:text-slate-900 text-slate-500'
              }`}
            >
              {aud.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid (Mobile responsive: 1 col on mobile, 2 col tablet, 3 col desktop) */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-sm text-slate-600 font-medium">No outings found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedAudience('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-rose-600 hover:text-rose-700 font-semibold underline underline-offset-4"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => {
            const isSelected = selectedActivityIds.includes(activity.id);
            const totalForGroup = activity.pricing.standardSGD * partySize;
            const residentTotal = (activity.pricing.residentSGD ?? activity.pricing.standardSGD) * partySize;

            return (
              <div
                key={activity.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                {/* Visual Image container with fallback */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e: any) => {
                      // Fallback container
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Weather shelter badge on image overlay */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold backdrop-blur-md shadow-sm ${
                        activity.isIndoor
                          ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/30'
                          : 'bg-slate-950/80 text-slate-200 border border-slate-700/40'
                      }`}
                    >
                      {activity.isIndoor ? <Umbrella className="w-3 h-3 text-emerald-400" /> : <Sun className="w-3 h-3 text-amber-400" />}
                      <span>{activity.isIndoor ? 'Sheltered / Indoor' : 'Outdoor Setting'}</span>
                    </span>
                  </div>

                  {/* Area badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/60 backdrop-blur-md text-white border border-white/10">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{activity.area}</span>
                    </span>
                  </div>

                  {/* Scrim overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 text-white text-xs">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-300" />
                        <span>~{activity.durationHours} hrs</span>
                      </span>
                      <span>·</span>
                      <span className="truncate">{activity.transitAccess.split('(')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {activity.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {activity.description}
                    </p>

                    {/* Highlights unboxed metadata */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-slate-500">
                      {activity.highlights.map((h, i) => (
                        <span key={i} className="inline-flex items-center">
                          {i > 0 && <span className="mr-2 text-slate-300">·</span>}
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transparent Pricing Matrix & Calculation */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-xs text-slate-500 font-medium">Standard Price</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-slate-900 tabular-nums">
                          {activity.pricing.standardSGD === 0 ? 'Free' : `S$${activity.pricing.standardSGD.toFixed(2)}`}
                        </span>
                        {activity.pricing.standardSGD > 0 && (
                          <span className="text-[11px] text-slate-500 ml-1">/ person</span>
                        )}
                      </div>
                    </div>

                    {/* Concession / Resident row if applicable */}
                    {activity.pricing.residentSGD !== undefined && (
                      <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md mb-2">
                        <span>SG Resident Concession:</span>
                        <span className="font-semibold tabular-nums">
                          {activity.pricing.residentSGD === 0 ? 'Free Entry' : `S$${activity.pricing.residentSGD.toFixed(2)} / pax`}
                        </span>
                      </div>
                    )}

                    {/* Group Party calculation */}
                    <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="font-medium">Total for {partySize} pax:</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {totalForGroup === 0 ? 'S$0.00' : `S$${totalForGroup.toFixed(2)}`}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => onSelectForComparison(activity)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-rose-50 text-rose-700 border border-rose-300'
                            : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-rose-600" />
                            <span>In Comparison</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Compare Price</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
