import type { StoryNode } from '../../engine/types';

// PROLOGUE — La vie d'avant. Du SMS de la Mission Locale à la grille
// de la caserne Beauregard, sous la pluie.
export const PROLOGUE: StoryNode[] = [
  {
    id: 'p_intro',
    kind: 'narration',
    chapter: 0,
    week: 0,
    background: 'chambre_avant',
    music: 'title',
    text: (ctx) =>
      `Il est 11h47. Tu es ${ctx.g('allongé', 'allongée', 'allongé·e')} sur ton lit, le téléphone au-dessus du visage. L'écran est fêlé depuis trois mois. Tu n'as pas fait réparer. À quoi bon.`,
    next: 'p_sms'
  },
  {
    id: 'p_sms',
    kind: 'dialogue',
    chapter: 0,
    background: 'phone_screen',
    speaker: 'MISSION LOCALE',
    sound: 'notification_sms',
    text: (ctx) =>
      `« Bonjour ${ctx.name}, suite à notre entretien, nous vous informons d'une opportunité qui correspond à votre profil. Le 3e RSMV de La Rochelle propose un dispositif d'insertion professionnelle de 8 à 12 mois. RDV proposé : mercredi 10h, Mission Locale. Répondez OUI pour confirmer. »`,
    choices: [
      { text: '« OUI »', next: 'p_ml_intro', effects: { gauges: { motivation: 5 }, setFlags: ['sms_oui_direct'] } },
      {
        text: 'Reposer le téléphone. Réfléchir.',
        next: 'p_hesitation',
        effects: { journal: "J'ai pas répondu tout de suite. C'est pas que je voulais pas. C'est que dire oui, ça engageait quelque chose." }
      },
      { text: '« NON »', next: 'p_non' }
    ]
  },
  {
    id: 'p_non',
    kind: 'dialogue',
    chapter: 0,
    background: 'phone_screen',
    speaker: 'MISSION LOCALE',
    text: '« Nous en prenons note. N\'hésitez pas à nous recontacter. »\n\nLe téléphone redevient noir. Le plafond est toujours là. Le silence aussi.\n\nDeux jours passent. Le téléphone vibre à nouveau. Même numéro.',
    choices: [
      { text: 'Cette fois, répondre OUI.', next: 'p_ml_intro', effects: { gauges: { motivation: 3 }, setFlags: ['sms_hesite'] } },
      { text: 'Laisser sonner. Mais garder le numéro.', next: 'p_hesitation' }
    ]
  },
  {
    id: 'p_hesitation',
    kind: 'narration',
    chapter: 0,
    background: 'chambre_avant',
    text: (ctx) =>
      `La nuit, tu y penses. ${ctx.sheet.backgroundId === 'neet_1an' ? 'Ça fait plus d\'un an que les journées se ressemblent.' : 'Les journées se ressemblent depuis trop longtemps.'} Le matin, tu tapes « SMV » dans la barre de recherche. Des vidéos. Des jeunes en treillis qui sourient. Pas des sourires de pub. Des vrais.\n\nTu réponds OUI au SMS.`,
    effects: { gauges: { motivation: 5 } },
    next: 'p_ml_intro'
  },
  {
    id: 'p_ml_intro',
    kind: 'narration',
    chapter: 0,
    background: 'mission_locale',
    music: 'mission_locale',
    text: 'Mercredi, 9h52. La Mission Locale sent le café et le lino. Le conseiller te reçoit avec huit minutes d\'avance. C\'est la première fois depuis longtemps que quelqu\'un t\'attend quelque part.',
    next: 'p_ml_dialogue1'
  },
  {
    id: 'p_ml_dialogue1',
    kind: 'dialogue',
    chapter: 0,
    background: 'mission_locale',
    speaker: 'Le conseiller',
    text: (ctx) =>
      `« ${ctx.name}, c'est ça ? Asseyez-vous. J'ai vu votre dossier. ${ctx.sheet.backgroundId.startsWith('arret') ? 'Le décrochage, c\'est pas une fin. C\'est un détour.' : 'Votre parcours, je l\'ai lu. Sans jugement.'} Je vais être direct : le Service Militaire Volontaire, vous connaissez ? »`,
    choices: [
      { text: '« Vaguement. C\'est l\'armée ? »', next: 'p_ml_explication' },
      { text: '« J\'ai regardé des vidéos. »', next: 'p_ml_explication', effects: { gauges: { motivation: 3 } } },
      { text: '« On m\'a dit que c\'était pour ceux qui ont raté. »', next: 'p_ml_rate' }
    ]
  },
  {
    id: 'p_ml_rate',
    kind: 'dialogue',
    chapter: 0,
    background: 'mission_locale',
    speaker: 'Le conseiller',
    text: '« Non. C\'est pour ceux qui veulent recommencer. La nuance est énorme. Ceux qui ont vraiment raté, c\'est ceux qui n\'essaient plus rien. »\n\nIl te laisse deux secondes avec cette phrase.',
    effects: { gauges: { moral: 3 } },
    next: 'p_ml_explication'
  },
  {
    id: 'p_ml_explication',
    kind: 'dialogue',
    chapter: 0,
    background: 'mission_locale',
    speaker: 'Le conseiller',
    text: '« Le SMV, c\'est un dispositif militaire d\'insertion. 8 à 12 mois au 3e régiment, ici, à La Rochelle. Vous êtes logé, nourri, encadré. Vous touchez environ 345 € par mois. Vous passez votre permis B — financé. Vous suivez une formation professionnelle dans une vraie filière, avec un vrai stage, et 70% des volontaires sortent avec un emploi ou une formation qualifiante. C\'est pas magique. C\'est exigeant. La question c\'est : qu\'est-ce que vous cherchez, vous ? »',
    choices: [
      { text: '« Le permis. Pour commencer. »', next: 'p_ml_fin', effects: { setFlags: ['dit_permis'] } },
      { text: '« Un cadre. Quelque chose qui tient. »', next: 'p_ml_fin', effects: { gauges: { rigueur: 3 }, setFlags: ['dit_cadre'] } },
      { text: '« Je sais pas encore. C\'est grave ? »', next: 'p_ml_pas_grave' },
      { text: '« Une porte de sortie. »', next: 'p_ml_fin', effects: { setFlags: ['dit_sortie'] } }
    ]
  },
  {
    id: 'p_ml_pas_grave',
    kind: 'dialogue',
    chapter: 0,
    background: 'mission_locale',
    speaker: 'Le conseiller',
    text: '« Non. C\'est même plutôt bon signe. Ceux qui savent tout en arrivant, en général, ils savent rien. »\n\nIl sourit pour la première fois.',
    effects: { gauges: { moral: 3 }, setFlags: ['dit_sais_pas'] },
    next: 'p_ml_fin'
  },
  {
    id: 'p_ml_fin',
    kind: 'dialogue',
    chapter: 0,
    background: 'mission_locale',
    speaker: 'Le conseiller',
    text: '« Je transmets votre dossier au régiment. Si c\'est accepté, vous recevrez une convocation pour l\'incorporation. Un conseil : le jour où vous franchirez la grille, laissez vos certitudes dehors. Toutes. Les bonnes comme les mauvaises. »\n\nPour toute information officielle : www.le-smv.gouv.fr',
    next: 'p_convocation'
  },
  {
    id: 'p_convocation',
    kind: 'dialogue',
    chapter: 0,
    background: 'phone_screen',
    speaker: 'SMS — 3e RSMV',
    sound: 'notification_sms',
    text: (ctx) =>
      `Trois semaines plus tard.\n\n« ${ctx.name.toUpperCase()} — Votre incorporation au 3e Régiment du Service Militaire Volontaire est confirmée. Présentez-vous le lundi 6 octobre à 8h00, caserne Beauregard, La Rochelle. Munissez-vous de votre pièce d'identité. Prévoyez des affaires pour la semaine. »\n\nTu relis le message quatre fois.`,
    next: 'p_veille'
  },
  {
    id: 'p_veille',
    kind: 'narration',
    chapter: 0,
    background: 'chambre_avant',
    text: (ctx) => {
      const bg = ctx.sheet.backgroundId;
      if (bg === 'parent_jeune') return 'La veille au soir, tu prépares ton sac. Ta fille dort dans la pièce d\'à côté. Tu glisses une photo d\'elle entre deux t-shirts. C\'est pour elle. C\'est aussi pour toi, mais ça tu ne le dis pas encore.';
      if (bg === 'deuil_recent' || bg === 'deuil_ancien') return 'La veille au soir, tu prépares ton sac. Il y a des choses qu\'on emporte et qui ne pèsent rien dans un sac. Tu fermes la fermeture éclair doucement, comme pour ne réveiller personne.';
      if (bg === 'ase_18' || bg === 'ase_21') return 'La veille au soir, tu prépares ton sac. Tu sais faire. Tu as passé ta vie à faire des sacs. Celui-là, c\'est la première fois que c\'est toi qui décides où il va.';
      return 'La veille au soir, tu prépares ton sac. Tu hésites sur tout : combien de t-shirts, est-ce qu\'on a le droit aux écouteurs, est-ce qu\'il faut prendre des draps. Tu mets trop de choses. Tu en enlèves la moitié. Tu dors mal.';
    },
    next: 'p_bus'
  },
  {
    id: 'p_bus',
    kind: 'narration',
    chapter: 0,
    background: 'arret_bus',
    music: 'caserne_approach',
    text: 'Lundi, 7h12. L\'arrêt de bus. Il pleut, une pluie fine d\'octobre qui ne se décide pas. Le bus 4 arrive avec deux minutes de retard. Tu montes. Personne ne te regarde. Tu regardes tout le monde.\n\nRetiens cet arrêt de bus. Tu le reverras.',
    next: 'p_grille'
  },
  {
    id: 'p_grille',
    kind: 'narration',
    chapter: 0,
    background: 'caserne_exterior_rain',
    sound: 'rain_light',
    text: (ctx) =>
      `7h51. La grille de la caserne Beauregard. Des lettres blanches sur fond vert : « 3e RÉGIMENT DU SERVICE MILITAIRE VOLONTAIRE ». Derrière la grille, des silhouettes en treillis traversent la cour, indifférentes à la pluie.\n\nIl y a d'autres jeunes qui attendent. Un grand qui parle fort. Une fille qui fixe ses chaussures. Un type immense qui ne dit rien.\n\nTu es ${ctx.g('arrivé', 'arrivée', 'arrivé·e')}, ${ctx.name}. Maintenant, il faut entrer.`,
    choices: [
      { text: 'Franchir la grille.', next: 'c1_incorporation', effects: { gauges: { motivation: 5 }, journal: 'J\'ai franchi une grille aujourd\'hui. Ça a l\'air de rien, une grille.' } },
      {
        text: 'Faire demi-tour. Ce n\'est pas le moment.',
        next: 'p_demi_tour'
      }
    ]
  },
  {
    id: 'p_demi_tour',
    kind: 'dialogue',
    chapter: 0,
    background: 'caserne_exterior_rain',
    speaker: '',
    text: 'Tu recules d\'un pas. La pluie continue. Le grand qui parlait fort te regarde : « Hé. Ça va ? Premier jour pour moi aussi. On y va ensemble si tu veux. Au pire on ressort, hein. »\n\nIl te tend la main. « Dimitri. »',
    choices: [
      { text: 'Serrer la main. Entrer avec lui.', next: 'c1_incorporation', effects: { relations: { dimitri: 10 }, setFlags: ['entre_avec_dimitri'], gauges: { moral: 5 } } },
      { text: 'Partir. Vraiment.', next: 'ending_trop_tot' }
    ]
  },
  {
    id: 'ending_trop_tot',
    kind: 'ending',
    chapter: 0,
    background: 'arret_bus',
    music: 'ending_neutral',
    text: '',
    endingId: 'fin_trop_tot'
  }
];
