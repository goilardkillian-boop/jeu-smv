import { TRACK_TO_MOOD, YT_CHANNELS, type MusicMood } from './tracks';

// Lecteur musical YouTube — IFrame Player API (gratuite, sans clé).
// Le lecteur vit dans un conteneur monté par <MusicWidget/>. La lecture
// démarre au premier geste utilisateur (politique d'autoplay navigateur).

type YTPlayer = {
  loadVideoById: (id: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (v: number) => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: unknown) => YTPlayer; PlayerState: { PLAYING: number } };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Listener = (state: { mood: MusicMood | null; playing: boolean; ready: boolean }) => void;

class YouTubeMusic {
  private player: YTPlayer | null = null;
  private apiLoading = false;
  private container: HTMLElement | null = null;
  private currentMood: MusicMood | null = null;
  private pendingMood: MusicMood | null = null;
  private playing = false;
  private gestureArmed = false;
  private listeners = new Set<Listener>();
  volume = 35; // les radios lofi sont mixées fort : volume modéré par défaut
  muted = false;

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.snapshot());
    return () => this.listeners.delete(fn);
  }

  private snapshot() {
    return { mood: this.currentMood ?? this.pendingMood, playing: this.playing, ready: !!this.player };
  }

  private emit() {
    const s = this.snapshot();
    this.listeners.forEach((fn) => fn(s));
  }

  /** Monté par MusicWidget : l'élément qui accueillera l'iframe. */
  attach(container: HTMLElement) {
    this.container = container;
    if (this.pendingMood) this.ensurePlayer();
  }

  detach() {
    try {
      this.player?.destroy();
    } catch {
      /* iframe déjà retirée */
    }
    this.player = null;
    this.container = null;
    this.playing = false;
  }

  private loadApi() {
    if (window.YT?.Player) {
      this.createPlayer();
      return;
    }
    if (this.apiLoading) return;
    this.apiLoading = true;
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      this.createPlayer();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.onerror = () => {
      this.apiLoading = false; // hors-ligne : on retentera au prochain play
    };
    document.head.appendChild(tag);
  }

  private createPlayer() {
    if (this.player || !this.container || !window.YT?.Player) return;
    const mood = this.pendingMood ?? 'calm';
    this.player = new window.YT.Player(this.container, {
      width: '200',
      height: '112',
      videoId: YT_CHANNELS[mood].videoId,
      playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1 },
      events: {
        onReady: () => {
          this.player?.setVolume(this.volume);
          if (this.muted) this.player?.mute();
          this.currentMood = mood;
          this.player?.playVideo();
          this.emit();
        },
        onStateChange: (e: { data: number }) => {
          this.playing = e.data === window.YT?.PlayerState.PLAYING;
          this.emit();
        },
        onError: () => {
          // Vidéo indisponible : on ne casse rien, le jeu continue sans musique
          this.playing = false;
          this.emit();
        }
      }
    });
  }

  private ensurePlayer() {
    if (this.player || !this.container) return;
    this.loadApi();
  }

  /** L'autoplay est bloqué tant qu'aucun geste : on s'arme sur le prochain. */
  private armGesture() {
    if (typeof document === 'undefined') return; // environnement sans DOM (tests)
    if (this.gestureArmed) return;
    this.gestureArmed = true;
    const resume = () => {
      this.gestureArmed = false;
      if (this.pendingMood) this.ensurePlayer();
      this.player?.playVideo();
    };
    document.addEventListener('pointerdown', resume, { once: true });
  }

  playTrack(track: string) {
    const mood = TRACK_TO_MOOD[track] ?? 'calm';
    this.pendingMood = mood;
    if (!this.player) {
      this.ensurePlayer();
      this.armGesture();
      this.emit();
      return;
    }
    if (this.currentMood !== mood) {
      this.currentMood = mood;
      this.player.loadVideoById(YT_CHANNELS[mood].videoId);
    }
    this.player.playVideo();
    this.armGesture();
    this.emit();
  }

  stop() {
    this.pendingMood = null;
    this.player?.pauseVideo();
    this.playing = false;
    this.emit();
  }

  setVolume(v: number) {
    this.volume = Math.round(v);
    this.player?.setVolume(this.volume);
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (!this.player) return;
    if (m) this.player.mute();
    else this.player.unMute();
  }

  get currentLabel(): string | null {
    const mood = this.currentMood ?? this.pendingMood;
    return mood ? YT_CHANNELS[mood].label : null;
  }
}

export const youtubeMusic = new YouTubeMusic();
