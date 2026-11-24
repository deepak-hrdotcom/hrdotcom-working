import { useEffect, useMemo, useRef, useState } from 'react';
import { TEMPLATES, VARIANT_KEYS, PALETTES } from './templates';
import { renderEmail, cleanUrl } from './render';
import { buildEmailHtml, emailFields, CREDIT_OPTIONS } from './assemble';
import { isHex, paletteFromBrand } from './brand';
import BrandPicker from './BrandPicker';
import DetailsEditor from './DetailsEditor';
import { isoDateFrom, todayIso, folderName as mkFolder, fileName as mkFile, subjectDocName } from './naming';

const EVENT_TYPES = [
  { id: 'demo', name: 'Demo Webcast', hint: 'Product walkthrough, usually part of a Demo Day' },
  { id: 'ondemand', name: 'On-Demand', hint: 'Recorded webcast, watch any time' },
  { id: 'standalone', name: 'Standalone', hint: 'Single educational webcast' },
  { id: 'virtual', name: 'Virtual Event', hint: 'Session inside a virtual event' },
];
const HAS_VE = (t) => t === 'demo' || t === 'virtual';
const STEPS = ['Event type', 'Series', 'Design', 'Details', 'Webcast', 'Review & save'];
const FEELS = ['Urgency — act now', 'Visual treat — wow factor', 'Exclusive / premium', 'Warm & human', 'Bold & energetic', 'Calm & trustworthy', 'Insight-led — facts & data'];
const LOOKS = ['Editorial / magazine', 'Cards & tiles', 'Big bold typography', 'Minimal & airy', 'Dark & dramatic', 'Colorful & playful', 'Event ticket / pass'];

