import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { 
  TwitterIcon as Twitter, 
  YoutubeIcon as Youtube, 
  InstagramIcon as Instagram, 
  TwitchIcon as Tv, 
  DiscordIcon 
} from './BrandIcons';

export default function Footer() {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to Eternals updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="bg-black text-white border-t border-[#00FFDF]/15 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-t from-[#7F27FF]/10 via-[#00FFDF]/5 to-transparent blur-3xl pointer-events-none"></div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
              <span>Stay in the Game</span>
              <span className="w-2 h-2 rounded-full bg-[#00FFDF] animate-pulse"></span>
            </h3>
            <p className="text-white/60 font-paragraph text-sm md:text-base max-w-xl">
              Get the latest updates on tournaments, team roster news, and exclusive content delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex-1 max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#00FFDF]/10 border border-[#00FFDF]/30 rounded-xl text-[#00FFDF] text-sm font-medium">
                <CheckCircle2 size={18} />
                <span>You're locked in! Check your inbox for confirmation.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="input-field flex-1"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-6 shrink-0"
                >
                  <Send size={15} />
                  <span>Subscribe</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-black border border-[#00FFDF]/40 p-1 flex items-center justify-center">
                <img 
                  src="https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png" 
                  alt="EternalsGGs Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-2xl font-heading font-extrabold text-[#00FFDF] tracking-wide">
                  ETERNALS
                </div>
                <div className="text-xs font-paragraph text-white/50 tracking-widest uppercase -mt-1">
                  Gaming Organization
                </div>
              </div>
            </div>

            <p className="text-white/60 font-paragraph text-sm leading-relaxed max-w-md">
              EternalsGGs is a premier esports organization dedicated to competitive excellence, content creation, and building the future of gaming communities.
            </p>

            <div className="space-y-2.5 pt-2 text-sm text-white/70">
              <a 
                href="mailto:business@eternalsgg.com"
                className="flex items-center gap-3 hover:text-[#00FFDF] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00FFDF] border border-[#00FFDF]/20">
                  <Mail size={15} />
                </div>
                <span>business@eternalsgg.com</span>
              </a>
              <a 
                href="tel:240-230-7831"
                className="flex items-center gap-3 hover:text-[#00FFDF] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#00FFDF] border border-[#00FFDF]/20">
                  <Phone size={15} />
                </div>
                <span>240-230-7831</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-4">
              {[
                { icon: Twitter, href: 'https://twitter.com/eternalsgg', label: 'X (Twitter)' },
                { icon: Youtube, href: 'https://youtube.com/@eternalsgg', label: 'YouTube' },
                { icon: Tv, href: 'https://twitch.tv/eternalsgg', label: 'Twitch' },
                { icon: Instagram, href: 'https://instagram.com/eternalsgg', label: 'Instagram' },
                { icon: MessageSquare, href: 'https://discord.gg', label: 'Discord' }
              ].map((s, idx) => {
                const Icon = s.icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#00FFDF]/15 border border-white/10 hover:border-[#00FFDF]/40 text-white/70 hover:text-[#00FFDF] flex items-center justify-center transition-all hover:-translate-y-0.5"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFDF]"></span>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Teams', path: '/team' },
                { name: 'Tournaments', path: '/tournaments' },
                { name: 'Media Center', path: '/media' },
                { name: 'Contact', path: '/contact' }
              ].map(item => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="hover:text-[#00FFDF] hover:translate-x-1 transition-all text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Esports Links */}
          <div>
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7F27FF]"></span>
              Esports
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { name: 'Professional Teams', path: '/team' },
                { name: 'Player Profiles', path: '/team' },
                { name: 'Match Results', path: '/match-results' },
                { name: 'Tournament Schedule', path: '/tournaments' },
                { name: 'Live Streams', path: '/media' },
                { name: 'Team Tryouts', path: '/contact' }
              ].map(item => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="hover:text-[#00FFDF] hover:translate-x-1 transition-all text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFDF]"></span>
              Community
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                { name: 'Content Creators', path: '/team', external: false },
                { name: 'Community Discord', path: 'https://discord.gg', external: true },
                { name: 'Fan Art Gallery', path: '/media', external: false },
                { name: 'Merchandise Store', path: '/merch', external: false },
                { name: 'Partnership Program', path: '/contact', external: false },
                { name: 'Press Kit', path: '/about', external: false }
              ].map(item => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#00FFDF] hover:translate-x-1 transition-all inline-flex items-center gap-1.5"
                    >
                      <span>{item.name}</span>
                      <ExternalLink size={12} className="opacity-60" />
                    </a>
                  ) : (
                    <button
                      onClick={() => navigate(item.path)}
                      className="hover:text-[#00FFDF] hover:translate-x-1 transition-all text-left"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 relative z-10 bg-black/60">
        <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © 2026 EternalsGGs. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">Cookie Policy</button>
            <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
