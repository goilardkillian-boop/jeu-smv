import type { QcmQuestion } from '../../engine/types';

export const QCM_LOGIQUE: QcmQuestion[] = [
  {
    id: 'log_suite1',
    question: 'Complète la suite : 2, 4, 8, 16, ...',
    options: ['24', '32', '20', '18'],
    correct: 1,
    explanation: 'Chaque terme est le double du précédent.'
  },
  {
    id: 'log_suite2',
    question: 'Complète la suite : 1, 1, 2, 3, 5, 8, ...',
    options: ['11', '13', '12', '10'],
    correct: 1,
    explanation: 'Suite de Fibonacci : 5 + 8 = 13.'
  },
  {
    id: 'log_dedu1',
    question: 'Tous les volontaires de la section A portent un calot vert. Karim porte un calot rouge. Que peut-on en déduire ?',
    options: [
      'Karim est de la section A',
      "Karim n'est pas de la section A",
      'Karim a perdu son calot',
      'Rien'
    ],
    correct: 1,
    explanation: "S'il était de la section A, son calot serait vert."
  },
  {
    id: 'log_ordre',
    question: 'Léo est plus rapide qu\'Anna. Anna est plus rapide que Tom. Qui est le plus lent ?',
    options: ['Léo', 'Anna', 'Tom', 'Impossible à dire'],
    correct: 2,
    explanation: 'Léo > Anna > Tom.'
  },
  {
    id: 'log_intrus',
    question: 'Trouve l\'intrus : rangers, calot, treillis, raquette.',
    options: ['Rangers', 'Calot', 'Treillis', 'Raquette'],
    correct: 3,
    explanation: 'La raquette n\'est pas un équipement militaire.'
  },
  {
    id: 'log_horloge',
    question: "Il est 22h40. Le réveil est dans 7h05. Quelle heure sera-t-il ?",
    options: ['5h45', '6h05', '5h35', '6h45'],
    correct: 0,
    explanation: '22h40 + 7h05 = 5h45.'
  }
];
