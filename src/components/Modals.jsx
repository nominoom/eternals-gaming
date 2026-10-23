import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Trophy, 
  Radio, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Modals() {
  const { 
    checkoutModalOpen, 
    setCheckoutModalOpen, 
    cart, 
    cartTotal, 
    clearCart, 
    showToast,
    registrationModalTournament,
    setRegistrationModalTournament,
    activeAudioPodcast,
    setActiveAudioPodcast
  } = useApp();

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState('form'); // form | success
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex@eternalsgg.com',
    address: '10440 Columbia Pike, Suite 100',
    city: 'Silver Spring',
    country: 'United States',
    zip: '20904',
    cardNumber: '•••• •••• •••• 4242',
    exp: '12/28',
    cvv: '992'
  });

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCheckoutStep('success');
    clearCart();
    showToast('Order confirmed! Welcome to the Eternals collective.', 'success');
  };

  // Tournament Registration State
  const [teamRegData, setTeamRegData] = useState({
    teamName: '',
    captainName: '',
    captainEmail: '',
    discordTag: '',
    rosterMembers: '',
    agreedToRules: false
  });
  const [regSuccess, setRegSuccess] = useState(false);

  const handleTournamentRegSubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
    showToast(`Registered team "${teamRegData.teamName}" for ${registrationModalTournament.tournamentName}!`, 'success');
  };

  // Podcast Audio Player State
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      {/* CHECKOUT MODAL */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#080A0E] border border-[#00FFDF]/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#00FFDF] via-[#7F27FF] to-[#00FFDF]"></div>
            
            <button
              onClick={() => {
                setCheckoutModalOpen(false);
                setCheckoutStep('form');
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {checkoutStep === 'form' ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#00FFDF]/15 border border-[#00FFDF]/30 flex items-center justify-center text-[#00FFDF]">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Secure Checkout</h3>
                    <p className="text-xs text-white/50">Encrypted payment via Stripe Esports Commerce</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 flex justify-between items-center text-sm">
                  <span className="text-white/60">Total Amount Due</span>
                  <span className="text-lg font-heading font-extrabold text-[#00FFDF]">
                    ${cartTotal.toFixed(2)} USD
                  </span>
                </div>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">Email</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Shipping Address</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.address} 
                      onChange={e => setFormData({...formData, address: e.target.value})} 
                      className="input-field text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">City</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.city} 
                        onChange={e => setFormData({...formData, city: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">Country</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.country} 
                        onChange={e => setFormData({...formData, country: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">Postal Code</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.zip} 
                        onChange={e => setFormData({...formData, zip: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <label className="text-xs text-white/70 mb-1 block">Card Details (Demo Mode)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <input 
                          type="text" 
                          value={formData.cardNumber} 
                          readOnly 
                          className="input-field text-sm bg-white/5 font-mono" 
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          value={formData.exp} 
                          readOnly 
                          className="input-field text-sm bg-white/5 font-mono text-center" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/50 pt-2">
                    <ShieldCheck size={14} className="text-[#00FFDF]" />
                    <span>256-bit encrypted checkout. Tracking sent upon dispatch.</span>
                  </div>

                  <button type="submit" className="btn-primary w-full py-3 mt-4">
                    <span>Pay ${cartTotal.toFixed(2)} USD</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#00FFDF]/15 border border-[#00FFDF] flex items-center justify-center text-[#00FFDF] mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-white mb-2">Order Confirmed!</h3>
                <p className="text-sm text-white/60 font-paragraph mb-6 max-w-sm mx-auto">
                  Your order has been routed to our distribution center. Order ID: <span className="text-[#00FFDF] font-mono">#ETN-{Math.floor(100000 + Math.random() * 900000)}</span>.
                </p>
                <button
                  onClick={() => {
                    setCheckoutModalOpen(false);
                    setCheckoutStep('form');
                  }}
                  className="btn-outline-primary py-2.5 px-6"
                >
                  Return to Store
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOURNAMENT REGISTRATION MODAL */}
      {registrationModalTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#080A0E] border border-[#7F27FF]/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#7F27FF] via-[#00FFDF] to-[#7F27FF]"></div>

            <button
              onClick={() => {
                setRegistrationModalTournament(null);
                setRegSuccess(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {!regSuccess ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#7F27FF]/20 border border-[#7F27FF]/40 flex items-center justify-center text-[#7F27FF]">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Register Squad</h3>
                    <p className="text-xs text-[#00FFDF] font-medium">{registrationModalTournament.tournamentName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-5 text-xs">
                  <div>
                    <span className="text-white/40 block">Game Title</span>
                    <span className="font-semibold text-white">{registrationModalTournament.gamePlayed}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Prize Pool</span>
                    <span className="font-semibold text-[#00FFDF]">{registrationModalTournament.prizePool}</span>
                  </div>
                </div>

                <form onSubmit={handleTournamentRegSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Team Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Ghost Division" 
                      value={teamRegData.teamName} 
                      onChange={e => setTeamRegData({...teamRegData, teamName: e.target.value})} 
                      className="input-field text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">Captain Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Your full name or handle" 
                        value={teamRegData.captainName} 
                        onChange={e => setTeamRegData({...teamRegData, captainName: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/70 mb-1 block">Captain Discord</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="handle#0000" 
                        value={teamRegData.discordTag} 
                        onChange={e => setTeamRegData({...teamRegData, discordTag: e.target.value})} 
                        className="input-field text-sm" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Captain Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="captain@team.com" 
                      value={teamRegData.captainEmail} 
                      onChange={e => setTeamRegData({...teamRegData, captainEmail: e.target.value})} 
                      className="input-field text-sm" 
                    />
                  </div>

                  <div>
                    <label className="text-xs text-white/70 mb-1 block">Roster Player In-Game Tags</label>
                    <textarea 
                      required 
                      rows={2} 
                      placeholder="Player 1 (Captain), Player 2, Player 3, Player 4 (Sub)" 
                      value={teamRegData.rosterMembers} 
                      onChange={e => setTeamRegData({...teamRegData, rosterMembers: e.target.value})} 
                      className="input-field text-sm" 
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input 
                      type="checkbox" 
                      id="agree" 
                      required 
                      checked={teamRegData.agreedToRules} 
                      onChange={e => setTeamRegData({...teamRegData, agreedToRules: e.target.checked})} 
                      className="accent-[#00FFDF] rounded" 
                    />
                    <label htmlFor="agree" className="text-xs text-white/70 cursor-pointer">
                      I agree to the official competition rules and code of conduct.
                    </label>
                  </div>

                  <button type="submit" className="btn-secondary w-full py-3 mt-3">
                    <Trophy size={16} />
                    <span>Confirm Team Registration</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#7F27FF]/20 border border-[#7F27FF] flex items-center justify-center text-[#7F27FF] mx-auto mb-4 animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-white mb-2">Registration Locked In!</h3>
                <p className="text-sm text-white/60 font-paragraph mb-6 max-w-sm mx-auto">
                  Your team has been seeded in the roster. Join the official tournament Discord for check-in on match day.
                </p>
                <button
                  onClick={() => {
                    setRegistrationModalTournament(null);
                    setRegSuccess(false);
                  }}
                  className="btn-outline-secondary py-2.5 px-6"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FLOATING PODCAST AUDIO PLAYER */}
      {activeAudioPodcast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4">
          <div className="bg-[#080A0E]/95 border border-[#00FFDF]/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10 relative">
              <img 
                src={activeAudioPodcast.thumbnail} 
                alt={activeAudioPodcast.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Radio size={16} className="text-[#00FFDF] animate-pulse" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-heading font-bold text-[#00FFDF] tracking-wider uppercase">
                Now Playing: Episode {activeAudioPodcast.episodeNumber}
              </span>
              <h4 className="text-sm font-heading font-bold text-white truncate">
                {activeAudioPodcast.title}
              </h4>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00FFDF] to-[#7F27FF] h-full w-2/5 animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-[#00FFDF] text-black flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <button
                onClick={() => setActiveAudioPodcast(null)}
                className="p-2 text-white/50 hover:text-white transition-colors"
                title="Close Player"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
