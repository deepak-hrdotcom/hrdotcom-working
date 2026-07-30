import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic2, Users, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import speakersHero from '../assets/speakers_hero.png';

interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  track: string;
  isKeynote?: boolean;
  photo: string;
  companyLogo?: string;
}

const SPEAKERS_DATA: Speaker[] = [
  // Keynote / Featured
  { id: 1, name: 'Jason Averbook', role: 'Global HR Transformation Leader & Author', company: 'Now to Next', track: 'HR Strategy & AI', isKeynote: true, photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/JasonAverbook.webp', companyLogo: '' },
  { id: 2, name: 'Allison West, Esq., SHRM-SCP, AWI-CH', role: 'Principal', company: 'Employment Practices Specialists', track: 'Legal & Compliance', isKeynote: true, photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/AllisonWest.webp', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2013/4/17/hfmujyr2/120.jpg' },
  { id: 3, name: 'Debbie McGrath', role: 'CEO / Founder and Chief Instigator', company: 'HR.com', track: 'HR Strategy & AI', isKeynote: true, photo: 'https://public-cdn.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/images/speaker-headshots/debbie-mcgrath2.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg' },
  // All speakers from live CMS
  { id: 4, name: 'Dr. Alireza Boloorchi', role: 'Professor and CEO', company: 'Oklahoma State University & Catch Up AI', track: 'HR Strategy & AI', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/alireza-boloorchi-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2015/9/1/ie0z1c3k/120.jpg' },
  { id: 5, name: 'Lee Cage Jr.', role: 'Director, Enterprise Transformation, Strategy & Technology', company: 'BDO USA', track: 'Leadership & Culture', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/lee-cage-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2013/8/19/hkk3u63c/120.jpg' },
  { id: 6, name: 'Rosalind "Roz" Cohen', role: 'CEO/Founder', company: 'Socius Strategies', track: 'Leadership & Culture', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/roz-cohen-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/5/4/morqbiut/120.jpg' },
  { id: 7, name: 'Treena Diebolt', role: 'Vice President, People', company: 'Otter.ai', track: 'HR Tech & Analytics', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/treena-diebolt-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/16/mo1hwqvi/120.jpg' },
  { id: 8, name: 'Edie Goldberg', role: 'Founder & President', company: 'E. L. Goldberg & Associates', track: 'Talent Acquisition', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/edie-goldberg-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2013/2/1/hco5svrr/120.jpg' },
  { id: 9, name: 'Natalie Grabher', role: 'VP of HR', company: 'Hall of Frames', track: 'HR Strategy & AI', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/natalie-grabher-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/17/mo356yk9/120.jpg' },
  { id: 10, name: 'Stephanie Hancock', role: 'Director of People and Culture', company: 'Dealer Image Pro™', track: 'Leadership & Culture', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/stephanie-hancock-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/29/mok35rar/120.jpg' },
  { id: 11, name: 'Nancy Hauge', role: 'Chief People Experience Officer', company: 'Automation Anywhere', track: 'HR Strategy & AI', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/nancy-hauge-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/17/mo359gqh/120.jpg' },
  { id: 12, name: 'Christina Herrmann', role: 'Global Chief People Officer', company: 'The Oliver Agency', track: 'HR Strategy & AI', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/christina-smith-herrmann-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/christina-herrmann-logo.jpg' },
  { id: 13, name: 'Howard Kornfeld, MD', role: 'Director', company: 'Recovery Without Walls', track: 'Health & Wellness', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/howard-kornfeld-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/5/8/moxah14a/120.jpg' },
  { id: 14, name: 'Emma Lidgett', role: 'Global Head of Talent Development and Learning', company: 'Kainos', track: 'Talent Acquisition', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/emma-lidgett-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/10/16/kuttvljc/120.jpg' },
  { id: 15, name: 'Laura Middleton', role: 'CEO', company: 'HRCP - Human Resource Certification Preparation', track: 'HR Strategy & AI', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/laura-middleton-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2023/12/12/lq2rdkt6/120.jpg' },
  { id: 16, name: 'Mark Monaghan', role: 'Vice President of Organizational Development', company: 'iQor', track: 'Leadership & Culture', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/mark-monaghan-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2014/4/8/htrbviw9/120.jpg' },
  { id: 17, name: 'Dr. Lauren S. Park, PhD', role: 'Quantitative Science Team Lead, Future of Work Research Lab', company: 'SAP SuccessFactors', track: 'HR Tech & Analytics', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/lauren-park-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/2/11/mlicv0tp/120.jpg' },
  { id: 18, name: 'Theresa Parra', role: 'Executive Director, People & Development', company: 'Netafim - North America', track: 'Talent Acquisition', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/theresa-parra-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/17/mo34z64p/120.jpg' },
  { id: 19, name: 'Ramprasad Reddy', role: 'Senior Manager, HRIS', company: 'NSF International', track: 'HR Tech & Analytics', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/ramprasad-reddy-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/5/4/morcuqco/120.jpg' },
  { id: 20, name: 'Dr. Jonathan H. Westover', role: 'Associate Dean and Director of HR Academic Programs', company: 'Western Governors University', track: 'Leadership & Culture', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/jonathan-westover-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/11/18/kw554jn6/120.jpg' },
  { id: 21, name: 'Adilen Valentina', role: 'Human Resource Director', company: 'NWCTHRA', track: 'HR Strategy & AI', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/adilen-valentina-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/28/moixc989/120.jpg' },
  { id: 22, name: 'Mark Vickers', role: 'Chief Research Analyst & Data Wrangler', company: 'HR.com', track: 'HR Tech & Analytics', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/mark-vickers-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg' },
  { id: 23, name: 'Mike Wood', role: 'Executive Community Leader, Talent Acquisition', company: 'HR.com', track: 'Talent Acquisition', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/mike-wood-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg' },
];

const TRACKS = ['All', 'HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness'];

const TRACK_COLORS: Record<string, string> = {
  'HR Strategy & AI': '#91278c',
  'Legal & Compliance': '#232283',
  'HR Tech & Analytics': '#0092cb',
  'Talent Acquisition': '#e51069',
  'Leadership & Culture': '#ef5924',
  'Health & Wellness': '#00924b',
};

export const SpeakersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All');

  const filteredSpeakers = SPEAKERS_DATA.filter(s => {
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.company.toLowerCase().includes(q) || s.role.toLowerCase().includes(q);
    return matchesTrack && matchesSearch;
  });

  const keynotes = filteredSpeakers.filter(s => s.isKeynote);
  const rest = filteredSpeakers.filter(s => !s.isKeynote);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ── COMPACT SPLIT HERO ── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.3fr 0.7fr',
        height: '280px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-brand)',
      }}>
        {/* Left: Brand gradient content */}
        <div style={{
          padding: '1.75rem 2.5rem 1.75rem 5vw',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Noise texture */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                background: 'rgba(255,255,255,0.2)', padding: '0.22rem 0.7rem',
                borderRadius: 'var(--radius-full)', color: '#fff',
              }}>
                <Users size={12} /> HRWest 2027 Faculty
              </span>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                23+ Speakers · 6 Tracks · 20+ Credits
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              letterSpacing: '-0.03em', color: '#fff',
              marginBottom: '0.5rem', lineHeight: 1.1,
            }}>
              Meet the 2027 Speakers
            </h1>

            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, marginBottom: '1.25rem', maxWidth: '460px' }}>
              Executive HR leaders, legal authorities, and tech founders — sharing actionable insights you can implement Monday morning.
            </p>

            {/* Speak at HRWest CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link
                to="/attend/volunteer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 1.1rem',
                  background: '#fff',
                  color: 'var(--color-brand-purple)', borderRadius: 'var(--radius-full)',
                  fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                }}
              >
                <Mic2 size={14} /> Apply to Speak
              </Link>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                Deadline: <strong style={{ color: '#fff' }}>Oct 30, 2026</strong>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right: Hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', overflow: 'hidden', height: '100%' }}
        >
          <img
            src={speakersHero}
            alt="HRWest 2027 Speakers on Stage"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
          {/* Gradient overlay blending into the left panel */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--color-brand-purple) 0%, transparent 40%)' }} />
        </motion.div>
      </section>

      {/* ── STREAMLINED 1-ROW SEARCH & FILTER BAR ── */}
      <div style={{
        background: 'var(--color-canvas)',
        borderBottom: '1px solid var(--color-subtle)',
        position: 'sticky', top: '64px', zIndex: 10,
        padding: '0.65rem 0',
      }}>
        <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>

          {/* Left Column: Compact Search Input */}
          <div style={{ position: 'relative', width: '260px', flexShrink: 0 }}>
            <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
            <input
              id="speaker-search"
              type="text"
              placeholder="Search speakers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0.4rem 0.75rem 0.4rem 2.2rem',
                fontFamily: 'var(--font-body)', fontSize: '0.82rem',
                background: 'var(--color-elevated)', border: '1.5px solid var(--color-subtle)',
                borderRadius: 'var(--radius-full)', color: 'var(--color-text-primary)',
                outline: 'none', transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(145,39,140,0.5)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'var(--color-subtle)'; }}
            />
          </div>

          {/* Right Column: Track Filter Pills + Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {TRACKS.map(track => (
              <button
                key={track}
                id={`track-filter-${track.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
                onClick={() => setSelectedTrack(track)}
                style={{
                  padding: '0.25rem 0.7rem',
                  borderRadius: 'var(--radius-full)',
                  border: selectedTrack === track
                    ? `1.5px solid ${track === 'All' ? 'var(--color-brand-purple)' : TRACK_COLORS[track] || 'var(--color-brand-purple)'}`
                    : '1px solid var(--color-subtle)',
                  background: selectedTrack === track
                    ? (track === 'All' ? 'var(--gradient-brand)' : TRACK_COLORS[track] || 'var(--gradient-brand)')
                    : 'transparent',
                  color: selectedTrack === track ? '#fff' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.72rem',
                  cursor: 'pointer', transition: 'all 0.18s ease', whiteSpace: 'nowrap',
                }}
              >
                {track}
              </button>
            ))}

            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginLeft: '0.5rem', whiteSpace: 'nowrap' }}>
              ({filteredSpeakers.length})
            </span>
          </div>

        </div>
      </div>

      {/* ── SPEAKERS GRID ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '3rem 0 5rem' }}>
        <div className="container-wide">

          {/* Keynote / Featured row */}
          <AnimatePresence>
            {keynotes.length > 0 && (
              <motion.div
                key="keynotes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginBottom: '3rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ height: '3px', width: '40px', background: 'var(--gradient-brand)', borderRadius: '2px' }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Star size={13} fill="var(--color-brand-purple)" /> Keynote & Featured Speakers
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {keynotes.map((spk, idx) => (
                    <SpeakerCard key={spk.id} spk={spk} idx={idx} featured />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* All other speakers */}
          <AnimatePresence>
            {rest.length > 0 && (
              <motion.div key="rest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {keynotes.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ height: '3px', width: '40px', background: 'var(--color-subtle)', borderRadius: '2px' }} />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-secondary)' }}>
                      Session Faculty & Experts
                    </span>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {rest.map((spk, idx) => (
                    <SpeakerCard key={spk.id} spk={spk} idx={idx} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {filteredSpeakers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}
            >
              <Sparkles size={40} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>No speakers match your search.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTrack('All'); }}
                style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'var(--color-brand-purple)', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ── Speaker Card Component ── */
interface SpeakerCardProps {
  spk: Speaker;
  idx: number;
  featured?: boolean;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ spk, idx, featured }) => {
  const [imgError, setImgError] = React.useState(false);
  const trackColor = TRACK_COLORS[spk.track] || 'var(--color-brand-purple)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
      whileHover={{ y: -5, boxShadow: featured ? '0 20px 45px rgba(145,39,140,0.18)' : '0 12px 30px rgba(0,0,0,0.1)' }}
      style={{
        background: 'var(--color-elevated)',
        border: featured ? '2px solid rgba(145,39,140,0.25)' : '1.5px solid var(--color-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Track accent line */}
      <div style={{ height: '4px', background: trackColor, width: '100%' }} />

      {/* Photo area */}
      <div style={{
        position: 'relative',
        paddingTop: featured ? '75%' : '100%',
        background: `linear-gradient(135deg, ${trackColor}15, ${trackColor}30)`,
        overflow: 'hidden',
      }}>
        {!imgError ? (
          <img
            src={spk.photo}
            alt={spk.name}
            onError={() => setImgError(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `linear-gradient(135deg, ${trackColor}20, ${trackColor}40)`,
            fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: featured ? '3rem' : '2.5rem',
            color: trackColor,
          }}>
            {spk.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>
        )}

        {/* Keynote badge */}
        {spk.isKeynote && (
          <div style={{
            position: 'absolute', top: '0.65rem', left: '0.65rem',
            background: 'var(--gradient-brand)', color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.62rem',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)',
            boxShadow: '0 3px 10px rgba(145,39,140,0.4)',
          }}>
            Keynote
          </div>
        )}

        {/* Company logo badge */}
        {spk.companyLogo && (
          <div style={{
            position: 'absolute', bottom: '0.65rem', right: '0.65rem',
            width: '36px', height: '36px', borderRadius: '8px',
            background: '#fff', padding: '4px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={spk.companyLogo} alt={spk.company} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: featured ? '1.25rem 1.25rem 1.25rem' : '1rem' }}>
        {/* Track pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          background: `${trackColor}15`,
          border: `1px solid ${trackColor}30`,
          borderRadius: 'var(--radius-full)',
          padding: '0.18rem 0.6rem',
          fontSize: '0.65rem', fontFamily: 'var(--font-display)', fontWeight: 700,
          color: trackColor, textTransform: 'uppercase', letterSpacing: '0.06em',
          marginBottom: '0.6rem',
        }}>
          {spk.track}
        </div>

        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: featured ? '1.05rem' : '0.92rem',
          color: 'var(--color-text-primary)', lineHeight: 1.25, marginBottom: '0.3rem',
        }}>
          {spk.name}
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 600, lineHeight: 1.35, marginBottom: '0.2rem' }}>
          {spk.role}
        </div>

        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          {spk.company}
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakersPage;
