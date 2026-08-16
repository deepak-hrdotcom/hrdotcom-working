import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Send, Download } from 'lucide-react';
import whySponsorHero from '../assets/why_sponsor_hero.webp';
import sponsorsHero from '../assets/sponsors_hero.webp';

export const WhySponsorPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ══════════ CINEMATIC HERO ══════════ */}
      <section style={{
        position: 'relative',
        height: '460px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${whySponsorHero})`,
          backgroundSize: 'cover',
          backgroundPosition: '55% center',
        }} />

        {/* Multi-layer gradient overlay */}
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

        {/* Ambient glow orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, var(--brand-glow-22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
        </div>

        {/* Content grid */}
        <div className="container-wide hero-3col-grid" style={{
          position: 'relative', zIndex: 2,
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
            }}>
              Reach 1,000+<br />
              <span style={{
                background: 'var(--gradient-brand-glow)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>HR Decision-Makers</span>
            </h1>

            <p style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '420px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              HRWest delivers direct access to VP and C-suite HR buyers actively evaluating solutions for 2027.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#prospectus-form" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.75rem 1.6rem',
                background: 'var(--gradient-brand)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.86rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px var(--brand-pink-glow-45, var(--brand-glow-40))',
              }}>
                Download Prospectus <Download size={16} />
              </a>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating stat cards widget */}
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
              { num: '700+', label: 'HR Leaders Attending', rotate: '-2deg', offset: '0px', delay: 0.2 },
              { num: '68%', label: 'Manager & CHRO Level', rotate: '1.5deg', offset: '16px', delay: 0.32 },
              { num: '84%', label: 'Direct Buying Authority', rotate: '-1deg', offset: '8px', delay: 0.44 },
            ].map(({ num, label, rotate, offset, delay }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: `${i * 105 + 10}px`,
                  left: offset,
                  width: '250px',
                  background: 'rgba(255,255,255,0.11)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '16px',
                  padding: '0.9rem 1.1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  zIndex: 3 - i,
                }}
              >
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: 'var(--gradient-brand)',
                  boxShadow: '0 0 10px var(--color-brand-pink)', flexShrink: 0,
                }} />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: '1.8rem', color: '#fff', lineHeight: 1,
                    letterSpacing: '-0.03em', marginBottom: '0.2rem'
                  }}>
                    {num}
                  </div>
                  <div style={{
                    fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)',
                    fontFamily: 'var(--font-body)', fontWeight: 500,
                  }}>
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTED STATS BANNER PILL (MATCHING LIVE SITE SCREENSHOT) ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2.5rem 0' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--gradient-brand)',
              borderRadius: 'var(--radius-full)',
              padding: '1.5rem 2.5rem',
              boxShadow: '0 12px 35px var(--brand-glow-35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {[
              { stat: '700+', label: 'Attendees Projected' },
              { stat: '30+', label: 'Projected Exhibitors' },
              { stat: '$6,000', label: 'Sponsorship Starting' },
              { stat: '50+', label: 'Speakers' },
            ].map((item, idx) => (
              <div key={idx} style={{ color: '#ffffff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)', lineHeight: 1, marginBottom: '0.25rem' }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: '0.86rem', fontWeight: 600, opacity: 0.9, fontFamily: 'var(--font-body)' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ROI OPPORTUNITIES & ACTION-PACKED EXHIBITING (MATCHING LIVE SITE SCREENSHOT) ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '3rem 0 5rem' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}>

            {/* LEFT: ROI OPPORTUNITIES */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'var(--color-elevated)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1.5px solid var(--color-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span className="eyebrow" style={{ marginBottom: '0.4rem' }}>Maximizing Impact</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                ROI Opportunities
              </h2>
              <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                Reach your marketing goals with the valuable sponsorship options at HRWest 2026 / 2027.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                  { title: 'Thought leadership', desc: "Grab HR professionals' attention with our popular sponsored session and roundtable packages." },
                  { title: 'Leads', desc: 'Seize opportunities that make attendees flock to your tabletop booth.' },
                  { title: 'Branding', desc: "Put your company in attendees' minds with prominent logo placements." },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--gradient-brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--brand-glow-20)', marginTop: '0.15rem' }}>
                      <CheckCircle size={15} color="var(--color-brand-purple)" />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>{item.title}: </strong>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#prospectus-form" className="btn btn-primary btn-md">
                Download Sponsorship Brochure <Download size={16} />
              </a>
            </motion.div>

            {/* RIGHT: ACTION-PACKED EXHIBITING */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'var(--color-elevated)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                border: '1.5px solid var(--color-subtle)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: '0.4rem', color: 'var(--color-brand-authority)' }}>Exhibitor Experience</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 2.8vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                  Action-Packed Exhibiting
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>
                  Our exhibit experience is just the right size — enough exhibitors to attract attendees, but not so many that you're lost in the crowd. Prepare for your representatives to be busy with business conversations!
                </p>
              </div>

              {/* Photo Box */}
              <div style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                height: '240px',
                position: 'relative',
              }}>
                <img
                  src={sponsorsHero}
                  alt="HRWest Exhibitors in action"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(11,8,20,0.7) 100%)',
                }} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 5 TYPES OF SOLUTIONS ATTENDEES ARE SEEKING ── */}
      <section style={{ background: 'var(--color-surface)', padding: '4.5rem 0', borderTop: '1px solid var(--color-subtle)', borderBottom: '1px solid var(--color-subtle)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Target size={14} /> High-Demand Solutions
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', margin: 0, color: 'var(--color-text-primary)' }}>
              5 Types of Solutions Our Attendees Are Seeking
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              HR decision-makers attend HRWest with active budget allocations for key solution categories:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { num: '01', title: 'AI-Powered People Analytics', desc: 'For smarter, faster, and more confident talent decisions & predictive modeling.' },
              { num: '02', title: 'Performance Management Software', desc: 'To maximize productivity, manage OKRs, and boost manager effectiveness.' },
              { num: '03', title: 'Retention & Engagement Solutions', desc: 'Employee experience, mental well-being, rewards & recognition platforms.' },
              { num: '04', title: 'Efficiency & Automation Tools', desc: 'LMS, time & attendance, workflow automation, and HCM integrations.' },
              { num: '05', title: 'Coaching & Development Platforms', desc: 'To support reskilling, executive growth, internal mobility, and career paths.' },
            ].map((sol) => (
              <motion.div
                key={sol.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'var(--color-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem 1.5rem',
                  border: '1.5px solid rgba(145, 39, 140, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ position: 'absolute', top: '0.75rem', right: '1rem', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', color: 'rgba(145, 39, 140, 0.12)' }}>
                  {sol.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.6rem', lineHeight: 1.35, paddingRight: '1.5rem' }}>
                    {sol.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                    {sol.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROSPECTUS REQUEST FORM ── */}
      <section id="prospectus-form" style={{ background: 'var(--color-canvas)', padding: '5rem 0' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'var(--color-elevated)',
                borderRadius: 'var(--radius-xl)',
                padding: '3rem 2.5rem',
                border: '1.5px solid var(--brand-glow-25)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                  <Download size={13} /> 2027 Sponsorship Kit
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                  Download Sponsorship Brochure
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0 }}>
                  Fill out the form below to receive full booth options, pricing, and audience demographics.
                </p>
              </div>

              {submitted ? (
                <div style={{ padding: '2rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--brand-glow-20)' }}>
                  <CheckCircle size={40} style={{ color: 'var(--color-brand-purple)', marginBottom: '0.75rem' }} />
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Prospectus Request Sent!</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    Our sponsorship team will email the 2027 prospectus kit to {formData.email} within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. David Miller' },
                    { label: 'Work Email', key: 'email', type: 'email', placeholder: 'david@company.com' },
                    { label: 'Company Name', key: 'company', type: 'text', placeholder: 'e.g. TechCorp Solutions' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>{f.label}</label>
                      <input
                        type={f.type}
                        required
                        placeholder={f.placeholder}
                        value={formData[f.key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Download Sponsorship Brochure <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhySponsorPage;
