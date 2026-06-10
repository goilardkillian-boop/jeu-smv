import type { QcmQuestion } from '../../engine/types';

export const QCM_CULTURE_G: QcmQuestion[] = [
  { id: 'cg_devise', question: 'Quelle est la devise de la République française ?', options: ['Travail, Famille, Patrie', 'Liberté, Égalité, Fraternité', 'Honneur et Patrie', 'Unité, Force, Progrès'], correct: 1 },
  { id: 'cg_marseillaise', question: "Qui a composé La Marseillaise ?", options: ['Victor Hugo', 'Rouget de Lisle', 'Hector Berlioz', 'Napoléon'], correct: 1 },
  { id: 'cg_14juillet', question: 'Que commémore le 14 juillet ?', options: ["L'armistice de 1918", 'La prise de la Bastille (1789)', 'Le débarquement', 'Le sacre de Napoléon'], correct: 1 },
  { id: 'cg_larochelle_tours', question: 'Quelles tours encadrent l\'entrée du Vieux-Port de La Rochelle ?', options: ['Tour Eiffel et Tour Montparnasse', 'Tour de la Chaîne et Tour Saint-Nicolas', 'Tour de Nesle et Tour du Temple', 'Tour Magne et Tour Philippe'], correct: 1 },
  { id: 'cg_charente', question: 'La Rochelle est la préfecture de quel département ?', options: ['Charente', 'Charente-Maritime', 'Vendée', 'Gironde'], correct: 1 },
  { id: 'cg_smv_duree', question: 'Le parcours SMV dure généralement :', options: ['2 mois', '8 à 12 mois', '3 ans', '6 semaines'], correct: 1 },
  { id: 'cg_smv_statut', question: 'Le SMV est un dispositif :', options: ["D'engagement opérationnel de combat", "Militaire d'insertion professionnelle pour les 18-25 ans", 'De service civique', 'De réserve citoyenne'], correct: 1 },
  { id: 'cg_smv_regiments', question: 'Combien de régiments SMV existent en France ?', options: ['3', '8', '15', '1'], correct: 1 },
  { id: 'cg_president', question: 'Qui est le chef des armées en France ?', options: ['Le Premier ministre', 'Le Président de la République', "Le chef d'état-major", 'Le ministre des Armées'], correct: 1 },
  { id: 'cg_ue', question: "Combien d'étoiles figurent sur le drapeau européen ?", options: ['27', '12', '28', '15'], correct: 1 },
  { id: 'cg_re', question: "Quelle île fait face à La Rochelle, reliée par un pont ?", options: ["L'île d'Oléron", "L'île de Ré", "L'île d'Yeu", 'Belle-Île'], correct: 1 },
  { id: 'cg_secu', question: 'Le numéro d\'appel d\'urgence européen est :', options: ['15', '112', '17', '18'], correct: 1 },
  { id: 'cg_smic', question: 'Le SMIC est :', options: ['Un impôt', 'Le salaire minimum légal', 'Une aide au logement', 'Un contrat de travail'], correct: 1 },
  { id: 'cg_cdi', question: 'CDI signifie :', options: ['Contrat à durée indéterminée', 'Contrat de droit international', 'Certificat d\'insertion', 'Contrat à durée intermédiaire'], correct: 0 },
  { id: 'cg_vote', question: 'En France, on peut voter à partir de :', options: ['16 ans', '18 ans', '21 ans', '25 ans'], correct: 1 },
  { id: 'cg_atlantique', question: 'La Rochelle est un port sur quel océan ?', options: ['Méditerranée', 'Atlantique', 'Manche', 'Mer du Nord'], correct: 1 },
  { id: 'cg_armee_terre', question: 'Le SMV dépend de :', options: ['La Marine nationale', "L'armée de Terre", "L'armée de l'Air", 'La Gendarmerie'], correct: 1 },
  { id: 'cg_psc1', question: 'Le PSC1 est :', options: ['Un diplôme de secourisme', 'Un permis spécial', 'Un grade militaire', 'Un examen de français'], correct: 0 },
  { id: 'cg_impots', question: 'La déclaration de revenus se fait :', options: ['Jamais avant 30 ans', 'Chaque année', 'Tous les 5 ans', 'Uniquement si on est riche'], correct: 1 },
  { id: 'cg_siecle', question: 'Le siège de La Rochelle par Richelieu a eu lieu au :', options: ['XVe siècle', 'XVIIe siècle', 'XIXe siècle', 'XXe siècle'], correct: 1 }
];
