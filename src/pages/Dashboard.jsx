import React, { useState } from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Sliders, 
  Activity, 
  Clock, 
  Zap, 
  Filter
} from 'lucide-react';
import { PAIRS_TICKER } from '../data/mockData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard({ setActiveTab }) {
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [timeframe, setTimeframe] = useState('1H');
  const [filterSignal, setFilterSignal] = useState('All');

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D'];
  const matrixCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'NZD'];

  const getHeatmapVal = (row, col) => {
    if (row === col) return { val: '1.0000', type: 'same' };
    const rIdx = matrixCurrencies.indexOf(row);
    const cIdx = matrixCurrencies.indexOf(col);
    const mockVal = (1.0 + (rIdx - cIdx) * 0.12 + ((rIdx * cIdx) % 7) * 0.03).toFixed(4);
    const isBull = rIdx < cIdx;
    return { val: mockVal, type: isBull ? 'bull' : 'bear' };
  };

  const activePairObj = PAIRS_TICKER.find(p => p.pair === selectedPair) || PAIRS_TICKER[0];

  // Dynamic Chart.js Data for selected currency pair
  const basePrice = activePairObj.price;
  const timeLabels = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00 (Live)'];
  
  const priceData = [
    +(basePrice - 0.0035).toFixed(4),
    +(basePrice - 0.0020).toFixed(4),
    +(basePrice - 0.0010).toFixed(4),
    +(basePrice + 0.0012).toFixed(4),
    +(basePrice + 0.0025).toFixed(4),
    basePrice
  ];

  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: `${selectedPair} Live Price`,
        data: priceData,
        borderColor: '#00f2fe',
        borderWidth: 3,
        pointBackgroundColor: '#00f2fe',
        pointBorderColor: '#070a12',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 9,
        tension: 0.35,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
          gradient.addColorStop(1, 'rgba(0, 242, 254, 0.0)');
          return gradient;
        },
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#f8fafc',
          font: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#00f2fe',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(0, 242, 254, 0.4)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `Price: ${context.raw} USD`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: {
          color: '#cbd5e1',
          font: { family: 'JetBrains Mono', size: 12, weight: '600' }
        }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: {
          color: '#cbd5e1',
          font: { family: 'JetBrains Mono', size: 12, weight: '600' }
        }
      }
    }
  };

  const filteredPairs = filterSignal === 'All' 
    ? PAIRS_TICKER 
    : PAIRS_TICKER.filter(p => p.signal.toLowerCase().includes(filterSignal.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white">Live Market & Currency Strength Matrix</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-currency correlation heatmap matrix, dynamic price charting, and technical AI indicator gauges.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-white/10">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeframe === tf
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Live Chart & Technical Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Chart (2 Cols) */}
        <div className="lg:col-span-2 glass-card p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <select 
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value)}
                className="bg-slate-900 border border-white/10 text-white font-bold text-sm px-4 py-2 rounded-xl outline-none focus:border-cyan-500 cursor-pointer"
              >
                {PAIRS_TICKER.map(p => (
                  <option key={p.pair} value={p.pair}>{p.pair} — Live Chart</option>
                ))}
              </select>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
                AI Forecast Active
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono-nums">
              <span className="text-slate-400">High: <span className="text-white font-bold">{activePairObj.high}</span></span>
              <span className="text-slate-400">Low: <span className="text-white font-bold">{activePairObj.low}</span></span>
              <span className={`font-bold ${activePairObj.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {activePairObj.changePct >= 0 ? `+${activePairObj.changePct}%` : `${activePairObj.changePct}%`}
              </span>
            </div>
          </div>

          {/* Interactive Chart.js Canvas Chart */}
          <div className="w-full h-80 bg-slate-950/90 rounded-2xl border border-white/10 p-4 relative shadow-inner">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Quantum AI Recommendation for {selectedPair}</div>
                <div className="text-[11px] text-slate-300">Strong bullish divergence detected on {timeframe} timeframe. Target: {(activePairObj.price + 0.0045).toFixed(4)}</div>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('tradecalculator')}
              className="btn-cyan text-xs py-1.5 px-3 shrink-0"
            >
              Trade Calculator
            </button>
          </div>
        </div>

        {/* Technical Gauges (1 Col) */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              Technical Indicator Gauges
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Live
            </span>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">RSI (14) Momentum</span>
                <span className="font-mono-nums font-bold text-emerald-400">68.4 (Bullish)</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '68.4%' }}></div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">MACD Histogram Spread</span>
                <span className="font-mono-nums font-bold text-cyan-400">+0.0024</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">MA Cross (50 / 200 SMA)</span>
                <span className="font-mono-nums font-bold text-emerald-400">Golden Cross</span>
              </div>
              <div className="text-[11px] text-slate-400">50 SMA above 200 SMA on 4H chart</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">ATR Volatility Index</span>
                <span className="font-mono-nums font-bold text-amber-400">Low (0.0042)</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 8x8 Currency Strength Heatmap Matrix */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              8x8 Relative Currency Strength Heatmap Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Cross-pair relative strength mapping. Row currency strength compared against Column currency.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            Live Matrix Engine
          </span>
        </div>

        {/* Heatmap Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse min-w-[700px]">
            <thead>
              <tr>
                <th className="p-3 bg-slate-900/90 border border-white/10 text-xs font-bold text-cyan-400">BASE \ QUOTE</th>
                {matrixCurrencies.map(code => (
                  <th key={code} className="p-3 bg-slate-900/90 border border-white/10 text-xs font-bold text-white font-mono">
                    {code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixCurrencies.map(rowCode => (
                <tr key={rowCode}>
                  <td className="p-3 bg-slate-900/90 border border-white/10 text-xs font-bold text-white font-mono">
                    {rowCode}
                  </td>
                  {matrixCurrencies.map(colCode => {
                    const data = getHeatmapVal(rowCode, colCode);
                    if (data.type === 'same') {
                      return (
                        <td key={colCode} className="p-3 bg-slate-950 border border-white/10 text-xs text-slate-600 font-mono">
                          1.0000
                        </td>
                      );
                    }
                    const isBull = data.type === 'bull';
                    return (
                      <td 
                        key={colCode} 
                        className={`p-3 border border-white/10 text-xs font-bold font-mono transition-all hover:scale-105 cursor-pointer ${
                          isBull 
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/40 border-emerald-500/30' 
                            : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/40 border-rose-500/30'
                        }`}
                      >
                        {data.val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signal Pairs Table */}
      <div className="glass-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white">Forex Currency Pairs & AI Signals</h2>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Filter Signal:</span>
            <select 
              value={filterSignal}
              onChange={(e) => setFilterSignal(e.target.value)}
              className="bg-slate-900 border border-white/10 text-white text-xs px-3 py-1.5 rounded-xl outline-none cursor-pointer"
            >
              <option value="All">All Signals</option>
              <option value="Buy">Buy Signals Only</option>
              <option value="Sell">Sell Signals Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <th className="p-3">Currency Pair</th>
                <th className="p-3">Live Price</th>
                <th className="p-3">24h Change</th>
                <th className="p-3">Day High</th>
                <th className="p-3">Day Low</th>
                <th className="p-3 text-right">AI Signal Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredPairs.map((p) => {
                const isPos = p.changePct >= 0;
                return (
                  <tr key={p.pair} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-bold text-white">{p.pair}</td>
                    <td className="p-3 font-mono-nums text-slate-200">{p.price}</td>
                    <td className={`p-3 font-mono-nums font-bold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPos ? `+${p.changePct}%` : `${p.changePct}%`}
                    </td>
                    <td className="p-3 font-mono-nums text-slate-400">{p.high}</td>
                    <td className="p-3 font-mono-nums text-slate-400">{p.low}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        p.signal.includes('Buy') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        p.signal.includes('Sell') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {p.signal}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
