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
    { label: 'Cartes mentales', href: 'carte_mentale.html' },
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
  window.bapToggleTheme         = bapToggleTheme;
  window.bapToggleMenu          = bapToggleMenu;
  window.bapToggleFocus         = bapToggleFocus;
  window.bapInitNav             = bapInitNav;
  window.bapSaveLastPage        = bapSaveLastPage;
  window.bapBreadcrumbReset     = bapBreadcrumbReset;
  window.bapBreadcrumbPush      = bapBreadcrumbPush;
  window.bapBreadcrumbPop       = bapBreadcrumbPop;
  window.bapSetProgressContext  = function () {};

  /* ── Bouton retour en haut ── */

  function bapInitBackToTop() {
    var btn = document.createElement('button');
    btn.id = 'bap-back-top';
    btn.className = 'bap-back-top';
    btn.title = 'Retour en haut';
    btn.setAttribute('aria-label', 'Retour en haut de page');
    btn.innerHTML = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
    document.body.appendChild(btn);

    var visible = false;
    function checkScroll() {
      var mainEl = document.getElementById('main');
      var scrollTop = mainEl ? mainEl.scrollTop : (window.pageYOffset || document.documentElement.scrollTop || 0);
      var shouldShow = scrollTop > 300;
      if (shouldShow !== visible) {
        visible = shouldShow;
        btn.classList.toggle('bap-back-top-visible', visible);
      }
    }

    btn.addEventListener('click', function () {
      var mainEl = document.getElementById('main');
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    var mainEl = document.getElementById('main');
    if (mainEl) mainEl.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ── Toasts ── */

  function bapToast(msg, type, duration) {
    type = type || 'info';
    duration = duration || 3000;
    var container = document.getElementById('bap-toasts');
    if (!container) {
      container = document.createElement('div');
      container.id = 'bap-toasts';
      container.className = 'bap-toasts';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'bap-toast bap-toast-' + type;

    var iconMap = { success: '<polyline points="20 6 9 17 4 12"/>', error: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', warning: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>' };
    var iconPath = iconMap[type] || iconMap.info;

    toast.innerHTML =
      '<svg class="ic bap-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + iconPath + '</svg>' +
      '<span class="bap-toast-msg">' + msg + '</span>' +
      '<button class="bap-toast-close" aria-label="Fermer"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';

    container.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('bap-toast-show'); });

    var timer = setTimeout(function () { dismissToast(toast); }, duration);
    toast.querySelector('.bap-toast-close').addEventListener('click', function () {
      clearTimeout(timer);
      dismissToast(toast);
    });
    return toast;
  }

  function dismissToast(toast) {
    toast.classList.remove('bap-toast-show');
    toast.classList.add('bap-toast-hide');
    setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 320);
  }

  /* ── Confetti micro-reward ── */

  function bapConfetti(opts) {
    opts = opts || {};
    var count = opts.count || 54;
    var origin = opts.origin || { x: 0.5, y: 0.6 };
    var colors = opts.colors || ['#c8b8f0','#a8c8f0','#a8d8c4','#f0c8a0','#f0b8c4','#fff8c0'];
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');

    var particles = [];
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i / count) + (i % 3 === 0 ? 0.3 : -0.3);
      var speed = 4 + (i % 5) * 1.4;
      particles.push({
        x: canvas.width * origin.x,
        y: canvas.height * origin.y,
        vx: Math.cos(angle) * speed * (0.7 + (i % 4) * 0.2),
        vy: Math.sin(angle) * speed * (0.7 + (i % 4) * 0.2) - 3 - (i % 6),
        color: colors[i % colors.length],
        size: 5 + (i % 4) * 2,
        rot: (i * 47) % 360,
        rotSpeed: ((i % 7) - 3) * 3,
        gravity: 0.22 + (i % 5) * 0.04,
        alpha: 1,
        shape: i % 3
      });
    }

    var startTime = null;
    var duration = 1800;

    function draw(ts) {
      if (!startTime) startTime = ts;
      var elapsed = ts - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = false;
      for (var j = 0; j < particles.length; j++) {
        var p = particles[j];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rot += p.rotSpeed;
        p.alpha = Math.max(0, 1 - elapsed / duration);
        if (p.alpha <= 0) continue;
        alive = true;
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        if (p.shape === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
      if (alive && elapsed < duration + 200) {
        requestAnimationFrame(draw);
      } else {
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    }
    requestAnimationFrame(draw);
  }

  /* ── API publique toasts/confetti ── */
  window.bapToast    = bapToast;
  window.bapConfetti = bapConfetti;

  /* ── Barre de progression de lecture ── */

  function bapInitProgress() {
    var navContainer = document.getElementById('bap-nav');
    var bar = document.createElement('div');
    bar.id = 'bap-progress-bar';
    bar.innerHTML = '<div class="bap-progress-fill"></div>';
    if (navContainer) navContainer.appendChild(bar);
    else document.body.appendChild(bar);
    var fill = bar.querySelector('.bap-progress-fill');

    var lblEl = document.createElement('div');
    lblEl.id = 'bap-progress-label';
    document.body.appendChild(lblEl);

    function getScroll() {
      var mainEl = document.getElementById('main');
      if (mainEl && mainEl.scrollHeight > mainEl.clientHeight + 5) {
        return { top: mainEl.scrollTop, max: mainEl.scrollHeight - mainEl.clientHeight };
      }
      var d = document.documentElement;
      return { top: window.pageYOffset || d.scrollTop || 0, max: d.scrollHeight - d.clientHeight };
    }

    var _ctx = '';
    var _pct = 0;

    function updateLabel() {
      if (!_ctx) { lblEl.className = ''; return; }
      lblEl.textContent = _ctx + ' · ' + _pct + '%';
      lblEl.className = _pct > 1 ? 'bap-prog-lbl-vis' : '';
    }

    function positionLabel() {
      if (!navContainer) return;
      var r = navContainer.getBoundingClientRect();
      lblEl.style.top = Math.round(r.bottom + 3) + 'px';
    }

    function update() {
      var s = getScroll();
      var pct = s.max > 0 ? Math.min(1, s.top / s.max) : 0;
      fill.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
      _pct = Math.round(pct * 100);
      updateLabel();
    }

    positionLabel();
    window.addEventListener('resize', positionLabel, { passive: true });

    var mainEl = document.getElementById('main');
    if (mainEl) mainEl.addEventListener('scroll', update, { passive: true });
    window.addEventListener('scroll', update, { passive: true });
    update();

    window.bapSetProgressContext = function (text) { _ctx = text || ''; updateLabel(); };
  }

  /* ── Bandeau compte à rebours examen ── */

  function bapInitExamCountdown() {
    var EXAM_PAGES = ['polycop_cours.html', 'revision_complet.html', 'polycop_tp.html',
                      'flashcards.html', 'entrainement.html', 'examen.html'];
    var current = location.pathname.split('/').pop() || 'index.html';
    if (EXAM_PAGES.indexOf(current) === -1) return;
    try { if (localStorage.getItem('hideExamCountdown') === '1') return; } catch (e) {}

    var examDate = new Date('2026-08-31T00:00:00');
    var today    = new Date();
    today.setHours(0, 0, 0, 0);
    var days = Math.floor((examDate - today) / 86400000);
    if (days < 0) return;

    var statusClass = days > 20 ? 'ec-sereine' : days > 7 ? 'ec-active' : 'ec-critique';
    var color       = days > 20 ? '#7FB77E'    : days > 7 ? '#E8A87C'   : '#D97A7A';
    var jText       = days === 0
      ? 'Examen aujourd\'hui !'
      : 'Examen dans <strong>J − ' + days + '</strong> ·  31 août 2026';

    var banner = document.createElement('div');
    banner.className = 'bap-exam-countdown ' + statusClass;
    banner.setAttribute('role', 'status');
    banner.innerHTML =
      '<span class="bap-ec-dot" style="background:' + color + ';color:' + color + ';"></span>' +
      '<span class="bap-ec-text">' + jText + '</span>' +
      '<button class="bap-ec-close" aria-label="Fermer">×</button>';

    var nav = document.getElementById('bap-nav');
    if (nav && nav.parentNode) {
      nav.parentNode.insertBefore(banner, nav.nextSibling);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }

    banner.querySelector('.bap-ec-close').addEventListener('click', function () {
      try { localStorage.setItem('hideExamCountdown', '1'); } catch (e) {}
      banner.style.display = 'none';
    });
  }

  window.bapInitExamCountdown = bapInitExamCountdown;

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
    bapInitBackToTop();
    bapInitExamCountdown();

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
