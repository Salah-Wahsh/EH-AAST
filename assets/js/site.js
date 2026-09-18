/**
 * CCY4202: Ethical Hacking Labs — Core Site Engine
 * Handles Navigation Injection, Theme Switching, Projector Mode, Search, and Scanlines.
 */
(function () {
  'use strict';

  // --- Site Path Resolver ---
  function getScript() {
    return document.querySelector('script[data-site-root]');
  }

  function siteBase() {
    var s = getScript();
    var raw = (s && s.dataset && s.dataset.siteRoot) || '.';
    return String(raw).trim() || '.';
  }

  function resolveHref(pathFromRoot) {
    var base = siteBase().replace(/\/$/, '');
    if (base === '.' || base === '') {
      return './' + pathFromRoot.replace(/^\.\//, '');
    }
    return base + '/' + pathFromRoot.replace(/^\.\//, '');
  }

  // --- Theme & Accessibility State Manager ---
  var ThemeManager = {
    init: function () {
      var savedTheme = localStorage.getItem('ccy_theme') || 'dark';
      var savedProjector = localStorage.getItem('ccy_projector') === 'true';

      this.setTheme(savedTheme, false);
      this.setProjector(savedProjector, false);
    },

    setTheme: function (theme, persist) {
      document.documentElement.setAttribute('data-theme', theme);
      if (persist !== false) {
        localStorage.setItem('ccy_theme', theme);
      }
      var themeBtn = document.getElementById('theme-toggle-btn');
      if (themeBtn) {
        themeBtn.innerHTML = theme === 'dark' ? '☀️ <span>Light</span>' : '🌙 <span>Dark</span>';
        themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to high-contrast light mode' : 'Switch to terminal dark mode');
      }
    },

    toggleTheme: function () {
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      var target = current === 'dark' ? 'light' : 'dark';
      this.setTheme(target, true);
    },

    setProjector: function (isActive, persist) {
      if (isActive) {
        document.body.classList.add('projector-mode');
      } else {
        document.body.classList.remove('projector-mode');
      }
      if (persist !== false) {
        localStorage.setItem('ccy_projector', isActive ? 'true' : 'false');
      }
      var projBtn = document.getElementById('projector-toggle-btn');
      if (projBtn) {
        projBtn.classList.toggle('is-active', isActive);
        projBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      }
    },

    toggleProjector: function () {
      var isCurrent = document.body.classList.contains('projector-mode');
      this.setProjector(!isCurrent, true);
    }
  };

  // Expose ThemeManager globally
  window.ThemeManager = ThemeManager;

  // --- Search Index Database ---
  var searchCatalog = [
    { title: 'Lab 01: Security Concepts & Web Prerequisites', desc: 'Threat actors, 5 pentest phases, TCP handshake vs UDP, HTTP headers, DevTools.', url: 'labs/lab01.html', tag: 'Lab' },
    { title: 'Command Cheat Sheets: Web & Network', desc: 'Fast, copyable terminal primitives and flags extracted from labs.', url: 'cheatsheets.html', tag: 'Reference' },
    { title: 'Tools & Environment Setup', desc: 'Attack rigs, verification commands, and tooling catalog.', url: 'tools.html', tag: 'Setup' },
    { title: 'TCP 3-Way Handshake & Port State Deduction', desc: 'Kernel responses (SYN-ACK, RST, Drop), SYN stealth scanning, and TCP vs UDP.', url: 'cheatsheets.html#tcp-handshake', tag: 'CheatSheet' },
    { title: 'Command: curl -I (Banner Grab)', desc: 'Extract web server headers and banner leaks.', url: 'cheatsheets.html#web-recon', tag: 'CheatSheet' },
    { title: 'Command: base64 -d (Credential Decode)', desc: 'Decode Basic Auth tokens and sniffed base64 strings.', url: 'cheatsheets.html#encoding', tag: 'CheatSheet' },
    { title: 'Network Diagnostics & Layer Triage', desc: 'Systematic troubleshooting primitives (ip route, ip neigh, nc -zv, curl -I -v).', url: 'cheatsheets.html#network-triage', tag: 'CheatSheet' },
    { title: 'Network Layers (Hacker Model & Triage)', desc: "Offensive 5-layer stack (L7 to L1) and the 'Which Layer Broke?' systematic triage checklist.", url: 'labs/lab01.html#section-3', tag: 'Concept' },
    { title: 'Ports Architecture (The Apartment Model)', desc: 'Demystifying IP vs. Port (0-65535), port ranges, and why hackers scan ports.', url: 'labs/lab01.html#section-3', tag: 'Concept' }
  ];

  // --- Nav Template Generator ---
  function buildNavHTML() {
    var activeNav = (document.body && document.body.dataset.navActive) || '';

    return (
      '<header class="site-header">' +
        '<div class="site-nav">' +
          '<div style="display:flex;align-items:center;gap:0.75rem;">' +
            '<button class="nav-toggle-btn" id="mobile-sidebar-toggle" aria-label="Toggle navigation menu">' +
              '☰' +
            '</button>' +
            '<a class="nav-brand" data-site-href="index.html">' +
              '<span class="nav-brand__icon">⚡</span>' +
              '<span>CCY4202</span>' +
              '<span class="nav-brand__badge">ETHICAL HACKING</span>' +
            '</a>' +
          '</div>' +

          '<ul class="nav-links" role="list">' +
            '<li><a class="nav-link ' + (activeNav === 'home' ? 'is-active' : '') + '" data-site-href="index.html">Portal Home</a></li>' +
            '<li><a class="nav-link ' + (activeNav === 'labs' ? 'is-active' : '') + '" data-site-href="labs/lab01.html">Labs</a></li>' +
            '<li><a class="nav-link ' + (activeNav === 'cheatsheets' ? 'is-active' : '') + '" data-site-href="cheatsheets.html">Cheat Sheets</a></li>' +
            '<li><a class="nav-link ' + (activeNav === 'tools' ? 'is-active' : '') + '" data-site-href="tools.html">Tools Setup</a></li>' +
          '</ul>' +

          '<div class="nav-controls">' +
            '<button class="nav-search-btn" id="nav-search-trigger" aria-label="Open command search dialog">' +
              '<span class="nav-search-icon">🔍</span>' +
              '<span class="nav-search-text">Search</span>' +
              '<kbd class="nav-search-kbd">Ctrl+K</kbd>' +
            '</button>' +
            '<button class="nav-btn nav-btn--projector" id="projector-toggle-btn" onclick="ThemeManager.toggleProjector()" title="Toggle 18px+ Classroom Projector Mode">' +
              '🖥️ <span>Projector View</span>' +
            '</button>' +
            '<button class="nav-btn" id="theme-toggle-btn" onclick="ThemeManager.toggleTheme()" aria-label="Toggle theme">' +
              '☀️ <span>Light</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="mobile-drawer" id="mobile-nav-drawer" aria-label="Navigation Menu">' +
        '<div class="mobile-drawer__header">' +
          '<div class="nav-brand">' +
            '<span class="nav-brand__icon">⚡</span>' +
            '<span>CCY4202</span>' +
          '</div>' +
          '<button type="button" class="mobile-drawer__close" id="mobile-drawer-close" aria-label="Close menu">✕</button>' +
        '</div>' +
        '<nav class="mobile-drawer__body">' +
          '<div class="mobile-drawer__section-label">Navigation</div>' +
          '<ul class="mobile-nav-list" role="list">' +
            '<li><a class="mobile-nav-link ' + (activeNav === 'home' ? 'is-active' : '') + '" data-site-href="index.html"><span>🏠</span> Portal Home</a></li>' +
            '<li><a class="mobile-nav-link ' + (activeNav === 'labs' ? 'is-active' : '') + '" data-site-href="labs/lab01.html"><span>🧪</span> Lab 01: Security &amp; Web Intro</a></li>' +
            '<li><a class="mobile-nav-link ' + (activeNav === 'cheatsheets' ? 'is-active' : '') + '" data-site-href="cheatsheets.html"><span>📄</span> Cheat Sheets</a></li>' +
            '<li><a class="mobile-nav-link ' + (activeNav === 'tools' ? 'is-active' : '') + '" data-site-href="tools.html"><span>🛠️</span> Tools Setup</a></li>' +
          '</ul>' +
          '<div class="mobile-drawer__section-label" style="margin-top:1.5rem;">Display Mode</div>' +
          '<div style="display:flex;flex-direction:column;gap:0.5rem;padding:0 0.5rem;">' +
            '<button type="button" class="nav-btn" onclick="ThemeManager.toggleProjector()" style="justify-content:flex-start;width:100%;padding:0.6rem 0.75rem;">' +
              '🖥️ Projector Mode (18px+)' +
            '</button>' +
            '<button type="button" class="nav-btn" onclick="ThemeManager.toggleTheme()" style="justify-content:flex-start;width:100%;padding:0.6rem 0.75rem;">' +
              '☀️ / 🌙 Toggle Light / Dark Mode' +
            '</button>' +
          '</div>' +
        '</nav>' +
      '</div>' +
      '<div class="mobile-drawer-backdrop" id="mobile-drawer-backdrop"></div>' +
      '<dialog class="search-dialog" id="search-dialog" aria-label="Course Search">' +
        '<div class="search-dialog__header">' +
          '<span>🔍</span>' +
          '<input type="search" class="search-dialog__input" id="search-input" placeholder="Search labs, tools, commands, or CVEs..." autocomplete="off" />' +
          '<button class="search-dialog__close" id="search-close-btn">ESC</button>' +
        '</div>' +
        '<ul class="search-results" id="search-results" role="list"></ul>' +
        '<div class="search-dialog__footer">' +
          '<span>Navigate with ↑ / ↓ and press ENTER</span>' +
          '<span>CCY4202 Course Search</span>' +
        '</div>' +
      '</dialog>'
    );
  }

  function buildFooterHTML() {
    return (
      '<footer class="site-footer">' +
        '<div class="site-footer__inner">' +
          '<div>' +
            '<p style="font-weight:700;color:var(--color-text-primary);margin-bottom:0.25rem;">' +
              'CCY4202: Ethical Hacking & Penetration Testing' +
            '</p>' +
            '<p>4th-Year Undergraduate Cybersecurity Engineering Lab Portal.</p>' +
          '</div>' +
          '<div class="site-footer__disclaimer">' +
            '⚠️ <strong>Academic & Legal Notice:</strong> All techniques and tools demonstrated in this course are strictly intended for authorized educational laboratories within isolated environments. Unauthorized access or attack against external infrastructure violates cybercrime laws.' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function wireSearchDialog() {
    var dialog = document.getElementById('search-dialog');
    var trigger = document.getElementById('nav-search-trigger');
    var closeBtn = document.getElementById('search-close-btn');
    var input = document.getElementById('search-input');
    var resultsList = document.getElementById('search-results');

    if (!dialog || !trigger) return;

    function openSearch() {
      dialog.showModal();
      if (input) {
        input.value = '';
        renderResults('');
        input.focus();
      }
    }

    function closeSearch() {
      dialog.close();
    }

    trigger.addEventListener('click', openSearch);
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);

    // Light-dismiss click outside
    dialog.addEventListener('click', function (e) {
      var rect = dialog.getBoundingClientRect();
      var isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) closeSearch();
    });

    // Keyboard Shortcuts (Cmd+K / Ctrl+K / /)
    window.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialog.open) closeSearch();
        else openSearch();
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        openSearch();
      }
    });

    function renderResults(q) {
      if (!resultsList) return;
      var query = q.toLowerCase().trim();
      var matches = searchCatalog.filter(function (item) {
        if (!query) return true;
        return item.title.toLowerCase().includes(query) ||
               item.desc.toLowerCase().includes(query) ||
               item.tag.toLowerCase().includes(query);
      });

      if (matches.length === 0) {
        resultsList.innerHTML = '<li style="padding:1rem;color:var(--color-text-muted);text-align:center;">No matching labs or topics found.</li>';
        return;
      }

      resultsList.innerHTML = matches.map(function (item) {
        var resolved = resolveHref(item.url);
        return (
          '<li>' +
            '<a href="' + resolved + '" class="search-item">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<span class="search-item__title">' + item.title + '</span>' +
                '<span class="module-item__badge">' + item.tag + '</span>' +
              '</div>' +
              '<span class="search-item__desc">' + item.desc + '</span>' +
            '</a>' +
          '</li>'
        );
      }).join('');
    }

    if (input) {
      input.addEventListener('input', function () {
        renderResults(this.value);
      });
    }
  }

  function wireLinks(container) {
    container.querySelectorAll('[data-site-href]').forEach(function (el) {
      var p = el.getAttribute('data-site-href');
      if (!p) return;
      el.setAttribute('href', resolveHref(p));
      el.removeAttribute('data-site-href');
    });
  }

  function wireMobileDrawer() {
    var toggle = document.getElementById('mobile-sidebar-toggle');
    var drawer = document.getElementById('mobile-nav-drawer');
    var backdrop = document.getElementById('mobile-drawer-backdrop');
    var closeBtn = document.getElementById('mobile-drawer-close');

    if (!toggle || !drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Close when clicking links inside drawer
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  function initApp() {
    var navMount = document.querySelector('[data-site-nav]');
    if (navMount) {
      navMount.innerHTML = buildNavHTML();
      wireLinks(navMount);
    }

    var footerMount = document.querySelector('[data-site-footer]');
    if (footerMount) {
      footerMount.innerHTML = buildFooterHTML();
    }

    ThemeManager.init();
    wireSearchDialog();
    wireMobileDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
