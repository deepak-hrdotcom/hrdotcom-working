import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import speakersHero from '../assets/speakers_hero.png';
import { Star, ArrowRight, Video, Building2, UserCheck, ChevronRight, Users } from 'lucide-react';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  category: 'attendee' | 'sponsor';
  bgAccent: string;
  stars?: number;
}

const ATTENDEE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'I picked up some great practical tips that I can take back to my office and use right away.',
    author: 'HR Leader',
    role: 'HR Manager',
    company: 'Enterprise Corporation',
    category: 'attendee',
    bgAccent: 'rgba(145, 39, 140, 0.08)',
    stars: 5,
  },
  {
    id: 't2',
    quote: 'Things are ever-evolving, so to be able to attend something like this with like-minded individuals is great.',
    author: 'People Operations Director',
    role: 'VP of People',
    company: 'Silicon Valley Tech',
    category: 'attendee',
    bgAccent: 'rgba(239, 20, 110, 0.06)',
    stars: 5,
  },
  {
    id: 't3',
    quote: "I think it was very insightful, very informative. It's good to know that the people who are speaking are experts in this field. There's a lot to gain from that.",
    author: 'Senior HR Strategist',
    role: 'Director of Talent',
    company: 'Global Healthcare',
    category: 'attendee',
    bgAccent: 'rgba(145, 39, 140, 0.08)',
    stars: 5,
  },
  {
    id: 't4',
    quote: "I absolutely loved the sponsors at HRWest this year. You talk about the gamut of software or products that really impact how to do our jobs easier. Sometimes in HR we're a small team and have to put together resources — the sponsors are full of fantastic ideas!",
    author: 'Director of People Experience',
    role: 'Director',
    company: 'Innovate Bay Area',
    category: 'attendee',
    bgAccent: 'rgba(239, 20, 110, 0.06)',
    stars: 5,
  },
  {
    id: 't5',
    quote: "I couldn't be happier to be part of this community and contribute to it, because it is so incredibly important, now more than ever.",
    author: 'Executive HR Consultant',
    role: 'Chief People Officer',
    company: 'Professional Services',
    category: 'attendee',
    bgAccent: 'rgba(145, 39, 140, 0.08)',
    stars: 5,
  },
  {
    id: 't6',
    quote: 'The roundtables provided good discussion and collaboration. Real conversations on real challenges.',
    author: 'Talent Acquisition Director',
    role: 'Head of Recruiting',
    company: 'High-Growth Startup',
    category: 'attendee',
    bgAccent: 'rgba(239, 20, 110, 0.06)',
    stars: 5,
  },
  {
    id: 't7',
    quote: 'Loved the face-to-face interaction with the HR crowd. The networking quality was unmatched.',
    author: 'Employee Relations Lead',
    role: 'Senior Manager',
    company: 'Financial Services',
    category: 'attendee',
    bgAccent: 'rgba(145, 39, 140, 0.08)',
    stars: 5,
  },
];

const SPONSOR_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ts1',
    quote: 'My team and I were really well taken care of by the HR.com staff... We had people coming up to our booth throughout the whole conference. It was an excellent experience for us, and we will be back.',
    author: 'Gregg Ward',
    role: 'Executive Director',
    company: 'The Center for Respectful Leadership',
    category: 'sponsor',
    bgAccent: 'rgba(145, 39, 140, 0.1)',
    stars: 5,
  },
  {
    id: 'ts2',
    quote: 'It was a really good experience — met some wonderful people and had amazing conversations with HR decision-makers.',
    author: 'Chezuba Team',
    role: 'Sponsor Partner',
    company: 'Chezuba',
    category: 'sponsor',
    bgAccent: 'rgba(239, 20, 110, 0.08)',
    stars: 5,
  },
  {
    id: 'ts3',
    quote: 'I had a great time at the event. I was able to connect and meet new people, share the value of our software, and join in a couple of sessions myself.',
    author: 'HR Tech Provider',
    role: 'Solution Partner',
    company: 'Enterprise HR Platform',
    category: 'sponsor',
    bgAccent: 'rgba(145, 39, 140, 0.1)',
    stars: 5,
  },
];

