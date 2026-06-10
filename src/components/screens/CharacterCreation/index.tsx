import { useState } from 'react';
import type { AuthorityStance, CharacterSheet, Gender, Preset } from '../../../engine/types';
import { DEFAULT_SPRITE } from '../../../engine/spriteBuilder';
import { useGameStore } from '../../../stores/gameStore';
import { PixelButton } from '../../ui/PixelButton';
import { PresetSelector } from './PresetSelector';
import { AppearanceSelector } from './AppearanceSelector';
import { BackgroundSelector } from './BackgroundSelector';
import { TraitSelector } from './TraitSelector';
import { AttributeBuilder } from './AttributeBuilder';
import { CharacterSummary } from './CharacterSummary';

type Mode = 'select' | 'preset' | 'create';
type Step = 'identity' | 'appearance' | 'background' | 'traits' | 'attributes' | 'authority' | 'summary';

const STEPS: Step[] = ['identity', 'appearance', 'background', 'traits', 'attributes', 'authority', 'summary'];
const STEP_TITLES: Record<Step, string> = {
  identity: '1/7 · IDENTITÉ',
  appearance: '2/7 · APPARENCE',
  background: '3/7 · PASSÉ & ENVIES',
  traits: '4/7 · PERSONNALITÉ',
  attributes: '5/7 · ATTRIBUTS',
  authority: "6/7 · RAPPORT À L'AUTORITÉ",
  summary: '7/7 · RÉCAPITULATIF'
};

const AUTHORITY_OPTIONS: { id: AuthorityStance; label: string; desc: string }[] = [
  { id: 'confiant', label: 'Confiant', desc: "L'autorité ne t'a jamais posé problème." },
  { id: 'mefiant', label: 'Méfiant', desc: 'La confiance, ça se mérite. La tienne aussi.' },
  { id: 'contestataire', label: 'Contestataire', desc: 'Tu remets en question. Souvent à voix haute.' },
  { id: 'discipline', label: 'Discipliné', desc: 'Les règles te rassurent plus qu\'elles ne te pèsent.' },
  { id: 'opposition', label: 'En opposition', desc: "L'uniforme te hérisse. Tu es venu quand même." },
  { id: 'besoin_sens', label: 'Besoin de sens', desc: "Tu obéis quand tu comprends pourquoi." },
  { id: 'recherche_cadre', label: 'En recherche de cadre', desc: 'Tu sais que tu en as besoin.' },
  { id: 'suiveur', label: 'Suit si montré', desc: "Montre-moi une fois, je te suis." }
];

