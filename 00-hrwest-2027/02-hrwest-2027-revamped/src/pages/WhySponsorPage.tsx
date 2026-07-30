import React, { useState } from 'react';
import { BarChart3, Users, Target, CheckCircle, Send } from 'lucide-react';

export const WhySponsorPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Exhibitor & Sponsor Prospectus</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Reach & Connect with High-Intent HR Decision-Makers
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
            HRWest is Silicon Valley's flagship HR gathering. Connect face-to-face with buyers actively seeking payroll, benefits, talent acquisition, and AI solution providers.
          </p>
        </div>

        {/* Audience Demographic Dashboard */}
        <div className="grid-3" style={{ marginBottom: '3.5rem' }}>
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0284c7' }}>
              <Users size={28} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>68% Seniority Breakdown</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Manager & Above</div>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              CHROs, VPs of HR, Directors, and People Ops managers actively evaluating vendor solutions.
            </p>
          </div>

          <div className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0284c7' }}>
              <Target size={28} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>Direct Buying Power</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>84% Authority</div>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Attendees possess final purchasing or evaluation authority for HR technology and benefit contracts.
            </p>
          </div>

          <div className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0284c7' }}>
              <BarChart3 size={28} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>Company Size</h3>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>100–5,000+</div>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Mid-market to enterprise organizations with active HR technology budgets.
            </p>
          </div>
        </div>

        {/* Prospectus Request Form */}
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Sponsorship Packages</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              Why Exhibit at HRWest 2027?
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem', color: '#334155' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle color="#0284c7" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>High-Density Booth Traffic:</strong> Breakfast, lunch, and networking receptions hosted directly inside the Sponsor Exhibit Hall.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle color="#0284c7" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Thought Leadership Speaking:</strong> Platinum & Diamond packages include dedicated track presentation slots.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <CheckCircle color="#0284c7" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Turnkey Badge Scanning & Leads:</strong> Full attendee lead retrieval app included with all booth packages.</span>
              </li>
            </ul>
          </div>

          <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Request 2027 Sponsor Prospectus
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Fill out the form below to receive the complete sponsorship kit and booth pricing.
            </p>

            {submitted ? (
              <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.1rem' }}>Prospectus Request Sent!</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Our sponsorship team will send the 2027 prospectus kit to {formData.email} within 1 business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Company Name</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Send Me the Prospectus <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
