import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Mic2, ChevronRight, BadgeCheck, ArrowRight, Users, Sparkles } from 'lucide-react';

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  track: string;
  sessionTitle: string;
  isKeynote?: boolean;
  isFeatured?: boolean;
  badgeLabel?: string;
  photo?: string;
  companyLogo?: string;
}

const SPEAKERS_DATA: Speaker[] = [
  { id: 1, name: "Jason Averbook", role: "Global HR Transformation Leader & Author", company: "Now to Next", track: "HR Strategy & AI", sessionTitle: "Opening Keynote: The Future of HR in the Age of Generative AI & Digital Transformation", isKeynote: true, isFeatured: true, badgeLabel: "⭐ Global Thought Leader", photo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/JasonAverbook.webp", companyLogo: "" },
  { id: 2, name: "Allison West, Esq., SHRM-SCP", role: "Principal & Employment Law Specialist", company: "Employment Practices Specialists", track: "Legal & Compliance", sessionTitle: "Mastering Workplace Investigations & 2027 Employment Law Mandates", isKeynote: true, isFeatured: true, badgeLabel: "❤️ Attendee Favorite", photo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/AllisonWest.webp", companyLogo: "" },
  { id: 3, name: "Nancy Hauge", role: "Chief People Experience Officer", company: "Automation Anywhere", track: "HR Strategy & AI", sessionTitle: "AI-Driven Employee Experience: Transforming Workplace Culture at Scale", isKeynote: true, photo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/nancy-hauge-350x350.jpg", companyLogo: "https://public-cdn.hr.com/system/app/media/rs/2026/4/17/mo359gqh/120.jpg" },
  { id: 4, name: "Treena Diebolt", role: "Vice President, People", company: "Otter.ai", track: "HR Tech & Analytics", sessionTitle: "People Analytics That Move the Needle: Building Data-Driven HR Organizations", isKeynote: true, photo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/treena-diebolt-350x350.jpg", companyLogo: "https://public-cdn.hr.com/system/app/media/rs/2026/4/16/mo1hwqvi/120.jpg" },
  { id: 5, name: "Edie Goldberg", role: "Founder & President", company: "E. L. Goldberg & Associates", track: "Talent Acquisition", sessionTitle: "Skills-Based Hiring in the Age of Generative AI Recruitment", photo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/edie-goldberg-350x350.jpg", companyLogo: "https://public-cdn.hr.com/system/app/media/rs/2013/2/1/hco5svrr/120.jpg" },
  { id: 6, name: "Lee Cage Jr.", role: "Director, Enterprise Transformation", company: "BDO USA", track: "Leadership & Culture", sessionTitle: "Coaching Hybrid Executives for Maximum Team Engagement", photo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/lee-cage-350x350.jpg", companyLogo: "https://public-cdn.hr.com/system/app/media/rs/2013/8/19/hkk3u63c/120.jpg" },
  { id: 7, name: "Debbie McGrath", role: "CEO, Founder & Chief Instigator", company: "HR.com", track: "HR Strategy & AI", sessionTitle: "Opening Remarks: Welcome to HRWest 2027", isKeynote: true, photo: "https://public-cdn.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/images/speaker-headshots/debbie-mcgrath2.jpg", companyLogo: "https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg" },
];

const TRACKS = ['All', 'HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness'];

export const SpeakersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All');
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const filteredSpeakers = SPEAKERS_DATA.filter(s => {
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.company.toLowerCase().includes(searchQuery.toLowerCase()) || s.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSearch;
  });

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{
        background: 'var(--gradient-brand)',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <Users size={13} /> World-Class Faculty
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem' }}>
              HRWest 2027 Speakers
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '600px', lineHeight: 1.7 }}>
              Executive HR leaders, legal authorities, and tech founders — all sharing actionable insights you can implement Monday morning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Call for Speakers Banner ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2rem 0' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              background: 'var(--gradient-brand-soft)',
              border: '1.5px solid rgba(145,39,140,0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-purple"><Mic2 size={12} /> Call for Speakers</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Interested in Speaking at HRWest 2027?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Submit your session proposal by <strong style={{ color: 'var(--color-brand-purple)' }}>October 30, 2026</strong> for review by our advisory board.
              </p>
            </div>
            <a href="#" className="btn btn-primary">
              Submit Proposal <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Search & Filter ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '1rem 0 2rem' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{
              background: 'var(--color-elevated)',
              border: '1px solid var(--color-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 2rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex', flexDirection: 'column', gap: '1rem',
            }}
          >
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="var(--color-text-soft)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search by name, company, or session topic..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem',
                  border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem', fontFamily: 'var(--font-body)',
                  background: 'var(--color-canvas)',
                  transition: 'var(--transition-fast)',
                  outline: 'none',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Filter size={14} /> Track:
              </span>
              {TRACKS.map(track => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.45rem 1rem', borderRadius: 'var(--radius-full)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem',
                    transition: 'all 0.2s ease',
                    background: selectedTrack === track ? 'var(--gradient-brand)' : 'var(--color-canvas)',
                    color: selectedTrack === track ? '#fff' : 'var(--color-text-secondary)',
                    boxShadow: selectedTrack === track ? '0 4px 14px rgba(145,39,140,0.3)' : 'none',
                  }}
                >
                  {track}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Speaker Cards Grid ── */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '2rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {filteredSpeakers.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
                style={{
                  background: s.isFeatured ? 'linear-gradient(180deg, rgba(145,39,140,0.06) 0%, var(--color-elevated) 100%)' : 'var(--color-elevated)',
                  border: s.isFeatured ? '2px solid rgba(145, 39, 140, 0.45)' : '1px solid var(--color-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: s.isFeatured ? '0 14px 40px rgba(145, 39, 140, 0.22), 0 0 20px rgba(239, 20, 110, 0.15)' : 'var(--shadow-sm)',
                  display: 'flex', flexDirection: 'column',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() => setSelectedSpeaker(s)}
              >
                {/* 100% Unobstructed Photo Header */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: 'var(--color-surface)' }}>
                  {s.photo ? (
                    <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: 'rgba(145,39,140,0.2)' }}>
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px', background: 'linear-gradient(to bottom, transparent, var(--color-elevated))' }} />

                  {s.companyLogo && (
                    <div style={{ position: 'absolute', bottom: '10px', right: '12px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderRadius: 'var(--radius-md)', padding: '0.3rem 0.65rem', border: '1px solid var(--color-subtle)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 2 }}>
                      <img
                        src={s.companyLogo}
                        alt={s.company}
                        style={{ maxHeight: '22px', maxWidth: '72px', objectFit: 'contain', display: 'block' }}
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Card body — Clean, structured typography with zero photo overlap */}
                <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {s.isFeatured && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'var(--gradient-brand)',
                      color: '#ffffff',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                      letterSpacing: '0.03em',
                      marginBottom: '0.75rem',
                      width: 'fit-content',
                      boxShadow: '0 4px 14px rgba(145,39,140,0.3)',
                    }}>
                      <Sparkles size={12} /> {s.badgeLabel || 'Featured Leader'}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                      <BadgeCheck size={11} /> {s.isKeynote ? 'Keynote Speaker' : s.track}
                    </span>
                    <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
                      {s.track}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: s.isFeatured ? 900 : 800,
                    fontSize: s.isFeatured ? '1.3rem' : '1.15rem',
                    lineHeight: 1.2,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.3rem',
                    letterSpacing: '-0.02em',
                  }}>
                    {s.name}
                  </h3>

                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: s.isFeatured ? '0.9rem' : '0.82rem',
                    color: 'var(--color-brand-purple)',
                    marginBottom: '0.75rem',
                  }}>
                    {s.role} · <strong>{s.company}</strong>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '1rem' }}>
                    "{s.sessionTitle}"
                  </p>

                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-brand-purple)', paddingTop: '0.75rem', borderTop: '1px solid var(--color-subtle)' }}>
                    View Full Bio & Session <ChevronRight size={15} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredSpeakers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>No speakers match your filter.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedTrack('All'); }} className="btn btn-outline" style={{ marginTop: '1rem' }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Speaker Bio Modal ── */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
            onClick={() => setSelectedSpeaker(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--color-elevated)',
                borderRadius: 'var(--radius-xl)',
                padding: '0',
                maxWidth: '600px', width: '100%',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--color-subtle)',
                overflow: 'hidden',
              }}
            >
              {/* Modal photo header */}
              {selectedSpeaker.photo && (
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={selectedSpeaker.photo} alt={selectedSpeaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, var(--color-elevated) 100%)' }} />
                </div>
              )}
              <div style={{ padding: '2rem', marginTop: selectedSpeaker.photo ? '-2rem' : '0', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {selectedSpeaker.isKeynote && <span className="badge badge-purple"><BadgeCheck size={11} /> Keynote</span>}
                  <span className="badge badge-brand">{selectedSpeaker.track}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.65rem', color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>{selectedSpeaker.name}</h2>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-brand-purple)', marginBottom: '1.25rem' }}>{selectedSpeaker.role} — {selectedSpeaker.company}</div>
                <div style={{ padding: '1.25rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-brand-purple)', marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.72rem', color: 'var(--color-brand-purple)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>Session</div>
                  <strong style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}>{selectedSpeaker.sessionTitle}</strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                    In this high-impact session, learn actionable frameworks to implement immediately in your HR organization. Includes live Q&A and SHRM/HRCI recertification credits.
                  </p>
                </div>
                <button onClick={() => setSelectedSpeaker(null)} className="btn btn-primary" style={{ width: '100%' }}>
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
