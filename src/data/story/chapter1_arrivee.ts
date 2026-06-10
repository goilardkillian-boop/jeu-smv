import type { StoryNode } from '../../engine/types';

// CHAPITRE 1 — L'ARRIVÉE (semaine 1)
// Incorporation, paquetage, premier rassemblement, premières rencontres.
export const CHAPTER1: StoryNode[] = [
  {
    id: 'c1_incorporation',
    kind: 'narration',
    chapter: 1,
    week: 1,
    background: 'cour_caserne',
    music: 'incorporation',
    playerOutfit: 'civil',
    text: 'CHAPITRE 1 — L\'ARRIVÉE\n\nL\'incorporation dure toute la matinée. Papiers, photos, visite médicale, signature du règlement intérieur. On te donne un numéro de chambre, un casier, un emploi du temps qui commence à 5h30.\n\nÀ midi, tu es officiellement volontaire stagiaire du 3e RSMV.',
    effects: { setFlags: ['m01_started'], achievements: ['premier_pas'] },
    next: 'c1_paquetage'
  },
  {
    id: 'c1_paquetage',
    kind: 'dialogue',
    chapter: 1,
    background: 'magasin_habillement',
    speaker: 'Le magasinier',
    text: '« Taille ? Pointure ? Tends les bras. »\n\nEn quatre minutes, tu reçois ta vie des huit prochains mois : deux treillis F3, des rangers, un calot — « Pas encore. Lui, il se mérite. » — des t-shirts réglementaires, un sac de paquetage.\n\n« Tenue complète demain 5h45. Un truc qui dépasse, un truc mal plié, et tu recommences. Questions ? »',
    choices: [
      { text: '« Non. C\'est clair. »', next: 'c1_chambree', effects: { gauges: { rigueur: 5 }, setFlags: ['m02_done'] } },
      { text: '« Comment on plie un treillis ? »', next: 'c1_pliage', effects: { gauges: { rigueur: 3 } } },
      { text: '« Tout ça pour dormir ici ? »', next: 'c1_remarque', effects: { gauges: { rigueur: -3 } } }
    ]
  },
  {
    id: 'c1_pliage',
    kind: 'dialogue',
    chapter: 1,
    background: 'magasin_habillement',
    speaker: 'Le magasinier',
    text: 'Il te regarde deux secondes. Puis il prend un treillis et te montre, geste par geste, sans un mot de trop.\n\n« Voilà. T\'es le premier à demander depuis trois promotions. Les autres apprennent à la dure. »',
    effects: { gauges: { rigueur: 3, moral: 3 }, skills: { autonomie: 4 }, setFlags: ['m02_done'] },
    next: 'c1_chambree'
  },
  {
    id: 'c1_remarque',
    kind: 'dialogue',
    chapter: 1,
    background: 'magasin_habillement',
    speaker: 'Le magasinier',
    text: '« Non. Tout ça pour recommencer ta vie. Le lit, c\'est cadeau. »\n\nIl te tend le sac sans sourire. Tu le prends sans répondre.',
    effects: { setFlags: ['m02_done'] },
    next: 'c1_chambree'
  },
  {
    id: 'c1_chambree',
    kind: 'narration',
    chapter: 1,
    background: 'chambree',
    playerOutfit: 'treillis',
    text: 'La chambrée. Huit lits, huit casiers, une fenêtre qui donne sur la cour. Tes voisins :\n\nThomas, 19 ans, qui défait son sac avec des gestes trop lents — il n\'a jamais dormi ailleurs que chez ses parents, ça se voit à dix mètres.\n\nDimitri, 23 ans, qui a déjà fait rire deux personnes et retenu le prénom de tout le monde.\n\nUn grand silencieux près de la fenêtre. Rachid. Il a rangé ses affaires en quatre minutes et il regarde dehors.',
    next: 'c1_premier_contact'
  },
  {
    id: 'c1_premier_contact',
    kind: 'dialogue',
    chapter: 1,
    background: 'chambree',
    speaker: '',
    text: 'Tu as quelques minutes avant le rassemblement. Trois lits, trois mondes.',
    choices: [
      {
        text: 'Aider Thomas à faire son lit au carré.',
        next: 'c1_thomas_lit',
        effects: { relations: { thomas: 12 }, gauges: { equipe: 5 }, skills: { intelligence_emo: 3 } }
      },
      {
        text: 'Vanner Dimitri sur sa technique de pliage.',
        next: 'c1_dimitri_vanne',
        effects: { relations: { dimitri: 10 }, gauges: { equipe: 3 } }
      },
      {
        text: 'Tenter un mot avec Rachid.',
        next: 'c1_rachid_mur',
        effects: { setFlags: ['rachid_tente_1'] }
      },
      {
        text: 'Ranger tes affaires, impeccablement.',
        next: 'c1_rangement',
        effects: { gauges: { rigueur: 8 }, skills: { autonomie: 3 } }
      }
    ]
  },
  {
    id: 'c1_thomas_lit',
    kind: 'dialogue',
    chapter: 1,
    background: 'chambree',
    speaker: 'Thomas',
    npc: 'thomas',
    expression: 'sad',
    text: '« Merci. Je... chez moi c\'est ma mère qui... enfin je veux dire, je sais faire un lit, mais pas un lit *comme ça*. »\n\nIl tire sur la couverture. Elle fait un pli. Il recommence. Ses mains tremblent un peu.\n\n« Ça se voit tant que ça, que je suis pas à ma place ? »',
    choices: [
      { text: '« Personne n\'est à sa place le premier jour. »', next: 'c1_rassemblement', effects: { relations: { thomas: 8 }, gauges: { moral: 3 } } },
      { text: '« T\'es là. C\'est déjà une place. »', next: 'c1_rassemblement', effects: { relations: { thomas: 10 }, skills: { intelligence_emo: 3 } } },
      { text: '« Un peu, ouais. Mais t\'inquiète. »', next: 'c1_rassemblement', effects: { relations: { thomas: 4 } } }
    ]
  },
  {
    id: 'c1_dimitri_vanne',
    kind: 'dialogue',
    chapter: 1,
    background: 'chambree',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'happy',
    text: '« Ma technique de pliage ? C\'est du origami militaire, ça, regarde. Bon, d\'accord, on dirait un accident. Mais un accident *symétrique*. »\n\nIl te tend la main par-dessus le lit.\n\n« Dimitri. Si tu ronfles, on va avoir un problème. Si tu partages tes gâteaux, on va devenir frères. C\'est le règlement de la chambrée, article premier. »',
    effects: { relations: { dimitri: 5 }, gauges: { moral: 5 } },
    next: 'c1_rassemblement'
  },
  {
    id: 'c1_rachid_mur',
    kind: 'dialogue',
    chapter: 1,
    background: 'chambree',
    speaker: '',
    text: 'Tu t\'approches de la fenêtre. « Belle vue ? »\n\nRachid tourne la tête. Te regarde. Deux secondes entières.\n\n« Y a une cour. Des murs. » Il retourne à la fenêtre.\n\nCe n\'est pas de l\'hostilité. C\'est un mur, simplement. Les murs, ça se démonte pierre par pierre. Pas le premier jour.',
    effects: { journal: 'Le gars près de la fenêtre. Rachid. Il parle pas. Mais il écoute tout, je le sais.' },
    next: 'c1_rassemblement'
  },
  {
    id: 'c1_rangement',
    kind: 'narration',
    chapter: 1,
    background: 'chambree',
    text: 'Tu ranges. Carré. Aligné. Le casier ressemble à une photo de manuel. Quand tu termines, tu remarques que Rachid a observé toute l\'opération. Il hoche imperceptiblement la tête. Venant de lui, c\'est un discours.',
    effects: { setFlags: ['rachid_observe_rangement'] },
    next: 'c1_rassemblement'
  },
  {
    id: 'c1_rassemblement',
    kind: 'narration',
    chapter: 1,
    background: 'cour_caserne',
    music: 'fmi_day',
    sound: 'step_boots_concrete',
    text: '16h00. Premier rassemblement. La section s\'aligne dans la cour, en trois rangs approximatifs que personne ne sait encore faire.\n\nUn homme traverse la cour. Grand. Uniforme parfait. Cheveux courts sel-et-poivre. Il ne se presse pas. Il n\'a pas besoin.\n\nAdjudant Ferreira. Chef de section FMI.',
    effects: { setFlags: ['m01_done'] },
    next: 'c1_ferreira_discours'
  },
  {
    id: 'c1_ferreira_discours',
    kind: 'dialogue',
    chapter: 1,
    background: 'cour_caserne',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    expression: 'neutral',
    text: '« Mettez-vous bien ça dans la tête : je ne suis pas là pour vous aimer. Je suis là pour vous rendre utiles. Si vous me haïssez en partant, j\'aurai raté. Si vous ne ressentez rien, j\'aurai raté aussi. Mais si vous dites un jour à quelqu\'un : "cet homme m\'a appris quelque chose", alors on aura tous les deux réussi. »\n\nIl parcourt le rang. S\'arrête une demi-seconde sur chacun. Sur toi aussi.\n\n« Demain, 5h45, tenue complète. Le premier qui est en retard fait gagner des pompes à tout le monde. Vous êtes une section. Vous allez l\'apprendre. Rompez. »',
    conditionalNext: [
      { conditions: [{ authority: 'opposition' }], next: 'c1_noah_reaction' },
      { conditions: [{ authority: 'contestataire' }], next: 'c1_noah_reaction' }
    ],
    next: 'c1_refectoire'
  },
  {
    id: 'c1_noah_reaction',
    kind: 'dialogue',
    chapter: 1,
    background: 'cour_caserne',
    speaker: '',
    text: 'Quelque chose en toi se hérisse. Le ton, l\'uniforme, les ordres. Tu connais ce réflexe. Il t\'a déjà coûté cher.\n\nFerreira repasse devant toi. Vos regards se croisent une seconde de trop.',
    choices: [
      { text: 'Baisser les yeux. Pas aujourd\'hui.', next: 'c1_refectoire', effects: { gauges: { rigueur: 3 } } },
      { text: 'Soutenir son regard.', next: 'c1_regard', effects: { setFlags: ['regard_ferreira_j1'] } }
    ]
  },
  {
    id: 'c1_regard',
    kind: 'dialogue',
    chapter: 1,
    background: 'cour_caserne',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    expression: 'neutral',
    text: 'Il s\'arrête. Te regarde. Pas un regard de défi — un regard d\'inventaire, comme s\'il rangeait quelque chose dans un dossier.\n\n« Vous. Vous me rappellerez quelqu\'un. »\n\nIl repart. Tu ne sauras pas qui avant longtemps.',
    effects: { relations: { ferreira: -3 }, journal: 'L\'adjudant m\'a dit que je lui rappelais quelqu\'un. C\'était pas un compliment. C\'était pas une insulte non plus.' },
    next: 'c1_refectoire'
  },
  {
    id: 'c1_refectoire',
    kind: 'narration',
    chapter: 1,
    background: 'refectoire',
    sound: 'crowd_mess_hall',
    text: 'Le réfectoire, 18h30. Le bruit de deux cents personnes qui mangent. Derrière le comptoir, un cuisinier d\'une cinquantaine d\'années sert avec une précision de métronome. Momo, d\'après le badge. Il te regarde une seconde de plus que les autres en remplissant ton plateau.\n\n« Premier jour ? » Il n\'attend pas la réponse. « Ça se voit. Mange. Tout. Demain tu comprendras pourquoi. »',
    effects: { relations: { momo: 5 } },
    choices: [
      { text: 'S\'asseoir avec Dimitri et Thomas.', next: 'c1_table_groupe', effects: { gauges: { equipe: 5 }, relations: { dimitri: 5, thomas: 5 } } },
      { text: 'S\'asseoir seul. Observer.', next: 'c1_table_seul', effects: { gauges: { moral: 3 }, journal: 'Manger seul le premier soir. Pas par tristesse. Pour regarder. Comprendre où je suis tombé.' } },
      { text: 'S\'asseoir à côté de la fille qui fixe son plateau.', next: 'c1_ines_table', effects: { relations: { ines: 8 } } }
    ]
  },
  {
    id: 'c1_table_groupe',
    kind: 'dialogue',
    chapter: 1,
    background: 'refectoire',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'happy',
    text: '« ...et donc le magasinier me sort "un truc qui dépasse et tu recommences". Frère, chez moi TOUT dépasse. Ma vie entière dépasse. »\n\nThomas rit. Un vrai rire, le premier de la journée. Même le grand silencieux, Rachid, deux tables plus loin, a quelque chose qui bouge au coin de la bouche.\n\nLa table devient la vôtre. Ça commence comme ça, une section.',
    effects: { gauges: { equipe: 5, moral: 5 } },
    next: 'c1_ines_intro'
  },
  {
    id: 'c1_table_seul',
    kind: 'narration',
    chapter: 1,
    background: 'refectoire',
    text: 'Tu manges seul. Tu observes. Le grand qui parle fort — Dimitri — fait déjà l\'animateur. Le gamin fragile — Thomas — rit trop fort pour que ce soit naturel. La fille au plateau intact — tu ne sais pas encore son prénom — n\'a rien mangé.\n\nEt l\'adjudant Ferreira, à la table des cadres, mange exactement comme tout le monde. Ça le rend bizarrement moins effrayant.',
    effects: { skills: { intelligence_emo: 2 } },
    next: 'c1_ines_intro'
  },
  {
    id: 'c1_ines_table',
    kind: 'dialogue',
    chapter: 1,
    background: 'refectoire',
    speaker: 'Inès',
    npc: 'ines',
    expression: 'sad',
    text: 'Elle lève à peine les yeux quand tu poses ton plateau.\n\n« ...Salut. » Un silence. Elle pousse une frite du bout de sa fourchette. « Je vais pas rester. Enfin, si. Je sais pas. »\n\nElle dit ça comme on lâche un poids, juste pour ne plus le porter seule une minute.',
    choices: [
      { text: '« Moi non plus je sais pas. On est deux. »', next: 'c1_ines_deux', effects: { relations: { ines: 10 }, setFlags: ['ines_premier_contact'] } },
      { text: '« Mange. Le reste, on verra demain. »', next: 'c1_ines_intro', effects: { relations: { ines: 6 }, setFlags: ['ines_premier_contact'] } },
      { text: 'Ne rien dire. Rester là.', next: 'c1_ines_intro', effects: { relations: { ines: 8 }, setFlags: ['ines_premier_contact'], skills: { intelligence_emo: 3 } } }
    ]
  },
  {
    id: 'c1_ines_deux',
    kind: 'dialogue',
    chapter: 1,
    background: 'refectoire',
    speaker: 'Inès',
    npc: 'ines',
    expression: 'neutral',
    text: 'Elle te regarde vraiment, cette fois.\n\n« ...Inès. »\n\nC\'est tout. Mais elle mange trois frites. Tu comptes ça comme une victoire, et tu as raison.',
    effects: { gauges: { moral: 3 } },
    next: 'c1_premiere_nuit'
  },
  {
    id: 'c1_ines_intro',
    kind: 'narration',
    chapter: 1,
    background: 'refectoire',
    text: 'Le repas se termine. Extinction des feux à 22h00, a dit le règlement. Personne n\'y croit encore. Tout le monde va l\'apprendre.',
    next: 'c1_premiere_nuit'
  },
  {
    id: 'c1_premiere_nuit',
    kind: 'narration',
    chapter: 1,
    background: 'chambree_nuit',
    music: 'fmi_night',
    text: (ctx) =>
      `Il est minuit. Le plafond est trop blanc. Thomas ronfle à ta gauche. Rachid, tu crois qu'il est réveillé aussi mais il ne dit rien.\n\nOn a fait quoi aujourd'hui ? On a marché. On a salué. On a mal aux pieds. Demain, pareil, ${ctx.g('tu supposes', 'tu supposes', 'tu supposes')}.\n\nTu pensais que le plus dur ce serait le physique. C'est le silence qui pèse.`,
    effects: { journal: 'Première nuit. Je pensais que le plus dur ce serait le physique. C\'est le silence qui me pèse.' },
    choices: [
      { text: 'Fermer les yeux. Dormir. Demain existe.', next: 'c1_reveil', effects: { gauges: { moral: 3 } } },
      { text: 'Repenser à pourquoi tu es là.', next: 'c1_pourquoi', effects: { gauges: { motivation: 5 } } },
      { text: 'Chuchoter : « Rachid ? Tu dors ? »', next: 'c1_rachid_nuit', conditions: [{ flag: 'rachid_tente_1' }] }
    ]
  },
  {
    id: 'c1_pourquoi',
    kind: 'narration',
    chapter: 1,
    background: 'chambree_nuit',
    text: (ctx) => {
      const d = ctx.sheet.desires;
      if (d.includes('permis')) return 'Le permis. C\'est ce que tu as dit à tout le monde. C\'est vrai, en plus. Mais allongé dans ce lit militaire, tu sais très bien que personne ne quitte sa vie entière pour un bout de plastique rose.';
      if (d.includes('prouver_famille')) return 'Ils ont dit que tu n\'y arriverais pas. Tu les entends encore. C\'est peut-être pas la meilleure raison de tenir huit mois. Mais cette nuit, c\'est celle qui marche.';
      if (d.includes('fuir')) return 'Tu n\'as dit à personne ce que tu fuis. Ici, personne ne le sait. C\'est peut-être ça, la vraie raison d\'être venu : un endroit où ton histoire n\'est pas déjà écrite sur ton front.';
      return 'Tu ne sais pas exactement pourquoi tu es là. Mais pour la première fois depuis longtemps, tu es quelque part à une heure précise, avec un truc précis à faire demain. Et ça, bizarrement, ça aide à fermer les yeux.';
    },
    next: 'c1_reveil'
  },
  {
    id: 'c1_rachid_nuit',
    kind: 'dialogue',
    chapter: 1,
    background: 'chambree_nuit',
    speaker: 'Rachid',
    text: 'Un long silence. Tu crois qu\'il dort.\n\n« ...Non. »\n\nC\'est tout. Mais c\'est le premier mot qu\'il offre à quelqu\'un. Tu l\'as eu de nuit, quand les murs baissent la garde.',
    effects: { setFlags: ['rachid_mot_nuit'], journal: 'Rachid m\'a répondu cette nuit. Un mot. Je le note parce que je crois que c\'est rare.' },
    next: 'c1_reveil'
  },
  {
    id: 'c1_reveil',
    kind: 'narration',
    chapter: 1,
    week: 1,
    background: 'chambree',
    sound: 'door_metal',
    text: '5h30. La porte claque. La lumière gifle.\n\n« DEBOUT ! Tenue complète, rassemblement 5h45 ! »\n\nLa semaine 1 commence pour de vrai. Lever 5h30, sport, ordre serré, cours, corvées. Les journées sont des couloirs : on les traverse, on ne les choisit pas. Pas encore.\n\nFin de la semaine 1. Tu tiens debout. C\'est déjà une information.',
    effects: { gauges: { rigueur: 5 }, skills: { discipline: 5, condition_physique: 4, autonomie: 3 } },
    next: 'c2_intro'
  }
];
