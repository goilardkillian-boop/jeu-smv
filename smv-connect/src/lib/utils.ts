/** Petits utilitaires transverses (formatage, dates, CSV…). */

/** Concatène des classes CSS en ignorant les valeurs falsy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** « 2026-06-11 » → « 11 juin 2026 » */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Âge révolu à aujourd'hui pour une date de naissance ISO (AAAA-MM-JJ). */
export function calculerAge(dateNaissance: string): number | null {
  const naissance = new Date(dateNaissance);
  if (Number.isNaN(naissance.getTime())) return null;
  const aujourdHui = new Date();
  let age = aujourdHui.getFullYear() - naissance.getFullYear();
  const moisDiff = aujourdHui.getMonth() - naissance.getMonth();
  if (moisDiff < 0 || (moisDiff === 0 && aujourdHui.getDate() < naissance.getDate())) {
    age -= 1;
  }
  return age;
}

const MOIS_FRANCAIS: Record<string, number> = {
  janvier: 0, 'janv.': 0, janv: 0,
  février: 1, fevrier: 1, 'févr.': 1, fevr: 1, 'fév.': 1,
  mars: 2,
  avril: 3, 'avr.': 3, avr: 3,
  mai: 4,
  juin: 5,
  juillet: 6, 'juil.': 6, juil: 6,
  août: 7, aout: 7,
  septembre: 8, 'sept.': 8, sept: 8,
  octobre: 9, 'oct.': 9, oct: 9,
  novembre: 10, 'nov.': 10, nov: 10,
  décembre: 11, decembre: 11, 'déc.': 11, dec: 11,
};

/** Parse une date française libre type « 29 juin 2026 » ou « 7 sept. 2026 ». */
export function parseDateFrancaise(texte: string): Date | null {
  const morceaux = texte.trim().toLowerCase().split(/\s+/);
  if (morceaux.length < 3) return null;
  const jour = Number.parseInt(morceaux[0] ?? '', 10);
  const mois = MOIS_FRANCAIS[morceaux[1] ?? ''];
  const annee = Number.parseInt(morceaux[2] ?? '', 10);
  if (Number.isNaN(jour) || mois === undefined || Number.isNaN(annee)) return null;
  const date = new Date(annee, mois, jour);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Prochaine date d'incorporation (>= aujourd'hui) parmi une liste libre. */
export function prochaineIncorporation(
  dates: string[] | null,
): { date: Date; label: string } | null {
  if (!dates || dates.length === 0) return null;
  const aujourdHui = new Date();
  aujourdHui.setHours(0, 0, 0, 0);
  const futures = dates
    .map((label) => ({ label, date: parseDateFrancaise(label) }))
    .filter((d): d is { label: string; date: Date } => d.date !== null && d.date >= aujourdHui)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return futures[0] ?? null;
}

/** Formate un numéro français en groupes de deux chiffres pendant la saisie. */
export function masquerTelephone(saisie: string): string {
  const chiffres = saisie.replace(/\D/g, '').slice(0, 10);
  return chiffres.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
}

/** « 05 16 49 34 46 » → « tel:+33516493446 » */
export function telHref(telephone: string): string {
  const chiffres = telephone.replace(/\D/g, '');
  return chiffres.startsWith('0') ? `tel:+33${chiffres.slice(1)}` : `tel:${chiffres}`;
}

/** Slug URL-safe à partir d'un libellé. */
export function slugify(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Identifiant court pseudo-aléatoire (mode démo, sans crypto fort). */
export function idAleatoire(): string {
  return crypto.randomUUID();
}

/** Numéro de dossier lisible : SMV-2026-A1B2C3. */
export function genererNumeroDossier(): string {
  const annee = new Date().getFullYear();
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';
  let suffixe = '';
  const aleas = crypto.getRandomValues(new Uint32Array(6));
  for (const alea of aleas) {
    suffixe += alphabet[alea % alphabet.length];
  }
  return `SMV-${annee}-${suffixe}`;
}

/** Tronque proprement un texte à `max` caractères (coupe au mot). */
export function tronquer(texte: string, max: number): string {
  if (texte.length <= max) return texte;
  const coupe = texte.slice(0, max);
  const dernierEspace = coupe.lastIndexOf(' ');
  return `${coupe.slice(0, dernierEspace > max * 0.6 ? dernierEspace : max)}…`;
}

/** Échappe une valeur pour un CSV (séparateur « ; », convention française). */
function csvCellule(valeur: string | number | boolean | null | undefined): string {
  if (valeur === null || valeur === undefined) return '';
  const texte = String(valeur);
  return /[;"\n]/.test(texte) ? `"${texte.replace(/"/g, '""')}"` : texte;
}

/** Génère et télécharge un fichier CSV côté navigateur. */
export function telechargerCsv(
  nomFichier: string,
  entetes: string[],
  lignes: Array<Array<string | number | boolean | null | undefined>>,
): void {
  const contenu = [entetes, ...lignes]
    .map((ligne) => ligne.map(csvCellule).join(';'))
    .join('\r\n');
  // BOM UTF-8 pour une ouverture correcte dans Excel
  const blob = new Blob([`﻿${contenu}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement('a');
  lien.href = url;
  lien.download = nomFichier;
  lien.click();
  URL.revokeObjectURL(url);
}

/** Exécution différée avec annulation des appels intermédiaires. */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delaiMs: number,
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Args) => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delaiMs);
  };
}
