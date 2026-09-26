import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Cpu, 
  Mail, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

export default function ForgotPassword({ onSwitchToLogin }) {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email.trim());
      setIsLoading(false);
      setMessage('Password reset instructions have been sent to your email address if an account exists.');
    } catch (err) {
      setIsLoading(false);
      console.error("Firebase Password Reset Error:", err.code, err.message);

      if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        // Do not leak sensitive account status details
        setMessage('Password reset instructions have been sent to your email address if an account exists.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center p-4 sm:p-6 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_30px_rgba(0,242,254,0.35)]">
            <div className="w-full h-full bg-[#090d16] rounded-[15px] flex items-center justify-center">
              <KeyRound className="w-8 h-8 text-[#00f2fe] animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Reset Your Password
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              QuantumFX AI Account Recovery
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-card-purple p-8 space-y-6 border-2 border-purple-500/30 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Password Reset Link
            </h2>
            <p className="text-xs text-slate-400">Enter your registered email address to receive password reset instructions.</p>
          </div>

          {/* Success Notification */}
          {message && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center gap-3 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>{message}</div>
              </div>
              <div className="text-[11px] text-emerald-200/80 bg-slate-950/60 p-3 rounded-lg border border-emerald-500/20 space-y-1">
                <div className="font-bold text-amber-300">📬 Can't find the email? Check your Spam/Junk folder:</div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                  <li>Firebase emails arrive from: <span className="font-mono text-cyan-300 font-bold">noreply@quantumfx-ai.firebaseapp.com</span></li>
                  <li>Check your <strong>Spam</strong>, <strong>Junk</strong>, or <strong>Promotions</strong> folder.</li>
                  <li>If registered with Google, click <strong>"Back To Login"</strong> and use <strong>"Continue with Google"</strong>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-cyan py-3 px-6 rounded-xl text-xs font-extrabold justify-center shadow-[0_0_20px_rgba(0,242,254,0.35)] mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending Reset Email...
                </>
              ) : (
                <>
                  Send Password Reset Link
                  <ArrowRight className="w-4 h-4 text-cyan-950" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Remembered your password?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                Back To Login
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
