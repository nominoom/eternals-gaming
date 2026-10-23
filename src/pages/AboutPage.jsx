import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Shield, 
  Trophy, 
  Users, 
  Target, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Zap,
  Globe,
  Award
} from 'lucide-react';

export default function AboutPage() {
  const { stats, teams, players, creators, staff, navigate } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "When was EternalsGGs founded?",
      a: "EternalsGGs was established in 2024 by passionate competitive gamers and content strategists with a shared vision to bridge high-tier professional esports with community-first streaming culture."
    },
    {
      q: "How can players apply to join our competitive teams?",
      a: "We scout talent through community cash cups, open scrims, and verified tournament rankings. You can submit your competitive dossier and VOD links via our Contact page under 'Team Tryouts'."
    },
    {
      q: "Are Eternals tournaments open to the public?",
      a: "Yes! Most Eternals community showdowns across Marvel Rivals, Rocket League, and Call of Duty are open for public registration with zero entry fees and verified cash prize pools."
    },
    {
      q: "Where can I purchase official jerseys and peripherals?",
      a: "Official championship apparel, stealth hoodies, and pro-spec mechanical keyboards can be ordered directly from our official Merch Store with tracked international shipping."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="badge-primary mb-3">Our Legacy & Mission</span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-6">
            Building the Future of Competitive Gaming
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-3xl mx-auto leading-relaxed">
            EternalsGGs is a premier esports and digital entertainment organization dedicated to competitive excellence, athlete development, and cultivating passionate global gaming communities.
          </p>
        </div>
      </section>

      {/* Main Showcase Image (From Wix live site) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-[#00FFDF]/30 shadow-2xl relative">
          <img 
            src="https://static.wixstatic.com/media/66d70e_02a76128cc1c41bcbcc24bacb6394753~mv2.png?originWidth=800&originHeight=400" 
            alt="EternalsGGs Team" 
            className="w-full h-auto object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="text-sm font-heading font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              Eternals Family • 2026 Roster
            </span>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto">
        <div className="glass-card p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-[#00FFDF] mb-1">
                {stats.tournamentWins}+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                Tournament Wins
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-[#7F27FF] mb-1">
                {stats.professionalTeams}
              </div>
              <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                Pro Teams
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-[#00FFDF] mb-1">
                {stats.players}
              </div>
              <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                Roster Athletes
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-[#7F27FF] mb-1">
                {stats.creators}
              </div>
              <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                Content Creators
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-[#00FFDF] mb-1">
                {stats.staff}
              </div>
              <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                Dedicated Staff
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-[#7F27FF] mb-1">
                3,680+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                Combined Audience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Pillars */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
            Our Core Pillars
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-paragraph">
            The guiding principles behind every match we play, every broadcast we host, and every creator we support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-[#00FFDF]/15 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF] mb-6">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3">Competitive Dominance</h3>
            <p className="text-sm text-white/60 font-paragraph leading-relaxed">
              We recruit, coach, and support elite athletes equipped with structured boot camps, psychological conditioning, and deep tactical analytics.
            </p>
          </div>

          <div className="glass-card-secondary p-8">
            <div className="w-12 h-12 rounded-xl bg-[#7F27FF]/20 border border-[#7F27FF]/40 flex items-center justify-center text-[#7F27FF] mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3">Creator Empowerment</h3>
            <p className="text-sm text-white/60 font-paragraph leading-relaxed">
              Content is at our core. We empower unique personalities with production studios, brand partnerships, and cross-platform growth acceleration.
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-[#00FFDF]/15 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF] mb-6">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-3">Community First</h3>
            <p className="text-sm text-white/60 font-paragraph leading-relaxed">
              Gaming belongs to the players. We run regular open cups, host interactive podcasts, and maintain a safe, high-energy Discord collective.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
            Organization Leadership
          </h2>
          <p className="text-sm text-white/60 font-paragraph">
            Guiding Eternals into the next era of digital sports and entertainment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((lead) => (
            <div key={lead._id} className="glass-card p-6 text-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/10">
                <img src={lead.profileImage} alt={lead.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">{lead.name}</h3>
              <p className="text-xs text-[#00FFDF] font-paragraph">{lead.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-white/60 font-paragraph">
            Everything you need to know about EternalsGGs operations and community participation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="glass-card p-6 cursor-pointer"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-base font-heading font-semibold text-white">
                    {faq.q}
                  </h4>
                  <div className="text-[#00FFDF] shrink-0">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
                {isOpen && (
                  <p className="text-sm font-paragraph text-white/70 mt-3 pt-3 border-t border-white/10 leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center pt-8">
        <button
          onClick={() => navigate('/contact')}
          className="btn-primary py-3.5 px-8 text-sm"
        >
          <span>Connect With Us</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