async function api(route, body) {
  const r = await fetch(`/api/${route}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({ error: `Server error ${r.status}` }));
  if (!r.ok || data.error) throw new Error(data.error || `Server error ${r.status}`);
  return data;
}

// Parse the "Grab Webcast" bookmarklet JSON
function parseImport(text) {
  const start = (text || '').indexOf('{');
  const end = (text || '').lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No webcast data found. Click 📋 Grab Webcast on the webcast page first.');
  const d = JSON.parse(text.slice(start, end + 1));
  if (d.__hrEmailImport !== 1) throw new Error("That doesn't look like data from the Grab Webcast bookmarklet.");
  return {
    eventType: d.eventType || '',
    title: d.title || '',
    dateTime: d.dateTime || '',
    description: d.description || '',
    learnings: Array.isArray(d.learnings) ? d.learnings.filter(Boolean) : [],
    hosts: (Array.isArray(d.hosts) ? d.hosts : []).map((h) => ({ name: h.name || '', title: h.title || '', image: cleanUrl(h.image) || '' })),
    sponsorLogo: cleanUrl(d.sponsorLogo) || '',
    sponsorName: d.sponsorName || '',
    creditValue: d.creditValue || '',
    veUrl: cleanUrl(d.veUrl) || '',
    missing: Array.isArray(d.missing) ? d.missing : [],
  };
}

// Subject lines shown as one numbered list ("1. …"), parsed back to plain lines
const numberLines = (lines) => lines.map((s, i) => `${i + 1}. ${s}`).join('\n');
const parseLines = (text) => text.split('\n').map((l) => l.replace(/^\s*\d{1,2}\s*[.)]\s*/, '').trim()).filter(Boolean);

// Clock read for event handlers (kept outside the component for the React purity lint)
const nowMs = () => Date.now();
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Seconds since startedAt while running (startedAt is set by whoever starts the work)
function useElapsed(running, startedAt) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [running]);
  return running ? Math.max(0, Math.round((now - startedAt) / 1000)) : 0;
}

// Scaled live preview of a template (used for the thumbnails)
function Thumb({ html, scale = 0.3, height = 300 }) {
  return (
    <div className="wz-thumb" style={{ height }}>
      <iframe title="thumbnail" srcDoc={html} tabIndex={-1} style={{ width: 600, height: height / scale, transform: `scale(${scale})` }} />
    </div>
  );
}

export default function Wizard({ onHome }) {
  const [step, setStepRaw] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const setStep = (i) => { setStepRaw(i); setMaxStep((m) => Math.max(m, i)); };
  const [eventType, setEventType] = useState('');
  const [series, setSeries] = useState({ n: 1, m: 1 });
  // kind: 'template' (mode: auto | pick | client) or 'custom' (a brand-new design from the brief)
  // clientBrand: client colors/font already worked out (site read, pasted CSS or typed); else clientUrl is read on generate
  // colorSource (custom only): 'event' (HR.com colors) | 'client' | 'describe' (brief.colorNote)
  const [design, setDesign] = useState({
    kind: 'template', mode: 'auto', variantIndex: 0, clientUrl: '', clientBrand: null,
    colorSource: 'event', brief: { feel: [], message: '', look: [], colorNote: '', notes: '' },
  });
  const isClient = design.kind === 'custom' ? design.colorSource === 'client' : design.mode === 'client';
  const setBrief = (k, v) => setDesign((d) => ({ ...d, brief: { ...d.brief, [k]: v } }));
  const toggleBrief = (k, v) => setDesign((d) => ({ ...d, brief: { ...d.brief, [k]: d.brief[k].includes(v) ? d.brief[k].filter((x) => x !== v) : [...d.brief[k], v] } }));
  const [details, setDetails] = useState({ badge: '', apShortcode: '', veName: '', veShortcode: '', credit: '' });
  const [webcast, setWebcast] = useState(null);
  const [importText, setImportText] = useState('');
  const [importErr, setImportErr] = useState('');

  // Generation results
  const [job, setJob] = useState(null); // { variantIndex, brand, brandNote, copy, subjectLines, previous, folderId, folderUrl, warnings }
  const [progress, setProgress] = useState([]); // [{ label, state: 'run'|'done'|'fail'|'skip', note }]
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [names, setNames] = useState({ folder: '', file: '' });
  const [copied, setCopied] = useState(''); // which copy button just worked: 'html' | 'subjects'
  const copyText = (text, which) => navigator.clipboard.writeText(text).then(() => {
    setCopied(which);
    setTimeout(() => setCopied(''), 2000);
  }).catch(() => alert("Couldn't copy. Click inside the page and try again."));
  const [saveState, setSaveState] = useState({ busy: false, result: null, error: '' });
  const [designBusy, setDesignBusy] = useState(false); // review screen: change request / fresh design running
  const [designErr, setDesignErr] = useState('');
  const [changeRequest, setChangeRequest] = useState('');
  const [subjBusy, setSubjBusy] = useState(false); // review screen: writing a new set of subject lines
  const [subjErr, setSubjErr] = useState('');
  const [startedAt, setStartedAt] = useState(0);
  const elapsed = useElapsed(busy || saveState.busy || designBusy || subjBusy, startedAt);
  const sessionPrev = useRef([]); // emails made in this session for the same series (no Drive lookup needed)
  const genCount = useRef(0); // bumps on every generation so the brand form reloads its values

  const sampleThumbs = useMemo(() => {
    if (!eventType) return [];
    return TEMPLATES[eventType].variants.map((v) => renderEmail(v, emailFields({ eventType, webcast: {}, details: {}, copy: null })));
  }, [eventType]);

  const dateIso = isoDateFrom(webcast?.dateTime) || todayIso();
  const setProg = (label, state, note = '') => setProgress((p) => {
    const i = p.findIndex((x) => x.label === label);
    const row = { label, state, note };
    return i === -1 ? [...p, row] : p.map((x, j) => (j === i ? row : x));
  });

  const finalHtml = useMemo(() => {
    if (!job || !webcast) return '';
    const custom = job.useCustom ? job.custom : null;
    return buildEmailHtml({
      eventType,
      variantIndex: job.variantIndex,
      brand: job.brand,
      custom,
      fields: emailFields({ eventType, webcast, details, copy: job.copy, subjectLines: job.subjectLines }),
      recipe: {
        v: 1,
        eventType,
        title: webcast.title,
        series,
        ...(custom
          ? { variant: 'custom', designSummary: custom.summary }
          : { variant: VARIANT_KEYS[job.variantIndex], variantIndex: job.variantIndex }),
        brand: job.brand ? { primary: job.brand.primary, secondary: job.brand.secondary, dark: job.brand.dark, fontFamily: job.brand.fontFamily, site: design.clientUrl } : null,
        copy: { preheader: job.copy.preheader, intro: job.copy.intro, learnings: job.copy.learnings },
        // Later emails in the series read these back, so their review screen can show them too
        ...(job.subjectSource === 'new' ? { subjectLines: job.subjectLines } : {}),
      },
    });
  }, [job, webcast, eventType, details, series, design.clientUrl]);

  // ------------------------------------------------------------ generate
  async function generate({ keepDesign = false } = {}) {
    setBusy(true);
    setStartedAt(nowMs());
    setError('');
    setSaveState({ busy: false, result: null, error: '' });
    setProgress([]);
    const folder = mkFolder(dateIso, webcast.title);
    setNames({ folder, file: mkFile(dateIso, webcast.title, eventType, series.n, series.m) });
    try {
      // 1. Branding (runs alongside the rest)
      const manual = isClient && !!design.clientBrand;
      const wantBrand = isClient && !manual && design.clientUrl.trim() && !keepDesign;
      let brandP = Promise.resolve(keepDesign
        ? { brand: job?.brand || null, note: job?.brandNote || '' }
        : { brand: manual ? design.clientBrand : null, note: '' });
      if (wantBrand) {
        setProg('Reading client website', 'run');
        brandP = api('brand', { url: design.clientUrl.trim() }).then((b) => {
          if (!b.ok || !isHex(b.primary)) {
            setProg('Reading client website', 'fail', `${b.reason || 'No brand colors found.'} Paste the site's CSS in the Design box on the left.`);
            return { brand: null, note: b.reason || 'No brand colors found.' };
          }
          setProg('Reading client website', 'done', `${b.brandName || 'Client'}: ${b.primary}${b.secondary && b.secondary !== b.primary ? ` / ${b.secondary}` : ''}${b.fontFamily ? `, font ${b.fontFamily}` : ''}`);
          return { brand: b, note: '' };
        }).catch((e) => {
          setProg('Reading client website', 'fail', `${e.message} Paste the site's CSS in the Design box on the left.`);
          return { brand: null, note: e.message };
        });
      }

      // 2. Earlier emails in the series
      let previous = keepDesign && job ? job.previous : sessionPrev.current;
      let folderId = job?.folderId || null;
      let folderUrl = job?.folderUrl || '';
      if (series.n > 1 && !previous.length && !(keepDesign && job)) {
        setProg('Finding earlier emails in Google Drive', 'run');
        const look = await api('lookup', { eventType, folderName: folder });
        previous = look.files;
        folderId = look.folderId;
        folderUrl = look.folderUrl;
        setProg('Finding earlier emails in Google Drive', 'done', look.folderId
          ? `Found ${look.files.length} earlier email(s) in "${folder}".`
          : `No folder "${folder}" yet, so nothing to compare against. A new folder will be created on save.`);
      }

      // 3. Template
      let variantIndex = design.variantIndex;
      if (keepDesign && job) variantIndex = job.variantIndex;
      else if (!(design.mode === 'pick' || (design.mode === 'client' && design.pinned))) {
        const used = new Set(previous.map((p) => p.recipe?.variantIndex).filter((x) => x !== undefined));
        const free = VARIANT_KEYS.map((_, i) => i).filter((i) => !used.has(i));
        variantIndex = pickRandom(free.length ? free : VARIANT_KEYS.map((_, i) => i));
      }

      // 4. New design (alongside the copy). A failure falls back to the template, with a retry button.
      const wantDesign = design.kind === 'custom' && !(keepDesign && job?.custom);
      const designP = !wantDesign ? Promise.resolve(keepDesign ? job?.custom || null : null) : brandP.then(({ brand: b }) => {
        setProg('Designing a new layout (Opus 5.5)', 'run', 'Usually 2–4 minutes.');
        return requestDesign({ brand: b, previous });
      }).then((d) => {
        setProg('Designing a new layout (Opus 5.5)', d.warnings?.length ? 'fail' : 'done',
          d.warnings?.length ? `Check these: ${d.warnings.join('; ')}` : d.summary);
        return d;
      }).catch((e) => {
        setProg('Designing a new layout (Opus 5.5)', 'fail', `${e.message} Showing a template instead; use "New design" on the left to try again.`);
        return null;
      });

      // 5. Copy. Subject lines: email 1 writes them, and later emails reuse email 1's (saved in its
      // recipe). If no earlier email has any, this email writes them so the folder still gets a doc.
      const keepOwn = keepDesign && job?.subjectSource === 'new' && series.n > 1;
      const fromEmail1 = previous.find((p) => p.recipe?.subjectLines?.length)?.recipe.subjectLines || [];
      const wantSubjects = series.n === 1 || (!keepOwn && !fromEmail1.length);
      setProg('Writing the copy (Opus 5.5)', 'run');
      const copy = await api('copy', {
        eventType,
        webcast,
        series,
        wantSubjects,
        previous: previous.map((p) => ({ name: p.name, copy: p.recipe?.copy || null, text: p.text || '' })),
      });
      setProg('Writing the copy (Opus 5.5)', copy.warnings?.length ? 'fail' : 'done',
        copy.warnings?.length ? `Check these: ${copy.warnings.join('; ')}` : (series.n > 1 && previous.length ? 'Reworded to differ from the earlier emails.' : ''));

      const { brand, note } = await brandP;
      const custom = await designP;
      const subjectLines = wantSubjects ? (copy.subjectLines || []) : keepOwn ? job.subjectLines : fromEmail1;
      const subjectSource = wantSubjects || keepOwn ? 'new' : 'email1';
      genCount.current += 1;
      setJob({
        genId: genCount.current,
        variantIndex,
        custom,
        useCustom: keepDesign && job ? !!(job.useCustom && custom) : !!custom,
        brand,
        brandNote: note,
        copy: { preheader: copy.preheader, intro: copy.intro, learnings: copy.learnings },
        subjectLines,
        subjectSource,
        email1HasSubjects: fromEmail1.length > 0,
        previous,
        folderId,
        folderUrl,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  // ------------------------------------------------------------ new design
  // How the earlier emails in the series looked, so a new design can avoid them
  const previousDesigns = (previous) => (previous || []).map((p) => p.recipe?.designSummary
    || (Number.isInteger(p.recipe?.variantIndex) ? `HR.com standard template "${TEMPLATES[eventType].variants[p.recipe.variantIndex].label}"` : null)).filter(Boolean);

  function requestDesign({ brand, previous, changeRequest = '', current = null }) {
    const colorNote = design.colorSource === 'describe' ? design.brief.colorNote
      : design.colorSource === 'client' ? (brand ? `the client's brand colors (${brand.brandName || 'client'}), given below` : "HR.com's event colors (the client's colors could not be read)")
        : "HR.com's event colors, given below";
    return api('design', {
      eventType,
      brief: { ...design.brief, colorNote, colorSource: design.colorSource },
      palette: brand ? paletteFromBrand(brand) : null,
      previousDesigns: previousDesigns(previous),
      changeRequest,
      current: current ? { middle: current.middle, css: current.css, hostCard: current.hostCard } : null,
    });
  }

  async function writeSubjects() {
    setSubjBusy(true);
    setStartedAt(nowMs());
    setSubjErr('');
    try {
      const r = await api('subjects', { eventType, webcast, avoid: job.subjectLines });
      setJob((j) => ({ ...j, subjectLines: r.subjectLines, subjectText: undefined, subjectSource: 'new' }));
      setSaveState({ busy: false, result: null, error: '' });
      if (r.warnings?.length) setSubjErr(`Check these: ${r.warnings.join('; ')}`);
    } catch (e) {
      setSubjErr(e.message);
    } finally {
      setSubjBusy(false);
    }
  }

  async function redesign({ fresh }) {
    setDesignBusy(true);
    setStartedAt(nowMs());
    setDesignErr('');
    try {
      const d = await requestDesign({ brand: job.brand, previous: job.previous, changeRequest: fresh ? '' : changeRequest, current: fresh ? null : job.custom });
      setJob((j) => ({ ...j, custom: d, useCustom: true }));
      setSaveState({ busy: false, result: null, error: '' });
      if (!fresh) setChangeRequest('');
    } catch (e) {
      setDesignErr(e.message);
    } finally {
      setDesignBusy(false);
    }
  }

  // A new design has the palette's hex values written into it; swap them when the brand changes
  function recolor(custom, fromPalette, toPalette) {
    if (!custom) return custom;
    const pairs = Object.keys(fromPalette).filter((k) => toPalette[k] && fromPalette[k] !== toPalette[k]).map((k) => [fromPalette[k], toPalette[k]]);
    const swap = (s) => pairs.reduce((out, [a, b]) => out.replace(new RegExp(a, 'gi'), b), s || '');
    return { ...custom, middle: swap(custom.middle), css: swap(custom.css), hostCard: swap(custom.hostCard) };
  }

  async function saveToDrive() {
    setSaveState({ busy: true, result: null, error: '' });
    setStartedAt(nowMs());
    try {
      const result = await api('save', {
        eventType,
        folderName: names.folder,
        folderId: job.folderId,
        fileName: names.file.endsWith('.html') ? names.file : `${names.file}.html`,
        html: finalHtml,
        // A doc only when this email has its own subject lines (email 1, or new ones written for this email)
        subjectLines: job.subjectSource === 'new' ? job.subjectLines.filter((s) => s.trim()) : [],
        // "(email N)" only when email 1 already has its own subject-lines doc in this folder
        subjectDocName: subjectDocName(dateIso, webcast.title) + (series.n > 1 && job.email1HasSubjects ? ` (email ${series.n})` : ''),
      });
      setJob((j) => ({ ...j, folderId: result.folderId, folderUrl: result.folderUrl }));
      sessionPrev.current = [...sessionPrev.current, {
        name: result.fileName,
        recipe: {
          ...(job.useCustom && job.custom ? { designSummary: job.custom.summary } : { variantIndex: job.variantIndex }),
          copy: job.copy,
          ...(job.subjectSource === 'new' ? { subjectLines: job.subjectLines } : {}),
        },
      }];
      setSaveState({ busy: false, result, error: '' });
    } catch (e) {
      setSaveState({ busy: false, result: null, error: e.message });
    }
  }

  function nextInSeries() {
    setSeries((s) => ({ ...s, n: s.n + 1 }));
    setJob((j) => ({ ...j, previous: sessionPrev.current }));
    setSaveState({ busy: false, result: null, error: '' });
    setDesign((d) => ({ ...d, mode: d.mode === 'pick' ? 'auto' : d.mode }));
    setStep(4);
  }

  // ------------------------------------------------------------ import
  function applyImport(text) {
    try {
      const d = parseImport(text);
      if (webcast && webcast.title !== d.title) {
        // A different webcast: forget the previous one's series and results
        sessionPrev.current = [];
        setJob(null);
      }
      setWebcast(d);
      setImportErr('');
      setImportText('');
      setDetails((x) => ({
        ...x,
        veShortcode: x.veShortcode || d.veUrl,
        credit: x.credit || d.creditValue,
      }));
    } catch (e) {
      setImportErr(e.message);
    }
  }
  async function pasteFromClipboard() {
    try {
      applyImport(await navigator.clipboard.readText());
    } catch {
      setImportErr("Couldn't read the clipboard. Paste the data into the box below instead.");
    }
  }

  // ------------------------------------------------------------ validation per step
  const creditIsCustom = details.credit && !CREDIT_OPTIONS.includes(details.credit);
  const [customCredit, setCustomCredit] = useState(false);
  const canNext = [
    !!eventType,
    series.n >= 1 && series.m >= series.n && series.m <= 10,
    (!isClient || !!design.clientBrand || /\S+\.\S+/.test(design.clientUrl))
      && (design.kind !== 'custom' || ((design.brief.feel.length > 0 || design.brief.message.trim() !== '')
        && (design.colorSource !== 'describe' || design.brief.colorNote.trim() !== ''))),
    true,
    !!webcast,
  ][step];
  const missing = webcast ? [
    !details.apShortcode && 'AP shortcode',
    HAS_VE(eventType) && !details.veName && 'Virtual Event name',
    HAS_VE(eventType) && !details.veShortcode && 'Virtual Event shortcode',
    !webcast.title && 'Webcast title',
    eventType !== 'ondemand' && !webcast.dateTime && 'Date & time',
    !webcast.hosts.length && 'Presenters',
  ].filter(Boolean) : [];
  const typeMismatch = webcast?.eventType && TEMPLATES[webcast.eventType] && webcast.eventType !== eventType;

  const go = (i) => {
    setStep(i);
    // The Generate button always makes a fresh email; jumping back to the review tab keeps the current one
    if (i === 5 && (step === 4 || !job) && !busy) generate();
  };

  // ------------------------------------------------------------ render
  return (
    <div className="wz">
      <style>{CSS}</style>
      <header className="wz-top">
        <button className="wz-link" onClick={onHome}>← Home</button>
        <h1>Create Emailer</h1>
        <ol className="wz-steps">
          {STEPS.map((s, i) => (
            <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''}>
              <button disabled={busy || (i > maxStep && !(i === step + 1 && canNext))} onClick={() => go(i)}>{i + 1}. {s}</button>
            </li>
          ))}
        </ol>
      </header>

      <main className={step === 5 ? 'wz-main wide' : 'wz-main'}>
        {step === 0 && (
          <section>
            <h2>What type of webcast is this email for?</h2>
            <div className="wz-cards">
              {EVENT_TYPES.map((t) => (
                <button key={t.id} className={`wz-card ${eventType === t.id ? 'on' : ''}`} onClick={() => { setEventType(t.id); setJob(null); }}>
                  <strong>{t.name}</strong><span>{t.hint}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 1 && (
          <section>
            <h2>Is this email part of a series?</h2>
            <p className="wz-help">For example, the 2nd of 4 emails for the same webcast. From email 2 onward, the app reads the earlier emails in Google Drive and makes this one look and read differently.</p>
            <div className="wz-row">
              <label>Email <input type="number" min="1" max="10" value={series.n} onChange={(e) => setSeries((s) => ({ ...s, n: Math.max(1, +e.target.value || 1) }))} /></label>
              <label>of <input type="number" min="1" max="10" value={series.m} onChange={(e) => setSeries((s) => ({ ...s, m: Math.max(1, +e.target.value || 1) }))} /></label>
            </div>
            {series.m < series.n && <p className="wz-warn">The email number can't be higher than the series total.</p>}
            <p className="wz-help">{series.n === 1 ? 'Email 1 also gets 10 subject line options, saved as a doc in the folder.' : "This email shows email 1's subject lines. If email 1's can't be found, it writes 10 and saves the doc."}</p>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2>Use a template, or create a new design?</h2>
            <div className="wz-cards">
              <button className={`wz-card ${design.kind === 'template' ? 'on' : ''}`} onClick={() => setDesign((d) => ({ ...d, kind: 'template' }))}>
                <strong>Use a template</strong><span>One of the 10 HR.com designs, optionally in a client's colors and font.</span>
              </button>
              <button className={`wz-card ${design.kind === 'custom' ? 'on' : ''}`} onClick={() => setDesign((d) => ({ ...d, kind: 'custom' }))}>
                <strong>Create a new design</strong><span>Claude designs a fresh layout from a short brief. Same content, links and tracking; new look. Takes 2–4 minutes.</span>
              </button>
            </div>

            {design.kind === 'custom' && (
              <div className="wz-brief">
                <div className="wz-field">What should this email make people feel or do? <small>Pick any</small>
                  <div className="wz-chips">
                    {FEELS.map((f) => <button key={f} className={design.brief.feel.includes(f) ? 'on' : ''} onClick={() => toggleBrief('feel', f)}>{f}</button>)}
                  </div>
                </div>
                <label className="wz-field">The one message it must deliver <small>Optional, e.g. "Seats are limited", "A big-name speaker you can't miss"</small>
                  <input value={design.brief.message} onChange={(e) => setBrief('message', e.target.value)} />
                </label>
                <div className="wz-field">Look & layout <small>Pick any, or leave it to Claude</small>
                  <div className="wz-chips">
                    {LOOKS.map((f) => <button key={f} className={design.brief.look.includes(f) ? 'on' : ''} onClick={() => toggleBrief('look', f)}>{f}</button>)}
                  </div>
                </div>
                <div className="wz-field">Colors
                  <div className="wz-chips">
                    {[['event', 'HR.com event colors'], ['client', "A client's website"], ['describe', "I'll describe them"]].map(([id, label]) => (
                      <button key={id} className={design.colorSource === id ? 'on' : ''} onClick={() => setDesign((d) => ({ ...d, colorSource: id }))}>{label}</button>
                    ))}
                  </div>
                  {design.colorSource === 'describe' && (
                    <input value={design.brief.colorNote} onChange={(e) => setBrief('colorNote', e.target.value)} placeholder='e.g. "deep purple with a warm gold accent"' />
                  )}
                </div>
                <label className="wz-field">Anything else? <small>Optional: references, things to avoid</small>
                  <textarea rows={2} value={design.brief.notes} onChange={(e) => setBrief('notes', e.target.value)} placeholder='e.g. "No dark backgrounds", "Feel like a conference pass"' />
                </label>
                {!(design.brief.feel.length || design.brief.message.trim()) && <p className="wz-help">Pick at least one feeling or write the message, then continue.</p>}
              </div>
            )}

            {design.kind === 'template' && (
              <div className="wz-seg">
                {[['auto', 'Let the app pick'], ['pick', 'I choose a template'], ['client', 'Match a client website']].map(([id, label]) => (
                  <button key={id} className={design.mode === id ? 'on' : ''} onClick={() => setDesign((d) => ({ ...d, mode: id, pinned: id === 'pick' }))}>{label}</button>
                ))}
              </div>
            )}
            {design.kind === 'template' && design.mode === 'auto' && <p className="wz-help">The app picks a template{series.n > 1 ? ' that no earlier email in this series used' : ''}. You can switch it on the review screen.</p>}
            {isClient && (
              <>
                <p className="wz-help">{design.kind === 'custom' ? "The new design will use the client's colors and font." : "The layout and copy stay the same. Only colors and fonts change to the client's. Pick a layout below, or leave it to the app."}</p>
                <div className="wz-form">
                  <BrandPicker
                    url={design.clientUrl}
                    onUrlChange={(v) => setDesign((d) => ({ ...d, clientUrl: v, clientBrand: null }))}
                    brand={design.clientBrand}
                    onBrand={(b) => setDesign((d) => ({ ...d, clientBrand: b }))}
                  />
                </div>
              </>
            )}
            {design.kind === 'template' && design.mode !== 'auto' && (
              <div className="wz-grid">
                {sampleThumbs.map((html, i) => (
                  <button key={i} className={`wz-tpl ${(design.mode === 'pick' || design.pinned) && design.variantIndex === i ? 'on' : ''}`}
                    onClick={() => setDesign((d) => ({ ...d, variantIndex: i, pinned: d.mode === 'client' ? !(d.pinned && d.variantIndex === i) : true }))}>
                    <Thumb html={html} />
                    <span>{String.fromCharCode(65 + i)}. {TEMPLATES[eventType].variants[i].label}</span>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {step === 3 && (
          <section>
            <h2>Details that aren't on the webcast page</h2>
            <p className="wz-help">From the flowchart sheet. Anything left blank shows as a warning on the review screen.</p>
            <div className="wz-form">
              <label className="wz-field">Header label <small>(the tag next to the logo; blank uses the default)</small>
                <input value={details.badge || ''} onChange={(e) => setDetails((d) => ({ ...d, badge: e.target.value }))} placeholder={TEMPLATES[eventType].variants[0].badge} />
              </label>
              <label className="wz-field">{eventType === 'ondemand' ? 'On-Demand link / AP shortcode' : 'AP shortcode'}
                <input value={details.apShortcode} onChange={(e) => setDetails((d) => ({ ...d, apShortcode: e.target.value }))} placeholder="https://web.hr.com/xxxxx" />
              </label>
              {HAS_VE(eventType) && (
                <>
                  <label className="wz-field">Virtual Event name
                    <input value={details.veName} onChange={(e) => setDetails((d) => ({ ...d, veName: e.target.value }))} placeholder="e.g. HR Demo Day #3" />
                  </label>
                  <label className="wz-field">Virtual Event shortcode
                    <input value={details.veShortcode} onChange={(e) => setDetails((d) => ({ ...d, veShortcode: e.target.value }))} placeholder="https://web.hr.com/xxxxx" />
                  </label>
                </>
              )}
              <div className="wz-field">Recertification credits
                <div className="wz-chips">
                  <button className={!details.credit && !customCredit ? 'on' : ''} onClick={() => { setCustomCredit(false); setDetails((d) => ({ ...d, credit: '' })); }}>No credits</button>
                  {CREDIT_OPTIONS.map((c) => (
                    <button key={c} className={details.credit === c && !customCredit ? 'on' : ''} onClick={() => { setCustomCredit(false); setDetails((d) => ({ ...d, credit: c })); }}>{c}</button>
                  ))}
                  <button className={customCredit || creditIsCustom ? 'on' : ''} onClick={() => setCustomCredit(true)}>Custom…</button>
                </div>
                {(customCredit || creditIsCustom) && (
                  <input value={details.credit} onChange={(e) => setDetails((d) => ({ ...d, credit: e.target.value }))} placeholder="e.g. 1.5 HR Credits" />
                )}
              </div>
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2>Webcast page content</h2>
            <p className="wz-help">On the hr.com webcast page, click <strong>📋 Grab Webcast</strong>, then come back and press the button. <a href="/bookmarklet.html" target="_blank" rel="noreferrer">Install the bookmarklet ↗</a></p>
            <button className="wz-primary" onClick={pasteFromClipboard}>Paste from Webcast Page</button>
            <details className="wz-manual">
              <summary>Or paste the data manually</summary>
              <textarea rows={5} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste the copied webcast data here" />
              <button className="wz-secondary" onClick={() => applyImport(importText)} disabled={!importText.trim()}>Use this data</button>
            </details>
            {importErr && <p className="wz-err">{importErr}</p>}
            {webcast && (
              <div className="wz-summary">
                <h3>{webcast.title || 'Untitled'}</h3>
                <p>{webcast.dateTime || 'No date'} · {webcast.hosts.length} presenter(s) · {webcast.learnings.length} learning(s){webcast.sponsorName ? ` · ${webcast.sponsorName}` : ''}</p>
                {webcast.sponsorLogo && <img src={webcast.sponsorLogo} alt={webcast.sponsorName} />}
                {typeMismatch && <p className="wz-warn">This page looks like a {TEMPLATES[webcast.eventType].name} webcast, but you chose {TEMPLATES[eventType].name}. Go back to step 1 if that's wrong.</p>}
                {webcast.missing.length > 0 && <p className="wz-warn">Not found on the page: {webcast.missing.join(', ')}.</p>}
              </div>
            )}
            {webcast && (
              <div className="wz-box wz-editbox">
                <h3>Check and edit the details <small>(fix anything that didn't copy properly, especially speakers)</small></h3>
                <DetailsEditor eventType={eventType} webcast={webcast} setWebcast={setWebcast} details={details} setDetails={setDetails} />
              </div>
            )}
          </section>
        )}

        {step === 5 && (
          <div className="wz-review">
            <aside className="wz-panel">
              {(busy || progress.length > 0) && (
                <div className="wz-box">
                  <h3>{busy ? `Working… ${elapsed}s` : 'Done'}</h3>
                  <ul className="wz-prog">
                    {progress.map((p) => (
                      <li key={p.label} className={p.state}><span>{p.label}</span>{p.note && <small>{p.note}</small>}</li>
                    ))}
                  </ul>
                </div>
              )}
              {error && <div className="wz-box"><p className="wz-err">{error}</p><button className="wz-secondary" onClick={() => generate()}>Try again</button></div>}

              {job && !busy && (
                <>
                  {missing.length > 0 && <p className="wz-warn">Still empty: {missing.join(', ')}. Fill them in under Email details below.</p>}

                  <div className="wz-box">
                    <details open={missing.length > 0}>
                      <summary><h3>Email details</h3> <small className="wz-note">Title, date, logo, speakers, links and credits. Edits show in the preview right away.</small></summary>
                      <DetailsEditor eventType={eventType} webcast={webcast} setWebcast={setWebcast} details={details} setDetails={setDetails} />
                    </details>
                  </div>

                  <div className="wz-box">
                    <h3>Design</h3>
                    <label className="wz-field">{job.custom ? 'Design' : 'Template'}
                      <select value={job.useCustom ? 'custom' : job.variantIndex} onChange={(e) => setJob((j) => (e.target.value === 'custom'
                        ? { ...j, useCustom: true }
                        : { ...j, useCustom: false, variantIndex: +e.target.value }))}>
                        {job.custom && <option value="custom">★ New design (made for this email)</option>}
                        {TEMPLATES[eventType].variants.map((v, i) => {
                          const used = job.previous?.some((p) => p.recipe?.variantIndex === i);
                          return <option key={i} value={i}>{String.fromCharCode(65 + i)}. {v.label}{used ? ' (used earlier in series)' : ''}</option>;
                        })}
                      </select>
                    </label>
                    {design.kind === 'custom' && (
                      <div className="wz-newdesign">
                        {job.custom && job.useCustom && <small className="wz-note">{job.custom.summary}</small>}
                        {job.custom?.warnings?.length > 0 && job.useCustom && <p className="wz-warn">The design didn't pass every check: {job.custom.warnings.join('; ')}. Ask for a fix below, or make a fresh design.</p>}
                        {job.custom && (
                          <label className="wz-field">Ask for changes <small>Plain words, e.g. "make the hero lighter", "bigger speaker photos"</small>
                            <textarea rows={2} value={changeRequest} onChange={(e) => setChangeRequest(e.target.value)} disabled={designBusy} />
                          </label>
                        )}
                        {job.custom && <button className="wz-secondary" disabled={designBusy || !changeRequest.trim()} onClick={() => redesign({ fresh: false })}>{designBusy ? `Working… ${elapsed}s` : 'Apply changes'}</button>}
                        <button className="wz-secondary" disabled={designBusy} onClick={() => redesign({ fresh: true })}>{designBusy ? `Designing… ${elapsed}s` : job.custom ? '✦ Fresh new design' : '✦ Try the new design again'}</button>
                        {designErr && <p className="wz-err">{designErr}</p>}
                      </div>
                    )}
                    {webcast.sponsorLogo && (
                      <label className="wz-field">Logo height <small>{details.logoHeight || 40}px (width scales with it)</small>
                        <span className="wz-colorrow">
                          <input type="range" min="20" max="90" value={details.logoHeight || 40} onChange={(e) => setDetails((d) => ({ ...d, logoHeight: e.target.value }))} />
                          <input type="number" min="10" max="150" value={details.logoHeight || 40} onChange={(e) => setDetails((d) => ({ ...d, logoHeight: e.target.value }))} />
                        </span>
                      </label>
                    )}
                    {isClient && (
                      <>
                        {!job.brand && <p className="wz-warn">Client branding not applied yet. The preview shows HR.com colors.</p>}
                        <h3 className="wz-sub">Client branding</h3>
                        <BrandPicker
                          key={job.genId}
                          url={design.clientUrl}
                          onUrlChange={(v) => setDesign((d) => ({ ...d, clientUrl: v }))}
                          brand={job.brand}
                          failedNote={job.brand ? '' : (job.brandNote || 'the site could not be read')}
                          onBrand={(b) => {
                            // A new design has the old colors written into it: swap them for the new ones
                            setJob((j) => ({
                              ...j,
                              brand: b,
                              brandNote: '',
                              custom: recolor(j.custom, j.brand ? paletteFromBrand(j.brand) : PALETTES[eventType], paletteFromBrand(b)),
                            }));
                            // Later emails in the series reuse this branding instead of re-reading the site
                            setDesign((d) => ({ ...d, clientBrand: b }));
                          }}
                        />
                      </>
                    )}
                  </div>

                  <div className="wz-box">
                    <h3>Copy <small>(only these parts change between series emails)</small></h3>
                    <label className="wz-field">Preheader <small>{job.copy.preheader.length}/90</small>
                      <input value={job.copy.preheader} onChange={(e) => setJob((j) => ({ ...j, copy: { ...j.copy, preheader: e.target.value } }))} />
                    </label>
                    <label className="wz-field">Intro (problem, blank line, solution)
                      <textarea rows={8} value={job.copy.intro} onChange={(e) => setJob((j) => ({ ...j, copy: { ...j.copy, intro: e.target.value } }))} />
                    </label>
                    {job.copy.learnings.map((l, i) => (
                      <label key={i} className="wz-field">Key learning {i + 1}
                        <input value={l} onChange={(e) => setJob((j) => ({ ...j, copy: { ...j.copy, learnings: j.copy.learnings.map((x, k) => (k === i ? e.target.value : x)) } }))} />
                      </label>
                    ))}
                    <button className="wz-secondary" onClick={() => generate({ keepDesign: true })}>↻ Rewrite the copy</button>
                  </div>

                  <div className="wz-box">
                    <h3>Subject lines</h3>
                    <small className="wz-note">
                      {job.subjectSource === 'new' && 'Edit any line. These are saved as a doc in the Drive folder when you save.'}
                      {job.subjectSource === 'email1' && `From email 1 of this series. Edit them here, or write ${series.n > 1 ? 'a new set for this email' : 'new ones'}.`}
                      {job.subjectSource === 'none' && "Email 1's subject lines weren't found. Write a set for this email."}
                    </small>
                    {job.subjectLines.length > 0 && (
                      <>
                        {/* One box with all lines, like Manual mode. subjectText keeps exactly what was typed. */}
                        <textarea className="wz-subjectbox" rows={11} value={job.subjectText ?? numberLines(job.subjectLines)}
                          onChange={(e) => setJob((j) => ({ ...j, subjectText: e.target.value, subjectLines: parseLines(e.target.value) }))} />
                        {job.subjectLines.some((s) => s.length > 60) && <small className="wz-len over">{job.subjectLines.filter((s) => s.length > 60).length} line(s) are over 60 characters and may be cut off on phones.</small>}
                        <button className="wz-secondary" onClick={() => copyText(job.subjectText ?? numberLines(job.subjectLines), 'subjects')}>{copied === 'subjects' ? '✓ Copied' : 'Copy all'}</button>
                      </>
                    )}
                    <button className="wz-secondary" disabled={subjBusy} onClick={writeSubjects}>{subjBusy ? `Writing… ${elapsed}s` : job.subjectLines.length ? '↻ Write 10 new ones' : 'Write 10 subject lines'}</button>
                    {subjErr && <p className="wz-err">{subjErr}</p>}
                  </div>

                  <div className="wz-box">
                    <h3>Save</h3>
                    <label className="wz-field">Drive folder <small>({TEMPLATES[eventType].name} folder)</small>
                      <input value={names.folder} disabled={!!job.folderId} onChange={(e) => setNames((n) => ({ ...n, folder: e.target.value }))} />
                    </label>
                    {job.folderId && <small>Saving into the existing folder. <a href={job.folderUrl} target="_blank" rel="noreferrer">Open ↗</a></small>}
                    <label className="wz-field">File name
                      <input value={names.file} onChange={(e) => setNames((n) => ({ ...n, file: e.target.value }))} />
                    </label>
                    <button className="wz-primary" disabled={saveState.busy || !!saveState.result} onClick={saveToDrive}>
                      {saveState.busy ? `Saving to Google Drive… ${elapsed}s` : saveState.result ? '✓ Saved' : 'Save to Google Drive'}
                    </button>
                    <button className="wz-secondary" onClick={() => copyText(finalHtml, 'html')}>{copied === 'html' ? '✓ Copied' : 'Copy HTML'}</button>
                    {saveState.error && <p className="wz-err">{saveState.error}</p>}
                    {saveState.result && (
                      <div className="wz-saved">
                        <p><a href={saveState.result.folderUrl} target="_blank" rel="noreferrer">Open folder ↗</a> · <a href={saveState.result.fileUrl} target="_blank" rel="noreferrer">{saveState.result.fileName} ↗</a>{saveState.result.docUrl && <> · <a href={saveState.result.docUrl} target="_blank" rel="noreferrer">Subject lines doc ↗</a></>}</p>
                        <p className={saveState.result.verified ? 'wz-ok' : 'wz-warn'}>{saveState.result.verified ? 'Checked: the file in Drive matches this email exactly.' : 'Could not confirm the Drive copy matches. Open it and check, or use Copy HTML.'}</p>
                        {series.n < series.m && <button className="wz-primary" onClick={nextInSeries}>Create email {series.n + 1} of {series.m} →</button>}
                      </div>
                    )}
                  </div>
                </>
              )}
            </aside>
            <div className="wz-preview">
              {finalHtml ? <iframe title="Email preview" srcDoc={finalHtml} /> : <div className="wz-empty">{busy ? 'Generating… this usually takes about a minute.' : 'No preview yet.'}</div>}
            </div>
          </div>
        )}
      </main>

      {step < 5 && (
        <footer className="wz-nav">
          <button className="wz-secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
          <button className="wz-primary" disabled={!canNext} onClick={() => go(step + 1)}>{step === 4 ? 'Generate email' : 'Next'}</button>
        </footer>
      )}
    </div>
  );
}

const CSS = `
.wz { min-height: 100vh; background: #F1F5F9; font-family: 'Inter', system-ui, sans-serif; color: #1E293B; display: flex; flex-direction: column; }
.wz h1, .wz h2, .wz h3 { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
.wz-top { background: #fff; border-bottom: 1px solid #E2E8F0; padding: 14px 24px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.wz-top h1 { margin: 0; font-size: 18px; color: #02588E; }
.wz-steps { display: flex; gap: 4px; list-style: none; margin: 0 0 0 auto; padding: 0; flex-wrap: wrap; }
.wz-steps button { border: 1px solid #CBD5E1; background: #fff; color: #475569; border-radius: 999px; padding: 6px 12px; font-size: 12px; font-weight: 600; cursor: pointer; }
.wz-steps li.done button { border-color: #93C5FD; color: #02588E; }
.wz-steps li.on button { background: #02588E; border-color: #02588E; color: #fff; }
.wz-steps button:disabled { opacity: .45; cursor: default; }
.wz-main { flex: 1; width: 100%; max-width: 980px; margin: 0 auto; padding: 28px 24px 100px; box-sizing: border-box; }
.wz-main.wide { max-width: none; padding: 20px 24px; }
.wz h2 { font-size: 22px; margin: 0 0 8px; }
.wz-help { color: #64748B; font-size: 14px; line-height: 1.5; max-width: 680px; }
.wz-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 18px; }
.wz-card { text-align: left; border: 2px solid #E2E8F0; background: #fff; border-radius: 14px; padding: 18px; cursor: pointer; display: flex; flex-direction: column; gap: 6px; font: inherit; }
.wz-card strong { font-size: 16px; }
.wz-card span { font-size: 13px; color: #64748B; }
.wz-card.on, .wz-tpl.on { border-color: #02588E; box-shadow: 0 0 0 3px #BFDBFE; }
.wz-row { display: flex; gap: 16px; margin: 16px 0; }
.wz-row label { font-weight: 600; display: flex; align-items: center; gap: 8px; }
.wz-row input { width: 70px; }
.wz input, .wz select, .wz textarea { font: inherit; font-size: 14px; border: 1px solid #CBD5E1; border-radius: 8px; padding: 9px 11px; background: #fff; color: #1E293B; box-sizing: border-box; }
.wz textarea { width: 100%; resize: vertical; line-height: 1.5; }
.wz-field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: .4px; margin: 12px 0 0; }
.wz-field small { text-transform: none; letter-spacing: 0; font-weight: 500; color: #94A3B8; }
.wz-field input, .wz-field select, .wz-field textarea { text-transform: none; letter-spacing: 0; font-weight: 400; width: 100%; }
.wz-form { max-width: 560px; }
.wz-seg, .wz-chips { display: flex; gap: 6px; flex-wrap: wrap; margin: 14px 0 4px; }
.wz-seg button, .wz-chips button { border: 1px solid #CBD5E1; background: #fff; border-radius: 999px; padding: 8px 14px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; color: #475569; text-transform: none; letter-spacing: 0; }
.wz-seg button.on, .wz-chips button.on { background: #02588E; border-color: #02588E; color: #fff; }
.wz-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; margin-top: 18px; }
.wz-tpl { border: 2px solid #E2E8F0; background: #fff; border-radius: 12px; padding: 6px; cursor: pointer; font: inherit; font-size: 12px; font-weight: 600; color: #334155; display: flex; flex-direction: column; gap: 6px; }
.wz-thumb { overflow: hidden; border-radius: 8px; position: relative; pointer-events: none; }
.wz-thumb iframe { border: 0; transform-origin: 0 0; position: absolute; left: 0; top: 0; }
.wz-tpl .wz-thumb { width: 100%; }
.wz-primary, .wz-secondary { font: inherit; font-weight: 700; font-size: 14px; border-radius: 10px; padding: 11px 20px; cursor: pointer; margin: 12px 8px 0 0; }
.wz-primary { background: #02588E; color: #fff; border: 1px solid #02588E; }
.wz-secondary { background: #fff; color: #02588E; border: 1px solid #93C5FD; }
.wz-primary:disabled, .wz-secondary:disabled { opacity: .5; cursor: default; }
.wz-link { background: none; border: 0; color: #02588E; font: inherit; font-weight: 700; cursor: pointer; padding: 0; }
.wz-nav { position: fixed; left: 0; right: 0; bottom: 0; background: #fff; border-top: 1px solid #E2E8F0; padding: 4px 24px 14px; display: flex; justify-content: flex-end; gap: 8px; }
.wz-manual { margin-top: 14px; font-size: 13px; color: #475569; }
.wz-manual summary { cursor: pointer; font-weight: 600; }
.wz-manual textarea { margin-top: 8px; }
.wz-summary { margin-top: 18px; background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; }
.wz-summary h3 { margin: 0 0 4px; font-size: 16px; }
.wz-summary p { margin: 4px 0; font-size: 13px; color: #475569; }
.wz-summary img { max-height: 40px; margin-top: 8px; }
.wz-err { color: #B91C1C; font-size: 13px; font-weight: 600; }
.wz-warn { color: #92400E; background: #FEF3C7; border-radius: 8px; padding: 8px 10px; font-size: 13px; }
.wz-ok { color: #166534; background: #DCFCE7; border-radius: 8px; padding: 8px 10px; font-size: 13px; }
.wz-review { display: flex; gap: 20px; align-items: flex-start; }
.wz-panel { width: 420px; flex-shrink: 0; max-height: calc(100vh - 110px); overflow-y: auto; }
.wz-box { background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 16px; margin-bottom: 12px; }
.wz-box h3 { margin: 0 0 4px; font-size: 15px; }
.wz-box h3 small { font-weight: 500; color: #94A3B8; font-size: 12px; }
.wz-prog { list-style: none; padding: 0; margin: 8px 0 0; font-size: 13px; }
.wz-prog li { padding: 6px 0 6px 24px; position: relative; display: flex; flex-direction: column; gap: 2px; }
.wz-prog li small { color: #64748B; }
.wz-prog li::before { position: absolute; left: 0; top: 6px; font-weight: 700; }
.wz-prog li.run::before { content: '…'; color: #02588E; }
.wz-prog li.done::before { content: '✓'; color: #16A34A; }
.wz-prog li.fail::before { content: '!'; color: #D97706; }
.wz-sub { margin: 16px 0 0 !important; font-size: 13px !important; }
.wz-inline { margin: 0 !important; padding: 9px 14px !important; white-space: nowrap; font-size: 13px !important; }
.wz-swatches { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.wz-swatch { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #334155; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 999px; padding: 4px 10px 4px 4px; }
.wz-swatch i { width: 18px; height: 18px; border-radius: 50%; border: 1px solid #CBD5E1; }
.wz-cssbox { margin-top: 10px; }
.wz-cssbox textarea { font-family: ui-monospace, Consolas, monospace; font-size: 12px; }
.wz-brief { max-width: 720px; margin-top: 8px; }
.wz-brief .wz-chips button { text-transform: none; }
.wz-newdesign { margin-top: 6px; }
.wz-colorrow { display: flex; gap: 8px; align-items: center; }
.wz-colorrow input:first-child { flex: 1; }
.wz-colorrow input[type=color] { width: 46px; height: 38px; padding: 2px; flex: none; }
.wz-colorrow input[type=number] { width: 80px; flex: none; }
.wz-colorrow input[type=range] { padding: 0; border: 0; }
.wz-note { display: block; color: #64748B; font-size: 12px; margin-top: 6px; line-height: 1.4; }
.wz-brandform .wz-help { font-size: 13px; margin: 8px 0 0; }
.wz-brand { display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-end; margin-top: 10px; font-size: 12px; font-weight: 600; text-transform: capitalize; }
.wz-brand label { display: flex; flex-direction: column; gap: 4px; }
.wz-brand input[type=color] { width: 54px; height: 34px; padding: 2px; }
.wz-brand .wz-field { flex: 1; margin: 0; }
.wz-brand small { color: #64748B; font-weight: 400; text-transform: none; }
.wz-subjectbox { margin-top: 8px; font-size: 13px; line-height: 1.6; }
.wz-editbox { margin-top: 16px; max-width: 640px; }
.wz-box details > summary { cursor: pointer; list-style: none; }
.wz-box details > summary h3 { display: inline; }
.wz-box details > summary .wz-note { margin-top: 2px; }
.wz-details input, .wz-details select { width: 100%; }
.wz-under { margin-top: 6px; }
.wz-hostrow { display: flex; gap: 10px; align-items: flex-start; text-transform: none; letter-spacing: 0; font-weight: 400; }
.wz-hostrow > div { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.wz-hostrow img { width: 56px; height: 56px; object-fit: contain; border: 1px solid #E2E8F0; border-radius: 8px; background: #fff; flex: none; }
.wz-hostrow img.round { object-fit: cover; border-radius: 50%; }
.wz-noimg { width: 56px; height: 56px; flex: none; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 10px; color: #94A3B8; border: 1px dashed #CBD5E1; border-radius: 8px; }
.wz-noimg.round { border-radius: 50%; }
.wz-hostcard { position: relative; border: 1px solid #E2E8F0; border-radius: 10px; padding: 10px; margin-top: 8px; background: #F8FAFC; }
.wz-remove { position: absolute; right: 8px; bottom: 8px; background: #FEE2E2; color: #B91C1C; border: 0; border-radius: 6px; padding: 3px 8px; font-size: 11px; font-weight: 700; cursor: pointer; }
.wz-hostcard .wz-hostrow > div { padding-bottom: 22px; }
.wz-subjects { margin: 8px 0 0; padding-left: 22px; font-size: 13px; line-height: 1.6; }
.wz-subjects li { margin-bottom: 6px; }
.wz-subjects input { width: 100%; font-size: 13px; padding: 7px 9px; }
.wz-len { display: block; font-size: 11px; color: #94A3B8; text-align: right; }
.wz-len.over { color: #B45309; }
.wz-saved p { font-size: 13px; }
.wz-preview { flex: 1; display: flex; justify-content: center; }
.wz-preview iframe { width: 640px; height: calc(100vh - 110px); border: 1px solid #CBD5E1; border-radius: 12px; background: #fff; }
.wz-empty { width: 640px; height: 400px; display: flex; align-items: center; justify-content: center; color: #64748B; border: 1px dashed #CBD5E1; border-radius: 12px; }
@media (max-width: 1100px) { .wz-review { flex-direction: column; } .wz-panel { width: 100%; max-height: none; } .wz-preview iframe, .wz-empty { width: 100%; } }
`;
