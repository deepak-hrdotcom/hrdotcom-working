import { CREDIT_OPTIONS } from './assemble';
import { TEMPLATES } from './templates';

const HAS_VE = (t) => t === 'demo' || t === 'virtual';
const MAX_HOSTS = 5;

// Every fact in the email, editable like Manual mode: the webcast page data (webcast) and the
// details from the flowchart sheet (details). Used on the Webcast step and on the review screen.
export default function DetailsEditor({ eventType, webcast, setWebcast, details, setDetails }) {
  const w = (k) => (e) => setWebcast((x) => ({ ...x, [k]: e.target.value }));
  const d = (k) => (e) => setDetails((x) => ({ ...x, [k]: e.target.value }));
  const hosts = webcast.hosts || [];
  const setHost = (i, k, v) => setWebcast((x) => ({ ...x, hosts: x.hosts.map((h, j) => (j === i ? { ...h, [k]: v } : h)) }));
  const creditPreset = CREDIT_OPTIONS.includes(details.credit) ? details.credit : details.credit ? 'custom' : '';

  return (
    <div className="wz-details">
      <label className="wz-field">Header label <small>(the tag next to the logo; blank uses the default)</small>
        <input value={details.badge || ''} onChange={d('badge')} placeholder={TEMPLATES[eventType].variants[0].badge} />
      </label>
      <label className="wz-field">Webcast title
        <input value={webcast.title} onChange={w('title')} />
      </label>
      {eventType !== 'ondemand' && (
        <label className="wz-field">Date & time <small>e.g. December 10, 2026 at 1:00 PM - 2:00 PM ET</small>
          <input value={webcast.dateTime} onChange={w('dateTime')} />
        </label>
      )}

      <div className="wz-field">Presenter logo & name
        <div className="wz-hostrow">
          {webcast.sponsorLogo ? <img src={webcast.sponsorLogo} alt="" /> : <span className="wz-noimg">No logo</span>}
          <div>
            <input value={webcast.sponsorLogo} onChange={w('sponsorLogo')} placeholder="Logo image URL" />
            <input value={webcast.sponsorName} onChange={w('sponsorName')} placeholder="Company name (logo alt text)" />
          </div>
        </div>
      </div>

      <label className="wz-field">{eventType === 'ondemand' ? 'On-Demand link / AP shortcode' : 'AP shortcode'}
        <input value={details.apShortcode} onChange={d('apShortcode')} placeholder="https://web.hr.com/xxxxx" />
      </label>
      {HAS_VE(eventType) && (
        <>
          <label className="wz-field">Virtual Event name
            <input value={details.veName} onChange={d('veName')} />
          </label>
          <label className="wz-field">Virtual Event shortcode
            <input value={details.veShortcode} onChange={d('veShortcode')} placeholder="https://web.hr.com/xxxxx" />
          </label>
        </>
      )}

      <label className="wz-field">Recertification credits
        <select value={creditPreset} onChange={(e) => setDetails((x) => ({ ...x, credit: e.target.value === 'custom' ? ' ' : e.target.value }))}>
          <option value="">No credits</option>
          {CREDIT_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          <option value="custom">Custom value…</option>
        </select>
      </label>
      {creditPreset === 'custom' && (
        <input className="wz-under" value={details.credit.trimStart()} onChange={d('credit')} placeholder="e.g. 1.5 HR Credits" />
      )}

      <div className="wz-field">Speakers <small>{hosts.length}/{MAX_HOSTS}. Tip: right-click a speaker photo on the webcast page › Copy image address</small></div>
      {hosts.map((h, i) => (
        <div key={i} className="wz-hostcard">
          <div className="wz-hostrow">
            {h.image ? <img src={h.image} alt="" className="round" /> : <span className="wz-noimg round">No photo</span>}
            <div>
              <input value={h.image} onChange={(e) => setHost(i, 'image', e.target.value)} placeholder="Photo URL" />
              <input value={h.name} onChange={(e) => setHost(i, 'name', e.target.value)} placeholder="Name" />
              <input value={h.title} onChange={(e) => setHost(i, 'title', e.target.value)} placeholder="Designation, Company" />
            </div>
          </div>
          <button className="wz-remove" onClick={() => setWebcast((x) => ({ ...x, hosts: x.hosts.filter((_, j) => j !== i) }))}>Remove</button>
        </div>
      ))}
      {hosts.length < MAX_HOSTS && (
        <button className="wz-link" onClick={() => setWebcast((x) => ({ ...x, hosts: [...(x.hosts || []), { name: '', title: '', image: '' }] }))}>+ Add speaker</button>
      )}
    </div>
  );
}
