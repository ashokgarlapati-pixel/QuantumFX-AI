import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Cpu, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';

export default function Login({ onSwitchToRegister, onSwitchToForgotPassword }) {
  const { loginUser, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Invalid email address format. Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);
      await loginUser(trimmedEmail, password);
    } catch (err) {
      setIsLoading(false);
      console.error("Firebase Login Error Code:", err.code, "Message:", err.message);

      // Translate Firebase Auth errors to clear user feedback
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-login-credentials':
          setError('Invalid credentials: The email address or password is incorrect. If you signed up using Google, please click "Continue with Google".');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address format. Please enter a valid email address.');
          break;
        case 'auth/configuration-not-found':
        case 'auth/operation-not-allowed':
          setError('Firebase Setup Required: Email/Password Authentication is not enabled in your Firebase Console. Go to console.firebase.google.com → Authentication → Sign-in method → Enable Email/Password.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Access temporarily locked for security. Please try again in a few minutes or click "Forgot Password?".');
          break;
        case 'auth/network-request-failed':
          setError('Network connection error. Please check your internet connection and try again.');
          break;
        default:
          setError(err.message || 'Login failed. Please check your email and password, or Sign Up to create an account.');
          break;
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (err) {
      setIsLoading(false);
      console.error("Google Auth Error Code:", err.code, "Message:", err.message);
      if (err.code === 'auth/popup-closed-by-user') {
        return;
      }
      if (
        err.code === 'auth/configuration-not-found' || 
        err.code === 'auth/operation-not-allowed' || 
        err.code === 'auth/admin-restricted-operation'
      ) {
        setError('Firebase Setup Required: Google Provider is not toggled ON in your Firebase Console yet. Go to console.firebase.google.com → Select "quantumfx-ai" → Authentication → Sign-in method → Click "Add new provider" → Select "Google" → Choose Support Email → Click Save.');
        return;
      }
      if (err.code === 'auth/unauthorized-domain') {
        setError('Domain Authorization Required: Go to console.firebase.google.com → Authentication → Settings → Authorized Domains → Add "localhost".');
        return;
      }
      setError(err.message || 'Google Sign-In failed. Please check your network connection or try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center p-4 sm:p-6 selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Accent Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px]"></div>
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-[0_0_30px_rgba(0,242,254,0.35)]">
            <div className="w-full h-full bg-[#090d16] rounded-[15px] flex items-center justify-center">
              <Cpu className="w-8 h-8 text-[#00f2fe] animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              QuantumFX <span className="gradient-text-cyan">AI</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Sovereign Currency Strength & Macroeconomic Engine
            </p>
          </div>
        </div>

        {/* Login Form Container */}
        <div className="glass-card-purple p-8 space-y-6 border-2 border-purple-500/30 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Sign In To Your Account
            </h2>
            <p className="text-xs text-slate-400">Enter your credentials to access protected AI analysis tools.</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          {/* Direct Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-slate-100 border border-white/15 hover:border-cyan-500/50 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-md group"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
              />
            </svg>
            <span className="group-hover:text-cyan-300 transition-colors">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-white/10 w-full"></div>
            <span className="bg-[#0b0e18] px-3 text-[11px] text-slate-500 font-bold uppercase tracking-wider shrink-0">or email</span>
            <div className="border-t border-white/10 w-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Email Address</span>
              </label>
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={onSwitchToForgotPassword}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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
                  Signing In...
                </>
              ) : (
                <>
                  Sign In To Application
                  <ArrowRight className="w-4 h-4 text-cyan-950" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                Sign Up Now
              </button>
            </p>
          </div>

        </div>

        {/* Security Assurance Footer */}
        <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Protected by Firebase Authentication</span>
        </div>

      </div>
    </div>
  );
}
