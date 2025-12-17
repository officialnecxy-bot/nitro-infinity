import React from 'react';
import { ArrowLeft, History, CheckCircle2, XCircle, Share2, Download, Search, MoreVertical } from 'lucide-react';
import { HistoryItem } from '../types';

const MOCK_HISTORY: HistoryItem[] = [
  { id: 'h1', name: 'System_Image_v2.iso', size: '2.4 GB', date: '2 mins ago', status: 'SUCCESS', peer: 'Pixel_9_Pro', type: 'SEND' },
  { id: 'h2', name: 'DCIM_2024_03.zip', size: '840 MB', date: '1 hour ago', status: 'SUCCESS', peer: 'Galaxy_S24_Ultra', type: 'RECEIVE' },
  { id: 'h3', name: 'NitroX_Engine.apk', size: '45 MB', date: 'Yesterday', status: 'FAILED', peer: 'Unknown_Node', type: 'SEND' },
  { id: 'h4', name: 'Project_Alpha_Final.mp4', size: '1.2 GB', date: '2 days ago', status: 'SUCCESS', peer: 'MacBook_M3_Air', type: 'SEND' },
];

interface HistoryViewProps {
  onBack: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white/[0.02] p-4 rounded-[2rem] border border-white/5">
        <button onClick={onBack} className="p-3.5 glass-panel rounded-2xl hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} className="text-white/70" />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase">Archive</span>
            <span className="text-xs font-bold text-white/90">Transmission Logs</span>
        </div>
        <button className="p-3.5 glass-panel rounded-2xl hover:bg-white/10 transition-colors">
          <Search size={20} className="text-white/40" />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="glass-panel p-4 rounded-[2rem] border-white/5 bg-white/[0.01]">
           <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Total Transferred</span>
           <span className="text-lg font-bold text-white">4.8 GB</span>
        </div>
        <div className="glass-panel p-4 rounded-[2rem] border-white/5 bg-white/[0.01]">
           <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">Active Nodes</span>
           <span className="text-lg font-bold text-emerald-500">12 Nodes</span>
        </div>
      </div>

      {/* Log List */}
      <div className="flex flex-col gap-3 pb-10">
        {MOCK_HISTORY.map((item) => (
          <div key={item.id} className="glass-panel p-5 rounded-[2.5rem] border-white/5 bg-white/[0.01] flex items-center justify-between group hover:bg-white/[0.03] transition-all">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 ${
                item.type === 'SEND' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-cyan-500/10 text-cyan-500'
              }`}>
                {item.type === 'SEND' ? <Share2 size={20} /> : <Download size={20} />}
              </div>
              
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-white/90 truncate pr-2">{item.name}</span>
                <div className="flex items-center gap-2 mt-0.5">
                   <span className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{item.size}</span>
                   <div className="w-1 h-1 bg-white/10 rounded-full" />
                   <span className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{item.peer}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-1">
              {item.status === 'SUCCESS' ? (
                <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                   <CheckCircle2 size={10} className="text-emerald-500" />
                   <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Done</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                   <XCircle size={10} className="text-red-500" />
                   <span className="text-[8px] font-black text-red-500 uppercase tracking-widest">Err</span>
                </div>
              )}
              <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Mockup */}
      <div className="mt-4 p-8 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center opacity-30">
        <History size={32} className="text-white mb-3" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">End of Archive</p>
      </div>
    </div>
  );
};

export default HistoryView;