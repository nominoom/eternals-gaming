import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Calendar, Play, Search, Filter, Shield } from 'lucide-react';

export default function MatchResultsPage() {
  const { matchHistory, bracketMatches, navigate } = useApp();
  const [selectedTournament, setSelectedTournament] = useState('all');

  const allMatches = [
    ...matchHistory,
    ...bracketMatches.map(b => ({
      _id: b._id,
      matchTitle: `${b.tournamentName} — ${b.round}`,
      teamOneName: b.team1Name,
      teamTwoName: b.team2Name,
      teamOneScore: b.team1Score,
      teamTwoScore: b.team2Score,
      winnerTeamName: b.winnerTeamName,
      matchDate: b.matchDate,
      matchRecapUrl: 'https://youtube.com'
    }))
  ];

  const tournaments = Array.from(new Set(allMatches.map(m => m.matchTitle.split(' — ')[0])));

  const filtered = selectedTournament === 'all'
    ? allMatches
    : allMatches.filter(m => m.matchTitle.includes(selectedTournament));

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="badge-primary mb-3">Verified Esports Dossier</span>
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-4">
            Match Results
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-2xl mx-auto mb-8">
            Comprehensive match archives, competitive scorecards, and tournament outcomes across all Eternals divisions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedTournament('all')}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                selectedTournament === 'all'
                  ? 'bg-[#00FFDF] text-black shadow-[0_0_15px_rgba(0,255,223,0.3)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              All Tournaments
            </button>
            {tournaments.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTournament(t)}
                className={`px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedTournament === t
                    ? 'bg-[#7F27FF] text-white shadow-[0_0_15px_rgba(127,39,255,0.4)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Matches Grid */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filtered.map((match) => (
            <div key={match._id} className="glass-card p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between text-xs text-white/50 mb-3 font-paragraph">
                  <span className="font-heading font-semibold text-white/80 truncate max-w-[200px]">{match.matchTitle}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    <Calendar size={12} />
                    {new Date(match.matchDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-white/10 my-4">
                  <div className="text-center flex-1">
                    <div className="text-sm font-heading font-bold text-white truncate">{match.teamOneName}</div>
                    <div className={`text-3xl font-heading font-black ${match.winnerTeamName === match.teamOneName ? 'text-[#00FFDF]' : 'text-white/40'}`}>
                      {match.teamOneScore}
                    </div>
                  </div>
                  <span className="text-xs font-heading font-bold text-white/30 px-3">VS</span>
                  <div className="text-center flex-1">
                    <div className="text-sm font-heading font-bold text-white truncate">{match.teamTwoName}</div>
                    <div className={`text-3xl font-heading font-black ${match.winnerTeamName === match.teamTwoName ? 'text-[#7F27FF]' : 'text-white/40'}`}>
                      {match.teamTwoScore}
                    </div>
                  </div>
                </div>

                {match.winnerTeamName && (
                  <div className="flex justify-center mb-4">
                    <span className="badge-primary">
                      Winner: {match.winnerTeamName}
                    </span>
                  </div>
                )}
              </div>

              {match.matchRecapUrl && (
                <a
                  href={match.matchRecapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-white w-full py-2 text-xs flex items-center justify-center gap-2"
                >
                  <Play size={13} className="fill-white" />
                  <span>Watch VOD Recap</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
