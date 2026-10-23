import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Users, 
  Target, 
  TrendingUp, 
  Shield, 
  ExternalLink, 
  Radio, 
  Play, 
  Flame,
  UserPlus,
  ArrowRight,
  Filter,
  CheckCircle,
  X
} from 'lucide-react';
import { 
  TwitterIcon as Twitter, 
  YoutubeIcon as Youtube, 
  InstagramIcon as Instagram, 
  TwitchIcon as Tv 
} from '../components/BrandIcons';

export default function TeamPage() {
  const { 
    queryParams, 
    stats, 
    teams, 
    players, 
    creators, 
    featuredCreator, 
    staff, 
    matchHistory,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState('esports'); // 'esports' | 'creators'
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    if (queryParams.selected) {
      setSelectedTeam(decodeURIComponent(queryParams.selected));
    }
  }, [queryParams]);

  // Filter players
  const filteredPlayers = selectedTeam 
    ? players.filter(p => p.teamName === selectedTeam) 
    : players;

  // Filter matches
  const filteredMatches = selectedTeam
    ? matchHistory.filter(m => m.teamOneName.includes(selectedTeam) || m.teamTwoName.includes(selectedTeam))
    : matchHistory;

  // Calculate creator network follower sum
  const totalCreatorFollowers = creators.reduce((acc, c) => {
    return acc + (c.twitchFollowers || 0) + (c.youtubeSubscribers || 0) + (c.kickFollowers || 0) + (c.xFollowers || 0);
  }, (featuredCreator.twitchFollowers || 0) + (featuredCreator.youtubeSubscribers || 0));

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-4">
            Our Team
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-2xl mx-auto">
            Meet our professional esports teams, players, and talented content creators who represent EternalsGGs across the gaming world.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md mt-10 shadow-xl">
            <button
              onClick={() => setActiveTab('esports')}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 ${
                activeTab === 'esports'
                  ? 'bg-[#00FFDF] text-black shadow-[0_0_20px_rgba(0,255,223,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Trophy size={16} />
              <span>Esports</span>
            </button>
            <button
              onClick={() => setActiveTab('creators')}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 ${
                activeTab === 'creators'
                  ? 'bg-[#7F27FF] text-white shadow-[0_0_20px_rgba(127,39,255,0.4)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Users size={16} />
              <span>Creators</span>
            </button>
          </div>
        </div>
      </section>

      {/* ESPORTS TAB */}
      {activeTab === 'esports' && (
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Players', value: stats.players, icon: Users, color: 'text-[#7F27FF]', border: 'border-[#7F27FF]/25' },
              { label: 'Total Teams', value: stats.professionalTeams, icon: Target, color: 'text-[#00FFDF]', border: 'border-[#00FFDF]/25' },
              { label: 'Total Followers', value: (stats.totalFollowers || 3680).toLocaleString(), icon: TrendingUp, color: 'text-[#7F27FF]', border: 'border-[#7F27FF]/25' },
              { label: 'Tournament Wins', value: stats.tournamentWins, icon: Trophy, color: 'text-[#00FFDF]', border: 'border-[#00FFDF]/25' }
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className={`glass-card p-6 relative overflow-hidden ${st.border}`}>
                  <div className="absolute top-4 right-4">
                    <span className="badge-live">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
                      Live
                    </span>
                  </div>
                  <Icon size={32} className={`${st.color} mb-4`} />
                  <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-1">
                    {st.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider font-heading text-white/50">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Our Teams */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
                Our Teams
              </h2>
              <p className="text-sm sm:text-base text-white/60 font-paragraph max-w-xl mx-auto">
                Click any team card to inspect their active roster and competitive match history.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teams.map((t) => {
                const isSelected = selectedTeam === t.teamName;
                return (
                  <div
                    key={t._id}
                    onClick={() => setSelectedTeam(isSelected ? null : t.teamName)}
                    className={`glass-card p-8 cursor-pointer relative transition-all duration-300 ${
                      isSelected 
                        ? 'border-[#00FFDF] bg-[#00FFDF]/10 shadow-[0_0_30px_rgba(0,255,223,0.25)]' 
                        : 'hover:border-[#00FFDF]/50'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-[#00FFDF]">
                        <CheckCircle size={20} />
                      </div>
                    )}
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 p-2 mx-auto mb-4 flex items-center justify-center">
                      <img src={t.teamLogo} alt={t.teamName} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white text-center mb-2">
                      {t.teamName}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 font-paragraph text-center mb-6">
                      {t.teamDescription}
                    </p>
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-black/40 border border-white/10 mb-4 text-xs font-heading">
                      <span className="badge-primary">{t.region}</span>
                      <span className="text-white/80 font-bold">
                        <span className="text-[#00FFDF]">{t.wins}W</span> - <span className="text-red-400">{t.losses}L</span>
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(t.socialMediaLink, '_blank');
                      }}
                      className="btn-outline-white w-full py-2 text-xs flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={13} />
                      <span>Follow Team</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Players / Filtered Players */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-white">
                  {selectedTeam ? `${selectedTeam} Athletes` : 'All Players'}
                </h2>
                <p className="text-xs sm:text-sm text-white/50 font-paragraph">
                  Showing {filteredPlayers.length} verified roster members
                </p>
              </div>

              {selectedTeam && (
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="btn-outline-primary text-xs py-1.5 px-4 flex items-center gap-1.5"
                >
                  <X size={14} />
                  <span>Show All Players</span>
                </button>
              )}
            </div>

            {filteredPlayers.length === 0 ? (
              <div className="glass-card p-12 text-center text-white/50">
                No players listed for {selectedTeam}.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPlayers.map((player) => (
                  <div key={player._id} className="glass-card p-6 flex flex-col justify-between group">
                    <div>
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-[#00FFDF]/40 p-1 bg-black">
                        <img 
                          src={player.profilePicture} 
                          alt={player.playerName} 
                          className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform" 
                        />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-white text-center">
                        {player.playerName}
                      </h3>
                      <div className="text-sm font-heading font-extrabold text-[#00FFDF] text-center mb-2">
                        "{player.playerTag}"
                      </div>
                      <div className="flex justify-center mb-3">
                        <span className="badge-secondary">{player.role}</span>
                      </div>
                      <p className="text-xs text-white/50 font-paragraph text-center mb-3">
                        {player.teamName}
                      </p>
                      {player.kdaRatio && (
                        <div className="text-center py-1.5 px-3 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 mb-4">
                          KDA Ratio: <span className="text-[#00FFDF] font-bold">{player.kdaRatio}</span>
                        </div>
                      )}
                    </div>

                    {/* Socials */}
                    <div className="flex justify-center items-center gap-2 pt-2 border-t border-white/10">
                      {player.twitchUrl && (
                        <a href={player.twitchUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-purple-500/10 hover:bg-purple-500/25 text-[#c499ff] transition-colors" title="Twitch">
                          <Tv size={14} />
                        </a>
                      )}
                      {player.youtubeUrl && (
                        <a href={player.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-red-500/10 hover:bg-red-500/25 text-red-400 transition-colors" title="YouTube">
                          <Youtube size={14} />
                        </a>
                      )}
                      {player.xUrl && (
                        <a href={player.xUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors" title="X (Twitter)">
                          <Twitter size={14} />
                        </a>
                      )}
                      {player.instagramUrl && (
                        <a href={player.instagramUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-pink-500/10 hover:bg-pink-500/25 text-pink-400 transition-colors" title="Instagram">
                          <Instagram size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Matches */}
          <div className="pt-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold text-white mb-2">
                Recent Matches
              </h2>
              <p className="text-sm text-white/60 font-paragraph">
                Live tournament outcomes, match recaps, and championship scorecards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <div key={match._id} className="glass-card p-6">
                  <span className="text-xs font-heading font-semibold text-white/50 block mb-3">
                    {match.matchTitle}
                  </span>

                  <div className="flex items-center justify-between py-4 border-y border-white/10 mb-4">
                    <div className="text-center flex-1">
                      <div className="text-sm font-heading font-bold text-white truncate">{match.teamOneName}</div>
                      <div className="text-2xl font-heading font-black text-[#00FFDF]">{match.teamOneScore}</div>
                    </div>
                    <span className="text-xs font-heading font-bold text-white/30 px-2">VS</span>
                    <div className="text-center flex-1">
                      <div className="text-sm font-heading font-bold text-white truncate">{match.teamTwoName}</div>
                      <div className="text-2xl font-heading font-black text-[#7F27FF]">{match.teamTwoScore}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="badge-primary">Winner: {match.winnerTeamName}</span>
                    <span className="text-white/40">
                      {new Date(match.matchDate).toLocaleDateString()}
                    </span>
                  </div>

                  {match.matchRecapUrl && (
                    <a
                      href={match.matchRecapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-white w-full py-2 text-xs mt-4 flex items-center justify-center gap-1.5"
                    >
                      <Play size={12} className="fill-white" />
                      <span>Watch Recap</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* CREATORS TAB */}
      {activeTab === 'creators' && (
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          
          {/* Creator Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center border-[#00FFDF]/25">
              <Users size={32} className="text-[#00FFDF] mx-auto mb-3" />
              <div className="text-4xl font-heading font-extrabold text-white mb-1">
                {creators.length + 1}
              </div>
              <div className="text-xs uppercase tracking-wider font-heading text-white/50">
                Total Creators
              </div>
            </div>

            <div className="glass-card p-6 text-center border-[#7F27FF]/25">
              <Shield size={32} className="text-[#7F27FF] mx-auto mb-3" />
              <div className="text-4xl font-heading font-extrabold text-white mb-1">
                {staff.length}
              </div>
              <div className="text-xs uppercase tracking-wider font-heading text-white/50">
                Total Staff
              </div>
            </div>

            <div className="glass-card p-6 text-center border-[#00FFDF]/25">
              <TrendingUp size={32} className="text-[#00FFDF] mx-auto mb-3" />
              <div className="text-4xl font-heading font-extrabold text-white mb-1">
                {totalCreatorFollowers.toLocaleString()}+
              </div>
              <div className="text-xs uppercase tracking-wider font-heading text-white/50">
                Total Following Count
              </div>
            </div>
          </div>

          {/* Featured Creator Showcase */}
          {featuredCreator && (
            <div>
              <div className="text-center mb-8">
                <span className="badge-primary mb-2">Spotlight</span>
                <h2 className="text-3xl font-heading font-bold text-white">
                  Featured Creator
                </h2>
              </div>

              <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="rounded-2xl overflow-hidden aspect-square border-2 border-[#00FFDF]/30">
                    <img 
                      src={featuredCreator.profilePicture} 
                      alt={featuredCreator.creatorName} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-heading font-extrabold text-white mb-3">
                      {featuredCreator.creatorName}
                    </h3>
                    <p className="text-white/70 font-paragraph text-sm sm:text-base leading-relaxed mb-6">
                      {featuredCreator.bio}
                    </p>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                      <div className="text-xs text-white/50 font-heading uppercase mb-3">Follower Stats</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <Tv size={14} className="text-[#c499ff]" />
                          <span>Twitch: <strong className="text-white">{featuredCreator.twitchFollowers.toLocaleString()}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Youtube size={14} className="text-red-400" />
                          <span>YouTube: <strong className="text-white">{featuredCreator.youtubeSubscribers.toLocaleString()}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Instagram size={14} className="text-pink-400" />
                          <span>Instagram: <strong className="text-white">{featuredCreator.instagramFollowers.toLocaleString()}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Twitter size={14} className="text-white" />
                          <span>X: <strong className="text-white">{featuredCreator.xFollowers.toLocaleString()}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a href={featuredCreator.twitchUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-secondary py-2 px-4 text-xs">
                        <Tv size={14} /> Twitch
                      </a>
                      <a href={featuredCreator.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-primary py-2 px-4 text-xs">
                        <Youtube size={14} /> YouTube
                      </a>
                      <a href={featuredCreator.x} target="_blank" rel="noopener noreferrer" className="btn-outline-white py-2 px-4 text-xs">
                        <Twitter size={14} /> X
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Our Staff */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold text-white mb-2">
                Our Staff
              </h2>
              <p className="text-sm text-white/60 font-paragraph">
                The strategic minds driving operations, player development, and organizational growth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {staff.map((member) => (
                <div key={member._id} className="glass-card-secondary p-6 text-center group">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border border-[#7F27FF]/40">
                    <img 
                      src={member.profileImage} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-paragraph text-[#00FFDF] mb-4">
                    {member.role}
                  </p>
                  <div className="flex justify-center gap-2">
                    {member.xUrl && (
                      <a href={member.xUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:bg-white/15 text-white transition-colors" title="X">
                        <Twitter size={14} />
                      </a>
                    )}
                    {member.youtubeUrl && (
                      <a href={member.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:bg-white/15 text-white transition-colors" title="YouTube">
                        <Youtube size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creator Network */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-heading font-bold text-white mb-2">
                Our Creator Network
              </h2>
              <p className="text-sm text-white/60 font-paragraph">
                Talented entertainers bringing daily live gameplay, tournament coverage, and humor.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creators.map((c) => (
                <div key={c._id} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/10">
                      <img src={c.profilePicture} alt={c.creatorName} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white text-center mb-2">
                      {c.creatorName}
                    </h3>
                    <p className="text-xs text-white/60 font-paragraph text-center mb-4 line-clamp-3">
                      {c.bio}
                    </p>
                  </div>
                  <div className="flex justify-center gap-2 pt-4 border-t border-white/10">
                    {c.twitchUrl && (
                      <a href={c.twitchUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-purple-500/10 hover:bg-purple-500/25 text-[#c499ff]" title="Twitch">
                        <Tv size={14} />
                      </a>
                    )}
                    {c.youtubeUrl && (
                      <a href={c.youtubeUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-red-500/10 hover:bg-red-500/25 text-red-400" title="YouTube">
                        <Youtube size={14} />
                      </a>
                    )}
                    {c.x && (
                      <a href={c.x} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/10 hover:bg-white/20 text-white" title="X">
                        <Twitter size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Become a Creator CTA */}
          <div className="glass-card p-12 text-center bg-gradient-to-r from-[#00FFDF]/10 via-[#7F27FF]/20 to-[#00FFDF]/10">
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mb-4">
              Become an Eternals Creator
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-paragraph max-w-xl mx-auto mb-8">
              Are you a rising content creator or streamer ready to join a tier-1 esports organization? Submit your portfolio for consideration.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/contact', { inquiry: 'creator' })}
                className="btn-primary py-3 px-8 text-sm"
              >
                <UserPlus size={16} />
                <span>Apply Now</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
