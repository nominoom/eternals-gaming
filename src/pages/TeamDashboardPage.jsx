import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useClerkAuth } from '../services/clerkAuth';
import { 
  Users, 
  Share2, 
  CheckCircle2, 
  Cpu, 
  Trophy, 
  TrendingUp, 
  Save, 
  ExternalLink,
  Shield, 
  Radio, 
  Sparkles,
  RefreshCw,
  Sliders,
  DollarSign
} from 'lucide-react';
import { 
  TwitterIcon as Twitter, 
  YoutubeIcon as Youtube, 
  InstagramIcon as Instagram, 
  TwitchIcon as Tv 
} from '../components/BrandIcons';

export default function TeamDashboardPage() {
  const { players, setPlayers, showToast, stats, updateStat } = useApp();
  const { user, isLiveClerk } = useClerkAuth();

  // Find existing player matching current user, or select first player
  const activePlayer = players.find(p => p.playerTag === user?.playerTag || p.slug === 'vortex') || players[0];

  const [formData, setFormData] = useState({
    playerName: activePlayer?.playerName || '',
    playerTag: activePlayer?.playerTag || '',
    role: activePlayer?.role || '',
    teamName: activePlayer?.teamName || 'Eternals Apex Legends',
    division: activePlayer?.division || 'Apex Legends',
    region: activePlayer?.region || 'NA-CENTRAL',
    kdaRatio: activePlayer?.kdaRatio || '3.84',
    earnings: activePlayer?.earnings || '$142,500 EARNED',
    bio: activePlayer?.bio || '',
    hardware: activePlayer?.hardware || '',
    // Social Handles & Followers
    twitchUrl: activePlayer?.twitchUrl || '',
    twitchFollowers: activePlayer?.twitchFollowers || 14200,
    youtubeUrl: activePlayer?.youtubeUrl || '',
    youtubeSubscribers: activePlayer?.youtubeSubscribers || 8600,
    xUrl: activePlayer?.xUrl || '',
    xFollowers: activePlayer?.xFollowers || 9400,
    kickUrl: activePlayer?.kickUrl || '',
    kickFollowers: activePlayer?.kickFollowers || 4200,
    instagramUrl: activePlayer?.instagramUrl || '',
    instagramFollowers: activePlayer?.instagramFollowers || 6200,
    tiktokUrl: '',
    tiktokFollowers: 12500,
    discordTag: 'Vortex#0001'
  });

  // Calculate total following across all platforms
  const totalFollowing = 
    (parseInt(formData.twitchFollowers) || 0) +
    (parseInt(formData.youtubeSubscribers) || 0) +
    (parseInt(formData.xFollowers) || 0) +
    (parseInt(formData.kickFollowers) || 0) +
    (parseInt(formData.instagramFollowers) || 0) +
    (parseInt(formData.tiktokFollowers) || 0);

  const estimatedMonthlyReach = Math.round(totalFollowing * 2.8);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDossier = (e) => {
    e.preventDefault();

    setPlayers(prev => prev.map(p => {
      if (p._id === activePlayer._id) {
        return {
          ...p,
          ...formData,
          calculatedTotalFollowers: totalFollowing
        };
      }
      return p;
    }));

    // Update global aggregate followers in stats
    updateStat('totalFollowers', (stats.totalFollowers || 3680) + Math.round(totalFollowing / 100));

    showToast('Athlete Dossier and Social Aggregator synchronized successfully.', 'success');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black relative">
        <div className="max-w-[120rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00FFDF]/15 border border-[#00FFDF]/40 flex items-center justify-center text-[#00FFDF] shadow-[0_0_20px_rgba(0,255,223,0.3)]">
              <Users size={28} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00FFDF] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#00FFDF] animate-pulse"></span>
                <span>Team & Athlete Portal // Clerk Verified</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
                Team Dossier Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              Signed in as: <strong className="text-[#00FFDF]">{user?.name || activePlayer.playerName}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Aggregated Follower Telemetry Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 border-[#00FFDF]/30">
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
              <span>TOTAL CALCULATED AUDIENCE</span>
              <Share2 size={16} className="text-[#00FFDF]" />
            </div>
            <div className="text-4xl font-heading font-black text-white">
              {totalFollowing.toLocaleString()}
            </div>
            <div className="text-xs text-[#00FFDF] font-mono mt-1">
              Live aggregate across 6 connected channels
            </div>
          </div>

          <div className="glass-card p-6 border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
              <span>ESTIMATED MONTHLY REACH</span>
              <TrendingUp size={16} className="text-[#7F27FF]" />
            </div>
            <div className="text-4xl font-heading font-black text-[#c499ff]">
              {estimatedMonthlyReach.toLocaleString()}
            </div>
            <div className="text-xs text-white/50 font-mono mt-1">
              Impressions & broadcast views
            </div>
          </div>

          <div className="glass-card p-6 border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
              <span>COMPETITIVE PURSE</span>
              <DollarSign size={16} className="text-green-400" />
            </div>
            <div className="text-4xl font-heading font-black text-green-400">
              {formData.earnings}
            </div>
            <div className="text-xs text-white/50 font-mono mt-1">
              Sanctioned prize earnings
            </div>
          </div>

          <div className="glass-card p-6 border-white/10">
            <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
              <span>TOURNAMENT KDA</span>
              <Trophy size={16} className="text-amber-400" />
            </div>
            <div className="text-4xl font-heading font-black text-amber-400">
              {formData.kdaRatio}
            </div>
            <div className="text-xs text-white/50 font-mono mt-1">
              Average ratio across official cups
            </div>
          </div>
        </div>

        {/* Dashboard Grid: Editor on Left, Live Dossier Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form & Social Linker (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Social Channels & Follower Aggregator */}
            <div className="glass-card p-8 border-[#00FFDF]/25">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                    <Share2 size={18} className="text-[#00FFDF]" />
                    <span>Social Media Aggregator</span>
                  </h2>
                  <p className="text-xs text-white/60 font-paragraph mt-1">
                    Link your public streaming and social channels. The engine computes your combined network following for your athlete dossier.
                  </p>
                </div>
                <span className="badge-primary text-[10px]">Auto-Calculated</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Twitch */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#9146FF]">
                    <Tv size={14} />
                    <span>TWITCH CHANNEL</span>
                  </div>
                  <input 
                    type="text"
                    value={formData.twitchUrl}
                    onChange={(e) => handleInputChange('twitchUrl', e.target.value)}
                    placeholder="https://twitch.tv/username"
                    className="input-field text-xs mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono">Followers:</span>
                    <input 
                      type="number"
                      value={formData.twitchFollowers}
                      onChange={(e) => handleInputChange('twitchFollowers', e.target.value)}
                      className="bg-black/60 border border-white/15 rounded px-2 py-1 text-right text-white font-mono w-28"
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#FF0000]">
                    <Youtube size={14} />
                    <span>YOUTUBE CHANNEL</span>
                  </div>
                  <input 
                    type="text"
                    value={formData.youtubeUrl}
                    onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                    placeholder="https://youtube.com/@channel"
                    className="input-field text-xs mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono">Subscribers:</span>
                    <input 
                      type="number"
                      value={formData.youtubeSubscribers}
                      onChange={(e) => handleInputChange('youtubeSubscribers', e.target.value)}
                      className="bg-black/60 border border-white/15 rounded px-2 py-1 text-right text-white font-mono w-28"
                    />
                  </div>
                </div>

                {/* Twitter / X */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#00FFDF]">
                    <Twitter size={14} />
                    <span>TWITTER / X</span>
                  </div>
                  <input 
                    type="text"
                    value={formData.xUrl}
                    onChange={(e) => handleInputChange('xUrl', e.target.value)}
                    placeholder="https://x.com/handle"
                    className="input-field text-xs mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono">Followers:</span>
                    <input 
                      type="number"
                      value={formData.xFollowers}
                      onChange={(e) => handleInputChange('xFollowers', e.target.value)}
                      className="bg-black/60 border border-white/15 rounded px-2 py-1 text-right text-white font-mono w-28"
                    />
                  </div>
                </div>

                {/* Kick */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#53FC18]">
                    <Radio size={14} />
                    <span>KICK STREAM</span>
                  </div>
                  <input 
                    type="text"
                    value={formData.kickUrl}
                    onChange={(e) => handleInputChange('kickUrl', e.target.value)}
                    placeholder="https://kick.com/channel"
                    className="input-field text-xs mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono">Followers:</span>
                    <input 
                      type="number"
                      value={formData.kickFollowers}
                      onChange={(e) => handleInputChange('kickFollowers', e.target.value)}
                      className="bg-black/60 border border-white/15 rounded px-2 py-1 text-right text-white font-mono w-28"
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#E1306C]">
                    <Instagram size={14} />
                    <span>INSTAGRAM</span>
                  </div>
                  <input 
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
                    placeholder="https://instagram.com/handle"
                    className="input-field text-xs mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono">Followers:</span>
                    <input 
                      type="number"
                      value={formData.instagramFollowers}
                      onChange={(e) => handleInputChange('instagramFollowers', e.target.value)}
                      className="bg-black/60 border border-white/15 rounded px-2 py-1 text-right text-white font-mono w-28"
                    />
                  </div>
                </div>

                {/* TikTok & Discord */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-white/80">
                    <Share2 size={14} />
                    <span>TIKTOK & DISCORD</span>
                  </div>
                  <input 
                    type="text"
                    value={formData.discordTag}
                    onChange={(e) => handleInputChange('discordTag', e.target.value)}
                    placeholder="Discord Tag (e.g. Vortex#0001)"
                    className="input-field text-xs mb-2"
                  />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 font-mono">TikTok Followers:</span>
                    <input 
                      type="number"
                      value={formData.tiktokFollowers}
                      onChange={(e) => handleInputChange('tiktokFollowers', e.target.value)}
                      className="bg-black/60 border border-white/15 rounded px-2 py-1 text-right text-white font-mono w-28"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Operational Dossier & Hardware Rig Specs */}
            <div className="glass-card p-8 border-white/10">
              <h2 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2 pb-4 border-b border-white/10">
                <Sliders size={18} className="text-[#00FFDF]" />
                <span>Competitive Profile & Rig Telemetry</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">PLAYER TAG / CALLSIGN</label>
                  <input 
                    type="text"
                    value={formData.playerTag}
                    onChange={(e) => handleInputChange('playerTag', e.target.value)}
                    className="input-field font-heading font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">FULL NAME</label>
                  <input 
                    type="text"
                    value={formData.playerName}
                    onChange={(e) => handleInputChange('playerName', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">SIGNATURE ROLE</label>
                  <input 
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="e.g. ALGS IGL, Entry Fragger, Anchor"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-2">TEAM & DIVISION</label>
                  <select 
                    value={formData.division}
                    onChange={(e) => handleInputChange('division', e.target.value)}
                    className="input-field bg-[#0A0D14]"
                  >
                    <option value="Apex Legends">Apex Legends [ALGS]</option>
                    <option value="Warzone">Call of Duty: Warzone</option>
                    <option value="Marvel Rivals">Marvel Rivals</option>
                    <option value="Fortnite & Apex">Fortnite FNCS</option>
                    <option value="Content Creators">Content Creators Network</option>
                  </select>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-mono text-white/60 mb-2">HARDWARE RIG & PRO PERIPHERALS</label>
                <input 
                  type="text"
                  value={formData.hardware}
                  onChange={(e) => handleInputChange('hardware', e.target.value)}
                  placeholder="e.g. Logitech G Pro X Superlight 2 • Wooting 60HE • 360Hz Alienware"
                  className="input-field font-mono text-xs"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono text-white/60 mb-2">OPERATIONAL BIOGRAPHY</label>
                <textarea 
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="input-field text-sm"
                  placeholder="Competitive background, achievements, and tactical playstyle..."
                />
              </div>

              <button 
                onClick={handleSaveDossier}
                className="btn-primary w-full py-3.5 text-sm font-heading font-bold"
              >
                <Save size={16} />
                <span>Synchronize & Publish Dossier</span>
              </button>
            </div>

          </div>

          {/* Live Public Dossier Preview (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase text-[#00FFDF] tracking-wider flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>Public Dossier Live Preview</span>
                </h3>
                <span className="badge-live text-[10px]">Instant Reactive Sync</span>
              </div>

              {/* Dossier Card Preview */}
              <div className="glass-card overflow-hidden border-[#00FFDF]/40 shadow-2xl">
                <div className="relative h-64 bg-black overflow-hidden">
                  <img 
                    src={activePlayer.profilePicture} 
                    alt={formData.playerName} 
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] via-transparent to-transparent"></div>
                  <span className="badge-primary absolute top-4 left-4 text-[10px]">
                    {formData.division}
                  </span>
                  <span className="badge-secondary absolute top-4 right-4 text-[10px]">
                    {formData.region}
                  </span>
                </div>

                <div className="p-6 bg-[#080A0E] space-y-4">
                  <div>
                    <h4 className="text-2xl font-heading font-black text-white">
                      {formData.playerName} <span className="text-[#00FFDF]">"{formData.playerTag}"</span>
                    </h4>
                    <div className="text-xs font-mono text-[#00FFDF] uppercase mt-0.5">
                      {formData.role} • {formData.teamName}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-xl border border-white/10 text-xs">
                    <div>
                      <span className="text-white/50 block font-mono">Total Following:</span>
                      <strong className="text-white font-mono text-sm">{totalFollowing.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-white/50 block font-mono">Tournament Purse:</span>
                      <strong className="text-green-400 font-mono text-sm">{formData.earnings}</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-white/50 block mb-1">OPERATIONAL BIO</span>
                    <p className="text-xs text-white/70 line-clamp-3 leading-relaxed">
                      {formData.bio || 'Championship competitor dominating leaderboards and clutch storm circles.'}
                    </p>
                  </div>

                  {formData.hardware && (
                    <div className="text-xs font-mono text-white/70 bg-white/5 p-2.5 rounded-lg border border-white/10 flex items-center gap-2">
                      <Cpu size={14} className="text-[#00FFDF] shrink-0" />
                      <span className="truncate">{formData.hardware}</span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <span className="font-mono">Discord: {formData.discordTag}</span>
                    <span className="text-[#00FFDF] font-mono font-bold">VERIFIED DOSSIER</span>
                  </div>
                </div>
              </div>

              {/* Hostinger DB Status card */}
              <div className="glass-card p-5 border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-white/60">DATABASE REPLICATION</span>
                  <span className="text-green-400 font-bold">Hostinger MySQL Synced</span>
                </div>
                <p className="text-xs text-white/50 font-paragraph">
                  Changes made in this dashboard are staged locally and pushed to the Hostinger database schema upon synchronization.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
