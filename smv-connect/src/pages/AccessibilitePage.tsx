import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Seo } from '../components/ui/Seo';

export default function AccessibilitePage() {
  return (
    <>
      <Seo titre="Accessibilité" cheminCanonique="/accessibilite" />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <Breadcrumb items={[{ label: 'Accessibilité' }]} />
        <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight text-smv-navy">
          Déclaration d'accessibilité
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-smv-gray-900">
          <p>
            SMV Connect vise la conformité au RGAA (Référentiel Général d'Amélioration de
            l'Accessibilité) et aux WCAG 2.1 niveau AA.
          </p>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">
              Mesures mises en œuvre
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-6">
              <li>Navigation entièrement utilisable au clavier, focus visible sur tous les éléments interactifs ;</li>
              <li>lien d'évitement « Aller au contenu principal » en tête de page ;</li>
              <li>contrastes de couleurs respectant un ratio minimum de 4,5:1 ;</li>
              <li>attributs ARIA sur les composants interactifs (menus, onglets, fenêtres modales) ;</li>
              <li>formulaires avec étiquettes associées et messages d'erreur annoncés (aria-live) ;</li>
              <li>alternatives textuelles sur les images porteuses d'information ;</li>
              <li>animations désactivées pour les personnes préférant les mouvements réduits.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold uppercase text-smv-navy">Retour d'information</h2>
            <p className="mt-2">
              Tu rencontres un obstacle d'accessibilité sur ce site ? Signale-le via la page{' '}
              <a href="/contact" className="underline">Contact</a> : nous corrigerons au plus vite.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
