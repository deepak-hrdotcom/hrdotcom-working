import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useTheme, THEMES } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [attendDropdownOpen, setAttendDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredSwatch, setHoveredSwatch] = useState<string | null>(null);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileMenuOpen(false); setAttendDropdownOpen(false); }, [location]);

  const isActive = (path: string) => location.pathname === path;
  const isAttendActive = () => location.pathname.startsWith('/attend');

  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    textDecoration: 'none',
    color: active ? 'var(--color-brand-purple)' : 'var(--color-text-secondary)',
    fontWeight: active ? 700 : 600,
    fontSize: '0.95rem',
    fontFamily: 'var(--font-display)',
    transition: 'var(--transition-fast)',
    position: 'relative',
  });

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: scrolled ? 'var(--glass-bg)' : 'rgba(251, 251, 254, 0.95)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid var(--glass-border-subtle)',
      boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Top Announcement Strip */}
      <div className="top-announcement-strip" style={{
        background: 'var(--gradient-brand)',
        color: '#ffffff',
        padding: '0.4rem 0',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
      }}>
        <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="top-announcement-strip-items" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={13} /> March 23–24, 2027
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} /> South San Francisco Conference Center
            </span>
          </div>

          {/* Right side: CTA + Theme Vibe Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link to="/attend/convince-boss" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: 600 }}>
              Convince Your Boss →
            </Link>

            {/* ── Theme Vibe Picker ── */}
            <div
              role="group"
              aria-label="Change color theme"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              {/* subtle divider */}
              <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.3)', marginRight: '0.15rem' }} />
              {THEMES.map((t) => {
                const isActive = theme === t.id;
                const isHovered = hoveredSwatch === t.id;
                return (
                  <div key={t.id} style={{ position: 'relative' }}>
                    {/* Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.9 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          style={{
                            position: 'absolute',
                            bottom: 'calc(100% + 8px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            background: 'rgba(15,23,42,0.92)',
                            backdropFilter: 'blur(12px)',
                            color: '#fff',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            padding: '0.3rem 0.65rem',
                            borderRadius: '6px',
                            pointerEvents: 'none',
                            zIndex: 200,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                          }}
                        >
                          {t.tooltip}
                          {/* Arrow */}
                          <span style={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 0,
                            height: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '5px solid rgba(15,23,42,0.92)',
                          }} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Swatch Button */}
                    <button
                      aria-label={`Switch to ${t.label} theme`}
                      title={t.tooltip}
                      onClick={() => setTheme(t.id)}
                      onMouseEnter={() => setHoveredSwatch(t.id)}
                      onMouseLeave={() => setHoveredSwatch(null)}
                      style={{
                        width: isActive ? '20px' : '16px',
                        height: isActive ? '20px' : '16px',
                        borderRadius: '50%',
                        background: t.swatchGradient,
                        border: isActive
                          ? '2.5px solid rgba(255,255,255,0.95)'
                          : '2px solid rgba(255,255,255,0.4)',
                        cursor: 'pointer',
                        padding: 0,
                        boxShadow: isActive
                          ? '0 0 0 2px rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.2)'
                          : '0 1px 4px rgba(0,0,0,0.15)',
                        transform: isActive ? 'scale(1.15)' : isHovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        flexShrink: 0,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container-wide header-main-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo — clean text wordmark */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.4rem',
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

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
          <Link to="/" style={navLinkStyle(isActive('/'))}>Home</Link>
          <Link to="/speakers" style={navLinkStyle(isActive('/speakers'))}>Speakers</Link>
          <Link to="/agenda" style={navLinkStyle(isActive('/agenda'))}>Agenda</Link>
          <Link to="/sponsors" style={navLinkStyle(isActive('/sponsors'))}>Sponsors</Link>

          {/* Attend Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setAttendDropdownOpen(!attendDropdownOpen)}
              style={{
                ...navLinkStyle(isAttendActive()),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                padding: 0,
              }}
            >
              Attend <ChevronDown size={15} style={{
                transition: 'transform 0.2s',
                transform: attendDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>

            <AnimatePresence>
              {attendDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  onMouseLeave={() => setAttendDropdownOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    left: '-12px',
                    minWidth: '220px',
                    background: 'var(--glass-bg-strong)',
                    backdropFilter: 'var(--glass-blur)',
                    border: '1px solid var(--glass-border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-xl)',
                    padding: '0.5rem',
                    zIndex: 100,
                  }}
                >
                  {[
                    { to: '/attend/team', label: 'Attend as a Team', sub: 'Group discounts up to 35%' },
                    { to: '/attend/convince-boss', label: 'Convince Your Boss', sub: 'Approval email toolkit' },
                    { to: '/attend/location', label: 'Venue & Travel', sub: 'South San Francisco' },
                    { to: '/attend/volunteer', label: 'Volunteer for Free Pass', sub: 'Apply for a volunteer role' },
                  ].map(item => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setAttendDropdownOpen(false)}
                      style={{
                        display: 'block',
                        padding: '0.65rem 1rem',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-md)',
                        transition: 'var(--transition-fast)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--gradient-brand-soft)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{item.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>{item.sub}</div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/sponsor" style={navLinkStyle(isActive('/sponsor'))}>Why Sponsor</Link>
        </nav>

        {/* CTA + Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/register" className="btn btn-primary btn-sm animate-pulse-glow" style={{ fontSize: '0.875rem', gap: '0.45rem', padding: '0.55rem 1.15rem' }}>
            <span className="live-green-dot" style={{ width: '8px', height: '8px', backgroundColor: '#4ade80' }} />
            <span>Pre-Register 2027</span>
            <span className="animate-arrow-nudge"><ArrowRight size={15} /></span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-primary)',
              padding: '0.25rem',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: 'var(--color-elevated)',
              borderBottom: '1px solid var(--color-subtle)',
              padding: '1rem 1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/" style={navLinkStyle(isActive('/'))} onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/speakers" style={navLinkStyle(isActive('/speakers'))} onClick={() => setMobileMenuOpen(false)}>Speakers</Link>
              <Link to="/agenda" style={navLinkStyle(isActive('/agenda'))} onClick={() => setMobileMenuOpen(false)}>Agenda</Link>
              <Link to="/sponsors" style={navLinkStyle(isActive('/sponsors'))} onClick={() => setMobileMenuOpen(false)}>Sponsors</Link>
              <Link to="/sponsor" style={navLinkStyle(isActive('/sponsor'))} onClick={() => setMobileMenuOpen(false)}>Why Sponsor</Link>
              <div style={{ padding: '0.5rem 0', borderTop: '1px solid var(--color-subtle)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-brand-purple)', marginBottom: '0.5rem' }}>ATTEND</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.5rem' }}>
                  <Link to="/attend/team" style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }} onClick={() => setMobileMenuOpen(false)}>Attend as a Team</Link>
                  <Link to="/attend/convince-boss" style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }} onClick={() => setMobileMenuOpen(false)}>Convince Your Boss</Link>
                  <Link to="/attend/location" style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }} onClick={() => setMobileMenuOpen(false)}>Venue & Travel</Link>
                  <Link to="/attend/volunteer" style={{ textDecoration: 'none', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }} onClick={() => setMobileMenuOpen(false)}>Volunteer for Free Pass</Link>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center', gap: '0.45rem' }} onClick={() => setMobileMenuOpen(false)}>
                <span className="live-green-dot" style={{ width: '8px', height: '8px', backgroundColor: '#4ade80' }} />
                <span>Pre-Register 2027</span>
                <span className="animate-arrow-nudge"><ArrowRight size={15} /></span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
