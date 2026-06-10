import type { Ending } from '../../engine/types';

export const ENDINGS: Ending[] = [
  // ── FINS RÉUSSITE ──
  {
    id: 'fin_nouvelle_vie',
    title: 'Une nouvelle vie',
    family: 'reussite',
    text: "Il y a des matins où on ne sait pas encore ce qu'on a accompli. Où la fatigue et la fierté ont exactement le même goût. Tu as signé un contrat. Mais ce que tu emportes d'ici tient dans autre chose : la façon dont tu salues maintenant, dont tu tiens debout quand tu es à bout, dont tu regardes les gens qui ont besoin d'aide. Le 3e RSMV ne t'a pas transformé. Il t'a révélé.",
    cta: 'Cette histoire pourrait être la tienne.'
  },
  {
    id: 'fin_leader',
    title: 'Le leader reconnu',
    family: 'reussite',
    text: "Ferreira a dit quelque chose à Moreau, en passant, le dernier jour. Tu l'as vu. Tu ne l'as pas entendu. Mais Moreau t'a regardé différemment après. Ces choses-là ne s'expliquent pas. Elles se méritent."
  },
  {
    id: 'fin_ensemble',
    title: "Ensemble jusqu'au bout",
    family: 'reussite',
    text: "Tu as fini dans les derniers. Parce que tu as attendu tout le monde. Ce n'est pas dans les statistiques. Mais tout le monde s'en souviendra."
  },
  {
    id: 'fin_ferreira',
    title: "Ce que Ferreira t'a dit",
    family: 'reussite',
    text: "La dernière fois que tu l'as vu, il t'a serré la main. Pas le genre de poignée de main qu'on donne à tout le monde. Il a dit : « Vous avez tout ce qu'il faut. » C'est la chose la plus courte et la plus longue qu'on t'ait jamais dite."
  },
  {
    id: 'fin_retour',
    title: 'Retour transformé',
    family: 'reussite',
    text: "Tu repasses devant l'arrêt de bus où tu attendais il y a huit mois. Le même arrêt. Le même ciel gris de La Rochelle. Mais toi, tu n'es plus le même. Tu as un permis dans la poche. Tu as un contrat. Tu as quelque chose que tu ne savais pas nommer en arrivant ici, et que tu n'as toujours pas les mots pour expliquer."
  },
  // ── FINS PARCOURS ──
  {
    id: 'fin_pas_la_fin',
    title: "Ce n'était pas la fin",
    family: 'parcours',
    text: "Tu n'as pas tout réussi. Pas tout à fait. Mais tu es allé plus loin que tu ne pensais aller. Le contrat n'est pas signé ce soir. Mais il y a une réunion prévue la semaine prochaine. Et cette fois, tu ne te demandes pas si tu vas y aller."
  },
  {
    id: 'fin_graine',
    title: 'La graine plantée',
    family: 'parcours',
    text: "Tu n'es pas resté. Tu le savais dès la semaine six, que ce n'était pas ta route. Mais le SMV t'a appris à en trouver une. Tu as une idée, maintenant. Et pour la première fois depuis longtemps, l'idée ne te fait pas peur."
  },
  {
    id: 'fin_soin',
    title: "Prendre soin de soi d'abord",
    family: 'parcours',
    text: "Aller voir Claire a été la chose la plus difficile que tu aies faite ici. Plus que la marche. Plus que les examens. Mais tu l'as fait. Et quelque chose a changé."
  },
  {
    id: 'fin_autre_chemin',
    title: 'Un autre chemin',
    family: 'parcours',
    text: "Tu es parti un mardi matin. Pas de drame. Tu as dit au revoir à Thomas, pas aux autres. Mais tu savais, en prenant le train, que tu avais tenu plus longtemps que tu ne l'aurais cru."
  },
  // ── FINS DIFFICILES ──
  {
    id: 'fin_trop_tot',
    title: 'Trop tôt',
    family: 'difficile',
    text: "Tout le monde n'est pas prêt en même temps. Ce n'est pas un échec. C'est un timing. Tu es parti avant d'avoir eu le temps de voir ce que ça pouvait donner. Peut-être que dans six mois, un an, tu reviendras."
  },
  {
    id: 'fin_solitude',
    title: 'La solitude choisie',
    family: 'difficile',
    text: "Tu as fait les choses seul. Du début à la fin. Tu as ton contrat. Tu as ton permis. Personne ne sait vraiment qui tu es ici. Et quelque chose dans cette idée ne te dérange pas autant qu'il devrait."
  },
  {
    id: 'fin_recommencer',
    title: 'Recommencer autrement',
    family: 'difficile',
    text: "On t'a demandé de partir. Ce n'est pas une honte. C'est une information. Quelque chose dans cette configuration n'a pas fonctionné. Le SMV existe en huit régiments en France. L'histoire n'est pas terminée. Elle recommence."
  }
];

export const endingById = (id: string) => ENDINGS.find((e) => e.id === id);
