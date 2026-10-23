import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { 
  TwitterIcon as Twitter, 
  YoutubeIcon as Youtube, 
  InstagramIcon as Instagram, 
  TwitchIcon as Tv 
} from '../components/BrandIcons';

export default function ContactPage() {
  const { queryParams, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (queryParams.inquiry) {
      setFormData(prev => ({ ...prev, inquiryType: queryParams.inquiry }));
    }
  }, [queryParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast('Your message has been sent to the Eternals team!', 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-gradient-to-b from-[#00FFDF]/10 via-transparent to-black text-center relative overflow-hidden">
        <div className="hero-glow"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#00FFDF] mb-3">
            <Mail size={14} />
            <span>Direct Communications</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white mb-4">
            Contact & Inquiries
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-paragraph max-w-2xl mx-auto">
            Whether you are looking to sponsor our rosters, apply as a player/creator, or request press credentials, our team is ready to connect.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 space-y-8">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">Get in Touch</h3>
                <p className="text-sm font-paragraph text-white/60 leading-relaxed">
                  We review incoming proposals, player submissions, and business inquiries daily.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00FFDF]/15 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF] shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white">Email Us</h4>
                    <a href="mailto:business@eternalsgg.com" className="text-sm text-[#00FFDF] hover:underline font-paragraph block">
                      business@eternalsgg.com
                    </a>
                    <span className="text-xs text-white/40">Guaranteed response within 24 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#7F27FF]/20 border border-[#7F27FF]/40 flex items-center justify-center text-[#7F27FF] shrink-0">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white">Direct Line</h4>
                    <a href="tel:240-230-7831" className="text-sm text-white/90 hover:text-[#00FFDF] font-paragraph block">
                      240-230-7831
                    </a>
                    <span className="text-xs text-white/40">Mon - Fri, 9 AM - 6 PM EST</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white">Headquarters</h4>
                    <p className="text-sm text-white/70 font-paragraph">
                      10440 Columbia Pike, Suite 100<br />
                      Silver Spring, MD 20904
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white/50 mb-4">
                  Social Channels
                </h4>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Twitter, href: 'https://twitter.com/eternalsgg', label: 'Twitter', color: 'hover:text-blue-400' },
                    { icon: Youtube, href: 'https://youtube.com/@eternalsgg', label: 'YouTube', color: 'hover:text-red-500' },
                    { icon: Tv, href: 'https://twitch.tv/eternalsgg', label: 'Twitch', color: 'hover:text-purple-400' },
                    { icon: Instagram, href: 'https://instagram.com/eternalsgg', label: 'Instagram', color: 'hover:text-pink-400' }
                  ].map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={idx}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 transition-all hover:bg-white/10 hover:-translate-y-0.5 ${s.color}`}
                        aria-label={s.label}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Send a Message</h3>
              <p className="text-sm font-paragraph text-white/60 mb-8">
                Fill in the details below and the designated department will review your submission.
              </p>

              {isSuccess ? (
                <div className="p-8 text-center bg-[#00FFDF]/10 border border-[#00FFDF]/30 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-[#00FFDF]/20 border border-[#00FFDF] flex items-center justify-center text-[#00FFDF] mx-auto mb-4 animate-bounce">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-2xl font-heading font-bold text-white mb-2">Message Dispatched!</h4>
                  <p className="text-sm font-paragraph text-white/70 max-w-md mx-auto mb-6">
                    Thank you for reaching out to EternalsGGs. A representative has received your ticket and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="btn-outline-primary py-2 px-6 text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-heading font-semibold text-white/70 mb-1.5 block">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Mercer"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-heading font-semibold text-white/70 mb-1.5 block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-heading font-semibold text-white/70 mb-1.5 block">
                        Inquiry Category
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                        className="input-field bg-[#080A0E] text-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="esports">Esports Team Tryout / Scrims</option>
                        <option value="creator">Creator Network Application</option>
                        <option value="sponsorship">Sponsorship & Brand Partnerships</option>
                        <option value="press">Press & Media Relations</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-heading font-semibold text-white/70 mb-1.5 block">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Brief summary of request"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-heading font-semibold text-white/70 mb-1.5 block">
                      Message Details
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Please include relevant VOD links, portfolio details, or brand deck links..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="input-field resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        <span>Transmitting...</span>
                      </span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
