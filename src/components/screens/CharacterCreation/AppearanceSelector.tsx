import type { Gender, Morphology, SpriteConfig } from '../../../engine/types';
import {
  DETAILS,
  EYE_COLORS,
  HAIR_COLORS,
  HAIR_STYLES,
  MORPHOLOGIES,
  SKIN_TONES
} from '../../../engine/spriteBuilder';
import { CharacterSprite } from '../../scenes/CharacterSprite';

interface Props {
  sprite: SpriteConfig;
  gender: Gender;
  onChange: (s: SpriteConfig) => void;
}

function Swatch({ color, selected, label, onClick }: { color: string; selected: boolean; label: string; onClick: () => void }) {
  return (
    <button
      title={label}
      onClick={onClick}
      className="w-7 h-7 shrink-0"
      style={{
        background: color,
        border: selected ? '3px solid var(--accent-gold)' : '2px solid var(--pixel-shadow)',
        boxShadow: selected ? '0 0 0 1px var(--pixel-shadow)' : 'none'
      }}
    />
  );
}

export function AppearanceSelector({ sprite, gender, onChange }: Props) {
  const set = (patch: Partial<SpriteConfig>) => onChange({ ...sprite, ...patch });
  const toggleDetail = (d: string) =>
    set({ details: sprite.details.includes(d) ? sprite.details.filter((x) => x !== d) : [...sprite.details, d] });

  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      {/* Prévisualisation temps réel */}
      <div className="pixel-panel p-3 flex flex-col items-center self-start shrink-0 sticky top-0">
        <CharacterSprite config={sprite} scale={1.8} />
        <span className="font-ui text-[9px] opacity-60 mt-1">APERÇU TEMPS RÉEL</span>
      </div>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[55vh] pr-1">
        <div>
          <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">Morphologie</h4>
          <div className="flex gap-1 flex-wrap">
            {(Object.entries(MORPHOLOGIES) as [Morphology, string][]).map(([k, label]) => (
              <button key={k} className={`pixel-btn px-2 py-1 text-[11px] ${sprite.morphology === k ? '!bg-smv-green' : ''}`} onClick={() => set({ morphology: k })}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">Couleur de peau</h4>
          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(SKIN_TONES).map(([k, v]) => (
              <Swatch key={k} color={v.hex} label={v.label} selected={sprite.skinTone === k} onClick={() => set({ skinTone: k })} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">Cheveux — couleur</h4>
          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(HAIR_COLORS).map(([k, v]) => (
              <Swatch key={k} color={v.hex} label={v.label} selected={sprite.hairColor === k} onClick={() => set({ hairColor: k })} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">Cheveux — coupe</h4>
          <div className="flex gap-1 flex-wrap">
            {Object.entries(HAIR_STYLES).map(([k, label]) => (
              <button key={k} className={`pixel-btn px-2 py-1 text-[10px] ${sprite.hairStyle === k ? '!bg-smv-green' : ''}`} onClick={() => set({ hairStyle: k })}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">Yeux</h4>
          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(EYE_COLORS).map(([k, v]) => (
              <Swatch key={k} color={v.hex} label={v.label} selected={sprite.eyeColor === k} onClick={() => set({ eyeColor: k })} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">Détails distinctifs (multi-sélection)</h4>
          <div className="flex gap-1 flex-wrap">
            {Object.entries(DETAILS)
              .filter(([, d]) => !d.masculineOnly || gender === 'masculin')
              .map(([k, d]) => (
                <button key={k} className={`pixel-btn px-2 py-1 text-[10px] ${sprite.details.includes(k) ? '!bg-smv-green' : ''}`} onClick={() => toggleDetail(k)}>
                  {d.label}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
