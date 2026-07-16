# bapotique — Instructions Claude

## Workflow Git

- Toujours déployer directement sur `main` (pas de branche intermédiaire, pas de PR nécessaire sauf instruction contraire).
- Quand le travail sur une branche est terminé, créer une PR vers `main` et la merger immédiatement, sans demander confirmation.
- Toujours pousser sur la branche de développement désignée avant de merger.

## Point d'entrée utilisateur

- L'utilisatrice ouvre systématiquement **`index.html`** comme point d'entrée.
- À chaque modification visuelle sur n'importe quelle page, **toujours mettre à jour `index.html`** en conséquence (lien, badge, ou changement visuel cohérent).
- Après chaque push, vérifier que `index.html` reflète bien l'état actuel du site.

## Design système

- Toutes les pages doivent utiliser le même design glassmorphism sombre :
  - Polices : **DM Sans** (corps) + **DM Serif Display** (titres/questions)
  - Palette sombre chaude : `--bg:#13111a`, verre `rgba(255,255,255,0.06)`, `backdrop-filter:blur()`
  - Blobs ambiants via `body::before` (radial-gradient, `position:fixed`, `z-index:0`)
  - Lignes de réflexion `::before` sur les cartes glass
  - Accents par section (lavande, menthe, pêche, ciel, rose, beurre, sauge)
- Quand on restyle une page, appliquer le même design à **toutes** les pages du site.

## Cache-busting GitHub Pages

- Ajouter systématiquement dans le `<head>` de chaque page HTML :
  ```html
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <script>(function(){if(!location.search.includes('v='))location.replace(location.pathname+'?v=YYYYMMDD');}());</script>
  ```
  avec la date du jour comme valeur de `v=`.
