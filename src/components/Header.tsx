import React from 'react';
import { Compass, CloudRain, Users, DollarSign, Vote, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'explore' | 'contingency' | 'compare' | 'vote';
  setActiveTab: (tab: 'explore' | 'contingency' | 'compare' | 'vote') => void;
  partySize: number;
  setPartySize: (size: number) => void;
  isRainActive: boolean;
  onOpenNewPlan?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  partySize,
  setPartySize,
  isRainActive,
  onOpenNewPlan,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 single-line nav links) - Zone 3 (1 primary action)
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-sm shadow-rose-600/20">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit']">
              Trip Hop
            </span>
          </button>
        </div>

        {/* Zone 2: 4 single-line nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('explore')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'explore'
                ? 'border-rose-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Explore & Pricing
          </button>

          <button
            onClick={() => setActiveTab('contingency')}
            className={`flex items-center gap-1.5 whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'contingency'
                ? 'border-rose-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <span>Weather Contingency</span>
            {isRainActive && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Inclement weather detected" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'compare'
                ? 'border-rose-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Compare Prices
          </button>

          <button
            onClick={() => setActiveTab('vote')}
            className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'vote'
                ? 'border-rose-600 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Group Voting
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs text-slate-600 border border-slate-200">
            <Users className="w-3.5 h-3.5 ml-1.5 mr-1 text-slate-400" />
            <span className="font-medium mr-1.5">Party:</span>
            <select
              value={partySize}
              onChange={(e) => setPartySize(parseInt(e.target.value, 10))}
              className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer pr-1"
              aria-label="Party size"
            >
              <option value={1}>1 Solo</option>
              <option value={2}>2 Couple (Free tier)</option>
              <option value={4}>4 Friends/Family</option>
              <option value={6}>6 Clique</option>
              <option value={10}>10 Team</option>
              <option value={20}>20 Corporate</option>
            </select>
          </div>

          <button
            onClick={() => {
              setActiveTab('vote');
              if (onOpenNewPlan) onOpenNewPlan();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
          >
            Vote Itinerary
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-medium text-slate-500">Party Size</span>
            <div className="flex items-center gap-2">
              {[2, 4, 8, 15].map((size) => (
                <button
                  key={size}
                  onClick={() => setPartySize(size)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                    partySize === size ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {size} pax
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setActiveTab('explore');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left text-xs font-medium rounded-lg border ${
                activeTab === 'explore'
                  ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              Explore & Pricing
            </button>
            <button
              onClick={() => {
                setActiveTab('contingency');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left text-xs font-medium rounded-lg border ${
                activeTab === 'contingency'
                  ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              Weather Contingency {isRainActive && '⚠️'}
            </button>
            <button
              onClick={() => {
                setActiveTab('compare');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left text-xs font-medium rounded-lg border ${
                activeTab === 'compare'
                  ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              Compare Prices
            </button>
            <button
              onClick={() => {
                setActiveTab('vote');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left text-xs font-medium rounded-lg border ${
                activeTab === 'vote'
                  ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              Group Voting
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
