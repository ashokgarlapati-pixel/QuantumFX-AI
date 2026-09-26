import React, { useState } from 'react';
import { Search, X, Zap, Cpu, BarChart2, ShieldAlert, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onSelectRoute }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'USD Sovereign Strength Meter', route: 'dashboard', category: 'Live Analytics' },
    { title: 'Sovereign Interest Rate Simulator', route: 'policysimulator', category: 'AI Simulator' },
    { title: 'Central Bank Rate Predictor', route: 'advancedmodules', category: 'Quantum Module' },
    { title: 'Black Swan Anomaly Sentinel', route: 'advancedmodules', category: 'Tail Risk' },
    { title: 'JPY Currency Crash Alert', route: 'automationcenter', category: 'Crisis Response' },
    { title: 'AI Trade Signal Generator', route: 'tradecalculator', category: 'Trading Suite' }
  ];

  const filteredLinks = quickLinks.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0f172a] border border-cyan-500/30 w-full max-w-2xl rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-slate-900/80">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search currency pairs, AI models, policy tools, crisis warnings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-slate-400 font-sans"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestions */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Recommended Quick Actions
          </div>

          {filteredLinks.length > 0 ? (
            filteredLinks.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectRoute(item.route);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 text-cyan-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-400">{item.title}</div>
                    <div className="text-xs text-slate-400">{item.category}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching modules found for "{query}"
            </div>
          )}
        </div>

        <div className="bg-slate-900/90 px-5 py-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] border border-white/10">ESC</kbd> to exit</span>
          <span className="text-cyan-400 font-semibold">QuantumFX Search Engine v4.8</span>
        </div>

      </div>
    </div>
  );
}
