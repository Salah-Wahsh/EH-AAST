/**
 * CCY4202: Ethical Hacking Labs — Interactive Quiz Engine
 * Multiple-choice & terminal command challenge validation with explanatory feedback and XP scoring.
 */
(function () {
  'use strict';

  var QuizEngine = {
    getXP: function () {
      return parseInt(localStorage.getItem('ccy_user_xp') || '0', 10);
    },

    addXP: function (amount) {
      var current = this.getXP();
      var updated = current + amount;
      localStorage.setItem('ccy_user_xp', updated.toString());
      this.updateXPBadges();
    },

    updateXPBadges: function () {
      var xp = this.getXP();
      document.querySelectorAll('[data-user-xp]').forEach(function (el) {
        el.textContent = xp + ' XP';
      });
    },

    isQuestionSolved: function (qId) {
      return localStorage.getItem('ccy_solved_' + qId) === '1';
    },

    markQuestionSolved: function (qId, xpAward) {
      if (!this.isQuestionSolved(qId)) {
        localStorage.setItem('ccy_solved_' + qId, '1');
        this.addXP(xpAward || 10);
      }
    },

    // Handle Multiple Choice Option Selection
    handleOptionClick: function (btn) {
      var card = btn.closest('.quiz-card');
      var qId = card.dataset.questionId;
      var isCorrect = btn.dataset.correct === 'true';
      var feedbackBox = card.querySelector('.quiz-feedback');
      var xpAward = parseInt(card.dataset.xp || '10', 10);

      // Deselect siblings
      card.querySelectorAll('.quiz-option').forEach(function (opt) {
        opt.classList.remove('is-selected-correct', 'is-selected-incorrect');
      });

      if (isCorrect) {
        btn.classList.add('is-selected-correct');
        card.classList.remove('is-failed');
        card.classList.add('is-passed');

        if (feedbackBox) {
          feedbackBox.className = 'quiz-feedback is-visible quiz-feedback--correct';
          var rationale = btn.dataset.feedback || 'Correct! Concept masterfully demonstrated.';
          feedbackBox.innerHTML = '<strong>[+] ACCESS GRANTED:</strong> ' + rationale + ' <span class="badge" style="background:var(--color-accent);color:#000;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:6px;">+' + xpAward + ' XP</span>';
        }

        this.markQuestionSolved(qId, xpAward);
      } else {
        btn.classList.add('is-selected-incorrect');
        card.classList.remove('is-passed');
        card.classList.add('is-failed');

        if (feedbackBox) {
          feedbackBox.className = 'quiz-feedback is-visible quiz-feedback--incorrect';
          var rationale = btn.dataset.feedback || 'Incorrect. Inspect the theory above and try again.';
          feedbackBox.innerHTML = '<strong>[-] EXPLOIT FAILED:</strong> ' + rationale;
        }
      }
    },

    // Handle Terminal Command Challenge Validation
    handleCommandSubmit: function (card) {
      var qId = card.dataset.questionId;
      var input = card.querySelector('.quiz-input');
      var feedbackBox = card.querySelector('.quiz-feedback');
      var expectedRegexStr = card.dataset.expectedRegex;
      var xpAward = parseInt(card.dataset.xp || '15', 10);

      if (!input || !expectedRegexStr) return;

      var userVal = input.value.trim();
      var regex = new RegExp(expectedRegexStr, 'i');
      var isMatch = regex.test(userVal);

      if (isMatch) {
        card.classList.remove('is-failed');
        card.classList.add('is-passed');
        input.disabled = true;

        if (feedbackBox) {
          feedbackBox.className = 'quiz-feedback is-visible quiz-feedback--correct';
          var rationale = card.dataset.solutionRationale || 'Command executed successfully! Target shell secured.';
          feedbackBox.innerHTML = '<strong>[+] PAYLOAD DELIVERED:</strong> ' + rationale + ' <span class="badge" style="background:var(--color-accent);color:#000;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:6px;">+' + xpAward + ' XP</span>';
        }

        this.markQuestionSolved(qId, xpAward);
      } else {
        card.classList.remove('is-passed');
        card.classList.add('is-failed');

        if (feedbackBox) {
          feedbackBox.className = 'quiz-feedback is-visible quiz-feedback--incorrect';
          var hint = card.dataset.hint || 'Invalid syntax or missing required flags. Review the command usage above.';
          feedbackBox.innerHTML = '<strong>[-] PARSE ERROR:</strong> ' + hint;
        }
      }
    },

    init: function () {
      var self = this;

      // Restore question solved states and wire multiple choice
      document.querySelectorAll('.quiz-card').forEach(function (card) {
        var qId = card.dataset.questionId;
        var isSolved = self.isQuestionSolved(qId);

        // Multiple Choice wiring
        card.querySelectorAll('.quiz-option').forEach(function (btn) {
          btn.addEventListener('click', function () {
            self.handleOptionClick(btn);
          });
        });

        // Command Input wiring
        var submitBtn = card.querySelector('.quiz-submit-btn');
        var input = card.querySelector('.quiz-input');
        if (submitBtn && input) {
          submitBtn.addEventListener('click', function () {
            self.handleCommandSubmit(card);
          });
          input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
              e.preventDefault();
              self.handleCommandSubmit(card);
            }
          });
        }

        // If previously solved, visually mark it
        if (isSolved) {
          card.classList.add('is-passed');
          var correctOpt = card.querySelector('.quiz-option[data-correct="true"]');
          if (correctOpt) {
            correctOpt.classList.add('is-selected-correct');
          }
          var feedbackBox = card.querySelector('.quiz-feedback');
          if (feedbackBox) {
            feedbackBox.className = 'quiz-feedback is-visible quiz-feedback--correct';
            feedbackBox.innerHTML = '<strong>[+] COMPLETED:</strong> Challenge previously verified.';
          }
          if (input) {
            input.disabled = true;
          }
        }
      });

      this.updateXPBadges();
    }
  };

  window.QuizEngine = QuizEngine;
  window.addEventListener('DOMContentLoaded', function () {
    QuizEngine.init();
  });
})();
