import React from 'react';
import { useApp } from '../context/AppContext';
import SponsorsMarquee from '../components/SponsorsMarquee';
import { 
  Trophy, 
  Users, 
  UserCheck, 
  Gamepad2, 
  Calendar, 
  Radio, 
  ArrowRight, 
  Play, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Flame,
  Shield
} from 'lucide-react';

export default function HomePage() {
  const { navigate, stats, teams, tournaments, podcasts, setActiveAudioPodcast, setRegistrationModalTournament } = useApp();

  const featuredTournaments = tournaments.slice(0, 2);
  const featuredTeams = teams.slice(0, 3);
  const featuredPodcast = podcasts[0];

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-20 px-4 sm:px-6 lg:px-8">
        
        {/* Ambient Glows */}
        <div className="hero-glow"></div>
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#7F27FF]/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#00FFDF]/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center py-16">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#00FFDF]/30 text-[#00FFDF] text-xs font-heading font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,223,0.2)]">
            <Sparkles size={14} className="animate-spin text-[#00FFDF]" />
            <span>Professional Gaming Organization</span>
          </div>

          {/* Headline with interactive hovering letters */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-white mb-2 select-none">
            {"ETERNALS".split("").map((char, idx) => (
              <span
                key={idx}
                className="inline-block transition-all duration-200 hover:text-[#00FFDF] hover:scale-110 hover:-translate-y-2 cursor-pointer filter hover:drop-shadow-[0_0_25px_rgba(0,255,223,0.8)]"
              >
                {char}
              </span>
            ))}
          </h1>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00FFDF] via-[#7F27FF] to-[#00FFDF] mb-8 select-none">
            {"GAMING".split("").map((char, idx) => (
              <span
                key={idx}
                className="inline-block transition-all duration-200 hover:text-white hover:scale-110 hover:-translate-y-2 cursor-pointer filter hover:drop-shadow-[0_0_25px_rgba(127,39,255,0.8)]"
              >
                {char}
              </span>
            ))}
          </h2>

          <p className="text-lg sm:text-xl text-white/75 font-paragraph max-w-2xl mx-auto mb-10 leading-relaxed">
            Elite esports organization competing at the highest level across multiple premier titles, forging champions, and building the future of gaming culture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/team')}
              className="btn-primary w-full sm:w-auto text-base py-3.5 px-8 shadow-[0_0_30px_rgba(0,255,223,0.35)]"
            >
              <span>View Our Teams</span>
              <ArrowRight size={18} />
            </button>
            <a
              href="https://www.beacons.ai/eternalsgg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white w-full sm:w-auto text-base py-3.5 px-8 flex items-center justify-center gap-2"
            >
              <Radio size={18} className="text-[#00FFDF]" />
              <span>Watch Live</span>
            </a>
          </div>
        </div>

        {/* Sponsor Marquee at bottom of Hero */}
        <div className="w-full relative z-20 mt-auto">
          <SponsorsMarquee />
        </div>
      </section>

      {/* STATS SHOWCASE SECTION */}
      <section className="py-20 border-b border-white/10 bg-black/50 relative overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { label: 'Tournament Wins', value: stats.tournamentWins || 6, icon: Trophy, color: 'text-[#00FFDF]', bg: 'bg-[#00FFDF]/10', border: 'border-[#00FFDF]/30' },
              { label: 'Staff Members', value: stats.staff || 8, icon: UserCheck, color: 'text-[#7F27FF]', bg: 'bg-[#7F27FF]/10', border: 'border-[#7F27FF]/30' },
              { label: 'Creators', value: stats.creators || 12, icon: Users, color: 'text-[#00FFDF]', bg: 'bg-[#00FFDF]/10', border: 'border-[#00FFDF]/30' },
              { label: 'Players', value: stats.players || 4, icon: Shield, color: 'text-[#7F27FF]', bg: 'bg-[#7F27FF]/10', border: 'border-[#7F27FF]/30' },
              { label: 'Pro Teams', value: stats.professionalTeams || 3, icon: Gamepad2, color: 'text-[#00FFDF]', bg: 'bg-[#00FFDF]/10', border: 'border-[#00FFDF]/30' },
              { label: 'Active Tournaments', value: tournaments.length, icon: Calendar, color: 'text-[#7F27FF]', bg: 'bg-[#7F27FF]/10', border: 'border-[#7F27FF]/30' }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i}
                  className="glass-card p-6 text-center group relative overflow-hidden"
                >
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className={stat.color} />
                  </div>
                  <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">
                    {stat.value}+
                  </div>
                  <div className="text-xs uppercase tracking-wider font-heading text-white/50">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR TEAMS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#00FFDF] mb-3">
            <Flame size={14} />
            <span>Competitive Rosters</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            OUR TEAMS
          </h2>
          <p className="text-white/60 font-paragraph text-base sm:text-lg">
            Meet our professional rosters competing on the world stage across Apex Legends, Warzone, and Marvel Rivals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredTeams.map((team) => (
            <div 
              key={team._id}
              className="glass-card p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00FFDF]/10 to-transparent rounded-bl-full pointer-events-none"></div>

              <div>
                <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 p-2 mx-auto mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img 
                    src={team.teamLogo} 
                    alt={team.teamName} 
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-2xl font-heading font-bold text-white text-center mb-2 group-hover:text-[#00FFDF] transition-colors">
                  {team.teamName}
                </h3>
                
                <p className="text-sm font-paragraph text-white/60 text-center mb-6 leading-relaxed">
                  {team.teamDescription}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-sm">
                  <span className="badge-primary">{team.region}</span>
                  <span className="font-heading font-bold text-white/80">
                    <span className="text-[#00FFDF]">{team.wins}W</span> - <span className="text-red-400">{team.losses}L</span>
                  </span>
                </div>

                <button
                  onClick={() => navigate('/team', { selected: team.teamName })}
                  className="btn-outline-primary w-full py-2.5 text-sm"
                >
                  <span>View Roster</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/team')}
            className="btn-primary py-3 px-8 text-base shadow-[0_0_20px_rgba(0,255,223,0.3)]"
          >
            <span>Explore All Athletes</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* UPCOMING BATTLES / TOURNAMENTS SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-[#080A0E] to-black border-y border-white/10 relative">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#7F27FF] mb-3">
              <Trophy size={14} />
              <span>Championship Arena</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              UPCOMING BATTLES
            </h2>
            <p className="text-white/60 font-paragraph text-base sm:text-lg">
              Don't miss our community tournaments, cash cups, and championship bracket showdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
            {featuredTournaments.map((t) => (
              <div 
                key={t._id}
                className="glass-card-secondary p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#00FFDF] transition-colors">
                      {t.tournamentName}
                    </h3>
                    <span className="badge-secondary shrink-0">{t.gamePlayed}</span>
                  </div>

                  <p className="text-sm font-paragraph text-white/70 mb-6 leading-relaxed">
                    {t.description}
                  </p>

                  <div className="space-y-3 mb-8 p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 flex items-center gap-2">
                        <Calendar size={15} className="text-[#00FFDF]" />
                        Tournament Date:
                      </span>
                      <span className="font-semibold text-white">
                        {new Date(t.tournamentStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/50 flex items-center gap-2">
                        <Trophy size={15} className="text-[#7F27FF]" />
                        Prize Pool:
                      </span>
                      <span className="font-heading font-extrabold text-[#00FFDF] text-base">
                        {t.prizePool}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/50">Registration Deadline:</span>
                      <span className="text-white/80 font-medium">
                        {new Date(t.signupEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setRegistrationModalTournament(t)}
                    className="btn-primary flex-1 py-3 text-sm"
                  >
                    <span>Register Squad</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => navigate('/tournaments')}
                    className="btn-outline-secondary py-3 px-5 text-sm"
                  >
                    <span>Bracket & Rules</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/tournaments')}
              className="btn-secondary py-3 px-8 text-base shadow-[0_0_20px_rgba(127,39,255,0.3)]"
            >
              <span>View All Tournaments</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* PODCAST SPOTLIGHT SECTION */}
      {featuredPodcast && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[120rem] mx-auto">
          <div className="max-w-5xl mx-auto glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Thumbnail with play overlay */}
              <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square border border-white/10 group">
                <img 
                  src={featuredPodcast.thumbnail} 
                  alt={featuredPodcast.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button 
                    onClick={() => setActiveAudioPodcast(featuredPodcast)}
                    className="w-16 h-16 rounded-full bg-[#00FFDF] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,255,223,0.8)] hover:scale-110 transition-transform"
                    title="Play Episode"
                  >
                    <Play size={26} className="ml-1 fill-black" />
                  </button>
                </div>
              </div>

              {/* Episode Info */}
              <div>
                <span className="badge-secondary mb-4">
                  Episode {featuredPodcast.episodeNumber} • {featuredPodcast.duration}
                </span>

                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 leading-tight">
                  {featuredPodcast.title}
                </h3>

                <p className="text-white/70 font-paragraph text-sm sm:text-base leading-relaxed mb-8">
                  {featuredPodcast.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveAudioPodcast(featuredPodcast)}
                    className="btn-primary py-3 px-6 text-sm"
                  >
                    <Play size={16} className="fill-black" />
                    <span>Listen Now</span>
                  </button>
                  <button
                    onClick={() => navigate('/media')}
                    className="btn-outline-white py-3 px-6 text-sm"
                  >
                    <span>All Episodes</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* STAY IN THE LOOP BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00FFDF]/10 via-[#7F27FF]/15 to-[#00FFDF]/10 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-paragraph max-w-xl mx-auto mb-8">
            Get the latest updates on roster announcements, tournament brackets, podcast drops, and exclusive merchandise releases.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary py-3 px-8 text-sm"
            >
              <span>Subscribe to Newsletter</span>
            </button>
            <button
              onClick={() => navigate('/media')}
              className="btn-outline-white py-3 px-8 text-sm"
            >
              <span>Follow Our Media</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
