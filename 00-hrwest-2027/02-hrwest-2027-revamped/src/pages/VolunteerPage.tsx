import React, { useState } from 'react';
import { HeartHandshake, CheckCircle2, Send } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Earn a Complimentary Pass</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Volunteer at HRWest 2027
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Gain full access to keynotes, sessions, and networking by supporting our event operations team for half-day shifts.
          </p>
        </div>

        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Volunteer Benefits */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Volunteer Benefits & Responsibilities
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 color="#0284c7" size={18} /> Free Full-Conference Registration
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Receive full access to all keynotes, breakout sessions, and sponsor hall exhibits during your off-shift hours.
                </p>
              </li>

              <li className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 color="#0284c7" size={18} /> Earn SHRM & HRCI Recertification Credits
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Attend sessions during non-shift hours and earn official recertification credits.
                </p>
              </li>

              <li className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 color="#0284c7" size={18} /> Flexible Roles
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Roles include Session Room Monitoring, Registration Desk Check-in, and Speaker Support.
                </p>
              </li>
            </ul>
          </div>

          {/* Volunteer Application Form */}
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HeartHandshake color="#0284c7" size={24} /> Volunteer Application Form
            </h3>

            {submitted ? (
              <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.1rem' }}>Application Submitted!</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Thank you for applying to volunteer at HRWest 2027. Our volunteer coordinator will contact you by email within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Full Name</label>
                  <input type="text" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Email Address</label>
                  <input type="email" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Current HR Title / Organization</label>
                  <input type="text" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Preferred Shift Availability</label>
                  <select style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff' }}>
                    <option>Day 1 Morning (March 23)</option>
                    <option>Day 1 Afternoon (March 23)</option>
                    <option>Day 2 Morning (March 24)</option>
                    <option>Day 2 Afternoon (March 24)</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Submit Volunteer Application <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
