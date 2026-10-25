import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Users, 
  Calendar, 
  Radio, 
  ShoppingBag, 
  Info, 
  Mail, 
  LogIn, 
  LogOut, 
  User, 
  ShieldAlert, 
  Menu, 
  X,
  ExternalLink,
  Trophy,
  Clock,
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function Navbar() {
  const { route, navigate, cartCount, setIsCartOpen, user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home, description: 'Return to organization home' },
    { name: 'Team', path: '/team', icon: Users, description: 'Athletes, rosters & creators' },
    { name: 'Tournaments', path: '/tournaments', icon: Calendar, description: 'Upcoming championships & brackets' },
    { name: 'Media', path: '/media', icon: Radio, description: 'Podcasts, videos & highlight reels' },
    { name: 'Merch', path: '/merch', icon: ShoppingBag, description: 'Official apparel & pro esports gear' },
    { name: 'About', path: '/about', icon: Info, description: 'Our history, mission & philosophy' },
    { name: 'Contact', path: '/contact', icon: Mail, description: 'Inquiries, tryouts & sponsorships' },
  ];

  const isActive = (path) => {
    if (path === '/') return route === '/';
    return route.startsWith(path);
  };

  const handleLinkClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-[#00FFDF]/15 transition-all">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gradient-to-br from-[#00FFDF]/20 to-[#7F27FF]/20 p-[2px] transition-transform group-hover:scale-105 duration-200">
              <div className="w-full h-full rounded-[10px] bg-black/90 flex items-center justify-center p-1.5 overflow-hidden">
                <img 
                  src="https://static.wixstatic.com/media/66d70e_7f0c062700634dc49d1f637c1d837a08~mv2.png" 
                  alt="EternalsGGs Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,255,223,0.5)]"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-extrabold tracking-wider text-white group-hover:text-[#00FFDF] transition-colors flex items-center gap-1.5">
                ETERNALS
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFDF] animate-pulse"></span>
              </span>
              <span className="text-[11px] font-paragraph text-white/50 tracking-widest uppercase -mt-0.5">
                Gaming Organization
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <div key={link.name} className="relative group">
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      active 
                        ? 'text-[#00FFDF] bg-[#00FFDF]/15 shadow-[0_0_15px_rgba(0,255,223,0.25)] font-semibold border border-[#00FFDF]/40'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} className={`shrink-0 ${active ? 'text-[#00FFDF]' : 'text-white/60 group-hover:text-[#00FFDF] transition-colors'}`} />
                    <span>{link.name}</span>
                  </button>


                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[#080A0E] border border-[#00FFDF]/25 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 transform group-hover:translate-y-0 translate-y-1">
                    <span className="text-xs text-white/80 font-paragraph">{link.description}</span>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#080A0E] border-l border-t border-[#00FFDF]/25 rotate-45"></div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Actions: Cart, Admin, Auth */}
          <div className="flex items-center gap-3">
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#00FFDF] transition-colors border border-white/10"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#00FFDF] text-black text-xs font-heading font-bold flex items-center justify-center shadow-[0_0_10px_rgba(0,255,223,0.8)] animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Operational Portals Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => { setPortalsDropdownOpen(!portalsDropdownOpen); setUserDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#00FFDF] border border-white/10 transition-all cursor-pointer"
              >
                <Layers size={14} className="text-[#00FFDF]" />
                <span>Portals</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${portalsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {portalsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#080A0E] border border-[#00FFDF]/30 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] p-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#00FFDF] border-b border-white/10 mb-1">
                    System Portals
                  </div>
                  <button
                    onClick={() => { handleLinkClick('/team-dashboard'); setPortalsDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                  >
                    <Sparkles size={14} className="text-[#00FFDF] shrink-0" />
                    <div>
                      <div className="font-heading font-bold text-white">Team Dossier Portal</div>
                      <div className="text-[10px] text-white/50">Social accounts & follower metrics</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { handleLinkClick('/tournament-admin'); setPortalsDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                  >
                    <Clock size={14} className="text-[#7F27FF] shrink-0" />
                    <div>
                      <div className="font-heading font-bold text-white">Tournament Arbiter Desk</div>
                      <div className="text-[10px] text-white/50">Referee time clock & match desk</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { handleLinkClick('/tournaments-dashboard'); setPortalsDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                  >
                    <Trophy size={14} className="text-[#00FFDF] shrink-0" />
                    <div>
                      <div className="font-heading font-bold text-white">Tournaments Player Hub</div>
                      <div className="text-[10px] text-white/50">Championship sign-ups & check-in</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { handleLinkClick('/admin'); setPortalsDropdownOpen(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left border-t border-white/10 mt-1 pt-2"
                  >
                    <ShieldAlert size={14} className="text-[#7F27FF] shrink-0" />
                    <div>
                      <div className="font-heading font-bold text-[#c499ff]">Admin Command Center</div>
                      <div className="text-[10px] text-white/50">Direct revenue & site settings</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Admin shortcut if logged in as Admin */}
            {user?.role === 'Admin' && (
              <button
                onClick={() => handleLinkClick('/admin')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold tracking-wider uppercase transition-all ${
                  route.startsWith('/admin')
                    ? 'bg-[#7F27FF] text-white shadow-[0_0_15px_rgba(127,39,255,0.5)]'
                    : 'bg-[#7F27FF]/15 text-[#c499ff] hover:bg-[#7F27FF]/30 border border-[#7F27FF]/30'
                }`}
              >
                <ShieldAlert size={14} />
                Admin
              </button>
            )}

            {/* User Profile / Sign In */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setUserDropdownOpen(!userDropdownOpen); setPortalsDropdownOpen(false); }}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 transition-all text-sm"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-7 h-7 rounded-full object-cover border border-[#00FFDF]/40" 
                  />
                  <span className="hidden md:inline font-medium text-white/90 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-[#080A0E] border border-[#00FFDF]/25 rounded-xl shadow-2xl p-2 z-50">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-[#00FFDF] font-medium">{user.role} Account</p>
                    </div>
                    <button
                      onClick={() => { handleLinkClick('/profile'); setUserDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <User size={15} className="text-[#00FFDF]" />
                      Profile Dossier
                    </button>
                    <button
                      onClick={() => { handleLinkClick('/team-dashboard'); setUserDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <Sparkles size={15} className="text-[#00FFDF]" />
                      Team Dossier & Socials
                    </button>
                    <button
                      onClick={() => { handleLinkClick('/tournament-admin'); setUserDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <Clock size={15} className="text-[#7F27FF]" />
                      Referee & Arbiter Desk
                    </button>
                    <button
                      onClick={() => { handleLinkClick('/tournaments-dashboard'); setUserDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <Trophy size={15} className="text-[#00FFDF]" />
                      Tournaments Player Hub
                    </button>
                    {user.role === 'Admin' && (
                      <button
                        onClick={() => { handleLinkClick('/admin'); setUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-[#c499ff] hover:bg-[#7F27FF]/15 rounded-lg transition-colors text-left border-t border-white/10 mt-1 pt-2"
                      >
                        <ShieldAlert size={15} />
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-left mt-1"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleLinkClick('/signin')}
                className="btn-primary text-sm py-2 px-4 shadow-[0_0_15px_rgba(0,255,223,0.3)]"
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-white/5 text-white/80 hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-black/95 backdrop-blur-xl">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      active
                        ? 'bg-[#00FFDF]/15 text-[#00FFDF] font-semibold border-l-2 border-[#00FFDF]'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={18} className={active ? 'text-[#00FFDF]' : 'text-white/60'} />
                    <div>
                      <div className="text-sm font-medium">{link.name}</div>
                      <div className="text-xs text-white/40">{link.description}</div>
                    </div>
                  </button>
                );
              })}

              <div className="pt-3 pb-1 px-4 text-[10px] font-mono uppercase tracking-wider text-white/40 border-t border-white/10 mt-2">
                Operational Portals
              </div>
              
              <button
                onClick={() => handleLinkClick('/team-dashboard')}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-left hover:bg-white/5 text-white/80"
              >
                <Sparkles size={18} className="text-[#00FFDF]" />
                <div>
                  <div className="text-sm font-medium">Team Dossier Portal</div>
                  <div className="text-xs text-white/40">Athletes, socials & follower metrics</div>
                </div>
              </button>

              <button
                onClick={() => handleLinkClick('/tournament-admin')}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-left hover:bg-white/5 text-white/80"
              >
                <Clock size={18} className="text-[#7F27FF]" />
                <div>
                  <div className="text-sm font-medium">Tournament Arbiter Desk</div>
                  <div className="text-xs text-white/40">Referee duty time & match desk</div>
                </div>
              </button>

              <button
                onClick={() => handleLinkClick('/tournaments-dashboard')}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-left hover:bg-white/5 text-white/80"
              >
                <Trophy size={18} className="text-[#00FFDF]" />
                <div>
                  <div className="text-sm font-medium">Tournaments Player Hub</div>
                  <div className="text-xs text-white/40">Championship sign-ups & check-in</div>
                </div>
              </button>

              {user?.role === 'Admin' && (
                <button
                  onClick={() => handleLinkClick('/admin')}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-left bg-[#7F27FF]/15 text-[#c499ff] border-l-2 border-[#7F27FF] mt-2"
                >
                  <ShieldAlert size={18} />
                  <div>
                    <div className="text-sm font-medium">Admin Dashboard</div>
                    <div className="text-xs text-[#c499ff]/60">Manage teams, players & direct revenue</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
