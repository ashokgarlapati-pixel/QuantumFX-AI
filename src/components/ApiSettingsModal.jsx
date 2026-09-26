import React, { useState, useEffect } from 'react';
import { Key, X, CheckCircle2, AlertTriangle, RefreshCw, Globe, Zap, ExternalLink, ShieldCheck } from 'lucide-react';
import { API_PROVIDERS, getApiSettings, saveApiSettings, testMarketApiConnection } from '../services/marketApi';

export default function ApiSettingsModal({ isOpen, onClose }) {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('finnhub');
  const [enabled, setEnabled] = useState(false);

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const settings = getApiSettings();
      setApiKey(settings.apiKey);
      setProvider(settings.provider);
      setEnabled(settings.enabled);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentProviderObj = API_PROVIDERS.find(p => p.id === provider) || API_PROVIDERS[0];

  const handleTestAndSave = async () => {
    setIsTesting(true);
    setTestResult(null);

    const res = await testMarketApiConnection({ apiKey, provider });
    setTestResult(res);
    setIsTesting(false);

    if (res.success) {
      setEnabled(true);
      saveApiSettings({ apiKey, provider, enabled: true });
    }
  };

  const handleSaveWithoutTest = () => {
    saveApiSettings({ apiKey, provider, enabled: enabled && apiKey.length > 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0f172a] border border-cyan-500/30 w-full max-w-xl rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden space-y-0">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">Live Market Data API Integration</h2>
              <p className="text-xs text-slate-400">Connect your live API key for real-time stock & FX feeds</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Provider Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Select Market Data Provider</label>
            <select
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                setTestResult(null);
              }}
              className="w-full bg-slate-900 border border-white/10 text-white font-bold text-xs p-3 rounded-xl outline-none focus:border-cyan-500"
            >
              {API_PROVIDERS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <a 
              href={currentProviderObj.freeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold pt-1"
            >
              Get free API key for {currentProviderObj.name.split(' ')[0]} <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Your {currentProviderObj.name.split(' ')[0]} API Key</label>
            <input
              type="password"
              placeholder="Paste your live API Key here..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-white font-mono outline-none focus:border-cyan-500 placeholder-slate-500"
            />
          </div>

          {/* Toggle Live Feed */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-white/10">
            <div>
              <div className="text-xs font-bold text-white">Enable Live Market Stream</div>
              <div className="text-[11px] text-slate-400">Fetch live quotes directly from {currentProviderObj.name.split(' ')[0]}</div>
            </div>
            
            <button
              onClick={() => setEnabled(!enabled)}
              className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                enabled ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          {/* Connection Test Result */}
          {testResult && (
            <div className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in ${
              testResult.success 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                  <span>{testResult.success ? 'Live API Connection Verified!' : 'API Connection Failed'}</span>
                </div>
                {testResult.latency && <span className="font-mono text-[11px]">Latency: {testResult.latency}</span>}
              </div>

              {testResult.error && <p className="text-[11px] text-rose-300">{testResult.error}</p>}
            </div>
          )}

          {/* Test Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleTestAndSave}
              disabled={isTesting || !apiKey}
              className="btn-cyan text-xs py-2.5 px-4 flex-1 justify-center disabled:opacity-50"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Pinging API Endpoint...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Test & Activate Live API
                </>
              )}
            </button>

            <button
              onClick={handleSaveWithoutTest}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-white/10"
            >
              Save & Close
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-900/90 px-6 py-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Fallback: Quantum Neural Stream Active</span>
          <span className="text-cyan-400 font-bold">Encrypted Local Key Storage</span>
        </div>

      </div>
    </div>
  );
}
