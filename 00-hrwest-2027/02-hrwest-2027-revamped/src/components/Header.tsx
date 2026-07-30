import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [attendDropdownOpen, setAttendDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #cbd5e1',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      {/* Top Event Utility Announcement Banner */}
      <div style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '0.4rem 0',
        fontSize: '0.825rem',
        fontWeight: 500
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={14} color="#38bdf8" /> March 23–24, 2027
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} color="#38bdf8" /> South San Francisco Conference Center
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/attend/convince-boss" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Convince Your Boss</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1.25rem',
            padding: '0.3rem 0.8rem',
            borderRadius: '6px',
            letterSpacing: '-0.02em'
          }}>
            HRWest <span style={{ color: '#38bdf8' }}>2027</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{
            textDecoration: 'none',
            color: isActive('/') ? '#0284c7' : '#334155',
            fontWeight: isActive('/') ? 700 : 600,
            fontSize: '0.95rem'
          }}>Home</Link>

          <Link to="/speakers" style={{
            textDecoration: 'none',
            color: isActive('/speakers') ? '#0284c7' : '#334155',
            fontWeight: isActive('/speakers') ? 700 : 600,
            fontSize: '0.95rem'
          }}>Speakers</Link>

          <Link to="/agenda" style={{
            textDecoration: 'none',
            color: isActive('/agenda') ? '#0284c7' : '#334155',
            fontWeight: isActive('/agenda') ? 700 : 600,
            fontSize: '0.95rem'
          }}>Agenda</Link>

          <Link to="/sponsors" style={{
            textDecoration: 'none',
            color: isActive('/sponsors') ? '#0284c7' : '#334155',
            fontWeight: isActive('/sponsors') ? 700 : 600,
            fontSize: '0.95rem'
          }}>Sponsors</Link>

          {/* Attend Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setAttendDropdownOpen(!attendDropdownOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: location.pathname.startsWith('/attend') ? '#0284c7' : '#334155',
                fontWeight: location.pathname.startsWith('/attend') ? 700 : 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              Attend <ChevronDown size={16} />
            </button>

            {attendDropdownOpen && (
              <div 
                onMouseLeave={() => setAttendDropdownOpen(false)}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '220px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '0.5rem 0',
                  marginTop: '0.5rem'
                }}
              >
                <Link to="/attend/team" onClick={() => setAttendDropdownOpen(false)} style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#334155', fontSize: '0.9rem' }}>Attend as a Team</Link>
                <Link to="/attend/convince-boss" onClick={() => setAttendDropdownOpen(false)} style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#334155', fontSize: '0.9rem' }}>Convince Your Boss</Link>
                <Link to="/attend/location" onClick={() => setAttendDropdownOpen(false)} style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#334155', fontSize: '0.9rem' }}>Venue & Travel</Link>
                <Link to="/attend/volunteer" onClick={() => setAttendDropdownOpen(false)} style={{ display: 'block', padding: '0.5rem 1rem', textDecoration: 'none', color: '#334155', fontSize: '0.9rem' }}>Volunteer Pass</Link>
              </div>
            )}
          </div>

          <Link to="/sponsor" style={{
            textDecoration: 'none',
            color: isActive('/sponsor') ? '#0284c7' : '#334155',
            fontWeight: isActive('/sponsor') ? 700 : 600,
            fontSize: '0.95rem'
          }}>Why Sponsor</Link>
        </nav>

        {/* Persistent CTA Anchor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/register" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
            Pre-Register 2027 <ArrowRight size={16} />
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
