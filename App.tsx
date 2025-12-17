import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import FilePicker from './components/FilePicker';
import ConnectionView from './components/ConnectionView';
import LiveMonitor from './components/LiveMonitor';
import PermissionChecklist from './components/PermissionChecklist';
import HistoryView from './components/HistoryView';
import { TransferState, ViewType } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [transferState, setTransferState] = useState<TransferState | null>(null);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const mockAndroid = {
      startDiscovery: () => console.log("Java: Starting Discovery..."),
      startHost: () => console.log("Java: Starting Host..."),
      sendFile: (files: string[]) => console.log("Java: Sending files", files),
      openHistory: () => {
        console.log("Java: Opening History via Bridge");
        // We also trigger our internal view as a fail-safe
        setCurrentView(ViewType.HISTORY);
      },
    };
    (window as any).Android = (window as any).Android || mockAndroid;
  }, []);

  const handleSendClick = () => {
    if (!permissionsGranted) {
      setCurrentView(ViewType.CHECKLIST);
    } else {
      setCurrentView(ViewType.PICKER);
    }
  };

  const handleReceiveClick = () => {
    if (!permissionsGranted) {
      setCurrentView(ViewType.CHECKLIST);
    } else {
      setCurrentView(ViewType.CONNECTION);
      setTransferState({
        mode: 'RECEIVE',
        status: 'DISCOVERING',
        progress: 0,
        speed: '0 MB/s',
        fileName: 'Waiting for connection...'
      });
      (window as any).Android?.startHost();
    }
  };

  const handlePermissionsComplete = () => {
    setPermissionsGranted(true);
    setCurrentView(ViewType.HOME);
  };

  const handleHistoryOpen = () => {
    // Attempt bridge first, then fallback to UI
    if ((window as any).Android?.openHistory) {
      (window as any).Android.openHistory();
    } else {
      setCurrentView(ViewType.HISTORY);
    }
  };

  const startTransfer = () => {
    setCurrentView(ViewType.CONNECTION);
    setTransferState({
      mode: 'SEND',
      status: 'DISCOVERING',
      progress: 0,
      speed: '0 MB/s',
      fileName: 'Initializing...'
    });
    (window as any).Android?.startDiscovery();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden">
      {/* Background Accents (Emerald & Cyan) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#10b981] opacity-[0.05] blur-[160px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#06b6d4] opacity-[0.05] blur-[160px] pointer-events-none" />

      <Header />

      <main className="flex-1 overflow-y-auto pb-32 px-4 pt-2 relative z-10">
        {currentView === ViewType.HOME && (
          <Home 
            onSend={handleSendClick} 
            onReceive={handleReceiveClick} 
            onHistory={handleHistoryOpen}
          />
        )}

        {currentView === ViewType.CHECKLIST && (
          <PermissionChecklist onComplete={handlePermissionsComplete} />
        )}

        {currentView === ViewType.PICKER && (
          <FilePicker 
            onCancel={() => setCurrentView(ViewType.HOME)} 
            onNext={startTransfer}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        )}

        {currentView === ViewType.CONNECTION && (
          <ConnectionView 
            mode={transferState?.mode || 'SEND'} 
            onBack={() => setCurrentView(ViewType.HOME)}
            selectedCount={selectedFiles.length}
          />
        )}

        {currentView === ViewType.HISTORY && (
          <HistoryView onBack={() => setCurrentView(ViewType.HOME)} />
        )}
      </main>

      {transferState && (
        <LiveMonitor 
          state={transferState} 
          onClose={() => setTransferState(null)} 
        />
      )}
    </div>
  );
};

export default App;