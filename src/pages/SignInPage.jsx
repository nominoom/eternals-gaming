import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LogIn, UserPlus, Shield, Sparkles, ArrowRight, Check } from 'lucide-react';

export default function SignInPage() {
  const { login, navigate } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('admin@eternalsggs.com');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Alex Mercer');

  const handleAuth = (e) => {
    e.preventDefault();
    const isAdmin = email.includes('admin') || email.includes('eternals');
    login({
      name: fullName || 'Alex Mercer',
      email: email,
      role: isAdmin ? 'Admin' : 'Member',
      title: isAdmin ? 'Organization Director' : 'Community Member',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    });
    navigate(isAdmin ? '/admin' : '/profile');
  };

  const handleOAuthLogin = (provider) => {
    login({
      name: provider === 'Discord' ? 'Vortex#1337' : 'Alex Mercer',
      email: `${provider.toLowerCase()}@eternalsggs.com`,
      role: 'Admin',
      title: 'Competitive Athlete',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80'
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="hero-glow"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Card */}
        <div className="glass-card p-8 sm:p-10 border-[#00FFDF]/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#00FFDF] via-[#7F27FF] to-[#00FFDF]"></div>

          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-black border border-[#00FFDF]/40 p-2 mx-auto mb-4 flex items-center justify-center">
              <img 
                src="https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png" 
                alt="Eternals Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <h1 className="text-2xl font-heading font-black text-white mb-2">
              {isRegister ? 'Join Eternals GGs' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-white/60 font-paragraph">
              {isRegister ? 'Create your official gaming passport' : 'Sign in to access your player dossier and tournament stats'}
            </p>
          </div>

          {/* Social Auth */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuthLogin('Google')}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-sm font-heading font-semibold text-white flex items-center justify-center gap-3 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={() => handleOAuthLogin('Discord')}
              className="w-full py-2.5 px-4 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 text-sm font-heading font-semibold text-white flex items-center justify-center gap-3 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Continue with Discord</span>
            </button>
          </div>

          <div className="flex items-center gap-3 my-6 text-xs text-white/30 uppercase font-heading">
            <span className="flex-1 h-[1px] bg-white/10"></span>
            <span>Or with email</span>
            <span className="flex-1 h-[1px] bg-white/10"></span>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <div>
                <label className="text-xs font-heading font-semibold text-white/70 mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  placeholder="e.g. Alex Mercer"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-heading font-semibold text-white/70 mb-1 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="admin@eternalsggs.com"
              />
            </div>

            <div>
              <label className="text-xs font-heading font-semibold text-white/70 mb-1 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field font-mono"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm mt-4"
            >
              <LogIn size={15} />
              <span>{isRegister ? 'Register Account' : 'Sign In Now'}</span>
            </button>
          </form>

          {/* Switch toggle */}
          <div className="text-center mt-6 pt-4 border-t border-white/10 text-xs text-white/60">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-[#00FFDF] hover:underline font-bold"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-[#00FFDF] hover:underline font-bold"
                >
                  Create One
                </button>
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
