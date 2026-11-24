import React, { useState, useMemo, useEffect } from 'react';
import { TEMPLATES } from './templates';
import { COPY_RULES } from './copyRules';
import { cleanUrl, renderEmail } from './render';

const lS = { 
  display: 'block', 
  fontSize: '11px', 
  fontWeight: '700', 
  color: '#475569', 
  marginTop: '16px', 
  textTransform: 'uppercase', 
  letterSpacing: '0.5px',
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

const iS = { 
  width: '100%', 
  padding: '10px 12px', 
  border: '1px solid #cbd5e1', 
  borderRadius: '8px', 
  marginTop: '6px', 
  boxSizing: 'border-box', 
  fontSize: '13px',
  fontFamily: "'Inter', sans-serif",
  color: '#1e293b',
  backgroundColor: '#ffffff',
  outline: 'none'
};

const btnStyle = { 
  width: '100%', 
  padding: '14px', 
  background: 'linear-gradient(135deg, #02588E 0%, #01436d 100%)', 
  color: '#fff', 
  border: 'none', 
  marginTop: '24px', 
  fontWeight: '700', 
  fontSize: '14px',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  borderRadius: '10px', 
  cursor: 'pointer',
  boxShadow: '0 4px 14px rgba(2, 88, 142, 0.25)'
};

const rmBtn = { 
  position: 'absolute', 
  right: '0', 
  top: '-6px', 
  background: '#fee2e2', 
  color: '#b91c1c', 
  border: 'none', 
  padding: '3px 8px', 
  fontSize: '10px', 
  borderRadius: '6px', 
  cursor: 'pointer', 
  fontWeight: '700',
  fontFamily: "'Plus Jakarta Sans', sans-serif"
};

export default function App() {
  const [activeTab, setActiveTab] = useState('demo');
  const [activeVariant, setActiveVariant] = useState(0);

  // Reset variant when event type changes
  useEffect(() => {
    setActiveVariant(0);
  }, [activeTab]);
  const [fields, setFields] = useState({
    subject: "",
    preheader: "",
    logo: "", 
    logoAlt: "",
    logoHeight: "40",
    title: "",
    dateTime: "",
    intro: "",
    learn1: "",
    learn2: "",
    learn3: "",
    learn4: "",
    badge: "",
    apShortcode: "",
    veName: "",
    veShortcode: "",
    creditValue: "1 HR Credit",
    showCredits: true, 
    hosts: [{ name: "", title: "", image: "", alt: "" }]
  });

  // AI Assistant Local States
  const [aiTitle, setAiTitle] = useState('');
  const [aiDesc, setAiDesc] = useState('');
  const [aiLearnings, setAiLearnings] = useState(["", "", "", ""]);
  const [aiHostsList, setAiHostsList] = useState([{ name: "", title: "", image: "" }]);
  const [aiResponse, setAiResponse] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Dynamic user-specified metadata states
  const [aiSponsorLogo, setAiSponsorLogo] = useState('');
  const [aiSponsorName, setAiSponsorName] = useState('');
  const [aiDateTime, setAiDateTime] = useState('');
  const [aiApShortcode, setAiApShortcode] = useState('');
  const [aiVeName, setAiVeName] = useState('');
  const [aiVeShortcode, setAiVeShortcode] = useState('');
  const [aiCredit, setAiCredit] = useState('');

  // Webcast page import (from the "Grab Webcast" bookmarklet)
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importMsg, setImportMsg] = useState(null);

  const cleanDescription = (text) => {
    if (!text) return "";
    return text
      .replace(/By registering for this webcast you will receive email communications.*/gi, "")
      .replace(/Sponsored by:.*/gi, "")
      .replace(/About the presenters:.*/gi, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 4000); // Full webcast descriptions from the bookmarklet run ~2,000+ chars
  };

  const buildPrompt = (tab, titleVal, descVal, learningsList, hostsList, sponsorLogoVal, sponsorNameVal, dateTimeVal, apShortcodeVal, veNameVal, veShortcodeVal, creditVal) => {
    const cleanDesc = cleanDescription(descVal);
    const hostsFormatted = Array.isArray(hostsList) ? hostsList
      .map((h, idx) => `Host #${idx + 1}:\n  - Name: ${h.name || 'N/A'}\n  - Image URL: ${h.image || 'N/A'}\n  - Designation: ${h.title || 'N/A'}`)
      .join('\n\n') : 'N/A';
    const learningsFormatted = Array.isArray(learningsList) ? learningsList
      .map(l => l.trim())
      .filter(l => l !== "")
      .map((l, idx) => `${idx + 1}. ${l}`)
      .join('\n') : 'N/A';
    
    let templateInstructions = "";
    let copywritingInstructions = "";
    
    if (tab === 'demo') {
      templateInstructions = `This is for a DEMO Webcast. You must extract and generate:
   - "logo": Extract the sponsor logo image URL from the sponsors list.
   - "logoAlt": Extract the sponsor name for the alt text.
   - "title": Extract the webcast title (if not already provided in Webcast Title).
   - "dateTime": Extract the webcast date and time string (e.g. "May 27, 2026 at 2:30 PM - 3:30 PM ET").
   - "apShortcode": Extract the AP shortcode (e.g. https://web.hr.com/xxxxx) that leads to the webcast more-info page. All CTA buttons use it.
   - "creditValue": "N/A" (or keep as default).
   - "showCredits": false (demo webcasts do not qualify for HRCI/SHRM credits).
   - "veName": Extract the parent Virtual Event name if applicable (e.g., "HR Demo Day #3"), or "" if not part of a virtual event.
   - "veShortcode": Extract the Virtual Event URL or shortcode if applicable, or "" if not part of a virtual event.`;

      copywritingInstructions = COPY_RULES.demo;

    } else if (tab === 'ondemand') {
      templateInstructions = `This is for an ON-DEMAND Webcast. You must extract and generate:
   - "logo": Extract the sponsor logo image URL from the sponsors list.
   - "logoAlt": Extract the sponsor name.
   - "title": Extract the webcast title (if not already provided in Webcast Title).
   - "dateTime": Set to "" (live date is not used for on-demand webcasts).
   - "apShortcode": Extract the On-Demand link.
   - "creditValue": Extract recertification credit value if mentioned.
   - "showCredits": true or false depending on credit details.
   - "veName": "" (not applicable).
   - "veShortcode": "" (not applicable).`;

      copywritingInstructions = COPY_RULES.ondemand;

    } else if (tab === 'standalone') {
      templateInstructions = `This is for a STANDALONE Webcast. You must extract and generate:
   - "logo": Extract the sponsor logo image URL.
   - "logoAlt": Extract the sponsor name.
   - "title": Extract the webcast title (if not already provided in Webcast Title).
   - "dateTime": Extract the webcast date and time (e.g., "June 4, 2026 at 1:00 PM - 2:00 PM ET").
   - "apShortcode": Extract the AP shortcode (e.g. https://web.hr.com/xxxxx) that leads to the webcast more-info page. All CTA buttons use it.
   - "creditValue": Extract the recertification credit text (e.g., "1 HRCI / 1 SHRM Credit").
   - "showCredits": true.
   - "veName": "" (not applicable).
   - "veShortcode": "" (not applicable).`;

      copywritingInstructions = COPY_RULES.standalone;

    } else if (tab === 'virtual') {
      templateInstructions = `This is for a VIRTUAL EVENT Webcast. You must extract and generate:
   - "logo": Extract the sponsor logo image URL.
   - "logoAlt": Extract the sponsor name.
   - "title": Extract the webcast title (if not already provided in Webcast Title).
   - "dateTime": Extract the live event date and time.
   - "apShortcode": Extract the AP shortcode (e.g. https://web.hr.com/xxxxx) that leads to the webcast more-info page. All CTA buttons use it.
   - "veName": Extract the parent Virtual Event name (e.g., "State of Todays HR Tech and Integrations").
   - "veShortcode": Extract the Virtual Event registration link.
   - "creditValue": Extract the credit text.
   - "showCredits": true.`;

      copywritingInstructions = COPY_RULES.virtual;
    }

    let userMetadataInstructions = "";
    if (sponsorLogoVal || sponsorNameVal || dateTimeVal || apShortcodeVal || veNameVal || veShortcodeVal || creditVal) {
      userMetadataInstructions = `
---
CRITICAL - USER-SPECIFIED METADATA (PRIORITIZE THESE VALUES):
The user has explicitly provided the following metadata. You MUST output these exact values in the corresponding JSON fields as-is (do not invent or extract different values if these are present):
${sponsorLogoVal ? `- For "logo": "${sponsorLogoVal}"` : ""}
${sponsorNameVal ? `- For "logoAlt": "${sponsorNameVal}"` : ""}
${dateTimeVal ? `- For "dateTime": "${dateTimeVal}"` : ""}
${apShortcodeVal ? `- For "apShortcode": "${apShortcodeVal}"` : ""}
${veNameVal ? `- For "veName": "${veNameVal}"` : ""}
${veShortcodeVal ? `- For "veShortcode": "${veShortcodeVal}"` : ""}
${creditVal ? `- For "creditValue": "${creditVal}" (And set "showCredits": true)` : ""}
`;
    }

    return `Act as a premium, B2B email copywriter and HTML data parser for HR.com.
You must analyze the provided details and perform two tasks:
1. Write high-converting promotional copy (EXACTLY 10 Subject Line options anchored to Webcast Title with high urgency/curiosity, Preheader, 2 Intro Paragraphs [Problem & Solution], and exactly 4 Key Learnings).
2. Parse and extract all webcast variables and presenter/host details from the webcast description/extractor data.

Webcast Title: ${titleVal || 'N/A'}
Webcast Description/Extractor Data: ${cleanDesc}

---
Raw Takeaways/Learnings pasted by the user:
${learningsFormatted || 'N/A'}

---
Hosts/Presenters provided by the user:
${hostsFormatted}

${userMetadataInstructions}

---
${copywritingInstructions}

5. HOSTS / PRESENTERS:
   - Use the exact hosts/presenters listed in the "Hosts/Presenters provided by the user" section.
   - For each host, map their exact Name, Designation, and Image URL into the JSON output's hosts array.
   - If no image URL is provided, keep it blank ("").

---
Template-Specific Variables Extraction:
${templateInstructions}

---
CRITICAL JSON OUTPUT CONSTRAINTS (MUST FOLLOW):
- CRITICAL COPYWRITING RULE: In the "introParagraph" (which MUST contain 2 paragraphs separated by double newlines \n\n: Para 1 for Problem, Para 2 for Solution) and all "keyLearnings" points, you MUST NEVER use the words "live" or "free" (or any of their variations like "Live", "FREE", "Free", "live-stream", etc.). Find alternative phrasing such as "complimentary", "no-cost", "interactive", "real-time", or simply omit them. Additionally, for ON-DEMAND webcasts, you MUST NEVER include the words "ondemand", "on-demand", or "on demand" (or any of their variations/capitalizations), nor any references to "recorded session", "recording", "recorded webcast", "watch this recorded session" or similar in the "subject" or "introParagraph" fields. Just outline the business/HR problem and the webcast as the solution.
- You MUST return all keys listed in the JSON structure below.
- DO NOT omit any keys, do not leave keys out of the JSON, and do not return null.
- If a user input or value is empty, missing, not found in the description, or not applicable for the selected template (e.g. dateTime for On-Demand, or veName/veShortcode for non-virtual templates), you MUST still output the key and set its value to an empty string "" (or false for showCredits, or an empty array [] for hosts if there are absolutely no hosts).
- NEVER wrap any URLs, image paths, or string values in brackets [], parentheses (), or markdown link formatting. All URLs and images MUST be clean, raw plain-text strings (e.g., "https://public-cdn.hr.com/system/app/media/rs/2025/10/16/mgtmdfzw/120.jpg", NOT "[https://public-cdn.hr.com/system/app/media/rs/2025/10/16/mgtmdfzw/120.jpg]"). NEVER convert URLs into Google Search links or redirect links. Output the exact raw URL provided (e.g. "https://web.hr.com/eobib").
- NEVER output placeholder text like "[Logo Image URL]", "[Subject here]", etc. If you don't have a value or generated copy, output an empty string "" instead.
- Do not wrap the JSON in \`\`\`json or \`\`\` blocks, just return raw JSON text.

Generate EXACTLY this JSON structure:

{
  "subject": "",
  "preheader": "",
  "logo": "",
  "logoAlt": "",
  "title": "",
  "dateTime": "",
  "introParagraph": "Paragraph 1 (Problem)\\n\\nParagraph 2 (Solution)",
  "keyLearnings": [
    "",
    "",
    "",
    ""
  ],
  "apShortcode": "",
  "veName": "",
  "veShortcode": "",
  "creditValue": "",
  "showCredits": true,
  "hosts": [
    {
      "name": "",
      "title": "",
      "image": ""
    }
  ]
}`;
  };

  const handleCopyPrompt = () => {
    const hasHostsInput = Array.isArray(aiHostsList) && aiHostsList.some(h => h.name || h.image || h.title);
    const hasLearningsInput = Array.isArray(aiLearnings) && aiLearnings.some(l => l.trim() !== "");
    if (!aiDesc && !hasLearningsInput && !hasHostsInput && !aiSponsorLogo && !aiSponsorName && !aiDateTime && !aiApShortcode && !aiVeName && !aiVeShortcode && !aiCredit) {
      alert("Please enter webcast details or paste description first!");
      return;
    }
    const prompt = buildPrompt(
      activeTab, 
      aiTitle, 
      aiDesc, 
      aiLearnings, 
      aiHostsList,
      aiSponsorLogo,
      aiSponsorName,
      aiDateTime,
      aiApShortcode,
      aiVeName,
      aiVeShortcode,
      aiCredit
    );
    navigator.clipboard.writeText(prompt).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch(err => {
      alert("Failed to copy. Please select and copy manually.");
    });
  };

  const handleApplyAiResponse = () => {
    if (!aiResponse) {
      alert("Please paste the Gemini response first!");
      return;
    }

    try {
      const cleanText = aiResponse.trim();
      const start = cleanText.indexOf('{');
      const end = cleanText.lastIndexOf('}');
      if (start === -1 || end === -1) {
        throw new Error("No valid JSON structure found in the response.");
      }
      const jsonString = cleanText.substring(start, end + 1);
      const data = JSON.parse(jsonString);

      const keyLearnings = Array.isArray(data.keyLearnings) ? data.keyLearnings : [];
      const hosts = Array.isArray(data.hosts) ? data.hosts : [];

      const removeProhibitedWords = (str) => {
        if (!str || typeof str !== 'string') return str || "";
        return str
          .replace(/\bfree\b/gi, "")
          .replace(/\blive\b/gi, "")
          .replace(/[ \t]+/g, " ")
          .replace(/\n\s*\n/g, "\n\n")
          .trim();
      };

      const formatSubjectLines = (rawSubject) => {
        if (!rawSubject || typeof rawSubject !== 'string') return "";
        const lines = rawSubject
          .replace(/(?:\s+)?(\d+\.)\s*/g, '\n$1 ')
          .split('\n')
          .map(l => l.trim())
          .filter(Boolean);

        const questionWordsRegex = /^(?:\d+\.\s*)?(?:Is|Are|Why|How|Can|Do|Does|Should|Would|What|Which|Who|Where|When|Could|Has|Have|Will)\b/i;

        const formatted = lines.map(line => {
          if (!line) return line;
          if (questionWordsRegex.test(line)) {
            if (!line.endsWith('?')) {
              line = line.replace(/[\.\s]+$/, '') + '?';
            }
          }
          return line;
        });

        return formatted.join('\n');
      };

      setFields(prev => ({
        ...prev,
        subject: formatSubjectLines(data.subject || prev.subject || ""),
        preheader: data.preheader || prev.preheader || "",
        logo: cleanUrl(data.logo) || prev.logo || "",
        logoAlt: data.logoAlt || prev.logoAlt || "",
        title: data.title || prev.title || "",
        dateTime: (data.dateTime !== undefined && activeTab !== 'ondemand') ? (data.dateTime || prev.dateTime || "") : (prev.dateTime || ""),
        intro: removeProhibitedWords(data.introParagraph || prev.intro || ""),
        learn1: removeProhibitedWords(keyLearnings[0] || prev.learn1 || ""),
        learn2: removeProhibitedWords(keyLearnings[1] || prev.learn2 || ""),
        learn3: removeProhibitedWords(keyLearnings[2] || prev.learn3 || ""),
        learn4: removeProhibitedWords(keyLearnings[3] || prev.learn4 || ""),
        apShortcode: cleanUrl(data.apShortcode) || prev.apShortcode || "",
        veName: data.veName || prev.veName || "",
        veShortcode: cleanUrl(data.veShortcode) || prev.veShortcode || "",
        creditValue: data.creditValue || prev.creditValue || "",
        showCredits: data.showCredits !== undefined ? data.showCredits : prev.showCredits,
        hosts: hosts.length > 0 ? hosts.map(h => ({
          name: h.name || "",
          title: h.title || "",
          image: cleanUrl(h.image) || "",
          alt: h.name || ""
        })) : prev.hosts
      }));

      // Set the main title too if the user hasn't set one yet
      if (aiTitle && !fields.title) {
        setFields(prev => ({ ...prev, title: aiTitle }));
      } else if (data.title && !fields.title) {
        setFields(prev => ({ ...prev, title: data.title }));
      }

      setAiResponse('');
      alert("All email fields successfully auto-filled! 🎉 Check and customize the fields below.");
    } catch (err) {
      alert("Parser Error: " + err.message);
    }
  };

  // Fill the assistant inputs and the factual email fields from bookmarklet data.
  // Treated as starting a new email, so copy from any previous webcast is cleared.
  const applyWebcastImport = (data) => {
    if (!data || data.__hrEmailImport !== 1) {
      throw new Error("That doesn't look like data from the Grab Webcast bookmarklet.");
    }
    const learnings = (Array.isArray(data.learnings) ? data.learnings : []).slice(0, 4);
    while (learnings.length < 4) learnings.push('');
    const hosts = (Array.isArray(data.hosts) ? data.hosts : []).slice(0, 5).map(h => ({
      name: h.name || '',
      title: h.title || '',
      image: cleanUrl(h.image) || ''
    }));
    const eventType = TEMPLATES[data.eventType] ? data.eventType : activeTab;
    const creditValue = data.creditValue || '';
    const veUrl = cleanUrl(data.veUrl) || '';

    if (eventType !== activeTab) setActiveTab(eventType);

    setAiTitle(data.title || '');
    setAiDateTime(eventType === 'ondemand' ? '' : (data.dateTime || ''));
    setAiSponsorLogo(cleanUrl(data.sponsorLogo) || '');
    setAiSponsorName(data.sponsorName || '');
    setAiLearnings(learnings);
    setAiHostsList(hosts.length ? hosts : [{ name: '', title: '', image: '' }]);
    setAiDesc(data.description || '');
    setAiCredit(creditValue);
    setAiApShortcode('');
    setAiVeName('');
    setAiVeShortcode(veUrl);
    setAiResponse('');

    setFields(prev => ({
      ...prev,
      subject: '',
      preheader: '',
      logo: cleanUrl(data.sponsorLogo) || '',
      logoAlt: data.sponsorName || '',
      title: data.title || '',
      dateTime: eventType === 'ondemand' ? '' : (data.dateTime || ''),
      intro: '',
      learn1: learnings[0],
      learn2: learnings[1],
      learn3: learnings[2],
      learn4: learnings[3],
      apShortcode: '',
      veName: '',
      veShortcode: veUrl,
      creditValue: creditValue || prev.creditValue,
      showCredits: !!creditValue,
      hosts: hosts.length ? hosts.map(h => ({ ...h, alt: h.name })) : [{ name: '', title: '', image: '', alt: '' }]
    }));

    const missing = Array.isArray(data.missing) && data.missing.length ? ` Missing: ${data.missing.join(', ')}.` : '';
    const learnCount = learnings.filter(Boolean).length;
    const hasVE = eventType === 'virtual' || eventType === 'demo';
    const veNote = hasVE
      ? (veUrl
        ? ' Event link set to the event page; add the Virtual Event name and, if you track it, swap in the event promo shortcode from the flowchart sheet.'
        : ' Add the Virtual Event name and link from the flowchart sheet.')
      : '';
    return `Imported "${data.title || 'Untitled'}" as ${TEMPLATES[eventType].name}: ${hosts.length} host(s), ${learnCount} learning(s)${creditValue ? `, ${creditValue}` : ', no credits'}.${missing} Add the AP shortcode from the flowchart sheet.${veNote} Then copy the Gemini prompt.`;
  };

  const importFromText = (text) => {
    try {
      const start = (text || '').indexOf('{');
      const end = (text || '').lastIndexOf('}');
      if (start === -1 || end === -1) {
        throw new Error("No webcast data found. Click Grab Webcast on the webcast page first.");
      }
      const summary = applyWebcastImport(JSON.parse(text.substring(start, end + 1)));
      setImportMsg({ type: 'ok', text: summary });
      setImportText('');
      setShowImportBox(false);
    } catch (err) {
      setImportMsg({ type: 'error', text: err.message });
    }
  };

  const handleClipboardImport = async () => {
    try {
      const text = await navigator.clipboard.readText();
      importFromText(text);
    } catch {
      setShowImportBox(true);
      setImportMsg({ type: 'error', text: "Couldn't read the clipboard. Paste the copied data into the box below instead." });
    }
  };

  const finalHtml = useMemo(() => renderEmail(TEMPLATES[activeTab].variants[activeVariant], fields), [fields, activeTab, activeVariant]);

  const updateHost = (i, key, val) => {
    const n = [...fields.hosts];
    n[i][key] = val;
    setFields({...fields, hosts: n});
  };

  const removeHost = (i) => {
    if (fields.hosts.length > 1) {
      setFields({...fields, hosts: fields.hosts.filter((_, idx) => idx !== i)});
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
      
      {/* GLOBAL INTERACTIVE STYLES */}
      <style>{`
        /* Custom scrollbar for premium feel */
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 99px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Input and Textarea focus and transitions */
        input, textarea, select {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #02588E !important;
          box-shadow: 0 0 0 3px rgba(2, 88, 142, 0.15) !important;
        }

        /* Gemini card gradient outline */
        .gemini-assistant-premium-card {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 14px;
          margin-top: 15px;
          margin-bottom: 20px;
          position: relative;
          overflow: visible !important;
          height: auto !important;
          min-height: fit-content !important;
          display: block !important;
        }
        .gemini-assistant-premium-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #c01060 0%, #02588E 50%, #4ac4d6 100%);
        }

        /* Segmented control transitions */
        .segmented-tab {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .segmented-tab:hover:not(.active-tab) {
          background-color: #f1f5f9 !important;
          border-color: #94a3b8 !important;
          color: #1e293b !important;
        }

        /* Action buttons active state */
        .action-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .action-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }
        .action-btn:active {
          transform: translateY(0.5px);
        }
      `}</style>

      {/* SIDEBAR */}
      <div className="sidebar-scroll" style={{ width: '420px', minWidth: '420px', borderRight: '1px solid #e2e8f0', padding: '24px 20px', overflowY: 'auto', backgroundColor: '#fff', zIndex: 10 }}>
        
        {/* APP HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', fill: '#02588E', backgroundColor: '#e0f2fe' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#02588E"/>
            </svg>
          </div>
          <h2 style={{ marginTop: 0, marginBottom: 0, color: '#02588E', fontSize: '19px', fontWeight: '800', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.3px' }}>HR.com Email Builder</h2>
        </div>
        <p style={{ margin: '0 0 16px 0', fontSize: '11.5px', color: '#64748B', lineHeight: '15px' }}>Generate high-impact, compliant webcast email promotions instantly.</p>
        
        {/* ⚡ QUICK START: IMPORT FROM WEBCAST PAGE (bookmarklet) */}
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: '1px solid #86efac',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '10px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.7px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              ⚡ Quick Start: Import Webcast Page
            </span>
            <a href="/bookmarklet.html" target="_blank" rel="noreferrer" style={{ fontSize: '10.5px', fontWeight: '700', color: '#166534' }}>
              Install bookmarklet ↗
            </a>
          </div>
          <p style={{ margin: '0 0 8px 0', fontSize: '10.5px', color: '#3f6212', lineHeight: '14px' }}>
            On the hr.com webcast page, click <strong>📋 Grab Webcast</strong>, then come back here.
          </p>
          <button
            onClick={handleClipboardImport}
            className="action-btn"
            style={{ width: '100%', padding: '10px', background: '#166534', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', fontFamily: "'Plus Jakarta Sans', sans-serif", cursor: 'pointer', boxShadow: '0 2px 4px rgba(22, 101, 52, 0.15)' }}
          >
            Paste from Webcast Page
          </button>
          {!showImportBox && (
            <button
              onClick={() => setShowImportBox(true)}
              style={{ fontSize: '10.5px', cursor: 'pointer', fontWeight: '700', border: 'none', background: 'none', color: '#166534', padding: 0, marginTop: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Or paste the data manually
            </button>
          )}
          {showImportBox && (
            <>
              <textarea
                placeholder="Paste the copied webcast data here..."
                value={importText}
                onChange={e => setImportText(e.target.value)}
                style={{ ...iS, padding: '7px 10px', fontSize: '11px', height: '60px', marginTop: '8px', fontFamily: 'monospace', resize: 'vertical' }}
              />
              <button
                onClick={() => importFromText(importText)}
                className="action-btn"
                style={{ width: '100%', padding: '8px', background: '#ffffff', color: '#166534', border: '1px solid #86efac', borderRadius: '8px', fontSize: '11.5px', fontWeight: '700', fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: '6px', cursor: 'pointer' }}
              >
                Import Pasted Data
              </button>
            </>
          )}
          {importMsg && (
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '10.5px',
              lineHeight: '15px',
              padding: '8px',
              borderRadius: '6px',
              color: importMsg.type === 'ok' ? '#166534' : '#991b1b',
              backgroundColor: importMsg.type === 'ok' ? '#ffffff' : '#fef2f2',
              border: `1px solid ${importMsg.type === 'ok' ? '#bbf7d0' : '#fecaca'}`
            }}>
              {importMsg.type === 'ok' ? '✅ ' : '⚠️ '}{importMsg.text}
            </p>
          )}
        </div>

        {/* 🚀 PRIMARY STEP: SELECT TEMPLATE TYPE */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)', 
          border: '1px solid #bae6fd', 
          borderRadius: '12px', 
          padding: '14px', 
          marginBottom: '10px' 
        }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#0369a1', display: 'block', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.7px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            STEP 1: SELECT TEMPLATE TYPE
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {[
              { id: 'demo', label: 'Demo Webcast' },
              { id: 'ondemand', label: 'On-Demand' },
              { id: 'standalone', label: 'Standalone' },
              { id: 'virtual', label: 'Virtual Event' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`segmented-tab ${activeTab === t.id ? 'active-tab' : ''}`}
                style={{
                  padding: '10px 8px',
                  background: activeTab === t.id ? '#02588E' : '#ffffff',
                  color: activeTab === t.id ? '#ffffff' : '#475569',
                  border: activeTab === t.id ? '1px solid #02588E' : '1px solid #cbd5e1',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: 'pointer',
                  boxShadow: activeTab === t.id ? '0 4px 10px rgba(2, 88, 142, 0.2)' : 'none'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🎨 DESIGN VARIANT SELECTOR */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #fff1f2 100%)', 
          border: '1px solid #f9a8d4', 
          borderRadius: '12px', 
          padding: '14px', 
          marginBottom: '10px' 
        }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#9d174d', display: 'block', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.7px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            🎨 DESIGN VARIANT
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {(TEMPLATES[activeTab]?.variants || []).map((v, idx) => {
              const dotColors = ['#C01060', '#0F172A', '#02588E', '#FDB414', '#F472B6', '#1E293B', '#A16207', '#4AC4D6', '#94C83D', '#EF4A3D'];
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(idx)}
                  className={`segmented-tab ${activeVariant === idx ? 'active-tab' : ''}`}
                  style={{
                    padding: '9px 8px',
                    background: activeVariant === idx ? '#9d174d' : '#ffffff',
                    color: activeVariant === idx ? '#ffffff' : '#475569',
                    border: activeVariant === idx ? '1px solid #9d174d' : '1px solid #f9a8d4',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: 'pointer',
                    boxShadow: activeVariant === idx ? '0 4px 10px rgba(157, 23, 77, 0.2)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span style={{ 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: activeVariant === idx ? '#ffffff' : (dotColors[idx] || '#999'),
                    display: 'inline-block',
                    flexShrink: 0
                  }} />
                  {v.label}
                </button>
              );
            })}
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '9px', color: '#9d174d', lineHeight: '13px', opacity: 0.7 }}>
            Each variant uses a completely different visual layout to prevent email fatigue.
          </p>
        </div>
        
        {/* ✨ GEMINI COPYWRITING ASSISTANT SECTION */}
        <div className="gemini-assistant-premium-card" style={{ display: 'block', height: 'auto', minHeight: 'fit-content', overflow: 'visible' }}>
          <h4 style={{ margin: '0 0 2px 0', fontSize: '13.5px', color: '#02588E', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span>✨</span> Gemini Copywriting Assistant
          </h4>
          <p style={{ margin: '0 0 10px 0', fontSize: '10.5px', color: '#64748B', lineHeight: '14px' }}>
            Paste the raw details. Copy the prompt to Gemini, then paste the response back to auto-fill the fields.
          </p>
           <div style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', display: 'block', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.3px' }}>1. Generate Prompt Context</span>
            
            {/* 1. Title */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>1. Webcast Title</label>
            <input 
              placeholder="Webcast Title" 
              value={aiTitle} 
              onChange={e => setAiTitle(e.target.value)} 
              style={{ ...iS, padding: '7px 10px', fontSize: '12px', marginTop: 0, marginBottom: '6px' }} 
            />
            
            {/* 2. Date */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>2. Webcast Date & Time</label>
            <input 
              placeholder="Webcast Date & Time (e.g. May 27, 2026 at 2:30 PM ET)" 
              value={aiDateTime} 
              onChange={e => setAiDateTime(e.target.value)} 
              style={{ ...iS, padding: '7px 10px', fontSize: '12px', marginTop: 0, marginBottom: '6px' }} 
            />
            
            {/* 3. Presenter Logo & Name */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>3. Presenter Logo & Name</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '4px' }}>
              <input 
                placeholder="Presenter Logo URL" 
                value={aiSponsorLogo} 
                onChange={e => setAiSponsorLogo(e.target.value)} 
                style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: 0 }} 
              />
              <input 
                placeholder="Presenter Name" 
                value={aiSponsorName} 
                onChange={e => setAiSponsorName(e.target.value)} 
                style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: 0 }} 
              />
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '9.5px', color: '#64748B', lineHeight: '13px' }}>
              * Tip: Right-click the "presented by" sponsor logo on the webcast page and choose "Copy image address".
            </p>
            
            {/* 4. Key Learnings (separate fields for 4 learnings) */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>4. Key Learnings Takeaways (Max 4)</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '4px' }}>
              {aiLearnings.map((l, idx) => (
                <input 
                  key={idx}
                  placeholder={`Learning Sentence ${idx + 1}`}
                  value={l}
                  onChange={e => {
                    const updated = [...aiLearnings];
                    updated[idx] = e.target.value;
                    setAiLearnings(updated);
                  }}
                  style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0 }}
                />
              ))}
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '9.5px', color: '#64748B', lineHeight: '13px' }}>
              * Copy up to 4 key learnings. Leave the 4th blank if you only have 3. If you have more than 4, enter only the first 4.
            </p>
            
            {/* 5. Host Section */}
            <span style={{ fontSize: '9px', fontWeight: '800', color: '#475569', display: 'block', textTransform: 'uppercase', marginTop: '10px', marginBottom: '6px', letterSpacing: '0.4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              👤 5. Webinar Hosts / Presenters
            </span>
            <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '6px' }}>
              {aiHostsList.map((h, i) => (
                <div key={i} style={{ marginBottom: i < aiHostsList.length - 1 ? '10px' : 0, borderBottom: i < aiHostsList.length - 1 ? '1px solid #e2e8f0' : 'none', paddingBottom: i < aiHostsList.length - 1 ? '10px' : 0, position: 'relative' }}>
                  {aiHostsList.length > 1 && (
                    <button 
                      onClick={() => setAiHostsList(aiHostsList.filter((_, idx) => idx !== i))} 
                      style={{ ...rmBtn, right: 0, top: '-2px' }}
                    >
                      Remove
                    </button>
                  )}
                  <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', marginBottom: '4px' }}>Host #{i + 1}</div>
                  <input 
                    placeholder="Host Image URL" 
                    value={h.image} 
                    onChange={e => {
                      const updated = [...aiHostsList];
                      updated[i].image = e.target.value;
                      setAiHostsList(updated);
                    }} 
                    style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: '2px' }} 
                  />
                  <p style={{ margin: '0 0 4px 0', fontSize: '9px', color: '#64748B', lineHeight: '12px' }}>
                    * Tip: Right-click the presenter image and choose "Copy image address".
                  </p>
                  <input 
                    placeholder="Host Name" 
                    value={h.name} 
                    onChange={e => {
                      const updated = [...aiHostsList];
                      updated[i].name = e.target.value;
                      setAiHostsList(updated);
                    }} 
                    style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: '4px' }} 
                  />
                  <input 
                    placeholder="Host Designation / Company" 
                    value={h.title} 
                    onChange={e => {
                      const updated = [...aiHostsList];
                      updated[i].title = e.target.value;
                      setAiHostsList(updated);
                    }} 
                    style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: 0 }} 
                  />
                </div>
              ))}
              {aiHostsList.length < 5 && (
                <button 
                  style={{ fontSize: '11px', cursor: 'pointer', fontWeight: '700', border: 'none', background: 'none', color: '#02588E', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 0, marginTop: '6px' }} 
                  onClick={() => setAiHostsList([...aiHostsList, { name: "", title: "", image: "" }])}
                >
                  + Add Host Input
                </button>
              )}
            </div>

            {/* 6. Webcast Description */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>6. Webcast Description</label>
            <textarea 
              placeholder="Paste Webcast Description or Extractor Row..." 
              value={aiDesc} 
              onChange={e => setAiDesc(e.target.value)} 
              style={{ ...iS, padding: '7px 10px', fontSize: '12px', height: '55px', marginTop: 0, marginBottom: '6px', resize: 'vertical' }} 
            />
            
            {/* 7. Credits */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>7. Recertification Credits</label>
            <select
              value={['', '0.5 HR Credit', '1 HR Credit', '1 BUSINESS Credit', '1 GLOBAL Credit'].includes(aiCredit) ? aiCredit : 'custom'}
              onChange={e => {
                if (e.target.value === 'custom') {
                  setAiCredit(' ');
                } else {
                  setAiCredit(e.target.value);
                }
              }}
              style={{ ...iS, padding: '7px 10px', fontSize: '12px', marginTop: 0, marginBottom: '4px' }}
            >
              <option value="">-- Select Credit Option --</option>
              <option value="0.5 HR Credit">0.5 HR Credit</option>
              <option value="1 HR Credit">1 HR Credit</option>
              <option value="1 BUSINESS Credit">1 BUSINESS Credit</option>
              <option value="1 GLOBAL Credit">1 GLOBAL Credit</option>
              <option value="custom">Custom Value...</option>
            </select>
            {!['', '0.5 HR Credit', '1 HR Credit', '1 BUSINESS Credit', '1 GLOBAL Credit'].includes(aiCredit) && (
              <input 
                placeholder="Type custom credit value..." 
                value={aiCredit.trimStart()} 
                onChange={e => setAiCredit(e.target.value)} 
                style={{ ...iS, padding: '7px 10px', fontSize: '12px', marginTop: 0, marginBottom: '4px' }} 
              />
            )}
            <p style={{ margin: '0 0 6px 0', fontSize: '9.5px', color: '#64748B', lineHeight: '13px' }}>
              * Leave blank if the webcast does not offer recertification credits or if no credit section is present.
            </p>

            {/* 8. Virtual Event Name & URL */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>8. Virtual Event Name & URL</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '4px' }}>
              <input 
                placeholder="Virtual Event Name" 
                value={aiVeName} 
                onChange={e => setAiVeName(e.target.value)} 
                style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: 0 }} 
              />
              <input 
                placeholder="Virtual Event URL / shortcode" 
                value={aiVeShortcode} 
                onChange={e => setAiVeShortcode(e.target.value)} 
                style={{ ...iS, padding: '6px 8px', fontSize: '11px', marginTop: 0, marginBottom: 0 }} 
              />
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '9.5px', color: '#64748B', lineHeight: '13px' }}>
              * Leave blank if the webcast is not part of a virtual event.
            </p>
                        
            {/* 9. AP Shortcode */}
            <label style={{ ...lS, marginTop: '8px', marginBottom: '4px', fontSize: '10px' }}>9. AP Shortcode (all CTA buttons)</label>
            <input 
              placeholder="https://web.hr.com/xxxxx" 
              value={aiApShortcode} 
              onChange={e => setAiApShortcode(e.target.value)} 
              style={{ ...iS, padding: '7px 10px', fontSize: '12px', marginTop: 0, marginBottom: '8px' }} 
            />
            
            <button 
              onClick={handleCopyPrompt} 
              className="action-btn"
              style={{ 
                width: '100%', 
                padding: '10px', 
                background: '#0F172A', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: '700', 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginTop: '8px', 
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(15, 23, 42, 0.1)'
              }}
            >
              {copySuccess ? 'Prompt Copied! ✅' : 'Copy Prompt'}
            </button>
            <p style={{ margin: '6px 0 0 0', fontSize: '9.5px', color: '#64748B', lineHeight: '13px', textAlign: 'center' }}>
              Open the Gemini web app in a separate window and paste the copied prompt. Once Gemini generates the response, copy it and paste the raw JSON block below.
            </p>
          </div>
 
          <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '10px', marginTop: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: '800', color: '#64748B', display: 'block', textTransform: 'uppercase', marginBottom: '4px' }}>2. Apply AI JSON Output</span>
            <textarea 
              placeholder="Paste Gemini's JSON block response here..." 
              value={aiResponse} 
              onChange={e => setAiResponse(e.target.value)} 
              style={{ ...iS, padding: '7px 10px', fontSize: '11.5px', height: '55px', marginTop: 0, fontFamily: 'monospace', resize: 'none', backgroundColor: '#fff' }} 
            />
            <button 
              onClick={handleApplyAiResponse} 
              className="action-btn"
              style={{ 
                width: '100%', 
                padding: '10px', 
                background: '#C01060', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '12px', 
                fontWeight: '700', 
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginTop: '6px', 
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(192, 16, 96, 0.1)'
              }}
            >
              Auto-Fill Email Fields 🎉
            </button>
            <p style={{ margin: '8px 0 0 0', fontSize: '9.5px', color: '#0369a1', backgroundColor: '#f0f9ff', border: '1px solid #e0f2fe', padding: '8px', borderRadius: '6px', lineHeight: '14px' }}>
              ℹ️ <strong>Next Steps:</strong> Clicking this auto-fills all fields below. Review the details, click <strong>"COPY FINAL HTML CODE"</strong> at the bottom, paste it into the CCM campaign creator HTML block, and send a test mail to verify.
            </p>
          </div>
        </div>

        {/* STEP 2: MANUAL ADJUSTMENT AND EMAIL SETUP */}
        <span style={{ fontSize: '10px', fontWeight: '800', color: '#475569', display: 'block', textTransform: 'uppercase', marginTop: '5px', marginBottom: '2px', letterSpacing: '0.7px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          STEP 2: REVIEW & FINE-TUNE VARIABLES
        </span>

        {/* Added Subject Line field */}
        <label style={lS}>Subject Line (10 Options)</label>
        <textarea placeholder="Enter email subject line options..." style={{...iS, height:'180px', resize:'vertical'}} value={fields.subject} onChange={e => setFields({...fields, subject: e.target.value})} />

        <label style={lS}>Preheader Text</label>
        <input placeholder="Enter preheader text..." style={iS} value={fields.preheader} onChange={e => setFields({...fields, preheader: e.target.value})} />

        <label style={lS}>1. Presenter Logo URL & Name</label>
        <input placeholder="Paste Presenter Logo Image URL" style={{ ...iS, marginBottom: '2px' }} value={fields.logo} onChange={e => setFields({...fields, logo: e.target.value})} />
        <p style={{ margin: '0 0 6px 0', fontSize: '9px', color: '#64748B', lineHeight: '12px' }}>
          * Tip: Right-click the "presented by" sponsor logo on the webcast page and choose "Copy image address".
        </p>
        <input placeholder="Presenter Company Name or alt text" style={{ ...iS, marginTop: 0 }} value={fields.logoAlt} onChange={e => setFields({...fields, logoAlt: e.target.value})} />
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.3px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Logo Height (px):</label>
          <input 
            type="number" 
            style={{ ...iS, width: '80px', marginTop: 0, padding: '6px 10px', fontSize: '12px' }} 
            value={fields.logoHeight || ""} 
            onChange={e => setFields({...fields, logoHeight: e.target.value})} 
            placeholder="40"
            min="10" 
            max="200" 
          />
        </div>

        <label style={lS}>Header label (tag next to the logo)</label>
        <input placeholder={TEMPLATES[activeTab].variants[0].badge + ' (default)'} style={iS} value={fields.badge || ''} onChange={e => setFields({...fields, badge: e.target.value})} />

        <label style={lS}>2. Hero Title</label>
        <input placeholder="Enter Main Headline" style={iS} value={fields.title} onChange={e => setFields({...fields, title: e.target.value})} />

        {activeTab !== 'ondemand' && (
          <>
            <label style={lS}>3. Date & Time String</label>
            <input placeholder="e.g. May 27, 2026 at 2:30 PM ET" style={iS} value={fields.dateTime} onChange={e => setFields({...fields, dateTime: e.target.value})} />
          </>
        )}

        {(activeTab === 'virtual' || activeTab === 'demo') && (
          <div style={{ marginTop: '16px', padding: '14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
            <label style={{ ...lS, marginTop: 0, color: '#166534' }}>Virtual Event Settings</label>
            <input placeholder="Virtual Event Name" style={iS} value={fields.veName} onChange={e => setFields({...fields, veName: e.target.value})} />
            <input placeholder="Virtual Event URL / shortcode" style={iS} value={fields.veShortcode} onChange={e => setFields({...fields, veShortcode: e.target.value})} />
          </div>
        )}

        <label style={lS}>4. AP shortcode (all CTA buttons)</label>
        <input placeholder="https://web.hr.com/xxxxx" style={iS} value={fields.apShortcode} onChange={e => setFields({...fields, apShortcode: e.target.value})} />

        <label style={lS}>5. Intro Paragraphs (Problem & Solution)</label>
        <textarea placeholder="Enter 2 paragraphs (Problem & Solution) separated by a blank line" style={{...iS, height:'90px', resize:'vertical'}} value={fields.intro} onChange={e => setFields({...fields, intro: e.target.value})} />

        <label style={lS}>6. 4 Key Learnings</label>
        {[1,2,3,4].map(n => <input key={n} placeholder={`Learning sentence ${n}`} style={{...iS, marginBottom:'4px'}} value={fields[`learn${n}`]} onChange={e => setFields({...fields, [`learn${n}`]: e.target.value})} />)}


        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginTop: '16px', border: '1px solid #e2e8f0' }}>
          <label style={{ ...lS, marginTop: 0, marginBottom: '10px', color: '#1e293b' }}>Expert Hosts (Max 5)</label>
          {fields.hosts.map((h, i) => (
            <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', position: 'relative' }}>
              <button onClick={() => removeHost(i)} style={rmBtn}>Remove</button>
              <input placeholder="Image URL" style={{ ...iS, marginBottom: '2px' }} value={h.image} onChange={e => updateHost(i, 'image', e.target.value)} />
              <p style={{ margin: '0 0 6px 0', fontSize: '9px', color: '#64748B', lineHeight: '12px' }}>
                * Tip: Right-click the presenter image and choose "Copy image address".
              </p>
              <input placeholder="Expert Name" style={{ ...iS, marginBottom: '4px' }} value={h.name} onChange={e => updateHost(i, 'name', e.target.value)} />
              <input placeholder="Designation" style={iS} value={h.title} onChange={e => updateHost(i, 'title', e.target.value)} />
            </div>
          ))}
          <button style={{ fontSize: '12px', cursor: 'pointer', fontWeight: '700', border: 'none', background: 'none', color: '#02588E', fontFamily: "'Plus Jakarta Sans', sans-serif" }} onClick={() => fields.hosts.length < 5 && setFields({...fields, hosts: [...fields.hosts, {name:"", title:"", image:"", alt:""}]})}>+ Add Another Host</button>
        </div>

        <div style={{ marginTop: '16px', padding: '14px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: '700', color: '#1e40af', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <input type="checkbox" checked={fields.showCredits} onChange={e => setFields({...fields, showCredits: e.target.checked})} style={{ marginRight: '10px', width: '15px', height: '15px' }} />
            SHOW CREDIT SECTION
          </label>
          {fields.showCredits && (
            <>
              <select
                value={['', '0.5 HR Credit', '1 HR Credit', '1 BUSINESS Credit', '1 GLOBAL Credit'].includes(fields.creditValue) ? fields.creditValue : 'custom'}
                onChange={e => {
                  if (e.target.value === 'custom') {
                    setFields({...fields, creditValue: ' '});
                  } else {
                    setFields({...fields, creditValue: e.target.value});
                  }
                }}
                style={{ ...iS, marginTop: '10px' }}
              >
                <option value="">-- Select Credit Option --</option>
                <option value="0.5 HR Credit">0.5 HR Credit</option>
                <option value="1 HR Credit">1 HR Credit</option>
                <option value="1 BUSINESS Credit">1 BUSINESS Credit</option>
                <option value="1 GLOBAL Credit">1 GLOBAL Credit</option>
                <option value="custom">Custom Value...</option>
              </select>
              {!['', '0.5 HR Credit', '1 HR Credit', '1 BUSINESS Credit', '1 GLOBAL Credit'].includes(fields.creditValue) && (
                <input 
                  placeholder="Type custom credit value" 
                  style={{ ...iS, marginTop: '4px' }} 
                  value={fields.creditValue.trimStart()} 
                  onChange={e => setFields({...fields, creditValue: e.target.value})} 
                />
              )}
            </>
          )}
        </div>

        <button 
          className="action-btn"
          style={btnStyle} 
          onClick={() => { navigator.clipboard.writeText(finalHtml); alert("HTML Copied to Clipboard!") }}
        >
          COPY FINAL HTML CODE
        </button>
        
        {/* Version Control and Last Updated Stamp */}
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#64748B', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: '16px' }}>
            Version <strong>3.0.0</strong> · Last Updated: <strong>July 20, 2026</strong>
          </p>
        </div>
      </div>

      {/* PREVIEW CONTAINER */}
      <div style={{ flex: 1, overflow: 'auto', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ width: '630px', minWidth: '630px' }}>
          <div style={{ 
            width: '630px', 
            backgroundColor: '#ffffff', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -10px rgba(0, 0, 0, 0.1)', 
            borderRadius: '12px', 
            border: '1px solid #cbd5e1',
            overflow: 'hidden'
          }}>
            <iframe 
              srcDoc={finalHtml} 
              title="Email Preview" 
              style={{ width: '630px', height: '1400px', border: 'none', display: 'block' }} 
            />
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginTop: '16px', fontFamily: "'Inter', sans-serif", fontWeight: '600' }}>
            Desktop Live Preview (Standard 600px Email Container)
          </p>
        </div>
      </div>
    </div>
  );
}