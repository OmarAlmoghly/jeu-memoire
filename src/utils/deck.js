import { LEVELS, THEMES } from '../data/themes.js';

export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildDeck(levelKey, themeKey) {
  const level = LEVELS[levelKey];
  const theme = THEMES[themeKey];
  const pairCount = (level.cols * level.rows) / 2;
  const chosen = theme.emojis.slice(0, pairCount);
  return shuffle([...chosen, ...chosen]).map((emoji, i) => ({
    uid: i,
    emoji,
    flipped: false,
    matched: false,
  }));
}
