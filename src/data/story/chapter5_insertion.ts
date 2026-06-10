import type { StoryNode } from '../../engine/types';

// CHAPITRE 5 — L'INSERTION (semaines 8+)
// Stage, incident professionnel, bilan Moreau, dispatch vers les fins.
export const CHAPTER5: StoryNode[] = [
  {
    id: 'c5_intro',
    kind: 'transition',
    chapter: 5,
    week: 8,
    background: 'ville_larochelle',
    music: 'stage',
    playerOutfit: 'stage',
    text: 'CHAPITRE 5 — LE MONDE RÉEL\n\nLundi, 7h41. Tu es en avance de dix-neuf minutes devant l\'entreprise. C\'est un réflexe SMV maintenant : l\'heure, c\'est avant l\'heure.\n\nTu portes une tenue de travail. Plus de treillis. Tu te sens bizarrement nu sans lui — qui aurait cru ça, il y a huit semaines ?',
    next: 'c5_premier_jour'
  },
  {
    id: 'c5_premier_jour',
    kind: 'dialogue',
    chapter: 5,
    background: 'stage_lieu',
    speaker: 'Le tuteur',
    text: (ctx) => {
      if (ctx.flags.has('filiere_resto')) return '« Le SMV, hein ? J\'en ai eu deux avant toi. Un excellent, un catastrophique. T\'as le choix du modèle. » Il te tend un tablier. « Service de midi dans trois heures. D\'ici là : tu observes, tu goûtes, tu retiens. En cuisine, la mémoire c\'est la moitié du métier. »';
      if (ctx.flags.has('filiere_btp')) return '« Le SMV, hein ? J\'en ai eu deux avant toi. Un excellent, un catastrophique. T\'as le choix du modèle. » Il te tend un casque. « Aujourd\'hui : observation et préparation. Tu touches rien sans demander, tu demandes tout ce que tu comprends pas. Celui qui demande est jamais ridicule. Celui qui devine, parfois, il est dangereux. »';
      if (ctx.flags.has('filiere_services')) return '« Le SMV ? Bien. Ici, la ponctualité et la douceur, c\'est tout ce qui compte. » Elle te fait visiter. « Madame Lucette, chambre 12, elle vous testera. Monsieur Henri, il parle pas, mais il entend tout. Souvenez-vous : on travaille chez eux. Pas l\'inverse. »';
      return '« Le SMV, hein ? J\'en ai eu deux avant toi. Un excellent, un catastrophique. T\'as le choix du modèle. » Il te fait visiter. « Première semaine : tu observes, tu apprends les process, tu poses des questions. Celui qui demande est jamais ridicule. »';
    },
    effects: { setFlags: ['m13_done'], gauges: { motivation: 8 }, skills: { savoir_etre: 8 } },
    next: 'c5_routine'
  },
  {
    id: 'c5_routine',
    kind: 'narration',
    chapter: 5,
    background: 'stage_lieu',
    text: 'Les deux premières semaines de stage passent comme un seul jour dense. Tu apprends plus vite que prévu — pas parce que tu es devenu un génie, mais parce que tu sais maintenant *comment on apprend* : on arrive à l\'heure, on écoute, on refait, on demande.\n\nLe soir, tu rentres à la caserne. La section se retrouve au réfectoire et s\'échange les mondes : le chantier de Kevin, l\'EHPAD d\'Inès, l\'entrepôt de Sara. Chacun rapporte des histoires d\'un pays différent.',
    effects: { skills: { technique_filiere: 10, autonomie: 5 } },
    next: 'c5_incident'
  },
  {
    id: 'c5_incident',
    kind: 'narration',
    chapter: 5,
    week: 9,
    background: 'stage_lieu',
    music: 'stage_crisis',
    text: (ctx) => {
      if (ctx.flags.has('filiere_resto')) return 'Vendredi, rush de midi. Une commande part à la mauvaise table — la tienne. Le client, un habitué qui compte, hausse le ton. Le chef est en plein coup de feu. Tout le monde a vu que c\'était ton plateau.';
      if (ctx.flags.has('filiere_securite')) return 'Samedi après-midi, poste de garde. Un individu agité refuse de quitter la galerie. Ton tuteur est à l\'autre bout du site, à quatre minutes. L\'homme s\'approche, agressif. Quatre minutes, c\'est long.';
      if (ctx.flags.has('filiere_industrie')) return 'Jeudi, atelier. Tu remarques qu\'une pièce soudée la veille — pas par toi — présente un défaut. Elle est déjà validée, emballée, prête à partir. La signaler, c\'est retarder la commande et griller un collègue. La taire, c\'est expédier une pièce défectueuse.';
      if (ctx.flags.has('filiere_numerique')) return 'Mardi matin. Le post programmé pour le client le plus important de l\'agence est parti avec une coquille énorme — pas de toi, mais tu es le premier à le voir, à 8h04. Le responsable arrive à 9h30. Le post accumule les vues.';
      return 'Jeudi matin. Une erreur de la veille refait surface — un chargement mal référencé, et c\'est ta zone, même si tu n\'es pas seul dessus. Le responsable cherche un nom à mettre sur le problème. Le collègue qui a fait la moitié de l\'erreur regarde ses chaussures.';
    },
    choices: [
      {
        text: 'Assumer ta part, exactement la tienne, calmement.',
        next: 'c5_incident_assume',
        timed: true,
        effects: { skills: { stress_pro: 12, savoir_etre: 8 }, setFlags: ['m14_done', 'incident_assume'] }
      },
      {
        text: 'Régler le problème d\'abord, parler ensuite.',
        next: 'c5_incident_action',
        timed: true,
        conditions: [{ attribute: { key: 'debrouillardise', min: 4 } }],
        effects: { skills: { stress_pro: 10, technique_filiere: 8 }, setFlags: ['m14_done', 'incident_resolu'] }
      },
      {
        text: 'Laisser passer. Pas vu, pas pris.',
        next: 'c5_incident_fuite',
        timed: true,
        effects: { setFlags: ['m14_done', 'incident_fui'], gauges: { rigueur: -8 } }
      }
    ]
  },
  {
    id: 'c5_incident_assume',
    kind: 'narration',
    chapter: 5,
    background: 'stage_lieu',
    text: '« C\'est en partie moi. Voilà ce qui s\'est passé, voilà ce que je propose pour que ça se reproduise pas. »\n\nLe silence qui suit est un silence de recalcul. Ton tuteur te regarde différemment — pas parce que tu as fait une erreur, tout le monde en fait. Parce que tu l\'as ramassée sans qu\'on te la jette.\n\nLe soir, il appellera Moreau. Tu ne le sauras que plus tard.',
    effects: { relations: { moreau: 12 }, gauges: { moral: 8, rigueur: 8 }, setFlags: ['tuteur_impressionne'], journal: 'J\'ai merdé au stage. J\'ai assumé. Le tuteur a rien dit de spécial mais quelque chose a changé dans sa façon de me confier les trucs. C\'est ça qu\'on achète avec la vérité, en fait : du poids.' },
    next: 'c5_bilan_convocation'
  },
  {
    id: 'c5_incident_action',
    kind: 'narration',
    chapter: 5,
    background: 'stage_lieu',
    text: 'Tu ne discutes pas. Tu agis : tu isoles le problème, tu préviens qui doit l\'être, tu proposes la solution la moins coûteuse — et elle marche.\n\nQuand le responsable arrive sur place, il trouve un incident déjà à moitié réglé et quelqu\'un qui lui explique posément le plan. Il t\'écoute jusqu\'au bout. C\'est rare, écouter un stagiaire jusqu\'au bout. Tu viens de gagner ça.',
    effects: { relations: { moreau: 10 }, gauges: { moral: 8 }, setFlags: ['tuteur_impressionne'], journal: 'Incident au stage. J\'ai géré. Pas parfaitement — mais j\'ai GÉRÉ. Il y a huit mois je serais parti aux toilettes en attendant que ça passe.' },
    next: 'c5_bilan_convocation'
  },
  {
    id: 'c5_incident_fuite',
    kind: 'narration',
    chapter: 5,
    background: 'stage_lieu',
    text: 'Tu ne dis rien. Le problème se règle sans toi — mal, et en laissant des traces.\n\nUne semaine plus tard, ton tuteur te prend à part : « Je sais que t\'avais vu. » C\'est tout. Il ne le répétera pas à Moreau. Mais quelque chose s\'est refermé, et les stages sont courts : il n\'y aura peut-être pas le temps de le rouvrir.',
    effects: { gauges: { moral: -8 }, journal: 'J\'ai rien dit. Le tuteur a su. Il m\'a juste dit "je sais que t\'avais vu". Cette phrase me suit dans les couloirs.' },
    next: 'c5_bilan_convocation'
  },
  {
    id: 'c5_bilan_convocation',
    kind: 'narration',
    chapter: 5,
    week: 10,
    background: 'cour_caserne',
    music: 'formation',
    playerOutfit: 'treillis',
    text: 'Semaine 10. Une convocation t\'attend au tableau : « BILAN INDIVIDUEL — CAPITAINE MOREAU — JEUDI 14H00 ».\n\nLe bilan. Celui qui décide de la suite : prolongation de stage, proposition d\'embauche, recommandation, ou fin de parcours. La veille, tu repasses ton treillis deux fois. Le protocole d\'entrée, tu le fais maintenant sans y penser, comme on respire.',
    next: 'c5_bilan'
  },
  {
    id: 'c5_bilan',
    kind: 'dialogue',
    chapter: 5,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: (ctx) => {
      const opener = ctx.flags.has('tuteur_impressionne')
        ? 'Votre tuteur m\'a appelé. De lui-même. Ça ne m\'arrive pas souvent, les appels spontanés. '
        : '';
      return `Deux coups. « Avancez. » Un pas. Salut. Couvre-chef. « Volontaire stagiaire ${ctx.name}, à vos ordres mon capitaine. » « Repos. Asseyez-vous. »\n\nMoreau ouvre ton dossier. Le referme aussitôt — il le connaît par cœur.\n\n« ${opener}Huit semaines. Vous n'êtes pas la même personne qui a franchi la grille en octobre. La question n'est pas ce que vous avez fait ici. La question, c'est : qu'est-ce que vous voulez faire de ce que vous êtes devenu ? »`;
    },
    choices: [
      { text: '« Signer. Travailler. Construire sur ce que j\'ai appris ici. »', next: 'c5_bilan_signer', effects: { setFlags: ['m15_done', 'veut_signer'] } },
      { text: '« J\'ai un projet à moi, maintenant. Hors SMV. Mais grâce au SMV. »', next: 'c5_bilan_projet', effects: { setFlags: ['m15_done', 'has_project'] } },
      { text: '« Honnêtement ? Je sais pas encore. Mais je sais comment chercher, maintenant. »', next: 'c5_bilan_cherche', effects: { setFlags: ['m15_done'] } }
    ]
  },
  {
    id: 'c5_bilan_signer',
    kind: 'dialogue',
    chapter: 5,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: (ctx) => {
      const reco = ctx.gauges.rigueur > 70 && (ctx.relations.ferreira > 60 || ctx.relations.moreau > 60);
      if (reco) return '« Bien. »\n\nIl sort une feuille déjà remplie. Tu reconnais sa signature en bas. Et celle de Ferreira à côté.\n\n« Votre entreprise de stage propose un contrat. J\'ai joint ma recommandation. L\'adjudant aussi — et lui, il ne recommande personne, vérifiez les archives. Félicitations ne fait pas partie de mon vocabulaire professionnel. Disons : c\'est conforme à ce que vous êtes devenu. »';
      return '« Bien. »\n\nIl note quelque chose.\n\n« Votre dossier part en commission. Le stage compte, les jauges comptent, tout compte — c\'est la mauvaise nouvelle. La bonne, c\'est que tout a compté aussi dans l\'autre sens : ce que vous avez construit ici, personne ne peut vous le retirer. On se revoit dans une semaine avec la réponse. »';
    },
    effects: {
      relations: {},
      setFlags: []
    },
    next: 'c5_dernier_soir'
  },
  {
    id: 'c5_bilan_projet',
    kind: 'dialogue',
    chapter: 5,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: '« Hors SMV. »\n\nIl te regarde un long moment. Tu soutiens le regard — il y a huit semaines, tu n\'aurais pas pu.\n\n« Vous savez ce qui me ferait le plus plaisir dans ce métier ? Que des gens comme vous n\'aient plus besoin de nous. Vous venez de me décrire exactement ça. Déposez-moi votre projet par écrit avant vendredi. Je veux le lire. Et je connais peut-être deux personnes à appeler pour vous. »',
    next: 'c5_dernier_soir'
  },
  {
    id: 'c5_bilan_cherche',
    kind: 'dialogue',
    chapter: 5,
    background: 'bureau_moreau',
    speaker: 'Capitaine Moreau',
    npc: 'moreau',
    text: '« C\'est la réponse la plus honnête qu\'on m\'ait donnée cette année. »\n\nIl referme le dossier.\n\n« Savoir chercher, c\'est quatre-vingts pour cent du chemin. Le reste, c\'est du temps. On prolonge votre accompagnement de deux mois — c\'est prévu pour ça. Et vous reviendrez me voir. Pas parce que c\'est obligatoire. Parce que je veux savoir la fin de l\'histoire. »',
    next: 'c5_dernier_soir'
  },
  {
    id: 'c5_dernier_soir',
    kind: 'narration',
    chapter: 5,
    background: 'chambree_nuit',
    music: 'fmi_night',
    text: 'Le dernier soir à la chambrée — le vrai dernier, celui d\'après les papiers.\n\nDimitri a organisé « un truc pas du tout organisé » au Foyer. Il y a du Fanta dans des gobelets de caserne, des chips, et tous les visages de ces huit mois. Même Rachid est là, adossé près de la porte, et quand tu croises son regard, il hoche la tête. Lentement. Deux fois.\n\nDe lui, c\'est un discours d\'adieu.',
    conditionalNext: [
      { conditions: [{ relation: { key: 'dimitri', min: 60 }, flag: 'dimitri_revelation' }], next: 'c5_dimitri_adieu' }
    ],
    next: 'compute_ending'
  },
  {
    id: 'c5_dimitri_adieu',
    kind: 'dialogue',
    chapter: 5,
    background: 'foyer',
    speaker: 'Dimitri',
    npc: 'dimitri',
    expression: 'happy',
    text: 'À la fin de la soirée, Dimitri te raccompagne vers la chambrée. Devant la porte, il s\'arrête.\n\n« Tu sais quoi ? Mon père a rappelé. J\'ai décroché, cette fois. C\'était... bof. Moyen. Pas le film que je m\'étais fait. » Il hausse les épaules. « Mais j\'ai décroché. Et c\'est à cause de toi, je crois. Quelqu\'un qui te regarde vraiment, ça donne du courage pour regarder le reste. »\n\nIl te serre la main. La garde une seconde de plus.\n\n« Allez. Casse-toi. On s\'appelle. Et nous, on s\'appellera VRAIMENT. »',
    effects: { gauges: { moral: 10 }, journal: 'Dimitri a décroché quand son père a rappelé. Il dit que c\'est grâce à moi. Je crois que c\'est grâce à lui, mais on va pas se battre pour ça.' },
    next: 'compute_ending'
  },
  {
    id: 'compute_ending',
    kind: 'transition',
    chapter: 5,
    background: 'caserne_exterior_jour',
    music: 'ending_success',
    text: 'Le matin du départ, tu traverses la cour une dernière fois. La grille est ouverte, dans l\'autre sens cette fois.\n\nHuit mois. Une vie à construire — et maintenant, des outils pour la construire.',
    next: 'ENDING_DISPATCH'
  }
];
