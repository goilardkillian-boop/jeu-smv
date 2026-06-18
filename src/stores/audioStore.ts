import { create } from 'zustand';
import { audio, getMusicSource, type MusicSource } from '../audio/audioManager';

interface AudioStore {
  muted: boolean;
  musicVolume: number;
  musicSource: MusicSource;
  toggleMute: () => void;
  setMusicVolume: (v: number) => void;
  setMusicSource: (s: MusicSource) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  muted: false,
  musicVolume: 0.5,
  musicSource: getMusicSource(),
  toggleMute: () => {
    const muted = !get().muted;
    audio.setMuted(muted);
    set({ muted });
  },
  setMusicVolume: (v) => {
    audio.setMusicVolume(v);
    set({ musicVolume: v });
  },
  setMusicSource: (s) => {
    audio.switchMusicSource(s);
    set({ musicSource: s });
  }
}));
