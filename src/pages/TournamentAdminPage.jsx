import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useClerkAuth } from '../services/clerkAuth';
import { INITIAL_REFEREE_DATA, INITIAL_REGISTERED_SQUADS } from '../services/hostingerDb';
import { 
  Shield, 
  Clock, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertTriangle, 
  Trophy, 
  Users, 
  FileText, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Check,
  Flame,
  Award
} from 'lucide-react';

export default function TournamentAdminPage() {
  const { tournaments, bracketMatches, updateMatchScore, showToast } = useApp();
  const { user } = useClerkAuth();

  // Referee Duty Shifts state
  const [referees, setReferees] = useState(() => {
    try {
      const saved = localStorage.getItem('eternals_referee_shifts');
      return saved ? JSON.parse(saved) : INITIAL_REFEREE_DATA;
    } catch {
      return INITIAL_REFEREE_DATA;
    }
  });

  // Current logged in referee or primary referee
  const [activeRefId, setActiveRefId] = useState(referees[0]?.id || 'ref-1');
  const currentRef = referees.find(r => r.id === activeRefId) || referees[0];

  // Live timer for active shift
  const [activeSeconds, setActiveSeconds] = useState(currentRef.accumulatedSeconds || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(currentRef.isShiftActive);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setActiveSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Persist shifts to storage
  useEffect(() => {
    try {
      localStorage.setItem('eternals_referee_shifts', JSON.stringify(referees));
    } catch (e) {
      console.error(e);
    }
  }, [referees]);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleShift = () => {
    const nextState = !isTimerRunning;
    setIsTimerRunning(nextState);

    setReferees(prev => prev.map(r => {
      if (r.id === activeRefId) {
        return {
          ...r,
          isShiftActive: nextState,
          status: nextState ? "Active on Duty" : "Off Duty (Logged)",
          shiftStartedAt: nextState ? Date.now() : r.shiftStartedAt,
          accumulatedSeconds: activeSeconds
        };
      }
      return r;
    }));

    if (nextState) {
      showToast(`Duty Shift Started for ${currentRef.refereeName}. Online time tracking active.`, 'success');
    } else {
      showToast(`Duty Shift Concluded. Logged ${formatTime(activeSeconds)} total active time.`, 'info');
    }
  };

  // Squad Registrations and Check-in verification
  const [registeredSquads, setRegisteredSquads] = useState(() => {
    try {
      const saved = localStorage.getItem('eternals_registered_squads');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_SQUADS;
    } catch {
      return INITIAL_REGISTERED_SQUADS;
    }
  });

  const handleUpdateCheckIn = (squadId, newStatus) => {
    setRegisteredSquads(prev => prev.map(sq => {
      if (sq.id === squadId) {
        return {
          ...sq,
          checkInStatus: newStatus,
          checkInTime: newStatus === 'Checked In' ? new Date().toISOString().replace('T', ' ').slice(0, 16) : null
        };
      }
      return sq;
    }));
    showToast(`Squad check-in updated: ${newStatus}`, 'info');
  };

  // Dispute desk state
  const [disputes, setDisputes] = useState([
    {
      id: "disp-101",
      tournament: "Marvel Rivals Winter Showdown",
      teams: "Vanguard Syndicate vs Sentinels Rift",
      reason: "Rule 4.2 - Hero Select Delay / Disconnection in Game 2",
      status: "Investigating",
      openedBy: "Sentinels Rift Captain",
      time: "25m ago"
    },
    {
      id: "disp-102",
      tournament: "Eternals Rocket League Open",
      teams: "Velocity Apex vs Cloud Dynasty",
      reason: "Server ping spike >140ms on US-East host",
      status: "Resolved - Server Rerouted",
      openedBy: "Velocity Apex",
      time: "1h 10m ago"
    }
  ]);

  const handleResolveDispute = (id) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: "Resolved by Arbiter" } : d));
    setReferees(prev => prev.map(r => r.id === activeRefId ? { ...r, disputesResolved: r.disputesResolved + 1 } : r));
    showToast("Tournament dispute ticket marked as resolved.", 'success');
  };

  // Quick match score adjudication
  const [selectedMatch, setSelectedMatch] = useState(bracketMatches[0]);
  const [mScore1, setMScore1] = useState(3);
  const [mScore2, setMScore2] = useState(1);

  const handleAdjudicateScore = (e) => {
    e.preventDefault();
    if (!selectedMatch) return;
    updateMatchScore(selectedMatch._id, mScore1, mScore2, 'Official Result Verified');
    setReferees(prev => prev.map(r => r.id === activeRefId ? { ...r, matchesOfficiated: r.matchesOfficiated + 1 } : r));
    showToast(`Match ${selectedMatch.roundName} officially verified: ${mScore1} - ${mScore2}`, 'success');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#7F27FF]/15 via-transparent to-black relative">
        <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#7F27FF]/20 border border-[#7F27FF]/50 flex items-center justify-center text-[#7F27FF] shadow-[0_0_20px_rgba(127,39,255,0.4)]">
              <Shield size={28} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00FFDF] mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span>Tournament Arbiter & Referee Control Center</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
                Tournament Admin Portal
              </h1>
            </div>
          </div>

          {/* Time Tracking Clock Pill */}
          <div className="flex items-center gap-4 bg-[#080A0E] border border-[#00FFDF]/30 p-3 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <Clock size={20} className={isTimerRunning ? "text-[#00FFDF] animate-pulse" : "text-white/40"} />
              <div>
                <span className="text-[10px] font-mono text-white/50 block">DUTY TIMER</span>
                <span className="text-2xl font-mono font-bold text-white tracking-wider">
                  {formatTime(activeSeconds)}
                </span>
              </div>
            </div>

            <button 
              onClick={handleToggleShift}
              className={`px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                isTimerRunning 
                  ? "bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30"
                  : "bg-[#00FFDF] text-black hover:bg-[#00e6c8] shadow-[0_0_15px_rgba(0,255,223,0.3)]"
              }`}
            >
              {isTimerRunning ? (
                <>
                  <Square size={14} />
                  <span>Conclude Shift</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Start Duty Shift</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Referee Duty Roster Bar */}
        <div className="glass-card p-6 border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Users size={18} className="text-[#00FFDF]" />
                <span>Tournament Referees & Active Duty Roster</span>
              </h3>
              <p className="text-xs text-white/60 font-paragraph">
                Live monitoring of tournament administrators and referees clocked into tournament matches.
              </p>
            </div>
            <span className="badge-primary text-[10px]">Hostinger Synced</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {referees.map(ref => (
              <div 
                key={ref.id}
                onClick={() => {
                  setActiveRefId(ref.id);
                  setActiveSeconds(ref.accumulatedSeconds || 0);
                  setIsTimerRunning(ref.isShiftActive);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeRefId === ref.id 
                    ? "bg-[#00FFDF]/10 border-[#00FFDF] shadow-[0_0_20px_rgba(0,255,223,0.15)]"
                    : "bg-white/5 border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-bold text-white text-base">{ref.refereeName}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    ref.isShiftActive 
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-white/10 text-white/50 border-white/10"
                  }`}>
                    {ref.status}
                  </span>
                </div>
                <div className="text-xs text-[#00FFDF] font-mono mb-3">{ref.tournamentName}</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs bg-black/50 p-2 rounded-lg border border-white/5">
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono">TIME LOGGED</span>
                    <strong className="text-white font-mono">{formatTime(ref.accumulatedSeconds)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono">OFFICIATED</span>
                    <strong className="text-white font-mono">{ref.matchesOfficiated}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 block font-mono">DISPUTES</span>
                    <strong className="text-amber-400 font-mono">{ref.disputesResolved}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-Column Core: Squad Check-In Manager & Match Adjudication Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Squad Verification & Check-In Desk (7 Cols) */}
          <div className="lg:col-span-7 glass-card p-6 border-white/10 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <UserCheck size={18} className="text-[#00FFDF]" />
                  <span>Squad Check-In & Bracket Verification</span>
                </h3>
                <p className="text-xs text-white/60 font-paragraph mt-0.5">
                  Verify roster eligibility, captain attendance, and check-in statuses for seeded teams.
                </p>
              </div>
              <span className="text-xs font-mono text-white/50">{registeredSquads.length} Teams Registered</span>
            </div>

            <div className="space-y-4">
              {registeredSquads.map(squad => (
                <div key={squad.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-heading font-bold text-white">{squad.teamName}</h4>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          squad.checkInStatus === 'Checked In'
                            ? "bg-green-500/20 text-green-400 border-green-500/40"
                            : (squad.checkInStatus === 'Disqualified' ? "bg-red-500/20 text-red-400 border-red-500/40" : "bg-amber-500/20 text-amber-300 border-amber-500/40")
                        }`}>
                          {squad.checkInStatus}
                        </span>
                      </div>
                      <div className="text-xs text-white/50 font-mono mt-0.5">
                        Captain: <span className="text-white">{squad.captainName}</span> ({squad.captainDiscord}) • {squad.tournamentName}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleUpdateCheckIn(squad.id, 'Checked In')}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-green-500/20 text-green-300 border border-green-500/40 hover:bg-green-500/30 cursor-pointer"
                      >
                        Check In
                      </button>
                      <button 
                        onClick={() => handleUpdateCheckIn(squad.id, 'Disqualified')}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 cursor-pointer"
                      >
                        Disqualify
                      </button>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-white/60 bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <span className="text-white/40 block mb-1">REGISTERED ROSTER:</span>
                    {squad.roster.join(' • ')}
                  </div>

                  {squad.reportedScore && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-white/60">
                        Score Proof Submitted: <strong className="text-[#00FFDF]">{squad.reportedScore.team} - {squad.reportedScore.opponent}</strong>
                      </span>
                      <a href={squad.reportedScore.proofUrl} target="_blank" rel="noopener noreferrer" className="text-[#00FFDF] hover:underline flex items-center gap-1">
                        <span>Review Screenshot / VOD</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Official Match Adjudication & Dispute Desk (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Match Adjudication Form */}
            <div className="glass-card p-6 border-[#7F27FF]/30">
              <h3 className="text-lg font-heading font-bold text-white mb-2 flex items-center gap-2 pb-3 border-b border-white/10">
                <Trophy size={18} className="text-[#7F27FF]" />
                <span>Match Score Adjudication</span>
              </h3>

              <div className="space-y-4 my-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">SELECT ACTIVE BRACKET MATCH</label>
                  <select 
                    value={selectedMatch?._id}
                    onChange={(e) => {
                      const found = bracketMatches.find(m => m._id === e.target.value);
                      setSelectedMatch(found);
                    }}
                    className="input-field text-xs bg-[#0A0D14]"
                  >
                    {bracketMatches.map(m => (
                      <option key={m._id} value={m._id}>
                        {m.roundName}: {m.team1Name} vs {m.team2Name} ({m.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-xs font-mono text-white/60 block truncate">{selectedMatch?.team1Name}</span>
                    <input 
                      type="number"
                      value={mScore1}
                      onChange={(e) => setMScore1(e.target.value)}
                      className="input-field text-2xl font-bold font-heading text-center mt-2"
                    />
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-xs font-mono text-white/60 block truncate">{selectedMatch?.team2Name}</span>
                    <input 
                      type="number"
                      value={mScore2}
                      onChange={(e) => setMScore2(e.target.value)}
                      className="input-field text-2xl font-bold font-heading text-center mt-2"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAdjudicateScore}
                  className="btn-primary w-full py-3 text-xs font-heading font-bold"
                >
                  <Check size={16} />
                  <span>Verify Score & Advance Winner</span>
                </button>
              </div>
            </div>

            {/* Dispute Resolution Desk */}
            <div className="glass-card p-6 border-white/10">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-400" />
                  <span>Dispute Resolution Desk</span>
                </h3>
                <span className="badge-secondary text-[10px]">Active Tickets</span>
              </div>

              <div className="space-y-3">
                {disputes.map(disp => (
                  <div key={disp.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-white">{disp.teams}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        disp.status.includes('Resolved') 
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}>
                        {disp.status}
                      </span>
                    </div>
                    <div className="text-white/70">{disp.reason}</div>
                    <div className="flex items-center justify-between text-white/40 text-[11px] pt-1 border-t border-white/10">
                      <span>Opened: {disp.time}</span>
                      {!disp.status.includes('Resolved') && (
                        <button 
                          onClick={() => handleResolveDispute(disp.id)}
                          className="text-[#00FFDF] hover:underline"
                        >
                          Mark as Resolved
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
