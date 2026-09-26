import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  Sliders, 
  ShieldAlert, 
  Cpu, 
  Calculator,
  LogOut,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { currentUser, logoutUser } = useAuth();

  const categories = [
    {
      title: 'MAIN DASHBOARD',
      items: [
        { id: 'home', label: 'Home & Overview', icon: Activity, badge: 'Live' },
        { id: 'dashboard', label: 'Currency Strength Heatmap', icon: BarChart3, badge: '8x8' },
        { id: 'marketstrengthboard', label: 'Currency Forecasts', icon: TrendingUp, badge: 'AI' }
      ]
    },
    {
      title: 'SIMULATORS & ALERTS',
      items: [
        { id: 'policysimulator', label: 'Policy Simulator', icon: Sliders, badge: 'Sim' },
        { id: 'automationcenter', label: 'Market Crisis Alerts', icon: ShieldAlert, badge: 'Live' }
      ]
    },
    {
      title: 'AI TOOLS & TRADING',
      items: [
        { id: 'advancedmodules', label: 'AI Prediction Tools', icon: Cpu, badge: '7 Tools' },
        { id: 'tradecalculator', label: 'Trade Calculator', icon: Calculator, badge: 'Signals' }
      ]
    }
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#090d18]/95 backdrop-blur-2xl border-r border-white/10 flex-col justify-between hidden lg:flex shrink-0 h-screen overflow-y-auto">
      
      <div className="p-4 space-y-5">
        
        {/* Brand Header */}
        <div 
          className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all shadow-md group"
          onClick={() => setActiveTab('home')}
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,242,254,0.35)] shrink-0">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#00f2fe] animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white font-sans group-hover:text-cyan-400 transition-colors">
                QuantumFX <span className="gradient-text-cyan">AI</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Sovereign Currency & Macro Engine</p>
          </div>
        </div>

        {/* Navigation Section Groups */}
        <nav className="space-y-5">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2.5">
                {cat.title}
              </div>

              <div className="space-y-1">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/25 via-blue-600/20 to-purple-600/15 text-[#00f2fe] border border-cyan-500/40 shadow-[0_0_20px_rgba(0,242,254,0.15)]'
                          : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-[#00f2fe]' : 'text-slate-400'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ${
                          isActive
                            ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40'
                            : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

      </div>

      <div className="space-y-2">
        {/* Authenticated User Profile & Logout */}
        {currentUser && (
          <div className="mx-4 p-3 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center font-black text-xs text-white shrink-0 shadow-sm">
                {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">
                  {currentUser.displayName || 'Authenticated User'}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {currentUser.email}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Verified
              </span>
              <button
                onClick={logoutUser}
                className="text-slate-400 hover:text-rose-400 font-bold flex items-center gap-1 transition-colors"
                title="Sign Out of Application"
              >
                <LogOut className="w-3 h-3" />
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Footer System Status Badge */}
        <div className="p-3 m-4 mt-0 rounded-xl bg-slate-900/90 border border-emerald-500/25 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="live-dot"></span>
              <span className="text-[11px] font-extrabold text-emerald-400">Live Market Feed</span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono font-bold">Active</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Twelve Data API feed connected.
          </p>
        </div>
      </div>

    </aside>
  );
}
