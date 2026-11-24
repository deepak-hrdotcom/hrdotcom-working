import { useState } from 'react';
import { parseCssColor, parseFontCss } from './brand';

const COLOR_FIELDS = [
  { key: 'primary', label: 'Main brand color', hint: 'Logo, main buttons, links', required: true },
  { key: 'secondary', label: 'Second accent color', hint: 'Optional' },
  { key: 'dark', label: 'Dark color', hint: 'Optional: navy/charcoal backgrounds' },
];

// Client colors and font entered by hand, e.g. copied from the site in browser DevTools.
// initial: a brand object ({ primary, secondary, dark, fontFamily, serif, googleFontsUrl }) or null
export default function BrandForm({ initial, onApply, applyLabel = 'Apply branding' }) {
  const [v, setV] = useState(() => ({
    primary: initial?.primary || '',
    secondary: initial?.secondary && initial.secondary !== initial.primary ? initial.secondary : '',
    dark: initial?.dark || '',
    font: initial?.fontFamily ? `'${initial.fontFamily}', ${initial.serif ? 'Georgia, serif' : 'Arial, sans-serif'}` : '',
    googleFontsUrl: initial?.googleFontsUrl || '',
  }));
  const [applied, setApplied] = useState(false);
  const set = (k, val) => { setV((x) => ({ ...x, [k]: val })); setApplied(false); };

  const parsed = Object.fromEntries(COLOR_FIELDS.map((f) => [f.key, parseCssColor(v[f.key])]));
  const font = parseFontCss(v.font);
  const badColor = COLOR_FIELDS.filter((f) => v[f.key].trim() && !parsed[f.key]);
  const badUrl = v.googleFontsUrl.trim() && !/^https:\/\/fonts\.googleapis\.com\//.test(v.googleFontsUrl.trim());
  const canApply = parsed.primary && !badColor.length && !badUrl;

  function apply() {
    onApply({
      ...(initial || {}),
      primary: parsed.primary,
      secondary: parsed.secondary || parsed.primary,
      dark: parsed.dark || '',
      fontFamily: font?.family || '',
      serif: !!font?.serif,
      googleFontsUrl: v.googleFontsUrl.trim(),
      brandName: initial?.brandName || 'Client',
      manual: true,
    });
    setApplied(true);
  }

  return (
    <div className="wz-brandform">
      <p className="wz-help">Paste values from the client site (in Chrome: right-click › Inspect › Styles). Colors can be hex, rgb() or hsl().</p>
      {COLOR_FIELDS.map((f) => (
        <label key={f.key} className="wz-field">{f.label} <small>{f.hint}</small>
          <span className="wz-colorrow">
            <input value={v[f.key]} onChange={(e) => set(f.key, e.target.value)} placeholder={f.required ? '#F06F1F' : ''} />
            <input type="color" aria-label={`${f.label} picker`} value={parsed[f.key] || '#FFFFFF'} onChange={(e) => set(f.key, e.target.value.toUpperCase())} />
          </span>
        </label>
      ))}
      <label className="wz-field">Font <small>Optional: the font-family value</small>
        <input value={v.font} onChange={(e) => set('font', e.target.value)} placeholder="'Myriad Pro', Arial, sans-serif" />
      </label>
      {font && <small className="wz-note">Uses “{font.family}”, with {font.serif ? 'Georgia' : 'Arial'} where the font isn't available (Outlook, some Gmail apps).</small>}
      <label className="wz-field">Google Fonts link <small>Optional: only if the site loads its font from fonts.googleapis.com</small>
        <input value={v.googleFontsUrl} onChange={(e) => set('googleFontsUrl', e.target.value)} placeholder="https://fonts.googleapis.com/css2?family=…" />
      </label>
      {badColor.length > 0 && <p className="wz-err">Not a color I can read: {badColor.map((f) => f.label).join(', ')}. Use hex (#F06F1F), rgb() or hsl().</p>}
      {badUrl && <p className="wz-err">The Google Fonts link must start with https://fonts.googleapis.com/</p>}
      <button className="wz-primary" disabled={!canApply} onClick={apply}>{applied ? '✓ Applied' : applyLabel}</button>
      <small className="wz-note">Colors are darkened or lightened automatically where needed so text stays readable.</small>
    </div>
  );
}
