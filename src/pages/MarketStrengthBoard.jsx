import React, { useState } from 'react';
import { TrendingUp, Layers, Cpu, Award, Zap, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';
import { CURRENCIES, STOCKS_AND_CRYPTO } from '../data/mockData';
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

export default function MarketStrengthBoard() {
  const [activeCategory, setActiveCategory] = useState('forex');
  const [forecastHorizon, setForecastHorizon] = useState('12M');

  // Dynamic Chart.js Labels & Datasets based on horizon
  const labels3M = ['Baseline', 'Month +1', 'Month +2', 'Month +3 (Target)'];
  const labels12M = ['Baseline', 'Month +1', 'Month +3', 'Month +6', 'Month +9', 'Month +12 (Target)'];

  const currentLabels = forecastHorizon === '3M' ? labels3M : labels12M;

  const meanData = forecastHorizon === '3M' 
    ? [84.5, 86.2, 87.8, 88.4] 
    : [84.5, 86.2, 88.4, 91.0, 92.5, 94.1];

  const upperData = forecastHorizon === '3M'
    ? [84.5, 88.0, 91.5, 94.1]
    : [84.5, 88.0, 92.0, 95.5, 97.2, 98.8];

  const lowerData = forecastHorizon === '3M'
    ? [84.5, 82.0, 80.5, 79.2]
    : [84.5, 82.0, 81.0, 80.2, 79.5, 78.4];

  const chartData = {
    labels: currentLabels,
    datasets: [
      {
        label: 'Upper Confidence Limit (95%)',
        data: upperData,
        borderColor: '#00f2fe',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#00f2fe',
        pointRadius: 4,
        tension: 0.4,
        fill: '+1',
        backgroundColor: 'rgba(0, 242, 254, 0.12)',
      },
      {
        label: 'AI Mean Forecast Strength',
        data: meanData,
        borderColor: '#c084fc',
        borderWidth: 3.5,
        pointBackgroundColor: '#c084fc',
        pointHoverRadius: 7,
        pointRadius: 5,
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Lower Confidence Limit (95%)',
        data: lowerData,
        borderColor: '#f43f5e',
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: '#f43f5e',
        pointRadius: 4,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#f8fafc',
          font: { family: 'Plus Jakarta Sans', size: 12, weight: 'bold' },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#00f2fe',
        bodyColor: '#f8fafc',
        borderColor: 'rgba(0, 242, 254, 0.3)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw} / 100`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: {
          color: '#cbd5e1',
          font: { family: 'JetBrains Mono', size: 12, weight: '600' },
        },
      },
      y: {
        min: 65,
        max: 100,
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: {
          color: '#cbd5e1',
          font: { family: 'JetBrains Mono', size: 12, weight: '600' },
          callback: function (val) {
            return val + ' pts';
          },
        },
      },
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-card p-6">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white">Market Strength Intelligence Board</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Predictive multi-month strength trajectories, confidence intervals, and fundamental AI driver scores.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveCategory('forex')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'forex' ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(0,242,254,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Forex Majors
          </button>
          <button 
            onClick={() => setActiveCategory('indices')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'indices' ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Global Indices
          </button>
          <button 
            onClick={() => setActiveCategory('crypto')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'crypto' ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white'
            }`}
          >
            Digital Assets
          </button>
        </div>
      </div>

      {/* 3M / 12M AI Forecast Horizon Chart with Chart.js Canvas */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              AI Multi-Horizon Strength Forecast ({forecastHorizon})
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Deep Neural Forecast with 95% Confidence Band (Upper/Lower prediction limits).
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setForecastHorizon('3M')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                forecastHorizon === '3M' ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              3 Months Horizon
            </button>
            <button
              onClick={() => setForecastHorizon('12M')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                forecastHorizon === '12M' ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]' : 'text-slate-400 hover:text-white'
              }`}
            >
              12 Months Horizon
            </button>
          </div>
        </div>

        {/* Interactive Chart.js Canvas Chart Container */}
        <div className="w-full h-80 bg-slate-950/90 rounded-2xl border border-white/10 p-4 relative shadow-inner">
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Forecast KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Mean Forecast Strength</div>
            <div className="text-xl font-bold text-purple-300 font-mono-nums">
              {meanData[meanData.length - 1]} / 100
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1">+9.6% projected trajectory gain</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Upper Prediction Limit (95%)</div>
            <div className="text-xl font-bold text-cyan-300 font-mono-nums">
              {upperData[upperData.length - 1]} / 100
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Optimal Bullish Scenario</div>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
            <div className="text-xs text-slate-400 font-semibold">Lower Prediction Limit (95%)</div>
            <div className="text-xl font-bold text-rose-400 font-mono-nums">
              {lowerData[lowerData.length - 1]} / 100
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Stress-Tested Bearish Floor</div>
          </div>
        </div>
      </div>

      {/* Currency Strength Drivers Breakdown */}
      <div className="glass-card p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Fundamental vs Technical Strength Drivers
        </h2>

        <div className="space-y-4">
          {CURRENCIES.map((c) => (
            <div key={c.code} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <span className="text-sm font-bold text-white">{c.code} — {c.name}</span>
                    <span className="text-xs text-slate-400 ml-2">Central Bank: {c.centralBank} ({c.rate}%)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono-nums font-bold">
                    {c.strength} / 100
                  </span>
                  <span className={`text-xs font-bold ${c.sentiment === 'Bullish' ? 'text-emerald-400' : c.sentiment === 'Bearish' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {c.sentiment}
                  </span>
                </div>
              </div>

              {/* Driver Breakdown Progress Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Fundamental Rate Spread</span>
                    <span className="font-mono-nums text-cyan-400 font-bold">85%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Technical Momentum</span>
                    <span className="font-mono-nums text-purple-400 font-bold">72%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>NLP News Sentiment</span>
                    <span className="font-mono-nums text-emerald-400 font-bold">90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
