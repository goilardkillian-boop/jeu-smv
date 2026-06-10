import { useEffect, useState } from 'react';
import { useGameStore } from './stores/gameStore';
import { TitleScreen } from './components/screens/TitleScreen';
import { CharacterCreation } from './components/screens/CharacterCreation';
import { GameScreen } from './components/screens/GameScreen';
import { EndScreen } from './components/screens/EndScreen';
import { CRTOverlay } from './components/effects/CRTOverlay';
import { MusicWidget } from './components/ui/MusicWidget';

export default function App() {
  const screen = useGameStore((s) => s.screen);
  const backToTitle = useGameStore((s) => s.backToTitle);
  const [creating, setCreating] = useState(false);
  const [crt] = useState(false);

  // Une partie démarrée ferme l'écran de création
  useEffect(() => {
    if (screen === 'game') setCreating(false);
  }, [screen]);

  const replay = () => {
    backToTitle();
    setCreating(true);
  };

  return (
    <div className="w-full h-full">
      {screen === 'title' &&
        (creating ? <CharacterCreation onCancel={() => setCreating(false)} /> : <TitleScreen onNewGame={() => setCreating(true)} />)}
      {screen === 'game' && <GameScreen />}
      {screen === 'ending' && <EndScreen onReplay={replay} />}
      <MusicWidget />
      <CRTOverlay enabled={crt} />
    </div>
  );
}
