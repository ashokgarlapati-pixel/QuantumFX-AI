import React, { useState } from 'react';
import { Sliders, RefreshCw, Sparkles, CheckCircle2, AlertTriangle, Shield, Users, Clock, History, Play, RotateCcw, Brain, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PolicySimulator() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'results' | 'history'
  
  // Slider States matching Base44 exact parameters
  const [interestRate, setInterestRate] = useState(0);
  const [fuelCost, setFuelCost] = useState(0);
  const [taxation, setTaxation] = useState(0);
  const [subsidy, setSubsidy] = useState(0);
  const [forexReserve, setForexReserve] = useState(0);
  const [timeHorizon, setTimeHorizon] = useState(30); // in days

  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [historyList, setHistoryList] = useState([
    {
      id: 1,
      date: 'Just now',
      score: 78,
      verdict: 'Approved — Safe Policy',
      params: 'Interest: 0.5%, Fuel: 5%, Subsidy: -5%'
    }
  ]);

  const handleReset = () => {
    setInterestRate(0);
    setFuelCost(0);
    setTaxation(0);
    setSubsidy(0);
    setForexReserve(0);
    setTimeHorizon(30);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);

    setTimeout(() => {
      // Calculate dynamic Citizen Impact Score (0 to 100)
      const score = Math.max(10, Math.min(98, Math.round(
        78 - (fuelCost * 0.4) - (interestRate * 2.5) - (taxation * 0.8) + (subsidy * 0.5) + (forexReserve * 0.3)
      )));

      const inflationVal = (2.4 + (fuelCost * 0.08) - (interestRate * 0.6) + (taxation * 0.15)).toFixed(1);
      const debtVal = ((subsidy * 1.2 - taxation * 1.5) * (timeHorizon / 30)).toFixed(1);

      let decision = 'Approve';
      let verdict = 'Safe & Recommended — High Citizen Protection';
      let riskTag = 'Safe';
      let tagClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

      if (score < 30) {
        decision = 'Reject';
        verdict = 'High Danger — Reject Policy (Severe Citizen Hardship)';
        riskTag = 'High Danger';
        tagClass = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      } else if (score < 60) {
        decision = 'Modify';
        verdict = 'Moderate Risk — Modify Parameters Before Implementation';
        riskTag = 'Moderate Risk';
        tagClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      } else if (score < 80) {
        decision = 'Approve';
        verdict = 'Low Risk — Safe for Implementation';
        riskTag = 'Low Risk';
        tagClass = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      }

      const newRes = {
        score,
        decision,
        verdict,
        riskTag,
        tagClass,
        inflation: `${inflationVal}%`,
        debtShift: debtVal >= 0 ? `+$${debtVal}B` : `-$${Math.abs(debtVal)}B`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSimulationResult(newRes);
      setHistoryList(prev => [
        {
          id: Date.now(),
          date: newRes.timestamp,
          score: newRes.score,
          verdict: newRes.verdict,
          params: `Interest: ${interestRate}%, Fuel: ${fuelCost}%, Tax: ${taxation}%`
        },
        ...prev
      ]);

      setIsSimulating(false);
      setActiveTab('results');

      if (score >= 60) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top View Selector Tabs (Simulator | Results | History) */}
      <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'simulator'
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Simulator
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'results'
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Results
          {simulationResult && (
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'history'
              ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <History className="w-4 h-4" />
          History ({historyList.length})
        </button>
      </div>

      {/* VIEW 1: SIMULATOR TAB */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Left Simulator Panel (8 Cols) */}
          <div className="lg:col-span-8 glass-card p-6 sm:p-8 space-y-6">
            
            {/* Header with Title & Reset Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-white">Policy Impact Simulator</h1>
                  <p className="text-xs text-slate-400">Predict citizen impact before implementation</p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-bold border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* 2-Column Clean Slider Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Slider 1: Interest Rate Change */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    % Interest Rate Change
                  </span>
                  <span className="font-mono-nums font-extrabold text-cyan-400 text-sm">{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="-5" 
                  max="5" 
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>-5%</span>
                  <span>5%</span>
                </div>
              </div>

              {/* Slider 2: Fuel Import Cost Change */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    ⛽ Fuel Import Cost Change
                  </span>
                  <span className="font-mono-nums font-extrabold text-amber-400 text-sm">{fuelCost}%</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="50" 
                  step="5"
                  value={fuelCost}
                  onChange={(e) => setFuelCost(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>-50%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Slider 3: Taxation Change */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    💲 Taxation Change
                  </span>
                  <span className="font-mono-nums font-extrabold text-purple-400 text-sm">{taxation}%</span>
                </div>
                <input 
                  type="range" 
                  min="-20" 
                  max="20" 
                  step="2"
                  value={taxation}
                  onChange={(e) => setTaxation(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>-20%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Slider 4: Subsidy Change */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    🛒 Subsidy Change
                  </span>
                  <span className="font-mono-nums font-extrabold text-emerald-400 text-sm">{subsidy}%</span>
                </div>
                <input 
                  type="range" 
                  min="-50" 
                  max="50" 
                  step="5"
                  value={subsidy}
                  onChange={(e) => setSubsidy(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>-50%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Slider 5: Forex Reserve Action */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    🏦 Forex Reserve Action
                  </span>
                  <span className="font-mono-nums font-extrabold text-cyan-400 text-sm">{forexReserve}%</span>
                </div>
                <input 
                  type="range" 
                  min="-30" 
                  max="30" 
                  step="5"
                  value={forexReserve}
                  onChange={(e) => setForexReserve(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>-30%</span>
                  <span>30%</span>
                </div>
              </div>

              {/* Slider 6: Time Horizon */}
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    ⏱️ Time Horizon
                  </span>
                  <span className="font-mono-nums font-extrabold text-cyan-400 text-sm">{timeHorizon} days</span>
                </div>
                <input 
                  type="range" 
                  min="7" 
                  max="365" 
                  step="7"
                  value={timeHorizon}
                  onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 week</span>
                  <span>1 year</span>
                </div>
              </div>

            </div>

            {/* Run Policy Simulation CTA Button */}
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full btn-cyan py-4 text-base justify-center font-black rounded-2xl shadow-[0_0_30px_rgba(0,242,254,0.35)]"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Running Policy Simulation...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  Run Policy Simulation
                </>
              )}
            </button>

          </div>

          {/* Right Panel: How It Works & Score Guide (4 Cols) */}
          <div className="lg:col-span-4 glass-card p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* How It Works Header */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <Brain className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-extrabold text-white">How It Works</h2>
              </div>

              {/* Steps 1, 2, 3 */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Set Parameters</div>
                    <div className="text-[11px] text-slate-400">Adjust policy changes using sliders</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Run Simulation</div>
                    <div className="text-[11px] text-slate-400">AI predicts impact on citizens</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Review & Decide</div>
                    <div className="text-[11px] text-slate-400">Approve, modify, or reject based on score</div>
                  </div>
                </div>
              </div>

              {/* Score Guide Box */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3">
                <div className="text-xs font-extrabold text-white uppercase tracking-wider">Score Guide</div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-400 font-mono-nums">80 - 100</span>
                    <span className="text-slate-300">Safe & Recommended</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-cyan-400 font-mono-nums">60 - 80</span>
                    <span className="text-slate-300">Low Risk</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-400 font-mono-nums">30 - 60</span>
                    <span className="text-slate-300">Moderate — Modify</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-rose-400 font-mono-nums">0 - 30</span>
                    <span className="text-slate-300">High Danger — Reject</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="text-[11px] text-slate-500 font-mono text-center pt-2">
              Neural Policy Simulator v4.8
            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: RESULTS TAB */}
      {activeTab === 'results' && (
        <div className="glass-card p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Simulation Results & Decision
            </h2>

            <button
              onClick={() => setActiveTab('simulator')}
              className="btn-secondary text-xs py-1.5 px-3"
            >
              Modify Sliders
            </button>
          </div>

          {simulationResult ? (
            <div className="space-y-6">
              
              {/* Verdict Header Banner */}
              <div className={`p-6 rounded-2xl border ${simulationResult.tagClass} flex items-center gap-4`}>
                {simulationResult.decision === 'Approve' ? (
                  <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-8 h-8 shrink-0 text-amber-400" />
                )}
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider">{simulationResult.riskTag}</span>
                  <h3 className="text-lg font-black">{simulationResult.verdict}</h3>
                </div>
              </div>

              {/* Citizen Score Gauge */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Citizen Impact Score
                  </span>
                  <span className="text-3xl font-black font-mono-nums text-cyan-400">
                    {simulationResult.score} <span className="text-xs text-slate-500">/ 100</span>
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-1000 rounded-full" 
                    style={{ width: `${simulationResult.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Impact Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold">Inflation Projection</div>
                  <div className="text-xl font-bold font-mono-nums text-amber-400">{simulationResult.inflation}</div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
                  <div className="text-xs text-slate-400 font-semibold">Budget Impact</div>
                  <div className="text-xl font-bold font-mono-nums text-purple-300">{simulationResult.debtShift}</div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <Sliders className="w-12 h-12 text-slate-600 mx-auto" />
              <div className="text-sm font-bold text-slate-300">No Simulation Run Yet</div>
              <button onClick={() => setActiveTab('simulator')} className="btn-cyan text-xs py-2 px-4">
                Go to Simulator
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="glass-card p-6 space-y-4 max-w-4xl mx-auto">
          <h2 className="text-xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            Simulation Run History
          </h2>

          <div className="space-y-3">
            {historyList.map(h => (
              <div key={h.id} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{h.verdict}</div>
                  <div className="text-[11px] text-slate-400">{h.params} • {h.date}</div>
                </div>
                <div className="text-right font-mono-nums font-bold text-cyan-400 text-sm">
                  Score: {h.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
