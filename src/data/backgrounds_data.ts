import type { BackgroundSituation, Desire } from '../engine/types';

// 50 situations de départ en 6 catégories.
// Chaque situation applique des modificateurs sur les 4 jauges
// + un flag narratif `bg_<id>` posé automatiquement par le moteur.
export const BACKGROUNDS: BackgroundSituation[] = [
  // ── Décrochage scolaire (8) ──
  { id: 'arret_3eme', category: 'Décrochage scolaire', label: 'Arrêt en 3ème', quote: "L'école, ça ne me parlait plus. Le brevet, je l'ai pas eu.", effects: { gauges: { motivation: 5, moral: -5 } } },
  { id: 'arret_seconde', category: 'Décrochage scolaire', label: 'Arrêt en seconde', quote: "J'ai tenu un an. Puis plus rien.", effects: { gauges: { motivation: 5, moral: -3 } } },
  { id: 'arret_lycee_general', category: 'Décrochage scolaire', label: 'Arrêt en lycée général', quote: "J'avais les notes, pas l'envie.", effects: { gauges: { moral: -5 }, attributes: { intelligence: 1 } } },
  { id: 'arret_lycee_pro', category: 'Décrochage scolaire', label: 'Arrêt en lycée pro', quote: 'Ma filière ne me correspondait pas.', effects: { gauges: { motivation: 5 } } },
  { id: 'arret_bts1', category: 'Décrochage scolaire', label: 'Arrêt en BTS 1ère année', quote: 'Trop loin de ce que je voulais vraiment.', effects: { gauges: { moral: -3 }, attributes: { intelligence: 1 } } },
  { id: 'arret_bts2', category: 'Décrochage scolaire', label: 'Arrêt en BTS 2ème année', quote: "J'ai tout donné. Et puis j'ai lâché à trois semaines de la fin.", effects: { gauges: { moral: -8, motivation: 5 } } },
  { id: 'echec_bac', category: 'Décrochage scolaire', label: 'Échec répété au bac', quote: 'Trois tentatives. Trois défaites.', effects: { gauges: { moral: -8 }, attributes: { resilience: 1 } } },
  { id: 'exclusion', category: 'Décrochage scolaire', label: 'Exclusion scolaire', quote: "J'ai été renvoyé. J'aurais pas dû faire ça. Mais j'ai pas oublié pourquoi.", effects: { gauges: { rigueur: -5, moral: -3 } } },
  // ── Situation professionnelle difficile (8) ──
  { id: 'boulots_1an', category: 'Situation professionnelle', label: 'Petits boulots depuis 1 an', quote: 'CDD, intérim, et recommencer.', effects: { gauges: { motivation: 5 }, attributes: { debrouillardise: 1 } } },
  { id: 'boulots_3ans', category: 'Situation professionnelle', label: 'Petits boulots depuis 3 ans', quote: 'À un moment il faut changer quelque chose.', effects: { gauges: { motivation: 8 }, attributes: { debrouillardise: 1 } } },
  { id: 'licenciement', category: 'Situation professionnelle', label: 'Licenciement récent', quote: "L'entreprise a fermé du jour au lendemain.", effects: { gauges: { moral: -5, motivation: 5 } } },
  { id: 'licenciement_eco', category: 'Situation professionnelle', label: 'Licenciement économique', quote: "Pas ma faute. Ça n'aide pas.", effects: { gauges: { moral: -5 } } },
  { id: 'jamais_travaille', category: 'Situation professionnelle', label: "N'a jamais travaillé", quote: 'Je ne savais pas par où commencer.', effects: { gauges: { motivation: 3, moral: -3 } } },
  { id: 'rupture_apprentissage', category: 'Situation professionnelle', label: "Rupture de contrat d'apprentissage", quote: "Mon maître d'apprentissage et moi, ça n'a pas collé.", effects: { gauges: { rigueur: -3 } } },
  { id: 'neet_6mois', category: 'Situation professionnelle', label: 'NEET depuis 6 mois', quote: 'Ni emploi, ni études, ni formation. À regarder le plafond.', effects: { gauges: { moral: -8, motivation: 5 } } },
  { id: 'neet_1an', category: 'Situation professionnelle', label: "NEET depuis plus d'un an", quote: 'Je dormais jusqu\'à midi. Tout le temps.', effects: { gauges: { moral: -10, motivation: 8 } } },
  // ── Situation personnelle (10) ──
  { id: 'rupture_familiale', category: 'Situation personnelle', label: 'Rupture familiale', quote: 'Je ne rentrais plus à la maison.', effects: { gauges: { moral: -8 }, attributes: { resilience: 1 } } },
  { id: 'conflit_parent', category: 'Situation personnelle', label: 'Conflit violent avec un parent', quote: "J'ai dû partir. Je n'avais nulle part où aller.", effects: { gauges: { moral: -10 }, attributes: { resilience: 1 } } },
  { id: 'ase_18', category: 'Situation personnelle', label: "Sortie de l'ASE à 18 ans", quote: 'Du jour au lendemain, plus personne pour décider à ta place. Ça fait peur.', effects: { gauges: { moral: -5 }, attributes: { debrouillardise: 1 } } },
  { id: 'ase_21', category: 'Situation personnelle', label: "Sortie de l'ASE à 21 ans", quote: "J'ai tenu trois ans seul. Là, j'ai besoin d'autre chose.", effects: { gauges: { motivation: 5 }, attributes: { resilience: 1 } } },
  { id: 'retour_etranger', category: 'Situation personnelle', label: "Retour de l'étranger", quote: "Je suis parti, ça n'a pas marché comme prévu.", effects: { gauges: { moral: -3 }, attributes: { debrouillardise: 1 } } },
  { id: 'deuil_recent', category: 'Situation personnelle', label: 'Deuil récent', quote: "Après ce qui s'est passé, j'avais besoin de repartir.", effects: { gauges: { moral: -12, motivation: 5 } } },
  { id: 'deuil_ancien', category: 'Situation personnelle', label: 'Deuil il y a longtemps', quote: "On pensait que j'avais tourné la page. J'avais juste arrêté d'en parler.", effects: { gauges: { moral: -5 } } },
  { id: 'demenagement', category: 'Situation personnelle', label: 'Déménagement imposé', quote: 'Nouveau département, zéro réseau, zéro repère.', effects: { gauges: { equipe: -5, motivation: 5 } } },
  { id: 'rupture_sentimentale', category: 'Situation personnelle', label: 'Rupture sentimentale douloureuse', quote: 'Six mois ensemble. Deux mois à reconstruire. Toujours en cours.', effects: { gauges: { moral: -8 } } },
  { id: 'maladie_proche', category: 'Situation personnelle', label: "Maladie d'un proche", quote: "J'aidais ma famille. J'ai rien fait d'autre pendant deux ans.", effects: { gauges: { moral: -5 }, attributes: { resilience: 1 } } },
  // ── Recherche active (10) ──
  { id: 'diplome_sans_emploi', category: 'Recherche active', label: "Diplôme obtenu, pas d'emploi", quote: 'Bac en poche. Toujours au chômage.', effects: { gauges: { motivation: 5, moral: -3 }, attributes: { intelligence: 1 } } },
  { id: 'bacpro_bouche', category: 'Recherche active', label: 'Bac pro sans débouché', quote: 'Ma filière était bouchée.', effects: { gauges: { motivation: 5 } } },
  { id: 'bac_techno', category: 'Recherche active', label: 'Bac technologique sans suite', quote: "J'ai le bac mais aucune idée de la suite.", effects: { gauges: { motivation: 3 } } },
  { id: 'master_abandonne', category: 'Recherche active', label: 'Master abandonné', quote: "Deux ans de fac, puis j'ai décroché.", effects: { attributes: { intelligence: 1 }, gauges: { moral: -3 } } },
  { id: 'licence_abandonnee', category: 'Recherche active', label: 'Licence abandonnée', quote: "La fac, c'était pas pour moi. Je savais pas comment le dire.", effects: { gauges: { moral: -3 } } },
  { id: 'orientation_imposee', category: 'Recherche active', label: 'Orientation imposée', quote: 'Mes parents avaient choisi. Moi non.', effects: { gauges: { motivation: 5 } } },
  { id: 'reconversion', category: 'Recherche active', label: 'Souhait de reconversion', quote: 'Mon ancien métier me rendait malheureux.', effects: { gauges: { motivation: 8 } } },
  { id: 'reconversion_accident', category: 'Recherche active', label: 'Reconversion après accident', quote: 'Je ne pouvais plus faire ce que je faisais avant.', effects: { gauges: { moral: -5 }, attributes: { resilience: 1 } } },
  { id: 'service_civique', category: 'Recherche active', label: 'Retour après un service civique', quote: "J'ai aidé des gens pendant 8 mois. Je veux continuer.", effects: { gauges: { equipe: 5, motivation: 5 } } },
  { id: 'recherche_structure', category: 'Recherche active', label: 'Recherche de structure', quote: "J'ai besoin d'un cadre. Autrement rien ne tient.", effects: { gauges: { rigueur: 5 } } },
  // ── Envie d'ailleurs (8) ──
  { id: 'sportif_blesse_bg', category: "Envie d'ailleurs", label: 'Sportif blessé', quote: 'Ma blessure a tout arrêté. Besoin de reconstruire.', effects: { attributes: { endurance: 1 }, gauges: { moral: -5 } } },
  { id: 'sportif_reconverti', category: "Envie d'ailleurs", label: 'Sportif de haut niveau reconverti', quote: "J'ai donné tout à mon sport. Il m'a pas rendu la pareille.", effects: { attributes: { endurance: 1 }, gauges: { motivation: 5 } } },
  { id: 'passion_sans_debouche', category: "Envie d'ailleurs", label: 'Passion sans débouché', quote: 'Artiste, musicien, gamer. Pas payé.', effects: { attributes: { debrouillardise: 1 } } },
  { id: 'refus_armee', category: "Envie d'ailleurs", label: "Refusé à l'armée de terre", quote: "Armée de terre refusée. Le SMV m'a été conseillé.", effects: { gauges: { motivation: 8, rigueur: 5 } } },
  { id: 'refus_gendarmerie', category: "Envie d'ailleurs", label: 'Refusé à la gendarmerie', quote: "J'avais le profil, pas le dossier. Le SMV est une autre voie.", effects: { gauges: { motivation: 8, rigueur: 3 } } },
  { id: 'volontaire_assoc', category: "Envie d'ailleurs", label: 'Ancien volontaire associatif', quote: "J'aimais aider. Je veux continuer autrement.", effects: { gauges: { equipe: 8 } } },
  { id: 'voyageur', category: "Envie d'ailleurs", label: 'Voyageur de retour', quote: "J'ai fait un tour du monde. Maintenant faut construire quelque chose.", effects: { attributes: { debrouillardise: 1 }, gauges: { motivation: 5 } } },
  { id: 'curiosite', category: "Envie d'ailleurs", label: 'Curiosité pure', quote: 'Vu une affiche au bord de la route. Intrigué.', effects: { gauges: { motivation: 3 } } },
  // ── Profil particulier (6) ──
  { id: 'proche_aidant', category: 'Profil particulier', label: 'Proche aidant', quote: "J'ai mis ma vie entre parenthèses pour m'occuper de quelqu'un.", effects: { gauges: { moral: -3 }, attributes: { resilience: 1 } } },
  { id: 'ancien_detenu', category: 'Profil particulier', label: 'Ancien détenu (jeune)', quote: "J'ai fait une erreur. Je cherche pas d'excuses. Je cherche une porte.", effects: { gauges: { motivation: 10, moral: -5 } } },
  { id: 'primo_arrivant', category: 'Profil particulier', label: 'Réfugié / primo-arrivant', quote: "Je veux m'intégrer. Vraiment. Pas juste exister.", effects: { gauges: { motivation: 10 }, attributes: { resilience: 1 } } },
  { id: 'handicap_leger', category: 'Profil particulier', label: 'En situation de handicap léger', quote: "On m'a dit que je pouvais pas. Je veux vérifier.", effects: { gauges: { motivation: 10 } } },
  { id: 'aidant_numerique', category: 'Profil particulier', label: 'Aidant numérique', quote: "J'ai passé trois ans sur des écrans. Le monde réel, j'ai besoin de le retrouver.", effects: { attributes: { intelligence: 1 }, gauges: { equipe: -3 } } },
  { id: 'parent_jeune', category: 'Profil particulier', label: 'Parent jeune', quote: "J'ai une fille. Elle mérite que je construise quelque chose.", effects: { gauges: { motivation: 12 } } }
];

