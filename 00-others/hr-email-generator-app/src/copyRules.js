// Copywriting rules per event type. Shared by Manual mode (Gemini prompt) and the
// Create Emailer wizard (Claude Code). Edit here to change both.
const RULES = {
  demo: `Copywriting Guidelines for DEMO Webcast (Visual walkthrough & capabilities focus):
1. SUBJECT LINE: Act as a senior B2B email content strategist and high-converting copywriter. Create EXACTLY 10 different subject line options. Format as an ordered list (1., 2., 3., 4., 5., 6., 7., 8., 9., 10.) separated by newlines (\\n) inside the single "subject" JSON string.
Best Practices & Rules for the 10 Subject Line Options:
- Title & Topic Alignment: Every option MUST closely align with and incorporate the specific Webcast Title, core theme, and key topic/keywords. The subscriber must immediately recognize what specific subject this webcast covers—never output generic or disconnected advice.
- Compelling Curiosity & Urgency: Re-frame the webcast title and description details into irresistible hooks that trigger immediate curiosity, operational urgency, or professional interest to drive maximum open rates.
- Diversity Across 10 Options: Provide a balanced mix across the 10 options:
  * 2-3 Urgent Pain Point / Risk Hooks (addressing the key operational challenge in title/desc)
  * 2-3 Actionable How-To / Solution Hooks (highlighting the product walkthrough & capabilities)
  * 2 Curiosity Question Hooks (provoking reflection directly tied to the title)
  * 2 Strategic / High-Impact Benefit Hooks (unlocking efficiency or workflow gains)
- Length & Mobile Optimization: Keep each option punchy, ideally 40-55 chars (max 60 chars) so it never truncates on mobile screens.
- Mechanics: Use conversational second-person ('you', 'your'). Title Case or Sentence Case cleanly.
- Question Mark Rule: EVERY subject line option that is a question (e.g., starts with Is, Are, Why, How, Can, Do, Does, Should, Would, What, etc.) MUST ALWAYS end with a question mark (?). Never omit the question mark.
- Strict Exclusions: NO colons (:). NO dates or time hooks (do NOT use "June 23", "this Wednesday", "tomorrow", etc.). NO spammy hype (no ALL-CAPS words, no fake RE:/FWD:).

2. PREHEADER: Max 90 chars. Focus on visual proof, time-saving, or ease-of-use. End with soft urgency (e.g., 'register for walkthrough').
3. INTRO PARAGRAPHS: Exactly TWO distinct paragraphs separated by double newlines (\\n\\n), created strictly based on the provided webcast title and description data. Paragraph 1 (Problem) must hook the reader with the specific operational/business challenge identified in the webcast description. Paragraph 2 (Solution) must present the product demo/walkthrough as the direct solution to overcome that challenge. Total combined length 350 to 500 characters max.
4. KEY LEARNINGS (Exactly 4 points):
   - You MUST base these points strictly on the "Raw Takeaways/Learnings" provided above.
   - If the raw data has 1 point, expand/derive exactly 4 distinct, punchy takeaway sentences from it.
   - Frame these as feature demonstrations or walkthrough highlights (e.g., "See a detailed walkthrough of...", "Learn how to easily automate...", "Explore key features for...").
   - Each point must be a short, single sentence of 6-10 words max.
   - Start with an action verb. Focus on driving registrations by creating curiosity.`,

  ondemand: `Copywriting Guidelines for ON-DEMAND Webcast (Immediate convenient access focus):
1. SUBJECT LINE: Act as a senior B2B email content strategist and high-converting copywriter. Create EXACTLY 10 different subject line options. Format as an ordered list (1., 2., 3., 4., 5., 6., 7., 8., 9., 10.) separated by newlines (\\n) inside the single "subject" JSON string.
Best Practices & Rules for the 10 Subject Line Options:
- Title & Topic Alignment: Every option MUST closely align with and incorporate the specific Webcast Title, core theme, and key topic/keywords. The subscriber must immediately recognize what specific subject this webcast covers—never output generic or disconnected advice.
- Compelling Curiosity & Urgency: Re-frame the webcast title and description details into irresistible hooks that trigger immediate curiosity, emotional resonance, or professional urgency to drive maximum open rates.
- Diversity Across 10 Options: Provide a balanced mix across the 10 options:
  * 2-3 Urgent Pain Point / Risk Hooks (addressing the key challenge in title/desc)
  * 2-3 Actionable How-To / Solution Hooks (promising convenient, instant solution)
  * 2 Curiosity Question Hooks (provoking reflection directly tied to the title)
  * 2 Strategic / High-Impact Benefit Hooks (unlocking leadership or productivity gains)
- Length & Mobile Optimization: Keep each option punchy, ideally 40-55 chars (max 60 chars) so it never truncates on mobile screens.
- Mechanics: Use conversational second-person ('you', 'your'). Title Case or Sentence Case cleanly.
- Question Mark Rule: EVERY subject line option that is a question (e.g., starts with Is, Are, Why, How, Can, Do, Does, Should, Would, What, etc.) MUST ALWAYS end with a question mark (?). Never omit the question mark.
- Strict Exclusions: NO colons (:). NO live dates or upcoming time hooks (do NOT use "this Wednesday", "tomorrow", "[Jun 23]", or specific dates). NEVER include the words "ondemand", "on-demand", or "on demand" (or their capitalizations). NO spammy hype.

2. PREHEADER: Max 90 chars. Focus on instant learning on their own schedule. End with soft urgency (e.g., 'watch now free').
3. INTRO PARAGRAPHS: Exactly TWO distinct paragraphs separated by double newlines (\\n\\n), created strictly based on the provided webcast title and description data. Paragraph 1 (Problem) must hook the reader with the specific business or HR challenge/pain point identified in the webcast description. Paragraph 2 (Solution) must present the webcast content as the direct solution. Total combined length 350 to 500 characters max. You MUST NEVER include the words "ondemand", "on-demand", "on demand", "recorded session", "recorded webcast", "recording", "watch this recorded session" (or their variations/capitalizations) in these paragraphs.
4. KEY LEARNINGS (Exactly 4 points):
   - You MUST base these points strictly on the "Raw Takeaways/Learnings" provided above.
   - If the raw data has 1 point, expand/derive exactly 4 distinct, punchy takeaway sentences from it.
   - Frame these as "What you will discover:" or "Key takeaways you will unlock:".
   - Each point must be a short, single sentence of 6-10 words max.
   - Start with an action verb or active noun. Focus on driving registrations by creating high curiosity.`,

  standalone: `Copywriting Guidelines for STANDALONE Webcast (Educational event focus):
1. SUBJECT LINE: Act as a senior B2B email content strategist and high-converting copywriter. Create EXACTLY 10 different subject line options. Format as an ordered list (1., 2., 3., 4., 5., 6., 7., 8., 9., 10.) separated by newlines (\\n) inside the single "subject" JSON string.
Best Practices & Rules for the 10 Subject Line Options:
- Title & Topic Alignment: Every option MUST closely align with and incorporate the specific Webcast Title, core theme, and key topic/keywords. The subscriber must immediately recognize what specific subject this webcast covers—never output generic or disconnected advice.
- Compelling Curiosity & Urgency: Re-frame the webcast title and description details into irresistible hooks that trigger immediate curiosity, professional urgency, or emotional resonance to drive maximum open rates.
- Diversity Across 10 Options: Provide a balanced mix across the 10 options:
  * 2-3 Urgent Pain Point / Risk Hooks (addressing the key challenge in title/desc)
  * 2-3 Actionable How-To / Solution Hooks (promising practical learning & outcomes)
  * 2 Curiosity Question Hooks (provoking professional reflection tied to the title)
  * 2 Strategic / High-Impact Benefit Hooks (unlocking HR or business advantages)
- Length & Mobile Optimization: Keep each option punchy, ideally 40-55 chars (max 60 chars) so it never truncates on mobile screens.
- Mechanics: Use conversational second-person ('you', 'your'). Title Case or Sentence Case cleanly.
- Question Mark Rule: EVERY subject line option that is a question (e.g., starts with Is, Are, Why, How, Can, Do, Does, Should, Would, What, etc.) MUST ALWAYS end with a question mark (?). Never omit the question mark.
- Strict Exclusions: NO colons (:). NO dates or time hooks (do NOT use "June 23", "this Wednesday", "tomorrow", etc.). NO spammy hype (no ALL-CAPS words, no fake RE:/FWD:).

2. PREHEADER: Max 90 chars. Complements subject, never repeats it. End with soft urgency (e.g., 'register now').
3. INTRO PARAGRAPHS: Exactly TWO distinct paragraphs separated by double newlines (\\n\\n), created strictly based on the provided webcast title and description data. Paragraph 1 (Problem) must hook the reader with the specific business or HR challenge/pain point identified in the webcast description. Paragraph 2 (Solution) must present the webcast content as the direct solution to solve that problem. Total combined length 350 to 500 characters max.
4. KEY LEARNINGS (Exactly 4 points):
   - You MUST base these points strictly on the "Raw Takeaways/Learnings" provided above.
   - If the raw data has 1 point, expand/derive exactly 4 distinct, punchy takeaway sentences from it.
   - Each point must be a short, single sentence of 6-10 words max.
   - Start with an action verb or active noun. Focus on driving registrations by creating curiosity.`,

  virtual: `Copywriting Guidelines for VIRTUAL EVENT Webcast (Full-day pass & broader event context):
1. SUBJECT LINE: Act as a senior B2B email content strategist and high-converting copywriter. Create EXACTLY 10 different subject line options. Format as an ordered list (1., 2., 3., 4., 5., 6., 7., 8., 9., 10.) separated by newlines (\\n) inside the single "subject" JSON string.
Best Practices & Rules for the 10 Subject Line Options:
- Title & Topic Alignment: Every option MUST closely align with and incorporate the specific Webcast Title, core theme, and key topic/keywords. The subscriber must immediately recognize what specific subject this webcast covers—never output generic advice or vague event mentions. DO NOT use generic phrases like 'at our event', 'attend our event', or the virtual event name.
- Compelling Curiosity & Urgency: Re-frame the session topic and description details into irresistible hooks that trigger high curiosity, professional urgency, or deep interest to drive maximum open rates.
- Diversity Across 10 Options: Provide a balanced mix across the 10 options:
  * 2-3 Urgent Pain Point / Risk Hooks (addressing the key session challenge in title/desc)
  * 2-3 Actionable How-To / Solution Hooks (highlighting session learning & practical strategies)
  * 2 Curiosity Question Hooks (provoking professional reflection tied to the title)
  * 2 Strategic / High-Impact Benefit Hooks (unlocking HR or leadership gains)
- Length & Mobile Optimization: Keep each option punchy, ideally 40-55 chars (max 60 chars) so it never truncates on mobile screens.
- Mechanics: Use conversational second-person ('you', 'your'). Title Case or Sentence Case cleanly.
- Question Mark Rule: EVERY subject line option that is a question (e.g., starts with Is, Are, Why, How, Can, Do, Does, Should, Would, What, etc.) MUST ALWAYS end with a question mark (?). Never omit the question mark.
- Strict Exclusions: NO colons (:). NO dates or time hooks (do NOT use "June 23", "this Wednesday", "tomorrow", etc.). NO spammy hype.

2. PREHEADER: Max 90 chars. Mention that the full-day virtual event is free. End with soft urgency (e.g., 'get your free pass').
3. INTRO PARAGRAPHS: Exactly TWO distinct paragraphs separated by double newlines (\\n\\n), created strictly based on the provided webcast title and description data. Paragraph 1 (Problem) must outline the specific business/HR challenge identified in the webcast description. Paragraph 2 (Solution) must present the webcast session content and solution. Total combined length 350 to 500 characters max. DO NOT include generic event details or invitations like 'attend this event', 'join us for this virtual event', or registration call-to-actions, keeping the tone educational and compelling.
4. KEY LEARNINGS (Exactly 4 points):
   - You MUST base these points strictly on the "Raw Takeaways/Learnings" provided above.
   - If the raw data has 1 point, expand/derive exactly 4 distinct, punchy takeaway sentences from it.
   - Frame these as "Key session highlights you'll experience:".
   - Each point must be a short, single sentence of 6-10 words max.
   - Start with an action verb or active noun. Focus on driving registrations by creating excitement for the whole virtual event.`
};

// Applies to every event type and every piece of copy
const NO_LIVE = '\n\nWORD RULE (subject lines, preheader, intro and learnings): never use the word "live" or any form of it (livestream, live session, join live, go live). Describe the session without it.';

export const COPY_RULES = Object.fromEntries(Object.entries(RULES).map(([k, v]) => [k, v + NO_LIVE]));

