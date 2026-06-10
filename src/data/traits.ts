import type { Trait } from '../engine/types';

// 55 traits en 7 familles. Les effets sont appliqués par le moteur
// (gameEngine.applyTraitModifiers) — jamais affichés comme des "buffs".
export const TRAITS: Trait[] = [
  // ── FORCE (10) ──
  { id: 'leader', name: 'Leader naturel', family: 'force', description: 'Tu prends les devants sans demander.', effectLine: '"Je vais le faire."' },
  { id: 'competiteur', name: 'Compétiteur', family: 'force', description: 'Être moyen ne te suffit pas.', effectLine: '"Je veux être le meilleur de la section."' },
  { id: 'tenace', name: 'Tenace', family: 'force', description: 'Tu récupères vite après une défaite.', effectLine: '"Je lâche pas."' },
  { id: 'courageux', name: 'Courageux', family: 'force', description: 'Les choix risqués ne te font pas peur.', effectLine: '"Quelqu\'un doit le faire."' },
  { id: 'endurant', name: 'Endurant', family: 'force', description: 'Les épreuves dures t\'usent moins que les autres.', effectLine: '"J\'ai encore des réserves."' },
  { id: 'ambitieux', name: 'Ambitieux', family: 'force', description: 'Tout progresse plus vite. Parfois au détriment des autres.', effectLine: '"Je suis pas là pour être moyen."' },
  { id: 'stoique', name: 'Stoïque', family: 'force', description: 'Le moral plie peu. Les mots sortent peu aussi.', effectLine: '"Ça va." (quand ça va pas)' },
  { id: 'protecteur', name: 'Protecteur', family: 'force', description: 'Tu défends ceux qui en ont besoin.', effectLine: '"Laisse-le tranquille."' },
  { id: 'volontariste', name: 'Volontariste', family: 'force', description: 'Très fort au début. Attention à la fatigue.', effectLine: '"Je veux tout faire."' },
  { id: 'combatif', name: 'Combatif', family: 'force', description: 'La confrontation ne te fait pas peur. Les cadres le sentent.', effectLine: '"J\'ai pas peur du conflit."' },
  // ── SOCIAL (10) ──
  { id: 'empathique', name: 'Empathique', family: 'social', description: 'Les relations montent plus vite. Tu vois les gens.', effectLine: 'Scènes de soutien débloquées.' },
  { id: 'bavard', name: 'Bavard', family: 'social', description: 'Les liens se créent vite. La concentration, moins.', effectLine: 'Relations +rapides, Rigueur distraite.' },
  { id: 'diplomate', name: 'Diplomate', family: 'social', description: 'Tu évites les conflits relationnels.', effectLine: 'Option médiation dans les disputes.' },
  { id: 'loyal', name: 'Loyal', family: 'social', description: 'La délation, très peu pour toi.', effectLine: 'Soutien renforcé aux PNJ en difficulté.' },
  { id: 'charmeur', name: 'Charmeur / Charmeuse', family: 'social', description: 'On t\'apprécie facilement.', effectLine: 'Situations sociales spéciales.' },
  { id: 'drole', name: 'Drôle', family: 'social', description: 'L\'esprit d\'équipe monte avec toi. Ferreira reste de marbre.', effectLine: '+Esprit d\'équipe constant.' },
  { id: 'attentionne', name: 'Attentionné(e)', family: 'social', description: 'Tu détectes les gens en difficulté avant qu\'ils parlent.', effectLine: 'Missions d\'aide déclenchées plus tôt.' },
  { id: 'genereux', name: 'Généreux / Généreuse', family: 'social', description: 'Tes cadeaux comptent double. Ton inventaire se vide.', effectLine: 'Bonus doublé sur les objets offerts.' },
  { id: 'mediateur', name: 'Médiateur / Médiatrice', family: 'social', description: 'Tu peux résoudre les conflits entre les autres.', effectLine: 'Chemin narratif unique semaine 4.' },
  { id: 'federateur', name: 'Fédérateur / Fédératrice', family: 'social', description: 'Quand tu montes, la section monte avec toi.', effectLine: 'Scènes de groupe déclenchables.' },
  // ── INTELLECT (8) ──
  { id: 'curieux', name: 'Curieux / Curieuse', family: 'intellect', description: 'Apprendre te motive vraiment.', effectLine: 'Dialogues de découverte supplémentaires.' },
  { id: 'debrouillard', name: 'Débrouillard(e)', family: 'intellect', description: 'Il y a toujours une autre solution.', effectLine: '+Réussite QCM, sorties d\'impasses.' },
  { id: 'stratege', name: 'Stratège', family: 'intellect', description: 'Tu vois les conséquences avant les autres.', effectLine: 'Indices avant les choix lourds.' },
  { id: 'perfectionniste', name: 'Perfectionniste', family: 'intellect', description: 'La rigueur paye. L\'échec coûte cher au moral.', effectLine: '+Rigueur durable, -Moral sur échec QCM.' },
  { id: 'observateur', name: 'Observateur / Observatrice', family: 'intellect', description: 'Tu vois ce que les autres cachent.', effectLine: 'Dialogues cachés débloqués.' },
  { id: 'analytique', name: 'Analytique', family: 'intellect', description: 'Les systèmes, tu les comprends vite.', effectLine: '+Réussite QCM logique et filière.' },
  { id: 'creatif', name: 'Créatif / Créative', family: 'intellect', description: 'Tu vois des chemins que personne ne propose.', effectLine: 'Arc mission citoyenne étendu.' },
  { id: 'litteraire', name: 'Littéraire', family: 'intellect', description: 'Les mots sont ton terrain.', effectLine: 'Journal enrichi, dialogues avec Léa.' },
  // ── FRAGILITÉ (8) ──
  { id: 'anxieux', name: 'Anxieux / Anxieuse', family: 'fragilite', description: 'Le stress coûte. Demander de l\'aide rapporte beaucoup.', effectLine: '+30% si tu demandes de l\'aide.' },
  { id: 'impulsif', name: 'Impulsif / Impulsive', family: 'fragilite', description: 'Tu réagis avant de réfléchir. Parfois ça coûte.', effectLine: 'Réactions émotionnelles fortes.' },
  { id: 'renferme', name: 'Renfermé(e)', family: 'fragilite', description: 'Les liens mettent du temps. La concentration est là.', effectLine: '-Relations, +Rigueur.' },
  { id: 'susceptible', name: 'Susceptible', family: 'fragilite', description: 'La critique fait mal. Apprendre à la gérer est un arc.', effectLine: 'Arc spécial si tu tiens.' },
  { id: 'decourageable', name: 'Décourageable', family: 'fragilite', description: 'Les épreuves longues t\'usent. Tenir devient un moment fort.', effectLine: 'Bascule émotionnelle si tu tiens.' },
  { id: 'perfectionniste_anx', name: 'Perfectionniste anxieux', family: 'fragilite', description: 'Chaque échec pèse. Chaque réussite est décuplée.', effectLine: 'La fierté compte double.' },
  { id: 'hypersensible', name: 'Hypersensible', family: 'fragilite', description: 'Tout est plus fort, dans les deux sens.', effectLine: 'Journal très riche, fins très émotionnelles.' },
  { id: 'procrastinateur', name: 'Procrastinateur / Procrastinatrice', family: 'fragilite', description: 'Le démarrage est dur. Le cadre aide énormément.', effectLine: '+30% si Ferreira te donne une structure.' },
  // ── RAPPORT À L'AUTORITÉ (9) ──
  { id: 'discipline_t', name: 'Discipliné(e)', family: 'autorite', description: 'Les cadres t\'apprécient vite.', effectLine: 'Accès rapide à la confiance de Ferreira.' },
  { id: 'mefiant_t', name: 'Méfiant(e)', family: 'autorite', description: 'La confiance se mérite. La tienne vaut cher.', effectLine: 'Relation cadres lente mais x1.5 une fois gagnée.' },
  { id: 'contestataire_t', name: 'Contestataire', family: 'autorite', description: 'Tu remets en question. Ça se voit.', effectLine: 'Choix de rébellion, convocation plus rapide.' },
  { id: 'besoin_explications', name: 'Besoin d\'explications', family: 'autorite', description: 'Comprendre avant d\'obéir.', effectLine: '+QCM si l\'exercice est expliqué avant.' },
  { id: 'suiveur_t', name: 'Suiveur / Suiveuse', family: 'autorite', description: 'Le groupe d\'abord. Toi, plus tard.', effectLine: '+Esprit d\'équipe, moins de choix indépendants.' },
  { id: 'rebelle', name: 'Rebelle assumé(e)', family: 'autorite', description: 'Ton chemin n\'est pas celui des autres.', effectLine: 'Fin "Hors des sentiers" débloquée.' },
  { id: 'recherche_figure', name: 'En recherche de figure', family: 'autorite', description: 'Ferreira pourrait être plus qu\'un adjudant.', effectLine: 'Arc mentor possible, relation Ferreira +20 au départ.' },
  { id: 'anarchiste_doux', name: 'Anarchiste doux(ce)', family: 'autorite', description: 'Tu questionnes sans agresser.', effectLine: 'Certains cadres apprécient, d\'autres pas.' },
  { id: 'impressionner', name: 'Cherche à impressionner', family: 'autorite', description: 'Réussir devant eux compte double. Échouer aussi.', effectLine: '+relation autorité si réussite visible.' },
  // ── SPÉCIALE (5) ──
  { id: 'sportif_blesse', name: 'Sportif / Sportive blessé(e)', family: 'speciale', description: 'Le corps connaît. L\'arc est la reconstruction.', effectLine: 'Bonnes épreuves physiques.' },
  { id: 'proche_aidant_t', name: 'Proche aidant', family: 'speciale', description: 'Aider est un réflexe chez toi.', effectLine: 'Empathie naturelle.' },
  { id: 'survivant', name: 'Survivant(e)', family: 'speciale', description: 'Tu sais ce que ça coûte de tenir.', effectLine: 'Fin "Témoin" débloquée.' },
  { id: 'artiste', name: 'Artiste sans scène', family: 'speciale', description: 'Le talent est là. La scène manquait.', effectLine: 'Arc mission citoyenne étendu, scènes avec Jade.' },
  { id: 'parent_jeune_t', name: 'Parent jeune', family: 'speciale', description: 'Quelqu\'un compte sur toi, vraiment.', effectLine: 'Motivation décuplée, scènes d\'appel uniques.' },
  // ── ANCRAGE (5) ──
  { id: 'fier_origines', name: 'Fier / Fière de ses origines', family: 'ancrage', description: 'On ne t\'atteint pas par là.', effectLine: 'Scènes de partage culturel.' },
  { id: 'attache_region', name: 'Attaché(e) à sa région', family: 'ancrage', description: 'La Rochelle, c\'est chez toi.', effectLine: '+Moral mission citoyenne, scène bonus de fin.' },
  { id: 'bilingue', name: 'Bilingue', family: 'ancrage', description: 'Deux langues, deux mondes.', effectLine: 'Dialogue bonus avec Moreau.' },
  { id: 'discret_passe', name: 'Discret(e) sur son passé', family: 'ancrage', description: 'Ton histoire t\'appartient.', effectLine: 'Arc "mystère" qui intrigue les PNJ.' },
  { id: 'ouvert_passe', name: 'Ouvert(e) sur son passé', family: 'ancrage', description: 'Parler de soi crée des liens. Et des risques.', effectLine: '+Relations quand tu parles de toi.' }
];

export const TRAIT_FAMILIES: Record<Trait['family'], string> = {
  force: 'Force',
  social: 'Social',
  intellect: 'Intellect',
  fragilite: 'Fragilité',
  autorite: "Rapport à l'autorité",
  speciale: 'Spéciale',
  ancrage: 'Ancrage'
};

export const traitById = (id: string) => TRAITS.find((t) => t.id === id);
