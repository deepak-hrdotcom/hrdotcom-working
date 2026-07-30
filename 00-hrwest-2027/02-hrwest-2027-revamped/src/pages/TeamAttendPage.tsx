import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle, Users, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import teamAttendHero from '../assets/team_attend_hero.png';

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
          backgroundImage: `url(${teamAttendHero})`,
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
              Bring Your<br />
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Team to HRWest</span>
            </h1>

            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '400px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              Groups of 3+ save big. The more teammates you register, the more you save — up to 25% off.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#calculator" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
              }}>
                Calculate Your Savings <ChevronRight size={15} />
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
                <Users size={14} /> Register Solo
              </Link>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating group savings cards stack */}
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
              { tier: '3–5 People', save: '15% OFF', label: 'Group Pass Tier', rotate: '-2deg', offset: '0px', delay: 0.2 },
              { tier: '6–10 People', save: '20% OFF', label: 'Team Pass Tier', rotate: '1.5deg', offset: '16px', delay: 0.32 },
              { tier: '10+ People', save: '25% OFF', label: 'Enterprise Pass Tier', rotate: '-1deg', offset: '8px', delay: 0.44 },
            ].map(({ tier, save, label, rotate, offset, delay }, i) => (
              <motion.div
                key={tier}
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
                  padding: '0.85rem 1.1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 3 - i,
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.86rem', color: '#fff', marginBottom: '0.15rem' }}>
                    {tier}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.82rem',
                  color: '#ff6ba0', background: 'rgba(239,20,110,0.2)', padding: '0.2rem 0.55rem',
                  borderRadius: '8px', border: '1px solid rgba(239,20,110,0.35)'
                }}>
                  {save}
                </span>
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
      <section id="calculator" style={{ background: 'var(--color-canvas)', padding: '2rem 0 5rem' }}>
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
