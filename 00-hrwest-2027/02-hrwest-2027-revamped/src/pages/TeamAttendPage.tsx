import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle, Users, Sparkles, TrendingUp } from 'lucide-react';

export const TeamAttendPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);

  const basePricePerTicket = 995;

  const calculateDiscount = (size: number) => {
    if (size >= 10) return 0.35;
    if (size >= 6) return 0.25;
    if (size >= 3) return 0.15;
    return 0;
  };

  const discountRate = calculateDiscount(teamSize);
  const discountedPricePerTicket = Math.round(basePricePerTicket * (1 - discountRate));
  const totalStandardPrice = basePricePerTicket * teamSize;
  const totalDiscountedPrice = discountedPricePerTicket * teamSize;
  const totalSavings = totalStandardPrice - totalDiscountedPrice;

  const discountTiers = [
    { range: '1–2', discount: '0%', label: 'Standard Rate' },
    { range: '3–5', discount: '15%', label: 'Group' },
    { range: '6–9', discount: '25%', label: 'Team' },
    { range: '10+', discount: '35%', label: 'Enterprise' },
  ];

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <Users size={13} /> Team Registration & Group Discounts
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem', maxWidth: '700px' }}>
              Bring Your HR Team to HRWest 2027
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '600px', lineHeight: 1.7 }}>
              Maximize learning impact, cover all 6 conference tracks simultaneously, and save up to 35% on team pass packages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Discount Tiers Row ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '3rem 0 1rem' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {discountTiers.map((tier, idx) => {
              const isActive = (
                (tier.range === '1–2' && teamSize <= 2) ||
                (tier.range === '3–5' && teamSize >= 3 && teamSize <= 5) ||
                (tier.range === '6–9' && teamSize >= 6 && teamSize <= 9) ||
                (tier.range === '10+' && teamSize >= 10)
              );
              return (
                <motion.div
                  key={tier.range}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  style={{
                    background: isActive ? 'var(--gradient-brand)' : 'var(--color-elevated)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    border: isActive ? 'none' : '1px solid var(--color-subtle)',
                    boxShadow: isActive ? 'var(--shadow-brand)' : 'var(--shadow-sm)',
                    color: isActive ? '#fff' : 'var(--color-text-primary)',
                    transition: 'var(--transition-base)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem' }}>{tier.discount}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', opacity: 0.85 }}>{tier.range} attendees</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>{tier.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Calculator + Benefits ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2rem 0 5rem' }}>
        <div className="container-wide">
          <div className="grid-2" style={{ alignItems: 'start' }}>

            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-md)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={22} style={{ color: 'var(--color-brand-purple)' }} /> Group Discount Calculator
              </h3>

              {/* Slider */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Team Size</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {teamSize} Attendees
                  </span>
                </div>
                <input
                  type="range" min="1" max="20" value={teamSize}
                  onChange={e => setTeamSize(parseInt(e.target.value))}
                  style={{ width: '100%', height: '8px', accentColor: 'var(--color-brand-purple)', cursor: 'pointer' }}
                />
              </div>

              {/* Results */}
              <div style={{
                background: 'var(--gradient-brand)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                color: '#fff',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {[
                    { label: 'Applied Discount', value: `${Math.round(discountRate * 100)}% Off` },
                    { label: 'Per-Ticket Rate', value: `$${discountedPricePerTicket}` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.8)' }}>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.35rem', fontFamily: 'var(--font-display)', fontWeight: 900 }}>
                    <span>Total Savings</span>
                    <span>${totalSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/register" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1.75rem', justifyContent: 'center' }}>
                Register Team of {teamSize} ({Math.round(discountRate * 100)}% Saved) <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
                Why Leading HR Teams Attend Together
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Sparkles, title: 'Divide & Conquer All 6 Tracks', desc: 'Send team members to different concurrent breakouts (AI, Legal, Benefits, Analytics) and debrief together to cover 100% of session content.' },
                  { icon: CheckCircle, title: 'Team SHRM/HRCI Recertification', desc: 'Fulfill annual recertification credit requirements for your entire HR department in one 2-day conference.' },
                  { icon: TrendingUp, title: 'Post-Conference Debrief Workshop', desc: 'Groups of 5+ receive a complimentary post-event strategy debrief template to present key takeaways to your executive team.' },
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
          </div>
        </div>
      </section>
    </div>
  );
};
