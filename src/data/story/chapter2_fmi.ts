import type { StoryNode } from '../../engine/types';

// CHAPITRE 2 — LA FMI (semaines 2-3)
// Parcours boue, nœuds, crise de Thomas, dilemme Enzo, bivouac Karola.
export const CHAPTER2: StoryNode[] = [
  {
    id: 'c2_intro',
    kind: 'transition',
    chapter: 2,
    week: 2,
    background: 'cour_caserne',
    music: 'fmi_day',
    text: 'CHAPITRE 2 — LA FORMATION MILITAIRE INITIALE\n\nSemaine 2. Le corps commence à comprendre ce que la tête refusait : on s\'habitue à tout, même à 5h30. Les rangs sont plus droits. Les lits sont plus carrés. Et Ferreira a commencé à apprendre des prénoms — jamais le tien pour l\'instant.',
    next: 'c2_humeur'
  },
  {
    id: 'c2_humeur',
    kind: 'dialogue',
    chapter: 2,
    background: 'chambree',
    speaker: '',
    text: 'Ce matin, avant le rassemblement, comment tu te sens ?',
    choices: [
      { text: 'Motivé.', next: 'c2_parcours_intro', effects: { gauges: { motivation: 3, rigueur: 2 } } },
      { text: 'Fatigué.', next: 'c2_parcours_intro', effects: { setFlags: ['humeur_fatigue'] } },
      { text: 'Anxieux.', next: 'c2_parcours_intro', effects: { setFlags: ['humeur_anxieux'] } },
      { text: 'Étrangement bien.', next: 'c2_parcours_intro', effects: { gauges: { moral: 3 } } }
    ]
  },
  {
    id: 'c2_parcours_intro',
    kind: 'dialogue',
    chapter: 2,
    background: 'terrain_boue',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    music: 'fmi_day',
    sound: 'rain_light',
    text: '« Parcours d\'aguerrissement. De la boue, des obstacles, du froid. Votre corps va vous dire d\'arrêter au bout de dix minutes. Votre corps est un menteur. Vous avez tous trois fois plus de réserves que ce que vous croyez. La preuve dans quarante minutes. En position ! »',
    next: 'c2_parcours_epreuve'
  },
  {
    id: 'c2_parcours_epreuve',
    kind: 'narration',
    chapter: 2,
    background: 'terrain_boue',
    sound: 'step_boots_mud',
    text: 'La boue est froide, épaisse, partout. Le troisième obstacle est un mur d\'1m80. Au cinquième, tes bras ne répondent plus vraiment. À mi-parcours, tu entends Thomas derrière toi — sa respiration est un bruit de panique.',
    choices: [
      {
        text: 'Ralentir, prendre Thomas dans ta foulée.',
        next: 'c2_parcours_thomas',
        effects: { relations: { thomas: 15 }, gauges: { equipe: 8, motivation: 3 }, skills: { equipe_skill: 6 }, setFlags: ['aide_thomas_parcours', 's01_done'] }
      },
      {
        text: 'Tenir ton rythme. Chacun sa course.',
        next: 'c2_parcours_solo',
        effects: { skills: { condition_physique: 6 }, gauges: { rigueur: 3 } },
        conditions: []
      },
      {
        text: 'Accélérer. Finir dans les premiers.',
        next: 'c2_parcours_sprint',
        conditions: [{ attribute: { key: 'endurance', min: 4 } }],
        effects: { skills: { condition_physique: 8 }, setFlags: ['parcours_premier'] }
      }
    ]
  },
  {
    id: 'c2_parcours_thomas',
    kind: 'dialogue',
    chapter: 2,
    background: 'terrain_boue',
    speaker: 'Thomas',
    npc: 'thomas',
    expression: 'surprised',
    text: 'Tu cales ton pas sur le sien. « Regarde mes pieds. Pas le mur. Mes pieds. »\n\nIl s\'accroche. Au mur d\'1m80, tu fais la courte échelle. Il passe. Il te tend la main de l\'autre côté — et c\'est lui qui te hisse.\n\nVous finissez avant-derniers, couverts de boue des cheveux aux rangers. Ferreira note quelque chose sur son carnet. Tu jurerais qu\'il ne note pas le temps.',
    effects: { gauges: { moral: 5 }, setFlags: ['m03_done', 'ferreira_a_vu_aide'] },
    next: 'c2_noeuds_cours'
  },
  {
    id: 'c2_parcours_solo',
    kind: 'narration',
    chapter: 2,
    background: 'terrain_boue',
    text: 'Tu finis dans le milieu du peloton, les poumons en feu, les jambes en béton. Derrière toi, Thomas franchit la ligne bien plus tard, blanc comme un linge, aidé par personne.\n\nIl ne t\'en veut pas. Il ne dit rien. C\'est presque pire.',
    effects: { setFlags: ['m03_done'] },
    next: 'c2_noeuds_cours'
  },
  {
    id: 'c2_parcours_sprint',
    kind: 'narration',
    chapter: 2,
    background: 'terrain_boue',
    text: 'Tu doubles tout le monde sur la fin. Premier. Les jambes tremblent, le cœur cogne, mais tu l\'as fait.\n\nFerreira te regarde franchir la ligne. « Pas mal. » Deux mots. De lui, c\'est une médaille.\n\nDerrière, loin derrière, Thomas finit seul.',
    effects: { relations: { ferreira: 8 }, gauges: { moral: 5 }, setFlags: ['m03_done'] },
    next: 'c2_noeuds_cours'
  },
  {
    id: 'c2_noeuds_cours',
    kind: 'dialogue',
    chapter: 2,
    background: 'salle_formation',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    music: 'protocol_learning',
    text: '« Les nœuds. Vous trouvez ça ringard ? Un nœud de chaise a sauvé plus de vies que tous vos téléphones réunis. Boucle fixe : sauvetage. Cabestan : amarrage sur support cylindrique. Nœud plat : relier deux cordes de même diamètre. Le nœud de vache, c\'est le nœud plat des gens qui n\'écoutent pas — il glisse, et quand il glisse, quelqu\'un tombe. »\n\nIl fait chaque nœud une fois, lentement. Puis une fois à vitesse réelle. C\'est presque beau.\n\n« Test demain. »',
    effects: { addItems: ['fiches_noeuds'] },
    choices: [
      { text: 'Réviser le soir avec les fiches.', next: 'c2_qcm_noeuds', effects: { gauges: { rigueur: 5 }, setFlags: ['revise_noeuds'] } },
      { text: 'Proposer à Kevin de réviser ensemble — il galère.', next: 'c2_kevin_revision', effects: { relations: { kevin: 12 }, skills: { equipe_skill: 4 } } },
      { text: 'Tu as compris. Pas besoin de réviser.', next: 'c2_qcm_noeuds', effects: { setFlags: ['pas_revise'] } }
    ]
  },
  {
    id: 'c2_kevin_revision',
    kind: 'dialogue',
    chapter: 2,
    background: 'foyer',
    speaker: 'Kevin',
    npc: 'kevin',
    expression: 'surprised',
    text: '« Moi ? Non mais ça va, je gère, c\'est juste que... »\n\nIl regarde la corde dans ses mains. Le nœud ressemble à un accident de spaghettis.\n\n« ...Ouais. OK. S\'il te plaît. Mais tu le dis à personne. Je suis le mec du sport, tu vois. Le mec du sport il sait faire des nœuds, normalement. »\n\nVous passez une heure au Foyer. À la fin, son nœud de chaise tient. Le tien aussi, mieux qu\'avant — on apprend deux fois ce qu\'on enseigne.',
    effects: { gauges: { equipe: 5, moral: 3 }, setFlags: ['revise_noeuds', 'kevin_revision'], skills: { intelligence_emo: 3 } },
    next: 'c2_qcm_noeuds'
  },
  {
    id: 'c2_qcm_noeuds',
    kind: 'qcm',
    chapter: 2,
    background: 'salle_formation',
    speaker: 'Test — Nœuds militaires',
    text: 'Le lendemain matin. Feuille, stylo, six questions. Ferreira circule entre les tables, mains dans le dos.',
    qcm: {
      pool: 'noeuds',
      draw: 4,
      passThreshold: 0.75,
      successNext: 'c2_noeuds_ok',
      failNext: 'c2_noeuds_fail',
      successEffects: { gauges: { rigueur: 10 }, relations: { ferreira: 5 }, setFlags: ['m05_done'] },
      failEffects: { gauges: { rigueur: -3, moral: -5 }, setFlags: ['m05_fail'] },
      skill: 'terrain'
    }
  },
  {
    id: 'c2_noeuds_ok',
    kind: 'dialogue',
    chapter: 2,
    background: 'salle_formation',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    text: 'Ferreira parcourt ta copie. Hoche la tête une fois.\n\n« Correct. »\n\nDans sa langue, ça veut dire bravo.',
    next: 'c2_thomas_crise'
  },
  {
    id: 'c2_noeuds_fail',
    kind: 'dialogue',
    chapter: 2,
    background: 'salle_formation',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    text: '« Vous referez le test. Pas pour la note. Parce que le jour où quelqu\'un sera suspendu à votre nœud, j\'aimerais que vous soyez sûr de vous. »\n\nIl pose les fiches sur ta table. Sans commentaire. C\'est sa façon de dire : recommence, je t\'attends.',
    next: 'c2_thomas_crise'
  },
  {
    id: 'c2_thomas_crise',
    kind: 'dialogue',
    chapter: 2,
    week: 3,
    background: 'chambree_nuit',
    music: 'doubt_crisis',
    speaker: 'Thomas',
    npc: 'thomas',
    expression: 'sad',
    text: 'Semaine 3, mardi soir. Tu trouves Thomas assis sur son lit, son sac à moitié fait.\n\n« Je rentre. C\'est pas pour moi. J\'ai eu ma mère au téléphone, elle dit que c\'est pas grave, que je peux revenir... J\'arrive pas à dormir, j\'arrive pas à suivre, j\'ai mal partout, et je... »\n\nSa voix se casse. « Dis-moi que je suis pas un lâche. »',
    choices: [
      {
        text: '« T\'es pas un lâche. Et tu pars pas ce soir. Ce soir tu dors. On en reparle demain. »',
        next: 'c2_thomas_reste',
        effects: { relations: { thomas: 20 }, gauges: { equipe: 5 }, skills: { intelligence_emo: 6 }, setFlags: ['thomas_sauve_crise'] },
        timed: true
      },
      {
        text: '« Si tu sens que c\'est pas ta place, force pas. »',
        next: 'c2_thomas_part_prep',
        effects: { setFlags: ['thomas_encourage_depart'] },
        timed: true
      },
      {
        text: 'Aller chercher Dimitri en renfort.',
        next: 'c2_thomas_dimitri',
        effects: { relations: { dimitri: 8, thomas: 12 }, setFlags: ['thomas_sauve_crise'] },
        timed: true,
        conditions: [{ relation: { key: 'dimitri', min: 15 } }]
      }
    ]
  },
  {
    id: 'c2_thomas_reste',
    kind: 'narration',
    chapter: 2,
    background: 'chambree_nuit',
    text: 'Il te regarde longtemps. Puis il vide son sac, lentement, comme on défait une décision.\n\n« Demain », il répète. Comme si le mot était une corde et qu\'il venait d\'apprendre à faire le nœud qui tient.\n\nLe lendemain, il est au rassemblement. Le surlendemain aussi.',
    effects: { gauges: { moral: 5 }, journal: 'Thomas a failli partir cette nuit. Il est resté. Je sais pas si c\'est grâce à moi. Je sais juste que j\'étais là.' },
    next: 'c2_zone_fumeur'
  },
  {
    id: 'c2_thomas_dimitri',
    kind: 'dialogue',
    chapter: 2,
    background: 'chambree_nuit',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'neutral',
    text: 'Dimitri arrive, s\'assoit par terre face à Thomas. Pas de vanne, pour une fois.\n\n« Tu sais pourquoi je suis là, moi ? Parce que chez moi, personne m\'attendait le matin. Ici, si je suis pas au rassemblement à 5h45, vingt personnes le remarquent. T\'as déjà eu ça, toi, vingt personnes qui remarquent que t\'es pas là ? »\n\nThomas ne répond pas. Mais il range son sac.',
    effects: { gauges: { moral: 5 }, journal: 'Dimitri a sorti un truc cette nuit que j\'oublierai pas. Le mec le plus drôle de la section. C\'est toujours eux.' },
    next: 'c2_zone_fumeur'
  },
  {
    id: 'c2_thomas_part_prep',
    kind: 'narration',
    chapter: 2,
    background: 'chambree_nuit',
    text: 'Il hoche la tête lentement. « Ouais. Ouais, t\'as raison. »\n\nTu ne sauras jamais si c\'est ce que tu as dit, ou la façon dont tu l\'as dit. Une semaine plus tard, son lit est vide, ses draps pliés au carré — la seule chose qu\'il aura parfaitement réussie ici.\n\nDans ton casier, une lettre : « Merci d\'avoir été réglo. C\'était pas ta faute. T\'es la seule personne à qui je dis au revoir. — Thomas »',
    effects: { setFlags: ['thomas_parti'], addItems: ['lettre_thomas'], gauges: { moral: -8, equipe: -5 }, journal: 'Thomas est parti. Il m\'a laissé une lettre. Je la garde. Je sais pas encore ce qu\'elle me reproche, ou si elle me reproche quelque chose.' },
    next: 'c2_zone_fumeur'
  },
  {
    id: 'c2_zone_fumeur',
    kind: 'narration',
    chapter: 2,
    background: 'zone_fumeur',
    text: 'Jeudi, pause de 10h. La zone fumeur, c\'est la salle de presse de la caserne : tout s\'y dit, tout s\'y déforme. Aujourd\'hui, Enzo — un volontaire de l\'autre chambrée, sourire en coin permanent — tient salon.\n\n« ...moi je vous dis qu\'il y a un mec de la 2e section qui a reçu un colis *spécial* cette semaine. » Il rit. Trop fort. Les rumeurs, ici, c\'est comme les nœuds : y en a qui tiennent, y en a qui glissent.',
    choices: [
      { text: 'Écouter sans participer.', next: 'c2_rumeur', effects: { setFlags: ['enzo_rumor'] } },
      { text: '« C\'est toi le colis spécial, Enzo. »', next: 'c2_enzo_vanne', effects: { relations: { enzo: 8 }, gauges: { equipe: 3 } } },
      { text: 'Partir. Les rumeurs, très peu pour toi.', next: 'c2_bivouac_intro', effects: { gauges: { rigueur: 3 } } }
    ]
  },
  {
    id: 'c2_enzo_vanne',
    kind: 'dialogue',
    chapter: 2,
    background: 'zone_fumeur',
    speaker: 'Enzo',
    npc: 'enzo',
    expression: 'happy',
    text: 'Il te pointe du doigt, ravi. « Ah ! J\'aime bien toi. T\'as de la répartie. Les autres là, ils me regardent comme si j\'étais la télé. »\n\nIl baisse d\'un ton. « Reste dans le coin. Les gens drôles, c\'est une denrée rare ici. »',
    effects: { setFlags: ['enzo_rumor'] },
    next: 'c2_bivouac_intro'
  },
  {
    id: 'c2_rumeur',
    kind: 'narration',
    chapter: 2,
    background: 'zone_fumeur',
    text: 'Tu écoutes. Entre deux vannes, tu recoupes : le « colis spécial », c\'est Enzo lui-même qui l\'a reçu. Et ce qu\'il planque, ça ne se fume pas, ça se boit.\n\nUne information, c\'est comme une grenade. Tant que tu la gardes, elle ne fait de mal à personne.',
    effects: { setFlags: ['enzo_alcool_suspecte'] },
    next: 'c2_fouille_choix'
  },
  {
    id: 'c2_fouille_choix',
    kind: 'narration',
    chapter: 2,
    background: 'chambree',
    text: 'Samedi après-midi, quartier libre. La chambrée d\'Enzo est vide. Sa porte est entrouverte. Tu passes devant, exactement comme par hasard.',
    choices: [
      {
        text: 'Entrer. Vérifier sous le lit.',
        next: 'c2_fouille',
        effects: {}
      },
      { text: 'Continuer ton chemin. Pas tes affaires.', next: 'c2_bivouac_intro', effects: { gauges: { rigueur: 2 }, journal: 'J\'ai pas fouillé. Chacun ses placards, chacun ses fantômes.' } }
    ]
  },
  {
    id: 'c2_fouille',
    kind: 'narration',
    chapter: 2,
    background: 'chambree',
    sound: 'item_pickup',
    text: 'Sous le lit, derrière le sac de paquetage : une bouteille. Vodka premier prix, à moitié pleine. À la caserne, c\'est un motif d\'exclusion sec.\n\nDes pas dans le couloir. Tu as trois secondes.',
    choices: [
      {
        text: 'Reposer la bouteille. Tu n\'as rien vu.',
        next: 'c2_bivouac_intro',
        timed: true,
        effects: { setFlags: ['enzo_alcool_discovered', 'enzo_couvert'], journal: 'J\'ai reposé la bouteille. Je sais pas si c\'est de la loyauté ou de la lâcheté. Les deux se ressemblent, vues de près.' }
      },
      {
        text: 'La prendre. Tu décideras plus tard.',
        next: 'c2_bouteille_prise',
        timed: true,
        effects: { addItems: ['bouteille_enzo'], setFlags: ['enzo_alcool_discovered'] }
      }
    ]
  },
  {
    id: 'c2_bouteille_prise',
    kind: 'narration',
    chapter: 2,
    background: 'couloir',
    text: 'Tu sors, la bouteille sous la veste, le cœur à 140. Personne. Tu la planques au fond de ton casier, enroulée dans un t-shirt.\n\nMaintenant, c\'est TON problème. Dénoncer Enzo ? Lui rendre en lui parlant ? La faire disparaître ? Chaque option a un prix. Tu as quelques jours pour choisir.',
    next: 'c2_enzo_dilemme'
  },
  {
    id: 'c2_enzo_dilemme',
    kind: 'narration',
    chapter: 2,
    background: 'couloir',
    text: 'Dimanche soir. La bouteille est toujours dans ton casier. Demain, inspection possible. Il faut trancher.',
    choices: [
      {
        text: 'Aller voir Ferreira. Dire ce que tu as trouvé.',
        next: 'c2_denonce',
        effects: { relations: { ferreira: 15, enzo: -40 }, gauges: { equipe: -15 }, setFlags: ['enzo_denonce', 's08_done'], removeItems: ['bouteille_enzo'], achievements: ['informateur'] }
      },
      {
        text: 'Rendre la bouteille à Enzo. Et lui parler.',
        next: 'c2_protege',
        effects: { relations: { enzo: 25 }, gauges: { equipe: 10, rigueur: -5 }, setFlags: ['enzo_protege', 's08_done'], removeItems: ['bouteille_enzo'], achievements: ['bouclier'] }
      },
      {
        text: 'La vider dans le lavabo. Ni vu, ni connu, ni complice.',
        next: 'c2_vide',
        effects: { setFlags: ['enzo_bouteille_videe', 's08_done'], removeItems: ['bouteille_enzo'], gauges: { rigueur: 5 } }
      }
    ]
  },
  {
    id: 'c2_denonce',
    kind: 'dialogue',
    chapter: 2,
    background: 'bureau_ferreira',
    speaker: 'Adjudant Ferreira',
    npc: 'ferreira',
    text: 'Ferreira t\'écoute sans t\'interrompre. Prend la bouteille. La pose sur son bureau.\n\n« Vous avez bien fait. Et vous allez le payer. Les deux sont vrais en même temps — bienvenue dans les décisions d\'adulte. »\n\nEnzo est convoqué le soir même. Il échappe à l\'exclusion, de peu. Au réfectoire, désormais, certaines tables se taisent quand tu passes.',
    effects: { journal: 'J\'ai dénoncé. Ferreira dit que j\'ai bien fait. La moitié de la section pense le contraire. Les deux ont raison, et c\'est ça le pire.' },
    next: 'c2_bivouac_intro'
  },
  {
    id: 'c2_protege',
    kind: 'dialogue',
    chapter: 2,
    background: 'zone_fumeur',
    speaker: 'Enzo',
    npc: 'enzo',
    expression: 'surprised',
    text: 'Tu lui tends le t-shirt roulé. Il comprend au poids. Son sourire en coin disparaît pour la première fois depuis que tu le connais.\n\n« ...Pourquoi tu l\'as pas balancée ? »\n\n« Parce que je te balance pas, toi. Mais la prochaine, je la trouve pas : elle existe pas. On est d\'accord ? »\n\nIl te regarde longtemps. « ...Ouais. D\'accord. » Puis, plus bas : « Personne a jamais fait ça pour moi. »',
    effects: { journal: 'J\'ai rendu la bouteille à Enzo. Avec une condition. Il a dit oui. On verra si les promesses de zone fumeur tiennent mieux que les nœuds de vache.' },
    next: 'c2_bivouac_intro'
  },
  {
    id: 'c2_vide',
    kind: 'narration',
    chapter: 2,
    background: 'couloir',
    text: 'Dimanche, 23h40. Le lavabo du fond. L\'alcool fait un bruit de pluie en disparaissant. Tu rinces, tu jettes la bouteille dans le conteneur derrière les cuisines.\n\nEnzo ne saura jamais qui. Il soupçonnera tout le monde pendant deux semaines. C\'est peut-être la punition la plus juste que tu pouvais inventer.',
    effects: { journal: 'La bouteille n\'existe plus. Personne ne saura. Même pas moi, dans six mois, si je décide d\'oublier.' },
    next: 'c2_bivouac_intro'
  },
  {
    id: 'c2_bivouac_intro',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_jour',
    music: 'bivouac',
    playerOutfit: 'terrain',
    text: 'Fin de semaine 3 : bivouac au camp Karola, sur la côte. Deux jours de terrain — montage de tentes, topographie, marche de nuit, feu de camp réglementairement encadré mais feu de camp quand même.\n\nL\'océan est à huit cents mètres. On l\'entend sans le voir. Ferreira est différent ici. Plus silencieux. Presque chez lui.',
    next: 'c2_topo'
  },
  {
    id: 'c2_topo',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_jour',
    text: 'Exercice de topographie : rejoindre un point de coordonnées avec carte et boussole, par équipe de deux. On te met avec Inès.\n\nAu bout de vingt minutes, le chemin prévu n\'existe plus — un champ clôturé que la carte ignore. Inès regarde la carte, puis toi.',
    choices: [
      {
        text: 'Recalculer un azimut de contournement, proprement.',
        next: 'c2_topo_ok',
        conditions: [{ attribute: { key: 'intelligence', min: 3 } }],
        effects: { skills: { terrain: 8 }, relations: { ines: 8 } }
      },
      {
        text: 'Demander son avis à Inès. Elle a l\'air d\'avoir une idée.',
        next: 'c2_topo_ines',
        effects: { relations: { ines: 14 }, skills: { equipe_skill: 5 }, setFlags: ['s02_done'] }
      },
      {
        text: 'Couper à travers. On verra bien.',
        next: 'c2_topo_rate',
        effects: { skills: { terrain: 3 } }
      }
    ]
  },
  {
    id: 'c2_topo_ok',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_jour',
    text: 'Azimut corrigé, deux cents mètres de rab, et le point de contrôle apparaît exactement où tu l\'avais annoncé. Inès te regarde plier la carte.\n\n« T\'es du genre à savoir des trucs sans le dire, toi. » Ce n\'est pas une question. Vous rentrez troisièmes sur douze équipes.',
    effects: { gauges: { moral: 5 } },
    next: 'c2_feu_camp'
  },
  {
    id: 'c2_topo_ines',
    kind: 'dialogue',
    chapter: 2,
    background: 'camp_karola_jour',
    speaker: 'Inès',
    npc: 'ines',
    expression: 'surprised',
    text: '« Moi ? Tu me demandes à moi ? »\n\nElle prend la carte. Ses doigts trouvent le chemin en trente secondes — une sente qui longe la clôture, invisible sauf pour quelqu\'un qui regarde vraiment.\n\n« Mon père était chasseur. Je lisais les cartes avant de lire les livres. » Un silence. « C\'est la première fois que quelqu\'un me demande mon avis ici. »\n\nVous rentrez deuxièmes. Elle sourit pendant huit cents mètres.',
    effects: { gauges: { moral: 5, equipe: 5 } },
    next: 'c2_feu_camp'
  },
  {
    id: 'c2_topo_rate',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_jour',
    text: 'À travers champ. Mauvaise idée : un fossé, deux clôtures, un détour de quarante minutes. Vous arrivez avant-derniers, les chaussettes trempées.\n\n« La prochaine fois », dit Inès sans te regarder, « on lit la carte. » Elle n\'est pas fâchée. Elle archive.',
    effects: { gauges: { moral: -3 } },
    next: 'c2_feu_camp'
  },
  {
    id: 'c2_feu_camp',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_night',
    music: 'bivouac',
    text: 'La nuit tombe sur Karola. Le feu craque. Quelqu\'un a un paquet de chamallows non réglementaires que tout le monde fait semblant de ne pas voir, y compris le caporal de service.\n\nDimitri raconte une histoire fausse de bout en bout et formidable. Thomas — s\'il est encore là — rit. Même Rachid s\'est assis à deux mètres du cercle. Pour lui, c\'est dedans.',
    conditionalNext: [
      { conditions: [{ flag: 'thomas_parti' }], next: 'c2_feu_sans_thomas' }
    ],
    next: 'c2_nuit_karola'
  },
  {
    id: 'c2_feu_sans_thomas',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_night',
    text: 'Il manque quelqu\'un autour du feu. Personne ne le dit. Dimitri raconte ses histoires un cran moins fort que d\'habitude.\n\nLes absents ne prennent pas de place. C\'est exactement comme ça qu\'on les remarque.',
    effects: { gauges: { moral: -3 } },
    next: 'c2_nuit_karola'
  },
  {
    id: 'c2_nuit_karola',
    kind: 'narration',
    chapter: 2,
    background: 'camp_karola_night',
    text: 'Plus tard, dans la tente, le sol est dur et le duvet sent le neuf. Tu entends l\'océan, là-bas, qui continue son travail de toujours.\n\nTu repenses à la grille, au premier jour. C\'était il y a trois semaines. C\'était il y a une vie.',
    effects: { gauges: { moral: 8 }, setFlags: ['m04_done'], skills: { terrain: 5, resilience_emo: 4 }, achievements: ['nuit_karola'], journal: 'Nuit au camp Karola. Le sol est dur, le duvet sent le neuf, l\'océan fait son bruit d\'océan. Je sais pas pourquoi j\'écris ça. Si : pour me souvenir que cette nuit a existé.' },
    next: 'c3_intro'
  }
];
