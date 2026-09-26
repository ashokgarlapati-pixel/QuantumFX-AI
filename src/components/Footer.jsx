import React from 'react';
import { Cpu, ShieldCheck, Globe, Activity } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#050810] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
              <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="text-lg font-bold text-white">Quantum<span className="gradient-text-cyan">FX</span> AI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Autonomous Sovereign Currency Strength, Macroeconomic Stress Simulator & High-Frequency AI Risk Engine built for global central banks, FX desks, and quantitative traders.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
            <span className="live-dot"></span>
            <span>Quantum Cluster • 99.99% Uptime</span>
          </div>
        </div>

        {/* Quick Modules */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-cyan-400">Core Analytics</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><button onClick={() => setActiveTab('home')} className="hover:text-cyan-400 transition-colors">Command Center Overview</button></li>
            <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-cyan-400 transition-colors">Live Currency Heatmap & Matrix</button></li>
            <li><button onClick={() => setActiveTab('marketstrengthboard')} className="hover:text-cyan-400 transition-colors">3M & 12M AI FX Forecasts</button></li>
            <li><button onClick={() => setActiveTab('tradecalculator')} className="hover:text-cyan-400 transition-colors">AI Trade Signal Calculator</button></li>
          </ul>
        </div>

        {/* Simulators & AI */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 text-purple-400">Quantum AI Suite</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><button onClick={() => setActiveTab('policysimulator')} className="hover:text-purple-400 transition-colors">Sovereign Policy Impact Simulator</button></li>
            <li><button onClick={() => setActiveTab('automationcenter')} className="hover:text-purple-400 transition-colors">Crisis Sentinel & Automation</button></li>
            <li><button onClick={() => setActiveTab('advancedmodules')} className="hover:text-purple-400 transition-colors">Digital Twin Economic Engine</button></li>
            <li><button onClick={() => setActiveTab('advancedmodules')} className="hover:text-purple-400 transition-colors">Historical Crisis Time Machine</button></li>
          </ul>
        </div>

        {/* Tech Specs */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 space-y-3">
          <h4 className="text-xs font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Hackathon Production Spec
          </h4>
          <div className="text-[11px] text-slate-400 space-y-1 font-mono">
            <div>• Real-time WebSocket Data Feeds</div>
            <div>• Sub-15ms AI Inference Engine</div>
            <div>• Multi-Objective Pareto Optimization</div>
            <div>• Built for Base44 Hackathon Demo</div>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-cyan-400 font-bold">
            Status: Fully Operational & Verified
          </div>
        </div>

      </div>

      <div className="max-w-[1700px] mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 QuantumFX AI Systems. All rights reserved. Sovereign Financial Intelligence.</div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">API Docs</span>
          <span className="hover:text-slate-300 cursor-pointer">System Status</span>
        </div>
      </div>
    </footer>
  );
}
