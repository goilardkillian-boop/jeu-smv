import { create } from 'zustand';
import type {
  AttributeKey,
  CharacterSheet,
  Choice,
  GaugeKey,
  NpcKey,
  SkillKey,
  StoryNode
} from '../engine/types';
import { STORY, START_NODE } from '../data/story';
import {
  applyEffects,
  buildContext,
  clamp,
  computeAbandonEnding,
  computeEnding,
  endGameAchievements,
  evalConditions,
  weeklyGaugeInteractions,
  type EffectNotification,
  type EngineState
} from '../engine/gameEngine';
import { saveGame, loadGame, loadMeta, saveMeta, type MetaData } from '../engine/saveSystem';
import { backgroundById, desireById } from '../data/backgrounds_data';
import { audio } from '../audio/audioManager';

export type Screen = 'title' | 'creation' | 'game' | 'ending';

const DEFAULT_GAUGES: Record<GaugeKey, number> = { motivation: 60, equipe: 50, rigueur: 50, moral: 60 };

const DEFAULT_SKILLS = (): Record<SkillKey, number> => ({
  condition_physique: 5, discipline: 5, equipe_skill: 5, terrain: 0,
  francais: 10, maths: 10, culture_g: 10, numerique: 10,
  savoir_etre: 5, technique_filiere: 0, stress_pro: 5, communication: 5,
  intelligence_emo: 10, confiance_soi: 10, gestion_conflit: 5, resilience_emo: 10,
  budget: 5, secours: 0, code_route: 5, autonomie: 10
});

const DEFAULT_RELATIONS = (sheet: CharacterSheet): Record<NpcKey, number> => {
  let ferreira = 20;
  if (sheet.traits.includes('recherche_figure')) ferreira += 20;
  if (sheet.traits.includes('mefiant_t') || sheet.authority === 'mefiant') ferreira -= 15;
  if (sheet.authority === 'opposition') ferreira -= 10;
  return {
    ferreira: clamp(ferreira), ines: 0, dimitri: 5, moreau: 10, thomas: 5,
    kevin: 0, lea: 0, momo: 0, claire: 20, enzo: 0, famille: 40
  };
};

interface GameStore {
  screen: Screen;
  sheet: CharacterSheet | null;
  nodeId: string;
  gauges: Record<GaugeKey, number>;
  skills: Record<SkillKey, number>;
  relations: Record<NpcKey, number>;
  flags: Set<string>;
  inventory: string[];
  achievements: string[];
  journal: { week: number; text: string }[];
  week: number;
  convocations: number;
  visited: string[];
  returnStack: string[];
  qcmPerfect: boolean;
  ngPlus: boolean;
  endingId: string | null;
  notifications: EffectNotification[];
  meta: MetaData;
  hasSave: boolean;

  startNewGame: (sheet: CharacterSheet) => void;
  continueGame: () => Promise<boolean>;
  gotoNode: (id: string) => void;
  choose: (choice: Choice) => void;
  advance: () => void;
  finishQcm: (passed: boolean, perfect: boolean) => void;
  requestAbandon: () => void;
  dismissNotifications: () => void;
  backToTitle: () => void;
  checkHasSave: () => Promise<void>;
}

