import type { StoryNode } from '../../engine/types';

// CHAPITRE 3 — LA FORMATION (semaines 4-5)
// Protocole TOC TOC, Marche au Calot (20 km), cérémonie, choix de filière.
export const CHAPTER3: StoryNode[] = [
  {
    id: 'c3_intro',
    kind: 'transition',
    chapter: 3,
    week: 4,
    background: 'cour_caserne',
    music: 'formation',
    text: 'CHAPITRE 3 — LE CALOT SE MÉRITE\n\nSemaine 4. Quelque chose a changé sans prévenir : tu ne comptes plus les jours. Le matin, ton corps se lève avant le réveil. Ferreira connaît maintenant la moitié des prénoms de la section.\n\nCette semaine : le protocole. Dans dix jours : la Marche au Calot. Vingt kilomètres entre toi et le droit de porter le calot du régiment.',
    next: 'c3_toc_cours'
  },
  {
    id: 'c3_toc_cours',
    kind: 'dialogue',
    chapter: 3,
    background: 'salle_formation',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    music: 'protocol_learning',
    text: '« Le protocole d\'entrée dans un bureau. Vous trouvez ça théâtral ? C\'est le but. Le théâtre, c\'est ce qui reste quand on enlève le hasard. »\n\nIl se place devant la porte de la salle.\n\n« Deux coups. On attend "Avancez". Un pas, on s\'arrête. Salut main droite. On retire le couvre-chef. On décline : volontaire stagiaire, nom, compagnie, section, à vos ordres. On attend "Repos". Couvre-chef, salut, demi-tour à droite, on sort. Onze étapes. Dans l\'ordre. Toujours. »\n\nIl le fait une fois, en entier, parfaitement. Personne ne rit.',
    choices: [
      { text: 'Répéter le soir, seul, devant la porte de la chambrée.', next: 'c3_toc_qcm', effects: { gauges: { rigueur: 5 }, skills: { discipline: 5 }, setFlags: ['toc_revise'] } },
      { text: 'Répéter avec Dimitri, qui joue Ferreira en plus dramatique.', next: 'c3_toc_dimitri', effects: { relations: { dimitri: 10 }, setFlags: ['toc_revise'] } },
      { text: 'Onze étapes, c\'est bon, c\'est rangé.', next: 'c3_toc_qcm' }
    ]
  },
  {
    id: 'c3_toc_dimitri',
    kind: 'dialogue',
    chapter: 3,
    background: 'chambree',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'happy',
    text: 'Dimitri s\'assoit derrière une chaise retournée qui joue le bureau. Il fronce les sourcils, rentre le menton :\n\n« AVANCEZ. » Sa voix de Ferreira est tellement fausse qu\'elle en devient parfaite.\n\nTu rates trois fois le demi-tour. À la quatrième, c\'est fluide. À la cinquième, Dimitri se lève et te serre la main avec une solennité de président de la République. Vous riez comme des gamins. Quelqu\'un crie « DORMEZ » depuis le couloir.',
    effects: { gauges: { moral: 8 }, skills: { discipline: 4, confiance_soi: 3 } },
    next: 'c3_toc_qcm'
  },
  {
    id: 'c3_toc_qcm',
    kind: 'qcm',
    chapter: 3,
    background: 'bureau_ferreira',
    speaker: 'Évaluation — Protocole',
    text: 'Vendredi matin. Le bureau de Ferreira. Ton tour. Tu es dans le couloir, le cœur un peu trop rapide pour une simple porte.',
    qcm: {
      pool: 'protocole',
      draw: 5,
      passThreshold: 0.8,
      successNext: 'c3_toc_ok',
      failNext: 'c3_toc_fail',
      successEffects: { gauges: { rigueur: 8 }, relations: { ferreira: 8 }, skills: { confiance_soi: 6 }, setFlags: ['m06_done'] },
      failEffects: { gauges: { moral: -5 }, setFlags: ['m06_fail'] },
      skill: 'discipline'
    }
  },
  {
    id: 'c3_toc_ok',
    kind: 'dialogue',
    chapter: 3,
    background: 'bureau_ferreira',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    text: 'Tu sors du bureau. Derrière toi, la voix de Ferreira, neutre :\n\n« Propre. »\n\nDans le couloir, tu réalises que tu souris. Pour onze étapes et un demi-tour à droite. Il faut être tombé bien bas ou être monté bien haut pour que ce soit une victoire. Peut-être les deux.',
    next: 'c3_sara_conflit'
  },
  {
    id: 'c3_toc_fail',
    kind: 'dialogue',
    chapter: 3,
    background: 'bureau_ferreira',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    text: 'Demi-tour à gauche. Couvre-chef remis trop tôt. Ferreira ne hausse pas le ton.\n\n« Recommencez lundi. Le protocole, c\'est pas pour moi. C\'est pour le jour où vous entrerez dans le bureau d\'un patron. Là aussi, il y aura un ordre des choses. Là aussi, ça se verra si vous l\'avez ou pas. »',
    next: 'c3_sara_conflit'
  },
  {
    id: 'c3_sara_conflit',
    kind: 'narration',
    chapter: 3,
    background: 'cour_caserne',
    music: 'doubt_crisis',
    text: 'Lundi, ordre serré. Sara — la fille de la 2e chambrée qui sait tout mieux que tout le monde, et qui a souvent raison, c\'est ça le problème — conteste un ordre de Ferreira devant toute la section. Pas le fond. La forme. Mais en public.\n\nLe silence qui suit a une texture. Ferreira se tourne, lentement.',
    choices: [
      { text: 'Ne pas bouger. Ce duel ne te regarde pas.', next: 'c3_sara_suite', effects: {} },
      {
        text: 'Glisser à Sara, à voix basse : « Pas ici. Gagne pas la bataille, gagne la guerre. »',
        next: 'c3_sara_aide',
        conditions: [{ any: [{ trait: 'diplomate' }, { trait: 'mediateur' }, { attribute: { key: 'sociabilite', min: 4 } }] }],
        effects: { skills: { gestion_conflit: 8 }, setFlags: ['sara_aidee'] }
      },
      { text: 'Appuyer Sara à voix haute. Elle n\'a pas tort.', next: 'c3_sara_appui', effects: { gauges: { rigueur: -10 }, relations: { ferreira: -12 }, setFlags: ['appui_sara_public'] } }
    ]
  },
  {
    id: 'c3_sara_aide',
    kind: 'narration',
    chapter: 3,
    background: 'cour_caserne',
    text: 'Sara t\'entend. Sa mâchoire travaille. Puis elle ferme la bouche, rectifie la position. La tempête passe au-dessus sans éclater.\n\nAprès le rassemblement, elle te rattrape : « Je déteste qu\'on me dise quoi faire. » Un temps. « Merci quand même. » C\'est l\'équivalent Sara d\'une accolade.\n\nFerreira, lui, a tout vu. Évidemment qu\'il a tout vu.',
    effects: { relations: { ferreira: 6 }, gauges: { equipe: 5 } },
    next: 'c3_sara_suite'
  },
  {
    id: 'c3_sara_appui',
    kind: 'dialogue',
    chapter: 3,
    background: 'cour_caserne',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    expression: 'angry',
    text: '« Deux avis non sollicités dans le même rang. Le rang devient un forum. »\n\nSa voix ne monte pas. Elle descend, et c\'est pire.\n\n« Vous deux : corvée commune ce soir. Vous avez des choses à vous dire ? Vous les direz en astiquant. »\n\nLe soir, en frottant le sol du couloir avec Sara, vous parlez. Vraiment. Elle est moins dure de près. Tu comprends pourquoi elle a besoin d\'avoir raison : c\'est tout ce qu\'on lui a laissé.',
    effects: { gauges: { equipe: 8 }, setFlags: ['corvee_avec_sara'], journal: 'Corvée avec Sara. Ferreira nous a punis ensemble. Je crois que c\'était le but : ensemble.' },
    next: 'c3_sara_suite'
  },
  {
    id: 'c3_sara_suite',
    kind: 'narration',
    chapter: 3,
    week: 5,
    background: 'cour_caserne',
    text: 'Semaine 5. Sur le tableau de la section, une feuille : « MARCHE AU CALOT — SAMEDI 04h30 — 20 KM — TENUE TERRAIN COMPLÈTE ».\n\nVingt kilomètres avec sac. Au bout : le calot. Pas un grade, pas une médaille — un bout de tissu. Mais à la façon dont les anciens en parlent, tu as compris qu\'il pèse plus lourd que le sac.',
    next: 'c3_appel_famille'
  },
  {
    id: 'c3_appel_famille',
    kind: 'narration',
    chapter: 3,
    background: 'foyer',
    text: 'Vendredi soir. Le téléphone. Tu hésites devant le contact « Maison ».',
    choices: [
      {
        text: 'Appeler. Dire que demain, tu marches 20 bornes.',
        next: 'c3_appel_fait',
        effects: { gauges: { moral: 8 }, relations: { famille: 10 }, setFlags: ['appel_avant_marche', 's11_done'] }
      },
      { text: 'Ne pas appeler. Après la marche. Avec le calot.', next: 'c3_marche_veille', effects: { setFlags: ['appel_apres_marche_prevu'] } },
      { text: 'Écrire dans le journal à la place.', next: 'c3_marche_veille', effects: { gauges: { moral: 4 }, journal: 'Demain, 20 km. J\'ai pas appelé chez moi. J\'ai rien à prouver par téléphone. C\'est avec les pieds que ça se prouve, demain.' } }
    ]
  },
  {
    id: 'c3_appel_fait',
    kind: 'dialogue',
    chapter: 3,
    background: 'foyer',
    speaker: 'Famille',
    text: (ctx) => {
      const bg = ctx.sheet.backgroundId;
      if (bg === 'parent_jeune') return '« Allô ? » Une petite voix d\'abord — elle a voulu décrocher elle-même. Tu expliques la marche, le calot, les vingt kilomètres. Elle comprend rien et tout à la fois. « Tu vas gagner ? » Oui. Demain, tu vas gagner.';
      if (bg === 'conflit_parent' || bg === 'rupture_familiale') return 'Trois sonneries. Tu faillis raccrocher. Puis : « ...Allô ? » La conversation est courte, prudente, pleine de précautions des deux côtés. Mais à la fin : « Fais attention demain. » C\'est peu. Venant d\'où vous revenez tous les deux, c\'est immense.';
      return '« Vingt kilomètres ? Avec un sac ? » Au bout du fil, on s\'inquiète et on est fier en même temps, dans le désordre habituel des familles. « Appelle après. Promis ? » Promis.';
    },
    next: 'c3_marche_veille'
  },
  {
    id: 'c3_marche_veille',
    kind: 'narration',
    chapter: 3,
    background: 'chambree_nuit',
    music: 'fmi_night',
    text: 'Extinction des feux. Dans le noir, la voix de Dimitri : « Les gars. Demain soir, on a tous un calot ou on n\'a rien. Alors on s\'attend, hein. On s\'attend. »\n\nPersonne ne répond. Tout le monde a entendu.',
    effects: { gauges: { equipe: 5 } },
    next: 'c3_marche_depart'
  },
  {
    id: 'c3_marche_depart',
    kind: 'narration',
    chapter: 3,
    background: 'route_aube',
    music: 'marche_calot',
    playerOutfit: 'terrain',
    sound: 'step_boots_concrete',
    text: '4h30. Nuit noire, lampes rouges, le souffle qui fume. Ferreira en tête, un pas de métronome.\n\nKilomètre 1 : tout le monde plaisante.\nKilomètre 8 : plus personne ne plaisante.\nKilomètre 12 : le sac a doublé de poids, c\'est un fait scientifique inexpliqué.\n\nKilomètre 14 : devant toi, Thomas — ou Kevin si Thomas est parti — commence à zigzaguer. Et Inès serre les dents sur des ampoules qu\'on devine ouvertes.',
    choices: [
      {
        text: 'Prendre une partie du sac du camarade qui flanche.',
        next: 'c3_marche_aide',
        effects: { gauges: { equipe: 12, moral: 5 }, skills: { equipe_skill: 8, condition_physique: 5 }, setFlags: ['marche_aide_camarade'], achievements: ['solidaire'] }
      },
      {
        text: 'Marcher à côté d\'Inès. Parler. Distraire la douleur.',
        next: 'c3_marche_ines',
        conditions: [{ relation: { key: 'ines', min: 20 } }],
        effects: { relations: { ines: 15 }, gauges: { equipe: 8 }, setFlags: ['marche_avec_ines'] }
      },
      {
        text: 'Tenir ton rythme. Finir fort, devant.',
        next: 'c3_marche_tete',
        conditions: [{ attribute: { key: 'endurance', min: 4 } }],
        effects: { skills: { condition_physique: 10 }, setFlags: ['marche_en_tete'], achievements: ['sprinter'] }
      },
      {
        text: 'Survivre. Un pied. L\'autre pied.',
        next: 'c3_marche_survie',
        effects: { skills: { condition_physique: 6, resilience_emo: 5 } }
      }
    ]
  },
  {
    id: 'c3_marche_aide',
    kind: 'narration',
    chapter: 3,
    background: 'route_jour',
    text: 'Tu dégrafes la sangle du haut de son sac et tu la passes sur ton épaule. Dix kilos de plus. Tes jambes protestent par écrit, en trois exemplaires.\n\n« Lâche pas. Regarde mes pieds. Pas la route. Mes pieds. » Les mêmes mots que dans la boue. Ça devient votre langue.\n\nKilomètre 20. La grille de la caserne. Vous la franchissez ensemble, dans les derniers, et la section entière — arrivée avant — s\'est retournée pour vous regarder entrer. Quelqu\'un applaudit. Puis tout le monde.',
    effects: { gauges: { moral: 10 }, relations: { thomas: 15, ferreira: 10 }, setFlags: ['m07_done'] },
    next: 'c3_ceremonie'
  },
  {
    id: 'c3_marche_ines',
    kind: 'dialogue',
    chapter: 3,
    background: 'route_jour',
    speaker: 'Inès',
    npc: 'ines',
    expression: 'neutral',
    text: 'Kilomètre 16, elle parle pour ne pas pleurer. Kilomètre 17, elle te raconte Bordeaux, la rupture, la fuite. Kilomètre 18, elle se tait, mais c\'est un silence qui marche tout seul.\n\nKilomètre 20. La grille. Elle s\'arrête juste avant, une seconde. « Je pensais pas être capable de finir. » Elle franchit la ligne en premier de vous deux. Tu l\'as laissée passer. Elle le sait.',
    effects: { gauges: { moral: 8 }, setFlags: ['m07_done'], journal: 'Inès a fini la marche. Moi aussi, mais c\'est pas le sujet. Le sujet c\'est sa tête quand elle a passé la grille.' },
    next: 'c3_ceremonie'
  },
  {
    id: 'c3_marche_tete',
    kind: 'narration',
    chapter: 3,
    background: 'route_jour',
    text: 'Tu finis troisième, juste derrière les deux anciens sportifs. Les jambes en feu, le mental en titane.\n\nFerreira te regarde passer la grille. « Bonne foulée. » Puis, sans changer de ton : « La section arrive dans quarante minutes. Vous l\'attendrez ici. Debout. » Ce n\'est pas une punition. C\'est une leçon, format Ferreira : on finit une marche quand le dernier la finit.',
    effects: { gauges: { moral: 5, equipe: -5 }, relations: { ferreira: 5 }, setFlags: ['m07_done'] },
    next: 'c3_ceremonie'
  },
  {
    id: 'c3_marche_survie',
    kind: 'narration',
    chapter: 3,
    background: 'route_jour',
    text: 'Un pied. L\'autre pied. Le monde se réduit à deux mètres de bitume et au dos de celui qui te précède.\n\nKilomètre 19, tu pleures peut-être un peu, mais il pleut peut-être un peu aussi, l\'histoire ne tranchera pas.\n\nKilomètre 20. La grille. Tu l\'as fait. Personne ne saura jamais ce que ces vingt kilomètres t\'ont coûté exactement. C\'est le propre des vraies victoires : elles sont illisibles de l\'extérieur.',
    effects: { gauges: { moral: 8 }, setFlags: ['m07_done'], journal: 'J\'ai fini la marche. Vingt kilomètres. Je croyais connaître mes limites. Elles habitent plus loin que prévu.' },
    next: 'c3_ceremonie'
  },
  {
    id: 'c3_ceremonie',
    kind: 'narration',
    chapter: 3,
    background: 'cour_ceremonie',
    music: 'ceremony',
    playerOutfit: 'ceremonie',
    sound: 'fanfare_major',
    text: 'Dimanche, 11h00. Cour d\'honneur. Les familles sont là, sur le côté — des mères endimanchées, des pères qui ne savent pas où mettre leurs mains, des petits frères qui trouvent tout « stylé ».\n\nLa section est alignée, tenue impeccable. Le Commandant passe les rangs en silence. Et Ferreira remet les calots, un par un, avec un mot pour chacun. Un seul. Choisi.\n\nTon tour arrive.',
    conditionalNext: [
      { conditions: [{ flag: 'appel_avant_marche' }], next: 'c3_ceremonie_famille' }
    ],
    next: 'c3_ceremonie_calot'
  },
  {
    id: 'c3_ceremonie_famille',
    kind: 'narration',
    chapter: 3,
    background: 'cour_ceremonie',
    text: 'Tu balaies la rangée des familles du regard, par réflexe, sans y croire.\n\nIls sont là.\n\nIls sont venus. Tu ne savais pas. Ton cœur fait une chose compliquée que le garde-à-vous est précisément conçu pour cacher.',
    effects: { gauges: { moral: 15 }, relations: { famille: 15 }, achievements: ['calot_famille'], setFlags: ['famille_ceremonie'] },
    next: 'c3_ceremonie_calot'
  },
  {
    id: 'c3_ceremonie_calot',
    kind: 'dialogue',
    chapter: 3,
    background: 'cour_ceremonie',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    text: (ctx) => {
      if (ctx.flags.has('marche_aide_camarade')) return `Ferreira ajuste le calot sur ta tête. Te regarde.\n\n« Solidaire. »\n\nUn mot. Le tien. Il passe au suivant. Tu fixes l'horizon réglementaire, et l'horizon est flou, et ce n'est pas la pluie cette fois.`;
      if (ctx.flags.has('marche_en_tete')) return `Ferreira ajuste le calot sur ta tête.\n\n« Du coffre. Reste à trouver le cap. »\n\nSix mots. Tu les déplieras pendant des semaines.`;
      if (ctx.flags.has('marche_avec_ines')) return `Ferreira ajuste le calot sur ta tête.\n\n« Vous regardez les autres. C'est rare. »\n\nIl passe au suivant. Tu restes avec ça, qui ressemble énormément à un compliment.`;
      return `Ferreira ajuste le calot sur ta tête. Te regarde une seconde.\n\n« Mérité. »\n\nUn mot. Le tien. La fanfare reprend. Tu portes un bout de tissu qui pèse vingt kilomètres.`;
    },
    effects: { addItems: ['calot', 'insigne'], gauges: { moral: 20 }, setFlags: ['m08_done'], journal: 'J\'ai le calot. Ferreira m\'a dit un mot en le posant. Un seul. Je le répéterai à personne. Il est à moi.' },
    next: 'c3_filiere_intro'
  },
  {
    id: 'c3_filiere_intro',
    kind: 'dialogue',
    chapter: 3,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    music: 'formation',
    text: '« Asseyez-vous. »\n\nLe capitaine Moreau parle peu et ne perd rien. Sur son bureau, ton dossier — plus épais que tu ne l\'imaginais.\n\n« La FMI s\'achève. Maintenant, le vrai sujet : votre filière professionnelle. Huit possibilités. Je ne vais pas choisir pour vous. Je vais juste vous poser la seule question utile : qu\'est-ce que vous savez faire quand personne ne vous regarde ? »',
    choices: [
      { text: 'Logistique / Transport — « Organiser. Que ça roule. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_logistique', 'm09_done'] } },
      { text: 'BTP / Bâtiment — « Construire. Du concret qui reste. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_btp', 'm09_done'] } },
      { text: 'Sécurité privée — « Veiller. Garder son calme. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_securite', 'm09_done'] } },
      { text: 'Voir les cinq autres filières.', next: 'c3_filiere_suite' }
    ]
  },
  {
    id: 'c3_filiere_suite',
    kind: 'dialogue',
    chapter: 3,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: 'Moreau pousse la plaquette vers toi.',
    choices: [
      { text: 'Espaces verts — « Dehors. Les mains dans le vivant. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_espaces_verts', 'm09_done'] } },
      { text: 'Industrie / Soudure — « La précision. Le métal. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_industrie', 'm09_done'] } },
      { text: 'Hôtellerie / Restauration — « Le rush. Le service. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_resto', 'm09_done'] } },
      { text: 'Services à la personne — « Être utile à quelqu\'un, directement. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_services', 'm09_done'] } },
      { text: 'Numérique / Communication — « Les écrans, mais pour de vrai. »', next: 'c3_filiere_choisie', effects: { setFlags: ['filiere_numerique', 'm09_done'] } }
    ]
  },
  {
    id: 'c3_filiere_choisie',
    kind: 'dialogue',
    chapter: 3,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: (ctx) => {
      const f = ['filiere_logistique', 'filiere_btp', 'filiere_securite', 'filiere_espaces_verts', 'filiere_industrie', 'filiere_resto', 'filiere_services', 'filiere_numerique'].find((x) => ctx.flags.has(x));
      const names: Record<string, string> = {
        filiere_logistique: 'Logistique. Entrepôt partenaire au port de La Rochelle. CACES en fin de parcours si vous tenez la distance.',
        filiere_btp: 'Bâtiment. Chantier de rénovation en centre-ville. Des artisans qui ne pardonnent pas l\'à-peu-près. Vous allez aimer ou apprendre. Idéalement les deux.',
        filiere_securite: 'Sécurité. Poste de garde, gestion de conflit, sang-froid. On ne forme pas des gros bras. On forme des gens calmes.',
        filiere_espaces_verts: 'Espaces verts. Parc Charruyer, équipe municipale. Le vivant ne triche pas : ce que vous négligez meurt, ce que vous soignez pousse.',
        filiere_industrie: 'Industrie. Atelier de métallurgie, initiation soudure. Le métal garde la trace de chaque geste. Comme les dossiers.',
        filiere_resto: 'Restauration. Brasserie du Vieux-Port. Le rush de midi est une FMI quotidienne, vous verrez.',
        filiere_services: 'Services à la personne. EHPAD partenaire. C\'est la filière la plus dure et personne ne le sait. Les résidents, eux, le savent.',
        filiere_numerique: 'Numérique. Agence de communication digitale, La Rochelle. Internet, vous connaissez. Internet professionnel, vous allez découvrir.'
      };
      return `« ${f ? names[f] : 'Bon choix.'} »\n\nIl referme le dossier.\n\n« Formation théorique deux semaines, examen, puis stage. À partir de maintenant, ce que vous faites compte double : c'est votre CV qui s'écrit. Rompez. »`;
    },
    effects: { journal: 'J\'ai choisi ma filière aujourd\'hui. Moreau m\'a demandé ce que je sais faire quand personne me regarde. Je pense encore à la question. C\'est ça, les bonnes questions : elles restent.' },
    next: 'c4_intro'
  }
];
