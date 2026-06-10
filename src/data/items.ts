import type { Item } from '../engine/types';

export const ITEMS: Item[] = [
  // Consommables
  { id: 'chocolat', name: 'Barre chocolatée', icon: '🍫', category: 'consommable', description: '+15 Moral, ou à offrir.' },
  { id: 'cafe_chaud', name: 'Café chaud', icon: '☕', category: 'consommable', description: '+15 Moral, +5 Rigueur. Merci Momo.' },
  { id: 'paracetamol', name: 'Paracétamol', icon: '💊', category: 'consommable', description: 'Soulage. Ou aide un camarade.' },
  { id: 'biscuits', name: 'Biscuits secs', icon: '🍪', category: 'consommable', description: '+10 Moral, partageable.' },
  { id: 'barre_cereales', name: 'Barre de céréales', icon: '🌾', category: 'consommable', description: '+5 Endurance avant une épreuve.' },
  // Social
  { id: 'cigarettes', name: 'Cigarettes', icon: '🚬', category: 'social', description: 'Monnaie sociale universelle. Risquée.' },
  { id: 'stylo', name: 'Stylo 4 couleurs', icon: '🖊️', category: 'social', description: 'Petit objet, grands effets.' },
  { id: 'carnet', name: 'Carnet de notes', icon: '📓', category: 'social', description: 'Débloque le journal enrichi.', unique: true },
  { id: 'photo_famille', name: 'Photo de famille', icon: '📸', category: 'social', description: '+10 Moral quand tu la regardes.', unique: true },
  { id: 'carte_postale', name: 'Carte postale de La Rochelle', icon: '🗺️', category: 'social', description: 'À envoyer à la famille.', unique: true },
  { id: 'livre_code', name: 'Livre de code', icon: '📖', category: 'utilite', description: '+20% réussite QCM code.' },
  { id: 'magazine_sport', name: 'Magazine sport', icon: '📰', category: 'social', description: 'Kevin appréciera.' },
  { id: 'jeu_cartes', name: 'Jeu de cartes', icon: '🃏', category: 'social', description: 'Soirées au Foyer.' },
  // Utilité
  { id: 'lampe', name: 'Lampe de poche', icon: '🔦', category: 'utilite', description: 'Précieuse au bivouac.' },
  { id: 'fiches_noeuds', name: 'Fiches nœuds', icon: '📋', category: 'utilite', description: '+25% réussite QCM nœuds.' },
  { id: 'carnet_revision', name: 'Carnet de révision', icon: '📝', category: 'utilite', description: '+15% prochain QCM.' },
  { id: 'kit_couture', name: 'Kit couture', icon: '🧵', category: 'utilite', description: 'Répare la tenue avant inspection.' },
  // Souvenirs
  { id: 'calot', name: 'Calot personnel', icon: '🪖', category: 'souvenir', description: 'Premier objet de ton arc.', unique: true },
  { id: 'insigne', name: 'Insigne de section', icon: '🎖️', category: 'souvenir', description: '+20 Moral permanent.', unique: true },
  { id: 'brevet_psc1', name: 'Brevet de secourisme', icon: '🩹', category: 'souvenir', description: 'PSC1 validé.', unique: true },
  { id: 'attestation_code', name: 'Attestation code de la route', icon: '📜', category: 'souvenir', description: 'Le code est en poche.', unique: true },
  { id: 'dessin_lea', name: 'Dessin de Léa', icon: '🖼️', category: 'souvenir', description: 'Ton portrait. Elle l\'a fait sans te le dire.', unique: true },
  { id: 'ticket_momo', name: 'Ticket « Rab Momo »', icon: '🍖', category: 'souvenir', description: '« Pour la prochaine fois. »', unique: true },
  { id: 'lettre_thomas', name: 'Lettre de Thomas', icon: '✉️', category: 'souvenir', description: 'Laissée dans ton casier.', unique: true },
  // Secrets
  { id: 'bouteille_enzo', name: "Bouteille d'alcool", icon: '🍶', category: 'secret', description: 'Trouvée sous le lit d\'Enzo. Et maintenant ?', unique: true },
  { id: 'lettre_ines', name: "Lettre d'Inès (non lue)", icon: '💌', category: 'secret', description: 'Elle a écrit quelque chose qu\'elle n\'a pas osé dire.', unique: true }
];

export const itemById = (id: string) => ITEMS.find((i) => i.id === id);
