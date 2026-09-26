import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  Sliders, 
  Cpu, 
  ArrowRight, 
  Globe, 
  Zap, 
  BarChart2, 
  Sparkles,
  Clock
} from 'lucide-react';
import { CURRENCIES, RECENT_NEWS, STOCKS_AND_CRYPTO } from '../data/mockData';

export default function HomeOverview({ setActiveTab }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e172a] via-[#111c38] to-[#070b16] border border-cyan-500/25 p-8 sm:p-10 shadow-[0_0_50px_rgba(0,242,254,0.08)]">
        
        {/* Background Glow Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            AI Currency Strength Booster
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Amplify your trading decisions with <span className="gradient-text-cyan">real-time currency strength</span> analysis powered by AI.
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Track currency strength in real time, simulate central bank policy changes, and get instant buy and sell signals tailored for traders and investors.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => setActiveTab('policysimulator')}
              className="btn-cyan text-sm py-3 px-5 shadow-[0_0_25px_rgba(0,242,254,0.35)]"
            >
              <Sliders className="w-4 h-4" />
              Open Policy Simulator
            </button>

            <button 
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-3 rounded-xl bg-slate-900/90 text-white font-bold text-sm border border-white/10 hover:border-cyan-500/40 hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              Currency Heatmap Matrix
            </button>

            <button 
              onClick={() => setActiveTab('advancedmodules')}
              className="btn-purple text-sm py-3 px-5 shadow-[0_0_25px_rgba(139,92,246,0.35)]"
            >
              <Cpu className="w-4 h-4" />
              AI Prediction Tools
            </button>
          </div>

        </div>

        {/* Live System Stats Grid Overlay */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 relative z-10">
          
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Global FX Daily Trading</div>
            <div className="text-xl font-bold text-white font-mono-nums">$7.5 Trillion</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
              <TrendingUp className="w-3 h-3" /> +2.4% today
            </div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Strongest Currency</div>
            <div className="text-xl font-bold text-cyan-400 font-mono-nums">US Dollar (84.5)</div>
            <div className="text-[10px] text-slate-400">Fed Interest Rate: 5.25%</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Overall Market Risk</div>
            <div className="text-xl font-bold text-amber-400 font-mono-nums">Low Risk (28/100)</div>
            <div className="text-[10px] text-amber-400/80">Yen volatility active</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">AI Signal Accuracy</div>
            <div className="text-xl font-bold text-emerald-400 font-mono-nums">94.8% Success Rate</div>
            <div className="text-[10px] text-emerald-400/80">Tested on historical data</div>
          </div>

        </div>

      </div>

      {/* Live Currency Strength Bar Gauges */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Live Currency Strength Meter</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Relative strength score for major currencies (0 = Weakest, 100 = Strongest).
            </p>
          </div>
          
          <button 
            onClick={() => setActiveTab('marketstrengthboard')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 bg-cyan-500/10 px-3.5 py-2 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
          >
            Full Currency Forecasts <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Strength Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRENCIES.map((curr) => {
            const isStrong = curr.strength >= 70;
            const isModerate = curr.strength >= 45 && curr.strength < 70;
            const barColor = isStrong ? 'bg-emerald-400 shadow-[0_0_12px_#10b981]' : isModerate ? 'bg-cyan-400 shadow-[0_0_12px_#00f2fe]' : 'bg-rose-500 shadow-[0_0_12px_#f43f5e]';
            
            return (
              <div key={curr.code} className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-3 hover:border-cyan-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{curr.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-white">{curr.code}</span>
                        <span className="text-xs text-slate-400">({curr.name})</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{curr.centralBank} • Rate: {curr.rate}%</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold font-mono-nums text-white">
                      {curr.strength} <span className="text-xs text-slate-400">/ 100</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      curr.change >= 0 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {curr.change >= 0 ? `+${curr.change}%` : `${curr.change}%`}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${barColor}`} 
                    style={{ width: `${curr.strength}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: News Stream & Global Assets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* News Stream (2 Cols) */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Live Market News & AI Sentiment</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
              Live Updates
            </span>
          </div>

          <div className="space-y-3">
            {RECENT_NEWS.map((news) => (
              <div 
                key={news.id} 
                className="p-4 rounded-xl bg-slate-900/70 border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-cyan-400 font-bold">{news.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {news.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {news.title}
                  </h4>
                </div>

                <div className="shrink-0">
                  <span className={`text-xs px-3 py-1 rounded-lg font-bold ${
                    news.sentiment.includes('Bullish') || news.sentiment.includes('Strong') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    news.sentiment.includes('Bearish') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {news.sentiment}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Assets (1 Col) */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Stock Indices & Assets</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30">
              Live
            </span>
          </div>

          <div className="space-y-3">
            {STOCKS_AND_CRYPTO.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-white/10">
                <div>
                  <div className="text-xs font-bold text-white">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{item.symbol} • {item.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold font-mono-nums text-slate-200">{item.price}</div>
                  <div className={`text-[10px] font-bold ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
