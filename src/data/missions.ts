export interface Mission {
  id: string;
  name: string;
  chapter: number;
  type: 'principale' | 'secondaire' | 'cachee';
  description: string;
  /** flag posé quand la mission est accomplie */
  doneFlag: string;
}

export const MISSIONS: Mission[] = [
  { id: 'M01', name: 'Premier rassemblement', chapter: 1, type: 'principale', description: 'Être présent et à l\'heure au premier rassemblement.', doneFlag: 'm01_done' },
  { id: 'M02', name: 'Tenue réglementaire', chapter: 1, type: 'principale', description: 'Percevoir et porter correctement le treillis F3.', doneFlag: 'm02_done' },
  { id: 'M03', name: 'Parcours boue', chapter: 2, type: 'principale', description: 'Terminer le parcours d\'aguerrissement.', doneFlag: 'm03_done' },
  { id: 'M04', name: 'Bivouac Karola', chapter: 2, type: 'principale', description: 'Passer la nuit sur le terrain.', doneFlag: 'm04_done' },
  { id: 'M05', name: 'QCM nœuds', chapter: 2, type: 'principale', description: 'Valider le test des nœuds militaires.', doneFlag: 'm05_done' },
  { id: 'M06', name: 'Protocole TOC TOC', chapter: 3, type: 'principale', description: 'Maîtriser l\'entrée réglementaire au bureau.', doneFlag: 'm06_done' },
  { id: 'M07', name: 'Marche au Calot', chapter: 3, type: 'principale', description: '20 km. Le calot se mérite.', doneFlag: 'm07_done' },
  { id: 'M08', name: 'Cérémonie du calot', chapter: 3, type: 'principale', description: 'Recevoir son calot devant la section.', doneFlag: 'm08_done' },
  { id: 'M09', name: 'Choix de filière', chapter: 3, type: 'principale', description: 'Choisir sa formation professionnelle.', doneFlag: 'm09_done' },
  { id: 'M10', name: 'Examen de filière', chapter: 4, type: 'principale', description: 'Valider la théorie de sa filière.', doneFlag: 'm10_done' },
  { id: 'M11', name: 'Code de la route', chapter: 4, type: 'principale', description: 'Réussir l\'examen du code.', doneFlag: 'm11_done' },
  { id: 'M12', name: 'Mission citoyenne', chapter: 4, type: 'principale', description: 'Servir, concrètement, en ville.', doneFlag: 'm12_done' },
  { id: 'M13', name: 'Premier jour de stage', chapter: 5, type: 'principale', description: 'Entrer dans le monde du travail.', doneFlag: 'm13_done' },
  { id: 'M14', name: 'Incident pro', chapter: 5, type: 'principale', description: 'Gérer l\'imprévu en stage.', doneFlag: 'm14_done' },
  { id: 'M15', name: 'Bilan final Moreau', chapter: 5, type: 'principale', description: 'Le rendez-vous qui décide de la suite.', doneFlag: 'm15_done' },
  // Secondaires
  { id: 'S01', name: 'Aider Thomas', chapter: 2, type: 'secondaire', description: 'Thomas est au bord. Tu peux quelque chose.', doneFlag: 's01_done' },
  { id: 'S02', name: 'Parler à Inès', chapter: 2, type: 'secondaire', description: 'Elle dit qu\'elle va partir. Elle n\'en est pas sûre.', doneFlag: 's02_done' },
  { id: 'S03', name: "L'armure de Rachid", chapter: 3, type: 'secondaire', description: 'Il ne parle à personne. Patience.', doneFlag: 's03_done' },
  { id: 'S04', name: 'Les carnets de Léa', chapter: 3, type: 'secondaire', description: 'Elle dessine en permanence. Quoi ?', doneFlag: 's04_done' },
  { id: 'S05', name: 'Café de Momo', chapter: 1, type: 'secondaire', description: 'Un extra à la cantine n\'est jamais anodin.', doneFlag: 's05_done' },
  { id: 'S06', name: 'Soutenir Dimitri', chapter: 4, type: 'secondaire', description: 'Le plus drôle de la section ne rit plus.', doneFlag: 's06_done' },
  { id: 'S08', name: 'Le dilemme Enzo', chapter: 2, type: 'secondaire', description: 'Tu as trouvé quelque chose. À toi de voir.', doneFlag: 's08_done' },
  { id: 'S11', name: 'Lettre à la famille', chapter: 2, type: 'secondaire', description: 'Écrire. Vraiment écrire.', doneFlag: 's11_done' }
];
