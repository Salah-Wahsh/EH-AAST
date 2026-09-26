#!/usr/bin/env bash
# ============================================================================
# CCY4202 New Lab Bootstrap
# Usage: scripts/new-lab.sh <lab-number> "<lab-title>" [time-estimate] [difficulty]
# Example:
#   scripts/new-lab.sh 02 "Web App Basics & Burp Suite" "60 Mins" "Intermediate"
# ============================================================================
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "Usage: $0 <lab-number> \"<lab-title>\" [time-estimate] [difficulty]"
  echo "Example: $0 02 \"Web App Basics & Burp Suite\" \"60 Mins\" \"Intermediate\""
  exit 1
fi

LAB_NUMBER="$1"
LAB_TITLE="$2"
TIME_ESTIMATE="${3:-45 Mins}"
DIFFICULTY="${4:-Intermediate}"

# Repo root = parent of this script's directory
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="$REPO_ROOT/.agents/skills/lab-authoring/examples/lab-template.html"
TARGET="$REPO_ROOT/labs/lab${LAB_NUMBER}.html"

if [ ! -f "$TEMPLATE" ]; then
  echo "❌ Template not found: $TEMPLATE"
  exit 1
fi

if [ -f "$TARGET" ]; then
  echo "❌ Refusing to overwrite existing lab: $TARGET"
  echo "   Delete it first if you really want to regenerate."
  exit 1
fi

echo "▸ Creating $TARGET from template..."

# Copy template and substitute tokens
sed \
  -e "s/Lab XX/Lab ${LAB_NUMBER}/g" \
  -e "s/labXX/lab${LAB_NUMBER}/g" \
  -e "s/xx-1/${LAB_NUMBER}-1/g" \
  -e "s/xx-2/${LAB_NUMBER}-2/g" \
  -e "s/xx-3/${LAB_NUMBER}-3/g" \
  -e "s/q-xx-1/q-${LAB_NUMBER}-1/g" \
  -e "s/q-xx-2/q-${LAB_NUMBER}-2/g" \
  -e "s|\[Lab Title\]|${LAB_TITLE}|g" \
  -e "s|⏱️ 45 Mins|⏱️ ${TIME_ESTIMATE}|" \
  -e "s|>Intermediate<|>${DIFFICULTY}<|" \
  "$TEMPLATE" > "$TARGET"

echo "✓ Created $TARGET"
echo ""

# Print tri-point registration snippets for the agent/TA to paste
cat <<EOF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Tri-Point Registration — apply these three edits before shipping:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣  assets/js/lab-common.js — extend MODULE_TREE_DATA (mod01.labs):

    { id: 'lab${LAB_NUMBER}', name: 'Lab ${LAB_NUMBER}: ${LAB_TITLE}', href: 'labs/lab${LAB_NUMBER}.html', time: '${TIME_ESTIMATE}' }

2️⃣  assets/js/site.js — append to searchCatalog:

    { title: 'Lab ${LAB_NUMBER}: ${LAB_TITLE}', desc: '[TA: 1-line summary]', url: 'labs/lab${LAB_NUMBER}.html', tag: 'Lab' }

3️⃣  index.html — add a .bento-card in the modules bento-grid.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Next steps (Lab Generator Skill workflow):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Fill section content per the outline (see .agents/skills/lab-generator/SKILL.md)
• Add .qr-jump at top of <main class="main-content"> — see .agents/skills/attention-design/SKILL.md
• Apply tri-layer pedagogy per section (entry-check → core → stretch)
• Add prediction prompts every 5–7 min (.prediction-prompt)
• Use .info-dense-card wherever 4+ same-shape bullets appear
• Auto-sync: extract commands/tools to cheatsheets.html and tools.html
• Verify: grep -n '{{' $TARGET   (should return 0 unresolved tokens)
• Verify: all <h2>/<h3> have stable kebab-case id attributes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EOF

echo ""
echo "▸ To open in your default editor:"
echo "  code $TARGET       # VS Code"
echo "  \$EDITOR $TARGET     # your \$EDITOR"
echo ""
