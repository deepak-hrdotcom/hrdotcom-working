import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Target, CheckCircle, Send, Sparkles, Building2, Zap, TrendingUp } from 'lucide-react';

export const WhySponsorPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });

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
              <Building2 size={13} /> Exhibitor & Sponsor Prospectus
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem', maxWidth: '700px' }}>
              Reach & Connect with High-Intent HR Decision-Makers
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '650px', lineHeight: 1.7 }}>
              HRWest is Silicon Valley's flagship HR gathering. Connect face-to-face with buyers actively seeking payroll, benefits, talent acquisition, and AI solution providers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Audience Stats ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Users, number: '68%', label: 'Manager & Above', desc: 'CHROs, VPs of HR, Directors, and People Ops managers actively evaluating vendor solutions.', color: 'var(--color-brand-purple)' },
              { icon: Target, number: '84%', label: 'Direct Buying Authority', desc: 'Attendees possess final purchasing or evaluation authority for HR technology and benefit contracts.', color: 'var(--color-brand-pink)' },
              { icon: BarChart3, number: '100–5K+', label: 'Company Size Range', desc: 'Mid-market to enterprise organizations with active HR technology budgets.', color: 'var(--color-brand-purple)' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  style={{
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.25rem',
                    border: '1px solid var(--color-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '120px', height: '120px', background: `radial-gradient(circle, ${stat.color}12 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 4px 14px rgba(145,39,140,0.3)' }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.25rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.35rem' }}>
                    {stat.number}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{stat.label}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{stat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Exhibit + Prospectus Form ── */}
      <section style={{ background: 'var(--color-surface)', padding: '5rem 0' }}>
        <div className="container-wide">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* Left: Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="badge badge-brand" style={{ marginBottom: '1rem' }}>Sponsorship Packages</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
                Why Exhibit at HRWest 2027?
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Zap, title: 'High-Density Booth Traffic', desc: 'Breakfast, lunch, and networking receptions hosted directly inside the Sponsor Exhibit Hall — maximum exposure, no off-site events.' },
                  { icon: TrendingUp, title: 'Thought Leadership Speaking', desc: 'Platinum & Diamond packages include dedicated track presentation slots with full AV support and attendee lead capture.' },
                  { icon: Sparkles, title: 'Turnkey Badge Scanning & Leads', desc: 'Full attendee lead retrieval app included with all booth packages. Export contacts directly to your CRM after the event.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} style={{
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
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-md)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                Request 2027 Sponsor Prospectus
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                Fill out the form below to receive the complete sponsorship kit, booth pricing, and audience demographics report.
              </p>

              {submitted ? (
                <div style={{ padding: '2rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(145,39,140,0.2)' }}>
                  <CheckCircle size={40} style={{ color: 'var(--color-brand-purple)', marginBottom: '0.75rem' }} />
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Prospectus Request Sent!</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    Our sponsorship team will send the 2027 prospectus kit to {formData.email} within 1 business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Work Email', key: 'email', type: 'email' },
                    { label: 'Company Name', key: 'company', type: 'text' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>{f.label}</label>
                      <input
                        type={f.type}
                        required
                        value={formData[f.key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Send Me the Prospectus <Send size={18} />
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
