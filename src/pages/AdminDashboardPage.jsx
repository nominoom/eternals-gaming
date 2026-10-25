import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import DirectRevenueAccounting from '../components/DirectRevenueAccounting';
import HostingerAndClerkSettingsModal from '../components/HostingerAndClerkSettingsModal';
import { 
  ShieldAlert, 
  Trophy, 
  Users, 
  Gamepad2, 
  Calendar, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Search, 
  RefreshCw, 
  Zap,
  TrendingUp,
  Sparkles,
  Play,
  DollarSign,
  Database,
  ExternalLink,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { 
    stats, 
    updateStat, 
    tournaments, 
    setTournaments, 
    teams, 
    setTeams, 
    players, 
    setPlayers, 
    creators, 
    setCreators, 
    bracketMatches, 
    updateMatchScore,
    showToast,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // overview | revenue | tournaments | teams | players | creators | matches | esports-updates
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Editable live stat inputs
  const [liveStatsForm, setLiveStatsForm] = useState({
    tournamentWins: stats.tournamentWins || 6,
    players: stats.players || 4,
    professionalTeams: stats.professionalTeams || 3,
    totalFollowers: stats.totalFollowers || 3680,
    onlineViewers: stats.onlineViewers || 14200,
    streamHours: stats.streamHours || 850
  });

  // Quick match score updater
  const [selectedMatchId, setSelectedMatchId] = useState(bracketMatches[0]?._id || '');
  const [score1, setScore1] = useState(3);
  const [score2, setScore2] = useState(1);
  const [matchStatus, setMatchStatus] = useState('Completed');

  // New Tournament modal/state
  const [newTourn, setNewTourn] = useState({
    tournamentName: '',
    gamePlayed: 'Marvel Rivals',
    prizePool: '$10,000 USD',
    tournamentStartDate: '2026-12-01',
    description: ''
  });
  const [showTournForm, setShowTournForm] = useState(false);

  const handleCreateTournament = (e) => {
    e.preventDefault();
    if (!newTourn.tournamentName) return;
    const item = {
      _id: `tourn-${Date.now()}`,
      tournamentName: newTourn.tournamentName,
      gamePlayed: newTourn.gamePlayed,
      gameId: newTourn.gamePlayed.toLowerCase().replace(/\s+/g, '-'),
      description: newTourn.description || 'Official Eternals sanctioned championship event.',
      tournamentStartDate: newTourn.tournamentStartDate,
      signupEndDate: '2026-11-28',
      prizePool: newTourn.prizePool,
      maxTeams: 16,
      registeredTeamsCount: 1,
      format: 'Double Elimination',
      signupLink: '#register'
    };
    setTournaments(prev => [item, ...prev]);
    setShowTournForm(false);
    showToast(`Created tournament: ${newTourn.tournamentName}`, 'success');
  };

  const handleDeleteTournament = (id) => {
    setTournaments(prev => prev.filter(t => t._id !== id));
    showToast('Tournament deleted.', 'info');
  };

  const handleDeletePlayer = (id) => {
    setPlayers(prev => prev.filter(p => p._id !== id));
    showToast('Player removed from roster.', 'info');
  };

  const handleUpdateLiveStat = (key) => {
    updateStat(key, parseInt(liveStatsForm[key]) || 0);
  };

  const handleQuickMatchUpdate = (e) => {
    e.preventDefault();
    if (!selectedMatchId) return;
    updateMatchScore(selectedMatchId, score1, score2, matchStatus);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#7F27FF]/15 via-transparent to-black relative">
        <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#7F27FF]/20 border border-[#7F27FF]/50 flex items-center justify-center text-[#7F27FF] shadow-[0_0_25px_rgba(127,39,255,0.4)]">
              <ShieldAlert size={28} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#00FFDF] mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>System Administration</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
                Admin Command Center
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#00FFDF]/10 hover:bg-[#00FFDF]/20 border border-[#00FFDF]/40 text-[#00FFDF] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,255,223,0.2)]"
            >
              <Database size={15} />
              <span>Hostinger & Clerk Config</span>
            </button>
            <span className="text-xs text-white/50 font-mono hidden sm:inline">
              Live DB: Synced
            </span>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation Bar */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex overflow-x-auto gap-2 pb-4 border-b border-white/10 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'revenue', label: 'Direct Apparel Revenue', icon: DollarSign },
            { id: 'tournaments', label: `Tournaments (${tournaments.length})`, icon: Trophy },
            { id: 'teams', label: `Teams (${teams.length})`, icon: Gamepad2 },
            { id: 'players', label: `Players (${players.length})`, icon: Users },
            { id: 'creators', label: `Creators (${creators.length})`, icon: Sparkles },
            { id: 'matches', label: 'Matches', icon: Calendar },
            { id: 'esports-updates', label: 'Live Esports Updates', icon: Zap }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  active
                    ? tab.id === 'esports-updates'
                      ? 'bg-gradient-to-r from-[#00FFDF] to-[#7F27FF] text-black font-extrabold shadow-[0_0_20px_rgba(0,255,223,0.4)]'
                      : 'bg-[#00FFDF] text-black shadow-[0_0_15px_rgba(0,255,223,0.3)]'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="py-10 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 border-[#00FFDF]/25">
                <Trophy size={28} className="text-[#00FFDF] mb-3" />
                <div className="text-3xl font-heading font-extrabold text-white mb-1">
                  {tournaments.length}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                  Active Tournaments
                </div>
              </div>

              <div className="glass-card p-6 border-[#7F27FF]/25">
                <Gamepad2 size={28} className="text-[#7F27FF] mb-3" />
                <div className="text-3xl font-heading font-extrabold text-white mb-1">
                  {teams.length}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                  Active Pro Teams
                </div>
              </div>

              <div className="glass-card p-6 border-[#00FFDF]/25">
                <Users size={28} className="text-[#00FFDF] mb-3" />
                <div className="text-3xl font-heading font-extrabold text-white mb-1">
                  {players.length}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                  Registered Athletes
                </div>
              </div>

              <div className="glass-card p-6 border-[#7F27FF]/25">
                <Calendar size={28} className="text-[#7F27FF] mb-3" />
                <div className="text-3xl font-heading font-extrabold text-white mb-1">
                  {bracketMatches.length}
                </div>
                <div className="text-xs uppercase tracking-wider text-white/50 font-heading">
                  Scheduled Matches
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Activity Log */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-heading font-bold text-white mb-6">Recent System Activity</h3>
                <div className="space-y-4 text-sm font-paragraph">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Trophy size={18} className="text-[#00FFDF]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Tournament bracket updated for Marvel Rivals</p>
                      <p className="text-xs text-white/40">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Users size={18} className="text-[#7F27FF]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">New team registration confirmed: Vanguard Syndicate</p>
                      <p className="text-xs text-white/40">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                    <Zap size={18} className="text-[#00FFDF]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Esports live followers counter synchronized</p>
                      <p className="text-xs text-white/40">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-heading font-bold text-white mb-6">Quick Admin Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setActiveTab('tournaments'); setShowTournForm(true); }}
                    className="btn-primary py-3 px-4 text-xs flex items-center justify-center gap-2"
                  >
                    <Plus size={15} />
                    <span>New Tournament</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('esports-updates')}
                    className="btn-secondary py-3 px-4 text-xs flex items-center justify-center gap-2"
                  >
                    <Zap size={15} />
                    <span>Live Stat Update</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('players')}
                    className="btn-outline-primary py-3 px-4 text-xs flex items-center justify-center gap-2"
                  >
                    <Users size={15} />
                    <span>Manage Players</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('matches')}
                    className="btn-outline-white py-3 px-4 text-xs flex items-center justify-center gap-2"
                  >
                    <Calendar size={15} />
                    <span>Manage Matches</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Operational Portals & Client Features Hub */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00FFDF] mb-1">
                    System Hub
                  </div>
                  <h3 className="text-xl font-heading font-black text-white">
                    Operations, Referee Time Tracking & Portals
                  </h3>
                </div>
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-[#00FFDF] transition-colors"
                >
                  <Database size={14} />
                  <span>Hostinger DB & Clerk Status</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Team Dashboard */}
                <div className="glass-card p-5 border-[#00FFDF]/20 hover:border-[#00FFDF]/60 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#00FFDF]/10 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF] mb-4">
                      <Users size={20} />
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#00FFDF] mb-1">
                      Athlete & Creator Portal
                    </div>
                    <h4 className="text-base font-heading font-bold text-white mb-2">
                      Team Dossier & Socials
                    </h4>
                    <p className="text-xs text-white/60 font-paragraph mb-4">
                      Athletes sign in via Clerk, connect Twitch, YouTube, Kick, X, TikTok, Discord, compute aggregate follower metrics into their dossier, and update hardware gear specs.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/team-dashboard')}
                    className="w-full btn-outline-primary py-2.5 text-xs flex items-center justify-center gap-2 group-hover:bg-[#00FFDF] group-hover:text-black transition-all"
                  >
                    <span>Open Team Dashboard</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* 2. Tournament Admin & Referee Desk */}
                <div className="glass-card p-5 border-[#7F27FF]/20 hover:border-[#7F27FF]/60 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#7F27FF]/10 border border-[#7F27FF]/30 flex items-center justify-center text-[#7F27FF] mb-4">
                      <Clock size={20} />
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#7F27FF] mb-1">
                      Officials & Arbiter Desk
                    </div>
                    <h4 className="text-base font-heading font-bold text-white mb-2">
                      Referee Shift & Match Desk
                    </h4>
                    <p className="text-xs text-white/60 font-paragraph mb-4">
                      Active duty shift punch-clock timer for tournament referees, squad check-in verification desk, match score adjudication, and dispute resolution tickets.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/tournament-admin')}
                    className="w-full btn-secondary py-2.5 text-xs flex items-center justify-center gap-2"
                  >
                    <span>Open Arbiter Desk</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* 3. Tournaments Player Hub */}
                <div className="glass-card p-5 border-[#00FFDF]/20 hover:border-[#00FFDF]/60 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#00FFDF]/10 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF] mb-4">
                      <Trophy size={20} />
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#00FFDF] mb-1">
                      Player Registration Hub
                    </div>
                    <h4 className="text-base font-heading font-bold text-white mb-2">
                      Tournaments Sign-up
                    </h4>
                    <p className="text-xs text-white/60 font-paragraph mb-4">
                      Public competitor portal: browse open championships, submit starting squad rosters and substitutes, check in, and upload match score proof.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/tournaments-dashboard')}
                    className="w-full btn-outline-white py-2.5 text-xs flex items-center justify-center gap-2 group-hover:border-[#00FFDF] group-hover:text-[#00FFDF] transition-all"
                  >
                    <span>Open Player Portal</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* 4. Direct Apparel Accounting */}
                <div className="glass-card p-5 border-emerald-500/20 hover:border-emerald-500/60 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                      <DollarSign size={20} />
                    </div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 mb-1">
                      Direct Revenue Economics
                    </div>
                    <h4 className="text-base font-heading font-bold text-white mb-2">
                      In-House Apparel Margins
                    </h4>
                    <p className="text-xs text-white/60 font-paragraph mb-4">
                      Zero third-party POD cuts (eliminating Printify revenue splits). Direct tracking of retail sales vs raw production costs with live profit simulation.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('revenue')}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View Revenue Ledger</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TOURNAMENTS */}
        {activeTab === 'tournaments' && (
          <div className="py-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-2xl font-heading font-bold text-white">Tournament Management</h3>
              <button
                onClick={() => setShowTournForm(!showTournForm)}
                className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
              >
                <Plus size={15} />
                <span>{showTournForm ? 'Cancel' : 'Create Tournament'}</span>
              </button>
            </div>

            {showTournForm && (
              <form onSubmit={handleCreateTournament} className="glass-card p-6 border-[#00FFDF]/40 space-y-4 max-w-2xl">
                <h4 className="text-base font-heading font-bold text-[#00FFDF]">Add New Tournament</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Tournament Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marvel Rivals Clash"
                      value={newTourn.tournamentName}
                      onChange={e => setNewTourn({...newTourn, tournamentName: e.target.value})}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Game</label>
                    <select
                      value={newTourn.gamePlayed}
                      onChange={e => setNewTourn({...newTourn, gamePlayed: e.target.value})}
                      className="input-field text-sm bg-[#080A0E] text-white"
                    >
                      <option value="Marvel Rivals">Marvel Rivals</option>
                      <option value="Rocket League">Rocket League</option>
                      <option value="The Finals">The Finals</option>
                      <option value="Apex Legends">Apex Legends</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Prize Pool</label>
                    <input
                      type="text"
                      required
                      placeholder="$10,000 USD"
                      value={newTourn.prizePool}
                      onChange={e => setNewTourn({...newTourn, prizePool: e.target.value})}
                      className="input-field text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Start Date</label>
                    <input
                      type="date"
                      required
                      value={newTourn.tournamentStartDate}
                      onChange={e => setNewTourn({...newTourn, tournamentStartDate: e.target.value})}
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary py-2 px-5 text-xs">
                  Save Tournament
                </button>
              </form>
            )}

            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-paragraph">
                  <thead className="bg-white/5 border-b border-white/10 font-heading text-xs uppercase tracking-wider text-white/60">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Game</th>
                      <th className="p-4">Prize Pool</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tournaments.map(t => (
                      <tr key={t._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white">{t.tournamentName}</td>
                        <td className="p-4"><span className="badge-primary">{t.gamePlayed}</span></td>
                        <td className="p-4 font-heading font-bold text-[#00FFDF]">{t.prizePool}</td>
                        <td className="p-4 text-white/60">{new Date(t.tournamentStartDate).toLocaleDateString()}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDeleteTournament(t._id)}
                            className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PLAYERS */}
        {activeTab === 'players' && (
          <div className="py-10 space-y-6">
            <h3 className="text-2xl font-heading font-bold text-white">Player Roster Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map(p => (
                <div key={p._id} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img src={p.profilePicture} alt={p.playerName} className="w-14 h-14 rounded-full object-cover border border-[#00FFDF]/40" />
                      <div>
                        <h4 className="font-heading font-bold text-white">{p.playerName}</h4>
                        <div className="text-xs text-[#00FFDF] font-bold">"{p.playerTag}" • {p.role}</div>
                        <div className="text-xs text-white/50">{p.teamName}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white/70 mb-4 p-2 bg-white/5 rounded">
                      KDA: {p.kdaRatio}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                    <button
                      onClick={() => handleDeletePlayer(p._id)}
                      className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 size={13} /> Delete Player
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LIVE ESPORTS UPDATES (Real-time Editable) */}
        {activeTab === 'esports-updates' && (
          <div className="py-10 space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#00FFDF] mb-2">
                <Zap size={14} />
                <span>Real-Time Reactivity</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Live Esports Stats Updater
              </h3>
              <p className="text-sm font-paragraph text-white/60 max-w-2xl">
                Modifications made here immediately update statistics and scorecards across the Team page, Home page, and Footer without a reload.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'tournamentWins', label: 'Tournament Wins', desc: 'Reflected in hero and stats banner' },
                { key: 'players', label: 'Active Players', desc: 'Roster athlete headcount' },
                { key: 'professionalTeams', label: 'Professional Teams', desc: 'Active team divisions' },
                { key: 'totalFollowers', label: 'Total Followers', desc: 'Combined network audience' },
                { key: 'onlineViewers', label: 'Live Stream Viewers', desc: 'Current concurrent broadcast count' },
                { key: 'streamHours', label: 'Broadcast Hours', desc: 'Total monthly production hours' }
              ].map(st => (
                <div key={st.key} className="glass-card p-6">
                  <label className="text-sm font-heading font-bold text-white mb-1 block">
                    {st.label}
                  </label>
                  <p className="text-xs text-white/40 mb-3">{st.desc}</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={liveStatsForm[st.key]}
                      onChange={(e) => setLiveStatsForm({...liveStatsForm, [st.key]: e.target.value})}
                      className="input-field text-base font-mono font-bold"
                    />
                    <button
                      onClick={() => handleUpdateLiveStat(st.key)}
                      className="btn-primary py-2 px-4 text-xs shrink-0"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Match Live Scoreboard Updater */}
            <div className="glass-card p-8 border-[#7F27FF]/40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#7F27FF]/20 text-[#7F27FF] flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-white">Live Match Scorecast</h4>
                  <p className="text-xs text-white/50">Push live score updates to active tournament brackets</p>
                </div>
              </div>

              <form onSubmit={handleQuickMatchUpdate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="text-xs text-white/70 mb-1 block">Select Match</label>
                  <select
                    value={selectedMatchId}
                    onChange={(e) => setSelectedMatchId(e.target.value)}
                    className="input-field text-sm bg-[#080A0E] text-white"
                  >
                    {bracketMatches.map(m => (
                      <option key={m._id} value={m._id}>
                        {m.tournamentName} — {m.round}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/70 mb-1 block">Team 1 Score</label>
                  <input
                    type="number"
                    value={score1}
                    onChange={(e) => setScore1(e.target.value)}
                    className="input-field text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-white/70 mb-1 block">Team 2 Score</label>
                  <input
                    type="number"
                    value={score2}
                    onChange={(e) => setScore2(e.target.value)}
                    className="input-field text-sm font-mono"
                  />
                </div>

                <button type="submit" className="btn-secondary py-3 text-xs w-full">
                  <Zap size={14} />
                  <span>Push Score Live</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB: DIRECT REVENUE ACCOUNTING */}
        {activeTab === 'revenue' && (
          <div className="py-8">
            <DirectRevenueAccounting />
          </div>
        )}

        {/* Fallbacks for other tabs */}
        {(activeTab === 'teams' || activeTab === 'creators' || activeTab === 'matches') && (
          <div className="py-10">
            <div className="glass-card p-8 text-center text-white/60">
              <h3 className="text-xl font-heading font-bold text-white mb-2 capitalize">{activeTab} Management</h3>
              <p className="text-sm font-paragraph">All records are active and synchronized with the frontend catalog.</p>
            </div>
          </div>
        )}

      </div>

      {/* Hostinger DB & Clerk Settings Modal */}
      <HostingerAndClerkSettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)} 
      />
    </div>
  );
}
