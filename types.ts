export enum ViewType {
  HOME = 'HOME',
  PICKER = 'PICKER',
  CHECKLIST = 'CHECKLIST',
  CONNECTION = 'CONNECTION',
  TRANSFERRING = 'TRANSFERRING',
  HISTORY = 'HISTORY'
}

export interface TransferState {
  mode: 'SEND' | 'RECEIVE';
  status: 'DISCOVERING' | 'TRANSFERRING' | 'COMPLETED';
  progress: number;
  speed: string;
  fileName: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'APP' | 'PHOTO' | 'VIDEO' | 'FILE';
  thumbnail?: string;
}

export interface HistoryItem {
  id: string;
  name: string;
  size: string;
  date: string;
  status: 'SUCCESS' | 'FAILED';
  peer: string;
  type: 'SEND' | 'RECEIVE';
}