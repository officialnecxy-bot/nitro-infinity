import React, { useState } from 'react';
import { Share2, ShieldCheck, X, Github, Twitter, Instagram, Send, ExternalLink, Globe, Verified } from 'lucide-react';

const Header: React.FC = () => {
  const [showProfile, setShowProfile] = useState(false);

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <header className="flex justify-between items-center px-6 py-5 bg-transparent sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#06b6d4] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10">
          <Share2 size={20} className="text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight text-white leading-none">
            NITRO<span className="text-[#10b981]">X</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
             <ShieldCheck size={8} className="text-emerald-500/60" />
             <span className="text-[8px] text-white/30 font-bold uppercase tracking-[0.2em]">Infinity Engine</span>
          </div>
        </div>
      </div>
      
      {/* NECXY DEVELOPER Status Pill */}
      <button 
        onClick={() => setShowProfile(true)}
        className="flex items-center gap-2.5 px-4 py-2 glass-panel border border-white/5 rounded-full bg-white/[0.01] hover:bg-white/[0.05] active:scale-95 transition-all group"
      >
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-40" />
        </div>
        <div className="flex flex-col items-start">
           <span className="text-[9px] font-black text-white/60 uppercase tracking-widest leading-none group-hover:text-white transition-colors">NECXY</span>
           <span className="text-[7px] text-emerald-500/60 font-bold uppercase tracking-widest">DEVELOPER</span>
        </div>
      </button>

      {/* Developer Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowProfile(false)} />
          
          <div className="relative w-full max-w-[340px] glass-panel rounded-[3rem] border-white/10 bg-slate-950/90 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 overflow-hidden">
            {/* Tactical Backdrop Decoration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4">
               <div className="flex gap-1 opacity-20">
                 <div className="w-1 h-1 bg-white rounded-full" />
                 <div className="w-1 h-1 bg-white rounded-full" />
                 <div className="w-1 h-1 bg-white rounded-full" />
               </div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setShowProfile(false)}
              className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-20"
            >
              <X size={18} className="text-white/60" />
            </button>

            {/* Profile Content */}
            <div className="flex flex-col items-center text-center p-8 pt-12 relative z-10">
              {/* Avatar Section */}
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-[#10b981] to-[#06b6d4] p-0.5 shadow-2xl shadow-emerald-500/20 rotate-3">
                  <div className="w-full h-full rounded-[2.4rem] bg-slate-950 flex items-center justify-center overflow-hidden -rotate-3 transition-transform hover:rotate-0 duration-500">
                    <img 
                      src="https://i.ibb.co/p60vBVQF/87b925d23a03.png" 
                      alt="NECXY" 
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#020617] p-1 rounded-full border border-white/10">
                   <div className="bg-emerald-500 p-1.5 rounded-full shadow-lg shadow-emerald-500/50">
                     <Verified size={12} className="text-white" fill="currentColor" />
                   </div>
                </div>
              </div>

              {/* Identity */}
              <h2 className="text-3xl font-black text-white tracking-tighter mb-1">NECXY</h2>
              
              <div className="flex flex-col gap-1 mb-6 px-4">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.25em]">Android System Specialist</p>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-relaxed">
                  P2P Protocol Architect &<br/> Tactical Interface Designer
                </p>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

              {/* Bio Detail */}
              <p className="text-[11px] text-white/50 leading-relaxed font-medium px-2 mb-8 italic">
                "Pushing the boundaries of decentralized data architecture through performance-first engineering."
              </p>

              {/* Stats / Status HUD */}
              <div className="grid grid-cols-2 gap-3 w-full mb-8">
                <div className="glass-panel p-4 rounded-2xl border-white/5 bg-white/[0.02] flex flex-col items-center">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Clearance</span>
                  <span className="text-xs font-black text-white">LEVEL 09</span>
                </div>
                <div className="glass-panel p-4 rounded-2xl border-white/5 bg-white/[0.02] flex flex-col items-center">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Protocol</span>
                  <span className="text-xs font-black text-cyan-400">HYPER-P2P</span>
                </div>
              </div>

              {/* Social Link Grid */}
              <div className="grid grid-cols-3 gap-4 w-full">
                <button 
                  onClick={() => openLink('https://instagram.com/imwilliambutcher')}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center border-white/5 bg-white/[0.03] group-hover:bg-pink-500/10 group-hover:border-pink-500/30 transition-all">
                    <Instagram size={20} className="text-white/40 group-hover:text-pink-500" />
                  </div>
                  <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Instagram</span>
                </button>

                <button 
                  onClick={() => openLink('https://t.me/i_necxy')}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center border-white/5 bg-white/[0.03] group-hover:bg-sky-500/10 group-hover:border-sky-500/30 transition-all">
                    <Send size={20} className="text-white/40 group-hover:text-sky-400 translate-x-[-1px] translate-y-[1px]" />
                  </div>
                  <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Telegram</span>
                </button>

                <button 
                  onClick={() => openLink('https://twitter.com/i_necxy')}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center border-white/5 bg-white/[0.03] group-hover:bg-white/10 group-hover:border-white/30 transition-all">
                    <Twitter size={20} className="text-white/40 group-hover:text-white" />
                  </div>
                  <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Twitter</span>
                </button>
              </div>

              {/* Action */}
              <button 
                onClick={() => setShowProfile(false)}
                className="mt-10 w-full py-4 rounded-3xl bg-emerald-500 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Return to Link
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;