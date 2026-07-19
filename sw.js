// Service Worker — Bapotique PWA
const CACHE = 'bap-v31';
const ASSETS = [
  './',
  './flashcards.html',
  './entrainement.html',
  './entrainement_all.html',
  './all_cards.html',
  './polycop_cours.html',
  './polycop_tp.html',
  './revision_complet.html',
  './ressources.html',
  './stats.html',
  './examen.html',
  './search.html',
  './tests.html',
  './cahier_vacances.html',
  './flashcards_print.html',
  './notes.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const path = url.pathname;

  // HTML + JS + CSS : network-first (version fraîche quand réseau dispo)
  if (path.endsWith('.html') || path.endsWith('.js') || path.endsWith('.css') ||
      path === '/' || path.endsWith('/')) {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (!resp || resp.status !== 200 || resp.type !== 'basic') return resp;
        caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        return resp;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Images, manifest : cache-first (économise la bande passante)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (!resp || resp.status !== 200 || resp.type !== 'basic') return resp;
        caches.open(CACHE).then(c => c.put(e.request, resp.clone()));
        return resp;
      });
    })
  );
});
