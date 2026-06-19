import React from 'react';
import Card from './Card.jsx';
import { useGame } from '../hooks/useGame.js';

function formatTime(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export default function GameBoard({ level, theme, onFinish, onAbandon }) {
  const {
    cards,
    moves,
    matchedPairs,
    totalPairs,
    seconds,
    feedback,
    finished,
    score,
    handleCardClick,
    levelInfo,
  } = useGame(level, theme);

  React.useEffect(() => {
    if (finished) {
      const t = setTimeout(() => onFinish({ moves, seconds, score }), 500);
      return () => clearTimeout(t);
    }
  }, [finished]);

  return (
    <div className="panel">
      <div className="hud">
        <div className="hud-stat">
          <div className="num">{formatTime(seconds)}</div>
          <div className="lbl">Temps</div>
        </div>
        <div className="hud-stat">
          <div className="num">{moves}</div>
          <div className="lbl">Coups</div>
        </div>
        <div className="hud-stat">
          <div className="num">
            {matchedPairs}/{totalPairs}
          </div>
          <div className="lbl">Paires</div>
        </div>
        <button className="hud-btn" onClick={onAbandon}>
          Abandonner
        </button>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${levelInfo.cols}, 1fr)`,
          maxWidth: levelInfo.cols * 90,
        }}
      >
        {cards.map((card) => (
          <Card key={card.uid} card={card} onClick={handleCardClick} />
        ))}
      </div>

      <div className={`feedback ${feedback.cls}`}>{feedback.text}</div>
    </div>
  );
}
