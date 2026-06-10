import type {
  AttributeKey,
  CharacterSheet,
  Condition,
  Effects,
  GaugeKey,
  NpcKey,
  SkillKey,
  StoryContext
} from './types';

// État courant du moteur (sous-ensemble du store, sans les actions)
export interface EngineState {
  sheet: CharacterSheet;
  gauges: Record<GaugeKey, number>;
  skills: Record<SkillKey, number>;
  relations: Record<NpcKey, number>;
  flags: Set<string>;
  inventory: string[];
  achievements: string[];
  week: number;
  convocations: number;
  qcmPerfect: boolean; // aucun QCM raté jusqu'ici
}

export const clamp = (v: number, min = 0, max = 100) => Math.max(min, Math.min(max, v));

const has = (s: EngineState, t: string) => s.sheet.traits.includes(t);

// ── Multiplicateurs issus des traits (jamais affichés au joueur) ──
export function relationMultiplier(state: EngineState, npc: NpcKey, delta: number): number {
  let m = 1;
  if (delta > 0) {
    if (has(state, 'empathique')) m += 0.3;
    if (has(state, 'bavard')) m += 0.2;
    if (has(state, 'renferme')) m -= 0.2;
    if (has(state, 'discret_passe')) m -= 0.15;
    if (has(state, 'ouvert_passe')) m += 0.2;
    if (has(state, 'charmeur')) m += 0.15;
    if ((npc === 'ferreira' || npc === 'moreau') && has(state, 'discipline_t')) m += 0.25;
    if ((npc === 'ferreira' || npc === 'moreau') && has(state, 'mefiant_t')) m += 0.5; // dur à gagner, vaut plus
    if (npc === 'ferreira' && has(state, 'drole')) m -= 0.05;
    if (state.sheet.desires.includes('socialiser')) m += 0.15;
  } else if (delta < 0) {
    if (has(state, 'susceptible')) m += 0.3;
    if (has(state, 'loyal')) m -= 0.2;
  }
  return m;
}

export function gaugeMultiplier(state: EngineState, key: GaugeKey, delta: number): number {
  let m = 1;
  if (delta < 0) {
    if (key === 'moral' && has(state, 'stoique')) m -= 0.3;
    if (key === 'moral' && has(state, 'endurant')) m -= 0.2;
    if (key === 'moral' && has(state, 'hypersensible')) m += 0.3;
    if (key === 'moral' && has(state, 'anxieux')) m += 0.25;
    if (key === 'moral' && state.sheet.desires.includes('zero')) m -= 0.15;
    if (key === 'motivation' && has(state, 'decourageable')) m += 0.3;
    if (key === 'motivation' && state.sheet.desires.includes('dette')) m -= 0.2;
  } else if (delta > 0) {
    if (key === 'equipe' && has(state, 'leader')) m += 0.25;
    if (key === 'equipe' && (has(state, 'drole') || has(state, 'suiveur_t') || has(state, 'federateur'))) m += 0.1;
    if (key === 'rigueur' && has(state, 'competiteur')) m += 0.2;
    if (key === 'rigueur' && has(state, 'perfectionniste')) m += 0.3;
    if (key === 'rigueur' && has(state, 'bavard')) m -= 0.1;
    if (key === 'moral' && has(state, 'hypersensible')) m += 0.3;
    if (key === 'motivation' && has(state, 'curieux')) m += 0.25;
    if (has(state, 'ambitieux')) m += 0.2;
    if (state.sheet.desires.includes('bouger')) m += 0.1;
  }
  return m;
}

// ── Évaluation des conditions ─────────────────────────────────
export function evalCondition(c: Condition, s: EngineState): boolean {
  if (c.any) return c.any.some((sub) => evalCondition(sub, s));
  if (c.flag && !s.flags.has(c.flag)) return false;
  if (c.notFlag && s.flags.has(c.notFlag)) return false;
  if (c.gauge) {
    const v = s.gauges[c.gauge.key];
    if (c.gauge.min !== undefined && v < c.gauge.min) return false;
    if (c.gauge.max !== undefined && v > c.gauge.max) return false;
  }
  if (c.attribute) {
    const v = s.sheet.attributes[c.attribute.key];
    if (c.attribute.min !== undefined && v < c.attribute.min) return false;
    if (c.attribute.max !== undefined && v > c.attribute.max) return false;
  }
  if (c.skill) {
    const v = s.skills[c.skill.key];
    if (c.skill.min !== undefined && v < c.skill.min) return false;
    if (c.skill.max !== undefined && v > c.skill.max) return false;
  }
  if (c.relation) {
    const v = s.relations[c.relation.key];
    if (c.relation.min !== undefined && v < c.relation.min) return false;
    if (c.relation.max !== undefined && v > c.relation.max) return false;
  }
  if (c.trait && !s.sheet.traits.includes(c.trait)) return false;
  if (c.notTrait && s.sheet.traits.includes(c.notTrait)) return false;
  if (c.backgroundIn && !c.backgroundIn.includes(s.sheet.backgroundId)) return false;
  if (c.desire && !s.sheet.desires.includes(c.desire)) return false;
  if (c.authority && s.sheet.authority !== c.authority) return false;
  if (c.item && !s.inventory.includes(c.item)) return false;
  if (c.presetId && s.sheet.presetId !== c.presetId) return false;
  return true;
}

