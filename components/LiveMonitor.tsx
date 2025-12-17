import React from 'react';
import { X, Activity, HardDrive } from 'lucide-react';
import { TransferState } from '../types';

interface LiveMonitorProps {
  state: TransferState;
  onClose: () => void;
}

const LiveMonitor: React.FC<LiveMonitorProps> = ({ state, onClose }) => {
  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom-8 duration-500">
      <div className="glass-panel border-white/10 rounded-[2.5rem] p-6 shadow-2xl bg-slate-900/60">
        
        <div className="flex justify-between items-start mb-5 relative z-10">
          <div className="flex gap-4">
             <div className="w-14 h-14 glass-panel border-white/10 rounded-2xl flex items-center justify-center bg-emerald-500/10">
                <HardDrive size={24} className="text-emerald-500" />
             </div>
             <div className="flex flex-col justify-center">
                <span className="text-sm font-bold text-white/90 truncate max-w-[150px]">{state.fileName}</span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-0.5">{state.status}</span>
             </div>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
               <span className="text-xl font-bold text-white leading-none">{state.speed}</span>
               <div className="flex items-center gap-1 mt-1 opacity-20">
                  <Activity size={10} className="text-white" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Rate</span>
               </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <X size={16} className="text-white/30" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out" 
                style={{ width: `${state.progress}%` }}
              />
           </div>
           <div className="flex justify-between items-center px-1">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Aero Direct Link</span>
              <span className="text-[11px] text-emerald-500 font-bold">{state.progress}%</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitor;