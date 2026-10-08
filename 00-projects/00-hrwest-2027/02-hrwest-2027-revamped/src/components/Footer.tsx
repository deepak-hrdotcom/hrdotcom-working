import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mail, Globe, Share2, Link2, Rss, Sparkles, ExternalLink } from 'lucide-react';

const NAV_LINKS = {
  attend: [
    { label: 'Speaker Directory', to: '/speakers' },
    { label: 'Interactive Agenda', to: '/agenda' },
    { label: 'Team Discount Calculator', to: '/attend/team' },
    { label: 'Convince Your Boss', to: '/attend/convince-boss' },
    { label: 'Volunteer for Free Pass', to: '/attend/volunteer' },
    { label: 'Venue & Travel Guide', to: '/attend/location' },
  ],
  sponsor: [
    { label: 'Why Sponsor / Exhibit', to: '/sponsor' },
    { label: 'Past Sponsors Directory', to: '/sponsors' },
    { label: 'Download Sponsorship Prospectus', to: '/sponsor', external: false },
    { label: 'Call for Speakers', to: '/speakers', external: false },
    { label: 'Contact the Events Team', to: 'mailto:events@hr.com', external: true },
  ],
};

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--color-canvas)', borderTop: '1px solid var(--color-subtle)' }}>

      {/* ── Pre-footer gradient CTA strip ── */}
      <div style={{ background: 'var(--gradient-brand)', padding: '0' }}>
        <div className="container-wide" style={{ padding: '2.25rem 2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Sparkles size={20} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', color: '#ffffff' }}>
                  Ready to Transform Your HR Strategy in 2027?
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.82)', marginTop: '0.1rem' }}>
                  Join 1,000+ HR professionals · Earn 20+ SHRM & HRCI credits · March 23–24, South SF
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <Link
                to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.9rem',
                  background: '#ffffff',
                  color: 'var(--color-brand-purple)',
                  padding: '0.7rem 1.65rem',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  transition: 'var(--transition-spring)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
              >
                Pre-Register Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/sponsor"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  padding: '0.7rem 1.65rem',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(8px)',
                  transition: 'var(--transition-fast)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              >
                Sponsor HRWest 2027
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div style={{ background: 'var(--color-elevated)', padding: '4rem 0 3rem' }}>
        <div className="container-wide">
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3.5rem' }}>

            {/* Col 1: Brand identity */}
            <div>
              {/* Logo wordmark */}
              <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.45rem',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  <span style={{ color: 'var(--color-text-primary)' }}>HR</span>
                  <span style={{
                    background: 'var(--gradient-brand)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>West</span>
                  <span style={{ color: 'var(--color-text-soft)', fontWeight: 500, fontSize: '1rem', marginLeft: '0.25rem' }}>2027</span>
                </div>
              </Link>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                maxWidth: '280px',
              }}>
                The West Coast's premier HR transformation conference. Connecting practitioners, innovators, and HR leaders with practical expertise since 2001.
              </p>

              {/* Event info block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.875rem' }}>
                  <MapPin size={16} style={{ color: 'var(--color-brand-purple)', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    South San Francisco Conference Center<br />
                    South San Francisco, CA 94080
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.875rem' }}>
                  <Mail size={15} style={{ color: 'var(--color-brand-purple)', flexShrink: 0 }} />
                  <a href="mailto:events@hr.com" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>events@hr.com</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.875rem' }}>
                  <Globe size={15} style={{ color: 'var(--color-brand-purple)', flexShrink: 0 }} />
                  <a href="https://www.hr.com" target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    Powered by HR.com <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                {[
                  { icon: Link2, href: '#', label: 'LinkedIn' },
                  { icon: Share2, href: '#', label: 'Twitter / X' },
                  { icon: Rss, href: '#', label: 'Instagram' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      width: '36px', height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--gradient-brand-soft)',
                      border: '1px solid rgba(145,39,140,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'var(--transition-fast)',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--gradient-brand)';
                      (e.currentTarget.querySelector('svg') as SVGElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--gradient-brand-soft)';
                      (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'var(--color-brand-purple)';
                    }}
                  >
                    <Icon size={16} style={{ color: 'var(--color-brand-purple)', transition: 'color 0.15s' }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Attendee nav */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-primary)',
                marginBottom: '1.25rem',
              }}>For Attendees</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {NAV_LINKS.attend.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                        transition: 'var(--transition-fast)',
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--color-brand-purple)';
                        e.currentTarget.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                        e.currentTarget.style.paddingLeft = '0px';
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Sponsor nav */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-primary)',
                marginBottom: '1.25rem',
              }}>Sponsors & Partners</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {NAV_LINKS.sponsor.map(({ label, to, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={to} style={{
                        fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'none',
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                      }}>
                        {label} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        to={to}
                        style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'var(--transition-fast)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-brand-purple)'; e.currentTarget.style.paddingLeft = '4px'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; e.currentTarget.style.paddingLeft = '0px'; }}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Important dates callout card */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-primary)',
                marginBottom: '1.25rem',
              }}>Key Dates</h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { date: 'Oct 30, 2026', label: 'Call for Speakers Deadline', color: 'var(--color-brand-pink)' },
                  { date: 'Dec 2026', label: 'Early Bird Registration Opens', color: 'var(--color-brand-purple)' },
                  { date: 'Mar 23, 2027', label: 'Conference Begins — Day 1', color: 'var(--color-brand-purple)' },
                  { date: 'Mar 24, 2027', label: 'Conference Day 2 & Close', color: 'var(--color-brand-pink)' },
                ].map(({ date, label, color }) => (
                  <div key={label} style={{
                    display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                    padding: '0.75rem',
                    background: 'var(--color-canvas)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-subtle)',
                  }}>
                    <div style={{
                      width: '4px', borderRadius: '4px', alignSelf: 'stretch',
                      minHeight: '36px',
                      background: color,
                      flexShrink: 0,
                    }} />
                    <div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>{date}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="footer-bottom-bar" style={{
            borderTop: '1px solid var(--color-subtle)',
            paddingTop: '1.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-soft)' }}>
              © 2027 HR.com, LLC. All rights reserved. HRWest is a registered trademark of HR.com.
            </div>
            <div style={{ display: 'flex', gap: '1.75rem' }}>
              {[
                { label: 'Terms & Conditions', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Code of Conduct', href: '#' },
                { label: 'Accessibility', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--color-text-soft)',
                    textDecoration: 'none',
                    transition: 'var(--transition-fast)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-purple)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-soft)'}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
