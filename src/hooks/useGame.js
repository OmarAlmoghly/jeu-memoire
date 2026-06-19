import { useState, useEffect, useCallback, useRef } from 'react';
import { LEVELS } from '../data/themes.js';
import { buildDeck } from '../utils/deck.js';

export function useGame(level, theme) {
  const levelInfo = LEVELS[level];
  const totalPairs = (levelInfo.cols * levelInfo.rows) / 2;

  const [cards, setCards] = useState(() => buildDeck(level, theme));
  const [selected, setSelected] = useState([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [feedback, setFeedback] = useState({ text: '', cls: '' });
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleCardClick = useCallback(
    (uid) => {
      if (locked) return;
      setCards((prev) => {
        const card = prev.find((c) => c.uid === uid);
        if (!card || card.flipped || card.matched) return prev;
        return prev.map((c) => (c.uid === uid ? { ...c, flipped: true } : c));
      });
      setSelected((prev) => [...prev, uid]);
    },
    [locked]
  );

  useEffect(() => {
    if (selected.length !== 2) return;
    setLocked(true);
    setMoves((m) => m + 1);
    const [u1, u2] = selected;
    const c1 = cards.find((c) => c.uid === u1);
    const c2 = cards.find((c) => c.uid === u2);

    if (c1 && c2 && c1.emoji === c2.emoji) {
      const t = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.uid === u1 || c.uid === u2 ? { ...c, matched: true } : c))
        );
        setMatchedPairs((p) => p + 1);
        setFeedback({ text: 'Paire trouvée !', cls: 'ok' });
        setSelected([]);
        setLocked(false);
      }, 350);
      return () => clearTimeout(t);
    } else {
      setFeedback({ text: 'Pas une paire...', cls: 'no' });
      const t = setTimeout(() => {
        setCards((prev) =>
          prev.map((c) => (c.uid === u1 || c.uid === u2 ? { ...c, flipped: false } : c))
        );
        setSelected([]);
        setLocked(false);
        setFeedback({ text: '', cls: '' });
      }, 800);
      return () => clearTimeout(t);
    }
  }, [selected]);

  useEffect(() => {
    if (matchedPairs === totalPairs) {
      clearInterval(timerRef.current);
      setFinished(true);
    }
  }, [matchedPairs, totalPairs]);

  const score = Math.max(100, 1000 - moves * 12 - seconds * 4);

  return {
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
  };
}
