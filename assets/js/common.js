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

    /* Injecter le fil d'Ariane après #bap-nav */
    var bc = document.getElementById('bap-breadcrumb');
    if (!bc) {
      bc = document.createElement('div');
      bc.id = 'bap-breadcrumb';
      container.parentNode.insertBefore(bc, container.nextSibling);
    }
    _bcEl = bc;
    bapBreadcrumbReset();
  }

  /* ── Fil d'Ariane (breadcrumb) ── */

  var _bcCrumbs = [];
  var _bcEl = null;

  function bapBreadcrumbRender() {
    if (!_bcEl) return;
    /* Masquer sur accueil ou si un seul niveau */
    if (_bcCrumbs.length <= 1) { _bcEl.style.display = 'none'; return; }
    _bcEl.style.display = '';
    var html = '<nav class="bap-bc" aria-label="Fil d\'Ariane"><ol class="bap-bc-list">';
    for (var i = 0; i < _bcCrumbs.length; i++) {
      var c = _bcCrumbs[i];
      var isLast = i === _bcCrumbs.length - 1;
      if (isLast) {
        html += '<li class="bap-bc-item bap-bc-current">' + c.label + '</li>';
      } else {
        html += '<li class="bap-bc-item"><a href="' + c.href + '">' + c.label + '</a>' +
                '<span class="bap-bc-sep" aria-hidden="true">›</span></li>';
      }
    }
    html += '</ol></nav>';
    _bcEl.innerHTML = html;
  }

  function bapBreadcrumbReset() {
    var current = location.pathname.split('/').pop() || 'index.html';
    _bcCrumbs = [{ label: 'Accueil', href: 'index.html' }];
    if (current !== 'index.html' && current !== '') {
      var i, page = null;
      for (i = 0; i < BAP_PAGES.length; i++) {
        if (BAP_PAGES[i].href === current) { page = BAP_PAGES[i]; break; }
      }
      if (page) _bcCrumbs.push({ label: page.label, href: page.href });
    }
    bapBreadcrumbRender();
  }

  function bapBreadcrumbPush(label, href) {
    /* Remplace à partir du 3e niveau (Accueil + Page + sous-niveaux dynamiques) */
    if (_bcCrumbs.length > 2) _bcCrumbs = _bcCrumbs.slice(0, 2);
    _bcCrumbs.push({ label: label, href: href || '#' });
    bapBreadcrumbRender();
  }

  function bapBreadcrumbPop() {
    if (_bcCrumbs.length > 2) _bcCrumbs.pop();
    bapBreadcrumbRender();
  }

  /* ── Sauvegarde de la dernière page visitée ──
     Écrit dans bap_last_page : { href, label, ts }
     Ignoré sur index.html (page d'accueil) */
  function bapSaveLastPage() {
    var current = location.pathname.split('/').pop() || 'index.html';
    if (current === 'index.html' || current === '') return;
    var i, page = null;
    for (i = 0; i < BAP_PAGES.length; i++) {
      if (BAP_PAGES[i].href === current) { page = BAP_PAGES[i]; break; }
    }
    if (!page) return;
    try {
      localStorage.setItem('bap_last_page', JSON.stringify({
        href: page.href,
        label: page.label,
        ts: new Date().getTime()
      }));
    } catch (e) {}
  }

  /* ── API publique ── */
  window.bapToggleTheme      = bapToggleTheme;
  window.bapToggleMenu       = bapToggleMenu;
  window.bapInitNav          = bapInitNav;
  window.bapSaveLastPage     = bapSaveLastPage;
  window.bapBreadcrumbReset  = bapBreadcrumbReset;
  window.bapBreadcrumbPush   = bapBreadcrumbPush;
  window.bapBreadcrumbPop    = bapBreadcrumbPop;

  document.addEventListener('DOMContentLoaded', function () {
    bapInitNav();
    bapSaveLastPage();
  });

})();
