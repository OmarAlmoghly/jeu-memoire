import React, { useState } from 'react';
import { LEVELS, THEMES } from '../data/themes.js';

export default function GameConfig({ onStart }) {
  const [level, setLevel] = useState('debutant');
  const [theme, setTheme] = useState('animaux');

  return (
    <div className="panel">
      <div className="label">Niveau de difficulté</div>
      <div className="opt-row">
        {Object.entries(LEVELS).map(([key, v]) => (
          <div
            key={key}
            className={`opt ${level === key ? 'active' : ''}`}
            onClick={() => setLevel(key)}
          >
            {v.label}
            <br />
            <span style={{ fontSize: '.72rem' }}>{v.name}</span>
          </div>
        ))}
      </div>

      <div className="label">Thème des cartes</div>
      <div className="opt-row">
        {Object.entries(THEMES).map(([key, v]) => (
          <div
            key={key}
            className={`opt ${theme === key ? 'active' : ''}`}
            onClick={() => setTheme(key)}
          >
            <span className="theme-emoji">
              {v.emojis[0]} {v.emojis[1]}
            </span>
            <br />
            {v.label}
          </div>
        ))}
      </div>

      <button className="start-btn" onClick={() => onStart(level, theme)}>
        Commencer la partie
      </button>
    </div>
  );
}
