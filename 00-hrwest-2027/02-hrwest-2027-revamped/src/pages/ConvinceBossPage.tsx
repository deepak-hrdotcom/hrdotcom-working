import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowRight, Sparkles } from 'lucide-react';

export const ConvinceBossPage: React.FC = () => {
  const [attendeeName, setAttendeeName] = useState('Alex Morgan');
  const [bossName, setBossName] = useState('Sarah Jenkins');
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [selectedTrack, setSelectedTrack] = useState('HR Strategy & AI');
  const [copied, setCopied] = useState(false);

  const generatedEmail = `Subject: Professional Development & Approval Request: HRWest 2027 Conference

Hi ${bossName},

I would like to request approval to attend HRWest 2027, taking place March 23–24, 2027 at the South San Francisco Conference Center.

Attending this 2-day conference will directly benefit ${companyName} by allowing me to gain actionable insights in ${selectedTrack}, legal compliance updates, and AI implementation strategies.

Here is a quick summary of the ROI for ${companyName}:
1. Recertification Credits: I will earn 20+ SHRM & HRCI recertification credits, saving on separate training courses.
2. High-Impact Sessions: Keynotes include global HR leaders from Automation Anywhere, Otter.ai, BDO USA, and more.
3. Actionable Takeaways: I will bring back a post-conference debrief document and session slides to share with our entire HR team.

Estimated Expenses:
- Conference Pass: $995 (Early Bird Rate)
- Travel & Hotel: Minimal local Bay Area transit

Thank you for considering this investment in our HR capabilities. I look forward to discussing this with you.

Best regards,
${attendeeName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <Sparkles size={13} /> Employer Approval Toolkit
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem', maxWidth: '700px' }}>
              Get Your Employer to Send You to HRWest 2027
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '600px', lineHeight: 1.7 }}>
              Need manager sign-off? Use our interactive ROI justification generator to create a customized approval email in under 60 seconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Generator ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0 5rem' }}>
        <div className="container-wide">
          <div className="grid-2" style={{ alignItems: 'start' }}>

            {/* Input Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-md)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={22} style={{ color: 'var(--color-brand-purple)' }} /> Customize Your Request
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                {[
                  { label: 'Your Name', value: attendeeName, setter: setAttendeeName },
                  { label: "Manager's Name", value: bossName, setter: setBossName },
                  { label: 'Company Name', value: companyName, setter: setCompanyName },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>{f.label}</label>
                    <input
                      type="text"
                      value={f.value}
                      onChange={e => f.setter(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)' }}
                      onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                      onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Primary Focus Track</label>
                  <select
                    value={selectedTrack}
                    onChange={e => setSelectedTrack(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', cursor: 'pointer' }}
                  >
                    {['HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness'].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Email Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-md)' }}
            >
              {/* Fake browser chrome */}
              <div style={{ background: 'var(--color-surface)', padding: '0.85rem 1.25rem', borderBottom: '1px solid var(--color-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {['#ef4444', '#f59e0b', '#22c55e'].map(c => <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-text-secondary)', marginLeft: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Mail size={14} /> Generated Email Preview
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={copied ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
                  style={{ padding: '0.35rem 0.85rem' }}
                >
                  {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div style={{ padding: '1.75rem' }}>
                <textarea
                  readOnly
                  value={generatedEmail}
                  style={{
                    width: '100%', height: '380px', padding: '0',
                    border: 'none', background: 'transparent',
                    fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                    lineHeight: 1.65, resize: 'none',
                    color: 'var(--color-text-secondary)',
                    outline: 'none',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 0' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Already Got Approval? Secure Your Spot.
            </h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary btn-lg">Pre-Register Now <ArrowRight size={20} /></Link>
              <Link to="/attend/team" className="btn btn-outline btn-lg">Team Discounts</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
