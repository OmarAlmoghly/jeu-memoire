import React from 'react';

export default function Card({ card, onClick }) {
  const stateClass = card.matched ? 'matched' : card.flipped ? 'flipped' : '';
  return (
    <div className={`card ${stateClass}`} onClick={() => onClick(card.uid)}>
      <span className="face">{card.emoji}</span>
    </div>
  );
}
