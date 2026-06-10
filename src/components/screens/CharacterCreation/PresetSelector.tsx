import { useState } from 'react';
import { PRESETS } from '../../../data/presets';
import type { Preset } from '../../../engine/types';
import { CharacterSprite } from '../../scenes/CharacterSprite';
import { PixelButton } from '../../ui/PixelButton';
import { ATTRIBUTE_LABELS, type AttributeKey } from '../../../engine/types';
import { traitById } from '../../../data/traits';
import { backgroundById } from '../../../data/backgrounds_data';

interface Props {
  onSelect: (p: Preset) => void;
  onBack: () => void;
}

export function PresetSelector({ onSelect, onBack }: Props) {
  const [selected, setSelected] = useState<Preset | null>(null);

  if (selected) {
    const bg = backgroundById(selected.backgroundId);
    return (
      <div className="pixel-panel max-w-2xl w-full p-5 max-h-[90vh] overflow-y-auto slide-up">
        <div className="flex gap-5 flex-col sm:flex-row">
          <div className="flex flex-col items-center shrink-0">
            <CharacterSprite config={selected.sprite} scale={1.8} />
            <div className="font-title text-xs text-accent-gold mt-2">{selected.name.toUpperCase()}</div>
            <div className="font-ui text-[10px] opacity-70">{selected.age} ans</div>
          </div>
          <div className="flex-1">
            <p className="dialogue-text italic text-accent-gold mb-3">« {selected.tagline} »</p>
            <p className="text-sm mb-3 opacity-90">{selected.story}</p>
            <p className="text-xs mb-3 opacity-70">
              <strong>Famille :</strong> {selected.family}
            </p>
            <p className="text-xs mb-3 opacity-70">
              <strong>Situation :</strong> {bg?.label} — « {bg?.quote} »
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mb-3">
              {(Object.keys(ATTRIBUTE_LABELS) as AttributeKey[]).map((k) => (
                <div key={k} className="flex justify-between text-xs">
                  <span>{ATTRIBUTE_LABELS[k].icon} {ATTRIBUTE_LABELS[k].label}</span>
                  <span className="text-accent-gold">{selected.attributes[k]}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {selected.traits.map((t) => (
                <span key={t} className="pixel-panel px-2 py-0.5 text-[11px]">{traitById(t)?.name ?? t}</span>
              ))}
            </div>
            <p className="text-xs opacity-60 italic mb-4">{selected.arc}</p>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <PixelButton onClick={() => setSelected(null)}>◂ RETOUR</PixelButton>
          <PixelButton variant="primary" className="font-title text-[10px]" onClick={() => onSelect(selected)}>
            JOUER {selected.name.toUpperCase()}
          </PixelButton>
        </div>
      </div>
    );
  }

  return (
    <div className="pixel-panel max-w-3xl w-full p-5 max-h-[90vh] overflow-y-auto slide-up">
      <h2 className="font-title text-sm text-accent-gold mb-4 text-center">CHOISIR UN PROFIL</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRESETS.map((p) => (
          <button key={p.id} className="pixel-btn p-2 flex flex-col items-center text-center" onClick={() => setSelected(p)}>
            <CharacterSprite config={p.sprite} scale={0.9} />
            <span className="font-title text-[9px] text-accent-gold mt-1">{p.name.toUpperCase()}</span>
            <span className="text-[10px] opacity-70">{p.age} ans</span>
            <span className="text-[10px] italic mt-1 leading-tight opacity-80">« {p.tagline.slice(0, 48)}{p.tagline.length > 48 ? '…' : ''} »</span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        <PixelButton onClick={onBack}>◂ RETOUR</PixelButton>
      </div>
    </div>
  );
}
