import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

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
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <Award size={13} /> Past HRWest Partners
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem' }}>
              Companies Who've Featured at HRWest
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.7 }}>
              Join the leading HR tech platforms, benefits providers, and strategy firms who have connected with 1,000+ West Coast HR decision-makers.
            </p>
          </motion.div>
        </div>
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
