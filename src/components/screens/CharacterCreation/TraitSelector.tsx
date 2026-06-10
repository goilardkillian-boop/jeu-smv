import { TRAITS, TRAIT_FAMILIES } from '../../../data/traits';
import type { Trait } from '../../../engine/types';

interface Props {
  traits: string[]; // [principal1, principal2, secondaire]
  backgroundId: string;
  onChange: (traits: string[]) => void;
}

// Conditions de déblocage des traits "spéciale" selon le background
const SPECIAL_UNLOCK: Record<string, string[]> = {
  sportif_blesse: ['sportif_blesse_bg', 'sportif_reconverti', 'reconversion_accident'],
  proche_aidant_t: ['proche_aidant', 'maladie_proche'],
  survivant: ['deuil_recent', 'deuil_ancien', 'ase_18', 'ase_21'],
  artiste: ['passion_sans_debouche'],
  parent_jeune_t: ['parent_jeune']
};

export function TraitSelector({ traits, backgroundId, onChange }: Props) {
  const available = (t: Trait) => {
    if (t.family !== 'speciale') return true;
    return SPECIAL_UNLOCK[t.id]?.includes(backgroundId) ?? false;
  };

  const toggle = (id: string) => {
    if (traits.includes(id)) onChange(traits.filter((t) => t !== id));
    else if (traits.length < 3) onChange([...traits, id]);
  };

  const families = Object.keys(TRAIT_FAMILIES) as Trait['family'][];

  return (
    <div className="max-h-[55vh] overflow-y-auto pr-1">
      <p className="text-[11px] opacity-60 mb-3">
        Choisis 3 traits (2 principaux + 1 secondaire). Ils influencent le ton des dialogues, les choix
        disponibles et les conséquences — sans jamais s'afficher comme des bonus. Sélection : {traits.length}/3
      </p>
      {families.map((fam) => {
        const list = TRAITS.filter((t) => t.family === fam && available(t));
        if (list.length === 0) return null;
        return (
          <div key={fam} className="mb-3">
            <h4 className="font-ui text-[11px] uppercase text-accent-gold mb-1">{TRAIT_FAMILIES[fam]}</h4>
            <div className="flex gap-1.5 flex-wrap">
              {list.map((t) => (
                <button
                  key={t.id}
                  title={`${t.description}\n${t.effectLine}`}
                  className={`pixel-btn px-2 py-1 text-[11px] ${traits.includes(t.id) ? '!bg-smv-green' : ''}`}
                  onClick={() => toggle(t.id)}
                >
                  {t.name}
                  {traits.indexOf(t.id) === 2 && <span className="opacity-60"> (sec.)</span>}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
