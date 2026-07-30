import React, { useState } from 'react';
import { Ticket, ShieldCheck, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'early' | 'team' | 'virtual'>('early');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);

  const tierPrices = {
    early: 995,
    team: 845,
    virtual: 495
  };

  const currentPrice = tierPrices[selectedTier];
  const totalPrice = currentPrice * ticketCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Secure Pre-Registration</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Pre-Register for HRWest 2027
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem' }}>
            Lock in Super Early Bird pricing for West Coast's premier HR conference. Full access to 50+ sessions & 20+ SHRM/HRCI credits.
          </p>
        </div>

        {/* Ticket Tier Options */}
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          {/* Tier 1: Super Early Bird */}
          <div
            onClick={() => setSelectedTier('early')}
            className="wireframe-box"
            style={{
              backgroundColor: '#ffffff',
              border: selectedTier === 'early' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {selectedTier === 'early' && <span className="wireframe-badge" style={{ backgroundColor: '#0284c7', color: '#ffffff', position: 'absolute', top: '-12px', right: '16px' }}>Selected</span>}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Super Early Bird Pass</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>$995</div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Individual 2-Day All-Access Pass</p>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>✓ All Keynotes & 50+ Breakout Sessions</li>
              <li>✓ 20+ SHRM & HRCI Credits</li>
              <li>✓ Full Sponsor Hall & Meals</li>
            </ul>
          </div>

          {/* Tier 2: Team Pass */}
          <div
            onClick={() => setSelectedTier('team')}
            className="wireframe-box"
            style={{
              backgroundColor: '#ffffff',
              border: selectedTier === 'team' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {selectedTier === 'team' && <span className="wireframe-badge" style={{ backgroundColor: '#0284c7', color: '#ffffff', position: 'absolute', top: '-12px', right: '16px' }}>Selected</span>}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Team Group Pass (3+)</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>$845 <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>/ ticket</span></div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Discounted rate for 3+ team members</p>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>✓ Everything in Early Bird</li>
              <li>✓ 15% to 35% Team Discount</li>
              <li>✓ Post-Event Team Debrief Kit</li>
            </ul>
          </div>

          {/* Tier 3: Virtual Pass */}
          <div
            onClick={() => setSelectedTier('virtual')}
            className="wireframe-box"
            style={{
              backgroundColor: '#ffffff',
              border: selectedTier === 'virtual' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {selectedTier === 'virtual' && <span className="wireframe-badge" style={{ backgroundColor: '#0284c7', color: '#ffffff', position: 'absolute', top: '-12px', right: '16px' }}>Selected</span>}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Virtual Live Pass</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>$495</div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>Online Livestream & On-Demand Access</p>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>✓ Live Livestream of Keynotes</li>
              <li>✓ On-Demand Session Recordings</li>
              <li>✓ Digital SHRM/HRCI Certificate</li>
            </ul>
          </div>
        </div>

        {/* Checkout & Intake Form Grid */}
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Ticket color="#0284c7" size={24} /> Attendee Registration Form
            </h3>

            {submitted ? (
              <div style={{ padding: '1.5rem', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.2rem' }}>Pre-Registration Confirmed!</strong>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Thank you for securing your pre-registration for HRWest 2027. Confirmation email and invoice receipt have been sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Full Name</label>
                  <input type="text" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Work Email</label>
                  <input type="email" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Job Title</label>
                    <input type="text" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Company Name</label>
                    <input type="text" required style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Number of Tickets</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={ticketCount}
                    onChange={e => setTicketCount(parseInt(e.target.value) || 1)}
                    style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
                  Complete Pre-Registration (${totalPrice.toLocaleString()}) <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Box */}
          <div className="wireframe-box" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
              Order Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1' }}>
                <span>Pass Type:</span>
                <strong style={{ color: '#ffffff', textTransform: 'capitalize' }}>{selectedTier} Pass</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1' }}>
                <span>Rate per Ticket:</span>
                <strong style={{ color: '#ffffff' }}>${currentPrice}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1' }}>
                <span>Quantity:</span>
                <strong style={{ color: '#ffffff' }}>{ticketCount} Ticket(s)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', borderTop: '1px solid #334155', paddingTop: '0.75rem' }}>
                <span>Total Amount:</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
              <ShieldCheck color="#38bdf8" size={20} />
              <span>100% Refundable pre-registration guarantee until Jan 30, 2027.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
