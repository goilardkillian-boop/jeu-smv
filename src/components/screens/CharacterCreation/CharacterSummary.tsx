import type { CharacterSheet } from '../../../engine/types';
import { ATTRIBUTE_LABELS, type AttributeKey } from '../../../engine/types';
import { CharacterSprite } from '../../scenes/CharacterSprite';
import { backgroundById, desireById } from '../../../data/backgrounds_data';
import { traitById } from '../../../data/traits';

const AUTHORITY_LABELS: Record<string, string> = {
  confiant: 'Confiant',
  mefiant: 'Méfiant',
  contestataire: 'Contestataire',
  discipline: 'Discipliné',
  opposition: 'En opposition',
  besoin_sens: 'Besoin de sens',
  recherche_cadre: 'En recherche de cadre',
  suiveur: 'Suit si montré'
};

export function CharacterSummary({ sheet }: { sheet: CharacterSheet }) {
  const bg = backgroundById(sheet.backgroundId);
  return (
    <div className="flex gap-5 flex-col sm:flex-row">
      <div className="flex flex-col items-center shrink-0">
        <CharacterSprite config={sheet.sprite} scale={1.8} />
        <div className="font-title text-xs text-accent-gold mt-2">{sheet.name.toUpperCase()}</div>
        <div className="font-ui text-[10px] opacity-70">{sheet.age} ans</div>
      </div>
      <div className="flex-1 text-sm">
        <p className="mb-2">
          <span className="opacity-60">Situation :</span> {bg?.label}
          <br />
          <span className="italic opacity-80">« {bg?.quote} »</span>
        </p>
        <p className="mb-2">
          <span className="opacity-60">Envies :</span>{' '}
          {sheet.desires.map((d) => desireById(d)?.label).filter(Boolean).join(' · ') || '—'}
        </p>
        <p className="mb-2">
          <span className="opacity-60">Traits :</span>{' '}
          {sheet.traits.map((t) => traitById(t)?.name).filter(Boolean).join(' · ')}
        </p>
        <p className="mb-3">
          <span className="opacity-60">Rapport à l'autorité :</span> {AUTHORITY_LABELS[sheet.authority]}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
          {(Object.keys(ATTRIBUTE_LABELS) as AttributeKey[]).map((k) => (
            <div key={k} className="flex justify-between text-xs">
              <span>
                {ATTRIBUTE_LABELS[k].icon} {ATTRIBUTE_LABELS[k].label}
              </span>
              <span className="text-accent-gold">{sheet.attributes[k]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
