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
        { id: 'lab01', name: 'Lab 01: Security Concepts & Web Prerequisites', href: 'labs/lab01.html', time: '45m' },
        { id: 'lab02', name: 'Lab 02: Web App Basics & Burp Suite', href: 'labs/lab02.html', time: '60m' }
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
      { text: "[+] Laboratory Module 01 Loaded & Ready.", delay: 300 },
      { text: "root@kali-lab:~# Select Lab 01 below to commence operation_", delay: 100, isFinal: true }
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

  // --- QR Jump Header (top-of-lab QR + short URL for far-projector classroom) ---
  LabCommon.initQrJump = function () {
    var container = document.querySelector('.qr-jump');
    if (!container) return;

    var urlEl = container.querySelector('.qr-jump__url');
    var copyBtn = container.querySelector('.qr-jump__copy-btn');
    var codeEl = container.querySelector('.qr-jump__code');

    var currentUrl = (urlEl && urlEl.dataset && urlEl.dataset.explicitUrl) || window.location.href.split('#')[0];
    if (urlEl) urlEl.textContent = currentUrl;

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(currentUrl).then(function () {
          var original = copyBtn.textContent;
          copyBtn.textContent = '✓ Copied';
          copyBtn.classList.add('copied');
          setTimeout(function () {
            copyBtn.textContent = original;
            copyBtn.classList.remove('copied');
          }, 1800);
        }).catch(function (err) { console.error('Copy failed:', err); });
      });
    }

    // QR generation: uses the vendored qrcode-generator library (window.qrcode).
    // Falls back to a "QR" placeholder if it isn't loaded — URL + copy button
    // still provide full value.
    var qrSvg = null;
    if (codeEl) {
      try {
        if (typeof window.qrcode === 'function') {
          var qr = window.qrcode(0, 'M'); // type 0 = auto-size, M = ~15% error correction
          qr.addData(currentUrl);
          qr.make();
          qrSvg = qr.createSvgTag({ cellSize: 6, margin: 1, scalable: true, title: 'Lab URL QR code' });
        } else if (window.QRCodeMini && typeof window.QRCodeMini.generateSvg === 'function') {
          qrSvg = window.QRCodeMini.generateSvg(currentUrl);
        }
      } catch (e) { qrSvg = null; }

      if (qrSvg) {
        codeEl.innerHTML = qrSvg;
        codeEl.classList.add('qr-jump__code--live');
      } else {
        codeEl.classList.add('qr-jump__code--placeholder');
        codeEl.textContent = 'QR';
      }
    }

    // Projector view: pin a scannable QR to the upper-right corner so late
    // arrivals can grab the URL at any point, not just at the top of the page.
    if (qrSvg && !document.querySelector('.qr-projector')) {
      var floater = document.createElement('div');
      floater.className = 'qr-projector';
      floater.setAttribute('aria-hidden', 'true');
      floater.innerHTML =
        '<div class="qr-projector__code">' + qrSvg + '</div>' +
        '<div class="qr-projector__cap">Scan to follow</div>';
      document.body.appendChild(floater);
    }
  };

  // --- You-Are-Here Persistent Section Indicator (bottom-right) ---
  LabCommon.initYouAreHere = function () {
    var content = document.querySelector('.main-content');
    if (!content) return;
    var headings = content.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    var indicator = document.querySelector('.you-are-here');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'you-are-here';
      indicator.innerHTML =
        '<span class="you-are-here__label">📍 In:</span>' +
        '<span class="you-are-here__section">—</span>' +
        '<span class="you-are-here__progress"></span>';
      document.body.appendChild(indicator);
    }

    var sectionEl = indicator.querySelector('.you-are-here__section');
    var progressEl = indicator.querySelector('.you-are-here__progress');
    var totalHeadings = headings.length;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var h = entry.target;
          var idx = Array.prototype.indexOf.call(headings, h);
          if (idx >= 0) {
            sectionEl.textContent = h.textContent.trim();
            progressEl.textContent = (idx + 1) + '/' + totalHeadings;
            indicator.classList.add('is-visible');
          }
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });

    headings.forEach(function (h) { observer.observe(h); });

    // Hide the indicator when the user scrolls back above the first heading
    var firstHeading = headings[0];
    var topObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry.boundingClientRect.top > 100) {
          indicator.classList.remove('is-visible');
        }
      });
    });
    topObs.observe(firstHeading);
  };

  // --- Prediction Prompts (force cognitive engagement before revealing) ---
  LabCommon.initPredictionPrompts = function () {
    document.querySelectorAll('.prediction-prompt').forEach(function (card) {
      var input = card.querySelector('.prediction-prompt__input');
      var btn = card.querySelector('.prediction-prompt__btn');
      var reveal = card.querySelector('.prediction-prompt__reveal');
      if (!input || !btn || !reveal) return;

      function doReveal() {
        var guess = input.value.trim();
        if (!guess) {
          input.focus();
          input.style.borderColor = 'var(--color-warn)';
          return;
        }
        var existing = reveal.querySelector('.prediction-prompt__your-guess');
        if (existing) existing.remove();
        var yourGuess = document.createElement('div');
        yourGuess.className = 'prediction-prompt__your-guess';
        yourGuess.innerHTML = '<em>Your guess:</em> ' + guess.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        reveal.appendChild(yourGuess);

        reveal.hidden = false;
        btn.disabled = true;
        btn.textContent = '✓ Revealed';
        input.disabled = true;
      }

      btn.addEventListener('click', doReveal);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); doReveal(); }
      });
    });
  };

  // --- Tool Comparison Matrix (task-vs-tool expandable grid) ---
  LabCommon.initToolComparisonMatrix = function () {
    document.querySelectorAll('.tool-comparison-matrix').forEach(function (matrix) {
      matrix.addEventListener('click', function (e) {
        var head = e.target.closest('.tool-comparison-matrix__row-head');
        if (!head) return;
        var row = head.closest('.tool-comparison-matrix__row');
        if (!row) return;
        // Collapse siblings for radio-like behavior (comment out for multi-expand)
        matrix.querySelectorAll('.tool-comparison-matrix__row.is-expanded').forEach(function (other) {
          if (other !== row) other.classList.remove('is-expanded');
        });
        row.classList.toggle('is-expanded');
      });
    });
  };

  // --- Burp Suite Mock (static clickable simulation) ---
  LabCommon.initBurpMock = function () {
    document.querySelectorAll('.burp-mock').forEach(function (mock) {
      var tabs = mock.querySelectorAll('.burp-mock__tab');
      var panes = mock.querySelectorAll('.burp-mock__pane');

      function activatePane(name) {
        tabs.forEach(function (t) { t.classList.toggle('is-active', t.dataset.tab === name); });
        panes.forEach(function (p) { p.classList.toggle('is-active', p.dataset.pane === name); });
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.dataset.tab;
          if (target) activatePane(target);
        });
      });

      // Render a raw HTTP message as TEXT, the way Burp's message editor does.
      // Using textContent (not innerHTML) keeps any tags in the body literal
      // instead of letting the browser render them as live markup.
      function setRaw(panel, text) {
        if (!panel) return;
        panel.textContent = '';
        var pre = document.createElement('pre');
        pre.textContent = text;
        panel.appendChild(pre);
      }

      // History row click -> populate the selected request into request/response panels
      var rows = mock.querySelectorAll('.burp-mock__history-row');
      var reqBody = mock.querySelector('.burp-mock__panel-body[data-role="request"]');
      var resBody = mock.querySelector('.burp-mock__panel-body[data-role="response"]');

      rows.forEach(function (row) {
        row.addEventListener('click', function () {
          rows.forEach(function (r) { r.classList.remove('is-selected'); });
          row.classList.add('is-selected');
          if (reqBody && row.dataset.request) setRaw(reqBody, row.dataset.request);
          if (resBody && row.dataset.response) setRaw(resBody, row.dataset.response);
          var hint = mock.querySelector('.burp-mock__hint');
          if (hint) hint.classList.add('is-visible');
        });
      });

      // "Send to Repeater" action: switch to Repeater tab & carry selected request over
      var sendBtns = mock.querySelectorAll('[data-action="send-to-repeater"]');
      sendBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          activatePane('repeater');
          var selected = mock.querySelector('.burp-mock__history-row.is-selected');
          var repReq = mock.querySelector('.burp-mock__pane[data-pane="repeater"] .burp-mock__panel-body[data-role="request"]');
          if (selected && repReq && selected.dataset.request) {
            setRaw(repReq, selected.dataset.request);
          }
        });
      });
    });
  };

  // --- Docker Reality Check (live target probes via fetch no-cors) ---
  LabCommon.initDockerRealityCheck = function () {
    document.querySelectorAll('.docker-reality-check').forEach(function (widget) {
      var probes = widget.querySelectorAll('.reality-check__probe');

      function setState(probe, state) {
        probe.classList.remove('is-idle', 'is-testing', 'is-pass', 'is-fail');
        probe.classList.add('is-' + state);
        var badge = probe.querySelector('.reality-check__status');
        if (badge) {
          badge.className = 'reality-check__status reality-check__status--' + state;
          badge.textContent = ({
            idle: 'IDLE',
            testing: 'TESTING…',
            pass: '✓ REACHABLE',
            fail: '✗ UNREACHABLE'
          })[state] || state.toUpperCase();
        }
      }

      function runProbe(probe) {
        var url = probe.dataset.url;
        if (!url) return Promise.resolve();
        var btn = probe.querySelector('.reality-check__probe-btn');
        if (btn) btn.disabled = true;
        setState(probe, 'testing');
        // no-cors swallows CORS errors, so success = fetch didn't throw a network error.
        // Timeout guard: a hung request (e.g. Burp Intercept ON holding it) fails after 4s
        // instead of leaving the badge stuck on TESTING.
        var controller = window.AbortController ? new AbortController() : null;
        var timeout = new Promise(function (_, reject) {
          setTimeout(function () {
            if (controller) controller.abort();
            reject(new Error('timeout'));
          }, 4000);
        });
        var request = fetch(url, {
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller ? controller.signal : undefined
        });

        return Promise.race([request, timeout])
          .then(function () { setState(probe, 'pass'); })
          .catch(function () { setState(probe, 'fail'); })
          .then(function () {
            if (btn) btn.disabled = false;
          });
      }

      probes.forEach(function (probe) {
        var btn = probe.querySelector('.reality-check__probe-btn');
        if (btn) btn.addEventListener('click', function () { runProbe(probe); });
        setState(probe, 'idle');
      });

      var runAll = widget.querySelector('.docker-reality-check__run-all');
      if (runAll) {
        runAll.addEventListener('click', function () {
          probes.forEach(function (probe) { runProbe(probe); });
        });
      }
    });
  };

  // Initialize all common features on DOM load
  window.addEventListener('DOMContentLoaded', function () {
    LabCommon.renderModuleTree();
    LabCommon.buildTOC();
    LabCommon.initCopyButtons();
    LabCommon.initChecklists();
    LabCommon.initHeroTerminal();
    LabCommon.initQrJump();
    LabCommon.initYouAreHere();
    LabCommon.initPredictionPrompts();
    LabCommon.initToolComparisonMatrix();
    LabCommon.initBurpMock();
    LabCommon.initDockerRealityCheck();
  });

  window.LabCommon = LabCommon;
})();