const VIDEO_TESTIMONIALS = [
  { id: 'v1', title: 'HRWest Conference Experience & Keynotes', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/1h.mp4' },
  { id: 'v2', title: 'Community & Peer Networking Impact', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/2.mp4' },
  { id: 'v3', title: 'HR Leaders Share Real Session Takeaways', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/3h.mp4' },
  { id: 'v4', title: 'Sponsor & Solution Provider Insights', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/4h.mp4' },
  { id: 'v5', title: 'Practical Strategies for HR Professionals', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/5.mp4' },
  { id: 'v6', title: 'Collaborative Roundtables & Peer Discussions', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/6h.mp4' },
  { id: 'v7', title: 'Why HR Decision-Makers Love HRWest', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/7.mp4' },
  { id: 'v8', title: 'Transforming HR Practice & Career Growth', videoUrl: 'https://www.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/videos/8.mp4' },
];

export const TestimonialsPage: React.FC = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: 'var(--color-canvas)' }}>

      {/* ══════════ CINEMATIC HERO ══════════ */}
      <section style={{
        position: 'relative',
        height: '480px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* 1. Full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${speakersHero})`,
          backgroundSize: 'cover',
          backgroundPosition: '55% center',
        }} />

        {/* 2. Multi-layer gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(90deg,
              rgba(11,8,20,0.96) 0%,
              rgba(60,15,80,0.88) 38%,
              rgba(100,10,80,0.55) 62%,
              rgba(0,0,0,0.15) 100%
            ),
            linear-gradient(180deg,
              rgba(11,8,20,0.6) 0%,
              transparent 30%,
              transparent 65%,
              rgba(11,8,20,0.75) 100%
            )
          `,
        }} />

        {/* 3. Ambient glow orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, var(--brand-glow-22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '30%',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(239,20,110,0.18) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
        </div>

        {/* Content Container */}
        <div className="container-wide hero-3col-grid" style={{
          position: 'relative', zIndex: 2,
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}>

          {/* LEFT: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: '520px',
              paddingRight: '2rem',
            }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
              letterSpacing: '-0.04em', lineHeight: 1.05,
              color: '#fff',
              marginBottom: '1.1rem',
              textAlign: 'left',
              textWrap: 'initial' as const,
            }}>
              Voices from<br />
              <span style={{
                background: 'var(--gradient-brand-glow)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>HRWest Alumni</span>
            </h1>

            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '400px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              Hear directly from HR professionals who've transformed their careers and teams after attending HRWest.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                background: 'var(--gradient-brand)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px var(--brand-pink-glow-45, var(--brand-glow-40))',
              }}>
                Pre-Register 2027 <ChevronRight size={15} />
              </Link>
              <Link to="/speakers" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.3rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none',
              }}>
                <Users size={14} /> Browse Speakers
              </Link>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating testimonial quote cards stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              position: 'relative', height: '360px', display: 'flex',
              flexDirection: 'column', justifyContent: 'center'
            }}
          >
            {[
              { item: ATTENDEE_TESTIMONIALS[0], tag: 'ATTENDEE', rotate: '-2deg', offset: '0px', top: '15px', delay: 0.2 },
              { item: SPONSOR_TESTIMONIALS[0], tag: 'SPONSOR', rotate: '1.5deg', offset: '16px', top: '165px', delay: 0.35 },
            ].map(({ item, tag, rotate, offset, top, delay }, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top,
                  left: offset,
                  width: '270px',
                  background: 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '16px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  zIndex: 2 - i,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={11} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-brand-pink)', background: 'var(--brand-glow-20)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    {tag}
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4, fontStyle: 'italic', marginBottom: '0.5rem' }}>
                  "{item.quote.length > 90 ? item.quote.slice(0, 90) + '...' : item.quote}"
                </p>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff' }}>
                  {item.author}
                </div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)' }}>
                  {item.role} {item.company ? `• ${item.company}` : ''}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '60px',
          background: 'linear-gradient(0deg, var(--color-canvas) 0%, transparent 100%)',
        }} />
      </section>

      {/* ─── SECTION 1: ATTENDEE REVIEWS ─── */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <UserCheck size={14} /> Attendee Voices
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', margin: 0 }}>
              Practical Insights, Real Professional Growth
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {ATTENDEE_TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5, boxShadow: '0 18px 36px var(--brand-glow-12)' }}
                style={{
                  background: 'var(--color-elevated)',
                  border: '1.5px solid rgba(145, 39, 140, 0.15)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Decorative left accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: idx % 2 === 0 ? 'var(--gradient-brand)' : 'var(--color-brand-authority)' }} />

                <div>
                  {/* Star Rating */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                    {[...Array(item.stars || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="var(--color-accent-amber)" color="var(--color-accent-amber)" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p style={{
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.65,
                    fontWeight: 500,
                    marginBottom: '1.5rem',
                    fontStyle: 'normal',
                  }}>
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--color-subtle)', paddingTop: '1rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'var(--gradient-brand-soft)',
                    border: '1.5px solid var(--brand-glow-30)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 900, color: 'var(--color-brand-purple)',
                    fontSize: '0.95rem',
                  }}>
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                      {item.author}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      {item.role} · {item.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: VIDEO TESTIMONIAL REEL ─── */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '4rem', paddingBottom: '4rem', borderTop: '1px solid var(--color-subtle)', borderBottom: '1px solid var(--color-subtle)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Video size={14} /> Video Raves
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', margin: 0 }}>
              Hear Directly From Past Attendees & Partners
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {VIDEO_TESTIMONIALS.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--color-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(145, 39, 140, 0.2)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', width: '100%', background: '#000', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', overflow: 'hidden' }}>
                  <video
                    controls
                    preload="metadata"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                  >
                    <source src={v.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div style={{ padding: '1.25rem', background: 'var(--color-elevated)', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.92rem', margin: 0, lineHeight: 1.4, color: 'var(--color-text-primary)' }}>
                    <span style={{ color: 'var(--color-brand-purple)', marginRight: '0.4rem' }}>#{i + 1}</span> {v.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SPONSOR TESTIMONIALS ─── */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container-wide">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Building2 size={14} /> Sponsor & Exhibitor Success
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', margin: 0 }}>
              Why Solution Partners Keep Coming Back
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {SPONSOR_TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  background: 'var(--gradient-brand-soft)',
                  border: '1.5px solid rgba(145, 39, 140, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span className="badge badge-purple" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                    Sponsor Partner
                  </span>
                  <p style={{ fontSize: '1rem', color: 'var(--color-text-primary)', lineHeight: 1.65, fontWeight: 500, marginBottom: '1.5rem' }}>
                    "{item.quote}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--brand-glow-15)', paddingTop: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-brand-purple)' }}>
                    — {item.author}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    {item.role}, {item.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA BANNER ─── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '4.5rem 0', color: '#fff', textAlign: 'center' }}>
        <div className="container-wide" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '1rem' }}>
            Ready to Join 1,000+ HR Leaders at HRWest 2027?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Lock in your Early Bird registration today and experience the West Coast's premier HR transformation event.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn" style={{ background: '#fff', color: 'var(--color-brand-purple)', fontWeight: 800, padding: '0.9rem 2.25rem', fontSize: '1rem' }}>
              Pre-Register for 2027 <ArrowRight size={18} />
            </Link>
            <Link to="/sponsor" className="btn" style={{ border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 800, padding: '0.9rem 2.25rem', fontSize: '1rem' }}>
              Become a Sponsor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
