import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';

export const TeamAttendPage: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(5);

  const basePricePerTicket = 995; // Standard Early Bird Ticket Price

  const calculateDiscount = (size: number) => {
    if (size >= 10) return 0.35; // 35% Custom Enterprise Discount
    if (size >= 6) return 0.25;  // 25% Team Discount
    if (size >= 3) return 0.15;  // 15% Group Discount
    return 0;                    // 0% Single Ticket
  };

  const discountRate = calculateDiscount(teamSize);
  const discountedPricePerTicket = Math.round(basePricePerTicket * (1 - discountRate));
  const totalStandardPrice = basePricePerTicket * teamSize;
  const totalDiscountedPrice = discountedPricePerTicket * teamSize;
  const totalSavings = totalStandardPrice - totalDiscountedPrice;

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Team Registration & Group Discounts</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Bring Your HR Team to HRWest 2027
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Maximize learning impact, cover all 6 conference tracks simultaneously, and save up to 35% on team pass packages.
          </p>
        </div>

        {/* Functional Interactive Team Discount Calculator */}
        <div className="grid-2" style={{ alignItems: 'start', marginBottom: '4rem' }}>
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#0284c7' }}>
              <Calculator size={28} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a' }}>Interactive Group Discount Calculator</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '2rem' }}>
              Drag the slider below to select your team size and see your instant group savings.
            </p>

            {/* Slider Input */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
                <span>Select Team Size:</span>
                <span style={{ color: '#0284c7', fontSize: '1.25rem' }}>{teamSize} Attendees</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={teamSize}
                onChange={e => setTeamSize(parseInt(e.target.value))}
                style={{ width: '100%', height: '8px', accentColor: '#0284c7', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                <span>1 Ticket (0%)</span>
                <span>3-5 (15% Off)</span>
                <span>6-10 (25% Off)</span>
                <span>10+ (35% Enterprise)</span>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Applied Discount Tier:</span>
                <strong style={{ color: '#38bdf8' }}>{Math.round(discountRate * 100)}% Group Discount</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Per-Ticket Rate:</span>
                <strong>${discountedPricePerTicket} <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#94a3b8' }}>${basePricePerTicket}</span></strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', paddingTop: '0.25rem' }}>
                <span>Total Team Savings:</span>
                <span>${totalSavings.toLocaleString()}</span>
              </div>
            </div>

            <Link to="/register" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
              Register Team of {teamSize} ({Math.round(discountRate * 100)}% Saved) <ArrowRight size={18} />
            </Link>
          </div>

          {/* Value Props List */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
              Why Leading HR Teams Attend Together
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle color="#0284c7" size={18} /> Divide & Conquer All 6 Tracks
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Send team members to different concurrent breakouts (AI, Legal, Benefits, Analytics) and debrief together to cover 100% of session content.
                </p>
              </li>

              <li className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle color="#0284c7" size={18} /> Team SHRM/HRCI Recertification
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Fulfill annual recertification credit requirements for your entire HR department in one 2-day conference.
                </p>
              </li>

              <li className="wireframe-box" style={{ backgroundColor: '#ffffff' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle color="#0284c7" size={18} /> Post-Conference Debrief Workshop
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Groups of 5+ receive a complimentary post-event strategy debrief template to present key takeaways to your executive team.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
