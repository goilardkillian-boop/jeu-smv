import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Seo } from '../components/ui/Seo';

export default function RgpdPage() {
  return (
    <>
      <Seo titre="Protection des données (RGPD)" cheminCanonique="/rgpd" />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Breadcrumb items={[{ label: 'RGPD' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy">
          Protection des données
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-smv-gray-900">
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">
              Données collectées
            </h2>
            <p className="mt-2">
              Le formulaire de candidature collecte les données nécessaires au traitement de ta
              demande : identité, date de naissance, coordonnées, niveau d'études, projet de
              volontariat et message éventuel. Ces données sont transmises exclusivement au
              centre SMV que tu as choisi.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Finalité et durée</h2>
            <p className="mt-2">
              Tes données servent uniquement à l'étude de ta candidature et à la prise de contact
              par le recruteur. Elles sont conservées le temps du traitement de la candidature,
              puis supprimées au plus tard 24 mois après le dernier contact.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Tes droits</h2>
            <p className="mt-2">
              Conformément au RGPD et à la loi Informatique et Libertés, tu disposes d'un droit
              d'accès, de rectification, d'effacement et d'opposition sur tes données. Pour
              l'exercer, contacte le centre SMV destinataire de ta candidature (coordonnées sur
              la page <a href="/centres" className="underline">Nos centres</a>) en joignant la
              référence de ton dossier.
            </p>
          </section>
          <section id="cookies">
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Cookies</h2>
            <p className="mt-2">
              SMV Connect n'utilise aucun cookie publicitaire ni traceur d'audience. Seuls des
              stockages techniques (sessionStorage / localStorage) sont utilisés pour sauvegarder
              ta progression de candidature et ta recherche de centre sur ton propre appareil.
              Les vidéos YouTube sont intégrées via youtube-nocookie.com.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
