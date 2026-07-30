import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sponsorsHero from '../assets/sponsors_hero.png';
import { ArrowRight, Sparkles, ChevronRight, FileText } from 'lucide-react';

const PAST_SPONSORS = [
  { name: "SAP SuccessFactors", category: "HCM & Payroll Platform", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/sap-sf-1382x167.png", tier: "Diamond" },
  { name: "UKG", category: "Workforce Management", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/ukg-logo.jpg", tier: "Platinum" },
  { name: "Robert Half", category: "Talent Solutions & Staffing", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/robert-half-logo.jpg", tier: "Gold" },
  { name: "Insperity", category: "HR Outsourcing & PEO", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/insperity-logo.jpg", tier: "Gold" },
  { name: "Alliant Insurance", category: "Benefits & Employee Brokerage", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/alliant-logo.jpg", tier: "Gold" },
  { name: "AwardCo", category: "Employee Recognition", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/awardco-logo.jpg", tier: "Silver" },
  { name: "Zapier", category: "Workflow Automation", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/zapier-logo.jpg", tier: "Silver" },
  { name: "LHH", category: "Talent Development & Transition", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/lhh-logo.jpg", tier: "Silver" },
  { name: "HUB International", category: "Insurance & Benefits", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/hub-logo.jpg", tier: "Silver" },
  { name: "PerformYard", category: "Performance Management", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/performyard-logo.jpg", tier: "Silver" },
];

const TIER_STYLES: Record<string, { bg: string; color: string }> = {
  Diamond: { bg: 'var(--gradient-brand)', color: '#ffffff' },
  Platinum: { bg: 'linear-gradient(135deg, #475569, #1e293b)', color: '#ffffff' },
  Gold: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#ffffff' },
  Silver: { bg: 'linear-gradient(135deg, #94a3b8, #64748b)', color: '#ffffff' },
};

export const SponsorHallPage: React.FC = () => {
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
          backgroundImage: `url(${sponsorsHero})`,
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
              Our<br />
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>2027 Sponsors</span>
            </h1>

            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '400px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              Leading HR solution providers who've partnered with HRWest to connect with 1,000+ decision-makers.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/sponsor" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
              }}>
                Become a Sponsor <ChevronRight size={15} />
              </Link>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.3rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none',
              }}>
                <FileText size={14} /> View Prospectus
              </a>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Sponsor logo pills widget */}
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
              { sp: PAST_SPONSORS[0], offset: '0px', rotate: '-2deg', delay: 0.2 },
              { sp: PAST_SPONSORS[1], offset: '16px', rotate: '1.5deg', delay: 0.3 },
              { sp: PAST_SPONSORS[2], offset: '8px', rotate: '-1deg', delay: 0.4 },
              { sp: PAST_SPONSORS[3], offset: '20px', rotate: '2deg', delay: 0.5 },
            ].map(({ sp, offset, rotate, delay }, i) => (
              <motion.div
                key={sp.name}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: `${i * 85 + 10}px`,
                  left: offset,
                  width: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  background: 'rgba(255,255,255,0.11)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '14px',
                  padding: '0.65rem 0.85rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  zIndex: 4 - i,
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.95)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, overflow: 'hidden', padding: '3px'
                }}>
                  <img src={sp.logo} alt={sp.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.82rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sp.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sp.category}
                  </div>
                </div>
                <span style={{
                  fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.05em', padding: '0.15rem 0.4rem', borderRadius: '4px',
                  background: sp.tier === 'Diamond' ? 'rgba(239,20,110,0.3)' : 'rgba(255,255,255,0.15)',
                  color: sp.tier === 'Diamond' ? '#ff6ba0' : 'rgba(255,255,255,0.85)'
                }}>
                  {sp.tier}
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

      {/* ── CTA Banner ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2.5rem 0' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              background: 'var(--gradient-brand-soft)',
              border: '1.5px solid rgba(145,39,140,0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.25rem 2.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-purple"><Sparkles size={12} /> 2027 Open</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Become a 2027 Featured Sponsor or Exhibitor
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '550px' }}>
                68% of HRWest attendees hold Manager/Director/CHRO authority with active HR technology and benefits budgets.
              </p>
            </div>
            <Link to="/sponsor" className="btn btn-primary btn-lg">
              Become a Sponsor <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Sponsor Grid ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2rem 0 5rem' }}>
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem' }}
          >
            <span className="eyebrow" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
              Past HRWest Sponsors & Exhibitors
            </span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {PAST_SPONSORS.map((sponsor, idx) => {
              const tierStyle = TIER_STYLES[sponsor.tier] || TIER_STYLES.Silver;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.04 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  style={{
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Logo area */}
                  <div style={{
                    padding: '2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: '100px',
                    background: 'var(--color-canvas)',
                  }}>
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      style={{ maxHeight: '50px', maxWidth: '160px', objectFit: 'contain' }}
                    />
                  </div>
                  {/* Info */}
                  <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--color-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{sponsor.name}</h3>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.65rem',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        background: tierStyle.bg, color: tierStyle.color,
                        padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)',
                      }}>
                        {sponsor.tier}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{sponsor.category}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
