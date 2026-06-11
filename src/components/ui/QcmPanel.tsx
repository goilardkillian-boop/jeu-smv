import { useMemo, useState } from 'react';
import type { QcmRef } from '../../engine/types';
import { QCM_POOLS } from '../../data/questions';
import { drawQuestions } from '../../engine/diceSystem';
import { PixelButton } from './PixelButton';

interface Props {
  qcm: QcmRef;
  bonus?: number; // bonus de réussite (objets, traits) : tolérance ajoutée
  onFinish: (passed: boolean, perfect: boolean) => void;
}

export function QcmPanel({ qcm, onFinish }: Props) {
  const questions = useMemo(() => drawQuestions(QCM_POOLS[qcm.pool] ?? [], qcm.draw), [qcm]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    onFinish(true, true);
    return null;
  }

  const q = questions[index];
  const answered = selected !== null;
  const correct = answered && selected === q.correct;

  const submit = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const ratio = score / questions.length;
    const passed = ratio >= qcm.passThreshold;
    return (
      <div className="pixel-panel p-5 text-center slide-up">
        <div className="font-title text-sm mb-3">{passed ? 'RÉUSSI' : 'INSUFFISANT'}</div>
        <p className="dialogue-text mb-4">
          {score} / {questions.length} bonnes réponses
        </p>
        <PixelButton variant={passed ? 'primary' : 'default'} onClick={() => onFinish(passed, score === questions.length)}>
          CONTINUER
        </PixelButton>
      </div>
    );
  }

  return (
    <div className="pixel-panel p-4 slide-up">
      <div className="flex justify-between font-ui text-[10px] uppercase mb-2 opacity-70">
        <span>Question {index + 1} / {questions.length}</span>
        <span>Score : {score}</span>
      </div>
      <p className="dialogue-text mb-3">{q.question}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          let cls = 'choice-btn w-full';
          if (answered && i === q.correct) cls += ' !bg-smv-green !border-smv-green-light';
          else if (answered && i === selected) cls += ' !bg-smv-red !border-smv-red';
          else if (answered) cls += ' opacity-50';
          return (
            <button key={i} className={cls} onClick={() => submit(i)} disabled={answered}>
              <span className="choice-key">{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-3 flex items-start justify-between gap-3">
          <p className="text-sm opacity-80 italic">
            {correct ? '✓ Correct.' : '✗ Raté.'} {q.explanation ?? ''}
          </p>
          <PixelButton variant="primary" onClick={next}>
            {index + 1 < questions.length ? 'SUIVANT' : 'RÉSULTAT'}
          </PixelButton>
        </div>
      )}
    </div>
  );
}
