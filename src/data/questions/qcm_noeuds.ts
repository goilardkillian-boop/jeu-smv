import type { QcmQuestion } from '../../engine/types';

export const QCM_NOEUDS: QcmQuestion[] = [
  {
    id: 'noeud_chaise',
    question: 'Quel nœud forme une boucle fixe utilisée notamment pour le sauvetage ?',
    options: ['Nœud plat', 'Nœud de chaise', 'Nœud de cabestan', 'Nœud de vache'],
    correct: 1,
    explanation: 'Le nœud de chaise : boucle fixe qui ne serre pas, idéale pour le sauvetage.'
  },
  {
    id: 'noeud_cabestan',
    question: 'Quel nœud sert à amarrer une corde à un support cylindrique (poteau, barre) ?',
    options: ['Nœud de chaise', 'Nœud de cabestan', 'Nœud plat', 'Nœud simple'],
    correct: 1,
    explanation: 'Le cabestan, rapide à faire et à défaire sur un support cylindrique.'
  },
  {
    id: 'noeud_plat',
    question: 'Quel nœud relie deux cordes de même diamètre ?',
    options: ['Nœud de cabestan', 'Nœud plat', 'Nœud de chaise', 'Nœud en huit'],
    correct: 1,
    explanation: 'Le nœud plat relie deux cordes de même diamètre.'
  },
  {
    id: 'noeud_vache',
    question: 'Le nœud de vache est :',
    options: [
      'Un nœud de sauvetage',
      'Une variante (incorrecte) du nœud plat qui peut glisser',
      'Un nœud d\'amarrage',
      'Un nœud décoratif'
    ],
    correct: 1,
    explanation: "C'est un nœud plat mal exécuté : il risque de glisser sous tension."
  },
  {
    id: 'noeud_usage',
    question: 'Pour hisser un camarade, quel nœud choisis-tu autour de sa taille ?',
    options: ['Nœud simple', 'Nœud de chaise', 'Nœud de vache', 'Demi-clé'],
    correct: 1,
    explanation: 'La boucle du nœud de chaise ne se resserre pas sur le corps.'
  },
  {
    id: 'noeud_tension',
    question: 'Un bon nœud militaire doit être :',
    options: [
      'Impossible à défaire',
      'Solide sous tension ET facile à défaire ensuite',
      'Le plus gros possible',
      'Fait le plus vite possible, peu importe la forme'
    ],
    correct: 1,
    explanation: 'Tenir sous charge et se défaire sans couper la corde.'
  }
];
