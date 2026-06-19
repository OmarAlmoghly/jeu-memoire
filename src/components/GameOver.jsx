import React from 'react';

export default function GameOver({ result, onReplay, onConfig }) {
  const abandoned = result === null;

  return (
    <div className="panel end">
      <div className="trophy">{abandoned ? '🏃' : '🏆'}</div>
      <h2>{abandoned ? 'Partie abandonnée' : 'Bravo, partie terminée !'}</h2>
      {!abandoned && (
        <p>
          {result.score} points · {result.moves} coups ·{' '}
          {String(Math.floor(result.seconds / 60)).padStart(2, '0')}:
          {String(result.seconds % 60).padStart(2, '0')}
        </p>
      )}
      <div className="btns">
        <button className="primary" onClick={onReplay}>
          Rejouer
        </button>
        <button onClick={onConfig}>Changer le niveau</button>
      </div>
    </div>
  );
}
