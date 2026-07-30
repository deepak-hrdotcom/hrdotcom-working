import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Award, Users, BookOpen, Layers, ArrowRight, CheckCircle2, Star } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <section className="wireframe-hero">
        <div className="container">
          <div className="wireframe-badge" style={{ marginBottom: '1.25rem', backgroundColor: '#1e293b', color: '#38bdf8', borderColor: '#334155' }}>
            West Coast's Premier HR Conference
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '850px', letterSpacing: '-0.02em' }}>
            HRWest 2027: <span style={{ color: '#38bdf8' }}>Imagine What's Possible</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '750px', marginBottom: '2rem', lineHeight: 1.6 }}>
            Where fresh ideas meet practical HR expertise. Join 1,000+ HR leaders for two high-impact days of AI-driven strategy, employment law compliance, and talent innovation in Silicon Valley.
          </p>

          {/* Event Metadata Strip */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem', fontSize: '1rem', color: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={20} color="#38bdf8" />
              <span><strong>March 23–24, 2027</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={20} color="#38bdf8" />
              <span>South San Francisco Conference Center</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={20} color="#38bdf8" />
              <span>Earn 20+ SHRM & HRCI Credits</span>
            </div>
          </div>

          {/* Dual Engine CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Pre-Register for 2027 <ArrowRight size={20} />
            </Link>
            <Link to="/sponsor" className="btn-secondary" style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: '#64748b', padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              Why Sponsor / Exhibit
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Social Proof & Key Metrics Marquee */}
      <section style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '2rem 0' }}>
        <div className="container grid-4" style={{ textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>1,000+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>HR Leaders & Decision Makers</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>50+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Actionable Expert Sessions</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>20+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>SHRM / HRCI Recert Credits</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>60+</div>
            <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Top HR Solution Providers</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Keynote Speakers Section */}
      <section className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            World-Class Keynote Visionaries
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
            Real Experts Who Help HR Move Forward
          </h2>
          <p style={{ color: '#64748b', maxWidth: '650px', marginBottom: '3rem' }}>
            Learn directly from global HR transformation strategists, employment legal experts, and workplace tech pioneers.
          </p>

          <div className="grid-2">
            {/* Speaker 1 Card Placeholder */}
            <div className="wireframe-box" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569', flexShrink: 0 }}>
                HEADSHOT
              </div>
              <div>
                <span className="wireframe-badge" style={{ marginBottom: '0.5rem' }}>Opening Keynote</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a' }}>Jason Averbook</h3>
                <div style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  Senior Partner & Global HR Transformation Leader, Mercer
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>
                  "Designing the Future of Work: How AI, Empathy, and Digital Transformation are Redefining HR Leadership."
                </p>
                <Link to="/speakers" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                  View Session Abstract →
                </Link>
              </div>
            </div>

            {/* Speaker 2 Card Placeholder */}
            <div className="wireframe-box" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569', flexShrink: 0 }}>
                HEADSHOT
              </div>
              <div>
                <span className="wireframe-badge" style={{ marginBottom: '0.5rem' }}>Legal Keynote</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a' }}>Allison West, Esq., SHRM-SCP</h3>
                <div style={{ color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  Managing Principal, Employment Practices Specialists
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>
                  "2027 Employment Law Mastery: Essential Compliance, Workplace Investigations & California Legal Updates."
                </p>
                <Link to="/speakers" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>
                  View Session Abstract →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 6-Track Matrix Section */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Custom Learning Paths</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
              6 Specialized Conference Tracks
            </h2>
            <p style={{ color: '#64748b' }}>
              Customize your 2-day agenda across key HR disciplines designed for immediate workplace application.
            </p>
          </div>

          <div className="grid-3">
            <div className="wireframe-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Layers color="#0284c7" size={24} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>1. HR Strategy & AI</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                Generative AI adoption, strategic workforce planning, CHRO leadership, and change management.
              </p>
            </div>

            <div className="wireframe-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <BookOpen color="#0284c7" size={24} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>2. Legal & Compliance</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                California & federal employment law, wage/hour updates, DEI legal landscapes, and investigations.
              </p>
            </div>

            <div className="wireframe-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Users color="#0284c7" size={24} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>3. HR Tech & Analytics</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                HRIS stack optimization, people analytics dashboarding, payroll automation, and vendor selection.
              </p>
            </div>

            <div className="wireframe-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Star color="#0284c7" size={24} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>4. Talent Acquisition</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                Employer branding, skills-based hiring, AI recruiting tools, and retention strategies.
              </p>
            </div>

            <div className="wireframe-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Award color="#0284c7" size={24} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>5. Leadership & Culture</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                Executive coaching, hybrid team engagement, performance management, and succession planning.
              </p>
            </div>

            <div className="wireframe-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <CheckCircle2 color="#0284c7" size={24} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>6. Health & Wellness</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                Mental health benefits, burnout prevention, healthcare cost management, and wellness ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Venue Teaser */}
      <section className="section-padding" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="wireframe-badge" style={{ backgroundColor: '#1e293b', color: '#38bdf8', marginBottom: '1rem', borderColor: '#334155' }}>
              Silicon Valley Venue
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>
              South San Francisco Conference Center
            </h2>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Conveniently located 5 minutes from San Francisco International Airport (SFO), featuring state-of-the-art keynote auditoriums, expansive sponsor hall exhibits, and seamless transit links via BART and shuttles.
            </p>
            <Link to="/attend/location" className="btn-secondary" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
              Explore Venue & Travel Guide →
            </Link>
          </div>
          <div className="wireframe-box" style={{ height: '240px', backgroundColor: '#1e293b', borderColor: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 700 }}>
            [VENUE MAP & ACCESSIBILITY SKELETON]
          </div>
        </div>
      </section>
    </div>
  );
};
