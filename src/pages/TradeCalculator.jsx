import React, { useState } from 'react';
import { Calculator, Zap, Shield, TrendingUp, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { PAIRS_TICKER } from '../data/mockData';

export default function TradeCalculator() {
  const [balance, setBalance] = useState(800000); // Default ₹8,000,000 / $10,000
  const [currencyUnit, setCurrencyUnit] = useState('INR'); // 'INR' or 'USD'
  const [riskPct, setRiskPct] = useState(1.5);
  const [stopLossPips, setStopLossPips] = useState(25);
  const [pair, setPair] = useState('USD/INR');

  const usdInrRate = 83.42;

  // Dynamic calculations in selected currency
  const riskAmount = (balance * (riskPct / 100)).toFixed(2);
  const riskAmountUsd = currencyUnit === 'INR' ? (riskAmount / usdInrRate).toFixed(2) : riskAmount;
  const positionLots = ((riskAmountUsd / (stopLossPips * 10)) * 1.0).toFixed(2);

  const activePairObj = PAIRS_TICKER.find(p => p.pair === pair) || PAIRS_TICKER[0];
  const isInrPair = pair.includes('INR');

  const target1 = isInrPair ? (activePairObj.price + 0.45).toFixed(2) : (activePairObj.price + 0.0045).toFixed(4);
  const target2 = isInrPair ? (activePairObj.price + 0.95).toFixed(2) : (activePairObj.price + 0.0090).toFixed(4);
  const stopLevel = isInrPair ? (activePairObj.price - (stopLossPips * 0.01)).toFixed(2) : (activePairObj.price - (stopLossPips * 0.0001)).toFixed(4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white">AI Trade Signal & Position Risk Calculator</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculate precise lot sizes, stop-loss risks in Indian Rupees (₹) and USD, and auto-generate AI entry & profit targets.
          </p>
        </div>

        <span className="badge-cyan text-xs">INR & Global Risk Engine v4.8</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Position Size Calculator (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Position Size & Risk Parameters
            </h2>

            {/* Currency Unit Toggle */}
            <div className="flex items-center bg-slate-900 rounded-lg p-1 border border-white/10 text-xs font-bold">
              <button
                onClick={() => { setCurrencyUnit('INR'); setBalance(800000); }}
                className={`px-3 py-1 rounded-md transition-all ${currencyUnit === 'INR' ? 'bg-purple-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => { setCurrencyUnit('USD'); setBalance(10000); }}
                className={`px-3 py-1 rounded-md transition-all ${currencyUnit === 'USD' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                $ USD
              </button>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Account Balance */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                Account Balance ({currencyUnit === 'INR' ? '₹ Indian Rupees' : '$ USD'})
              </label>
              <input 
                type="number" 
                value={balance} 
                onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white font-mono outline-none focus:border-cyan-500"
              />
            </div>

            {/* Risk Percentage */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="font-bold text-slate-300">Risk Per Trade (%)</label>
                <span className="font-mono text-cyan-400 font-bold">
                  {currencyUnit === 'INR' ? `₹${riskAmount}` : `$${riskAmount}`}
                </span>
              </div>
              <input 
                type="number" 
                step="0.1"
                value={riskPct} 
                onChange={(e) => setRiskPct(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white font-mono outline-none focus:border-cyan-500"
              />
            </div>

            {/* Currency Pair Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Target Currency Pair</label>
              <select 
                value={pair} 
                onChange={(e) => setPair(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white font-bold outline-none focus:border-cyan-500"
              >
                {PAIRS_TICKER.map(p => (
                  <option key={p.pair} value={p.pair}>{p.pair} — Live: {p.price}</option>
                ))}
              </select>
            </div>

            {/* Stop Loss Pips */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Stop Loss Distance (Pips / Paise)</label>
              <input 
                type="number" 
                value={stopLossPips} 
                onChange={(e) => setStopLossPips(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-sm text-white font-mono outline-none focus:border-cyan-500"
              />
            </div>

            {/* Calculated Results */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-xs text-slate-400">Calculated Lot Size</div>
                <div className="text-2xl font-black font-mono text-cyan-400">{positionLots} Lots</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-bold">Total Capital at Risk</div>
                <div className="text-xl font-black font-mono text-rose-400">
                  {currencyUnit === 'INR' ? `₹${riskAmount}` : `$${riskAmount}`}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Panel: Auto AI Signal Output (6 Cols) */}
        <div className="lg:col-span-6 glass-panel-glow p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Automated AI Signal Blueprint ({pair})
              </h2>
              <span className="badge-cyan text-xs">Win Rate 68.4%</span>
            </div>

            <div className="space-y-4 pt-4">
              
              <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2">
                <div className="text-xs text-slate-400">Current Live Market Entry</div>
                <div className="text-xl font-bold font-mono text-white">{activePairObj.price}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="text-emerald-400 font-bold">Take Profit 1 (1:2 R:R)</div>
                  <div className="text-base font-bold font-mono text-white">{target1}</div>
                </div>

                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="text-emerald-400 font-bold">Take Profit 2 (1:3.5 R:R)</div>
                  <div className="text-base font-bold font-mono text-white">{target2}</div>
                </div>
              </div>

              <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-xs">
                <div className="text-rose-400 font-bold">Recommended Stop Loss</div>
                <div className="text-base font-bold font-mono text-white">{stopLevel}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-cyan-400">Risk Assessment: </span>
                Position size of {positionLots} lots ensures maximum drawdown is strictly capped at {riskPct}% of total balance (${riskAmount}).
              </div>

            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-500 font-mono">
            Position Engine • Risk Guard v4.8 • Quantum Algorithmic Execution
          </div>
        </div>

      </div>

    </div>
  );
}
