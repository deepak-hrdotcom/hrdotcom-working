import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Video, Sparkles, Building2, UserCheck, Play } from 'lucide-react';

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
    author: 'HR Generalist & Operations Lead',
    role: 'HR Business Partner',
    company: 'Mid-Market Services',
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
  { id: 'v1', title: 'Attendee Experience & Key Takeaways', duration: '1:28', thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80' },
  { id: 'v2', title: 'Networking & Community Impact', duration: '1:45', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
  { id: 'v3', title: 'HR Leaders Share Their Favorite Sessions', duration: '2:10', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
  { id: 'v4', title: 'Sponsor & Solution Provider Perspectives', duration: '1:15', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80' },
];

export const TestimonialsPage: React.FC = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: 'var(--color-canvas)' }}>
      {/* ─── HERO HEADER ─── */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(145,39,140,0.06) 0%, rgba(239,20,110,0.04) 100%)',
        padding: '5rem 0 4rem 0',
        borderBottom: '1px solid var(--color-subtle)',
        position: 'relative',
      }}>
        <div className="container-wide" style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Sparkles size={14} /> Verified Attendee & Sponsor Raves
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            What HR Leaders & Partners Say About <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>HRWest</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.15rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Discover why 1,000+ HR decision-makers, executives, and industry vendors return to HRWest year after year to learn, network, and grow.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'inline-flex',
              gap: '2rem',
              background: 'var(--color-elevated)',
              border: '1.5px solid rgba(145,39,140,0.18)',
              borderRadius: 'var(--radius-lg)',
              padding: '1rem 2rem',
              boxShadow: 'var(--shadow-sm)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'Overall Satisfaction', val: '92%' },
              { label: 'Repeat Attendees', val: '8 in 10' },
              { label: 'Recertification Credits', val: '20+ SHRM/HRCI' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.35rem', color: 'var(--color-brand-purple)' }}>{stat.val}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {ATTENDEE_TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -5, boxShadow: '0 18px 36px rgba(145,39,140,0.12)' }}
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
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px', background: idx % 2 === 0 ? 'var(--gradient-brand)' : 'var(--color-brand-pink)' }} />

                <div>
                  {/* Star Rating */}
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                    {[...Array(item.stars || 5)].map((_, i) => (
                      <Star key={i} size={15} fill="#ef146e" color="#ef146e" />
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
                    border: '1.5px solid rgba(145,39,140,0.3)',
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {VIDEO_TESTIMONIALS.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                style={{
                  background: 'var(--color-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                  <img src={v.thumbnail} alt={v.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(11,15,23,0.3)',
                  }}>
                    <div style={{
                      width: '52px', height: '52px', borderRadius: '50%',
                      background: 'var(--gradient-brand)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 8px 25px rgba(145,39,140,0.5)',
                      paddingLeft: '3px',
                    }}>
                      <Play size={22} fill="#fff" />
                    </div>
                  </div>
                  <span style={{
                    position: 'absolute', bottom: '0.75rem', right: '0.75rem',
                    background: 'rgba(0,0,0,0.75)', color: '#fff',
                    padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)',
                    fontSize: '0.72rem', fontWeight: 700,
                  }}>
                    {v.duration}
                  </span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', margin: 0, lineHeight: 1.4, color: 'var(--color-text-primary)' }}>
                    {v.title}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
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
                <div style={{ borderTop: '1px solid rgba(145,39,140,0.15)', paddingTop: '1rem' }}>
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
