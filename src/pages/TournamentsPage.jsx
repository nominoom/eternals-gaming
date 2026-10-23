import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Sparkles,
  GitBranch,
  Award
} from 'lucide-react';

export default function TournamentsPage() {
  const { tournaments, bracketMatches, setRegistrationModalTournament } = useApp();
  const [selectedGame, setSelectedGame] = useState('all');
  const [viewingBracket, setViewingBracket] = useState(false);

  const games = [
    {
      id: 'marvel-rivals',
      name: 'Marvel Rivals',
      logo: 'https://static.wixstatic.com/media/66d70e_4aa6bce5818e432aba3309a63fd8a2d9~mv2.webp',
      description: 'Join the ultimate Marvel Rivals tournament with elite teams competing for glory and prizes.',
      color: 'primary'
    },
    {
      id: 'rocket-league',
      name: 'Rocket League',
      logo: 'https://static.wixstatic.com/media/66d70e_47ac5676d0e54ef48b2ddc862ad7433e~mv2.webp',
      description: 'The ultimate Rocket League tournament featuring teams in an intense competition for supremacy.',
      color: 'secondary'
    },
    {
      id: 'the-finals',
      name: 'The Finals',
      logo: 'https://static.wixstatic.com/media/66d70e_2927ea49ff0b4712b76ddd593b1d4cc9~mv2.webp',
      description: 'Compete in The Finals with teams battling for the championship title and prize pool.',
      color: 'primary'
    }
  ];

  const filteredTournaments = selectedGame === 'all'
    ? tournaments
    : tournaments.filter(t => t.gameId === selectedGame);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#7F27FF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#00FFDF] mb-3">
            <Trophy size={14} />
            <span>Official Championships</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-4">
            Tournaments
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-2xl mx-auto mb-10">
            Compete in sanctioned Eternals cups, prove your skills on stream, and battle for verified cash prize pools.
          </p>

          {/* Game filter cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {games.map((g) => (
              <div
                key={g.id}
                onClick={() => setSelectedGame(selectedGame === g.id ? 'all' : g.id)}
                className={`glass-card p-5 cursor-pointer flex items-center gap-4 text-left transition-all ${
                  selectedGame === g.id 
                    ? 'border-[#00FFDF] bg-[#00FFDF]/10 shadow-[0_0_20px_rgba(0,255,223,0.3)]' 
                    : 'hover:border-white/30'
                }`}
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/60 shrink-0 border border-white/10 p-1">
                  <img src={g.logo} alt={g.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-heading font-bold text-white">{g.name}</h3>
                  <span className="text-xs text-[#00FFDF] font-medium">
                    {selectedGame === g.id ? 'Filter Active' : 'View Cups'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => setSelectedGame('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors ${
                selectedGame === 'all'
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              All Titles ({tournaments.length})
            </button>
            <button
              onClick={() => setViewingBracket(!viewingBracket)}
              className="btn-outline-primary py-1.5 px-4 text-xs flex items-center gap-2"
            >
              <GitBranch size={14} />
              <span>{viewingBracket ? 'Hide Live Bracket' : 'View Championship Bracket'}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* INTERACTIVE LIVE BRACKET VIEWER */}
        {viewingBracket && (
          <div className="glass-card p-8 md:p-10 border-[#7F27FF]/40 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <span className="badge-secondary mb-2">Live Tournament Bracket</span>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                  Marvel Rivals Winter Showdown — Knockout Stage
                </h2>
              </div>
              <span className="badge-live">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                Official Seeding
              </span>
            </div>

            {/* Bracket columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Quarterfinals */}
              <div className="space-y-4">
                <h4 className="text-xs font-heading font-bold text-[#00FFDF] uppercase tracking-wider border-b border-white/10 pb-2">
                  Quarterfinals (BO3)
                </h4>
                {bracketMatches.slice(0, 2).map((m) => (
                  <div key={m._id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">{m.round}</span>
                      <span className="text-green-400">{m.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1 font-heading">
                      <span className={m.winnerTeamName === m.team1Name ? 'text-[#00FFDF] font-bold' : 'text-white/70'}>
                        {m.team1Name}
                      </span>
                      <span className="font-mono font-bold text-white">{m.team1Score}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1 font-heading border-t border-white/5">
                      <span className={m.winnerTeamName === m.team2Name ? 'text-[#00FFDF] font-bold' : 'text-white/70'}>
                        {m.team2Name}
                      </span>
                      <span className="font-mono font-bold text-white">{m.team2Score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Semifinals */}
              <div className="space-y-4">
                <h4 className="text-xs font-heading font-bold text-[#7F27FF] uppercase tracking-wider border-b border-white/10 pb-2">
                  Semifinals (BO5)
                </h4>
                {bracketMatches.slice(2, 3).map((m) => (
                  <div key={m._id} className="p-4 rounded-xl bg-[#7F27FF]/10 border border-[#7F27FF]/30 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/40">{m.round}</span>
                      <span className="text-green-400">{m.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1 font-heading">
                      <span className={m.winnerTeamName === m.team1Name ? 'text-[#00FFDF] font-bold' : 'text-white/70'}>
                        {m.team1Name}
                      </span>
                      <span className="font-mono font-bold text-white">{m.team1Score}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1 font-heading border-t border-white/5">
                      <span className={m.winnerTeamName === m.team2Name ? 'text-[#00FFDF] font-bold' : 'text-white/70'}>
                        {m.team2Name}
                      </span>
                      <span className="font-mono font-bold text-white">{m.team2Score}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Finals */}
              <div className="space-y-4">
                <h4 className="text-xs font-heading font-bold text-amber-400 uppercase tracking-wider border-b border-white/10 pb-2">
                  Grand Finals (BO7)
                </h4>
                {bracketMatches.slice(3, 4).map((m) => (
                  <div key={m._id} className="p-4 rounded-xl bg-gradient-to-br from-[#00FFDF]/15 to-[#7F27FF]/15 border border-[#00FFDF]/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <Award size={13} /> Trophy Match
                      </span>
                      <span className="text-white/60">{m.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1 font-heading">
                      <span className="text-white font-bold">{m.team1Name}</span>
                      <span className="font-mono text-white/50">-</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1 font-heading border-t border-white/5">
                      <span className="text-white/80">{m.team2Name}</span>
                      <span className="font-mono text-white/50">-</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TOURNAMENT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTournaments.map((t) => (
            <div 
              key={t._id}
              className="glass-card p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#00FFDF] transition-colors">
                    {t.tournamentName}
                  </h3>
                  <span className="badge-primary shrink-0">{t.gamePlayed}</span>
                </div>

                <p className="text-sm font-paragraph text-white/70 mb-6 leading-relaxed">
                  {t.description}
                </p>

                <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-8 text-xs font-paragraph">
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Prize Pool</span>
                    <span className="text-sm font-heading font-black text-[#00FFDF]">{t.prizePool}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Start Date</span>
                    <span className="text-white font-semibold">
                      {new Date(t.tournamentStartDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Format</span>
                    <span className="text-white/80">{t.format}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/50">Registered Squads</span>
                    <span className="text-white/80 font-mono">{t.registeredTeamsCount} / {t.maxTeams}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setRegistrationModalTournament(t)}
                  className="btn-primary flex-1 py-3 text-xs"
                >
                  <Trophy size={14} />
                  <span>Register Team</span>
                </button>
                <button
                  onClick={() => setViewingBracket(true)}
                  className="btn-outline-white py-3 px-4 text-xs"
                  title="View tournament bracket"
                >
                  <GitBranch size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
