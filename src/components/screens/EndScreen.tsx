import { useGameStore } from '../../stores/gameStore';
import { endingById } from '../../data/story/endings';
import { achievementById } from '../../data/achievements';
import { PixelBackground } from '../scenes/PixelBackground';
import { PixelButton } from '../ui/PixelButton';
import { DialogueBox } from '../ui/DialogueBox';

const FAMILY_LABELS = { reussite: 'FIN — RÉUSSITE', parcours: 'FIN — PARCOURS', difficile: 'FIN' } as const;

export function EndScreen({ onReplay }: { onReplay: () => void }) {
  const store = useGameStore();
  const ending = store.endingId ? endingById(store.endingId) : null;
  if (!ending) return null;

  const bgKey = ending.family === 'reussite' ? 'ville_larochelle' : ending.family === 'parcours' ? 'caserne_exterior_jour' : 'arret_bus';

  return (
    <div className="relative w-full h-full overflow-hidden">
      <PixelBackground backgroundKey={bgKey} />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 overflow-y-auto">
        <div className="max-w-xl w-full">
          <div className="text-center mb-4">
            <div className="font-ui text-[10px] opacity-70 mb-1">{FAMILY_LABELS[ending.family]}</div>
            <h1 className="font-title text-accent-gold text-base sm:text-xl drop-shadow-[3px_3px_0_var(--pixel-shadow)]">
              {ending.title.toUpperCase()}
            </h1>
          </div>
          <DialogueBox text={ending.text} />
          {ending.cta && (
            <div className="pixel-panel p-3 mt-3 text-center">
              <p className="text-sm mb-1">{ending.cta}</p>
              <a href="https://www.le-smv.gouv.fr" target="_blank" rel="noreferrer" className="text-accent-gold underline text-sm">
                www.le-smv.gouv.fr
              </a>
            </div>
          )}
          <div className="pixel-panel p-3 mt-3 text-center text-[11px] opacity-80">
            Le SMV existe en huit régiments en France. Information officielle :{' '}
            <a href="https://www.le-smv.gouv.fr" target="_blank" rel="noreferrer" className="text-accent-gold underline">
              le-smv.gouv.fr
            </a>
          </div>

          {store.achievements.length > 0 && (
            <div className="mt-4">
              <h3 className="font-ui text-[11px] uppercase text-accent-gold mb-2 text-center">Médailles de ce parcours</h3>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {store.achievements.map((a) => {
                  const ach = achievementById(a);
                  return ach ? (
                    <span key={a} className="pixel-panel px-2 py-1 text-xs" title={ach.quote}>
                      {ach.icon} {ach.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="flex justify-center gap-3 mt-6">
            <PixelButton variant="primary" className="font-title text-[10px]" onClick={onReplay}>
              REJOUER
            </PixelButton>
            <PixelButton className="font-title text-[10px]" onClick={store.backToTitle}>
              MENU TITRE
            </PixelButton>
          </div>
          <p className="text-center font-ui text-[10px] opacity-60 mt-4">
            Fins découvertes : {store.meta.endingsSeen.length} / 12
          </p>
        </div>
      </div>
    </div>
  );
}
