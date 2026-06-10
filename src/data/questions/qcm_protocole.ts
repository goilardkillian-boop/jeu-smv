import type { QcmQuestion } from '../../engine/types';

// Protocole "TOC TOC" — entrée réglementaire dans un bureau.
// Séquence complète : frapper 2 coups → entrer après "Avancez" → un pas,
// s'arrêter → saluer → retirer le couvre-chef → se présenter → attendre
// "Repos" → remettre le couvre-chef → saluer → demi-tour à droite → sortir.
export const QCM_PROTOCOLE: QcmQuestion[] = [
  {
    id: 'toc_entree',
    question: 'Tu te présentes au bureau de l\'adjudant. Première étape ?',
    options: ['Entrer directement', 'Frapper deux coups et attendre', 'Crier ton nom', 'Saluer depuis le couloir'],
    correct: 1,
    explanation: 'On frappe deux coups et on attend l\'autorisation.'
  },
  {
    id: 'toc_avancez',
    question: 'Tu entres après quel mot ?',
    options: ['« Oui ? »', '« Avancez »', '« Entrez donc »', 'Aucun, on entre après 5 secondes'],
    correct: 1,
    explanation: 'On entre après « Avancez ».'
  },
  {
    id: 'toc_salut',
    question: 'Le salut réglementaire se fait :',
    options: ['Main gauche', 'Main droite', 'Les deux mains', 'D\'un signe de tête'],
    correct: 1,
    explanation: 'Salut de la main droite.'
  },
  {
    id: 'toc_couvrechef',
    question: 'Après le salut initial, que fais-tu de ton couvre-chef ?',
    options: ['Tu le gardes', 'Tu le retires', 'Tu le mets sous le bras gauche dès le couloir', 'Tu le poses sur le bureau'],
    correct: 1,
    explanation: 'À l\'intérieur, après avoir salué, on retire son couvre-chef.'
  },
  {
    id: 'toc_presentation',
    question: 'La présentation réglementaire est :',
    options: [
      '« Bonjour, c\'est moi. »',
      '« Volontaire stagiaire [NOM], compagnie du capitaine [X], section de l\'adjudant-chef [Y], à vos ordres. »',
      '« Volontaire [NOM], présent ! »',
      '« Je viens pour le rendez-vous. »'
    ],
    correct: 1,
    explanation: 'Nom, compagnie, section, « à vos ordres » + le grade.'
  },
  {
    id: 'toc_repos',
    question: 'Tu restes au garde-à-vous jusqu\'à quel ordre ?',
    options: ['« Asseyez-vous »', '« Repos »', '« Ça ira »', 'Aucun, tu te détends après 10 secondes'],
    correct: 1,
    explanation: 'On attend « Repos ».'
  },
  {
    id: 'toc_sortie',
    question: 'Pour sortir, la séquence correcte est :',
    options: [
      'Sortir directement',
      'Remettre le couvre-chef, saluer, demi-tour à droite, sortir',
      'Saluer, courir vers la porte',
      'Demi-tour à gauche puis saluer'
    ],
    correct: 1,
    explanation: 'Couvre-chef, salut, demi-tour à droite, sortie.'
  }
];

// Séquence de référence pour le mini-jeu de remise en ordre.
export const TOC_TOC_SEQUENCE = [
  'Frapper deux coups',
  'Entrer après « Avancez »',
  "Faire un pas, s'arrêter",
  'Saluer (main droite)',
  'Retirer son couvre-chef',
  'Décliner son identité',
  'Attendre « Repos »',
  'Remettre son couvre-chef',
  'Saluer',
  'Demi-tour à droite',
  'Sortir'
];
