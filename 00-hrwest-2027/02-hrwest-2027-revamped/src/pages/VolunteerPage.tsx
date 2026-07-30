import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, CheckCircle, Send, Award, Calendar, Sparkles } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <HeartHandshake size={13} /> Earn a Complimentary Pass
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem' }}>
              Volunteer at HRWest 2027
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '600px', lineHeight: 1.7 }}>
              Gain full access to keynotes, sessions, and networking by supporting our event operations team for half-day shifts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits + Form ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0 5rem' }}>
        <div className="container-wide">
          <div className="grid-2" style={{ alignItems: 'start' }}>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
                Volunteer Benefits & Responsibilities
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Sparkles, title: 'Free Full-Conference Registration', desc: 'Receive full access to all keynotes, breakout sessions, and sponsor hall exhibits during your off-shift hours. A $995 value — yours for volunteering.' },
                  { icon: Award, title: 'Earn SHRM & HRCI Recertification Credits', desc: 'Attend sessions during non-shift hours and earn official recertification credits toward your SHRM or HRCI renewal.' },
                  { icon: Calendar, title: 'Flexible Half-Day Shifts', desc: 'Choose your preferred shift: morning or afternoon on either conference day. Roles include Session Room Monitor, Registration Desk, and Speaker Support.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} style={{
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    border: '1px solid var(--color-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(145,39,140,0.15)' }}>
                      <Icon size={20} style={{ color: 'var(--color-brand-purple)' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '0.3rem' }}>{title}</div>
                      <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-md)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HeartHandshake size={22} style={{ color: 'var(--color-brand-purple)' }} /> Volunteer Application
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem' }}>
                Apply below and our volunteer coordinator will contact you within 2 business days.
              </p>

              {submitted ? (
                <div style={{ padding: '2rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(145,39,140,0.2)' }}>
                  <CheckCircle size={40} style={{ color: 'var(--color-brand-purple)', marginBottom: '0.75rem' }} />
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Application Submitted!</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    Thank you for applying to volunteer at HRWest 2027. We'll be in touch shortly!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {[
                    { label: 'Full Name', type: 'text' },
                    { label: 'Email Address', type: 'email' },
                    { label: 'Current HR Title / Organization', type: 'text' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>{f.label}</label>
                      <input type={f.type} required style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Preferred Shift Availability</label>
                    <select style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', cursor: 'pointer' }}>
                      <option>Day 1 Morning (March 23)</option>
                      <option>Day 1 Afternoon (March 23)</option>
                      <option>Day 2 Morning (March 24)</option>
                      <option>Day 2 Afternoon (March 24)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Submit Application <Send size={18} />
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
