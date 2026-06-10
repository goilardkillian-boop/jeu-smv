import type { StoryNode } from '../../engine/types';

// Scènes systémiques : convocation (jauge ≤ 15), assistante sociale
// (Moral ≤ 15), abandon volontaire. Le moteur y redirige le flux
// puis revient au nœud interrompu via le flag spécial RETURN.
export const SIDESCENES: StoryNode[] = [
  {
    id: 'convocation_entry',
    kind: 'narration',
    chapter: 0,
    background: 'couloir',
    music: 'doubt_crisis',
    text: 'Un caporal te trouve dans le couloir. « Bureau du Commandant. Maintenant. »\n\nOn ne croise le Commandant que dans quatre circonstances, disent les anciens. Aucune des quatre n\'est anodine.\n\nDeux coups. « Avancez. »',
    next: 'convocation_commandant'
  },
  {
    id: 'convocation_commandant',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_commandant',
    speaker: 'Le Commandant',
    text: '« Je ne suis pas là pour vous punir. Je suis là pour comprendre. »\n\nIl laisse le silence travailler. Puis :\n\n« Je vais vous poser une seule question. Vous y répondrez franchement, ou vous ne répondrez pas du tout. Qu\'est-ce qui vous retient ici ? »',
    choices: [
      {
        text: '« Je veux vraiment rester. Je vais faire mieux. »',
        next: 'convocation_rester',
        effects: { gauges: { rigueur: 15, motivation: 10 } }
      },
      {
        text: 'Expliquer ce qui se passe vraiment. Tout.',
        next: 'convocation_verite',
        effects: { gauges: { moral: 10, motivation: 8 }, skills: { resilience_emo: 6 } }
      },
      {
        text: 'Promettre, sans vraiment le penser.',
        next: 'convocation_promesse',
        effects: { gauges: { rigueur: -5 }, setFlags: ['promesse_creuse'] }
      },
      {
        text: '« Je crois que j\'ai besoin de parler à quelqu\'un. L\'assistante sociale. »',
        next: 'claire_entry',
        effects: { gauges: { moral: 10 }, setFlags: ['demande_claire'] }
      }
    ]
  },
  {
    id: 'convocation_rester',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_commandant',
    speaker: 'Le Commandant',
    text: '« Bien. »\n\nIl note une ligne dans le dossier. Une seule.\n\n« Les mots, c\'est un début. Les semaines qui viennent diront le reste. Vous pouvez disposer. »\n\nDans le couloir, tu respires comme après une apnée. Deuxième chance. Il n\'y en aura pas de troisième.',
    effects: { journal: 'Convoqué chez le Commandant. J\'ai dit que je voulais rester. En le disant, j\'ai réalisé que c\'était vrai.' },
    next: 'RETURN'
  },
  {
    id: 'convocation_verite',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_commandant',
    speaker: 'Le Commandant',
    text: 'Tu parles. Maladroitement d\'abord, puis le barrage cède : la fatigue, le doute, ce qui s\'est passé avant le SMV, ce qui se passe dedans.\n\nIl écoute sans t\'interrompre une seule fois. À la fin :\n\n« Merci. La franchise, ici, ce n\'est pas une circonstance atténuante. C\'est une compétence. Vous venez de la démontrer. » Il décroche son téléphone. « Je préviens votre chef de section que le dossier est traité. Le reste vous appartient. »',
    effects: { relations: { ferreira: 8 }, journal: 'J\'ai tout dit au Commandant. Tout. Il a écouté. Je sais pas ce qui m\'a pris. Si : j\'en pouvais plus de porter ça seul.' },
    next: 'RETURN'
  },
  {
    id: 'convocation_promesse',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_commandant',
    speaker: 'Le Commandant',
    text: '« Bien. »\n\nMais son regard dit qu\'il a entendu la différence entre une promesse et une phrase. Ces hommes-là collectionnent les promesses comme les météorologues les nuages : ils savent lesquelles donneront de la pluie.\n\n« Vous pouvez disposer. »\n\nDeux semaines plus tard, quelqu\'un te dira, mine de rien : « Vous aviez promis. » Et tu sauras que ça a été noté.',
    next: 'RETURN'
  },
  {
    id: 'claire_entry',
    kind: 'narration',
    chapter: 0,
    background: 'bureau_claire',
    music: 'doubt_crisis',
    text: 'Le bureau de Claire Dupont, assistante sociale, est le seul endroit de la caserne avec des plantes vertes qui vont bien. Ce n\'est pas un hasard. Rien n\'est un hasard dans ce bureau.\n\n« Assieds-toi. Ici, pas de grade, pas de protocole, pas de compte-rendu à ta section. Juste toi, moi, et le temps qu\'il faudra. »',
    next: 'claire_dialogue'
  },
  {
    id: 'claire_dialogue',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_claire',
    speaker: 'Claire',
    npc: 'claire',
    text: '« Beaucoup de gens pensent que venir ici, c\'est un aveu de faiblesse. Je vais te dire ce que je constate depuis dix ans : ceux qui poussent cette porte finissent leur parcours plus souvent que les autres. Pas parce que je suis magique. Parce que demander de l\'aide, c\'est exactement le muscle qui leur manquait. Et toi, tu viens de le travailler. Alors. Raconte-moi. Pas ce qui va mal — on y viendra. D\'abord : raconte-moi une chose qui a été bien cette semaine. Une seule. »',
    choices: [
      {
        text: 'Trouver la chose. Elle existe.',
        next: 'claire_fin',
        effects: { gauges: { moral: 20 }, skills: { resilience_emo: 10 }, setFlags: ['claire_vue'] }
      },
      {
        text: '« Rien. Y a rien eu de bien. »',
        next: 'claire_rien',
        effects: { gauges: { moral: 10 }, setFlags: ['claire_vue'] }
      }
    ]
  },
  {
    id: 'claire_rien',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_claire',
    speaker: 'Claire',
    npc: 'claire',
    text: '« D\'accord. Alors je vais t\'en trouver une, moi : tu es assis dans ce bureau. Tu aurais pu ne pas venir. Des centaines de gens ne viennent jamais. »\n\nElle te laisse encaisser ça.\n\n« On va se voir chaque semaine un moment. Pas pour réparer — t\'es pas cassé. Pour vider le sac avant qu\'il déborde. C\'est tout. C\'est déjà énorme. »',
    effects: { gauges: { moral: 8 }, skills: { resilience_emo: 8 }, journal: 'Vu Claire aujourd\'hui. Elle dit que je suis pas cassé. Je la crois une fois sur deux. C\'est déjà une fois de plus qu\'avant.' },
    next: 'RETURN'
  },
  {
    id: 'claire_fin',
    kind: 'dialogue',
    chapter: 0,
    background: 'bureau_claire',
    speaker: 'Claire',
    npc: 'claire',
    text: 'Tu trouves la chose. Elle est petite — un mot de quelqu\'un, un exercice réussi, un rire au réfectoire. Claire hoche la tête comme si tu venais de produire un document officiel de grande valeur. Et c\'en est un.\n\n« Tu vois ? Le moral, c\'est pas un réservoir qu\'on remplit d\'un coup. C\'est une collection. Tu viens de commencer la tienne. Reviens quand tu veux. Mon bureau ne juge pas, et mes plantes non plus. »',
    effects: { journal: 'Vu Claire. Elle m\'a fait chercher un truc bien dans ma semaine. J\'ai trouvé. C\'est con, mais depuis, j\'en vois d\'autres.' },
    next: 'RETURN'
  },
  // ── Abandon volontaire (déclenché depuis le menu) ──
  {
    id: 'abandon_confirm',
    kind: 'narration',
    chapter: 0,
    background: 'chambree_nuit',
    text: 'Tu y penses depuis un moment. Partir. Ce n\'est pas une impulsion, c\'est devenu un projet.\n\nLa procédure existe : le SMV est un volontariat, la porte n\'est jamais fermée à clé. Mais avant le bureau des départs, il y a une nuit à passer avec la décision.',
    choices: [
      { text: 'Partir. C\'est décidé.', next: 'ENDING_ABANDON' },
      { text: 'Rester. Au moins jusqu\'à la prochaine étape.', next: 'RETURN', effects: { gauges: { motivation: 8, moral: 5 }, journal: 'J\'ai failli partir. J\'ai pas parti. Les deux moitiés de la phrase sont importantes.' } }
    ]
  }
];
