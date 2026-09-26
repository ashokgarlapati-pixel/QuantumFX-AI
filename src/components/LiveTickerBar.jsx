import React, { useState, useEffect } from 'react';
import { Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PAIRS_TICKER } from '../data/mockData';
import { fetchLiveBatchQuotes, getLiveContinuousTickQuotes } from '../services/marketApi';

export default function LiveTickerBar() {
  const [tickerData, setTickerData] = useState(PAIRS_TICKER);
  const [isLiveApiActive, setIsLiveApiActive] = useState(true);

  // Poll backend live quotes from Twelve Data API & continuous micro-tick engine
  useEffect(() => {
    let isMounted = true;

    // Fetch live Twelve Data API quotes
    async function loadApiQuotes() {
      const symbols = ['USD/INR', 'EUR/USD', 'GBP/USD', 'USD/JPY'];
      await fetchLiveBatchQuotes(symbols);
    }
    loadApiQuotes();

    // High-frequency live tick engine running every 1.5s
    const tickInterval = setInterval(() => {
      if (!isMounted) return;
      const ticks = getLiveContinuousTickQuotes();
      setTickerData(prev => prev.map(item => {
        const liveTick = ticks[item.pair];
        if (liveTick) {
          return {
            ...item,
            price: liveTick.price,
            changePct: liveTick.changePct
          };
        }
        return item;
      }));
    }, 1500);

    const apiInterval = setInterval(() => {
      loadApiQuotes();
    }, 15000);

    return () => {
      isMounted = false;
      clearInterval(tickInterval);
      clearInterval(apiInterval);
    };
  }, []);

  return (
    <div className="bg-[#090d18]/90 border-b border-white/10 py-2 px-4 overflow-hidden">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        
        {/* Ticker Title */}
        <div className="flex items-center gap-2 text-[11px] font-extrabold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/25 shrink-0 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 animate-bounce text-cyan-300" />
          <span>{isLiveApiActive ? 'LIVE BACKEND MARKET FEED:' : 'REAL-TIME STREAM:'}</span>
          {isLiveApiActive && (
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 font-mono">Connected</span>
          )}
        </div>

        {/* Ticker Horizontal Scroll */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
          {tickerData.map((item) => {
            const isPos = item.changePct >= 0;
            return (
              <div 
                key={item.pair}
                className="flex items-center gap-2 bg-slate-900/80 border border-white/5 hover:border-cyan-500/40 px-3 py-1 rounded-lg shrink-0 transition-all cursor-pointer group"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-400 font-sans">{item.pair}</span>
                <span className="text-xs font-mono font-bold text-slate-200 tabular-nums">{item.price}</span>
                
                <span className={`text-[11px] font-mono flex items-center font-bold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {isPos ? `+${item.changePct}%` : `${item.changePct}%`}
                </span>

                <span className={`text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase tracking-wider ${
                  item.signal.includes('Buy') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  item.signal.includes('Sell') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {item.signal}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
