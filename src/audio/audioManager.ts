import { Howl, Howler } from 'howler';
import { SYNTH_NOTES } from './tracks';

// Trois couches : musique (boucle), ambiance, effets ponctuels.
// Si un fichier /audio/<nom>.mp3 manque, fallback : silence pour la
// musique, petit bip WebAudio rétro pour les effets connus.
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
  }

  setMusicVolume(v: number) {
    this.musicVolume = v;
    this.music?.volume(v);
  }

  playMusic(track: string) {
    if (this.currentTrack === track) return;
    this.currentTrack = track;
    this.music?.fade(this.music.volume() as number, 0, 600);
    const old = this.music;
    setTimeout(() => old?.unload(), 700);
    this.music = null;
    if (this.failed.has(track)) return;
    const howl = new Howl({
      src: [`/audio/${track}.mp3`],
      loop: true,
      volume: 0,
      onloaderror: () => {
        this.failed.add(track);
        try {
          howl.unload();
        } catch {
          /* environnement sans backend audio */
        }
      },
      onload: () => {
        if (this.currentTrack !== track) return;
        this.music = howl;
        howl.play();
        howl.fade(0, this.musicVolume, 800);
      }
    });
  }

  stopMusic() {
    this.currentTrack = null;
    this.music?.fade(this.music.volume() as number, 0, 400);
    const old = this.music;
    setTimeout(() => old?.unload(), 500);
    this.music = null;
  }

  playSound(name: string) {
    if (this.muted) return;
    if (!this.failed.has(name)) {
      const howl = new Howl({
        src: [`/audio/${name}.mp3`],
        volume: this.sfxVolume,
        onloaderror: () => {
          this.failed.add(name);
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
