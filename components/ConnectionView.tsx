import React, { useState, useMemo, useEffect } from 'react';
import { QrCode, Scan, ArrowLeft, Radio, Globe, Layers, Maximize2, Terminal, ShieldCheck } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

interface ConnectionViewProps {
  mode: 'SEND' | 'RECEIVE';
  onBack: () => void;
  selectedCount?: number;
}

const ConnectionView: React.FC<ConnectionViewProps> = ({ mode, onBack, selectedCount = 0 }) => {
  const [showAction, setShowAction] = useState(false);
  const [handshakeProgress, setHandshakeProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHandshakeProgress(prev => (prev < 98 ? prev + Math.random() * 4 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const connectionInfo = useMemo(() => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    return `nitrox://direct-node?id=${randomId}&sig=AES_GCM`;
  }, []);

  return (
    <div className="flex flex-col items-center h-full min-h-[80vh] animate-in zoom-in-95 duration-500 pb-8 px-2">
      
      {/* Top Controls Area */}
      <div className="w-full space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="p-3.5 glass-panel rounded-2xl hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} className="text-white/70" />
          </button>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
              Secured Channel
            </span>
          </div>
        </div>

        {/* TOP ACTION BUTTON (Requested: Scanner/QR button at top) */}
        <button 
          onClick={() => setShowAction(!showAction)}
          className={`w-full py-4 rounded-3xl flex items-center justify-between px-6 transition-all duration-300 active:scale-[0.98] ${
            showAction 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 border-transparent' 
            : 'glass-panel border-white/10 text-white/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${showAction ? 'bg-white/20' : 'bg-emerald-500/10'}`}>
               {mode === 'SEND' ? <Scan size={18} /> : <QrCode size={18} />}
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase">
              {mode === 'SEND' 
                ? (showAction ? 'Close Optical Scanner' : 'Initiate QR Scan') 
                : (showAction ? 'Hide Access Key' : 'Generate Access QR')}
            </span>
          </div>
          <Maximize2 size={16} className={`opacity-40 transition-transform ${showAction ? 'rotate-90 scale-110' : ''}`} />
        </button>
      </div>

      {/* Main Visual Center Area */}
      <div className="flex-1 w-full flex items-center justify-center relative mb-8">
        {!showAction ? (
          <div className="radar-container relative flex items-center justify-center scale-110">
            <div className="radar-grid"></div>
            <div className="radar-sweeper"></div>
            
            <div className="absolute inset-[-15%] rounded-full border border-emerald-500/10 animate-[ping_4s_linear_infinite]" />
            
            <div className="relative z-20 w-36 h-36 bg-[#020617] rounded-full flex items-center justify-center shadow-2xl border border-emerald-500/20">
               {mode === 'SEND' ? (
                 <Radio size={54} className="text-emerald-500 animate-pulse" />
               ) : (
                 <Globe size={54} className="text-emerald-500 animate-[spin_10s_linear_infinite]" />
               )}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[320px] aspect-square animate-in zoom-in-75 duration-300">
            {mode === 'RECEIVE' ? (
              <div className="w-full h-full glass-panel rounded-[3rem] p-8 border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center justify-center gap-6 relative overflow-hidden shadow-2xl">
                <div className="bg-white p-5 rounded-3xl shadow-xl">
                  <QRCodeCanvas value={connectionInfo} size={160} level="H" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Aero Handshake ID</span>
                  <p className="text-[11px] font-mono text-white/30 mt-1 uppercase">NODE-{connectionInfo.split('=')[1]}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full glass-panel rounded-[3rem] p-4 border-emerald-500/20 bg-black/60 relative overflow-hidden flex flex-col items-center justify-center">
                 {/* Precision Viewfinder */}
                 <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-emerald-500 rounded-tl-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-emerald-500 rounded-tr-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-emerald-500 rounded-bl-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-emerald-500 rounded-br-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 
                 <div className="absolute inset-12 border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
                   <div className="w-full h-1 bg-emerald-500/80 shadow-[0_0_20px_#10b981] absolute opacity-80" style={{ animation: 'scan-line 2s ease-in-out infinite' }}></div>
                   <Scan size={64} className="text-emerald-500 opacity-5" />
                 </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Terminal HUD - Simplified */}
      <div className="w-full max-w-sm space-y-4">
        <div className="glass-panel border-white/5 p-6 rounded-[2.5rem] bg-black/40">
          <div className="flex justify-between items-end mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-emerald-500" />
                <h3 className="text-[11px] font-bold text-white/80 tracking-widest uppercase">System Handshake</h3>
              </div>
              <p className="text-[9px] text-white/20 font-bold tracking-widest uppercase">Direct Link Layer</p>
            </div>
            <span className="text-2xl font-bold text-white/90">{Math.round(handshakeProgress)}%</span>
          </div>

          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${handshakeProgress}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Signal', val: '-42 dBm' },
              { label: 'Status', val: 'Scanning' },
              { label: 'Cipher', val: 'AES-256' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.03] p-3 rounded-2xl flex flex-col items-center gap-1 border border-white/5">
                <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</span>
                <span className="text-[10px] font-bold text-white/70">{stat.val}</span>
              </div>
            ))}
          </div>
        </div>

        {mode === 'SEND' && !showAction && (
          <div className="flex items-center justify-between px-7 py-5 glass-panel rounded-[2rem] border border-emerald-500/10 bg-emerald-500/5">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 p-3 rounded-xl">
                <Layers size={18} className="text-emerald-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-white/90 tracking-tight uppercase">Assets Prepared</span>
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-tight">{selectedCount} Items in buffer</span>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionView;