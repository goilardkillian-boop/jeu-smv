import { create } from 'zustand';
import { audio } from '../audio/audioManager';

interface AudioStore {
  muted: boolean;
  musicVolume: number;
  toggleMute: () => void;
  setMusicVolume: (v: number) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  muted: false,
  musicVolume: 0.5,
  toggleMute: () => {
    const muted = !get().muted;
    audio.setMuted(muted);
    set({ muted });
  },
  setMusicVolume: (v) => {
    audio.setMusicVolume(v);
    set({ musicVolume: v });
  }
}));
