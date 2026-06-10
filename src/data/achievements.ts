import type { Achievement } from '../engine/types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'premier_pas', name: 'Premier pas', icon: '🥾', condition: "Terminer l'incorporation", quote: 'La porte était ouverte. Tu l\'as poussée.' },
  { id: 'informateur', name: "L'informateur", icon: '👁️', condition: 'Dénoncer Enzo', quote: 'Certaines fidélités ont un prix.' },
  { id: 'bouclier', name: 'Bouclier', icon: '🛡️', condition: 'Protéger Enzo sans se faire prendre', quote: 'Tu savais le risque.' },
  { id: 'chef_de_file', name: 'Chef de file', icon: '🤝', condition: "Esprit d'équipe > 80 à la fin", quote: 'Le groupe, c\'est tout.' },
  { id: 'survivant_m', name: 'Survivant', icon: '❤️‍🩹', condition: "Frôler l'exclusion et finir", quote: 'À deux doigts. Pas tombé.' },
  { id: 'pilote', name: 'Pilote', icon: '🚗', condition: 'QCM code sans faute', quote: "L'inspecteur a souri. Une fois." },
  { id: 'major', name: 'Major de promo', icon: '⭐', condition: 'Toutes jauges > 75', quote: "L'adjudant a dit votre nom. Positivement." },
  { id: 'solidaire', name: 'Solidaire', icon: '🏃', condition: 'Aider le camarade pendant la Marche', quote: 'Tu as terminé dernier. Ensemble.' },
  { id: 'sprinter', name: 'Sprinter', icon: '🏆', condition: 'Finir la Marche en tête seul', quote: 'Ton corps a gagné. Ta section a perdu.' },
  { id: 'academicien', name: 'Académicien', icon: '🎓', condition: 'Réussir tous les QCM', quote: 'La théorie, vous maîtrisez.' },
  { id: 'fantome', name: 'Fantôme', icon: '👻', condition: 'Terminer sans convocation', quote: 'Transparent mais irréprochable.' },
  { id: 'recrue_parfaite', name: 'Recrue parfaite', icon: '💼', condition: 'Recommandation de Moreau', quote: 'Il a fait le nécessaire.' },
  { id: 'diplomate_m', name: 'Diplomate', icon: '🎁', condition: 'Offrir un objet à 4 personnages', quote: "On n'achète pas les gens. Ou presque." },
  { id: 'confiance_accordee', name: 'Confiance accordée', icon: '🔑', condition: 'Relation Ferreira > 80', quote: 'Il t\'a dit son prénom. Pas son grade.' },
  { id: 'frere_soeur', name: 'Frère / Sœur', icon: '🫂', condition: 'Dimitri > 75 + scène révélation', quote: 'Il t\'a parlé de son père.' },
  { id: 'sans_faute', name: 'Sans faute', icon: '✅', condition: '100% des QCM', quote: 'Zéro erreur. Aucune.' },
  { id: 'artiste_terrain', name: 'Artiste de terrain', icon: '🎨', condition: 'Scène fresque réalisée', quote: 'Tu as laissé quelque chose.' },
  { id: 'temoin', name: 'Le témoin', icon: '👁️‍🗨️', condition: 'Background deuil/ASE + fin réussite', quote: 'Tu savais ce que ça coûte de tenir.' },
  { id: 'trop_tot', name: 'Trop tôt, pas fini', icon: '⏳', condition: 'Partir puis rejouer', quote: "Ce n'était pas le bon moment. Revenir, c'était le bon." },
  { id: 'la_lettre', name: 'La lettre', icon: '📬', condition: 'Lettre envoyée + réponse', quote: 'Elle a répondu.' },
  { id: 'hors_sentiers', name: 'Hors des sentiers', icon: '🌿', condition: 'Fin spéciale trait Rebelle', quote: "Tu n'as pas suivi le chemin. Tu en as créé un." },
  { id: 'vrai_thomas', name: 'Le vrai Thomas', icon: '💙', condition: 'Thomas ne part pas grâce à toi', quote: 'Il a fini. À cause de toi.' },
  { id: 'calot_famille', name: 'Calot de famille', icon: '🪖', condition: 'Famille présente à la cérémonie', quote: 'Ils étaient là.' },
  { id: 'nuit_karola', name: 'Nuit de Karola', icon: '🌙', condition: 'Bivouac terminé, Moral > 50', quote: 'Tu as vu le lever du soleil depuis le terrain.' },
  { id: 'huit_mois', name: '8 mois', icon: '⌛', condition: 'Terminer le jeu', quote: 'Tu as vécu quelque chose. Ça ne s\'efface pas.' },
  { id: 'ng_plus', name: 'Recommencer en sachant', icon: '🔁', condition: 'Commencer une Nouvelle partie +', quote: 'Tu connais le chemin. Pas l\'histoire.' }
];

export const achievementById = (id: string) => ACHIEVEMENTS.find((a) => a.id === id);
