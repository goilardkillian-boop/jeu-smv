import { useEffect, useMemo, useRef, useState } from 'react';
import { useGameStore, engineState } from '../../stores/gameStore';
import { STORY } from '../../data/story';
import { buildContext, evalConditions } from '../../engine/gameEngine';
import { GAUGE_LABELS, NPC_META, type GaugeKey } from '../../engine/types';
import { PixelBackground } from '../scenes/PixelBackground';
import { CharacterSprite } from '../scenes/CharacterSprite';
import { DialogueBox } from '../ui/DialogueBox';
import { ChoicePanel } from '../ui/ChoicePanel';
import { QcmPanel } from '../ui/QcmPanel';
import { GamePanels } from '../ui/GamePanels';
import { RainEffect } from '../effects/RainEffect';

function gaugeColor(v: number) {
  if (v <= 20) return 'var(--smv-red)';
  if (v <= 40) return 'var(--smv-sand)';
  return 'var(--smv-green-light)';
}

interface BacklogEntry {
  speaker?: string;
  text: string;
}

export function GameScreen() {
  const store = useGameStore();
  const [panelsOpen, setPanelsOpen] = useState(false);
  const [backlogOpen, setBacklogOpen] = useState(false);
  const [textDone, setTextDone] = useState(false);
  const [forceComplete, setForceComplete] = useState(false);
  const backlog = useRef<BacklogEntry[]>([]);

  const node = STORY[store.nodeId];

  const es = useMemo(
    () => engineState(store),
    [store.nodeId, store.flags, store.gauges, store.relations, store.skills]
  );
  const ctx = useMemo(() => buildContext(es), [es]);

  const text = node ? (typeof node.text === 'function' ? node.text(ctx) : node.text) : '';

  useEffect(() => {
    setTextDone(false);
    setForceComplete(false);
    const last = backlog.current[backlog.current.length - 1];
    if (text && (!last || last.text !== text)) {
      backlog.current.push({ speaker: node?.speaker, text });
      if (backlog.current.length > 80) backlog.current.shift();
    }
  }, [store.nodeId]);

  if (!node || !store.sheet) return null;

  const availableChoices = node.choices?.filter((c) => evalConditions(c.conditions, es)) ?? [];
  const hasTimedChoice = availableChoices.some((c) => c.timed);
  const isRain = node.background.includes('rain') || node.sound?.includes('rain');
  const playerOutfit = node.playerOutfit;
  const canAdvance = !node.choices?.length && !node.qcm && textDone;
  const isCrisis = hasTimedChoice || node.music === 'doubt_crisis';

  // Tap n'importe où : 1er tap → révèle tout le texte ; 2e tap → avance.
  const onSceneTap = () => {
    if (panelsOpen || backlogOpen) return;
    if (!textDone) {
      setForceComplete(true);
      return;
    }
    if (canAdvance) store.advance();
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden scene-enter ${isCrisis && !textDone ? 'screen-shake' : ''}`}
      key={store.nodeId}
      onClick={onSceneTap}
    >
      <KeyboardControls
        onAdvance={() => {
          if (panelsOpen || backlogOpen) return;
          if (!textDone) setForceComplete(true);
          else if (canAdvance) store.advance();
        }}
        onMenu={() => setPanelsOpen((o) => !o)}
        onBacklog={() => setBacklogOpen((o) => !o)}
      />
      <PixelBackground backgroundKey={node.background} />
      {isRain && <RainEffect />}
      <div className="bottom-vignette" />

      {/* HUD : pastilles de jauges + menu (coins, zone 20% — règle des bords) */}
      <div className="absolute top-2 left-2 right-2 z-30 flex items-start justify-between gap-2 pointer-events-none">
        <div className="flex gap-1.5 flex-wrap pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {(Object.keys(GAUGE_LABELS) as GaugeKey[]).map((k) => {
            const v = store.gauges[k];
            return (
              <div
                key={k}
                className={`hud-pill ${v <= 20 ? 'danger' : ''}`}
                title={`${GAUGE_LABELS[k].label} : ${v}/100`}
                role="meter"
                aria-valuenow={v}
                aria-label={GAUGE_LABELS[k].label}
              >
                <span>{GAUGE_LABELS[k].icon}</span>
                <div className="bar">
                  <div style={{ width: `${v}%`, background: gaugeColor(v) }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-1.5 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          <div className="hud-pill" title="Semaine en cours">
            {store.week > 0 ? `SEM. ${store.week}` : 'AVANT'}
          </div>
          <button className="pixel-btn compact px-2.5 py-1 text-[10px]" onClick={() => setBacklogOpen(true)} title="Historique (H)">
            🕮
          </button>
          <button className="pixel-btn compact px-2.5 py-1 text-[10px]" onClick={() => setPanelsOpen(true)} title="Menu (Échap)">
            ☰
          </button>
        </div>
      </div>

      {/* Sprites — entrée animée, locuteur légèrement agrandi */}
      <div className="absolute inset-x-0 bottom-[33%] flex justify-center items-end gap-14 z-10 pointer-events-none">
        {node.npc && (
          <div key={`${node.npc}_${node.expression ?? ''}`} className="sprite-enter">
            <CharacterSprite
              npc={node.npc}
              expression={node.expression}
              scale={1.7}
              className="drop-shadow-[0_6px_8px_rgba(10,15,30,0.6)]"
            />
          </div>
        )}
        {playerOutfit && (
          <div className="sprite-enter">
            <CharacterSprite
              config={{ ...store.sheet.sprite, outfit: playerOutfit, expression: 'neutral' }}
              scale={1.6}
              className="drop-shadow-[0_6px_8px_rgba(10,15,30,0.6)] opacity-95"
            />
          </div>
        )}
      </div>

      {/* Zone basse : dialogue + choix / QCM */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-3 pb-4 sm:px-8 max-w-3xl mx-auto w-full flex flex-col gap-2.5 max-h-[62%] overflow-y-auto">
        <DialogueBox
          speaker={node.speaker}
          text={text}
          forceComplete={forceComplete}
          onComplete={() => setTextDone(true)}
          showCtc={canAdvance}
        />
        {node.kind === 'qcm' && node.qcm && textDone && (
          <div onClick={(e) => e.stopPropagation()}>
            <QcmPanel qcm={node.qcm} onFinish={store.finishQcm} />
          </div>
        )}
        {textDone && availableChoices.length > 0 && (
          <ChoicePanel choices={availableChoices} onChoose={store.choose} timed={hasTimedChoice} />
        )}
      </div>

      {/* Notifications de progression — en haut, sous le HUD, discrètes */}
      {store.notifications.length > 0 && (
        <div className="absolute top-12 right-2 z-30 flex flex-col items-end gap-1 pointer-events-none">
          {store.notifications.slice(0, 5).map((n, i) => (
            <div
              key={i}
              className="hud-pill notif-pop !text-[10px]"
              onAnimationEnd={i === 0 ? store.dismissNotifications : undefined}
            >
              {n.kind === 'achievement' ? '🏅 ' : ''}
              {n.label}
              {n.delta !== undefined && (
                <span style={{ color: n.delta > 0 ? 'var(--smv-green-light)' : 'var(--smv-red)' }}>
                  {n.delta > 0 ? `+${n.delta}` : n.delta}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {backlogOpen && (
        <div
          className="absolute inset-0 z-40 bg-pixel-shadow/85 flex items-center justify-center p-3"
          onClick={(e) => {
            e.stopPropagation();
            setBacklogOpen(false);
          }}
        >
          <div className="pixel-panel w-full max-w-xl h-[80vh] flex flex-col p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-title text-xs text-accent-gold">HISTORIQUE</h3>
              <button className="pixel-btn compact px-2 py-1 text-[10px]" onClick={() => setBacklogOpen(false)}>
                ✕ FERMER
              </button>
            </div>
            <div className="overflow-y-auto flex-1 flex flex-col gap-3 pr-1">
              {backlog.current.length <= 1 && <p className="opacity-60 text-base">L'histoire vient de commencer.</p>}
              {backlog.current.slice(0, -1).map((e, i) => (
                <div key={i} className="backlog-entry">
                  {e.speaker && <div className="who">{e.speaker}</div>}
                  <p className="text-lg leading-snug opacity-90">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {panelsOpen && <GamePanels onClose={() => setPanelsOpen(false)} />}
    </div>
  );
}

// Espace / Entrée : avancer · H : historique · Échap : menu
function KeyboardControls({
  onAdvance,
  onMenu,
  onBacklog
}: {
  onAdvance: () => void;
  onMenu: () => void;
  onBacklog: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onAdvance();
      } else if (e.key === 'Escape') {
        onMenu();
      } else if (e.key.toLowerCase() === 'h') {
        onBacklog();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onAdvance, onMenu, onBacklog]);
  return null;
}
