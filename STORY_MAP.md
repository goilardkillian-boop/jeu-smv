# STORY MAP — « Une vie à construire »

Graphe narratif : **142 nœuds**. Les IDs ci-dessous correspondent aux nœuds de `src/data/story/`.
Légende : `→` suite directe · `⇒` choix · `◆` QCM · `★` condition · `[F]` flag posé.

## PROLOGUE — La vie d'avant (`prologue.ts`)

```
p_intro → p_sms
p_sms ⇒ OUI ────────────────→ p_ml_intro
      ⇒ réfléchir ──────────→ p_hesitation → p_ml_intro
      ⇒ NON ────────────────→ p_non ⇒ (oui tardif | hésitation)
p_ml_intro → p_ml_dialogue1 ⇒ (3 réponses) → p_ml_explication
p_ml_explication ⇒ permis | cadre | sais pas | sortie  [F dit_*]
p_ml_fin → p_convocation → p_veille (texte selon background) → p_bus → p_grille
p_grille ⇒ franchir ────────→ c1_incorporation
         ⇒ demi-tour ───────→ p_demi_tour ⇒ entrer avec Dimitri [F entre_avec_dimitri]
                                          ⇒ partir → ending_trop_tot (FIN 10)
```

## CHAPITRE 1 — L'Arrivée, semaine 1 (`chapter1_arrivee.ts`)

```
c1_incorporation [M01, 🏅 premier_pas] → c1_paquetage
c1_paquetage ⇒ clair [M02] | demander pliage | remarque insolente
c1_chambree → c1_premier_contact ⇒ aider Thomas | vanner Dimitri | tenter Rachid | ranger
c1_rassemblement [M01 done] → c1_ferreira_discours
  ★ autorité opposition/contestataire → c1_noah_reaction ⇒ baisser les yeux | soutenir le regard
c1_refectoire ⇒ table groupe | table seul | table Inès [F ines_premier_contact]
c1_premiere_nuit ⇒ dormir | pourquoi je suis là (texte selon envies) | ★ chuchoter à Rachid
c1_reveil → c2_intro
```

## CHAPITRE 2 — La FMI, semaines 2-3 (`chapter2_fmi.ts`)

```
c2_intro → c2_humeur (système d'humeur quotidienne) → c2_parcours_intro
c2_parcours_epreuve ⇒ aider Thomas [S01, F aide_thomas_parcours]
                    ⇒ son rythme
                    ⇒ ★ Endurance ≥ 4 : sprint [F parcours_premier]
c2_noeuds_cours ⇒ réviser seul | réviser avec Kevin [F kevin_revision] | pas réviser
c2_qcm_noeuds ◆ pool noeuds (4 tirées, seuil 75%) → c2_noeuds_ok | c2_noeuds_fail [M05]
c2_thomas_crise (choix sous pression 8 s)
  ⇒ le retenir → c2_thomas_reste [F thomas_sauve_crise]
  ⇒ ★ rel Dimitri ≥ 15 : renfort Dimitri
  ⇒ encourager le départ → c2_thomas_part_prep [F thomas_parti, 📦 lettre_thomas]
c2_zone_fumeur ⇒ écouter (rumeurs) | vanner Enzo | partir
c2_rumeur [F enzo_alcool_suspecte] → c2_fouille_choix ⇒ fouiller | passer
c2_fouille (pression) ⇒ reposer [F enzo_couvert] | prendre [📦 bouteille_enzo]
c2_enzo_dilemme ⇒ dénoncer [🏅 informateur, S08] | rendre+parler [🏅 bouclier] | vider
c2_bivouac_intro → c2_topo ⇒ ★ Intel ≥ 3 : azimut | demander à Inès [S02] | couper à travers
c2_feu_camp (★ thomas_parti → variante) → c2_nuit_karola [M04, 🏅 nuit_karola] → c3_intro
```

## CHAPITRE 3 — Le calot, semaines 4-5 (`chapter3_formation.ts`)

