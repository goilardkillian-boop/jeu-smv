import { useEffect, useRef, useState } from 'react';
import { youtubeMusic } from '../../audio/youtubePlayer';
import { useAudioStore } from '../../stores/audioStore';

// Mini-lecteur YouTube flottant : héberge l'iframe (toujours montée pour
// que la musique continue), repliable en badge ♪. La musique vient de
// radios 24/7 libres d'écoute — le lecteur reste visible et cliquable.
export function MusicWidget() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState({ mood: null as string | null, playing: false, ready: false });
  const muted = useAudioStore((s) => s.muted);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const musicSource = useAudioStore((s) => s.musicSource);

  useEffect(() => {
    // Le conteneur enfant est remplacé par l'iframe YT : on en crée un dédié.
    const host = hostRef.current;
    if (!host) return;
    const slot = document.createElement('div');
    host.appendChild(slot);
    youtubeMusic.attach(slot);
    const unsub = youtubeMusic.subscribe((s) => setState({ ...s }));
    return () => {
      unsub();
      youtubeMusic.detach();
      host.innerHTML = '';
    };
  }, []);

  const visible = musicSource === 'youtube';

  return (
    <div className={`fixed bottom-2 right-2 z-50 flex flex-col items-end gap-1 ${visible ? '' : 'pointer-events-none opacity-0'}`}>
      <div
        className="pixel-panel overflow-hidden"
        style={{ width: expanded && visible ? 200 : 0, height: expanded && visible ? 112 : 0 }}
      >
        <div ref={hostRef} />
      </div>
      <div className="flex gap-1">
        {expanded && (
          <span className="pixel-panel px-2 py-1 font-ui text-[9px] opacity-80 self-center max-w-44 truncate">
            {youtubeMusic.currentLabel ?? 'Radio'}
          </span>
        )}
        <button className="pixel-btn px-2 py-1 text-[11px]" onClick={toggleMute} title={muted ? 'Activer le son' : 'Couper le son'}>
          {muted ? '🔇' : '🔊'}
        </button>
        <button
          className="pixel-btn px-2 py-1 text-[11px]"
          onClick={() => setExpanded(!expanded)}
          title="Musique : radio YouTube"
        >
          {state.playing ? '♪' : '♪̶'} {expanded ? '▾' : '▴'}
        </button>
      </div>
    </div>
  );
}
