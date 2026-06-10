import { useEffect, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useAudioStore } from '../../stores/audioStore';
import { PixelButton } from '../ui/PixelButton';
import { PixelBackground } from '../scenes/PixelBackground';
import { RainEffect } from '../effects/RainEffect';
import { getHfToken, setHfToken, clearHfToken } from '../../ai/imageGenerator';

export function TitleScreen({ onNewGame }: { onNewGame: () => void }) {
  const store = useGameStore();
  const audioStore = useAudioStore();
  const [warningAccepted, setWarningAccepted] = useState(false);
  const [tokenOpen, setTokenOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState('');

  useEffect(() => {
    void store.checkHasSave();
  }, []);

  if (!warningAccepted) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-ui-bg">
        <div className="pixel-panel max-w-lg p-6 text-center slide-up">
          <div className="font-title text-smv-red text-sm mb-4">⚠️ AVERTISSEMENT</div>
          <p className="dialogue-text text-left mb-4">
            Ce jeu est une fiction interactive librement inspirée du parcours proposé par le Service
            Militaire Volontaire.{'\n\n'}Les personnages, dialogues et situations sont fictifs. Certains
            événements ont été adaptés pour les besoins du récit.{'\n\n'}Ce jeu ne constitue pas un
            engagement contractuel ni une représentation officielle du dispositif SMV.
          </p>
          <p className="text-sm mb-5 opacity-80">
            Pour toute information officielle :{' '}
            <a href="https://www.le-smv.gouv.fr" target="_blank" rel="noreferrer" className="text-accent-gold underline">
              www.le-smv.gouv.fr
            </a>
          </p>
          <PixelButton variant="primary" className="font-title text-xs px-6 py-3" onClick={() => setWarningAccepted(true)}>
            COMMENCER L'AVENTURE
          </PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <PixelBackground backgroundKey="caserne_exterior_rain" />
      <RainEffect />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-10">
          <h1 className="font-title text-accent-gold text-xl sm:text-3xl leading-relaxed drop-shadow-[3px_3px_0_var(--pixel-shadow)]">
            UNE VIE À<br />CONSTRUIRE
          </h1>
          <p className="font-ui text-xs mt-3 opacity-80">3e Régiment du Service Militaire Volontaire · La Rochelle</p>
        </div>
        <div className="flex flex-col gap-3 w-64">
          <PixelButton variant="primary" className="font-title text-[10px] py-3 text-center" onClick={onNewGame}>
            NOUVELLE PARTIE{store.meta.completedOnce ? ' +' : ''}
          </PixelButton>
          {store.hasSave && (
            <PixelButton className="font-title text-[10px] py-3 text-center" onClick={() => void store.continueGame()}>
              CONTINUER
            </PixelButton>
          )}
          <PixelButton className="text-[10px] py-2 text-center" onClick={() => setTokenOpen(true)}>
            🎨 ASSETS IA {getHfToken() ? '(actif)' : '(off)'}
          </PixelButton>
          <PixelButton className="text-[10px] py-2 text-center" onClick={audioStore.toggleMute}>
            {audioStore.muted ? '🔇 SON COUPÉ' : '🔊 SON ACTIF'}
          </PixelButton>
        </div>
        {store.meta.endingsSeen.length > 0 && (
          <p className="font-ui text-[10px] mt-8 opacity-60">
            Fins découvertes : {store.meta.endingsSeen.length} / 12
          </p>
        )}
      </div>

      {tokenOpen && (
        <div className="absolute inset-0 z-40 bg-pixel-shadow/85 flex items-center justify-center p-4">
          <div className="pixel-panel max-w-md p-5">
            <h3 className="font-title text-xs mb-3 text-accent-gold">GÉNÉRATION IA (OPTIONNELLE)</h3>
            <p className="text-sm mb-3 opacity-80">
              Avec un token Hugging Face (gratuit), les décors sont générés en pixel art par IA et mis en
              cache. Sans token, le jeu utilise ses décors intégrés — il est 100% jouable.
            </p>
            <input
              className="w-full bg-pixel-shadow border-2 border-ui-border p-2 text-sm mb-3 text-smv-cream"
              placeholder="hf_..."
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              {getHfToken() && (
                <PixelButton variant="danger" className="text-[10px]" onClick={() => { clearHfToken(); setTokenOpen(false); }}>
                  DÉSACTIVER
                </PixelButton>
              )}
              <PixelButton className="text-[10px]" onClick={() => setTokenOpen(false)}>
                FERMER
              </PixelButton>
              <PixelButton
                variant="primary"
                className="text-[10px]"
                disabled={!tokenInput.startsWith('hf_')}
                onClick={() => {
                  setHfToken(tokenInput.trim());
                  setTokenOpen(false);
                }}
              >
                ENREGISTRER
              </PixelButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
