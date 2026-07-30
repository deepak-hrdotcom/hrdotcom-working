import React from 'react';
import { Navigation, Hotel, Car, Plane } from 'lucide-react';

export const LocationPage: React.FC = () => {
  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Venue & Travel Logistics</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            South San Francisco Conference Center
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Located in the heart of Silicon Valley's biotech and tech corridor, just minutes from SFO airport.
          </p>
        </div>

        {/* Venue Info Cards */}
        <div className="grid-3" style={{ marginBottom: '3.5rem' }}>
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
            <Plane color="#0284c7" size={28} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Airport Access</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Only 5 minutes (3.5 miles) north of San Francisco International Airport (SFO). Free airport shuttles available.
            </p>
          </div>

          <div className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
            <Navigation color="#0284c7" size={28} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Public Transit</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Direct access via BART (South San Francisco Station) and Caltrain, with connecting shuttle loops.
            </p>
          </div>

          <div className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
            <Car color="#0284c7" size={28} style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>On-Site Parking</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Complimentary multi-level covered parking available for all registered HRWest attendees.
            </p>
          </div>
        </div>

        {/* Hotel Discount Blocks */}
        <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0284c7' }}>
            <Hotel size={28} />
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>Official Partner Hotels & Discount Blocks</h2>
          </div>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Discounted room rates have been secured for HRWest 2027 attendees. Reserve early before block rates expire.
          </p>

          <div className="grid-2">
            <div style={{ border: '1px solid #cbd5e1', padding: '1.25rem', borderRadius: '6px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Embassy Suites by Hilton SFO</h4>
              <div style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0.75rem 0' }}>250 Gateway Blvd, South San Francisco, CA</div>
              <div style={{ fontWeight: 700, color: '#0284c7', fontSize: '1rem', marginBottom: '0.5rem' }}>Special Rate: $219 / night</div>
              <a href="#" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>Book Hotel Block →</a>
            </div>

            <div style={{ border: '1px solid #cbd5e1', padding: '1.25rem', borderRadius: '6px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>DoubleTree by Hilton SFO Bayfront</h4>
              <div style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0 0.75rem 0' }}>835 Airport Blvd, Burlingame, CA</div>
              <div style={{ fontWeight: 700, color: '#0284c7', fontSize: '1rem', marginBottom: '0.5rem' }}>Special Rate: $199 / night</div>
              <a href="#" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>Book Hotel Block →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
