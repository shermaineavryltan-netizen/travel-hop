import React, { useState } from 'react';
import { CURATED_ITINERARIES } from '../data/mockOutings.ts';
import { Vote, CheckCircle, Share2, Copy, Users, Calendar, Sparkles, MessageCircle, ArrowRight, Check } from 'lucide-react';

interface ItineraryVotingProps {
  partySize: number;
  selectedItineraryId?: string;
  onSelectItinerary: (id: string) => void;
}

export const ItineraryVoting: React.FC<ItineraryVotingProps> = ({
  partySize,
  selectedItineraryId,
  onSelectItinerary,
}) => {
  const [userName, setUserName] = useState<string>('Shermaine');
  const [groupName, setGroupName] = useState<string>('Singapore Weekend Outing');
  const [outingDate, setOutingDate] = useState<string>('2026-10-24');
  const [copiedLink, setCopiedLink] = useState(false);

  // Voting state: Itinerary ID -> List of voter names
  const [votesState, setVotesState] = useState<Record<string, string[]>>({
    'itin-marina-fair': ['Shermaine', 'Marcus', 'Avryl', 'Dave'],
    'itin-marina-rain': ['Priya', 'Chloe'],
    'itin-sentosa-fair': ['Wei Ming', 'Kenji', 'Sarah'],
    'itin-sentosa-rain': ['Jun Hao'],
    'itin-corp-bonding': ['HR Team', 'Alicia', 'Zack']
  });

  // Supper sub-poll: Option -> List of voters
  const [supperVotes, setSupperVotes] = useState<Record<string, string[]>>({
    'Lau Pa Sat Satay Street': ['Shermaine', 'Marcus', 'Priya'],
    'Newton Food Centre (Sambal Stingray)': ['Avryl', 'Kenji'],
    'Swee Choon Dim Sum (Jalan Besar)': ['Chloe', 'Dave']
  });

  const totalVotersCount = Object.values(votesState).reduce((acc, curr) => acc + curr.length, 0);

  // Handle casting or changing a vote
  const handleVote = (itineraryId: string) => {
    const voter = userName.trim() || 'Anonymous';
    setVotesState((prev) => {
      const updated: Record<string, string[]> = {};
      // Remove current user from all other options
      Object.keys(prev).forEach((key) => {
        updated[key] = prev[key].filter((name) => name !== voter);
      });
      // Add user to selected option
      updated[itineraryId] = [...(updated[itineraryId] || []), voter];
      return updated;
    });
    onSelectItinerary(itineraryId);
  };

  const handleSupperVote = (option: string) => {
    const voter = userName.trim() || 'Anonymous';
    setSupperVotes((prev) => {
      const updated: Record<string, string[]> = {};
      Object.keys(prev).forEach((key) => {
        updated[key] = prev[key].filter((name) => name !== voter);
      });
      updated[option] = [...(updated[option] || []), voter];
      return updated;
    });
  };

  // Find winning itinerary
  let winningId = 'itin-marina-fair';
  let maxVotes = -1;
  Object.entries(votesState).forEach(([id, list]) => {
    if (list.length > maxVotes) {
      maxVotes = list.length;
      winningId = id;
    }
  });

  const handleCopyLink = () => {
    const text = `Join our Singapore Outing Poll for "${groupName}" on ${outingDate}! Vote your preferred itinerary on Trip Hop.`;
    navigator.clipboard?.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-rose-600 font-semibold tracking-wide uppercase mb-1">
            <span>Group Coordination & Polling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-['Outfit']">
            Vote Itinerary & Decide as a Group
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Eliminate decision fatigue and messy WhatsApp polls. Vote on proposed Singapore itineraries and supper spots in real-time.
          </p>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Poll Link!' : 'Copy WhatsApp Link'}</span>
          </button>
        </div>
      </div>

      {/* Group Info Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Outing / Group Name
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Outing Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={outingDate}
                onChange={(e) => setOutingDate(e.target.value)}
                className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Your Name / Alias
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. Shermaine"
              className="w-full text-xs font-semibold text-slate-900 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>
        </div>

        {/* Guardrail compliance notice */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            🔒 Zero personal data collected beyond group size and outing preference inputs.
          </span>
          <span className="font-medium text-slate-600">
            Total participants voted: {totalVotersCount}
          </span>
        </div>
      </div>

      {/* Itinerary Poll Cards */}
      <div className="space-y-4 mb-8">
        <h3 className="text-base font-bold text-slate-900">
          Proposed Itineraries for {groupName}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {CURATED_ITINERARIES.map((itin) => {
            const voters = votesState[itin.id] || [];
            const voteCount = voters.length;
            const percentage = totalVotersCount > 0 ? Math.round((voteCount / totalVotersCount) * 100) : 0;
            const hasUserVoted = voters.includes(userName.trim());
            const isLeading = itin.id === winningId && voteCount > 0;

            return (
              <div
                key={itin.id}
                className={`bg-white rounded-2xl border p-5 transition-all ${
                  hasUserVoted
                    ? 'border-rose-500 ring-2 ring-rose-500/10 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {itin.targetAudience}
                      </span>
                      <span>·</span>
                      <span className="text-xs text-slate-500">{itin.duration}</span>
                      <span>·</span>
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        S${itin.estimatedCostPerPax.toFixed(2)} / pax
                      </span>

                      {isLeading && (
                        <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Leader ({voteCount} votes)</span>
                        </span>
                      )}

                      {itin.weatherSuitability === 'rain-contingency' && (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                          100% Sheltered
                        </span>
                      )}
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {itin.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {itin.tagline}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          hasUserVoted ? 'bg-rose-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Voters list unboxed metadata */}
                    <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-700">Voters:</span>
                        {voters.length === 0 ? (
                          <span className="text-slate-400 italic">No votes yet</span>
                        ) : (
                          voters.map((name, i) => (
                            <span
                              key={i}
                              className={`text-[11px] px-2 py-0.5 rounded ${
                                name === userName.trim()
                                  ? 'bg-rose-100 text-rose-800 font-semibold'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {name}
                            </span>
                          ))
                        )}
                      </div>
                      <span className="font-bold text-slate-900 tabular-nums">{percentage}%</span>
                    </div>
                  </div>

                  {/* Vote Action Button */}
                  <div className="shrink-0 flex sm:flex-col items-center justify-end gap-2">
                    <button
                      onClick={() => handleVote(itin.id)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                        hasUserVoted
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <Vote className="w-3.5 h-3.5" />
                      <span>{hasUserVoted ? 'Voted ✓' : 'Cast Vote'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supper & Dining Sub-Poll */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Singapore Late-Night Supper Poll 🍢
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Pick where the group goes after the main itinerary wraps up.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(supperVotes).map(([spot, voters]) => {
            const hasVoted = voters.includes(userName.trim());
            return (
              <div
                key={spot}
                onClick={() => handleSupperVote(spot)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                  hasVoted
                    ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900">{spot}</span>
                  <span className="font-bold text-slate-700 tabular-nums bg-white px-2 py-0.5 rounded border border-slate-200">
                    {voters.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {voters.map((v, i) => (
                    <span key={i} className="text-[10px] text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200/60">
                      {v}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-3 text-[11px] font-semibold text-rose-600 hover:text-rose-700"
                >
                  {hasVoted ? 'Your Pick ✓' : 'Vote This'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
