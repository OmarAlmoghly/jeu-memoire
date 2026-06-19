import React, { useState } from 'react';
import GameConfig from './components/GameConfig.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameOver from './components/GameOver.jsx';

export default function App() {
  const [screen, setScreen] = useState('config');
  const [level, setLevel] = useState('debutant');
  const [theme, setTheme] = useState('animaux');
  const [result, setResult] = useState(null);

  const startGame = (l, t) => {
    setLevel(l);
    setTheme(t);
    setScreen('game');
  };

  const finishGame = (r) => {
    setResult(r);
    setScreen('end');
  };

  return (
    <div className="wrap">
      <div className="topbar">
        <span className="brand">Omar Almoghly</span>
        <a className="back" href="../index.html">
          ← Retour au portfolio
        </a>
      </div>

      <div className="eyebrow">Projet 02 · Devoir 3</div>
      <h1>
        Souvenirs <em>— jeu de mémoire</em>
      </h1>
      <p className="sub">
        Trouve les paires correspondantes avant la fin du temps. Choisis ton niveau et ton thème.
      </p>

      {screen === 'config' && <GameConfig onStart={startGame} />}

      {screen === 'game' && (
        <GameBoard
          level={level}
          theme={theme}
          onFinish={finishGame}
          onAbandon={() => finishGame(null)}
        />
      )}

      {screen === 'end' && (
        <GameOver
          result={result}
          onReplay={() => setScreen('game')}
          onConfig={() => setScreen('config')}
        />
      )}

      <footer>OMAR ALMOGHLY — SEG3525 · UNIVERSITÉ D'OTTAWA · 2026</footer>
    </div>
  );
}
