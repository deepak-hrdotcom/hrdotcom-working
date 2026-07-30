import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '4rem solid #1e293b' }}>
      {/* High-Converting Footer Pre-CTA Banner */}
      <div className="container" style={{ marginBottom: '3rem' }}>
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Ready to Transform Your HR Strategy in 2027?
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
              Join 1,000+ HR professionals, earn up to 20+ SHRM & HRCI recertification credits, and connect with top industry leaders.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '0.8rem 1.75rem' }}>
              Pre-Register Now <ArrowRight size={18} />
            </Link>
            <Link to="/sponsor" className="btn-secondary" style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: '#475569' }}>
              Sponsor HRWest
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Navigation Columns */}
      <div className="container grid-4" style={{ marginBottom: '3rem' }}>
        {/* Column 1: Brand */}
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff', marginBottom: '1rem' }}>
            HRWest <span style={{ color: '#38bdf8' }}>2027</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            The premier West Coast conference for HR leaders, innovators, and practitioners focused on practical expertise and future readiness.
          </p>
        </div>

        {/* Column 2: Attendee Conversion Engine */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>For Attendees</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
            <li><Link to="/speakers" style={{ color: '#94a3b8', textDecoration: 'none' }}>2027 Speakers Directory</Link></li>
            <li><Link to="/agenda" style={{ color: '#94a3b8', textDecoration: 'none' }}>Interactive Schedule & Tracks</Link></li>
            <li><Link to="/attend/team" style={{ color: '#94a3b8', textDecoration: 'none' }}>Team Discount Calculator</Link></li>
            <li><Link to="/attend/convince-boss" style={{ color: '#94a3b8', textDecoration: 'none' }}>Convince Your Boss Toolkit</Link></li>
            <li><Link to="/attend/volunteer" style={{ color: '#94a3b8', textDecoration: 'none' }}>Volunteer Pass Application</Link></li>
          </ul>
        </div>

        {/* Column 3: Sponsor & Exhibitor Engine */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>For Sponsors & Partners</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
            <li><Link to="/sponsor" style={{ color: '#94a3b8', textDecoration: 'none' }}>Why Sponsor / Exhibit</Link></li>
            <li><Link to="/sponsors" style={{ color: '#94a3b8', textDecoration: 'none' }}>Sponsor Directory</Link></li>
            <li><a href="mailto:sales@hr.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>Request Sponsorship Prospectus</a></li>
            <li><Link to="/speakers" style={{ color: '#94a3b8', textDecoration: 'none' }}>Call for Speakers (Oct 30 Deadline)</Link></li>
          </ul>
        </div>

        {/* Column 4: Event Location & Contact */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Location & Venue</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#94a3b8' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <MapPin size={18} color="#38bdf8" />
              <span>South San Francisco Conference Center<br />South San Francisco, CA</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Mail size={18} color="#38bdf8" />
              <span>events@hr.com</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Globe size={18} color="#38bdf8" />
              <span>Powered by HR.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Terms Bar */}
      <div className="container" style={{ borderTop: '1px solid #1e293b', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
        <div>© 2027 HR.com. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Terms & Conditions</a>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
};
