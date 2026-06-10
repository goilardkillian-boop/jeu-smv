import type { QcmQuestion } from '../../engine/types';

export const QCM_FRANCAIS: QcmQuestion[] = [
  {
    id: 'fr_pp1',
    question: 'Choisis la phrase correcte :',
    options: [
      'Les consignes que j\'ai lu étaient claires.',
      'Les consignes que j\'ai lues étaient claires.',
      'Les consignes que j\'ai lue étaient claires.',
      'Les consignes que j\'ai lus étaient claires.'
    ],
    correct: 1,
    explanation: "Le participe passé s'accorde avec le COD placé avant : « les consignes » → lues."
  },
  {
    id: 'fr_ortho1',
    question: 'Quelle orthographe est correcte ?',
    options: ['Un dilemne', 'Un dilemme', 'Un dilèmne', 'Un dillemme'],
    correct: 1,
    explanation: 'On écrit « dilemme », avec deux m.'
  },
  {
    id: 'fr_conj1',
    question: 'Conjugue : « Demain, nous ___ au camp Karola. »',
    options: ['allons', 'irons', 'allions', 'irions'],
    correct: 1,
    explanation: 'Action future → futur simple : nous irons.'
  },
  {
    id: 'fr_conj2',
    question: 'Passé composé : « Ils ___ leur paquetage hier soir. »',
    options: ['ont préparés', 'ont préparé', 'on préparé', 'sont préparé'],
    correct: 1,
    explanation: "Avec l'auxiliaire avoir et sans COD avant, pas d'accord : « ont préparé »."
  },
  {
    id: 'fr_corr1',
    question: 'Quelle phrase est correcte ?',
    options: [
      'Sa fait deux heures qu\'on attend.',
      'Ça fait deux heures qu\'on attend.',
      'Ca fait deux heures qu\'on attends.',
      'Ça fais deux heures qu\'on attend.'
    ],
    correct: 1,
    explanation: '« Ça » avec cédille, « on attend » sans s.'
  },
  {
    id: 'fr_ortho2',
    question: 'Complète : « Ils sont ___ à l\'heure. »',
    options: ['arriver', 'arrivé', 'arrivés', 'arrivait'],
    correct: 2,
    explanation: "Avec être, le participe s'accorde avec le sujet : arrivés."
  },
  {
    id: 'fr_homophone',
    question: 'Complète : « Je ne sais pas ___ il faut aller. »',
    options: ['ou', 'où', 'hou', 'houx'],
    correct: 1,
    explanation: '« Où » avec accent indique le lieu.'
  },
  {
    id: 'fr_lettre',
    question: 'Dans une lettre de motivation, quelle formule de fin est la plus adaptée ?',
    options: [
      'À plus !',
      'Cordialement.',
      'Je vous prie d\'agréer, Madame, Monsieur, mes salutations distinguées.',
      'Bisous.'
    ],
    correct: 2,
    explanation: 'La formule de politesse complète reste la norme pour une lettre formelle.'
  }
];
