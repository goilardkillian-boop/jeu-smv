import type { QcmQuestion } from '../../engine/types';

export const QCM_MATHS: QcmQuestion[] = [
  {
    id: 'maths_solde',
    question: "Ta solde est de 345 €. Tu dépenses 28 € de produits d'hygiène, 45 € de téléphone et tu envoies 120 € à ta famille. Combien te reste-t-il ?",
    options: ['142 €', '152 €', '162 €', '132 €'],
    correct: 1,
    explanation: '345 − 28 − 45 − 120 = 152 €.'
  },
  {
    id: 'maths_distance',
    question: 'La section marche à 5 km/h pendant 2h30. Quelle distance est parcourue ?',
    options: ['10 km', '12,5 km', '15 km', '11 km'],
    correct: 1,
    explanation: '5 × 2,5 = 12,5 km.'
  },
  {
    id: 'maths_equipes',
    question: '24 volontaires doivent être répartis en équipes de 6. Combien d\'équipes ?',
    options: ['3', '4', '5', '6'],
    correct: 1,
    explanation: '24 ÷ 6 = 4 équipes.'
  },
  {
    id: 'maths_pourcent',
    question: 'Un article coûte 80 €. Il est soldé à −25 %. Quel est son prix ?',
    options: ['55 €', '60 €', '65 €', '75 €'],
    correct: 1,
    explanation: '80 × 0,75 = 60 €.'
  },
  {
    id: 'maths_tableau',
    question: "Le tableau de service indique : lundi 6 km, mardi 8 km, mercredi repos, jeudi 10 km. Moyenne quotidienne sur les 4 jours ?",
    options: ['8 km', '6 km', '7 km', '12 km'],
    correct: 1,
    explanation: '(6+8+0+10) ÷ 4 = 6 km.'
  },
  {
    id: 'maths_essence',
    question: "Un véhicule consomme 7 L/100 km. Combien pour un trajet de 250 km ?",
    options: ['14 L', '17,5 L', '21 L', '25 L'],
    correct: 1,
    explanation: '7 × 2,5 = 17,5 L.'
  },
  {
    id: 'maths_horaires',
    question: 'Le rassemblement est à 7h45. Il te faut 35 minutes pour te préparer et 12 minutes de trajet. À quelle heure dois-tu te lever au plus tard ?',
    options: ['6h58', '7h00', '6h45', '7h10'],
    correct: 0,
    explanation: '7h45 − 47 min = 6h58.'
  },
  {
    id: 'maths_fractions',
    question: 'Les trois quarts de la section ont réussi le QCM. Sur 32 volontaires, combien ont réussi ?',
    options: ['20', '22', '24', '28'],
    correct: 2,
    explanation: '32 × 3/4 = 24.'
  }
];
