import { useState } from 'react';
import BrandForm from './BrandForm';
import { isHex } from './brand';

async function readBrand(body) {
  const r = await fetch('/api/brand', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({ error: `Server error ${r.status}` }));
  if (!r.ok || data.error) throw new Error(data.error || `Server error ${r.status}`);
  if (!data.ok || !isHex(data.primary)) throw new Error(data.reason || 'No brand colors found.');
  return data;
}

const Swatch = ({ color, label }) => (isHex(color)
  ? <span className="wz-swatch"><i style={{ background: color }} />{label} {color}</span>
  : null);

// Client branding: reads the website first. Only when that fails does it ask for CSS pasted
// from the site; the fields underneath are for fine-tuning either result.
// brand: current brand object or null. failedNote: why an earlier automatic read failed (opens the CSS box).
export default function BrandPicker({ url, onUrlChange, brand, onBrand, failedNote = '' }) {
  const [state, setState] = useState({ busy: '', error: failedNote });
  const [css, setCss] = useState('');
  const showCss = !!state.error && !brand;

  async function run(body, which) {
    setState({ busy: which, error: '' });
    try {
      onBrand(await readBrand(body));
      setState({ busy: '', error: '' });
      setCss('');
    } catch (e) {
      setState({ busy: '', error: e.message });
    }
  }

  return (
    <div className="wz-picker">
      <label className="wz-field">Client website URL
        <span className="wz-colorrow">
          <input placeholder="https://www.example.com" value={url} onChange={(e) => onUrlChange(e.target.value)} />
          <button className="wz-secondary wz-inline" disabled={!/\S+\.\S+/.test(url) || !!state.busy} onClick={() => run({ url: url.trim() }, 'url')}>
            {state.busy === 'url' ? 'Reading…' : brand ? 'Read again' : 'Read colors & font'}
          </button>
        </span>
      </label>
      {!brand && !state.error && <p className="wz-help">Click the button to check now, or just continue: the app reads the site when it makes the email.</p>}

      {brand && (
        <div className="wz-brandok">
          <p className="wz-ok">✓ {brand.manual ? 'Using the values you entered' : `Found ${brand.brandName || 'the brand'}'s colors${brand.fontFamily ? ' and font' : ''}`}</p>
          <div className="wz-swatches">
            <Swatch color={brand.primary} label="Main" />
            {brand.secondary !== brand.primary && <Swatch color={brand.secondary} label="Accent" />}
            <Swatch color={brand.dark} label="Dark" />
            {brand.fontFamily && <span className="wz-swatch">Font: {brand.fontFamily}</span>}
          </div>
        </div>
      )}

      {showCss && (
        <div className="wz-cssbox">
          <p className="wz-warn">Couldn't read the website automatically{state.error ? ` (${state.error})` : ''}. Paste its CSS below and the app will pick the colors and font from it.</p>
          <p className="wz-help">In Chrome on the client site: right-click the logo or a main button › <strong>Inspect</strong>, then copy the <strong>Styles</strong> panel (or the color and font-family lines). Pasting styles from a few elements (logo, button, headings, body text) works best.</p>
          <textarea rows={6} value={css} onChange={(e) => setCss(e.target.value)} placeholder={'.btn-primary { background-color: #F06F1F; }\nbody { font-family: "Myriad Pro", Arial, sans-serif; color: rgb(25, 61, 106); }'} />
          <button className="wz-primary" disabled={!css.trim() || !!state.busy} onClick={() => run({ url: url.trim(), css }, 'css')}>
            {state.busy === 'css' ? 'Reading the CSS…' : 'Pick colors & font from this CSS'}
          </button>
        </div>
      )}
      {state.error && brand && <p className="wz-err">{state.error}</p>}

      {(brand || showCss) && (
        <details className="wz-manual">
          <summary>{brand ? 'Adjust colors or font by hand' : 'Or type the colors and font by hand'}</summary>
          <BrandForm key={JSON.stringify(brand)} initial={brand} onApply={onBrand} applyLabel={brand ? 'Update' : 'Use these values'} />
        </details>
      )}
    </div>
  );
}
