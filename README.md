# Souvenirs — Jeu de mémoire

Projet React (Vite) pour le Devoir 3 — SEG3525, Université d'Ottawa.

## Structure du projet

```
memory-game-vite/
├── index.html                 ← point d'entrée HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                ← démarre l'app React
    ├── App.jsx                 ← composant racine (gère config/jeu/fin)
    ├── components/
    │   ├── Card.jsx             ← une carte individuelle
    │   ├── GameConfig.jsx       ← écran de configuration (niveau + thème)
    │   ├── GameBoard.jsx        ← grille de jeu + HUD (temps, coups, paires)
    │   └── GameOver.jsx         ← écran de fin de partie
    ├── hooks/
    │   └── useGame.js           ← logique du jeu (état, mélange, comparaisons)
    ├── data/
    │   └── themes.js            ← niveaux (Débutant/Moyen/Avancé) + thèmes (Animaux/Nature)
    ├── utils/
    │   └── deck.js              ← Fisher-Yates shuffle + construction du paquet
    └── styles/
        └── global.css           ← thème visuel (vert foncé / or, identique au portfolio)
```

## Comment exécuter en local (VS Code)

1. Ouvre ce dossier dans VS Code
2. Ouvre un terminal (Terminal → New Terminal)
3. Installe les dépendances :
   ```
   npm install
   ```
4. Lance le serveur de développement :
   ```
   npm run dev
   ```
5. Ouvre l'URL affichée (généralement `http://localhost:5173`)

## Comment générer la version finale pour l'hébergement

```
npm run build
```

Ceci génère un dossier `dist/` contenant les fichiers statiques (HTML/CSS/JS optimisés)
à uploader sur GitHub Pages, Netlify, ou Vercel.

## Intégration au portfolio

Une fois hébergé, remplace le bloc "À venir — Devoir 3" de ton portfolio par un lien
vers l'URL du jeu déployé (ex. `<a href="https://tonsite.github.io/memory-game/">Jouer</a>`).
