import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldAlert, Award, Calendar, Package, LogOut, Check, ArrowRight } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, navigate, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    nickname: user?.name || 'Alex Mercer',
    title: user?.title || 'Organization Director',
    email: user?.email || 'admin@eternalsggs.com',
    discord: 'Vortex#1337',
    region: 'North America'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile dossier updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#7F27FF]/10 via-transparent to-black relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 relative z-10">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#00FFDF] p-1 bg-black shadow-[0_0_25px_rgba(0,255,223,0.3)]">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"} 
              alt={user?.name} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-heading font-black text-white">
                {profileData.nickname}
              </h1>
              <span className={user?.role === 'Admin' ? 'badge-secondary' : 'badge-primary'}>
                {user?.role || 'Member'}
              </span>
            </div>
            <p className="text-sm font-paragraph text-[#00FFDF] mb-1">
              {profileData.title}
            </p>
            <p className="text-xs text-white/50 font-mono">
              {profileData.email} • ID: #ETN-99824
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {user?.role === 'Admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <ShieldAlert size={14} />
                <span>Admin Dashboard</span>
              </button>
            )}
            <button
              onClick={() => logout()}
              className="p-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Main Profile Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Profile Details Form */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">Athlete Dossier</h3>
              <p className="text-xs text-white/50 font-paragraph">Your official organizational passport & tournament profile</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-outline-primary text-xs py-1.5 px-4"
            >
              {isEditing ? 'Cancel' : 'Edit Information'}
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60 mb-1 block">In-Game Handle / Nickname</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.nickname}
                  onChange={(e) => setProfileData({...profileData, nickname: e.target.value})}
                  className="input-field disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 mb-1 block">Title / Role</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.title}
                  onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                  className="input-field disabled:opacity-60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60 mb-1 block">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={profileData.email}
                  className="input-field opacity-60 bg-white/5 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 mb-1 block">Connected Discord Tag</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.discord}
                  onChange={(e) => setProfileData({...profileData, discord: e.target.value})}
                  className="input-field disabled:opacity-60"
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 flex justify-end">
                <button type="submit" className="btn-primary py-2.5 px-6 text-xs">
                  <Check size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={18} className="text-[#00FFDF]" />
              <h4 className="text-base font-heading font-bold text-white">Registered Tournaments</h4>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#00FFDF] font-semibold">Marvel Rivals Winter Showdown</span>
                <span className="badge-live">Confirmed</span>
              </div>
              <p className="text-xs text-white/50">Starts Nov 15, 2026 • Squad: Ghost Division</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package size={18} className="text-[#7F27FF]" />
              <h4 className="text-base font-heading font-bold text-white">Merch Order History</h4>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white font-semibold">Pro Jersey 2026 Edition (L)</span>
                <span className="text-[#00FFDF] font-mono">$69.99 USD</span>
              </div>
              <p className="text-xs text-white/50">Tracking: #ETN-88421 • Status: In Transit</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
