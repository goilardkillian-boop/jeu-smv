import { Fragment, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Gras `**texte**` uniquement (pas de HTML brut → pas d'injection). */
function rendreInline(texte: string): ReactNode[] {
  const morceaux = texte.split(/(\*\*[^*]+\*\*)/g);
  return morceaux.map((morceau, i) =>
    morceau.startsWith('**') && morceau.endsWith('**') ? (
      <strong key={i}>{morceau.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{morceau}</Fragment>
    ),
  );
}

export interface SimpleMarkdownProps {
  texte: string;
  className?: string;
}

/**
 * Rendu markdown minimaliste et sûr : paragraphes (lignes vides),
 * listes à puces (`- `), sous-titres (`## `) et gras (`**`).
 */
export function SimpleMarkdown({ texte, className }: SimpleMarkdownProps) {
  const blocs = texte.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className={cn('space-y-4 leading-relaxed text-smv-gray-900', className)}>
      {blocs.map((bloc, index) => {
        if (bloc.startsWith('## ')) {
          return (
            <h3 key={index} className="pt-2 font-display text-2xl font-bold uppercase text-smv-navy">
              {rendreInline(bloc.slice(3))}
            </h3>
          );
        }
        const lignes = bloc.split('\n');
        const estListe = lignes.every((l) => l.trim().startsWith('- '));
        if (estListe) {
          return (
            <ul key={index} className="list-disc space-y-1.5 pl-6">
              {lignes.map((ligne, i) => (
                <li key={i}>{rendreInline(ligne.trim().slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{rendreInline(bloc.replace(/\n/g, ' '))}</p>;
      })}
    </div>
  );
}
