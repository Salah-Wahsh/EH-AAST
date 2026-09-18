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
      var savedScanlines = localStorage.getItem('ccy_scanlines') === 'true';

      this.setTheme(savedTheme, false);
      this.setProjector(savedProjector, false);
      this.setScanlines(savedScanlines, false);
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
    },

    setScanlines: function (isActive, persist) {
      if (isActive) {
        document.body.classList.add('scanlines-active');
      } else {
        document.body.classList.remove('scanlines-active');
      }
      if (persist !== false) {
        localStorage.setItem('ccy_scanlines', isActive ? 'true' : 'false');
      }
      var scanBtn = document.getElementById('scanline-toggle-btn');
      if (scanBtn) {
        scanBtn.classList.toggle('is-active', isActive);
      }
    },

    toggleScanlines: function () {
      var isCurrent = document.body.classList.contains('scanlines-active');
      this.setScanlines(!isCurrent, true);
    }
  };

  // Expose ThemeManager globally
  window.ThemeManager = ThemeManager;

  // --- Search Index Database ---
  var searchCatalog = [
    { title: 'Module 01: Course Intro & Fundamentals', desc: 'Linux architecture, virtual networks, iptables, SSH isolation.', url: 'labs/lab01.html', tag: 'Lab' },
    { title: 'Module 02: Reconnaissance & OSINT', desc: 'Passive intelligence, DNS discovery, whois, Shodan, theHarvester.', url: 'labs/lab02.html', tag: 'Lab' },
    { title: 'Module 03: Active Scanning & Nmap', desc: 'Port scanning, SYN/Connect scans, service versions, NSE scripts.', url: 'labs/lab03.html', tag: 'Lab' },
    { title: 'Module 04: Vulnerability Assessment & CVSS', desc: 'Vulnerability scanners, CVE analysis, CVSS v3.1 scoring formulas.', url: 'labs/lab04.html', tag: 'Lab' },
    { title: 'Module 05: Web Application Attacks & Burp', desc: 'OWASP Top 10, SQLi manual payload craft, XSS vectors, Burp proxy.', url: 'labs/lab05.html', tag: 'Lab' },
    { title: 'Module 06: Network Exploitation & Metasploit', desc: 'EternalBlue MS17-010, msfvenom staged payloads, meterpreter shells.', url: 'labs/lab06.html', tag: 'Lab' },
    { title: 'Module 07: Post-Exploitation & Pivoting', desc: 'Linux SUID/sudo privesc, Windows token impersonation, Chisel SSH pivots.', url: 'labs/lab07.html', tag: 'Lab' },
    { title: 'Course Syllabus', desc: 'Grading breakdown, weekly schedule, lab rules of engagement.', url: 'syllabus.html', tag: 'Course' },
    { title: 'Penetration Testing Cheat Sheets', desc: 'Fast reference for Nmap, Burp, Metasploit, PrivEsc & Reverse Shells.', url: 'cheatsheets.html', tag: 'Reference' },
    { title: 'Pentest Lab & Tools Setup', desc: 'Kali Linux VM, VirtualBox/VMware networking, Docker targets & extensions.', url: 'tools.html', tag: 'Setup' }
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
            '<li><a class="nav-link ' + (activeNav === 'syllabus' ? 'is-active' : '') + '" data-site-href="syllabus.html">Syllabus</a></li>' +
            '<li><a class="nav-link ' + (activeNav === 'labs' ? 'is-active' : '') + '" data-site-href="labs/lab01.html">Labs</a></li>' +
            '<li><a class="nav-link ' + (activeNav === 'cheatsheets' ? 'is-active' : '') + '" data-site-href="cheatsheets.html">Cheat Sheets</a></li>' +
            '<li><a class="nav-link ' + (activeNav === 'tools' ? 'is-active' : '') + '" data-site-href="tools.html">Tools Setup</a></li>' +
            '<li><a class="nav-link" href="https://github.com/salah-wahsh" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>' +
          '</ul>' +

          '<div class="nav-controls">' +
            '<button class="nav-search-btn" id="nav-search-trigger" aria-label="Open command search dialog">' +
              '<span>🔍 Search</span>' +
              '<kbd class="nav-search-kbd">Ctrl+K</kbd>' +
            '</button>' +
            '<button class="nav-btn nav-btn--projector" id="projector-toggle-btn" onclick="ThemeManager.toggleProjector()" title="Toggle 18px+ Classroom Projector Mode">' +
              '🖥️ <span>Projector View</span>' +
            '</button>' +
            '<button class="nav-btn" id="theme-toggle-btn" onclick="ThemeManager.toggleTheme()" aria-label="Toggle theme">' +
              '☀️ <span>Light</span>' +
            '</button>' +
            '<button class="nav-btn" id="scanline-toggle-btn" onclick="ThemeManager.toggleScanlines()" title="Toggle CRT HUD Scanlines" aria-label="Toggle CRT HUD">' +
              'CRT' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="scanline-overlay" aria-hidden="true"></div>' +
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
    var sidebar = document.getElementById('site-sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('is-open');
    });

    var backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function () {
        sidebar.classList.remove('is-open');
      });
    }
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
