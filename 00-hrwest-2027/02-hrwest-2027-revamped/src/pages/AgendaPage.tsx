import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Bookmark, Check, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Session {
  id: string;
  time: string;
  title: string;
  speaker: string;
  track: string;
  room: string;
  day: number;
  credits?: string;
}

const AGENDA_DATA: Session[] = [
  { id: 's1', day: 1, time: '08:00 AM – 09:00 AM', title: 'Registration, Breakfast & Sponsor Hall Opening', speaker: 'All Attendees', track: 'General', room: 'Main Exhibit Hall', credits: '—' },
  { id: 's2', day: 1, time: '09:00 AM – 10:15 AM', title: 'Opening Keynote: Designing the Future of Work with AI & Empathy', speaker: 'Nancy Hauge — Automation Anywhere', track: 'HR Strategy & AI', room: 'Grand Auditorium A', credits: '1.25' },
  { id: 's3', day: 1, time: '10:30 AM – 11:30 AM', title: '2027 Employment Law Mastery & California Legal Updates', speaker: 'Rosalind Cohen — Socius Strategies', track: 'Legal & Compliance', room: 'Auditorium B', credits: '1.0' },
  { id: 's4', day: 1, time: '11:45 AM – 12:45 PM', title: 'Building High-Impact People Analytics Dashboards', speaker: 'Treena Diebolt — Otter.ai', track: 'HR Tech & Analytics', room: 'Breakout Room 1', credits: '1.0' },
  { id: 's5', day: 1, time: '01:00 PM – 02:00 PM', title: 'Networking Lunch & Sponsor Showcase', speaker: 'All Attendees', track: 'General', room: 'Exhibit Hall', credits: '—' },
  { id: 's6', day: 1, time: '02:15 PM – 03:15 PM', title: 'Leadership in the Age of AI: Building Trust at Scale', speaker: 'Lee Cage Jr. — BDO USA', track: 'Leadership & Culture', room: 'Breakout Room 2', credits: '1.0' },
  { id: 's7', day: 2, time: '09:00 AM – 10:15 AM', title: 'Day 2 Keynote: Skills-Based Hiring & AI Talent Acquisition', speaker: 'Edie Goldberg — E. L. Goldberg & Associates', track: 'Talent Acquisition', room: 'Grand Auditorium A', credits: '1.25' },
  { id: 's8', day: 2, time: '10:30 AM – 11:30 AM', title: 'Coaching Hybrid Leadership Teams for Retention', speaker: 'Lee Cage Jr. — BDO USA', track: 'Leadership & Culture', room: 'Auditorium B', credits: '1.0' },
  { id: 's9', day: 2, time: '11:45 AM – 12:45 PM', title: 'Preventing Workplace Burnout: Sustainable Wellness ROI', speaker: 'Debbie McGrath — HR.com', track: 'Health & Wellness', room: 'Breakout Room 2', credits: '1.0' },
  { id: 's10', day: 2, time: '02:00 PM – 03:00 PM', title: 'Closing Panel: What West Coast HR Leaders Will Do Differently in 2027', speaker: 'Speaker Panel', track: 'General', room: 'Grand Auditorium A', credits: '1.0' },
];

const TRACK_COLORS: Record<string, string> = {
  'HR Strategy & AI': 'var(--color-brand-purple)',
  'Legal & Compliance': '#d97706',
  'HR Tech & Analytics': '#0284c7',
  'Talent Acquisition': '#059669',
  'Leadership & Culture': '#7c3aed',
  'Health & Wellness': '#ec4899',
  'General': 'var(--color-text-muted)',
};

const TRACKS = ['All', 'HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness', 'General'];

export const AgendaPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [bookmarkedSessions, setBookmarkedSessions] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarkedSessions(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const filteredSessions = AGENDA_DATA.filter(s => s.day === activeDay && (selectedTrack === 'All' || s.track === selectedTrack));

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}
          >
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
                <Calendar size={13} /> Curate Your Experience
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.5rem' }}>
                Conference Schedule
              </h1>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', maxWidth: '550px' }}>
                Two full days of keynotes, breakout sessions, and networking. Earn 20+ SHRM & HRCI credits.
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: 'var(--radius-lg)', padding: '1rem 1.5rem', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Bookmark size={22} color="#fff" />
              <div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>My Schedule</div>
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{bookmarkedSessions.length} Saved</strong>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Day Tabs + Track Filters ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2rem 0 1rem' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Day toggle */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[1, 2].map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  style={{
                    padding: '0.85rem 2rem', borderRadius: 'var(--radius-full)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem',
                    background: activeDay === day ? 'var(--gradient-brand)' : 'var(--color-elevated)',
                    color: activeDay === day ? '#fff' : 'var(--color-text-secondary)',
                    boxShadow: activeDay === day ? 'var(--shadow-brand)' : 'var(--shadow-sm)',
                    transition: 'all 0.25s ease',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                >
                  <Calendar size={16} />
                  Day {day} — {day === 1 ? 'Tuesday, March 23' : 'Wednesday, March 24'}
                </button>
              ))}
            </div>

            {/* Track pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {TRACKS.map(track => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  style={{
                    padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem',
                    background: selectedTrack === track ? 'var(--gradient-brand)' : 'var(--color-elevated)',
                    color: selectedTrack === track ? '#fff' : 'var(--color-text-muted)',
                    boxShadow: selectedTrack === track ? '0 4px 14px rgba(145,39,140,0.3)' : 'var(--shadow-sm)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sessions Timeline ── */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '1rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${selectedTrack}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {filteredSessions.map((session, idx) => {
                const isBookmarked = bookmarkedSessions.includes(session.id);
                const trackColor = TRACK_COLORS[session.track] || 'var(--color-text-muted)';
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    style={{
                      background: 'var(--color-elevated)',
                      border: `1px solid ${isBookmarked ? 'rgba(145,39,140,0.3)' : 'var(--color-subtle)'}`,
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem 2rem',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      flexWrap: 'wrap', gap: '1.25rem',
                      boxShadow: isBookmarked ? '0 4px 20px rgba(145,39,140,0.12)' : 'var(--shadow-sm)',
                      borderLeft: `4px solid ${trackColor}`,
                      transition: 'var(--transition-base)',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', color: trackColor }}>
                          <Clock size={14} /> {session.time}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-soft)' }}>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          <MapPin size={13} /> {session.room}
                        </span>
                        <span className="badge badge-brand" style={{ fontSize: '0.65rem' }}>{session.track}</span>
                        {session.credits !== '—' && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.72rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-brand-purple)' }}>
                            <Award size={12} /> {session.credits} Credits
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.3rem', lineHeight: 1.3 }}>
                        {session.title}
                      </h3>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                        {session.speaker}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(session.id)}
                      className={isBookmarked ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'}
                      style={{ flexShrink: 0 }}
                    >
                      {isBookmarked ? <><Check size={15} /> Saved</> : <><Bookmark size={15} /> Save</>}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredSessions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>No sessions match this track on Day {activeDay}.</p>
              <button onClick={() => setSelectedTrack('All')} className="btn btn-outline" style={{ marginTop: '1rem' }}>Show All Sessions</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 0' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Ready to Build Your Perfect Schedule?
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
              Pre-register now to get first access to session booking and priority seating for keynotes.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Pre-Register for HRWest 2027 <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
