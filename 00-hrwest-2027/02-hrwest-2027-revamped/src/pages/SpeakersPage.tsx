import React, { useState } from 'react';
import { Search, Filter, Mic } from 'lucide-react';

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  track: string;
  sessionTitle: string;
  isKeynote?: boolean;
}

const SPEAKERS_DATA: Speaker[] = [
  { id: 1, name: "Jason Averbook", role: "Senior Partner & Global HR Transformation Leader", company: "Mercer", track: "HR Strategy & AI", sessionTitle: "Designing the Future of Work: AI, Empathy, and Digital Transformation", isKeynote: true },
  { id: 2, name: "Allison West, Esq., SHRM-SCP", role: "Managing Principal", company: "Employment Practices Specialists", track: "Legal & Compliance", sessionTitle: "2027 Employment Law Mastery: Workplace Investigations & Legal Updates", isKeynote: true },
  { id: 3, name: "Marcus Vance", role: "VP of People Analytics", company: "TechScale Solutions", track: "HR Tech & Analytics", sessionTitle: "Building High-Impact People Analytics Dashboards from Scratch" },
  { id: 4, name: "Dr. Elena Rostova", role: "Chief People Officer", company: "BioHealth Global", track: "Talent Acquisition", sessionTitle: "Skills-Based Hiring in the Age of Generative AI Recruitment" },
  { id: 5, name: "David K. Chen", role: "Head of Organizational Culture", company: "InnovateX", track: "Leadership & Culture", sessionTitle: "Coaching Hybrid Executives for Maximum Team Engagement" },
  { id: 6, name: "Sarah Jenkins, SPHR", role: "Director of Employee Well-being", company: "Pacific Coast Health", track: "Health & Wellness", sessionTitle: "Preventing HR Burnout: Sustainable Mental Health Strategies" }
];

export const SpeakersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const tracks = ['All', 'HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness'];

  const filteredSpeakers = SPEAKERS_DATA.filter(s => {
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.company.toLowerCase().includes(searchQuery.toLowerCase()) || s.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>World-Class Faculty</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            HRWest 2027 Keynotes & Speakers
          </h1>
          <p style={{ color: '#64748b', maxWidth: '700px', fontSize: '1.05rem' }}>
            Discover thought leaders, legal authorities, and HR innovators shaping the future of work.
          </p>
        </div>

        {/* Call for Speakers Banner */}
        <div className="wireframe-box" style={{ backgroundColor: '#0f172a', color: '#ffffff', borderColor: '#1e293b', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <Mic size={18} /> CALL FOR SPEAKERS NOW OPEN
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interested in Speaking at HRWest 2027?</h3>
            <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>Submit your session proposal by <strong>October 30, 2026</strong> for review by our advisory board.</p>
          </div>
          <a href="#" className="btn-primary" style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 700 }}>
            Submit Proposal →
          </a>
        </div>

        {/* Search & Filter Bar */}
        <div className="wireframe-box" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search speaker by name, company, or session..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          {/* Track Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={14} /> Filter Track:
            </span>
            {tracks.map(track => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                style={{
                  border: '1px solid #cbd5e1',
                  backgroundColor: selectedTrack === track ? '#0284c7' : '#ffffff',
                  color: selectedTrack === track ? '#ffffff' : '#334155',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Speakers Grid */}
        <div className="grid-3">
          {filteredSpeakers.map(s => (
            <div key={s.id} className="wireframe-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#475569', fontSize: '0.75rem' }}>
                    PHOTO
                  </div>
                  {s.isKeynote && <span className="wireframe-badge" style={{ backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#fde68a' }}>Keynote</span>}
                </div>
                <span className="wireframe-badge" style={{ marginBottom: '0.5rem' }}>{s.track}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>{s.name}</h3>
                <div style={{ fontSize: '0.85rem', color: '#0284c7', fontWeight: 600, marginBottom: '0.75rem' }}>{s.role}, {s.company}</div>
                <p style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '1rem', fontStyle: 'italic' }}>
                  "{s.sessionTitle}"
                </p>
              </div>

              <button
                onClick={() => setSelectedSpeaker(s)}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
              >
                View Full Bio & Abstract
              </button>
            </div>
          ))}
        </div>

        {/* Speaker Bio Modal Placeholder */}
        {selectedSpeaker && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', maxWidth: '600px', width: '100%', border: '2px dashed #94a3b8' }}>
              <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Speaker Bio Modal Skeleton</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{selectedSpeaker.name}</h2>
              <div style={{ color: '#0284c7', fontWeight: 600, marginBottom: '1rem' }}>{selectedSpeaker.role} — {selectedSpeaker.company}</div>
              <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>Session: {selectedSpeaker.sessionTitle}</strong>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem' }}>
                  In this high-impact session, learn actionable frameworks to implement immediately in your HR organization. Includes live Q&A and SHRM/HRCI recertification credits.
                </p>
              </div>
              <button onClick={() => setSelectedSpeaker(null)} className="btn-primary" style={{ width: '100%' }}>Close Bio Modal</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
