/**
 * CCY4202: Ethical Hacking Labs — Lab Utilities & Interactive Features
 * TOC builder, ScrollSpy, Checklist persistence, Code block copying, and Module Tree state.
 */
(function () {
  'use strict';

  var LabCommon = {};

  // --- Module Tree Data ---
  var MODULE_TREE_DATA = [
    {
      id: 'mod01',
      title: 'Module 01: Fundamentals',
      badge: 'Core',
      labs: [
        { id: 'lab01', name: 'Lab 01: Linux & Virtual Lab Setup', href: 'labs/lab01.html', time: '45m' }
      ]
    },
    {
      id: 'mod02',
      title: 'Module 02: OSINT & Recon',
      badge: 'Recon',
      labs: [
        { id: 'lab02', name: 'Lab 02: Passive Recon & OSINT', href: 'labs/lab02.html', time: '50m' }
      ]
    },
    {
      id: 'mod03',
      title: 'Module 03: Active Scanning',
      badge: 'Scanning',
      labs: [
        { id: 'lab03', name: 'Lab 03: Port Scanning & Nmap', href: 'labs/lab03.html', time: '60m' }
      ]
    },
    {
      id: 'mod04',
      title: 'Module 04: Vulnerability Assmt',
      badge: 'Analysis',
      labs: [
        { id: 'lab04', name: 'Lab 04: Vuln Scanning & CVSS v3.1', href: 'labs/lab04.html', time: '55m' }
      ]
    },
    {
      id: 'mod05',
      title: 'Module 05: Web App Attacks',
      badge: 'WebSec',
      labs: [
        { id: 'lab05', name: 'Lab 05: OWASP Top 10 & Burp Suite', href: 'labs/lab05.html', time: '70m' }
      ]
    },
    {
      id: 'mod06',
      title: 'Module 06: Network Exploits',
      badge: 'Exploit',
      labs: [
        { id: 'lab06', name: 'Lab 06: Metasploit & Payloads', href: 'labs/lab06.html', time: '65m' }
      ]
    },
    {
      id: 'mod07',
      title: 'Module 07: Post-Exploit',
      badge: 'Advanced',
      labs: [
        { id: 'lab07', name: 'Lab 07: Pivoting & PrivEsc', href: 'labs/lab07.html', time: '75m' }
      ]
    }
  ];

  function getSiteRoot() {
    var s = document.querySelector('script[data-site-root]');
    var raw = (s && s.dataset && s.dataset.siteRoot) || '.';
    return String(raw).trim() || '.';
  }

  function resolveHref(path) {
    var base = getSiteRoot().replace(/\/$/, '');
    if (base === '.' || base === '') return './' + path.replace(/^\.\//, '');
    return base + '/' + path.replace(/^\.\//, '');
  }

  // --- Render Sidebar Module Tree ---
  LabCommon.renderModuleTree = function () {
    var container = document.getElementById('sidebar-module-tree');
    if (!container) return;

    var activeLabId = document.body && document.body.dataset.activeLab;

    var html = '<ul class="module-tree" role="list">';
    MODULE_TREE_DATA.forEach(function (mod) {
      var hasActiveLab = mod.labs.some(function (l) { return l.id === activeLabId; });
      var isOpen = hasActiveLab || mod.id === 'mod01';

      html +=
        '<li class="module-group ' + (isOpen ? 'is-open' : '') + '" data-module-id="' + mod.id + '">' +
          '<button type="button" class="module-group__header" onclick="LabCommon.toggleModuleGroup(\'' + mod.id + '\')">' +
            '<div class="module-group__title-wrapper">' +
              '<span class="module-group__indicator">▸</span>' +
              '<span>' + mod.title + '</span>' +
            '</div>' +
            '<span class="module-item__badge">' + mod.badge + '</span>' +
          '</button>' +
          '<ul class="module-group__list" role="list">';

      mod.labs.forEach(function (lab) {
        var isCurrent = lab.id === activeLabId;
        html +=
          '<li class="module-item">' +
            '<a href="' + resolveHref(lab.href) + '" class="module-item__link ' + (isCurrent ? 'is-active' : '') + '">' +
              '<span>' + lab.name + '</span>' +
              '<span class="module-item__badge">' + lab.time + '</span>' +
            '</a>' +
          '</li>';
      });

      html += '</ul></li>';
    });
    html += '</ul>';

    container.innerHTML = html;
  };

  LabCommon.toggleModuleGroup = function (modId) {
    var group = document.querySelector('.module-group[data-module-id="' + modId + '"]');
    if (group) {
      group.classList.toggle('is-open');
    }
  };

  // --- Build TOC & ScrollSpy ---
  LabCommon.buildTOC = function () {
    var content = document.querySelector('.main-content');
    var tocNav = document.getElementById('toc-nav');
    if (!content || !tocNav) return;

    var headings = content.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    var navHTML = '';
    headings.forEach(function (h, idx) {
      if (!h.id) {
        h.id = 'section-' + idx;
      }
      var isH3 = h.tagName.toLowerCase() === 'h3';
      navHTML +=
        '<a href="#' + h.id + '" class="toc-link ' + (isH3 ? 'toc-link--sub' : '') + '" data-heading-id="' + h.id + '">' +
          (isH3 ? '&nbsp;&nbsp;↳ ' : '') + h.textContent.trim() +
        '</a>';
    });

    tocNav.innerHTML = navHTML;

    // ScrollSpy with IntersectionObserver
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          tocNav.querySelectorAll('.toc-link').forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });

    headings.forEach(function (h) {
      observer.observe(h);
    });
  };

  // --- Copy Command Buttons ---
  LabCommon.initCopyButtons = function () {
    document.querySelectorAll('.terminal-copy-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var terminal = btn.closest('.terminal-window');
        if (!terminal) return;
        var codeBlock = terminal.querySelector('pre');
        if (!codeBlock) return;

        // Strip bash prompts like "root@kali-lab:~# " or "$ " if desired
        var text = codeBlock.innerText;
        // Clean leading prompt characters for clean terminal execution
        var cleanCmd = text.split('\n').map(function (line) {
          return line.replace(/^(\$|#|root@[^:]+:[^#$]*[#$])\s+/, '');
        }).join('\n').trim();

        navigator.clipboard.writeText(cleanCmd).then(function () {
          var originalHTML = btn.innerHTML;
          btn.innerHTML = '✓ Copied!';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
          }, 1800);
        }).catch(function (err) {
          console.error('Failed to copy', err);
        });
      });
    });
  };

  // --- Interactive Prerequisites Checklist ---
  LabCommon.initChecklists = function () {
    var labId = (document.body && document.body.dataset.activeLab) || 'general';
    var cards = document.querySelectorAll('.checklist-card');

    cards.forEach(function (card) {
      var checkboxes = card.querySelectorAll('input[type="checkbox"]');
      var progressEl = card.querySelector('.checklist-card__progress');

      function updateProgress() {
        var total = checkboxes.length;
        var completed = 0;
        checkboxes.forEach(function (cb, idx) {
          var key = 'ccy_chk_' + labId + '_' + idx;
          if (cb.checked) {
            completed++;
            cb.closest('.checklist-item').classList.add('is-completed');
            localStorage.setItem(key, '1');
          } else {
            cb.closest('.checklist-item').classList.remove('is-completed');
            localStorage.removeItem(key);
          }
        });

        if (progressEl) {
          progressEl.textContent = completed + ' / ' + total + ' Completed (' + Math.round((completed / total) * 100) + '%)';
        }
      }

      // Restore state
      checkboxes.forEach(function (cb, idx) {
        var key = 'ccy_chk_' + labId + '_' + idx;
        if (localStorage.getItem(key) === '1') {
          cb.checked = true;
          cb.closest('.checklist-item').classList.add('is-completed');
        }
        cb.addEventListener('change', updateProgress);
      });

      updateProgress();
    });
  };

  // --- Hero Bash Prompt Terminal Simulator ---
  LabCommon.initHeroTerminal = function () {
    var heroTerm = document.getElementById('hero-bash-sim');
    if (!heroTerm) return;

    var promptLines = [
      { text: "root@kali-lab:~# ./verify_lab_environment.sh", delay: 40, isCmd: true },
      { text: "[*] Initializing CCY4202 Ethical Hacking Laboratory Suite...", delay: 200 },
      { text: "[+] Isolated Host-Only Network: 192.168.56.0/24 [ACTIVE]", delay: 250 },
      { text: "[+] Attack Rig: Kali Linux Rolling 2026.x (x86_64) [ONLINE]", delay: 250 },
      { text: "[+] Target 1: Metasploitable3 (192.168.56.101) [READY]", delay: 200 },
      { text: "[+] Target 2: DVWA & OWASP Juice Shop Container [LISTENING:80,3000]", delay: 200 },
      { text: "[+] 7 Laboratory Modules, 28 Guided Exploits Loaded.", delay: 300 },
      { text: "root@kali-lab:~# Select a module below to commence operation_", delay: 100, isFinal: true }
    ];

    var outputContainer = heroTerm.querySelector('.terminal-window__body pre');
    if (!outputContainer) return;

    outputContainer.innerHTML = '';
    var currentLine = 0;

    function printNext() {
      if (currentLine >= promptLines.length) return;
      var item = promptLines[currentLine];
      var div = document.createElement('div');
      if (item.isCmd) {
        div.innerHTML = '<span class="terminal-prompt-sym">' + item.text + '</span>';
      } else if (item.isFinal) {
        div.innerHTML = '<span class="terminal-highlight">' + item.text + '</span><span class="terminal-cursor"></span>';
      } else {
        div.innerHTML = '<span class="terminal-output">' + item.text + '</span>';
      }
      outputContainer.appendChild(div);
      currentLine++;
      setTimeout(printNext, item.delay);
    }

    setTimeout(printNext, 300);
  };

  // Initialize all common features on DOM load
  window.addEventListener('DOMContentLoaded', function () {
    LabCommon.renderModuleTree();
    LabCommon.buildTOC();
    LabCommon.initCopyButtons();
    LabCommon.initChecklists();
    LabCommon.initHeroTerminal();
  });

  window.LabCommon = LabCommon;
})();
