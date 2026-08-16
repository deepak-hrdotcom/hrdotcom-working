import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, CheckCircle, Users, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import teamAttendHero from '../assets/team_attend_hero.webp';

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
            background: 'radial-gradient(circle, var(--brand-glow-22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '30%',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(239,20,110,0.18) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
        </div>

        {/* Content Container */}
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
              textWrap: 'initial' as const,
            }}>
              Bring Your<br />
              <span style={{
                background: 'var(--gradient-brand-glow)',
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
                background: 'var(--gradient-brand)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px var(--brand-pink-glow-45, var(--brand-glow-40))',
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
                  color: 'var(--color-brand-pink)', background: 'var(--brand-glow-20)', padding: '0.2rem 0.55rem',
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

      {/* ── INTERACTIVE DISCOUNT TIER SELECTOR ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '3rem 0 1.5rem' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Users size={13} /> Group Discount Tiers
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)', margin: 0 }}>Select Your Team Size to Unlock Savings</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>Click a tier below to instantly calculate your group discount.</p>
          </div>
          <div className="responsive-grid-4">
            {discountTiers.map((tier, idx) => {
              const isActive = (
                (tier.range === '1-2' && teamSize <= 2) ||
                (tier.range === '3-5' && teamSize >= 3 && teamSize <= 5) ||
                (tier.range === '6-9' && teamSize >= 6 && teamSize <= 9) ||
                (tier.range === '10+' && teamSize >= 10)
              );
              const targetSize = idx === 0 ? 1 : idx === 1 ? 3 : idx === 2 ? 6 : 10;
              return (
                <motion.div
                  key={tier.range}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.07 }}
                  onClick={() => setTeamSize(targetSize)}
                  style={{ background: isActive ? 'var(--gradient-brand)' : 'var(--color-elevated)', borderRadius: 'var(--radius-lg)', padding: '1.75rem 1.25rem', textAlign: 'center', border: isActive ? '2px solid transparent' : '1.5px solid var(--color-subtle)', boxShadow: isActive ? 'var(--shadow-brand)' : 'var(--shadow-sm)', color: isActive ? '#fff' : 'var(--color-text-primary)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; } }}
                >
                  {isActive && <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />}
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.25rem', lineHeight: 1, marginBottom: '0.35rem' }}>{tier.discount}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.2rem' }}>{tier.range} attendees</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7, fontWeight: 600 }}>{tier.label}</div>
                  {isActive && <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', fontWeight: 800, background: 'rgba(255,255,255,0.2)', borderRadius: 'var(--radius-full)', padding: '0.2rem 0.6rem', display: 'inline-block' }}>ACTIVE</div>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GLASS GROUP PRICING TABLE ── */}
      <section style={{ background: 'var(--color-surface)', padding: '3rem 0', borderTop: '1px solid var(--color-subtle)', borderBottom: '1px solid var(--color-subtle)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}><Users size={14} /> Official Group Rates</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 2.5vw, 2.25rem)', letterSpacing: '-0.02em', margin: 0, color: 'var(--color-text-primary)' }}>Group Pricing Schedule</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>All prices are per-person rates based on team size and registration timeframe.</p>
          </div>
          <div style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--brand-glow-18)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--gradient-brand)', color: '#fff' }}>
                  <th style={{ padding: '1.15rem 1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem' }}>Tier / Rate</th>
                  <th style={{ padding: '1.15rem 1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem' }}>Timeframe</th>
                  <th style={{ padding: '1.15rem 1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem', textAlign: 'center' }}>Individual</th>
                  <th style={{ padding: '1.15rem 1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem', textAlign: 'center' }}>Group (5-9)</th>
                  <th style={{ padding: '1.15rem 1.5rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem', textAlign: 'center' }}>Group (10+)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-subtle)', background: 'var(--gradient-brand-soft)' }}>
                  <td style={{ padding: '1.15rem 1.5rem' }}><strong style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-brand-purple)', fontSize: '0.98rem' }}>Early-Bird Rate</strong></td>
                  <td style={{ padding: '1.15rem 1.5rem', color: 'var(--color-brand-pink)', fontSize: '0.88rem', fontWeight: 700 }}>Ends Jan 15, 2027</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-display)' }}>$399 / person</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-brand-purple)', fontSize: '1.05rem' }}>$299 / person</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-brand-pink)', fontSize: '1.05rem' }}>$229 / person</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-subtle)' }}>
                  <td style={{ padding: '1.15rem 1.5rem' }}><strong style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>Regular Rate</strong></td>
                  <td style={{ padding: '1.15rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Jan 16 - Mar 22, 2027</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 600, fontFamily: 'var(--font-display)' }}>$799 / person</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-display)' }}>$699 / person</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--color-brand-purple)' }}>$579 / person</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.15rem 1.5rem' }}><strong style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>On-Site Rate</strong></td>
                  <td style={{ padding: '1.15rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>March 23-24, 2027</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', fontWeight: 600, fontFamily: 'var(--font-display)' }}>$999 / person</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>N/A</td>
                  <td style={{ padding: '1.15rem 1.5rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* VIP Perk Banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ marginTop: '2rem', padding: '1.5rem 2rem', background: 'linear-gradient(135deg, var(--brand-glow-08) 0%, var(--brand-pink-glow-08) 100%)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--brand-glow-22)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', backdropFilter: 'blur(8px)' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff', background: 'var(--gradient-brand)', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)' }}>VIP EXCLUSIVE</span>
                <span style={{ fontSize: '1rem' }}>🌟</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-brand-purple)', margin: '0 0 0.3rem 0' }}>Exclusive Perk for Teams of 10+</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5 }}>
                Teams of 10+ receive <strong>accelerated VIP on-site check-in</strong> and a <strong>facilitated private team roundtable session</strong> on the topic of your choice.
              </p>
            </div>
            <a href="mailto:hrwest@hr.com" className="btn btn-primary btn-sm" style={{ flexShrink: 0 }}>Claim 10+ Team Offer</a>
          </motion.div>
        </div>
      </section>

      {/* ── CALCULATOR + BENEFITS ── */}
      <section id="calculator" style={{ background: 'var(--color-canvas)', padding: '4rem 0 5rem' }}>
        <div className="container-wide">
          <div className="grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>

            {/* Interactive ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1.5px solid var(--color-subtle)', boxShadow: 'var(--shadow-lg)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--color-text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calculator size={22} style={{ color: 'var(--color-brand-purple)' }} /> Group Discount Calculator
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Drag the slider or click a tier above to see real-time savings.</p>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>Team Size</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{teamSize} Attendees</span>
                </div>
                <input
                  type="range" min="1" max="20" value={teamSize}
                  onChange={e => setTeamSize(parseInt(e.target.value))}
                  className="slider-brand"
                  style={{ width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>1</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>20+</span>
                </div>
              </div>

              {/* Results dual-pane */}
              <div className="responsive-grid-2" style={{ gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--brand-glow-15)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brand-purple)', marginBottom: '0.4rem' }}>Group Discount</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{Math.round(discountRate * 100)}% Off</div>
                </div>
                <div style={{ background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--brand-glow-15)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-display)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-brand-purple)', marginBottom: '0.4rem' }}>Per-Ticket Rate</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${discountedPricePerTicket}</div>
                </div>
              </div>

              <div style={{ background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1.5px solid var(--brand-glow-22)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '0.92rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>Total Team Savings</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${totalSavings.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/register" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1.75rem', justifyContent: 'center' }}>
                Register Team of {teamSize} ({Math.round(discountRate * 100)}% Saved) <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Why Attend Together */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Why Leading HR Teams Attend Together</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: Sparkles, title: 'Divide & Conquer All 6 Tracks', desc: 'Send team members to different concurrent breakouts (AI, Legal, Benefits, Analytics) and debrief together to cover 100% of session content.', color: 'var(--color-brand-purple)' },
                  { icon: CheckCircle, title: 'Team SHRM/HRCI Recertification', desc: 'Fulfill annual recertification credit requirements for your entire HR department in one 2-day conference.', color: 'var(--color-brand-authority)' },
                  { icon: TrendingUp, title: 'Post-Conference Debrief Workshop', desc: 'Groups of 5+ receive a complimentary post-event strategy debrief template to present key takeaways to your executive team.', color: '#7c3aed' },
                ].map(({ icon: Icon, title, desc, color }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                    style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1.5px solid var(--color-subtle)', boxShadow: 'var(--shadow-sm)', display: 'flex', gap: '1rem', alignItems: 'flex-start', transition: 'all 0.25s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.borderColor = `${color}40`; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'var(--color-subtle)'; }}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: `linear-gradient(135deg, ${color}18, ${color}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${color}30` }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '0.3rem' }}>{title}</div>
                      <p style={{ fontSize: '0.87rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamAttendPage;
