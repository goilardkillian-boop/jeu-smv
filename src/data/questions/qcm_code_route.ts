import type { QcmQuestion } from '../../engine/types';

// Vraies règles du code de la route français.
export const QCM_CODE_ROUTE: QcmQuestion[] = [
  {
    id: 'code_distance',
    question: 'À 50 km/h, quelle distance de sécurité (environ 2 secondes) faut-il laisser avec le véhicule qui précède ?',
    options: ['14 mètres', '28 mètres', '50 mètres', '8 mètres'],
    correct: 1,
    explanation: 'Environ 28 mètres : la règle des 2 secondes.'
  },
  {
    id: 'code_priorite',
    question: 'À une intersection sans signalisation, qui a la priorité ?',
    options: ['Le véhicule le plus rapide', 'Le véhicule venant de droite', 'Le véhicule venant de gauche', 'Le véhicule le plus gros'],
    correct: 1,
    explanation: 'Priorité à droite en l\'absence de signalisation.'
  },
  {
    id: 'code_alcool',
    question: "Taux d'alcoolémie maximal pour un conducteur en permis probatoire ?",
    options: ['0,5 g/L', '0,2 g/L', '0,8 g/L', '0 g/L exactement'],
    correct: 1,
    explanation: '0,2 g/L de sang pour les probatoires — en pratique, zéro verre.'
  },
  {
    id: 'code_orange',
    question: 'Que signifie un feu orange fixe ?',
    options: [
      'Accélérer pour passer',
      "S'arrêter, sauf si l'arrêt présente un danger",
      'Passage autorisé avec prudence',
      'Céder le passage'
    ],
    correct: 1,
    explanation: "Le feu orange impose l'arrêt si on peut s'arrêter sans danger."
  },
  {
    id: 'code_ceinture',
    question: 'La ceinture de sécurité en ville est :',
    options: ['Conseillée', 'Obligatoire', 'Obligatoire uniquement à l\'avant', 'Facultative sous 30 km/h'],
    correct: 1,
    explanation: 'Obligatoire pour tous les occupants, partout.'
  },
  {
    id: 'code_depassement',
    question: 'Le dépassement par la droite est :',
    options: [
      'Autorisé sur autoroute',
      'Interdit sauf cas particuliers (véhicule tournant à gauche, circulation en files)',
      'Toujours autorisé en ville',
      'Autorisé si on klaxonne'
    ],
    correct: 1,
    explanation: 'Interdit, sauf exceptions précises prévues par le code.'
  },
  {
    id: 'code_pause',
    question: 'Sur long trajet, il est recommandé de faire une pause au moins toutes les :',
    options: ['4 heures', '2 heures', '6 heures', '1 heure'],
    correct: 1,
    explanation: 'Une pause toutes les 2 heures de conduite.'
  },
  {
    id: 'code_vitesse_ville',
    question: 'Vitesse maximale en agglomération (hors zones spécifiques) ?',
    options: ['30 km/h', '50 km/h', '70 km/h', '60 km/h'],
    correct: 1,
    explanation: '50 km/h en agglomération, sauf indication contraire.'
  }
];
