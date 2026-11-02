# Copy-paste prompts (use in any AQ chat)

These prompts make any AQ chat (inside or outside this workspace) load and follow
[`SKILL.md`](SKILL.md). Paste the HTML into `webcast-emailer-redesign/input.html`
in that chat's workspace (or paste it into the chat), then send the prompts in order.

---

## Step 1 prompt (redesign)

```
Use the GitHub repository deepak-hrdotcom/hrdotcom-working (branch main).
Read webcast-emailer-redesign/SKILL.md in full and follow it exactly. This is STEP 1 (Redesign).

My emailer HTML is in webcast-emailer-redesign/input.html.
(If I pasted the HTML in this chat instead, write it into that file exactly as pasted, without reformatting, before starting.)

Redesign it into webcast-emailer-redesign/redesigned.html:
- Keep ALL text and ALL links exactly as they are. Strictly no text edits, additions, deletions, modifications, rewording or hallucinations, including alt text, button labels, preheader, credits and footer.
- Keep every image (same src and alt) and the same section order.
- Before designing, ask me whether to use the same brand colours and fonts as my HTML, or pick them up from a URL I'll give you. If I choose the URL, show me the colours and fonts you found and wait for my confirmation.
- The layout must look visibly different from the original (this is a repeat push to the same audience).
- Must be responsive, dark-theme friendly, and open correctly in most email platforms (Gmail, Outlook desktop/web/app, Apple Mail, Yahoo, mobile).
- Never edit input.html.
- Run webcast-emailer-redesign/scripts/verify-emailer.mjs as SKILL.md says and only report done when it prints RESULT: PASS.
- Don't commit, push, install anything or start a server.

If anything is unclear or missing, ask me. Don't assume.
```

---

## Step 2 prompt (copy update)

Paste this line first, then your full HR.com JSON copywriting prompt directly underneath it:

```
Use the GitHub repository deepak-hrdotcom/hrdotcom-working (branch main).
Read webcast-emailer-redesign/SKILL.md in full and follow it exactly. This is STEP 2 (Copy update).

Generate the copy from the JSON prompt below, following every rule in it. Then, in webcast-emailer-redesign/redesigned.html, update ONLY:
1) the hidden preheader text, 2) the two intro paragraphs, 3) the four key learning points.
Do not touch anything else in the file: no subject lines, title, links, logo, speaker, credits, footer or styling.
Back up the file and run the verifier as SKILL.md says.
In your reply give me: the 10 subject lines (chat only, never in any file) plus an Old vs New table of what you changed. No full JSON.
Don't commit or push. If anything is unclear or doesn't map 1:1 (e.g. the email doesn't have exactly 2 intro paragraphs or 4 learnings), ask me. Don't assume.

--- JSON PROMPT ---
<paste the full HR.com JSON copywriting prompt here>
```