export const evalConditions = (cs: Condition[] | undefined, s: EngineState) =>
  !cs || cs.every((c) => evalCondition(c, s));

// ── Notifications UI générées par l'application d'effets ─────
export interface EffectNotification {
  kind: 'gauge' | 'relation' | 'skill' | 'item' | 'achievement';
  label: string;
  delta?: number;
}

export interface ApplyResult {
  gauges: Record<GaugeKey, number>;
  skills: Record<SkillKey, number>;
  relations: Record<NpcKey, number>;
  flags: Set<string>;
  inventory: string[];
  achievements: string[];
  notifications: EffectNotification[];
  journalEntry?: string;
}

import { GAUGE_LABELS, NPC_META, SKILL_META } from './types';
import { itemById } from '../data/items';
import { achievementById } from '../data/achievements';

export function applyEffects(e: Effects | undefined, s: EngineState): ApplyResult {
  const r: ApplyResult = {
    gauges: { ...s.gauges },
    skills: { ...s.skills },
    relations: { ...s.relations },
    flags: new Set(s.flags),
    inventory: [...s.inventory],
    achievements: [...s.achievements],
    notifications: []
  };
  if (!e) return r;

  if (e.gauges) {
    for (const [k, raw] of Object.entries(e.gauges) as [GaugeKey, number][]) {
      const delta = Math.round(raw * gaugeMultiplier(s, k, raw));
      if (delta === 0) continue;
      r.gauges[k] = clamp(r.gauges[k] + delta);
      r.notifications.push({ kind: 'gauge', label: `${GAUGE_LABELS[k].icon} ${GAUGE_LABELS[k].label}`, delta });
    }
  }
  if (e.relations) {
    for (const [k, raw] of Object.entries(e.relations) as [NpcKey, number][]) {
      const delta = Math.round(raw * relationMultiplier(s, k, raw));
      if (delta === 0) continue;
      r.relations[k] = clamp(r.relations[k] + delta);
      r.notifications.push({ kind: 'relation', label: NPC_META[k].name, delta });
    }
  }
  if (e.skills) {
    for (const [k, raw] of Object.entries(e.skills) as [SkillKey, number][]) {
      if (!raw) continue;
      r.skills[k] = clamp(r.skills[k] + raw);
      if (raw > 0) r.notifications.push({ kind: 'skill', label: SKILL_META[k].label, delta: raw });
    }
  }
  if (e.attributes) {
    // Les attributs ne bougent qu'à la création (modificateurs de background) — appliqués ailleurs.
  }
  e.setFlags?.forEach((f) => r.flags.add(f));
  e.clearFlags?.forEach((f) => r.flags.delete(f));
  e.addItems?.forEach((i) => {
    const item = itemById(i);
    if (item?.unique && r.inventory.includes(i)) return;
    r.inventory.push(i);
    if (item) r.notifications.push({ kind: 'item', label: `${item.icon} ${item.name}` });
  });
  e.removeItems?.forEach((i) => {
    const idx = r.inventory.indexOf(i);
    if (idx >= 0) r.inventory.splice(idx, 1);
  });
  e.achievements?.forEach((a) => {
    if (!r.achievements.includes(a)) {
      r.achievements.push(a);
      const ach = achievementById(a);
      if (ach) r.notifications.push({ kind: 'achievement', label: `${ach.icon} ${ach.name}` });
    }
  });
  if (e.journal) r.journalEntry = e.journal;
  return r;
}

// ── Contexte des textes dynamiques ───────────────────────────
export function buildContext(s: EngineState): StoryContext {
  const gender = s.sheet.gender;
  return {
    name: s.sheet.name,
    gender,
    sheet: s.sheet,
    gauges: s.gauges,
    relations: s.relations,
    flags: s.flags,
    week: s.week,
    g: (m, f, n) => (gender === 'feminin' ? f : gender === 'neutre' ? (n ?? m) : m)
  };
}

