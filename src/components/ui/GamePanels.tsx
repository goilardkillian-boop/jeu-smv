import { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import {
  ATTRIBUTE_LABELS,
  GAUGE_LABELS,
  NPC_META,
  SKILL_META,
  type AttributeKey,
  type GaugeKey,
  type NpcKey,
  type SkillDomain,
  type SkillKey
} from '../../engine/types';
import { GaugeMeter } from './GaugeMeter';
import { itemById } from '../../data/items';
import { ACHIEVEMENTS } from '../../data/achievements';
import { MISSIONS } from '../../data/missions';
import { traitById } from '../../data/traits';
import { PixelButton } from './PixelButton';

type Tab = 'stats' | 'skills' | 'relations' | 'inventory' | 'journal' | 'missions' | 'achievements';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'stats', label: 'Profil', icon: '👤' },
  { id: 'skills', label: 'Compétences', icon: '📊' },
  { id: 'relations', label: 'Relations', icon: '🤝' },
  { id: 'missions', label: 'Missions', icon: '🎯' },
  { id: 'inventory', label: 'Inventaire', icon: '🎒' },
  { id: 'journal', label: 'Journal', icon: '📓' },
  { id: 'achievements', label: 'Médailles', icon: '🏅' }
];

const SKILL_DOMAINS: { id: SkillDomain; label: string }[] = [
  { id: 'militaire', label: 'MILITAIRE' },
  { id: 'academique', label: 'ACADÉMIQUE' },
  { id: 'professionnel', label: 'PROFESSIONNEL' },
  { id: 'social', label: 'SOCIAL / ÉMOTIONNEL' },
  { id: 'autonomie', label: 'SURVIE / AUTONOMIE' }
];

function skillLevel(v: number): string {
  if (v >= 100) return '⭐ Maîtrise';
  if (v >= 75) return '🔴 Expert';
  if (v >= 50) return '🟠 Avancé';
  if (v >= 25) return '🟡 Inter.';
  return '🔵 Débutant';
}

