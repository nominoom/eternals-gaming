import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  X, 
  ExternalLink,
  Cpu,
  Trophy,
  Flame,
  Radio,
  ArrowRight
} from 'lucide-react';
import { 
  TwitterIcon as Twitter, 
  YoutubeIcon as Youtube, 
  InstagramIcon as Instagram, 
  TwitchIcon as Tv 
} from '../components/BrandIcons';

export default function TeamPage() {
  const { players, matchHistory } = useApp();

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [activeDossierSlug, setActiveDossierSlug] = useState(null);

  // Spotlight athletes for the 7-card fan deck
  const spotlightAthletes = players.slice(0, 7);

  // Active athlete for modal
  const selectedAthlete = players.find(p => p.slug === activeDossierSlug) || players[0];

  // Unique categories for filter pills
  const filterCategories = [
    { key: 'all', label: 'All Athletes' },
    { key: 'Apex Legends', label: 'Apex Legends [ALGS]' },
    { key: 'Warzone', label: 'Warzone [WSOW]' },
    { key: 'Marvel Rivals', label: 'Marvel Rivals' },
    { key: 'Fortnite & Apex', label: 'Fortnite Pro' },
    { key: 'Content Creators', label: 'Creators & Media' },
    { key: 'Leadership', label: 'Leadership & Rulers' },
  ];

  // Filtered list for directory
  const filteredAthletes = players.filter(athlete => {
    const matchesFilter = activeFilter === 'all' || athlete.division === activeFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      athlete.playerName.toLowerCase().includes(query) ||
      athlete.playerTag.toLowerCase().includes(query) ||
      athlete.role.toLowerCase().includes(query) ||
      athlete.division.toLowerCase().includes(query) ||
      athlete.region.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20 relative overflow-x-hidden">
      
      {/* Ambient Grid and Lighting Overlay matching 7ven Club */}
      <div className="tech-grid-overlay" aria-hidden="true"></div>
      <div className="ambient-glow-top" aria-hidden="true"></div>

      <main className="relative z-10">
        
        {/* --------------------------------------------------------------------------
             1. FAN-OUT EXPANDING DECK SHOWCASE (7VEN CLUB / LANDO NORRIS STYLE)
             -------------------------------------------------------------------------- */}
        <section className="fan-deck-section">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="fan-deck-header">
              <span className="text-eyebrow">// 01 • CHAMPIONSHIP ROSTER SPOTLIGHT</span>
              <h1 className="text-impact text-5xl sm:text-7xl lg:text-8xl mt-2">
                THE <span className="highlight-cyan">ETERNALS TEAM</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 font-paragraph max-w-2xl mx-auto mt-4">
                Hover to expand among the deck. Click any athlete card to open their complete operational dossier, tournament earnings, and verified social channels.
              </p>
              <div className="inline-flex items-center gap-2 mt-4 text-xs font-mono text-[#00FFDF] border border-[#00FFDF]/30 bg-[#00FFDF]/10 px-4 py-1.5 rounded-full lg:hidden">
                <span>SWIPE ROSTER ➔ TAP CARD FOR DOSSIER</span>
              </div>
            </div>

            {/* Overlapping Fan-Out Card Deck */}
            <div className="fan-deck-wrapper" id="fanDeckWrapper">
              {spotlightAthletes.map((athlete, idx) => (
                <div 
                  key={athlete.slug || athlete._id}
                  className={`fan-card ${hoveredCardIndex === idx ? 'is-hovered' : ''}`}
                  data-index={idx}
                  onMouseEnter={() => setHoveredCardIndex(idx)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  onClick={() => setActiveDossierSlug(athlete.slug)}
                >
                  <div className="fan-card-img-wrap">
                    <img 
                      src={athlete.profilePicture} 
                      alt={athlete.playerName} 
                      className="fan-card-img" 
                      loading="lazy" 
                      decoding="async" 
                    />
                    <div className="fan-card-vignette"></div>
                  </div>
                  
                  <span className="fan-card-badge badge-primary">
                    {athlete.division}
                  </span>

                  <div className="fan-card-content">
                    <span className="fan-card-role">{athlete.region}</span>
                    <h2 className="fan-card-name">{athlete.playerTag}</h2>
                    <div className="fan-card-earnings">{athlete.earnings || '$75,000 EARNED'}</div>
                    <span className="fan-card-hint">CLICK TO EXPAND DOSSIER →</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --------------------------------------------------------------------------
             2. FULL ATHLETE DIRECTORY & FILTER ENGINE (7VEN DIRECTORY STYLE)
             -------------------------------------------------------------------------- */}
        <section className="roster-directory-section" id="directory">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center md:text-left mb-10">
              <span className="text-eyebrow">// 02 • SOVEREIGN ROSTER ARCHIVE</span>
              <h2 className="text-impact text-4xl sm:text-6xl lg:text-7xl mt-2">
                FULL <span className="highlight-cyan">DIRECTORY.</span>
              </h2>
            </div>

            {/* Controls: Filter Pills + Realtime Search Bar */}
            <div className="directory-controls">
              
              <div className="roster-filter-bar">
                {filterCategories.map(cat => {
                  const count = cat.key === 'all' 
                    ? players.length 
                    : players.filter(p => p.division === cat.key).length;

                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveFilter(cat.key)}
                      className={`roster-filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
                    >
                      {cat.label} [{count}]
                    </button>
                  );
                })}
              </div>

              <div className="search-box-wrap">
                <Search size={18} className="search-icon-svg" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search callsign, role, or game..."
                  className="search-input"
                />
              </div>

            </div>

            {/* Full Athletes Grid */}
            <div className="athletes-full-grid">
              {filteredAthletes.length === 0 ? (
                <div className="col-span-full text-center py-16 text-white/50 font-mono">
                  NO ATHLETES FOUND MATCHING TRANSMISSION CRITERIA.
                </div>
              ) : (
                filteredAthletes.map(athlete => (
                  <article 
                    key={athlete._id}
                    className="athlete-card"
                    onClick={() => setActiveDossierSlug(athlete.slug)}
                  >
                    <div className="athlete-card-media">
                      <span className="badge-primary absolute top-4 left-4 z-10 text-[10px]">
                        {athlete.division}
                      </span>
                      <span className="absolute top-4 right-4 z-10 font-mono text-[11px] px-2.5 py-1 rounded-full bg-black/75 border border-white/20 text-white">
                        {athlete.region}
                      </span>
                      <img 
                        src={athlete.profilePicture} 
                        alt={athlete.playerName} 
                        className="athlete-card-img" 
                        loading="lazy" 
                        decoding="async" 
                      />
                    </div>

                    <div className="athlete-card-body">
                      <div>
                        <h3 className="athlete-card-title">{athlete.playerName}</h3>
                        <div className="athlete-card-meta">{athlete.role}</div>
                      </div>

                      {athlete.earnings && (
                        <div className="athlete-card-earnings">
                          <span className="text-white/50">PURSE</span>
                          <span className="athlete-card-earnings-val">{athlete.earnings}</span>
                        </div>
                      )}

                      <button 
                        className="btn-outline-primary w-full py-2.5 text-xs font-heading font-bold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDossierSlug(athlete.slug);
                        }}
                      >
                        <span>DOSSIER & SOCIALS →</span>
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

          </div>
        </section>

        {/* --------------------------------------------------------------------------
             3. RECENT COMPETITIVE MATCH RESULTS
             -------------------------------------------------------------------------- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 max-w-[120rem] mx-auto">
          <div className="text-center mb-12">
            <span className="text-eyebrow">// 03 • TOURNAMENT TELEMETRY</span>
            <h2 className="text-impact text-4xl sm:text-6xl mt-2">
              RECENT <span className="highlight-purple">MATCHES.</span>
            </h2>
            <p className="text-sm text-white/60 font-paragraph mt-2">
              Live tournament outcomes, match recaps, and championship scorecards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchHistory.map(m => (
              <div key={m._id} className="glass-card p-6 border-white/10 hover:border-[#00FFDF]/40">
                <div className="flex items-center justify-between text-xs text-white/50 font-mono mb-4 pb-2 border-b border-white/10">
                  <span>{m.tournamentName}</span>
                  <span>{m.matchDate}</span>
                </div>

                <div className="flex items-center justify-between my-4">
                  <div className="text-center flex-1">
                    <div className="text-xs text-white/60 truncate">{m.teamOneName}</div>
                    <div className="text-3xl font-heading font-black text-[#00FFDF] mt-1">{m.teamOneScore}</div>
                  </div>
                  <div className="text-xs font-mono font-bold text-white/30 px-3">VS</div>
                  <div className="text-center flex-1">
                    <div className="text-xs text-white/60 truncate">{m.teamTwoName}</div>
                    <div className="text-3xl font-heading font-black text-white/80 mt-1">{m.teamTwoScore}</div>
                  </div>
                </div>

                <div className="text-center pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="badge-live text-[10px]">WINNER: {m.winnerTeamName}</span>
                  <a 
                    href={m.vodLink || "https://twitch.tv"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00FFDF] hover:underline"
                  >
                    <span>Watch VOD</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* --------------------------------------------------------------------------
           4. ATHLETE POPUP DOSSIER MODAL (EXACT 7VEN CLUB SPECIFICATION)
           -------------------------------------------------------------------------- */}
      {activeDossierSlug && (
        <div 
          className="athlete-modal-overlay" 
          onClick={() => setActiveDossierSlug(null)}
          role="dialog" 
          aria-label="Athlete Profile Dossier"
        >
          <div 
            className="athlete-modal-card" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="athlete-modal-close" 
              onClick={() => setActiveDossierSlug(null)}
              aria-label="Close Dossier"
            >
              <X size={20} />
            </button>
            
            <div className="athlete-modal-media">
              <img 
                src={selectedAthlete.profilePicture} 
                alt={selectedAthlete.playerName} 
                className="athlete-modal-img" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090B10] via-transparent to-transparent opacity-80 md:hidden"></div>
            </div>

            <div className="athlete-modal-info">
              
              <div className="athlete-modal-header">
                <span className="badge-primary self-start">
                  VERIFIED ROSTER • {selectedAthlete.division}
                </span>
                <h2 className="athlete-modal-name mt-2">
                  {selectedAthlete.playerName} <span className="highlight-cyan">"{selectedAthlete.playerTag}"</span>
                </h2>
                <div className="athlete-modal-role">
                  {selectedAthlete.region} // {selectedAthlete.role}
                </div>
              </div>

              <div className="athlete-modal-earnings-box">
                <div>
                  <span className="font-mono text-xs text-white/50 block">CAREER PURSE & RATIO</span>
                  <span className="font-display font-extrabold text-2xl text-[#00FFDF]">
                    {selectedAthlete.earnings || '$120,000+'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-white/50 block">KDA TELEMETRY</span>
                  <span className="font-mono font-bold text-xl text-white">
                    {selectedAthlete.kdaRatio || '4.10'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-eyebrow text-[11px] mb-1.5 block">// OPERATIONAL DOSSIER</span>
                <p className="athlete-modal-bio">
                  {selectedAthlete.bio || "Pinnacle clutch specialist and championship competitor representing EternalsGGs in top-tier international esports circuits."}
                </p>
              </div>

              {selectedAthlete.hardware && (
                <div>
                  <span className="text-eyebrow text-[11px] mb-1.5 block flex items-center gap-1.5">
                    <Cpu size={13} />
                    <span>// HARDWARE RIG TELEMETRY</span>
                  </span>
                  <div className="font-mono text-xs text-white/70 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    {selectedAthlete.hardware}
                  </div>
                </div>
              )}

              <div>
                <span className="text-eyebrow text-[11px] mb-2 block">// VERIFIED CHANNELS</span>
                <div className="athlete-modal-socials">
                  {selectedAthlete.twitchUrl && (
                    <a href={selectedAthlete.twitchUrl} target="_blank" rel="noopener noreferrer" className="athlete-social-btn">
                      <Tv size={14} className="text-[#9146FF]" />
                      <span>Twitch</span>
                    </a>
                  )}
                  {selectedAthlete.youtubeUrl && (
                    <a href={selectedAthlete.youtubeUrl} target="_blank" rel="noopener noreferrer" className="athlete-social-btn">
                      <Youtube size={14} className="text-[#FF0000]" />
                      <span>YouTube</span>
                    </a>
                  )}
                  {selectedAthlete.xUrl && (
                    <a href={selectedAthlete.xUrl} target="_blank" rel="noopener noreferrer" className="athlete-social-btn">
                      <Twitter size={14} className="text-[#00FFDF]" />
                      <span>Twitter / X</span>
                    </a>
                  )}
                  {selectedAthlete.instagramUrl && (
                    <a href={selectedAthlete.instagramUrl} target="_blank" rel="noopener noreferrer" className="athlete-social-btn">
                      <Instagram size={14} className="text-[#E1306C]" />
                      <span>Instagram</span>
                    </a>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
