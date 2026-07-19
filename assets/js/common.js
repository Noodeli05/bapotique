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

  /* ── Mode focus (plein écran sans distractions) ── */

  function bapToggleFocus() {
    var on = document.documentElement.classList.toggle('bap-focus');
    if (on) {
      var el = document.documentElement;
      var req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen;
      if (req) try { req.call(el); } catch (e) {}
    } else {
      var ex = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
      if (ex) try { ex.call(document); } catch (e) {}
    }
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
        '<button class="bap-focus-btn" id="bap-focus-btn" ' +
            'onclick="bapToggleFocus()" title="Mode focus (F)">' +
          '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>' +
            '<line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>' +
          '</svg>' +
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

    /* Bouton flottant pour quitter le mode focus */
    if (!document.getElementById('bap-focus-exit')) {
      var exitBtn = document.createElement('button');
      exitBtn.id = 'bap-focus-exit';
      exitBtn.className = 'bap-focus-exit';
      exitBtn.title = 'Quitter le mode focus (F)';
      exitBtn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/></svg>';
      exitBtn.addEventListener('click', bapToggleFocus);
      document.body.appendChild(exitBtn);
    }

    /* Injecter le fil d'Ariane comme enfant de #bap-nav
       (et non sibling dans le body — évite de perturber les layouts flex-row) */
    var bc = document.getElementById('bap-breadcrumb');
    if (!bc) {
      bc = document.createElement('div');
      bc.id = 'bap-breadcrumb';
      container.appendChild(bc);
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
  window.bapToggleFocus      = bapToggleFocus;
  window.bapInitNav          = bapInitNav;
  window.bapSaveLastPage     = bapSaveLastPage;
  window.bapBreadcrumbReset  = bapBreadcrumbReset;
  window.bapBreadcrumbPush   = bapBreadcrumbPush;
  window.bapBreadcrumbPop    = bapBreadcrumbPop;

  /* ── Barre de progression de lecture ── */

  function bapInitProgress() {
    var bar = document.createElement('div');
    bar.id = 'bap-progress-bar';
    bar.innerHTML = '<div class="bap-progress-fill"></div>';
    document.body.appendChild(bar);
    var fill = bar.querySelector('.bap-progress-fill');

    function getScroll() {
      var mainEl = document.getElementById('main');
      if (mainEl && mainEl.scrollHeight > mainEl.clientHeight + 5) {
        return { top: mainEl.scrollTop, max: mainEl.scrollHeight - mainEl.clientHeight };
      }
      var d = document.documentElement;
      return { top: window.pageYOffset || d.scrollTop || 0, max: d.scrollHeight - d.clientHeight };
    }

    function update() {
      var s = getScroll();
      var pct = s.max > 0 ? Math.min(1, s.top / s.max) : 0;
      fill.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
    }

    var mainEl = document.getElementById('main');
    if (mainEl) mainEl.addEventListener('scroll', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* Forcer la vérification de mise à jour du SW à chaque chargement */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg) reg.update();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bapInitNav();
    bapSaveLastPage();
    bapInitProgress();

    /* Raccourci clavier F — mode focus */
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'f' && e.key !== 'F') return;
      var tag = (document.activeElement && document.activeElement.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (document.activeElement && document.activeElement.isContentEditable) return;
      bapToggleFocus();
    });

    /* Synchroniser si l'utilisateur quitte le plein écran natif (Echap) */
    function _onFsChange() {
      var fs = document.fullscreenElement || document.webkitFullscreenElement;
      if (!fs && document.documentElement.classList.contains('bap-focus')) {
        document.documentElement.classList.remove('bap-focus');
      }
    }
    document.addEventListener('fullscreenchange', _onFsChange);
    document.addEventListener('webkitfullscreenchange', _onFsChange);
  });

})();
