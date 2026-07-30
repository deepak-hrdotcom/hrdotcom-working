import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowRight, ChevronRight, Calculator, DollarSign, CheckCircle } from 'lucide-react';
import convinceBossHero from '../assets/convince_boss_hero.png';

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
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ══════════ CINEMATIC HERO ══════════ */}
      <section style={{
        position: 'relative',
        height: '480px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* 1. Full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${convinceBossHero})`,
          backgroundSize: 'cover',
          backgroundPosition: '55% center',
        }} />

        {/* 2. Multi-layer gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(90deg,
              rgba(11,8,20,0.96) 0%,
              rgba(60,15,80,0.88) 38%,
              rgba(100,10,80,0.55) 62%,
              rgba(0,0,0,0.15) 100%
            ),
            linear-gradient(180deg,
              rgba(11,8,20,0.6) 0%,
              transparent 30%,
              transparent 65%,
              rgba(11,8,20,0.75) 100%
            )
          `,
        }} />

        {/* 3. Ambient glow orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(145,39,140,0.22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '30%',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(239,20,110,0.18) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
        </div>

        {/* 4. Content grid */}
        <div className="container-wide" style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '5fr 3fr 4fr',
          gap: '0',
          alignItems: 'center',
          justifyItems: 'start',
          height: '100%',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}>

          {/* LEFT: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: '520px',
              paddingRight: '2rem',
            }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              letterSpacing: '-0.04em', lineHeight: 1.05,
              color: '#fff',
              marginBottom: '1.1rem',
              textAlign: 'left',
              textWrap: 'initial' as const,
            }}>
              Get Your Boss to<br />
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Say Yes</span>
            </h1>

            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '400px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              We've done the hard work. Grab our ROI calculator, expense letter template, and justification toolkit.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#toolkit" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
              }}>
                Get the Toolkit <ChevronRight size={15} />
              </a>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.3rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none',
              }}>
                <CheckCircle size={14} /> Pre-Register First
              </Link>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating toolkit cards widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              position: 'relative', height: '360px', display: 'flex',
              flexDirection: 'column', justifyContent: 'center'
            }}
          >
            {[
              { icon: Calculator, label: 'ROI Calculator', sub: 'Custom ROI breakdown', rotate: '-2deg', offset: '0px', delay: 0.2 },
              { icon: FileText, label: 'Letter Template', sub: 'Editable approval request', rotate: '1.5deg', offset: '16px', delay: 0.32 },
              { icon: DollarSign, label: 'Expense Estimator', sub: 'Clear budget justification', rotate: '-1deg', offset: '8px', delay: 0.44 },
            ].map(({ icon: Icon, label, sub, rotate, offset, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: `${i * 105 + 10}px`,
                  left: offset,
                  width: '260px',
                  background: 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '16px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  zIndex: 3 - i,
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(239,20,110,0.25), rgba(145,39,140,0.35))',
                  border: '1px solid rgba(239,20,110,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={20} color="#ff6ba0" />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '0.88rem', color: '#fff', marginBottom: '0.15rem'
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)',
                    fontFamily: 'var(--font-body)', fontWeight: 500
                  }}>
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '60px',
          background: 'linear-gradient(0deg, var(--color-canvas) 0%, transparent 100%)',
        }} />
      </section>

      {/* ── Generator ── */}
      <section id="toolkit" style={{ background: 'var(--color-canvas)', padding: '4rem 0 5rem' }}>
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
