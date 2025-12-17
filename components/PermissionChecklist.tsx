import React, { useState } from 'react';
import { MapPin, Wifi, Bluetooth, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface PermissionChecklistProps {
  onComplete: () => void;
}

const PermissionChecklist: React.FC<PermissionChecklistProps> = ({ onComplete }) => {
  const [status, setStatus] = useState({ gps: true, wifi: true, bt: false });

  const toggleStatus = (key: keyof typeof status) => {
    setStatus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allReady = status.gps && status.wifi && status.bt;

  return (
    <div className="flex flex-col gap-6 py-4 h-full animate-in fade-in slide-in-from-bottom-8">
      <div className="text-center space-y-2 mb-4">
        <div className="flex justify-center mb-3">
           <div className="bg-emerald-500/10 p-5 rounded-[2rem] border border-emerald-500/20">
             <ShieldCheck size={40} className="text-emerald-500" />
           </div>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">Setup <span className="text-emerald-500">Access</span></h2>
        <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase">Connectivity Validation</p>
      </div>

      <div className="space-y-3">
        {[
          { id: 'gps', label: 'Positioning', icon: MapPin, desc: 'Node Discovery' },
          { id: 'wifi', label: 'WiFi Module', icon: Wifi, desc: 'High Bandwidth Link' },
          { id: 'bt', label: 'Bluetooth', icon: Bluetooth, desc: 'Handshake Signal' },
        ].map(item => {
          const Icon = item.icon;
          const isReady = status[item.id as keyof typeof status];
          return (
            <div 
              key={item.id}
              onClick={() => toggleStatus(item.id as keyof typeof status)}
              className={`glass-panel p-5 rounded-[2rem] flex items-center justify-between border transition-all cursor-pointer ${
                isReady ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl ${isReady ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-white/20'}`}>
                  <Icon size={22} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold ${isReady ? 'text-white' : 'text-white/40'}`}>{item.label}</span>
                  <span className="text-[10px] font-bold text-white/20 uppercase mt-0.5">{item.desc}</span>
                </div>
              </div>
              {isReady && <CheckCircle2 size={20} className="text-emerald-500" />}
              {!isReady && <AlertCircle size={20} className="text-white/10" />}
            </div>
          );
        })}
      </div>

      <button 
        onClick={onComplete}
        disabled={!allReady}
        className={`w-full py-5 rounded-[2rem] font-bold text-xs tracking-widest transition-all ${
          allReady 
            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 active:scale-95' 
            : 'bg-white/5 text-white/20 cursor-not-allowed'
        }`}
      >
        Complete Setup
      </button>
    </div>
  );
};

export default PermissionChecklist;