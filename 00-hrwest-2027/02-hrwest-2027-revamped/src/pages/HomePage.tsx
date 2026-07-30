import React, { useState, useEffect, useRef } from 'react'; // useRef kept for StatCounter
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  MapPin, Award, Users, BookOpen, Layers, ArrowRight, Star, Cpu, Heart,
  CheckCircle, Sparkles, Building2, ChevronRight, Calculator, FileText,
  Calendar, TrendingUp, Mic2, Clock, BadgeCheck
} from 'lucide-react';

import heroConference from '../assets/generated/hero_conference.png';
import hrWestLogo from '../assets/hr-west-logo.png';
import trackAI from '../assets/generated/track_ai.png';
import trackLegal from '../assets/generated/track_legal.png';
import trackTalent from '../assets/generated/track_talent.png';
import trackWellness from '../assets/generated/track_wellness.png';
import trackLeadership from '../assets/generated/track_leadership.png';
import trackHRTech from '../assets/generated/track_hrtech.png';

/* ─── Data ─── */
const SPONSORS = [
  { name: 'SAP SuccessFactors', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/sap-sf-1382x167.png', wide: true },
  { name: 'UKG', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/ukg-logo.jpg', wide: false },
  { name: 'Robert Half', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/robert-half-logo.jpg', wide: false },
  { name: 'Insperity', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/insperity-logo.jpg', wide: false },
  { name: 'Alliant Insurance', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/alliant-logo.jpg', wide: false },
  { name: 'AwardCo', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/awardco-logo.jpg', wide: false },
  { name: 'Zapier', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/zapier-logo.jpg', wide: false },
  { name: 'LHH', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/lhh-logo.jpg', wide: false },
  { name: 'HUB International', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/hub-logo.jpg', wide: false },
  { name: 'PerformYard', logo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/performyard-logo.jpg', wide: false },
];

const REAL_SPEAKERS = [
  { name: 'Nancy Hauge', title: 'Chief People Experience Officer', company: 'Automation Anywhere', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/nancy-hauge-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/17/mo359gqh/120.jpg', track: 'HR Strategy & AI', isKeynote: true, day: 'Day 1 Keynote' },
  { name: 'Treena Diebolt', title: 'Vice President, People', company: 'Otter.ai', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/treena-diebolt-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/16/mo1hwqvi/120.jpg', track: 'HR Tech & Analytics', isKeynote: true, day: 'Day 2 Keynote' },
  { name: 'Edie Goldberg', title: 'Founder & President', company: 'E. L. Goldberg & Associates', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/edie-goldberg-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2013/2/1/hco5svrr/120.jpg', track: 'Talent Acquisition', isKeynote: false, day: 'Featured Session' },
  { name: 'Lee Cage Jr.', title: 'Director, Enterprise Transformation', company: 'BDO USA', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/lee-cage-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2013/8/19/hkk3u63c/120.jpg', track: 'Leadership & Culture', isKeynote: false, day: 'Featured Session' },
  { name: "Rosalind 'Roz' Cohen", title: 'CEO & Founder', company: 'Socius Strategies', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/roz-cohen-350x350.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/5/4/morqbiut/120.jpg', track: 'Legal & Compliance', isKeynote: false, day: 'Featured Session' },
  { name: 'Debbie McGrath', title: 'CEO, Founder & Chief Instigator', company: 'HR.com', photo: 'https://public-cdn.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/images/speaker-headshots/debbie-mcgrath2.jpg', companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg', track: 'HR Strategy & AI', isKeynote: true, day: 'Opening Remarks' },
];

const TRACKS = [
  { id: 'ai', icon: Cpu, label: 'HR Strategy & AI', tag: 'Future of Work', image: trackAI, desc: 'Generative AI adoption, strategic workforce planning, prompt engineering for HR, and CHRO-level change management.', highlight: 'How Silicon Valley CHROs embed AI into daily talent workflows without losing the human touch.', credits: '5 Recert Credits' },
  { id: 'legal', icon: BookOpen, label: 'Legal & Compliance', tag: 'California Law', image: trackLegal, desc: 'California & federal employment law updates, wage & hour compliance, AI bias regulations, and workplace investigations.', highlight: 'Stay ahead of 2027 CA labor mandates with nationally recognized employment law authorities.', credits: '4 Legal Credits' },
  { id: 'tech', icon: Layers, label: 'HR Tech & Analytics', tag: 'Tech Stack', image: trackHRTech, desc: 'HRIS stack optimization, people analytics dashboarding, automated onboarding, and employee data privacy.', highlight: 'Hands-on benchmarks for evaluating the modern HR tech vendor landscape — no fluff, just ROI.', credits: '4 Tech Credits' },
  { id: 'talent', icon: Users, label: 'Talent Acquisition', tag: 'Recruiting', image: trackTalent, desc: 'Employer branding, skills-based hiring frameworks, AI sourcing tools, and executive retention strategies.', highlight: 'Solve tech talent shortages using skills-first hiring systems, practiced by leaders from major tech firms.', credits: '3.5 Credits' },
  { id: 'leadership', icon: Star, label: 'Leadership & Culture', tag: 'Executive', image: trackLeadership, desc: 'Executive coaching, hybrid team engagement, psychological safety, and continuous performance management.', highlight: 'Build high-trust team cultures across remote and hybrid enterprise structures — proven frameworks.', credits: '4 Credits' },
  { id: 'wellness', icon: Heart, label: 'Health & Wellness', tag: 'Benefits', image: trackWellness, desc: 'Mental health benefit design, burnout prevention, self-funded healthcare, and financial wellness programs.', highlight: 'Benefit strategies that simultaneously boost retention by 40% and cut healthcare spend per head.', credits: '3.5 Credits' },
];

const STATS = [
  { number: 1000, suffix: '+', label: 'HR Leaders & Executives', sub: 'West Coast-focused decision makers', icon: Users },
  { number: 50, suffix: '+', label: 'Expert-Led Sessions', sub: 'Actionable keynotes & workshops', icon: Mic2 },
  { number: 20, suffix: '+', label: 'SHRM & HRCI Credits', sub: 'Accelerate your recertification', icon: Award },
  { number: 60, suffix: '+', label: 'Solution Providers', sub: 'Cutting-edge HR tech demos', icon: Building2 },
];

/* ─── Animated Stat Counter ─── */
const CountUpNumber: React.FC<{ end: number; duration?: number; suffix?: string; delay?: number }> = ({
  end, duration = 2, suffix = '', delay = 0
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animId: number;
    const timer = setTimeout(() => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easedProgress * end));
        if (progress < 1) {
          animId = window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      animId = window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animId) window.cancelAnimationFrame(animId);
    };
  }, [end, duration, delay]);

  return <>{count.toLocaleString()}{suffix}</>;
};

const StatCounter: React.FC<{ number: number; suffix: string; label: string; sub: string; icon: React.ElementType; delay: number }> = ({
  number, suffix, label, sub, icon: Icon, delay
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{
        background: 'var(--color-elevated)',
        border: '1px solid var(--color-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '2.25rem 1.75rem',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition-slow)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{
        y: -6,
        boxShadow: '0 20px 50px rgba(145,39,140,0.14)',
        borderColor: 'rgba(145,39,140,0.3)',
      }}
    >
      {/* Soft gradient orb behind number */}
      <div style={{
        position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
        width: '120px', height: '120px',
        background: 'radial-gradient(circle, rgba(145,39,140,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '44px', height: '44px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--gradient-brand)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1rem auto',
        boxShadow: '0 4px 14px rgba(145,39,140,0.3)',
      }}>
        <Icon size={22} color="#ffffff" />
      </div>

      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)',
        fontWeight: 900,
        lineHeight: 1,
        background: 'var(--gradient-brand)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.5rem',
      }}>
        {isInView ? <CountUpNumber end={number} duration={2.2} delay={delay} suffix={suffix} /> : `0${suffix}`}
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.3rem' }}>{label}</div>
      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{sub}</div>
    </motion.div>
  );
};

/* ─── Speaker Card ─── */
const SpeakerCard: React.FC<{ spk: typeof REAL_SPEAKERS[0]; idx: number }> = ({ spk, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
    whileHover={{ y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
    style={{
      background: 'var(--color-elevated)',
      border: '1px solid var(--color-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    {/* Full-width photo header */}
    <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: 'var(--gradient-brand-soft)' }}>
      <img
        src={spk.photo}
        alt={spk.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
      />
      {/* Gradient fade to white at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '80px',
        background: 'linear-gradient(to bottom, transparent, var(--color-elevated))',
      }} />
      {/* Top badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '0.4rem' }}>
        {spk.isKeynote && (
          <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', backdropFilter: 'blur(8px)' }}>
            <BadgeCheck size={11} /> Keynote
          </span>
        )}
        <span className="badge badge-brand" style={{ fontSize: '0.65rem', padding: '0.2rem 0.6rem', backdropFilter: 'blur(8px)' }}>
          {spk.day}
        </span>
      </div>
      {/* Company logo in a pill at bottom right */}
      <div style={{
        position: 'absolute', bottom: '10px', right: '12px',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderRadius: 'var(--radius-md)',
        padding: '0.3rem 0.65rem',
        border: '1px solid var(--color-subtle)',
      }}>
        <img src={spk.companyLogo} alt={spk.company} style={{ maxHeight: '24px', maxWidth: '72px', objectFit: 'contain' }} />
      </div>
    </div>

    {/* Card body */}
    <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <span className="badge badge-brand" style={{ marginBottom: '0.65rem', fontSize: '0.7rem' }}>{spk.track}</span>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', lineHeight: 1.2, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
        {spk.name}
      </h3>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--color-brand-purple)', marginBottom: '1rem' }}>
        {spk.title} · {spk.company}
      </div>
      <div style={{ flex: 1 }} />
      <Link to="/agenda" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
        color: 'var(--color-brand-purple)', textDecoration: 'none',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--color-subtle)',
      }}>
        View Session <ChevronRight size={15} />
      </Link>
    </div>
  </motion.div>
);

/* ─── Main Component ─── */
export const HomePage: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState('ai');
  const { scrollY } = useScroll();
  // Parallax: as page scrolls 0→700px, image drifts down 0%→15% within its clipped container
  const heroImgY = useTransform(scrollY, [0, 700], ['0%', '15%']);

  // Days to event countdown
  const [daysToEvent, setDaysToEvent] = useState(0);
  useEffect(() => {
    const event = new Date('2027-03-23');
    const now = new Date();
    const diff = Math.ceil((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setDaysToEvent(diff);
  }, []);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════
          1. HERO — Parallax Split Layout
         ══════════════════════════════════════════ */}
      <section className="hero-split-grid" style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--color-canvas)',
      }}>
        {/* LEFT: Content column */}
        <div className="hero-content-col" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '5rem 3rem 5rem 5vw',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Countdown chip */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'linear-gradient(135deg, rgba(145,39,140,0.1), rgba(239,20,110,0.1))',
              border: '1px solid rgba(145,39,140,0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1rem 0.45rem 0.65rem',
              marginBottom: '1.75rem',
              width: 'fit-content',
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--gradient-brand)', color: '#fff',
              borderRadius: 'var(--radius-full)', width: '28px', height: '28px',
              fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.75rem',
            }}>
              {daysToEvent > 0 ? `${daysToEvent}` : '–'}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-brand-purple)' }}>
              days until HRWest 2027 · March 23–24
            </span>
            <Clock size={14} style={{ color: 'var(--color-brand-pink)' }} />
          </motion.div>

          {/* Hero headline lockup — logo inline beside title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.1 }}
            className="hero-headline-lockup"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '1.75rem',
            }}
          >
            {/* HR West PNG logo — white card, flush beside title */}
            <div style={{
              background: '#ffffff',
              padding: '8px 12px',
              borderRadius: '12px',
              boxShadow: '0 8px 28px rgba(0, 0, 0, 0.09), 0 2px 6px rgba(145, 39, 140, 0.1)',
              border: '1.5px solid rgba(145, 39, 140, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <img
                src={hrWestLogo}
                alt="HR West Logo"
                className="hero-headline-logo"
                style={{
                  height: '88px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Title text stack */}
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}>
                HRWest 2027:
                <br />
                <span style={{
                  background: 'var(--gradient-brand-glow)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Imagine What's Possible
                </span>
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.25 }}
            style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '560px' }}
          >
            The West Coast's most impactful HR transformation summit. Connect with <strong>1,000+ HR decision-makers</strong>, earn <strong style={{ color: 'var(--color-brand-purple)' }}>20+ SHRM & HRCI credits</strong>, and walk away with strategies you can implement Monday morning.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.38 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <Link to="/register" className="btn btn-primary btn-lg">
              Pre-Register for 2027 <ArrowRight size={20} />
            </Link>
            <Link to="/sponsor" className="btn btn-outline btn-lg">
              Sponsor & Exhibit
            </Link>
          </motion.div>

          {/* Quick info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{ display: 'flex', gap: '2rem', paddingTop: '1.75rem', borderTop: '1px solid var(--color-subtle)', flexWrap: 'wrap' }}
          >
            {[
              { icon: Calendar, label: 'March 23–24, 2027' },
              { icon: MapPin, label: 'South San Francisco, CA' },
              { icon: Award, label: '20+ Recert Credits' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Icon size={17} style={{ color: 'var(--color-brand-purple)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: Parallax conference image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Diagonal clip mask */}
          <div style={{
            position: 'absolute', inset: 0,
            clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
            overflow: 'hidden',
            zIndex: 1,
          }}>
            <motion.img
              src={heroConference}
              alt="HRWest 2027 Conference"
              style={{ width: '100%', height: '110%', objectFit: 'cover', objectPosition: 'center 30%', y: heroImgY }}
            />
            {/* Inner gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to left, transparent 60%, var(--color-canvas) 100%)',
            }} />
          </div>

          {/* Floating stats in the image zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              position: 'absolute', bottom: '2.5rem', right: '2rem',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              border: '1px solid rgba(145,39,140,0.2)',
              boxShadow: 'var(--shadow-xl)',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '0.35rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#ef146e" color="#ef146e" />
                ))}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--color-text-primary)', lineHeight: 1 }}>1,000+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>HR Professionals</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-soft)' }}>attending HRWest 2027</div>
            </div>
            <div style={{ width: '1px', height: '56px', background: 'var(--color-subtle)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--color-text-primary)', lineHeight: 1, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>50+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Expert Sessions</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-soft)' }}>across 6 tracks</div>
            </div>
          </motion.div>

          {/* Floating "Open" chip top-left area */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              position: 'absolute', top: '2.5rem', left: '15%',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)',
              borderRadius: 'var(--radius-full)',
              padding: '0.55rem 1.1rem',
              border: '1px solid rgba(145,39,140,0.2)',
              boxShadow: 'var(--shadow-md)',
              zIndex: 2,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            <span style={{
              width: '9px', height: '9px', borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(34,197,94,0.25)',
              animation: 'pulse-dot 2s ease infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
              Pre-Registration Open
            </span>
          </motion.div>
        </div>

        {/* Left ambient glow */}
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: '40vw', height: '50vh',
          background: 'radial-gradient(circle, rgba(145,39,140,0.09) 0%, transparent 70%)',
          filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
        }} />
      </section>

      {/* ══════════════════════════════════════════
          2. SOCIAL PROOF — Sponsor Marquee
         ══════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-surface)',
        padding: '2.5rem 0',
        borderTop: '1px solid var(--color-subtle)',
        borderBottom: '1px solid var(--color-subtle)',
        overflow: 'hidden',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem', padding: '0 2rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem',
            textTransform: 'uppercase', letterSpacing: '0.14em',
            color: 'var(--color-text-muted)',
          }}>
            Join Industry Leaders Who've Partnered With HRWest
          </span>
        </div>
        <div className="marquee-container">
          <div className="marquee-content">
            {SPONSORS.concat(SPONSORS).map((s, i) => (
              <div key={i} className="sponsor-logo-pill">
                <img src={s.logo} alt={s.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. ANIMATED STAT COUNTERS
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <motion.div
            className="section-header-centered"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ marginBottom: '3.5rem' }}
          >
            <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>By the Numbers</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em' }}>
              Why 1,000 HR Leaders Choose HRWest
            </h2>
          </motion.div>
          <div className="grid-4">
            {STATS.map((s, i) => (
              <StatCounter key={s.label} {...s} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. SPEAKERS — Full-Bleed Photo Cards
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}
          >
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Learn From the Best</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.03em' }}>
                2026 Speaker Faculty
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '500px' }}>
                Executive HR leaders, legal authorities, and tech founders — all in one room.
              </p>
            </div>
            <Link to="/speakers" className="btn btn-outline">
              All Speakers <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {REAL_SPEAKERS.map((spk, idx) => (
              <SpeakerCard key={spk.name} spk={spk} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. INTERACTIVE TRACK EXPLORER
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '5rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background mesh */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(145,39,140,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(239,20,110,0.05) 0%, transparent 50%)',
        }} />

        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="section-header-centered" style={{ marginBottom: '3rem' }}
          >
            <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>Curate Your Experience</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.03em' }}>
              6 Deep-Dive Conference Tracks
            </h2>
          </motion.div>

          {/* Tab pills */}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.75rem' }}>
            {TRACKS.map(t => {
              const Icon = t.icon;
              const active = activeTrack === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTrack(t.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    padding: '0.6rem 1.35rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    background: active ? 'var(--gradient-brand)' : 'var(--color-elevated)',
                    color: active ? '#fff' : 'var(--color-text-secondary)',
                    boxShadow: active ? '0 6px 20px rgba(145,39,140,0.35)' : 'var(--shadow-sm)',
                    transform: active ? 'translateY(-2px)' : 'none',
                  }}
                >
                  <Icon size={15} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Active track panel */}
          <AnimatePresence mode="wait">
            {TRACKS.filter(t => t.id === activeTrack).map(track => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3rem', alignItems: 'center',
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1.5px solid rgba(145,39,140,0.2)',
                    padding: '3rem',
                    boxShadow: 'var(--shadow-xl)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem' }}>
                      <span className="badge badge-brand">{track.tag}</span>
                      <span className="badge badge-purple">{track.credits}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
                        background: 'var(--gradient-brand)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 6px 20px rgba(145,39,140,0.3)',
                        flexShrink: 0,
                      }}>
                        <Icon size={28} color="#fff" />
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
                        {track.label}
                      </h3>
                    </div>
                    <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                      {track.desc}
                    </p>
                    <div style={{
                      padding: '1.25rem 1.5rem',
                      background: 'var(--gradient-brand-soft)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: '4px solid var(--color-brand-purple)',
                      marginBottom: '2rem',
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.78rem', color: 'var(--color-brand-purple)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                        Key Takeaway
                      </div>
                      <div style={{ fontSize: '0.975rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.55 }}>
                        {track.highlight}
                      </div>
                    </div>
                    <Link to="/agenda" className="btn btn-primary">
                      View Track Agenda <ArrowRight size={18} />
                    </Link>
                  </div>

                  {/* Track image with gradient overlay */}
                  <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '340px', position: 'relative', boxShadow: 'var(--shadow-lg)' }}>
                    <img src={track.image} alt={track.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(145,39,140,0.15), transparent)' }} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. BOSS CONVINCER WIDGET TEASER — Split Glass
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
              background: 'var(--color-elevated)',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 3.5rem',
              border: '1.5px solid rgba(145,39,140,0.18)',
              boxShadow: 'var(--shadow-xl)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Glow orb */}
            <div style={{
              position: 'absolute', top: '-30%', right: '-10%',
              width: '50%', height: '100%',
              background: 'radial-gradient(circle, rgba(239,20,110,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
                <Calculator size={13} /> Instant Approval Toolkit
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.03em', marginBottom: '1.1rem' }}>
                Need Your Boss's Sign-Off on HRWest?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                We've removed every excuse. Generate a polished, pre-filled business case email — quantified ROI, recert credit value, and all — in under 60 seconds.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {[
                  'Calculates full ROI: credits, networking value & sessions attended',
                  'Pre-written email template, customizable to your specific goals',
                  'Team savings calculator — up to 35% off for groups of 3+',
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <CheckCircle size={17} style={{ color: 'var(--color-brand-purple)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/attend/convince-boss" className="btn btn-primary btn-lg">
                  Generate Approval Email <FileText size={18} />
                </Link>
                <Link to="/attend/team" className="btn btn-outline btn-lg">
                  Team Savings Calculator
                </Link>
              </div>
            </div>

            {/* Email preview mock */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-subtle)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
              }}>
                {/* Fake browser chrome */}
                <div style={{ background: 'var(--color-surface)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {['#ef4444', '#f59e0b', '#22c55e'].map(c => <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                  <span style={{ flex: 1, background: '#fff', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', border: '1px solid var(--color-subtle)' }}>
                    New Email Draft
                  </span>
                </div>
                <div style={{ padding: '1.5rem', fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong>To:</strong> manager@company.com<br />
                    <strong>Subject:</strong> Attending HRWest 2027 — ROI Business Case<br />
                    <hr style={{ margin: '0.75rem 0', borderColor: 'var(--color-subtle)' }} />
                  </div>
                  <p style={{ marginBottom: '0.65rem' }}>Hi [Manager Name],</p>
                  <p style={{ marginBottom: '0.65rem' }}>I'd like to attend <strong>HRWest 2027</strong> in South San Francisco (March 23–24). Here's my business case:</p>
                  <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <li>50+ actionable HR strategy sessions</li>
                    <li>20+ SHRM/HRCI credits (saves ~$400 in external training)</li>
                    <li>Direct access to top Silicon Valley HR tech vendors</li>
                  </ul>
                  <p style={{ color: 'var(--color-brand-purple)', fontWeight: 700 }}>Net ROI estimate: 3.4× total cost ✓</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. VENUE — Full-Bleed Brand Gradient
         ══════════════════════════════════════════ */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Noise texture layer */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          pointerEvents: 'none',
        }} />

        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4.5rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                background: 'rgba(255,255,255,0.2)',
                padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)',
                color: '#ffffff', marginBottom: '1.25rem', width: 'fit-content',
              }}>
                <MapPin size={13} /> Silicon Valley Venue
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '1.1rem' }}>
                South San Francisco Conference Center
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.7, marginBottom: '2.25rem' }}>
                A conference venue built for world-class events — 5 minutes from SFO, 30 minutes from downtown San Francisco, with immersive keynote halls and an expansive sponsor exhibit floor.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {[
                  { v: '5 min', l: 'From SFO Airport' },
                  { v: 'Free', l: 'On-Site Parking' },
                  { v: 'BART', l: 'Direct Rail Access' },
                ].map(({ v, l }) => (
                  <div key={v} style={{ padding: '0.85rem 1.35rem', background: 'rgba(255,255,255,0.18)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.15rem', color: '#fff' }}>{v}</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)' }}>{l}</div>
                  </div>
                ))}
              </div>
              <Link to="/attend/location" className="btn" style={{ background: '#fff', color: 'var(--color-brand-purple)', fontWeight: 800, boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
                Hotel Deals & Travel Guide <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}>
              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 25px 70px rgba(0,0,0,0.35)', height: '400px', border: '2px solid rgba(255,255,255,0.25)' }}>
                <img
                  src="https://public-cdn.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/images/hrwest-sponsors-page-banner-image.webp"
                  alt="South San Francisco Conference Center"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FINAL CTA BLOCK
         ══════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-canvas)', padding: '5rem 0' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{
              background: 'var(--gradient-brand-soft)',
              borderRadius: 'var(--radius-xl)',
              padding: '5rem 2rem',
              textAlign: 'center',
              border: '1.5px solid rgba(145,39,140,0.2)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow blobs */}
            <div style={{ position: 'absolute', top: '-30%', left: '10%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(145,39,140,0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-30%', right: '5%', width: '35%', height: '80%', background: 'radial-gradient(circle, rgba(239,20,110,0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="eyebrow" style={{ marginBottom: '1.1rem' }}>
                <TrendingUp size={13} /> Lock In Your 2027 Spot
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', marginBottom: '1.1rem' }}>
                Your Most Impactful HR Year Starts Here
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 2.75rem auto', lineHeight: 1.7 }}>
                Join thousands of HR professionals on the leading edge of AI, culture, and workforce innovation. Pre-register today — early access rates won't last.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/register" className="btn btn-primary btn-lg" style={{ boxShadow: 'var(--shadow-brand)' }}>
                  Pre-Register for HRWest 2027 <ArrowRight size={20} />
                </Link>
                <Link to="/attend/team" className="btn btn-outline btn-lg">
                  Bring Your Team <Sparkles size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
