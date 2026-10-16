import React from 'react';
import { Compass, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-['Outfit'] font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span>Trip Hop</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Real-time Singapore outing planner and group voting engine for couples, weekend family planners, local cliques, corporate team bonding, and tourists.
            </p>
            {/* Guardrail privacy compliance note */}
            <p className="text-[11px] text-slate-500">
              🔒 Privacy First: Zero personal data collected beyond group size, selected outing preferences, and budget inputs.
            </p>
          </div>

          {/* Quick Links & Transit Tips */}
          <div>
            <h5 className="text-slate-200 font-semibold mb-3">Singapore Transit Tips</h5>
            <ul className="space-y-2 text-slate-400">
              <li>• Tap in/out via SimplyGo (Visa, Mastercard, Apple Pay)</li>
              <li>• Downtown (DT) & Thomson-East Coast (TE) lines</li>
              <li>• Underground connections between City Hall & Marina</li>
              <li>• Island express bus & Sentosa Express monorail</li>
            </ul>
          </div>

          {/* Business & Pricing Model */}
          <div>
            <h5 className="text-slate-200 font-semibold mb-3">Party Size Freemium</h5>
            <ul className="space-y-2 text-slate-400">
              <li>• Free Tier: Up to 2 travelers (Couples & Duos)</li>
              <li>• Group Tier: Up to 4 travelers (Family & Friends)</li>
              <li>• Corporate Tier: Large teams & corporate team building</li>
              <li>• Transparent SGD pricing with resident concessions</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Mandatory Attribution */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Trip Hop Singapore. Built for seamless group coordination.
          </p>

          {/* Sub-goal 5: The footer credits the data source: "Data: <Ticketmaster> & <Data.gov.sg>" */}
          <div className="p-2 px-3 bg-slate-800/80 rounded-lg border border-slate-700/80 text-slate-300 font-medium">
            <span>Data: &lt;Ticketmaster&gt; &amp; &lt;Data.gov.sg&gt;</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
