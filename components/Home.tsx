import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
 // Agar pehle se nahi hai
import { Send, Download, Zap, EyeOff, Eye, Gauge, History, ArrowRight, Activity } from 'lucide-react';

interface HomeProps {
  onSend: () => void;
  onReceive: () => void;
  onHistory: () => void;
}
const socket = io("http://192.0.0.8:3001");
const Home: React.FC<HomeProps> = ({ onSend, onReceive, onHistory }) => {
  const [stealthMode, setStealthMode] = useState(false);
  const [turboBuffer, setTurboBuffer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
    useEffect(() => {
    // Ye line server se aane wali file ko pakdegi
    socket.on('file-receive', (fileData) => {
      console.log("File incoming from NitroX...");
      
      // Binary data ko asli file mein badalna (Blob)
      const blob = new Blob([fileData.data]);
      const url = window.URL.createObjectURL(blob);
      
      // Automatic download trigger
      const link = document.createElement('a');
      link.href = url;
      link.download = fileData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert("NitroX: File received and saved!");
    });

    // Cleanup taaki memory leak na ho
    return () => { socket.off('file-receive'); };
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
    const handleStart = () => {
    fileInputRef.current?.click(); 
  };
  const startTransmission = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result;
      
      // Asli data server ko bhej rahe hain
      socket.emit('file-raw', {
        name: selectedFile.name,
        data: buffer
      });

      alert("NitroX: File data streamed to server!");
    };
    reader.readAsArrayBuffer(selectedFile);
  };


  return (
    <div className="flex flex-col gap-5 py-4 h-full items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* PRIMARY ACTIONS - REDESIGNED DASHBOARD */}
      <div className="w-full max-w-[340px] flex flex-col gap-4">
        <input 
  type="file" 
  ref={fileInputRef} 
  className="hidden" 
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Alert hata kar ye dalo
    }
  }} 
/>
        {/* TACTICAL SEND BUTTON */}
        <button 
  onClick={selectedFile ? startTransmission : handleStart}
          className="w-full h-40 glass-panel rounded-[3rem] p-7 flex flex-col justify-between group hover:border-emerald-500/40 active:scale-[0.97] transition-all shadow-2xl shadow-black/60 border-white/5 relative overflow-hidden"
        >
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors" />
          
          <div className="flex justify-between items-start relative z-10 w-full">
            <div className="flex flex-col items-start">
              <span className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em] mb-1">Transmission</span>
<span className="text-4xl font-black tracking-tighter text-white group-hover:translate-x-1 transition-transform">
  {selectedFile ? selectedFile.name : "SEND"}
</span>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-3xl border border-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
              <Send size={28} className="text-emerald-500" strokeWidth={2.5} />
            </div>
          </div>

          <div className="flex items-center justify-between relative z-10 w-full">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
              <Zap size={10} className="text-emerald-500" />
              <span className="text-[8px] font-black tracking-[0.2em] text-white/40 uppercase">Hyperlink P2P Ready</span>
            </div>
            <div className="flex gap-1">
               {[1,2,3].map(i => (
                 <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-emerald-500 animate-pulse' : 'bg-white/10'}`} />
               ))}
            </div>
          </div>
        </button>

        {/* TACTICAL RECEIVE BUTTON */}
        <button 
          onClick={onReceive}
          className="w-full h-32 glass-panel rounded-[3rem] p-7 flex items-center justify-between group hover:border-cyan-500/40 active:scale-[0.97] transition-all shadow-2xl shadow-black/60 border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-start gap-1 relative z-10">
            <span className="text-[9px] font-black text-cyan-500/60 uppercase tracking-[0.3em]">Direct Link</span>
            <span className="text-2xl font-black tracking-tight text-white/90">RECEIVE</span>
            <div className="flex items-center gap-1.5 mt-1">
               <Activity size={8} className="text-cyan-500/40" />
               <span className="text-[8px] text-white/20 uppercase font-black tracking-widest">Listening...</span>
            </div>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
             <div className="bg-white/5 p-5 rounded-[2rem] border border-white/5 group-hover:bg-cyan-500/10 transition-colors relative z-10">
                <Download size={26} className="text-cyan-500" strokeWidth={2.5} />
             </div>
          </div>
        </button>
      </div>
      
      {/* SECONDARY DASHBOARD OPTIONS */}
      <div className="w-full max-w-[340px] grid grid-cols-2 gap-3">
        {/* STEALTH NODE TOGGLE */}
        <button 
          onClick={() => setStealthMode(!stealthMode)}
          className={`glass-panel rounded-[2.5rem] p-5 flex flex-col gap-4 transition-all border ${
            stealthMode ? 'border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.1)]' : 'border-white/5 bg-white/[0.01]'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className={`p-2.5 rounded-2xl ${stealthMode ? 'bg-cyan-500/20 text-cyan-500' : 'bg-white/5 text-white/20'}`}>
               {stealthMode ? <Eye size={16} /> : <EyeOff size={16} />}
            </div>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${stealthMode ? 'bg-cyan-500/30' : 'bg-white/10'}`}>
              <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${stealthMode ? 'right-1 bg-cyan-500 shadow-[0_0_8px_#06b6d4]' : 'left-1 bg-white/30'}`} />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Stealth Node</span>
            <span className={`text-[8px] font-black uppercase mt-0.5 tracking-wider transition-colors ${stealthMode ? 'text-cyan-500' : 'text-white/10'}`}>
              {stealthMode ? 'Active' : 'Public'}
            </span>
          </div>
        </button>

        {/* TURBO BUFFER TOGGLE */}
        <button 
          onClick={() => setTurboBuffer(!turboBuffer)}
          className={`glass-panel rounded-[2.5rem] p-5 flex flex-col gap-4 transition-all border ${
            turboBuffer ? 'border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/5 bg-white/[0.01]'
          }`}
        >
          <div className="flex justify-between items-center">
            <div className={`p-2.5 rounded-2xl ${turboBuffer ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-white/20'}`}>
               <Gauge size={16} />
            </div>
            <div className={`w-8 h-4 rounded-full relative transition-colors ${turboBuffer ? 'bg-emerald-500/30' : 'bg-white/10'}`}>
              <div className={`absolute top-1 w-2 h-2 rounded-full transition-all ${turboBuffer ? 'right-1 bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'left-1 bg-white/30'}`} />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Turbo Buffer</span>
            <span className={`text-[8px] font-black uppercase mt-0.5 tracking-wider transition-colors ${turboBuffer ? 'text-emerald-500' : 'text-white/10'}`}>
              {turboBuffer ? 'Extreme' : 'Balanced'}
            </span>
          </div>
        </button>

        {/* TRANSMISSION LOGS */}
        <button 
          onClick={onHistory}
          className="col-span-2 glass-panel rounded-[2.5rem] p-6 flex items-center justify-between border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] active:scale-[0.98] transition-all group"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white/5 rounded-[1.5rem] flex items-center justify-center border border-white/5 group-hover:border-white/20 transition-colors">
              <History size={20} className="text-white/40 group-hover:text-white/80 transition-colors" />
            </div>
            <div className="flex flex-col items-start">
               <span className="text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Archive Logs</span>
               <span className="text-[8px] text-white/20 font-bold uppercase tracking-widest mt-0.5">Session History v3.0</span>
            </div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
            <ArrowRight size={16} className="text-white/40" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;