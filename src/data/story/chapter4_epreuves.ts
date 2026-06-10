import type { StoryNode } from '../../engine/types';

// CHAPITRE 4 — LES ÉPREUVES (semaines 6-7)
// Examen de filière, code de la route, mission citoyenne, révélation Dimitri.
export const CHAPTER4: StoryNode[] = [
  {
    id: 'c4_intro',
    kind: 'transition',
    chapter: 4,
    week: 6,
    background: 'salle_formation',
    music: 'formation',
    text: 'CHAPITRE 4 — LES ÉPREUVES\n\nSemaine 6. Le rythme a changé : moins de boue, plus de stylos. Cours de filière le matin, code de la route l\'après-midi, remise à niveau quand il faut. Le treillis sèche plus souvent qu\'il ne boueuse.\n\nDeux examens t\'attendent. Et quelque chose que tu ne vois pas encore venir.',
    next: 'c4_exam_intro'
  },
  {
    id: 'c4_exam_intro',
    kind: 'narration',
    chapter: 4,
    background: 'salle_formation',
    text: 'L\'examen théorique de filière. Deux semaines de cours compressées en trente questions. La veille, au Foyer, chacun révise à sa manière : Kevin fixe ses fiches comme des haltères trop lourdes, Inès surligne avec un code couleur militaire, Dimitri fait des moulinets en récitant.',
    choices: [
      { text: 'Réviser sérieusement, seul.', next: 'c4_exam_qcm', effects: { setFlags: ['exam_revise'], gauges: { rigueur: 4 } } },
      { text: 'Organiser une révision de groupe.', next: 'c4_revision_groupe', effects: { gauges: { equipe: 8 }, relations: { kevin: 8, ines: 5, dimitri: 5 }, setFlags: ['exam_revise'] } },
      { text: 'Tu connais le cours. Repos stratégique.', next: 'c4_exam_qcm' }
    ]
  },
  {
    id: 'c4_revision_groupe',
    kind: 'narration',
    chapter: 4,
    background: 'foyer',
    text: 'Tu pousses deux tables. « Quiz tournant. Une question chacun. Celui qui rate paye un café au distributeur. »\n\nDeux heures plus tard, Kevin a payé quatre cafés mais répondu juste aux six dernières questions. Léa — tu ne l\'avais même pas vue s\'asseoir — a tout juste du premier coup, en dessinant pendant tout le quiz.\n\nKevin range ses fiches : « C\'est la première fois que réviser ressemble pas à une punition. »',
    effects: { skills: { equipe_skill: 5 }, relations: { lea: 6 } },
    next: 'c4_exam_qcm'
  },
  {
    id: 'c4_exam_qcm',
    kind: 'qcm',
    chapter: 4,
    background: 'salle_formation',
    speaker: 'Examen de filière',
    text: 'Le jour J. Tables espacées, téléphones dans une caisse, Moreau en personne qui surveille. « Quarante minutes. Commencez. »',
    qcm: {
      pool: 'logique',
      draw: 4,
      passThreshold: 0.7,
      successNext: 'c4_exam_ok',
      failNext: 'c4_exam_fail',
      successEffects: { gauges: { rigueur: 12, moral: 8 }, relations: { moreau: 10 }, setFlags: ['m10_done'], skills: { technique_filiere: 10 } },
      failEffects: { gauges: { moral: -8 }, setFlags: ['m10_fail'] },
      skill: 'technique_filiere'
    }
  },
  {
    id: 'c4_exam_ok',
    kind: 'dialogue',
    chapter: 4,
    background: 'salle_formation',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: 'Moreau rend les copies sans cérémonie. La tienne porte une annotation au crayon, sobre : « Conforme. Continuez. »\n\nDe Moreau, « continuez » est un mot d\'une générosité folle. Ferreira et lui ont dû suivre la même formation en compliments.',
    next: 'c4_code_intro'
  },
  {
    id: 'c4_exam_fail',
    kind: 'dialogue',
    chapter: 4,
    background: 'salle_formation',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: '« Insuffisant. »\n\nMoreau pose ta copie. Te regarde.\n\n« Deux lectures possibles. Première : vous n\'êtes pas fait pour ça. Deuxième : vous n\'avez pas encore travaillé comme quelqu\'un qui est fait pour ça. Je vous programme le rattrapage. Choisissez votre lecture d\'ici là. »',
    effects: { journal: 'Raté l\'exam de filière. Moreau m\'a parlé de "deux lectures". Je rumine. Demain je bosse.' },
    next: 'c4_code_intro'
  },
  {
    id: 'c4_code_intro',
    kind: 'narration',
    chapter: 4,
    background: 'salle_formation',
    text: 'Le code de la route. La salle d\'auto-école mobile s\'installe le jeudi : boîtiers, écran, quarante diapos de carrefours pluvieux.\n\nPour la moitié de la section, c\'est LA raison d\'être venu. Quand le formateur annonce « examen blanc la semaine prochaine, le vrai dans quinze jours », il y a un silence de cathédrale.',
    choices: [
      { text: 'Bachoter le livre de code chaque soir.', next: 'c4_code_qcm', effects: { addItems: ['livre_code'], setFlags: ['code_revise'], skills: { code_route: 8 } } },
      { text: 'Réviser avec Kevin — échange de bons procédés.', next: 'c4_code_kevin', conditions: [{ flag: 'kevin_revision' }], effects: { relations: { kevin: 10 }, setFlags: ['code_revise'], skills: { code_route: 6 } } },
      { text: 'Les questions de bon sens, ça se révise pas.', next: 'c4_code_qcm' }
    ]
  },
  {
    id: 'c4_code_kevin',
    kind: 'dialogue',
    chapter: 4,
    background: 'foyer',
    speaker: 'Kevin',
    npc: 'kevin',
    expression: 'happy',
    text: '« Les nœuds, tu m\'as sauvé. Le code, c\'est MON terrain. » Kevin sort un classeur — un vrai classeur, avec des intercalaires. « Trois ans que je conduis le tracteur de mon oncle. Le code, je le vis, frère. »\n\nSa méthode est imparable : chaque règle devient une histoire de tracteur. La priorité à droite ? Une anecdote de rond-point à Marans. Tu retiens tout.',
    effects: { gauges: { moral: 5 } },
    next: 'c4_code_qcm'
  },
  {
    id: 'c4_code_qcm',
    kind: 'qcm',
    chapter: 4,
    background: 'salle_formation',
    speaker: 'Examen — Code de la route',
    text: 'Le jour de l\'examen. Boîtier en main. Le formateur : « Quarante questions, cinq fautes maximum. C\'est parti. »',
    qcm: {
      pool: 'code_route',
      draw: 5,
      passThreshold: 0.8,
      successNext: 'c4_code_ok',
      failNext: 'c4_code_fail',
      successEffects: { gauges: { rigueur: 10, moral: 10 }, setFlags: ['m11_done', 'permis_ok'], addItems: ['attestation_code'], skills: { code_route: 15 } },
      failEffects: { gauges: { moral: -8 }, setFlags: ['m11_fail'] },
      skill: 'code_route'
    }
  },
  {
    id: 'c4_code_ok',
    kind: 'narration',
    chapter: 4,
    background: 'salle_formation',
    sound: 'fanfare_mini',
    text: 'FAVORABLE.\n\nLe mot s\'affiche et quelque chose se détend dans ta poitrine, un truc noué depuis des années peut-être. Le code. T\'as le code.\n\nDans le couloir, ceux qui l\'ont eu s\'appellent par leurs prénoms en criant. Ceux qui l\'ont raté sont entourés. Les deux scènes sont belles, chacune à sa façon.',
    effects: { journal: 'J\'AI LE CODE. Je l\'écris en majuscules parce que voilà. C\'est écrit. C\'est à moi. Personne peut le dé-écrire.' },
    next: 'c4_mission_citoyenne'
  },
  {
    id: 'c4_code_fail',
    kind: 'narration',
    chapter: 4,
    background: 'salle_formation',
    text: 'Six fautes. Une de trop.\n\nLe formateur te prend à part : « Rattrapage dans trois semaines. Tu sais ce qui m\'a frappé ? Tes six fautes sont toutes dans la même famille : la précipitation. T\'as répondu avant la fin de la question, quatre fois. Ralentis. Sur la route aussi, d\'ailleurs. »',
    effects: { journal: 'Raté le code à une faute. UNE. Le formateur dit que je me précipite. Il a raison et c\'est ça qui m\'énerve.' },
    next: 'c4_mission_citoyenne'
  },
  {
    id: 'c4_mission_citoyenne',
    kind: 'narration',
    chapter: 4,
    week: 7,
    background: 'ville_larochelle',
    music: 'mission_citoyenne',
    playerOutfit: 'sport',
    text: 'Semaine 7 : la mission citoyenne. La section est déployée trois jours en ville — remise en état d\'un centre social, distribution avec la banque alimentaire, nettoyage du littoral avec une association.\n\nC\'est la première fois que tu portes les couleurs du SMV *dehors*. Les gens te regardent autrement. Pas mieux, pas moins bien. Autrement. Comme quelqu\'un qui fait quelque chose.',
    choices: [
      {
        text: 'Proposer une fresque pour le mur du centre social.',
        next: 'c4_fresque',
        conditions: [{ any: [{ trait: 'creatif' }, { trait: 'artiste' }, { backgroundIn: ['passion_sans_debouche'] }] }],
        effects: { setFlags: ['fresque_proposee'] }
      },
      { text: 'Prendre la coordination du chantier de nettoyage.', next: 'c4_coordination', conditions: [{ any: [{ trait: 'leader' }, { skill: { key: 'equipe_skill', min: 20 } }] }], effects: { skills: { equipe_skill: 8, communication: 6 } } },
      { text: 'Travailler dur, sans te faire remarquer.', next: 'c4_mission_simple', effects: { skills: { savoir_etre: 6 } } }
    ]
  },
  {
    id: 'c4_fresque',
    kind: 'narration',
    chapter: 4,
    background: 'ville_larochelle',
    text: 'Le mur du centre social est gris depuis vingt ans. Tu proposes une fresque. Le directeur hésite, Ferreira tranche : « Si c\'est raté, vous repeignez en gris. Si c\'est réussi, vous signez. »\n\nTrois jours plus tard : les tours de La Rochelle stylisées, une vague, des silhouettes qui marchent vers le soleil levant. Léa a dessiné les contours sans qu\'on lui demande. Les gamins du quartier ont peint le bas du mur.\n\nVous signez. Le directeur prend une photo qui finira encadrée dans son bureau.',
    effects: { gauges: { moral: 15, equipe: 10 }, relations: { lea: 15, ferreira: 8 }, setFlags: ['m12_done', 'fresque_realisee'], achievements: ['artiste_terrain'], skills: { confiance_soi: 8 }, journal: 'On a peint une fresque. Elle restera là quand je serai parti. C\'est exactement le contraire de tout ce que j\'ai fait avant : d\'habitude je disparais et rien ne reste.' },
    next: 'c4_dimitri_crise'
  },
  {
    id: 'c4_coordination',
    kind: 'narration',
    chapter: 4,
    background: 'ville_larochelle',
    text: 'Quarante sacs de déchets, trois kilomètres de littoral, douze volontaires à répartir. Tu fais des binômes, des zones, des rotations pour que personne ne reste sur le secteur ingrat des rochers.\n\nÀ la fin, l\'association vous offre un café face à l\'océan. La bénévole la plus ancienne te glisse : « Ça fait quinze ans que je fais ça. C\'est la première fois qu\'une équipe finit en avance. »',
    effects: { gauges: { equipe: 12, moral: 8 }, setFlags: ['m12_done'], journal: 'Aujourd\'hui j\'ai organisé un truc et le truc a marché. Je note la date.' },
    next: 'c4_dimitri_crise'
  },
  {
    id: 'c4_mission_simple',
    kind: 'narration',
    chapter: 4,
    background: 'ville_larochelle',
    text: 'Tu portes, tu tries, tu nettoies. Sans bruit. À la banque alimentaire, une dame âgée te dit « merci mon grand » en te serrant l\'avant-bras, et ça vaut tous les galons du monde.\n\nLe soir, dans le bus du retour, la section sent la javel et la fierté.',
    effects: { gauges: { moral: 10, equipe: 8 }, setFlags: ['m12_done'], journal: 'Mission citoyenne. Une dame m\'a dit "merci mon grand". J\'ai pensé à cette phrase toute la journée. Être utile, c\'est pas compliqué en fait. Il fallait juste qu\'on me laisse essayer.' },
    next: 'c4_dimitri_crise'
  },
  {
    id: 'c4_dimitri_crise',
    kind: 'narration',
    chapter: 4,
    background: 'foyer',
    music: 'doubt_crisis',
    text: 'Jeudi soir. Le Foyer. Dimitri est seul dans le coin télé, et la télé est éteinte.\n\nDimitri ne s\'assoit jamais seul. Dimitri n\'éteint jamais une télé. Les statistiques hurlent.',
    choices: [
      {
        text: 'S\'asseoir à côté de lui. Attendre.',
        next: 'c4_dimitri_revelation',
        conditions: [{ relation: { key: 'dimitri', min: 35 } }],
        effects: { setFlags: ['s06_done'] }
      },
      { text: '« Eh. La télé est éteinte et t\'es toujours là. Diagnostic ? »', next: 'c4_dimitri_humour', effects: { relations: { dimitri: 5 } } },
      { text: 'Le laisser tranquille. Chacun ses soirs.', next: 'c4_fin_semaine', effects: { setFlags: ['dimitri_ignore_crise'] } }
    ]
  },
  {
    id: 'c4_dimitri_humour',
    kind: 'dialogue',
    chapter: 4,
    background: 'foyer',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'sad',
    text: 'Il sourit machinalement. Le sourire ne monte pas jusqu\'aux yeux.\n\n« Diagnostic : rien. Fatigue. » Il rallume la télé. Volume zéro.\n\nTu restes quand même. Au bout de vingt minutes, il dit, sans te regarder : « Mon père a appelé. Quinze ans sans nouvelles, et il appelle. Maintenant que je ressemble à quelque chose. »\n\nLa télé éclaire vos deux silences.',
    effects: { relations: { dimitri: 12 }, setFlags: ['s06_done', 'dimitri_pere_su'], skills: { intelligence_emo: 5 } },
    next: 'c4_fin_semaine'
  },
  {
    id: 'c4_dimitri_revelation',
    kind: 'dialogue',
    chapter: 4,
    background: 'foyer',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'sad',
    text: 'Tu t\'assois. Tu ne dis rien. C\'est lui qui craque le silence, au bout de dix minutes :\n\n« Tu veux vraiment savoir pourquoi je suis là ? Pas parce que j\'avais un projet. Parce que j\'avais besoin que quelqu\'un me dise quoi faire le matin. Sinon je restais dans mon lit. »\n\nIl fixe la télé éteinte.\n\n« Mon père est parti quand j\'avais huit ans. Depuis, je fais le mec drôle. Tu sais pourquoi les gens drôles sont drôles ? Parce qu\'on regarde pas longtemps quelqu\'un qui te fait rire. Toi... toi t\'as regardé. »',
    effects: { relations: { dimitri: 20 }, setFlags: ['dimitri_revelation', 'dimitri_pere_su'], achievements: ['frere_soeur'], gauges: { moral: 5 }, skills: { intelligence_emo: 8 }, journal: 'Dimitri m\'a parlé de son père ce soir. Je crois que je suis la première personne ici. Peut-être la première tout court. Je sais pas quoi faire de cette confiance, à part la mériter.' },
    next: 'c4_fin_semaine'
  },
  {
    id: 'c4_fin_semaine',
    kind: 'narration',
    chapter: 4,
    background: 'cour_caserne',
    music: 'formation',
    text: 'Fin de semaine 7. Sur le tableau d\'affichage, les conventions de stage sont punaisées. Ton nom y figure, avec une adresse en ville et une date : lundi, 8h00.\n\nLe stage. Le vrai monde. Celui qui ne sait pas que tu t\'es levé à 5h30 pendant sept semaines, et qui s\'en fiche, et c\'est très bien comme ça : tu vas le lui montrer autrement.',
    next: 'c5_intro'
  }
];
