import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { WeatherBanner } from './components/WeatherBanner.tsx';
import { SuggestedActivities } from './components/SuggestedActivities.tsx';
import { ItineraryComparison } from './components/ItineraryComparison.tsx';
import { PriceComparisonView } from './components/PriceComparisonView.tsx';
import { ItineraryVoting } from './components/ItineraryVoting.tsx';
import { LiveTicketmasterSection } from './components/LiveTicketmasterSection.tsx';
import { Footer } from './components/Footer.tsx';
import { fetchLiveSingaporeWeather, WeatherResult } from './services/api.ts';
import { Activity } from './types/index.ts';
import { Sparkles, Umbrella, CheckCircle2, DollarSign, Vote, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'contingency' | 'compare' | 'vote'>('explore');
  const [partySize, setPartySize] = useState<number>(2);
  const [isSimulatedRain, setIsSimulatedRain] = useState<boolean>(false);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>(['gardens-by-the-bay', 'maxwell-laupasat-hawker']);
  const [selectedItineraryId, setSelectedItineraryId] = useState<string>('itin-marina-fair');

  // Weather state fetched from Data.gov.sg
  const [weather, setWeather] = useState<WeatherResult>({
    status: 'loading',
    message: 'Connecting to Data.gov.sg 2-hour weather forecast...',
    forecasts: [],
    isRainDetected: false,
    rainAreas: []
  });

  const loadWeather = async () => {
    setWeather(prev => ({ ...prev, status: 'loading' }));
    const result = await fetchLiveSingaporeWeather();
    setWeather(result);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const isRainActive = isSimulatedRain || weather.isRainDetected;

  const handleSelectForComparison = (activity: Activity) => {
    setSelectedActivityIds(prev =>
      prev.includes(activity.id) ? prev.filter(id => id !== activity.id) : [...prev, activity.id]
    );
  };

  const handleVoteForItinerary = (itineraryId: string) => {
    setSelectedItineraryId(itineraryId);
    setActiveTab('vote');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* 1. Header (Adheres to Top Bar Contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        partySize={partySize}
        setPartySize={setPartySize}
        isRainActive={isRainActive}
        onOpenNewPlan={() => setActiveTab('vote')}
      />

      {/* 2. Weather Banner (Sub-goals 2, 3 & 4) */}
      <WeatherBanner
        weather={weather}
        isSimulatedRain={isSimulatedRain}
        onToggleSimulateRain={() => setIsSimulatedRain(!isSimulatedRain)}
        onRefreshWeather={loadWeather}
        onSwitchToContingency={() => setActiveTab('contingency')}
      />

      {/* 3. Hero Section (Single elevation, authentic imagery, responsive) */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/singapore_skyline_hero_1792135348759.jpg"
            alt="Singapore Marina Bay Skyline"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>For Singaporeans, Tourists & Corporate Planners</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-['Outfit'] text-balance">
              Plan, Compare Prices & Vote Group Itineraries
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              No more messy WhatsApp polls or sudden tropical rainouts. Compare transparent SGD prices, switch instantly to 100% sheltered secondary itineraries, and finalize group decisions together.
            </p>

            {/* Quick Interactive KPI / Action Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeTab === 'explore'
                    ? 'bg-rose-600 text-white shadow-rose-600/30'
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                Explore & Prices
              </button>

              <button
                onClick={() => setActiveTab('contingency')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'contingency'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-sm'
                }`}
              >
                <Umbrella className="w-3.5 h-3.5 text-amber-400" />
                <span>Weather Contingency Plan {isRainActive && '⚠️'}</span>
              </button>

              <button
                onClick={() => setActiveTab('compare')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'compare'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-sm'
                }`}
              >
                Compare Prices
              </button>

              <button
                onClick={() => setActiveTab('vote')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'vote'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 backdrop-blur-sm'
                }`}
              >
                Vote Itinerary
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
        {/* TAB 1: Explore & Suggested Things To Do (Sub-goal 1) */}
        {activeTab === 'explore' && (
          <>
            <SuggestedActivities
              partySize={partySize}
              onSelectForComparison={handleSelectForComparison}
              selectedActivityIds={selectedActivityIds}
            />

            {/* Sub-goal 2: Live Ticketmaster feed integration */}
            <LiveTicketmasterSection />
          </>
        )}

        {/* TAB 2: Weather Contingency & Proposed Secondary Itinerary (Sub-goal 4) */}
        {activeTab === 'contingency' && (
          <ItineraryComparison
            isRainActive={isRainActive}
            partySize={partySize}
            onVoteForItinerary={handleVoteForItinerary}
          />
        )}

        {/* TAB 3: Price Comparison Matrix */}
        {activeTab === 'compare' && (
          <PriceComparisonView
            partySize={partySize}
            setPartySize={setPartySize}
            onSelectItinerary={handleVoteForItinerary}
          />
        )}

        {/* TAB 4: Group Voting & Polls */}
        {activeTab === 'vote' && (
          <ItineraryVoting
            partySize={partySize}
            selectedItineraryId={selectedItineraryId}
            onSelectItinerary={(id) => setSelectedItineraryId(id)}
          />
        )}
      </main>

      {/* 5. Footer with Sub-goal 5 mandatory credit: "Data: <Ticketmaster> & <Data.gov.sg>" */}
      <Footer />
    </div>
  );
}
