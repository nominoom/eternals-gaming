import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Radio, 
  Play, 
  Tv, 
  FileText, 
  Flame, 
  Search, 
  ExternalLink,
  Volume2,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function MediaPage() {
  const { podcasts, mediaContent, setActiveAudioPodcast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Combine media and podcasts into unified list
  const unifiedMedia = [
    ...podcasts.map(p => ({
      _id: p._id,
      title: p.title,
      contentType: 'Podcast',
      description: p.description,
      date: p.publicationDate,
      duration: p.duration,
      thumbnail: p.thumbnail,
      audioUrl: p.audioUrl,
      episodeNumber: p.episodeNumber
    })),
    ...mediaContent.map(m => ({
      _id: m._id,
      title: m.title,
      contentType: m.contentType,
      description: m.description,
      date: m.publishDate,
      duration: m.duration,
      thumbnail: m.thumbnail,
      mediaUrl: m.mediaUrl
    }))
  ];

  const filteredMedia = unifiedMedia.filter(item => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'podcasts' ? item.contentType === 'Podcast' :
      activeTab === 'videos' ? (item.contentType === 'Video' || item.contentType.toLowerCase().includes('stream')) :
      activeTab === 'news' ? (item.contentType === 'News' || item.contentType.toLowerCase().includes('article')) :
      activeTab === 'highlights' ? (item.contentType === 'Highlight' || item.contentType.toLowerCase().includes('recap')) : true;

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#00FFDF] mb-3">
            <Radio size={14} />
            <span>Broadcasts & Originals</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-4">
            Media Center
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-2xl mx-auto mb-10">
            Tune in to official Eternals podcasts, match broadcasts, cinematic announcements, and high-energy community highlights.
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search episodes, videos, or articles..."
              className="input-field pl-11 pr-4 py-3"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Media', icon: Sparkles },
              { id: 'podcasts', label: 'Podcasts', icon: Radio },
              { id: 'videos', label: 'Videos & Streams', icon: Tv },
              { id: 'highlights', label: 'Highlights', icon: Flame },
              { id: 'news', label: 'News & Articles', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#00FFDF] text-black shadow-[0_0_15px_rgba(0,255,223,0.3)]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredMedia.length === 0 ? (
          <div className="glass-card p-16 text-center text-white/50 max-w-md mx-auto">
            No media matching "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item) => (
              <div 
                key={item._id}
                className="glass-card overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3">
                      <span className={item.contentType === 'Podcast' ? 'badge-secondary' : 'badge-primary'}>
                        {item.contentType}
                      </span>
                    </div>
                    {item.duration && (
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[11px] font-mono font-semibold text-white/90">
                        {item.duration}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-white/40 mb-2 font-paragraph">
                      <Calendar size={13} />
                      <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      {item.episodeNumber && (
                        <span>• Episode {item.episodeNumber}</span>
                      )}
                    </div>

                    <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[#00FFDF] transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm font-paragraph text-white/60 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  {item.contentType === 'Podcast' ? (
                    <button
                      onClick={() => setActiveAudioPodcast(item)}
                      className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                    >
                      <Play size={14} className="fill-black" />
                      <span>Play Episode</span>
                    </button>
                  ) : (
                    <a
                      href={item.mediaUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-white w-full py-2.5 text-xs flex items-center justify-center gap-2"
                    >
                      <Play size={14} className="fill-white" />
                      <span>Watch Broadcast</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