function engineState(s: GameStore): EngineState {
  return {
    sheet: s.sheet!,
    gauges: s.gauges,
    skills: s.skills,
    relations: s.relations,
    flags: s.flags,
    inventory: s.inventory,
    achievements: s.achievements,
    week: s.week,
    convocations: s.convocations,
    qcmPerfect: s.qcmPerfect
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: 'title',
  sheet: null,
  nodeId: START_NODE,
  gauges: { ...DEFAULT_GAUGES },
  skills: DEFAULT_SKILLS(),
  relations: DEFAULT_RELATIONS({ traits: [], authority: 'confiant' } as unknown as CharacterSheet),
  flags: new Set<string>(),
  inventory: [],
  achievements: [],
  journal: [],
  week: 0,
  convocations: 0,
  visited: [],
  returnStack: [],
  qcmPerfect: true,
  ngPlus: false,
  endingId: null,
  notifications: [],
  meta: loadMeta(),
  hasSave: false,

  checkHasSave: async () => {
    const save = await loadGame(0);
    set({ hasSave: !!save });
  },

  startNewGame: (sheet) => {
    const gauges = { ...DEFAULT_GAUGES };
    // Modificateurs du background + des envies
    const bg = backgroundById(sheet.backgroundId);
    const attributes = { ...sheet.attributes };
    const applyStatic = (effects?: { gauges?: Partial<Record<GaugeKey, number>>; attributes?: Partial<Record<AttributeKey, number>> }) => {
      if (!effects) return;
      for (const [k, v] of Object.entries(effects.gauges ?? {}) as [GaugeKey, number][]) gauges[k] = clamp(gauges[k] + v);
      for (const [k, v] of Object.entries(effects.attributes ?? {}) as [AttributeKey, number][]) attributes[k] = Math.min(6, attributes[k] + v);
    };
    applyStatic(bg?.effects);
    sheet.desires.forEach((d) => applyStatic(desireById(d)?.effects));

    const finalSheet = { ...sheet, attributes };
    const flags = new Set<string>([`bg_${sheet.backgroundId}`, ...sheet.desires.map((d) => `desire_${d}`)]);
    const meta = get().meta;
    const ngPlus = meta.completedOnce;
    const achievements: string[] = [];
    if (ngPlus) achievements.push('ng_plus');
    if (meta.abandonedOnce) achievements.push('trop_tot');

    set({
      screen: 'game',
      sheet: finalSheet,
      nodeId: START_NODE,
      gauges,
      skills: DEFAULT_SKILLS(),
      relations: DEFAULT_RELATIONS(finalSheet),
      flags,
      inventory: [],
      achievements,
      journal: [],
      week: 0,
      convocations: 0,
      visited: [],
      returnStack: [],
      qcmPerfect: true,
      ngPlus,
      endingId: null,
      notifications: []
    });
    get().gotoNode(START_NODE);
  },

  continueGame: async () => {
    const save = await loadGame(0);
    if (!save) return false;
    set({
      screen: 'game',
      sheet: save.sheet,
      nodeId: save.nodeId,
      gauges: save.gauges,
      skills: save.skills,
      relations: save.relations,
      flags: new Set(save.flags),
      inventory: save.inventory,
      achievements: save.achievements,
      journal: save.journal,
      week: save.week,
      convocations: save.convocations,
      visited: save.visited,
      returnStack: [],
      qcmPerfect: true,
      ngPlus: save.ngPlus,
      endingId: null,
      notifications: []
    });
    return true;
  },

  gotoNode: (id) => {
    const state = get();

    // Nœuds spéciaux
    if (id === 'RETURN') {
      const stack = [...state.returnStack];
      const back = stack.pop() ?? 'c2_intro';
      set({ returnStack: stack });
      get().gotoNode(back);
      return;
    }
    if (id === 'ENDING_DISPATCH' || id === 'ENDING_ABANDON') {
      const es = engineState(state);
      const endingId = id === 'ENDING_ABANDON' ? computeAbandonEnding(es) : computeEnding(es);
      const newAch = endGameAchievements(es, endingId);
      const meta: MetaData = {
        ...state.meta,
        endingsSeen: [...new Set([...state.meta.endingsSeen, endingId])],
        achievementsAllTime: [...new Set([...state.meta.achievementsAllTime, ...state.achievements, ...newAch])],
        completedOnce: state.meta.completedOnce || id === 'ENDING_DISPATCH',
        abandonedOnce: state.meta.abandonedOnce || id === 'ENDING_ABANDON'
      };
      saveMeta(meta);
      audio.playMusic(endingId.startsWith('fin_recommencer') || endingId === 'fin_trop_tot' ? 'ending_hard' : 'ending_success');
      set({ screen: 'ending', endingId, achievements: [...state.achievements, ...newAch], meta });
      return;
    }

    const node = STORY[id];
    if (!node) {
      console.error(`[gameStore] Nœud introuvable : ${id}`);
      return;
    }

    // Avancement de semaine + interactions hebdo entre jauges
    let gauges = state.gauges;
    let week = state.week;
    if (node.week !== undefined && node.week > week) {
      week = node.week;
      const inter = weeklyGaugeInteractions(engineState(state));
      gauges = { ...gauges };
      for (const [k, v] of Object.entries(inter) as [GaugeKey, number][]) gauges[k] = clamp(gauges[k] + v);
    }

    // Effets d'entrée du nœud
    const preState: EngineState = { ...engineState(state), gauges, week };
    const r = applyEffects(node.effects, preState);
    const journal = r.journalEntry ? [...state.journal, { week, text: r.journalEntry }] : state.journal;

    if (node.music) audio.playMusic(node.music);
    if (node.sound) audio.playSound(node.sound);

    const nextState = {
      nodeId: id,
      gauges: r.gauges,
      skills: r.skills,
      relations: r.relations,
      flags: r.flags,
      inventory: r.inventory,
      achievements: r.achievements,
      journal,
      week,
      visited: state.visited.includes(id) ? state.visited : [...state.visited, id],
      notifications: r.notifications
    };

    // Fin directe ?
    if (node.kind === 'ending' && node.endingId) {
      const meta: MetaData = {
        ...state.meta,
        endingsSeen: [...new Set([...state.meta.endingsSeen, node.endingId])],
        achievementsAllTime: [...new Set([...state.meta.achievementsAllTime, ...r.achievements])],
        completedOnce: state.meta.completedOnce,
        abandonedOnce: true
      };
      saveMeta(meta);
      set({ ...nextState, screen: 'ending', endingId: node.endingId, meta });
      return;
    }

    // Déclenchement convocation / assistante sociale (hors scènes système)
    const inSideScene = id.startsWith('convocation') || id.startsWith('claire') || id.startsWith('abandon');
    if (!inSideScene) {
      const g = r.gauges;
      if (g.moral <= 15 && !r.flags.has('claire_pending')) {
        r.flags.add('claire_pending');
        set({ ...nextState, flags: r.flags, returnStack: [...state.returnStack, id] });
        get().gotoNode('claire_entry');
        return;
      }
      if ((g.motivation <= 15 || g.equipe <= 15 || g.rigueur <= 15) && !r.flags.has('convocation_pending')) {
        r.flags.add('convocation_pending');
        set({
          ...nextState,
          flags: r.flags,
          convocations: state.convocations + 1,
          returnStack: [...state.returnStack, id]
        });
        get().gotoNode('convocation_entry');
        return;
      }
    } else if (id === 'convocation_entry') {
      // remonter légèrement la jauge fautive pour ne pas reboucler immédiatement
      const g = { ...r.gauges };
      (['motivation', 'equipe', 'rigueur'] as GaugeKey[]).forEach((k) => {
        if (g[k] <= 15) g[k] = 25;
      });
      g.moral = Math.max(g.moral, 20);
      nextState.gauges = g;
      r.flags.delete('convocation_pending');
      r.flags.delete('claire_pending');
    } else if (id === 'claire_entry') {
      const g = { ...r.gauges, moral: Math.max(r.gauges.moral, 30) };
      nextState.gauges = g;
      r.flags.delete('claire_pending');
    }

    set(nextState);

    // Sauvegarde automatique
    const s = get();
    if (s.sheet) {
      void saveGame({
        slot: 0,
        timestamp: Date.now(),
        label: `${s.sheet.name} — semaine ${s.week}`,
        sheet: s.sheet,
        nodeId: id,
        gauges: s.gauges,
        skills: s.skills,
        relations: s.relations,
        flags: [...s.flags],
        inventory: s.inventory,
        achievements: s.achievements,
        journal: s.journal,
        week: s.week,
        convocations: s.convocations,
        visited: s.visited,
        ngPlus: s.ngPlus
      });
    }
  },

  choose: (choice) => {
    const state = get();
    audio.playSound('chime_choice');
    const r = applyEffects(choice.effects, engineState(state));
    const journal = r.journalEntry ? [...state.journal, { week: state.week, text: r.journalEntry }] : state.journal;
    set({
      gauges: r.gauges,
      skills: r.skills,
      relations: r.relations,
      flags: r.flags,
      inventory: r.inventory,
      achievements: r.achievements,
      journal,
      notifications: r.notifications
    });
    get().gotoNode(choice.next);
  },

  advance: () => {
    const state = get();
    const node = STORY[state.nodeId];
    if (!node) return;
    // Routage conditionnel prioritaire
    if (node.conditionalNext) {
      for (const cn of node.conditionalNext) {
        if (evalConditions(cn.conditions, engineState(state))) {
          get().gotoNode(cn.next);
          return;
        }
      }
    }
    if (node.next) get().gotoNode(node.next);
  },

  finishQcm: (passed, perfect) => {
    const state = get();
    const node = STORY[state.nodeId];
    if (!node?.qcm) return;
    const q = node.qcm;
    const effects = passed ? q.successEffects : q.failEffects;
    const merged = { ...effects };
    if (passed && q.skill) merged.skills = { ...merged.skills, [q.skill]: (merged.skills?.[q.skill] ?? 0) + 8 };
    if (perfect && q.pool === 'code_route') merged.setFlags = [...(merged.setFlags ?? []), 'code_sans_faute'];
    const r = applyEffects(merged, engineState(state));
    audio.playSound(passed ? 'qcm_correct' : 'qcm_wrong');
    set({
      gauges: r.gauges,
      skills: r.skills,
      relations: r.relations,
      flags: r.flags,
      inventory: r.inventory,
      achievements: r.achievements,
      notifications: r.notifications,
      qcmPerfect: state.qcmPerfect && perfect
    });
    get().gotoNode(passed ? q.successNext : q.failNext);
  },

  requestAbandon: () => {
    const state = get();
    set({ returnStack: [...state.returnStack, state.nodeId] });
    get().gotoNode('abandon_confirm');
  },

  dismissNotifications: () => set({ notifications: [] }),

  backToTitle: () => {
    set({ screen: 'title', endingId: null });
    void get().checkHasSave();
  }
}));

export { engineState };
