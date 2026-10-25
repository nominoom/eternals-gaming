import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useClerkAuth } from '../services/clerkAuth';
import { INITIAL_REGISTERED_SQUADS } from '../services/hostingerDb';
import { 
  Trophy, 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Upload, 
  ExternalLink, 
  DollarSign, 
  Shield, 
  Plus, 
  Check, 
  ArrowRight,
  FileCheck,
  Gamepad2,
  AlertCircle
} from 'lucide-react';

export default function TournamentsDashboardPage() {
  const { tournaments, showToast } = useApp();
  const { user } = useClerkAuth();

  const [activeTab, setActiveTab] = useState('open'); // 'open' | 'my-tournaments' | 'register'

  const [registeredSquads, setRegisteredSquads] = useState(() => {
    try {
      const saved = localStorage.getItem('eternals_registered_squads');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_SQUADS;
    } catch {
      return INITIAL_REGISTERED_SQUADS;
    }
  });

  // Selected tournament to register for
  const [selectedTournament, setSelectedTournament] = useState(tournaments[0] || null);

  // New squad registration form
  const [regForm, setRegForm] = useState({
    teamName: '',
    captainName: user?.name || '',
    captainEmail: user?.email || '',
    captainDiscord: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    subPlayer: ''
  });

  // Score reporting state
  const [reportingSquadId, setReportingSquadId] = useState(null);
  const [teamScore, setTeamScore] = useState(3);
  const [opponentScore, setOpponentScore] = useState(1);
  const [proofUrl, setProofUrl] = useState('');

  const handleRegisterSquad = (e) => {
    e.preventDefault();
    if (!regForm.teamName || !regForm.captainName) {
      showToast("Please provide team name and captain name.", 'error');
      return;
    }

    const rosterList = [
      `${regForm.captainName} (Captain)`,
      regForm.player1,
      regForm.player2,
      regForm.player3,
      regForm.player4,
      regForm.subPlayer ? `Sub: ${regForm.subPlayer}` : null
    ].filter(Boolean);

    const newSquad = {
      id: `squad-${Date.now()}`,
      tournamentId: selectedTournament?._id || 'tourn-1',
      tournamentName: selectedTournament?.tournamentName || 'Marvel Rivals Winter Showdown',
      teamName: regForm.teamName,
      captainName: regForm.captainName,
      captainEmail: regForm.captainEmail,
      captainDiscord: regForm.captainDiscord || 'Captain#0001',
      roster: rosterList,
      checkInStatus: 'Checked In',
      checkInTime: new Date().toISOString().replace('T', ' ').slice(0, 16),
      reportedScore: null,
      dispute: null
    };

    const updated = [newSquad, ...registeredSquads];
    setRegisteredSquads(updated);
    try {
      localStorage.setItem('eternals_registered_squads', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    showToast(`Team "${regForm.teamName}" successfully registered and checked in!`, 'success');
    setActiveTab('my-tournaments');
  };

  const handleSubmitScore = (squadId) => {
    if (!proofUrl) {
      showToast("Please provide a screenshot or VOD proof URL.", 'error');
      return;
    }

    const updated = registeredSquads.map(sq => {
      if (sq.id === squadId) {
        return {
          ...sq,
          reportedScore: {
            team: parseInt(teamScore),
            opponent: parseInt(opponentScore),
            proofUrl: proofUrl
          }
        };
      }
      return sq;
    });

    setRegisteredSquads(updated);
    try {
      localStorage.setItem('eternals_registered_squads', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setReportingSquadId(null);
    showToast("Match score and verification proof transmitted to Tournament Referees.", 'success');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black relative">
        <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00FFDF]/15 border border-[#00FFDF]/40 flex items-center justify-center text-[#00FFDF] shadow-[0_0_20px_rgba(0,255,223,0.3)]">
              <Trophy size={28} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00FFDF] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00FFDF] animate-pulse"></span>
                <span>Open Competitive Circuit // Player Portal</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
                Tournaments Player Dashboard
              </h1>
            </div>
          </div>

          {/* Navigation Tab Pills */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('open')}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'open'
                  ? 'bg-[#00FFDF] text-black shadow-[0_0_15px_rgba(0,255,223,0.3)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Browse Tournaments
            </button>
            <button
              onClick={() => setActiveTab('my-tournaments')}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'my-tournaments'
                  ? 'bg-[#00FFDF] text-black shadow-[0_0_15px_rgba(0,255,223,0.3)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              My Registered Squads ({registeredSquads.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Tab 1: Browse Open Tournaments */}
        {activeTab === 'open' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Sanctioned Championships Open for Entry
                </h2>
                <p className="text-sm text-white/60 font-paragraph mt-1">
                  Select a championship to register your squad, complete team roster check-in, and compete for verified prize pools.
                </p>
              </div>
              <span className="badge-primary text-xs">{tournaments.length} Active Events</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tournaments.map(t => (
                <div key={t._id} className="glass-card p-6 border-white/10 hover:border-[#00FFDF]/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge-primary text-[10px]">{t.gamePlayed}</span>
                      <span className="text-xs font-mono text-green-400 font-bold">OPEN ENTRY</span>
                    </div>

                    <h3 className="text-2xl font-heading font-black text-white mb-2 leading-tight">
                      {t.tournamentName}
                    </h3>
                    <p className="text-xs text-white/70 font-paragraph mb-6 line-clamp-2">
                      {t.description}
                    </p>

                    <div className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-mono mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-white/50">GUARANTEED PURSE:</span>
                        <strong className="text-green-400 font-display text-sm">{t.prizePool}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50">START DATE:</span>
                        <span className="text-white">{t.tournamentStartDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50">FORMAT:</span>
                        <span className="text-[#00FFDF]">{t.format}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/50">REGISTERED TEAMS:</span>
                        <span className="text-white">{t.registeredTeamsCount} / {t.maxTeams}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedTournament(t);
                      setActiveTab('register');
                    }}
                    className="btn-primary w-full py-3 text-xs font-heading font-bold"
                  >
                    <span>Register Squad Now</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Squad Registration Form */}
        {activeTab === 'register' && (
          <div className="max-w-3xl mx-auto glass-card p-8 md:p-10 border-[#00FFDF]/30">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div>
                <span className="text-eyebrow text-xs">// TOURNAMENT REGISTRATION DESK</span>
                <h2 className="text-3xl font-heading font-black text-white mt-1">
                  Register for {selectedTournament?.tournamentName}
                </h2>
                <p className="text-xs text-white/60 font-paragraph mt-1">
                  Guaranteed Purse: <strong className="text-green-400">{selectedTournament?.prizePool}</strong> • Format: {selectedTournament?.format}
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('open')}
                className="text-xs font-mono text-white/50 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleRegisterSquad} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">SQUAD / TEAM NAME *</label>
                  <input 
                    type="text"
                    required
                    value={regForm.teamName}
                    onChange={(e) => setRegForm(prev => ({ ...prev, teamName: e.target.value }))}
                    placeholder="e.g. Apex Predators / Shadow Vanguard"
                    className="input-field font-heading font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">CAPTAIN NAME *</label>
                  <input 
                    type="text"
                    required
                    value={regForm.captainName}
                    onChange={(e) => setRegForm(prev => ({ ...prev, captainName: e.target.value }))}
                    placeholder="Captain's real name or tag"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">CAPTAIN EMAIL *</label>
                  <input 
                    type="email"
                    required
                    value={regForm.captainEmail}
                    onChange={(e) => setRegForm(prev => ({ ...prev, captainEmail: e.target.value }))}
                    placeholder="captain@team.gg"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-2">CAPTAIN DISCORD TAG *</label>
                  <input 
                    type="text"
                    required
                    value={regForm.captainDiscord}
                    onChange={(e) => setRegForm(prev => ({ ...prev, captainDiscord: e.target.value }))}
                    placeholder="Captain#1234 or handle"
                    className="input-field font-mono"
                  />
                </div>
              </div>

              {/* Roster entries */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-mono uppercase text-[#00FFDF] mb-4">
                  Starting Roster & Substitutes
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">STARTER 1 (GAMER TAG)</label>
                    <input 
                      type="text"
                      value={regForm.player1}
                      onChange={(e) => setRegForm(prev => ({ ...prev, player1: e.target.value }))}
                      placeholder="Player 1 In-Game ID"
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">STARTER 2 (GAMER TAG)</label>
                    <input 
                      type="text"
                      value={regForm.player2}
                      onChange={(e) => setRegForm(prev => ({ ...prev, player2: e.target.value }))}
                      placeholder="Player 2 In-Game ID"
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">STARTER 3 (GAMER TAG)</label>
                    <input 
                      type="text"
                      value={regForm.player3}
                      onChange={(e) => setRegForm(prev => ({ ...prev, player3: e.target.value }))}
                      placeholder="Player 3 In-Game ID"
                      className="input-field text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-white/60 mb-1">SUBSTITUTE / BENCH</label>
                    <input 
                      type="text"
                      value={regForm.subPlayer}
                      onChange={(e) => setRegForm(prev => ({ ...prev, subPlayer: e.target.value }))}
                      placeholder="Sub Player In-Game ID"
                      className="input-field text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-mono text-white/60">
                Direct entry confirmed. By registering, your squad agrees to official tournament rulebooks, referee adjudications, and anti-cheat compliance.
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-4 text-sm font-heading font-bold"
              >
                <Check size={16} />
                <span>Confirm Squad Registration & Check In</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: My Registered Squads & Score Submission Desk */}
        {activeTab === 'my-tournaments' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  My Active Tournament Squads & Matches
                </h2>
                <p className="text-sm text-white/60 font-paragraph mt-1">
                  Manage check-in status, review bracket pairings, and transmit official score verification screenshots to referees.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('open')}
                className="btn-outline-primary py-2 px-4 text-xs font-heading font-bold"
              >
                <Plus size={14} />
                <span>Register Another Team</span>
              </button>
            </div>

            <div className="space-y-6">
              {registeredSquads.map(squad => (
                <div key={squad.id} className="glass-card p-6 border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-heading font-black text-white">{squad.teamName}</h3>
                        <span className="badge-primary text-[10px]">{squad.tournamentName}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          squad.checkInStatus === 'Checked In' 
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                        }`}>
                          {squad.checkInStatus}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-white/50 mt-1">
                        Captain: {squad.captainName} ({squad.captainDiscord}) • Registered: {squad.checkInTime || 'Recent'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {squad.reportedScore ? (
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-white/40 block">SUBMITTED SCORE</span>
                          <span className="text-sm font-mono font-bold text-[#00FFDF]">
                            {squad.reportedScore.team} - {squad.reportedScore.opponent} (Verified)
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReportingSquadId(squad.id)}
                          className="btn-outline-primary py-2 px-4 text-xs font-mono"
                        >
                          <Upload size={14} />
                          <span>Submit Match Score Proof</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                    <div>
                      <span className="text-white/40">ROSTER: </span>
                      <span className="text-white/80">{squad.roster.join(', ')}</span>
                    </div>
                    {squad.reportedScore?.proofUrl && (
                      <a 
                        href={squad.reportedScore.proofUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00FFDF] hover:underline flex items-center gap-1 shrink-0"
                      >
                        <span>View Transmitted Proof</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  {/* Inline Score Reporter Modal / Subform */}
                  {reportingSquadId === squad.id && (
                    <div className="mt-6 p-5 rounded-2xl bg-black/60 border border-[#00FFDF]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                          <FileCheck size={16} className="text-[#00FFDF]" />
                          <span>Official Score & Proof Transmission</span>
                        </h4>
                        <button 
                          onClick={() => setReportingSquadId(null)}
                          className="text-xs text-white/40 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono text-white/60 mb-1">YOUR TEAM SCORE</label>
                          <input 
                            type="number"
                            value={teamScore}
                            onChange={(e) => setTeamScore(e.target.value)}
                            className="input-field text-center font-bold text-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-white/60 mb-1">OPPONENT SCORE</label>
                          <input 
                            type="number"
                            value={opponentScore}
                            onChange={(e) => setOpponentScore(e.target.value)}
                            className="input-field text-center font-bold text-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-white/60 mb-1">SCREENSHOT / VOD PROOF URL *</label>
                          <input 
                            type="url"
                            required
                            value={proofUrl}
                            onChange={(e) => setProofUrl(e.target.value)}
                            placeholder="https://imgur.com/... or twitch clip"
                            className="input-field text-xs"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleSubmitScore(squad.id)}
                        className="btn-primary w-full py-2.5 text-xs font-heading font-bold"
                      >
                        Transmit Score to Tournament Referees
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
