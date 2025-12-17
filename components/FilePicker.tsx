import React, { useState } from 'react';
import { LayoutGrid, Camera, Play, Folder, Check, X, ArrowRight, Grid, Zap } from 'lucide-react';
import { FileItem } from '../types';

interface FilePickerProps {
  onCancel: () => void;
  onNext: () => void;
  selectedFiles: string[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

const TABS = [
  { id: 'APPS', icon: LayoutGrid },
  { id: 'PHOTOS', icon: Camera },
  { id: 'VIDEOS', icon: Play },
  { id: 'FILES', icon: Folder },
];

const MOCK_DATA: Record<string, FileItem[]> = {
  APPS: [
    { id: 'a1', name: 'NitroX Pro', size: '24MB', type: 'APP' },
    { id: 'a2', name: 'System Core', size: '156MB', type: 'APP' },
    { id: 'a3', name: 'Secure Vault', size: '68MB', type: 'APP' },
  ],
  PHOTOS: [
    { id: 'p1', name: 'IMG_4911.jpg', size: '4.2MB', type: 'PHOTO', thumbnail: 'https://picsum.photos/400/400?random=1' },
    { id: 'p2', name: 'IMG_4912.png', size: '1.5MB', type: 'PHOTO', thumbnail: 'https://picsum.photos/400/400?random=2' },
  ],
  VIDEOS: [
    { id: 'v1', name: 'Travel_Vlog.mp4', size: '450MB', type: 'VIDEO' },
  ],
  FILES: [
    { id: 'f1', name: 'Budget_2024.pdf', size: '120KB', type: 'FILE' },
  ]
};

const FilePicker: React.FC<FilePickerProps> = ({ onCancel, onNext, selectedFiles, setSelectedFiles }) => {
  const [activeTab, setActiveTab] = useState('APPS');

  const toggleFile = (id: string) => {
    setSelectedFiles(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white/[0.02] p-4 rounded-[2rem] border border-white/5">
        <button onClick={onCancel} className="p-3 glass-panel rounded-2xl hover:bg-white/10 transition-colors">
          <X size={20} className="text-white/60" />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">{selectedFiles.length} Selected</span>
        </div>
        <button 
          onClick={onNext}
          disabled={selectedFiles.length === 0}
          className="bg-emerald-500 px-6 py-3 rounded-2xl font-bold text-xs tracking-wider flex items-center gap-2 disabled:opacity-20 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all text-white"
        >
          Next <ArrowRight size={14} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-20 h-20 rounded-3xl transition-all border shrink-0 ${
                isActive 
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20' 
                  : 'glass-panel border-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              <Icon size={20} />
              <span className="text-[8px] font-bold tracking-widest mt-2">{tab.id}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 pb-10">
        {MOCK_DATA[activeTab].map(item => {
          const isSelected = selectedFiles.includes(item.id);
          return (
            <div 
              key={item.id}
              onClick={() => toggleFile(item.id)}
              className={`relative glass-panel p-4 rounded-[2rem] flex flex-col gap-3 transition-all active:scale-95 border-2 ${
                isSelected ? 'border-emerald-500 bg-emerald-500/5' : 'border-transparent'
              }`}
            >
              {item.thumbnail ? (
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                   <img src={item.thumbnail} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full aspect-square bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/5">
                   {item.type === 'APP' && <Grid size={32} className="text-emerald-500/20" />}
                   {item.type === 'VIDEO' && <Play size={32} className="text-emerald-500/20" />}
                   {item.type === 'FILE' && <Folder size={32} className="text-emerald-500/20" />}
                </div>
              )}
              
              <div className="flex flex-col px-1">
                <span className="text-[11px] font-bold truncate text-white/90">{item.name}</span>
                <span className="text-[9px] text-white/20 font-bold uppercase mt-1">{item.size}</span>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1.5 shadow-lg shadow-emerald-500/40">
                  <Check size={10} className="text-white" strokeWidth={4} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilePicker;