import React, { useState } from 'react';
import { ShieldAlert, Play, CheckCircle2, Clock, AlertTriangle, RefreshCw, Zap, Sparkles, Cpu, Bell, ChevronRight } from 'lucide-react';
import { WORKFLOWS, CRISIS_ALERTS } from '../data/mockData';

export default function AutomationCenter() {
  const [workflows, setWorkflows] = useState(WORKFLOWS);
  const [alerts, setAlerts] = useState(CRISIS_ALERTS);
  const [advisorQuery, setAdvisorQuery] = useState('How should the central bank respond to high inflation and currency depreciation?');
  const [isGenerating, setIsGenerating] = useState(false);
  const [advisorOutput, setAdvisorOutput] = useState(null);

  const toggleWorkflow = (id) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' } : w));
  };

  const handleDismissAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleGenerateAdvisor = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setAdvisorOutput({
        recommendation: "Execute a coordinated 50bps rate hike while deploying $10B from foreign reserves to buffer currency volatility.",
        fiscalStep: "Reduce non-essential fuel subsidies by 10% to curb import expenditure.",
        tradeStep: "Implement export incentivization credits for national agricultural and technology sectors.",
        confidence: "97.4%"
      });
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            <h1 className="text-2xl font-black text-white">Crisis Response & Automation Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Autonomous event sentinel monitoring currency crashes, sovereign debt triggers & automated AI workflows.
          </p>
        </div>

        <span className="badge-rose text-xs">Autonomous Sentinel Active</span>
      </div>

      {/* Grid 1: Crisis Alerts Feed */}
      <div className="glass-panel-glow p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Active Sovereign Crisis Warnings ({alerts.length})
          </h2>
          <span className="badge-amber text-xs">Real-Time Event Stream</span>
        </div>

        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((al) => (
              <div 
                key={al.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="badge-rose text-[10px]">{al.level}</span>
                    <span className="text-xs text-cyan-400 font-bold font-mono">{al.target}</span>
                    <span className="text-slate-500 text-xs">• {al.time}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{al.type}</h3>
                  <p className="text-xs text-slate-300">{al.message}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => handleDismissAlert(al.id)}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    Acknowledge & Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-emerald-400 font-semibold text-sm">
            ✓ All active crisis alerts resolved. System operating in optimal safety range.
          </div>
        )}
      </div>

      {/* Grid 2: Active AI Automation Workflows */}
      <div className="glass-panel p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Autonomous Workflows & Event Pipelines
          </h2>
          <span className="badge-cyan text-xs">4 Workflows Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workflows.map((wf) => (
            <div key={wf.id} className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{wf.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  wf.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                }`}>
                  {wf.status}
                </span>
              </div>

              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>Schedule: {wf.schedule}</div>
                <div>Executions: {wf.executions}</div>
                <div>Last Run: {wf.lastRun}</div>
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-end">
                <button 
                  onClick={() => toggleWorkflow(wf.id)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  {wf.status === 'Active' ? 'Pause Workflow' : 'Resume Workflow'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid 3: Interactive AI Sovereign Advisor */}
      <div className="glass-panel-purple p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            Interactive AI Sovereign Strategy Advisor
          </h2>
          <span className="badge-purple text-xs">Quantum Strategy AI</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">Prompt Sovereign AI Advisor:</label>
            <textarea
              rows="3"
              value={advisorQuery}
              onChange={(e) => setAdvisorQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500"
            ></textarea>
          </div>

          <button 
            onClick={handleGenerateAdvisor}
            disabled={isGenerating}
            className="btn-purple text-xs py-2.5 px-4"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate Strategic AI Action Plan
          </button>

          {advisorOutput && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400">Quantum AI Executive Plan</span>
                <span className="badge-purple text-[10px]">Confidence: {advisorOutput.confidence}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-slate-200">
                  <span className="font-bold text-purple-300">Monetary Strategy: </span>
                  {advisorOutput.recommendation}
                </div>

                <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                  <span className="font-bold text-cyan-400">Fiscal Measure: </span>
                  {advisorOutput.fiscalStep}
                </div>

                <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                  <span className="font-bold text-emerald-400">Trade Action: </span>
                  {advisorOutput.tradeStep}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
