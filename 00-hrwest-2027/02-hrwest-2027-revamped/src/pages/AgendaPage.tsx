import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Bookmark, Check } from 'lucide-react';

interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  track: string;
  room: string;
  day: number;
}

const AGENDA_DATA: Session[] = [
  { id: 's1', day: 1, time: '08:00 AM - 09:00 AM', title: 'Registration, Breakfast & Sponsor Hall Opening', speaker: 'All Attendees', track: 'General', room: 'Main Exhibit Hall' },
  { id: 's2', day: 1, time: '09:00 AM - 10:15 AM', title: 'Opening Keynote: Designing the Future of Work with AI & Empathy', speaker: 'Jason Averbook (Mercer)', track: 'HR Strategy & AI', room: 'Grand Auditorium A' },
  { id: 's3', day: 1, time: '10:30 AM - 11:30 AM', title: '2027 Employment Law Mastery & California Legal Updates', speaker: 'Allison West, Esq.', track: 'Legal & Compliance', room: 'Auditorium B' },
  { id: 's4', day: 1, time: '11:45 AM - 12:45 PM', title: 'Building High-Impact People Analytics Dashboards', speaker: 'Marcus Vance', track: 'HR Tech & Analytics', room: 'Breakout Room 1' },
  { id: 's5', day: 2, time: '09:00 AM - 10:15 AM', title: 'Day 2 Keynote: Skills-Based Hiring & AI Talent Acquisition', speaker: 'Dr. Elena Rostova', track: 'Talent Acquisition', room: 'Grand Auditorium A' },
  { id: 's6', day: 2, time: '10:30 AM - 11:30 AM', title: 'Coaching Hybrid Leadership Teams for Retention', speaker: 'David K. Chen', track: 'Leadership & Culture', room: 'Auditorium B' },
  { id: 's7', day: 2, time: '11:45 AM - 12:45 PM', title: 'Preventing Workplace Burnout: Sustainable Wellness ROI', speaker: 'Sarah Jenkins, SPHR', track: 'Health & Wellness', room: 'Breakout Room 2' }
];

export const AgendaPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [bookmarkedSessions, setBookmarkedSessions] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    if (bookmarkedSessions.includes(id)) {
      setBookmarkedSessions(bookmarkedSessions.filter(b => b !== id));
    } else {
      setBookmarkedSessions([...bookmarkedSessions, id]);
    }
  };

  const filteredSessions = AGENDA_DATA.filter(s => s.day === activeDay && (selectedTrack === 'All' || s.track === selectedTrack));

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Curate Your Experience</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              HRWest 2027 Conference Schedule
            </h1>
            <p style={{ color: '#64748b', maxWidth: '650px' }}>
              Two full days of keynotes, breakout sessions, and networking. Earn 20+ SHRM & HRCI credits.
            </p>
          </div>
          <div className="wireframe-box" style={{ padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#ffffff' }}>
            <Bookmark size={20} color="#0284c7" />
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Saved Schedule</div>
              <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{bookmarkedSessions.length} Sessions Bookmarked</strong>
            </div>
          </div>
        </div>

        {/* Day Selector Tabs & Track Filter Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #cbd5e1', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setActiveDay(1)}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '6px 6px 0 0',
                border: 'none',
                backgroundColor: activeDay === 1 ? '#0284c7' : 'transparent',
                color: activeDay === 1 ? '#ffffff' : '#334155',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Calendar size={18} /> Day 1 — Tuesday, March 23, 2027
            </button>
            <button
              onClick={() => setActiveDay(2)}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '6px 6px 0 0',
                border: 'none',
                backgroundColor: activeDay === 2 ? '#0284c7' : 'transparent',
                color: activeDay === 2 ? '#ffffff' : '#334155',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Calendar size={18} /> Day 2 — Wednesday, March 24, 2027
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Filter Track:</span>
            {['All', 'HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness'].map(track => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                style={{
                  border: '1px solid #cbd5e1',
                  backgroundColor: selectedTrack === track ? '#0284c7' : '#ffffff',
                  color: selectedTrack === track ? '#ffffff' : '#334155',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredSessions.map(session => {
            const isBookmarked = bookmarkedSessions.includes(session.id);
            return (
              <div key={session.id} className="wireframe-box" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', backgroundColor: '#ffffff' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: '#0284c7' }}>
                      <Clock size={16} /> {session.time}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={16} /> {session.room}
                    </span>
                    <span className="wireframe-badge">{session.track}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                    {session.title}
                  </h3>
                  <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>
                    Speaker: {session.speaker}
                  </div>
                </div>

                <button
                  onClick={() => toggleBookmark(session.id)}
                  className={isBookmarked ? 'btn-primary' : 'btn-secondary'}
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  {isBookmarked ? (
                    <> <Check size={16} /> Bookmarked </>
                  ) : (
                    <> <Bookmark size={16} /> Add to Schedule </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