export function CharacterCreation({ onCancel }: { onCancel: () => void }) {
  const startNewGame = useGameStore((s) => s.startNewGame);
  const ngPlus = useGameStore((s) => s.meta.completedOnce);
  const pointBudget = ngPlus ? 22 : 20;

  const [mode, setMode] = useState<Mode>('select');
  const [step, setStep] = useState<Step>('identity');
  const [sheet, setSheet] = useState<CharacterSheet>({
    name: '',
    gender: 'masculin',
    age: 20,
    presetId: null,
    sprite: { ...DEFAULT_SPRITE },
    backgroundId: 'curiosite',
    desires: [],
    traits: [],
    authority: 'besoin_sens',
    attributes: { resilience: 3, sociabilite: 3, determination: 3, debrouillardise: 3, confiance: 3, intelligence: 3, endurance: 2 }
  });

  const launchPreset = (p: Preset) => {
    startNewGame({
      name: p.name,
      gender: p.gender,
      age: p.age,
      presetId: p.id,
      sprite: { ...p.sprite },
      backgroundId: p.backgroundId,
      desires: [...p.desires],
      traits: [...p.traits],
      authority: p.authority,
      attributes: { ...p.attributes }
    });
  };

  const stepIndex = STEPS.indexOf(step);
  const usedPoints = Object.values(sheet.attributes).reduce((a, b) => a + b, 0);

  const stepValid: Record<Step, boolean> = {
    identity: sheet.name.trim().length >= 2 && sheet.name.trim().length <= 20,
    appearance: true,
    background: !!sheet.backgroundId && sheet.desires.length >= 1,
    traits: sheet.traits.length === 3,
    attributes: usedPoints === pointBudget,
    authority: true,
    summary: true
  };

  if (mode === 'select') {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-ui-bg">
        <div className="pixel-panel max-w-xl w-full p-6 text-center slide-up">
          <h2 className="font-title text-sm text-accent-gold mb-6">COMMENT VEUX-TU COMMENCER ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="pixel-btn p-5 text-center" onClick={() => setMode('create')}>
              <div className="font-title text-[10px] mb-2">CRÉER MON PERSONNAGE</div>
              <div className="text-xs opacity-70">Configure toi-même tes attributs, ton passé, tes traits</div>
            </button>
            <button className="pixel-btn p-5 text-center" onClick={() => setMode('preset')}>
              <div className="font-title text-[10px] mb-2">CHOISIR UN PROFIL</div>
              <div className="text-xs opacity-70">8 personnages prêts avec histoire et background définis</div>
            </button>
          </div>
          <div className="mt-5">
            <PixelButton onClick={onCancel}>◂ RETOUR AU TITRE</PixelButton>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'preset') {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-ui-bg">
        <PresetSelector onSelect={launchPreset} onBack={() => setMode('select')} />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-ui-bg">
      <div className="pixel-panel max-w-3xl w-full p-5 max-h-[92vh] flex flex-col slide-up">
        <h2 className="font-title text-xs text-accent-gold mb-4">{STEP_TITLES[step]}</h2>

        <div className="flex-1 overflow-y-auto">
          {step === 'identity' && (
            <div className="flex flex-col gap-4 max-w-md">
              <label className="text-sm">
                Prénom (2-20 caractères)
                <input
                  className="w-full bg-pixel-shadow border-2 border-ui-border p-2 mt-1 text-smv-cream dialogue-text"
                  value={sheet.name}
                  maxLength={20}
                  onChange={(e) => setSheet({ ...sheet, name: e.target.value })}
                  placeholder="Ton prénom…"
                />
              </label>
              <div>
                <span className="text-sm">Genre</span>
                <div className="flex gap-2 mt-1">
                  {([['masculin', 'Masculin'], ['feminin', 'Féminin'], ['neutre', 'Non spécifié']] as [Gender, string][]).map(([g, label]) => (
                    <button key={g} className={`pixel-btn px-3 py-1.5 text-xs ${sheet.gender === g ? '!bg-smv-green' : ''}`} onClick={() => setSheet({ ...sheet, gender: g })}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm">Âge</span>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  {[18, 19, 20, 21, 22, 23, 24, 25].map((a) => (
                    <button key={a} className={`pixel-btn px-2.5 py-1 text-xs ${sheet.age === a ? '!bg-smv-green' : ''}`} onClick={() => setSheet({ ...sheet, age: a })}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'appearance' && (
            <AppearanceSelector sprite={sheet.sprite} gender={sheet.gender} onChange={(sprite) => setSheet({ ...sheet, sprite })} />
          )}

          {step === 'background' && (
            <BackgroundSelector
              backgroundId={sheet.backgroundId}
              desires={sheet.desires}
              onChange={(backgroundId, desires) => setSheet({ ...sheet, backgroundId, desires })}
            />
          )}

          {step === 'traits' && (
            <TraitSelector traits={sheet.traits} backgroundId={sheet.backgroundId} onChange={(traits) => setSheet({ ...sheet, traits })} />
          )}

          {step === 'attributes' && (
            <AttributeBuilder attributes={sheet.attributes} pointBudget={pointBudget} onChange={(attributes) => setSheet({ ...sheet, attributes })} />
          )}

          {step === 'authority' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AUTHORITY_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  className={`pixel-btn px-3 py-2 text-left ${sheet.authority === o.id ? '!bg-smv-green' : ''}`}
                  onClick={() => setSheet({ ...sheet, authority: o.id })}
                >
                  <span className="text-[13px] block">{o.label}</span>
                  <span className="text-[11px] opacity-70">{o.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 'summary' && <CharacterSummary sheet={sheet} />}
        </div>

        <div className="flex justify-between mt-4 pt-3 border-t border-ui-border/40">
          <PixelButton onClick={() => (stepIndex === 0 ? setMode('select') : setStep(STEPS[stepIndex - 1]))}>
            ◂ RETOUR
          </PixelButton>
          {step === 'summary' ? (
            <PixelButton variant="primary" className="font-title text-[10px]" onClick={() => startNewGame(sheet)}>
              COMMENCER L'HISTOIRE
            </PixelButton>
          ) : (
            <PixelButton variant="primary" disabled={!stepValid[step]} onClick={() => setStep(STEPS[stepIndex + 1])}>
              SUIVANT ▸
            </PixelButton>
          )}
        </div>
      </div>
    </div>
  );
}
