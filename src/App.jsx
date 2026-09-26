import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Components (Sign In, Sign Up, Forgot Password)
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// App Layout & Pages
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import LiveTickerBar from './components/LiveTickerBar';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';

import HomeOverview from './pages/HomeOverview';
import Dashboard from './pages/Dashboard';
import MarketStrengthBoard from './pages/MarketStrengthBoard';
import PolicySimulator from './pages/PolicySimulator';
import AutomationCenter from './pages/AutomationCenter';
import AdvancedModules from './pages/AdvancedModules';
import TradeCalculator from './pages/TradeCalculator';

import { Cpu, RefreshCw } from 'lucide-react';

function ProtectedAppContent() {
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'forgot-password'

  // Global CMD+K / CTRL+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Initial Auth Loading State (Prevents page flickering on refresh)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center p-6 selection:bg-cyan-500 selection:text-slate-950">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-purple-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-white">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
              Verifying Security Tokens & Firebase Auth Credentials...
            </div>
            <p className="text-xs text-slate-400 font-mono">QuantumFX Sovereign Engine Loading</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State -> Show Auth Screens (Sign In / Sign Up / Forgot Password)
  if (!currentUser) {
    if (authView === 'register') {
      return (
        <Register 
          onSwitchToLogin={() => setAuthView('login')} 
        />
      );
    }

    if (authView === 'forgot-password') {
      return (
        <ForgotPassword 
          onSwitchToLogin={() => setAuthView('login')} 
        />
      );
    }

    return (
      <Login 
        onSwitchToRegister={() => setAuthView('register')}
        onSwitchToForgotPassword={() => setAuthView('forgot-password')}
      />
    );
  }

  // 3. Authenticated State -> Render Full Protected Main Application Workspace
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col lg:flex-row selection:bg-cyan-500 selection:text-slate-950 font-sans animate-in fade-in duration-300">
      
      {/* Fixed Left Sidebar Navigation (w-64) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Workspace Area with Fixed Sidebar Offset (lg:pl-64) */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen lg:pl-64">
        
        {/* Top Navbar Header with Top-Right Search */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenSearch={() => setIsSearchOpen(true)}
        />

        {/* Live Ticker Bar */}
        <LiveTickerBar />

        {/* Main Content Viewport */}
        <main className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {activeTab === 'home' && <HomeOverview setActiveTab={setActiveTab} />}
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'marketstrengthboard' && <MarketStrengthBoard />}
          {activeTab === 'policysimulator' && <PolicySimulator />}
          {activeTab === 'automationcenter' && <AutomationCenter />}
          {activeTab === 'advancedmodules' && <AdvancedModules />}
          {activeTab === 'tradecalculator' && <TradeCalculator />}
        </main>

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>

      {/* Global Search Overlay */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectRoute={setActiveTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedAppContent />
    </AuthProvider>
  );
}
