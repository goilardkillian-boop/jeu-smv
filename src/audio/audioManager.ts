import { Howl, Howler } from 'howler';
import { SYNTH_NOTES } from './tracks';
import { youtubeMusic } from './youtubePlayer';

// Trois couches : musique, ambiance, effets ponctuels.
//
// MUSIQUE — priorité automatique :
//   1. fichier local  /audio/music/<piste>.mp3  (si présent)
//   2. radio YouTube 24/7 (IFrame API, gratuit, sans clé) — si source 'youtube'
//   3. silence
// Sources ('smv_music_source') : 'youtube' (défaut, avec priorité locale),
// 'local' (fichiers uniquement), 'off'.
//
// EFFETS — /audio/sfx/<nom>.mp3 si présent, sinon bip WebAudio rétro.

export type MusicSource = 'youtube' | 'local' | 'off';
const MUSIC_SOURCE_KEY = 'smv_music_source';

export function getMusicSource(): MusicSource {
  const v = localStorage.getItem(MUSIC_SOURCE_KEY);
  if (v === 'local' || v === 'off') return v;
  return 'youtube';
}

export function setMusicSource(s: MusicSource) {
  localStorage.setItem(MUSIC_SOURCE_KEY, s);
}

class AudioManager {
  private music: Howl | null = null;
  private currentTrack: string | null = null;
  private failed = new Set<string>();
  private ctx: AudioContext | null = null;

  musicVolume = 0.5;
  sfxVolume = 0.6;
  muted = false;

  setMuted(m: boolean) {
    this.muted = m;
    Howler.mute(m);
    youtubeMusic.setMuted(m);
  }

  setMusicVolume(v: number) {
    this.musicVolume = v;
    this.music?.volume(v);
    youtubeMusic.setVolume(v * 100);
  }

  /** Changement de source à chaud : coupe l'ancienne, relance la piste courante. */
  switchMusicSource(source: MusicSource) {
    setMusicSource(source);
    const track = this.currentTrack;
    this.currentTrack = null;
    youtubeMusic.stop();
    this.music?.unload();
    this.music = null;
    if (track && source !== 'off') this.playMusic(track);
  }

  playMusic(track: string) {
    if (this.currentTrack === track) return;
    this.currentTrack = track;
    const source = getMusicSource();
    if (source === 'off') return;

    const localKey = `music/${track}`;
    if (this.failed.has(localKey)) {
      // pas de fichier local connu → YouTube si autorisé
      if (source === 'youtube') youtubeMusic.playTrack(track);
      return;
    }
    this.fadeOutCurrentHowl();
    const howl = new Howl({
      src: [`/audio/music/${track}.mp3`],
      loop: true,
      volume: 0,
      onloaderror: () => {
        this.failed.add(localKey);
        try {
          howl.unload();
        } catch {
          /* environnement sans backend audio */
        }
        if (this.currentTrack === track && source === 'youtube') youtubeMusic.playTrack(track);
      },
      onload: () => {
        if (this.currentTrack !== track) return;
        youtubeMusic.stop(); // le fichier local gagne sur la radio
        this.music = howl;
        howl.play();
        howl.fade(0, this.musicVolume, 800);
      }
    });
  }

  private fadeOutCurrentHowl() {
    if (!this.music) return;
    this.music.fade(this.music.volume() as number, 0, 600);
    const old = this.music;
    setTimeout(() => old.unload(), 700);
    this.music = null;
  }

  stopMusic() {
    this.currentTrack = null;
    youtubeMusic.stop();
    this.fadeOutCurrentHowl();
  }

  playSound(name: string) {
    if (this.muted) return;
    const localKey = `sfx/${name}`;
    if (!this.failed.has(localKey)) {
      const howl = new Howl({
        src: [`/audio/sfx/${name}.mp3`],
        volume: this.sfxVolume,
        onloaderror: () => {
          this.failed.add(localKey);
          try {
            howl.unload();
          } catch {
            /* environnement sans backend audio */
          }
          this.synthBeep(name);
        }
      });
      howl.play();
      return;
    }
    this.synthBeep(name);
  }

  private synthBeep(name: string) {
    const note = SYNTH_NOTES[name];
    if (!note) return;
    try {
      this.ctx ??= new AudioContext();
      const [freq, dur] = note;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square'; // timbre 8-bit
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(this.sfxVolume * 0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
      osc.connect(gain).connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    } catch {
      /* AudioContext indisponible : silence */
    }
  }
}

export const audio = new AudioManager();
