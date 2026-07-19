/* ============================================================
   Bapotique — Navigation & thème partagés (common.js)
   Vanilla JS, sans framework, compatible GitHub Pages statique
   ============================================================ */

(function () {
  'use strict';

  /* ── Initialisation immédiate du thème (évite le flash au chargement) ── */
  try {
    var _t = localStorage.getItem('bap_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', _t);
  } catch (e) { /* localStorage indisponible */ }

  /* ── Éléments fantômes pour rétrocompatibilité ──
     Créés IMMÉDIATEMENT pour que les scripts inline de la page
     ne lèvent pas d'erreur sur getElementById() — avant DOMContentLoaded */
  var COMPAT_IDS = ['themeBtn', 'theme-btn', 'btn-theme', 'theme-toggle', 'thbtn'];
  COMPAT_IDS.forEach(function (id) {
    if (!document.getElementById(id)) {
      var ghost = document.createElement('span');
      ghost.id = id;
      ghost.setAttribute('aria-hidden', 'true');
      ghost.style.cssText = 'display:none!important;position:absolute;pointer-events:none;';
      document.body.appendChild(ghost);
    }
  });

  /* ── Liens de navigation ── */
  var BAP_PAGES = [
    { label: 'Accueil',         href: 'index.html' },
    { label: 'Révision',        href: 'revision_complet.html' },
    { label: 'Polycopié cours', href: 'polycop_cours.html' },
    { label: 'Polycopié TP',    href: 'polycop_tp.html' },
    { label: 'Flashcards',      href: 'flashcards.html' },
    { label: 'Entraînement',    href: 'entrainement.html' },
    { label: 'Examen',          href: 'examen.html' },
    { label: 'Ressources',      href: 'ressources.html' },
    { label: 'Tests',           href: 'tests.html' },
    { label: 'Recherche',       href: 'search.html' },
    { label: 'Progression',     href: 'stats.html' },
  ];

  /* ── Thème ── */

  function bapGetTheme() {
    try { return localStorage.getItem('bap_theme') || 'dark'; } catch (e) { return 'dark'; }
  }

  function bapApplyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('bap_theme', theme); } catch (e) {}
  }

  function bapToggleTheme() {
    bapApplyTheme(bapGetTheme() === 'light' ? 'dark' : 'light');
  }

  /* ── Hamburger mobile ── */

  function bapToggleMenu() {
    var links = document.getElementById('bap-nav-links');
    if (links) links.classList.toggle('bap-open');
  }

  /* ── Injection de la navbar ── */

  function bapInitNav() {
    var container = document.getElementById('bap-nav');
    if (!container) return;

    var current = location.pathname.split('/').pop() || 'index.html';

    var linksHTML = BAP_PAGES.map(function (p) {
      var cls = p.href === current ? ' class="bap-nav-active"' : '';
      return '<a href="' + p.href + '"' + cls + '>' + p.label + '</a>';
    }).join('');

    container.innerHTML =
      '<nav class="bap-navbar">' +
        '<a class="bap-nav-brand" href="index.html">Linguistique Fr.</a>' +
        '<div class="bap-nav-links" id="bap-nav-links">' + linksHTML + '</div>' +
        '<button class="bap-nav-burger" id="bap-nav-burger" ' +
            'aria-label="Menu navigation" onclick="bapToggleMenu()">' +
          '<svg class="ic"><use href="#i-menu"/></svg>' +
        '</button>' +
        '<button class="bap-theme-btn" id="bap-theme-btn" ' +
            'onclick="bapToggleTheme()" title="Changer le thème">' +
          '<span class="bap-icon-moon"><svg class="ic"><use href="#i-moon"/></svg></span>' +
          '<span class="bap-icon-sun"><svg class="ic"><use href="#i-sun"/></svg></span>' +
        '</button>' +
      '</nav>';

    /* Appliquer le thème persisté (au cas où la page n'a pas de propre init) */
    bapApplyTheme(bapGetTheme());

    /* Fermer le drawer si clic ailleurs */
    document.addEventListener('click', function (e) {
      var burger = document.getElementById('bap-nav-burger');
      var links  = document.getElementById('bap-nav-links');
      if (!links || !burger) return;
      if (!links.contains(e.target) && !burger.contains(e.target)) {
        links.classList.remove('bap-open');
      }
    });

    /* Écraser le toggleTheme de la page (défini dans son <script>)
       par notre version unifiée — s'exécute après DOMContentLoaded,
       donc après les scripts inline de la page */
    window.toggleTheme = bapToggleTheme;
  }

  /* ── API publique ── */
  window.bapToggleTheme = bapToggleTheme;
  window.bapToggleMenu  = bapToggleMenu;
  window.bapInitNav     = bapInitNav;

  document.addEventListener('DOMContentLoaded', bapInitNav);

})();