export function GamePanels({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('stats');
  const s = useGameStore();
  if (!s.sheet) return null;

  return (
    <div className="absolute inset-0 z-40 bg-pixel-shadow/85 flex items-center justify-center p-3" onClick={onClose}>
      <div
        className="pixel-panel w-full max-w-2xl h-[85vh] flex flex-col p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap gap-1 mb-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`pixel-btn px-2 py-1 text-[10px] ${tab === t.id ? '!bg-smv-green' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
          <button className="pixel-btn px-2 py-1 text-[10px] ml-auto danger" onClick={onClose}>
            ✕ FERMER
          </button>
        </div>

        <div className="overflow-y-auto flex-1 pr-1">
          {tab === 'stats' && (
            <div>
              <h3 className="font-title text-xs mb-3 text-accent-gold">
                {s.sheet.name.toUpperCase()} · {s.sheet.age} ANS · SEMAINE {s.week}
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {(Object.keys(GAUGE_LABELS) as GaugeKey[]).map((k) => (
                  <GaugeMeter key={k} label={GAUGE_LABELS[k].label} icon={GAUGE_LABELS[k].icon} value={s.gauges[k]} />
                ))}
              </div>
              <h4 className="font-ui text-[11px] uppercase opacity-70 mb-2">Attributs</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
                {(Object.keys(ATTRIBUTE_LABELS) as AttributeKey[]).map((k) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span>
                      {ATTRIBUTE_LABELS[k].icon} {ATTRIBUTE_LABELS[k].label}
                    </span>
                    <span className="text-accent-gold">{'■'.repeat(s.sheet!.attributes[k])}{'□'.repeat(6 - s.sheet!.attributes[k])}</span>
                  </div>
                ))}
              </div>
              <h4 className="font-ui text-[11px] uppercase opacity-70 mb-2">Traits</h4>
              <div className="flex flex-wrap gap-2">
                {s.sheet.traits.map((t) => {
                  const trait = traitById(t);
                  return trait ? (
                    <span key={t} className="pixel-panel px-2 py-1 text-xs" title={trait.description}>
                      {trait.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {tab === 'skills' && (
            <div>
              {SKILL_DOMAINS.map((d) => (
                <div key={d.id} className="mb-4">
                  <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-2">{d.label}</h4>
                  {(Object.entries(SKILL_META) as [SkillKey, (typeof SKILL_META)[SkillKey]][])
                    .filter(([, m]) => m.domain === d.id)
                    .map(([k, m]) => (
                      <div key={k} className="flex items-center gap-2 mb-1.5 text-sm">
                        <span className="w-48 truncate">{m.label}</span>
                        <div className="gauge-track flex-1">
                          <div className="gauge-fill bg-accent-teal" style={{ width: `${s.skills[k]}%`, background: 'var(--accent-teal)' }} />
                        </div>
                        <span className="w-8 text-right">{s.skills[k]}</span>
                        <span className="w-24 text-xs opacity-70">{skillLevel(s.skills[k])}</span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}

          {tab === 'relations' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(NPC_META) as NpcKey[])
                .filter((k) => k !== 'famille' || s.relations[k] !== undefined)
                .map((k) => (
                  <div key={k} className="pixel-panel p-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{NPC_META[k].name}</span>
                      <span className="text-accent-gold">{s.relations[k]}</span>
                    </div>
                    <div className="text-[10px] opacity-60 mb-1">{NPC_META[k].role}</div>
                    <div className="gauge-track">
                      <div
                        className="gauge-fill"
                        style={{ width: `${s.relations[k]}%`, background: s.relations[k] > 60 ? 'var(--smv-green-light)' : s.relations[k] > 30 ? 'var(--smv-sand)' : 'var(--ui-border)' }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {tab === 'missions' && (
            <div>
              {(['principale', 'secondaire'] as const).map((type) => (
                <div key={type} className="mb-4">
                  <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-2">
                    {type === 'principale' ? 'Missions principales' : 'Missions secondaires'}
                  </h4>
                  {MISSIONS.filter((m) => m.type === type).map((m) => {
                    const done = s.flags.has(m.doneFlag);
                    return (
                      <div key={m.id} className={`flex gap-2 text-sm mb-1 ${done ? 'opacity-90' : 'opacity-50'}`}>
                        <span>{done ? '✅' : '▫️'}</span>
                        <span className="font-ui text-[11px] w-10">{m.id}</span>
                        <span>{m.name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {tab === 'inventory' && (
            <div>
              {s.inventory.length === 0 && <p className="opacity-60 text-sm">Inventaire vide. Le Foyer et la cantine réservent des surprises.</p>}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {s.inventory.map((id, i) => {
                  const item = itemById(id);
                  if (!item) return null;
                  return (
                    <div key={`${id}_${i}`} className="pixel-panel p-2 text-center" title={item.description}>
                      <div className="text-2xl">{item.icon}</div>
                      <div className="text-xs mt-1">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {tab === 'journal' && (
            <div>
              {s.journal.length === 0 && <p className="opacity-60 text-sm">Le journal est vide. Il s'écrira tout seul, avec toi.</p>}
              {[...s.journal].reverse().map((e, i) => (
                <div key={i} className="mb-3 pb-3 border-b border-ui-border/40">
                  <div className="font-ui text-[10px] text-accent-gold uppercase mb-1">Semaine {e.week}</div>
                  <p className="text-base italic opacity-90">{e.text}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ACHIEVEMENTS.map((a) => {
                const got = s.achievements.includes(a.id) || s.meta.achievementsAllTime.includes(a.id);
                return (
                  <div key={a.id} className={`pixel-panel p-2 ${got ? '' : 'opacity-35'}`}>
                    <div className="text-sm">
                      {a.icon} <span className="font-ui text-[11px]">{a.name}</span>
                    </div>
                    <div className="text-xs opacity-70 mt-1">{got ? `« ${a.quote} »` : a.condition}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="pt-2 mt-2 border-t border-ui-border/40 flex justify-between items-center">
          <span className="font-ui text-[10px] opacity-50">SEMAINE {s.week} · CHAPITRE {Math.max(1, Math.min(5, Math.ceil(s.week / 2)))}</span>
          <PixelButton variant="danger" className="text-[10px]" onClick={() => { onClose(); s.requestAbandon(); }}>
            QUITTER LE SMV…
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
