import { useEffect, useMemo, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { engineState } from '../../stores/gameStore';
import { STORY } from '../../data/story';
import { buildContext, evalConditions } from '../../engine/gameEngine';
import { GAUGE_LABELS, type GaugeKey } from '../../engine/types';
import { PixelBackground } from '../scenes/PixelBackground';
import { CharacterSprite } from '../scenes/CharacterSprite';
import { DialogueBox } from '../ui/DialogueBox';
import { ChoicePanel } from '../ui/ChoicePanel';
import { QcmPanel } from '../ui/QcmPanel';
import { GaugeMeter } from '../ui/GaugeMeter';
import { GamePanels } from '../ui/GamePanels';
import { RainEffect } from '../effects/RainEffect';

export function GameScreen() {
  const store = useGameStore();
  const [panelsOpen, setPanelsOpen] = useState(false);
  const [textDone, setTextDone] = useState(false);

  const node = STORY[store.nodeId];

  useEffect(() => setTextDone(false), [store.nodeId]);

  const es = useMemo(() => engineState(store), [store.nodeId, store.flags, store.gauges, store.relations, store.skills]);
  const ctx = useMemo(() => buildContext(es), [es]);

  if (!node || !store.sheet) return null;

  const text = typeof node.text === 'function' ? node.text(ctx) : node.text;
  const availableChoices = node.choices?.filter((c) => evalConditions(c.conditions, es)) ?? [];
  const hasTimedChoice = availableChoices.some((c) => c.timed);
  const isRain = node.background.includes('rain') || node.sound?.includes('rain');
  const playerOutfit = node.playerOutfit;

  const canAdvance = !node.choices?.length && !node.qcm && textDone;

  return (
    <div className="relative w-full h-full overflow-hidden scene-enter" key={store.nodeId}>
      <PixelBackground backgroundKey={node.background} />
      {isRain && <RainEffect />}

      {/* HUD jauges */}
      <div className="absolute top-2 left-2 right-2 z-30 flex items-start justify-between gap-2">
        <div className="pixel-panel px-3 py-2 flex gap-3 flex-wrap">
          {(Object.keys(GAUGE_LABELS) as GaugeKey[]).map((k) => (
            <GaugeMeter key={k} compact label={GAUGE_LABELS[k].label} icon={GAUGE_LABELS[k].icon} value={store.gauges[k]} />
          ))}
        </div>
        <div className="flex flex-col gap-1 items-end">
          <button className="pixel-btn px-3 py-1.5 text-[10px]" onClick={() => setPanelsOpen(true)}>
            ☰ MENU
          </button>
          <div className="pixel-panel px-2 py-0.5 font-ui text-[9px] opacity-80">
            {store.week > 0 ? `SEMAINE ${store.week}` : 'AVANT'}
          </div>
        </div>
      </div>

      {/* Sprites */}
      <div className="absolute inset-x-0 bottom-[34%] flex justify-center items-end gap-12 z-10 pointer-events-none">
        {node.npc && <CharacterSprite npc={node.npc} expression={node.expression} scale={1.6} className="drop-shadow-lg" />}
        {playerOutfit && (
          <CharacterSprite
            config={{ ...store.sheet.sprite, outfit: playerOutfit, expression: 'neutral' }}
            scale={1.6}
            className="drop-shadow-lg"
          />
        )}
      </div>

      {/* Zone basse : dialogue + choix / QCM */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-3 sm:px-8 max-w-3xl mx-auto w-full flex flex-col gap-2 max-h-[60%] overflow-y-auto">
        {node.kind === 'qcm' && node.qcm ? (
          <>
            <DialogueBox speaker={node.speaker} text={text} onComplete={() => setTextDone(true)} />
            {textDone && <QcmPanel qcm={node.qcm} onFinish={store.finishQcm} />}
          </>
        ) : (
          <>
            <DialogueBox speaker={node.speaker} text={text} onComplete={() => setTextDone(true)} />
            {textDone && availableChoices.length > 0 && (
              <ChoicePanel choices={availableChoices} onChoose={store.choose} timed={hasTimedChoice} />
            )}
            {canAdvance && (
              <button className="pixel-btn primary px-4 py-2 text-xs self-end slide-up" onClick={store.advance}>
                CONTINUER ▸
              </button>
            )}
          </>
        )}
      </div>

      {/* Notifications de progression */}
      {store.notifications.length > 0 && (
        <div className="absolute bottom-2 left-2 z-30 flex flex-col gap-1 pointer-events-none">
          {store.notifications.slice(0, 5).map((n, i) => (
            <div key={i} className="pixel-panel px-2 py-1 text-xs notif-pop" onAnimationEnd={i === 0 ? store.dismissNotifications : undefined}>
              {n.kind === 'achievement' ? '🏅 ' : ''}
              {n.label}
              {n.delta !== undefined && (
                <span className={n.delta > 0 ? 'text-smv-green-light' : 'text-smv-red'}>
                  {' '}
                  {n.delta > 0 ? `+${n.delta}` : n.delta}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {panelsOpen && <GamePanels onClose={() => setPanelsOpen(false)} />}
    </div>
  );
}