```
c3_toc_cours ⇒ répéter seul | répéter avec Dimitri | rien
c3_toc_qcm ◆ pool protocole (5, seuil 80%) → ok/fail [M06]
c3_sara_conflit ⇒ ne pas bouger | ★ diplomate/médiateur/socia ≥ 4 : désamorcer | appuyer Sara
c3_appel_famille ⇒ appeler [F appel_avant_marche] | après la marche | journal
c3_marche_depart (20 km) ⇒ porter le sac d'un camarade [🏅 solidaire]
                          ⇒ ★ rel Inès ≥ 20 : marcher avec elle
                          ⇒ ★ Endurance ≥ 4 : finir devant [🏅 sprinter]
                          ⇒ survivre
c3_ceremonie (★ appel_avant_marche → famille présente [🏅 calot_famille])
c3_ceremonie_calot [M07+M08, 📦 calot+insigne] (mot de Ferreira selon la marche)
c3_filiere_intro/suite ⇒ 8 filières [F filiere_*, M09] → c4_intro
```

## CHAPITRE 4 — Les épreuves, semaines 6-7 (`chapter4_epreuves.ts`)

```
c4_exam_intro ⇒ réviser seul | révision de groupe | repos
c4_exam_qcm ◆ pool logique (4, 70%) → ok/fail [M10]
c4_code_intro ⇒ bachoter [📦 livre_code] | ★ kevin_revision : réviser avec Kevin | rien
c4_code_qcm ◆ pool code_route (5, 80%) → ok [M11, F permis_ok, 📦 attestation] | fail
c4_mission_citoyenne ⇒ ★ créatif/artiste : fresque [M12, 🏅 artiste_terrain]
                      ⇒ ★ leader/équipe ≥ 20 : coordination
                      ⇒ travailler sans bruit
c4_dimitri_crise ⇒ ★ rel ≥ 35 : s'asseoir, attendre → c4_dimitri_revelation [🏅 frere_soeur]
                 ⇒ humour → confidence partielle
                 ⇒ ignorer [F dimitri_ignore_crise]
c4_fin_semaine → c5_intro
```

## CHAPITRE 5 — L'insertion, semaines 8-10 (`chapter5_insertion.ts`)

```
c5_premier_jour (texte selon filière) [M13] → c5_routine → c5_incident
c5_incident (pression, variante par filière)
  ⇒ assumer [F incident_assume, F tuteur_impressionne]
  ⇒ ★ Débrouillardise ≥ 4 : agir d'abord [F incident_resolu]
  ⇒ laisser passer [F incident_fui]
c5_bilan ⇒ signer [F veut_signer] | projet perso [F has_project] | chercher encore
c5_dernier_soir (★ rel Dimitri ≥ 60 + révélation → c5_dimitri_adieu)
compute_ending → ENDING_DISPATCH (calcul de la fin, voir ci-dessous)
```

## SCÈNES SYSTÈME (`sidescenes.ts`)

Déclenchées par le moteur, retour au nœud interrompu via `RETURN` :

- **Convocation** (`convocation_*`) : une jauge ≤ 15 (hors Moral). 4 réponses possibles dont
  « promettre sans le penser » (répercussion différée) et demande d'aide.
- **Assistante sociale** (`claire_*`) : Moral ≤ 15 ou demande volontaire. [F claire_vue]
- **Abandon** (`abandon_confirm`) : depuis le menu → `ENDING_ABANDON`.

## DISPATCH DES FINS (`gameEngine.computeEnding`)

Ordre de priorité :

| # | Fin | Conditions |
|---|-----|-----------|
| — | La graine plantée (variante rebelle) | trait Rebelle + appui public de Sara |
| 4 | Ce que Ferreira t'a dit | rel Ferreira > 80, Rigueur > 65 |
| 11 | La solitude choisie | toutes relations < 30, contrat, Rigueur > 50 |
| 2 | Le leader reconnu | Équipe > 80, recommandation, rel Ferreira > 75 |
| 3 | Ensemble jusqu'au bout | toutes relations > 50, Équipe > 85 |
| 5 | Retour transformé | permis_ok + contrat + Moral > 70 |
| 8 | Prendre soin de soi | claire_vue + Moral remonté > 50 (sinon fin 1 si jauges OK) |
| 7 | La graine plantée | has_project |
| 1 | Une nouvelle vie | Motivation > 65, Équipe > 60, Rigueur > 55, contrat |
| 6 | Ce n'était pas la fin | Motivation > 45 |
| 12 | Recommencer autrement | défaut |

Abandon en cours (`computeAbandonEnding`) : semaine ≤ 2 → **10. Trop tôt** ; has_project →
**7. La graine plantée** ; Motivation > 50 → **9. Un autre chemin** ; sinon **12**.
La fin 10 est aussi atteignable directement au prologue (`p_demi_tour`).