// ── Interactions hebdomadaires entre jauges ──────────────────
export function weeklyGaugeInteractions(s: EngineState): Partial<Record<GaugeKey, number>> {
  const out: Partial<Record<GaugeKey, number>> = {};
  if (s.gauges.moral < 25) out.motivation = -3;
  if (s.gauges.equipe > 70 && s.gauges.moral < 50) out.moral = 3; // les camarades compensent
  return out;
}

// ── Calcul de la fin ─────────────────────────────────────────
export function computeEnding(s: EngineState): string {
  const g = s.gauges;
  const rel = s.relations;
  const allRelKeys: NpcKey[] = ['ferreira', 'ines', 'dimitri', 'thomas', 'kevin', 'lea', 'momo'];
  const allRelAbove50 = allRelKeys.filter((k) => k !== 'thomas' || !s.flags.has('thomas_parti')).every((k) => rel[k] > 50);
  const allRelBelow30 = allRelKeys.every((k) => rel[k] < 30);
  const contratOk = s.flags.has('veut_signer') && g.motivation > 50;
  const recommandation = g.rigueur > 70 && (rel.ferreira > 60 || rel.moreau > 60);

  // Fins spécifiques, par ordre de priorité narrative
  if (has(s, 'rebelle') && s.flags.has('appui_sara_public')) return 'fin_graine';
  if (rel.ferreira > 80 && g.rigueur > 65) return 'fin_ferreira';
  if (allRelBelow30 && contratOk && g.rigueur > 50) return 'fin_solitude';
  if (g.equipe > 80 && recommandation && rel.ferreira > 75) return 'fin_leader';
  if (allRelAbove50 && g.equipe > 85) return 'fin_ensemble';
  if (s.flags.has('permis_ok') && contratOk && g.moral > 70) return 'fin_retour';
  if (s.flags.has('claire_vue') && g.moral > 50) {
    if (g.motivation > 65 && g.equipe > 60 && g.rigueur > 55 && contratOk) return 'fin_nouvelle_vie';
    return 'fin_soin';
  }
  if (s.flags.has('has_project')) return 'fin_graine';
  if (g.motivation > 65 && g.equipe > 60 && g.rigueur > 55 && contratOk) return 'fin_nouvelle_vie';
  if (g.motivation > 45) return 'fin_pas_la_fin';
  return 'fin_recommencer';
}

// Fin en cas d'abandon volontaire en cours de route
export function computeAbandonEnding(s: EngineState): string {
  if (s.week <= 2) return 'fin_trop_tot';
  if (s.flags.has('has_project')) return 'fin_graine';
  if (s.gauges.motivation > 50) return 'fin_autre_chemin';
  return 'fin_recommencer';
}

// Médailles de fin de partie calculées au moment du bilan
export function endGameAchievements(s: EngineState, endingId: string): string[] {
  const out: string[] = ['huit_mois'];
  if (s.convocations === 0 && s.week >= 8) out.push('fantome');
  if (s.gauges.equipe > 80) out.push('chef_de_file');
  if (s.gauges.motivation > 75 && s.gauges.equipe > 75 && s.gauges.rigueur > 75 && s.gauges.moral > 75) out.push('major');
  if (s.relations.ferreira > 80) out.push('confiance_accordee');
  if (s.qcmPerfect && s.flags.has('m11_done')) out.push('sans_faute', 'academicien');
  if (s.flags.has('m11_done') && s.flags.has('code_sans_faute')) out.push('pilote');
  if (s.flags.has('thomas_sauve_crise') && !s.flags.has('thomas_parti')) out.push('vrai_thomas');
  const reco = s.gauges.rigueur > 70 && (s.relations.ferreira > 60 || s.relations.moreau > 60);
  if (reco && s.flags.has('veut_signer')) out.push('recrue_parfaite');
  if (['deuil_recent', 'deuil_ancien', 'ase_18', 'ase_21'].includes(s.sheet.backgroundId) && ['fin_nouvelle_vie', 'fin_retour', 'fin_leader', 'fin_ensemble', 'fin_ferreira'].includes(endingId))
    out.push('temoin');
  if (s.convocations > 0 && ['fin_nouvelle_vie', 'fin_retour', 'fin_pas_la_fin'].includes(endingId)) out.push('survivant_m');
  return out.filter((a) => !s.achievements.includes(a));
}
