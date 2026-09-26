import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  BarChart3, 
  Cpu, 
  Sliders, 
  ShieldAlert, 
  Calculator, 
  Search,
  Sparkles, 
  Menu, 
  X,
  TrendingUp,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSearch }) {
  const { currentUser, logoutUser } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home & Overview', icon: Activity },
    { id: 'dashboard', label: 'Currency Strength Heatmap', icon: BarChart3 },
    { id: 'marketstrengthboard', label: 'Currency Forecasts (3M/12M)', icon: TrendingUp },
    { id: 'policysimulator', label: 'Economic Policy Simulator', icon: Sliders },
    { id: 'automationcenter', label: 'Market Crisis Alerts', icon: ShieldAlert },
    { id: 'advancedmodules', label: 'AI Prediction Tools', icon: Cpu },
    { id: 'tradecalculator', label: 'Trade Calculator & Signals', icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#070a12]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-4">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-4">
        
        {/* Application Brand Title at Navbar Top */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_20px_rgba(0,242,254,0.35)] shrink-0">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Cpu className="w-6 h-6 text-[#00f2fe] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              QuantumFX <span className="gradient-text-cyan">AI</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Sovereign Currency & Macro Engine
            </div>
          </div>
        </div>

        {/* Desktop Active Section Label */}
        <div className="hidden xl:flex items-center gap-3 border-l border-white/10 pl-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
              {activeTab === 'home' && 'Home & Market Overview'}
              {activeTab === 'dashboard' && 'Live Currency Heatmap & Matrix'}
              {activeTab === 'marketstrengthboard' && '3M & 12M AI Currency Forecasts'}
              {activeTab === 'policysimulator' && 'Economic Policy Simulator'}
              {activeTab === 'automationcenter' && 'Market Crisis Alerts'}
              {activeTab === 'advancedmodules' && 'AI Prediction & Analysis Tools'}
              {activeTab === 'tradecalculator' && 'Trade Calculator & Signals'}
            </span>
          </div>
        </div>

        {/* Right Tools & Actions: Search Button & User Badge */}
        <div className="flex items-center gap-3">
          
          {/* Top Right Search Button */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Search Tools...</span>
            <kbd className="bg-slate-800 border border-white/10 text-xs px-2 py-0.5 rounded text-slate-400 font-mono">⌘K</kbd>
          </button>

          {/* Desktop User Profile & Logout */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-3 bg-slate-900/90 border border-purple-500/30 px-3.5 py-1.5 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-black text-xs text-white">
                  {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-xs font-bold text-slate-200 max-w-[130px] truncate">
                  {currentUser.displayName || currentUser.email}
                </div>
              </div>

              <button
                onClick={logoutUser}
                className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors border-l border-white/10 pl-2.5 flex items-center gap-1 text-xs font-bold"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-white/10"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden mt-4 pt-3 border-t border-white/10 space-y-2 animate-in fade-in">
          
          {currentUser && (
            <div className="p-3 mb-2 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">{currentUser.displayName || 'Authenticated User'}</div>
                  <div className="text-[10px] text-slate-400">{currentUser.email}</div>
                </div>
              </div>
              <button
                onClick={logoutUser}
                className="btn-cyan text-xs py-1.5 px-3 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-[#00f2fe] border border-cyan-500/35'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