// 20 envies — choisir 1 ou 2. Influencent l'ordre des choix,
// certains dialogues, et la résonance de la fin.
export const DESIRES: Desire[] = [
  { id: 'permis', label: 'Passer le permis', quote: "C'est la raison officielle.", effects: { gauges: { motivation: 5 } } },
  { id: 'emploi_stable', label: 'Trouver un emploi stable', quote: 'Pas de passion. Juste de la stabilité.' },
  { id: 'depassement', label: 'Me dépasser physiquement', quote: "Voir jusqu'où je peux aller.", effects: { attributes: { endurance: 1 } } },
  { id: 'appartenir', label: 'Appartenir à quelque chose', quote: 'Faire partie d\'un groupe qui compte.', effects: { attributes: { sociabilite: 1 } } },
  { id: 'me_prouver', label: 'Me prouver quelque chose', quote: "À moi-même d'abord.", effects: { attributes: { determination: 1 } } },
  { id: 'prouver_famille', label: 'Prouver à ma famille', quote: "Ils m'ont dit que j'y arriverais pas." },
  { id: 'zero', label: 'Repartir de zéro', quote: 'Effacer le tableau. Recommencer.' },
  { id: 'ma_voie', label: 'Trouver ma voie', quote: "Je cherche encore. C'est honnête." },
  { id: 'diplome', label: 'Avoir un diplôme / certification', quote: 'Un papier. Quelque chose de concret.' },
  { id: 'rendre_service', label: 'Rendre service', quote: 'Je veux faire quelque chose d\'utile.' },
  { id: 'fuir', label: 'Fuir quelque chose', quote: 'Je préfère pas dire quoi.' },
  { id: 'me_decouvrir', label: 'Découvrir ce que je vaux', quote: 'Je sais pas encore ce dont je suis capable.' },
  { id: 'discipline_d', label: 'Retrouver de la discipline', quote: "J'en ai besoin. Je le sais.", effects: { gauges: { rigueur: 5 } } },
  { id: 'socialiser', label: 'Me sociabiliser', quote: "J'étais seul depuis trop longtemps." },
  { id: 'dette', label: 'Rembourser une dette', quote: 'À ma famille, à la société — peu importe.' },
  { id: 'carriere', label: 'Construire une carrière', quote: 'Pas juste un boulot. Un avenir.' },
  { id: 'rencontrer', label: 'Rencontrer des gens', quote: 'De vrais gens. Pas des profils Instagram.' },
  { id: 'utile', label: 'Me sentir utile', quote: 'Le sentiment que je manquais depuis longtemps.' },
  { id: 'bouger', label: 'Ne plus stagner', quote: 'Je veux juste que quelque chose bouge.' },
  { id: 'qui_je_suis', label: 'Comprendre qui je suis', quote: "Question ouverte. J'ai pas encore la réponse." }
];

export const backgroundById = (id: string) => BACKGROUNDS.find((b) => b.id === id);
export const desireById = (id: string) => DESIRES.find((d) => d.id === id);
