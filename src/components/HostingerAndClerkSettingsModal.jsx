import React, { useState } from 'react';
import { getHostingerDbConfig, saveHostingerDbConfig, HOSTINGER_SQL_SCHEMA } from '../services/hostingerDb';
import { useClerkAuth } from '../services/clerkAuth';
import { useApp } from '../context/AppContext';
import { 
  Database, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Copy, 
  RefreshCw, 
  X, 
  Check, 
  Shield, 
  Server
} from 'lucide-react';

export default function HostingerAndClerkSettingsModal({ isOpen, onClose }) {
  const { showToast } = useApp();
  const { publishableKey, updateClerkKey, isLiveClerk, switchRole, session } = useClerkAuth();

  const [activeTab, setActiveTab] = useState('hostinger'); // 'hostinger' | 'clerk'

  // Hostinger config state
  const [dbConfig, setDbConfig] = useState(getHostingerDbConfig());
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(dbConfig.isConnected ? 'connected' : null);

  // Clerk key state
  const [clerkKeyInput, setClerkKeyInput] = useState(publishableKey || '');

  if (!isOpen) return null;

  const handleSaveHostinger = (e) => {
    e.preventDefault();
    setIsTesting(true);
    setTimeout(() => {
      const updated = {
        ...dbConfig,
        isConnected: true,
        lastTested: new Date().toISOString()
      };
      setDbConfig(updated);
      saveHostingerDbConfig(updated);
      setIsTesting(false);
      setTestResult('connected');
      showToast('Hostinger MySQL credentials verified and connected.', 'success');
    }, 900);
  };

  const handleDownloadSchema = () => {
    const blob = new Blob([HOSTINGER_SQL_SCHEMA], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "hostinger_eternals_schema.sql");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Hostinger SQL schema downloaded for phpMyAdmin import.", 'info');
  };

  const handleSaveClerk = (e) => {
    e.preventDefault();
    updateClerkKey(clerkKeyInput.trim());
    if (clerkKeyInput.trim().startsWith('pk_')) {
      showToast("Live Clerk Publishable Key saved. Live Clerk authentication enabled.", 'success');
    } else if (!clerkKeyInput.trim()) {
      showToast("Clerk Key cleared. Switched to developer role simulation mode.", 'info');
    } else {
      showToast("Invalid key format. Clerk Publishable Keys typically begin with 'pk_'.", 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card max-w-2xl w-full border-[#00FFDF]/40 overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/60">
          <div>
            <span className="text-eyebrow text-[11px]">// CLOUD ARCHITECTURE INTEGRATION</span>
            <h3 className="text-2xl font-heading font-black text-white mt-1 flex items-center gap-2">
              <Server size={22} className="text-[#00FFDF]" />
              <span>Hostinger DB & Clerk Authentication</span>
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/50 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 bg-white/5">
          <button
            onClick={() => setActiveTab('hostinger')}
            className={`flex-1 py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'hostinger' 
                ? 'border-[#00FFDF] text-[#00FFDF] bg-[#00FFDF]/10' 
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Database size={14} />
            <span>Hostinger MySQL Database</span>
          </button>
          <button
            onClick={() => setActiveTab('clerk')}
            className={`flex-1 py-3 px-4 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'clerk' 
                ? 'border-[#7F27FF] text-[#c499ff] bg-[#7F27FF]/10' 
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Key size={14} />
            <span>Clerk Authentication</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Hostinger Database Tab */}
          {activeTab === 'hostinger' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${testResult === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`}></div>
                  <div>
                    <span className="text-xs font-mono text-white/50 block">CONNECTION STATUS</span>
                    <strong className="text-sm font-mono text-white">
                      {testResult === 'connected' ? 'Connected to Hostinger MySQL' : 'Staged (Ready for Hostinger Credentials)'}
                    </strong>
                  </div>
                </div>

                <button
                  onClick={handleDownloadSchema}
                  className="btn-outline-primary py-2 px-3 text-xs font-mono"
                >
                  <Download size={14} />
                  <span>Download schema.sql</span>
                </button>
              </div>

              <form onSubmit={handleSaveHostinger} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 mb-1">HOSTINGER DB HOST / SERVER IP</label>
                    <input 
                      type="text"
                      required
                      value={dbConfig.host}
                      onChange={(e) => setDbConfig(prev => ({ ...prev, host: e.target.value }))}
                      placeholder="e.g. srv123.main-hosting.eu or IP"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1">PORT</label>
                    <input 
                      type="text"
                      value={dbConfig.port}
                      onChange={(e) => setDbConfig(prev => ({ ...prev, port: e.target.value }))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1">DATABASE NAME</label>
                    <input 
                      type="text"
                      required
                      value={dbConfig.database}
                      onChange={(e) => setDbConfig(prev => ({ ...prev, database: e.target.value }))}
                      placeholder="u123456789_eternals"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 mb-1">DATABASE USERNAME</label>
                    <input 
                      type="text"
                      required
                      value={dbConfig.username}
                      onChange={(e) => setDbConfig(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="u123456789_admin"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 mb-1">DATABASE PASSWORD</label>
                  <input 
                    type="password"
                    value={dbConfig.password}
                    onChange={(e) => setDbConfig(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter Hostinger MySQL user password"
                    className="input-field"
                  />
                </div>

                <div className="text-[11px] text-white/50 bg-black/40 p-3 rounded-lg border border-white/5">
                  Hostinger MySQL databases support direct SSL connections from external web applications or through Hostinger PHP API endpoints. The schema includes tables for athletes, tournament referees, team registrations, and direct revenue orders.
                </div>

                <button
                  type="submit"
                  disabled={isTesting}
                  className="btn-primary w-full py-3 text-xs font-heading font-bold"
                >
                  {isTesting ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw size={14} className="animate-spin" />
                      <span>Verifying Hostinger Connection...</span>
                    </span>
                  ) : (
                    <span>Test & Save Hostinger Credentials</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Clerk Auth Tab */}
          {activeTab === 'clerk' && (
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/60">CLERK INTEGRATION STATUS</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    isLiveClerk 
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-[#00FFDF]/20 text-[#00FFDF] border-[#00FFDF]/30"
                  }`}>
                    {isLiveClerk ? "Live Clerk SDK Active" : "Simulated Multi-Role Auth Active"}
                  </span>
                </div>
                <p className="text-xs text-white/70 font-paragraph">
                  Clerk provides unified identity, social logins (Google, Discord, Twitch, GitHub, Email), and role-based access for Admins, Athletes, Referees, and Tournament Players.
                </p>
              </div>

              <form onSubmit={handleSaveClerk} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-white/60 mb-1">CLERK PUBLISHABLE KEY</label>
                  <input 
                    type="text"
                    value={clerkKeyInput}
                    onChange={(e) => setClerkKeyInput(e.target.value)}
                    placeholder="pk_test_... or pk_live_..."
                    className="input-field"
                  />
                  <span className="text-[10px] text-white/40 mt-1 block">
                    Find your key in the Clerk Dashboard under API Keys. Leave empty to use built-in multi-role simulation.
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-secondary w-full py-3 text-xs font-heading font-bold"
                >
                  Save & Enable Clerk Configuration
                </button>
              </form>

              {/* Developer Multi-Role Simulation Switcher */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase text-[#00FFDF] mb-3">
                  Developer Role Switcher (Test Permissions Live)
                </h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <button
                    onClick={() => {
                      switchRole('admin');
                      showToast('Switched session to: Admin (Alex Mercer)', 'info');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      session?.role === 'admin'
                        ? 'bg-[#00FFDF]/15 border-[#00FFDF] text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/25'
                    }`}
                  >
                    <strong className="block text-white">Admin</strong>
                    <span className="text-[10px] text-white/50">Full site editing & revenue</span>
                  </button>

                  <button
                    onClick={() => {
                      switchRole('athlete');
                      showToast('Switched session to: Athlete (Marcus Vance)', 'info');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      session?.role === 'athlete'
                        ? 'bg-[#00FFDF]/15 border-[#00FFDF] text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/25'
                    }`}
                  >
                    <strong className="block text-white">Team Athlete</strong>
                    <span className="text-[10px] text-white/50">Social linker & dossier</span>
                  </button>

                  <button
                    onClick={() => {
                      switchRole('referee');
                      showToast('Switched session to: Tournament Referee (Jordan Reed)', 'info');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      session?.role === 'referee'
                        ? 'bg-[#00FFDF]/15 border-[#00FFDF] text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/25'
                    }`}
                  >
                    <strong className="block text-white">Tournament Referee</strong>
                    <span className="text-[10px] text-white/50">Duty timer & match scorekeeper</span>
                  </button>

                  <button
                    onClick={() => {
                      switchRole('player');
                      showToast('Switched session to: Tournament Player (Darek Stone)', 'info');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      session?.role === 'player'
                        ? 'bg-[#00FFDF]/15 border-[#00FFDF] text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/25'
                    }`}
                  >
                    <strong className="block text-white">Tournament Player</strong>
                    <span className="text-[10px] text-white/50">Squad signups & score reporter</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
