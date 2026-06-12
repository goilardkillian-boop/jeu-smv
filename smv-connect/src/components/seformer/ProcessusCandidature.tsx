import {
  CalendarCheck,
  ClipboardCheck,
  Compass,
  FileText,
  FolderSearch,
  MailCheck,
  MapPin,
  PenLine,
  type LucideIcon,
} from 'lucide-react';

interface Etape {
  icon: LucideIcon;
  titre: string;
  detail: string;
}

const ETAPES: Etape[] = [
  { icon: Compass, titre: 'Je découvre les métiers', detail: 'Parcours le catalogue des formations et repère les filières qui te plaisent.' },
  { icon: MapPin, titre: 'Je sélectionne le centre', detail: 'Choisis le centre SMV le plus proche ou celui qui propose ta formation.' },
  { icon: FileText, titre: 'Je remplis mon dossier', detail: 'Candidature en ligne en 4 étapes — moins de 5 minutes.' },
  { icon: FolderSearch, titre: 'Ma candidature est étudiée', detail: 'Le recruteur du centre examine ton dossier et te recontacte.' },
  { icon: CalendarCheck, titre: 'Entretien de présélection', detail: 'Tu es invité·e au centre pour un premier échange de motivation.' },
  { icon: ClipboardCheck, titre: '3 étapes de recrutement', detail: 'Visite médicale, tests GRI (évaluation du niveau) et entretien final.' },
  { icon: MailCheck, titre: 'Lettre de confirmation', detail: "Tu reçois ta date d'incorporation et la liste de tes affaires." },
  { icon: PenLine, titre: 'Signature du contrat', detail: 'Bienvenue au SMV : ton contrat de volontaire est signé le jour J.' },
];

/** Le processus de candidature SMV en 8 étapes illustrées (pages VS / VE). */
export function ProcessusCandidature() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ETAPES.map((etape, index) => (
        <li
          key={etape.titre}
          className="relative rounded-lg border border-smv-gray-100 bg-white p-5 shadow-sm"
        >
          <span
            aria-hidden="true"
            className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-smv-green font-display text-sm font-bold text-white"
          >
            {index + 1}
          </span>
          <etape.icon className="h-7 w-7 text-smv-navy" aria-hidden="true" />
          <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight text-smv-navy">
            {etape.titre}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-smv-gray-600">{etape.detail}</p>
        </li>
      ))}
    </ol>
  );
}
