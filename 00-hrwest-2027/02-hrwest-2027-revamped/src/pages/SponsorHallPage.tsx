import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const PAST_SPONSORS = [
  { name: "SAP SuccessFactors", category: "HCM & Payroll Platform", logo: "SAP SUCCESSFACTORS" },
  { name: "UKG (Ultimate Kronos Group)", category: "Workforce Management", logo: "UKG" },
  { name: "Rippling", category: "All-in-One HR & IT", logo: "RIPPLING" },
  { name: "Alliant Insurance Services", category: "Benefits & Employee Brokerage", logo: "ALLIANT" },
  { name: "Robert Half", category: "Talent Solutions & Staffing", logo: "ROBERT HALF" },
  { name: "Insperity", category: "HR Outsourcing & PEO", logo: "INSPERITY" }
];

export const SponsorHallPage: React.FC = () => {
  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Past HRWest Partners</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Companies That Have Featured at HRWest
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Join the leading HR tech platforms, benefits providers, and strategy firms who have connected with 1,000+ West Coast HR decision-makers.
          </p>
        </div>

        {/* Vendor Acquisition Banner */}
        <div className="wireframe-box" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2.5rem', marginBottom: '3.5rem', borderColor: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <Sparkles size={18} /> 2027 SPONSORSHIP OPPORTUNITIES NOW OPEN
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Become a 2027 Featured Sponsor or Exhibitor
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '600px' }}>
              68% of HRWest attendees hold Manager/Director/CHRO authority with active HR technology and benefits budgets.
            </p>
          </div>
          <Link to="/sponsor" className="btn-primary" style={{ padding: '0.8rem 1.75rem', fontSize: '1rem', backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 700 }}>
            Become a Sponsor <ArrowRight size={18} />
          </Link>
        </div>

        {/* Past Sponsors Grid */}
        <div style={{ marginBottom: '1.5rem', fontWeight: 700, color: '#0f172a', fontSize: '1.2rem' }}>
          Past HRWest Sponsors & Exhibitors:
        </div>

        <div className="grid-3">
          {PAST_SPONSORS.map((sponsor, idx) => (
            <div key={idx} className="wireframe-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px', backgroundColor: '#ffffff' }}>
              <div>
                <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Past Sponsor</span>
                <div style={{ height: '60px', backgroundColor: '#e2e8f0', border: '1px dashed #94a3b8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569', marginBottom: '0.75rem' }}>
                  [{sponsor.logo}]
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>{sponsor.name}</h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{sponsor.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
