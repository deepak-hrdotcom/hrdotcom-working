---
name: redesigning-webcast-emailers
description: Redesigns a pasted HR.com webcast emailer (webcast-emailer-redesign/input.html) into a visibly different, responsive, dark-mode-friendly, cross-client layout with zero text/link/image changes (Step 1), then updates only the preheader, intro paragraphs and key learnings from a pasted JSON copywriting prompt and returns 10 subject lines in chat (Step 2). Use when the user mentions redesigning an emailer for a repeat/2nd/3rd push, input.html, redesigned.html, or pastes the HR.com JSON copywriting prompt.
---

# Redesigning Webcast Emailers (pointer)

The full skill lives in the repo-root folder `webcast-emailer-redesign/`.

1. Read [`webcast-emailer-redesign/SKILL.md`](../../../webcast-emailer-redesign/SKILL.md) in full and follow it exactly. It is the single source of truth; this file only registers the skill.
2. Copy-paste prompts for chats outside this workspace: [`webcast-emailer-redesign/PROMPT.md`](../../../webcast-emailer-redesign/PROMPT.md).
3. Verifier: `node webcast-emailer-redesign/scripts/verify-emailer.mjs <original.html> <candidate.html> [--allow-text-changes]`.
