import React, { useState, useEffect, useRef } from 'react'; // useRef kept for StatCounter
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  MapPin, Award, Users, BookOpen, Layers, ArrowRight, Star, Cpu, Heart,
  CheckCircle, Sparkles, Building2, ChevronRight, ChevronLeft, Calculator, FileText,
  Calendar, TrendingUp, Mic2, Clock, BadgeCheck
} from 'lucide-react';

import heroConference from '../assets/generated/hero_conference.png';
import hrWestLogo from '../assets/hr-west-logo.png';
import trackAI from '../assets/generated/track_ai_real.png';
import trackLegal from '../assets/generated/track_legal_real.png';
import trackTalent from '../assets/generated/track_talent_real.png';
import trackWellness from '../assets/generated/track_wellness_real.png';
import trackLeadership from '../assets/generated/track_leadership_real.png';
import trackHRTech from '../assets/generated/track_hrtech_real.png';
import ssfVenue from '../assets/generated/ssf_venue.png';
import ctaCheeringHR from '../assets/generated/cta_cheering_hr.png';

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

const HRWEST_PHOTOS = [
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/AllisonWest.webp', title: 'Allison West Keynote' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/AllisonWestAttendees.webp', title: 'Attendees Networking' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/CapturelyTable.webp', title: 'Exhibitor Expo' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/ClosingKeynote2.webp', title: 'Closing Keynote' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/EmceeAndSpeakerYaelSchy.webp', title: 'Yael Schy Emcee' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/JaneKow.webp', title: 'Jane Kow Legal Session' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/JasonAverbook.webp', title: 'Jason Averbook Opening' },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/Let_sBuildDay2.webp', title: "Let's Build Workshop" },
  { url: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/Let_s_Build!_Part_1.webp', title: "Let's Build Part 1" },
];

const REAL_SPEAKERS = [
  {
    name: 'Jason Averbook',
    title: 'Global HR Transformation Leader & Author',
    company: 'Now to Next',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/JasonAverbook.webp',
    companyLogo: '',
    track: 'HR Strategy & AI',
    isKeynote: true,
    isFeatured: true,
    day: 'Opening Keynote',
    badgeLabel: '⭐ Global Thought Leader',
  },
  {
    name: 'Allison West, Esq., SHRM-SCP',
    title: 'Principal & Employment Law Specialist',
    company: 'Employment Practices Specialists',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/AllisonWest.webp',
    companyLogo: '',
    track: 'Legal & Compliance',
    isKeynote: true,
    isFeatured: true,
    day: 'Day 2 Keynote',
    badgeLabel: '❤️ Attendee Favorite',
  },
  {
    name: 'Nancy Hauge',
    title: 'Chief People Experience Officer',
    company: 'Automation Anywhere',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/nancy-hauge-350x350.jpg',
    companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/17/mo359gqh/120.jpg',
    track: 'HR Strategy & AI',
    isKeynote: true,
    isFeatured: false,
    day: 'Featured Keynote',
  },
  {
    name: 'Treena Diebolt',
    title: 'Vice President, People',
    company: 'Otter.ai',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/treena-diebolt-350x350.jpg',
    companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/4/16/mo1hwqvi/120.jpg',
    track: 'HR Tech & Analytics',
    isKeynote: true,
    isFeatured: false,
    day: 'Featured Keynote',
  },
  {
    name: 'Debbie McGrath',
    title: 'CEO, Founder & Chief Instigator',
    company: 'HR.com',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/images/speaker-headshots/debbie-mcgrath2.jpg',
    companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2021/1/4/kjivq2pn/120.jpg',
    track: 'HR Strategy & AI',
    isKeynote: true,
    isFeatured: false,
    day: 'Opening Remarks',
  },
  {
    name: 'Lee Cage Jr.',
    title: 'Director, Enterprise Transformation',
    company: 'BDO USA',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/lee-cage-350x350.jpg',
    companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2013/8/19/hkk3u63c/120.jpg',
    track: 'Leadership & Culture',
    isKeynote: false,
    isFeatured: false,
    day: 'Featured Session',
  },
  {
    name: "Rosalind 'Roz' Cohen",
    title: 'CEO & Founder',
    company: 'Socius Strategies',
    photo: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/roz-cohen-350x350.jpg',
    companyLogo: 'https://public-cdn.hr.com/system/app/media/rs/2026/5/4/morqbiut/120.jpg',
    track: 'Legal & Compliance',
    isKeynote: false,
    isFeatured: false,
    day: 'Featured Session',
  },
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
      background: spk.isFeatured ? 'linear-gradient(180deg, rgba(145,39,140,0.05) 0%, var(--color-elevated) 100%)' : 'var(--color-elevated)',
      border: spk.isFeatured ? '2px solid rgba(145, 39, 140, 0.5)' : '1px solid var(--color-subtle)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: spk.isFeatured ? '0 16px 45px rgba(145, 39, 140, 0.2), 0 0 25px rgba(239, 20, 110, 0.15)' : 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    {/* 100% Unobstructed Photo Header — No labels overlapping the portrait */}
    <div style={{ position: 'relative', height: '260px', overflow: 'hidden', background: 'var(--color-surface)' }}>
      <img
        src={spk.photo}
        alt={spk.name}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
      />
      {/* Soft gradient fade to card body */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '30px',
        background: 'linear-gradient(to bottom, transparent, var(--color-elevated))',
      }} />

      {/* Company logo pill at bottom right (if available) */}
      {spk.companyLogo && (
        <div style={{
          position: 'absolute', bottom: '10px', right: '12px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius-md)',
          padding: '0.3rem 0.65rem',
          border: '1px solid var(--color-subtle)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2,
        }}>
          <img
            src={spk.companyLogo}
            alt={spk.company}
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

      {/* Featured Leader Banner */}
      {spk.isFeatured && (
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
          <Sparkles size={12} /> {spk.badgeLabel || 'Featured Leader'}
        </div>
      )}

      {/* Session Day & Track Badges */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
          <BadgeCheck size={11} /> {spk.day}
        </span>
        <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.2rem 0.6rem' }}>
          {spk.track}
        </span>
      </div>

      {/* Speaker Name */}
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: spk.isFeatured ? 900 : 800,
        fontSize: spk.isFeatured ? '1.3rem' : '1.15rem',
        lineHeight: 1.2,
        color: 'var(--color-text-primary)',
        marginBottom: '0.3rem',
        letterSpacing: '-0.02em',
      }}>
        {spk.name}
      </h3>

      {/* Title & Company */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: spk.isFeatured ? '0.9rem' : '0.82rem',
        color: 'var(--color-brand-purple)',
        marginBottom: '0.85rem',
      }}>
        {spk.title} · <strong>{spk.company}</strong>
      </div>

      {/* Featured Thought Leader Spotlight Callout */}
      {spk.isFeatured && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(145,39,140,0.06), rgba(239,20,110,0.06))',
          borderLeft: '3px solid var(--color-brand-purple)',
          padding: '0.65rem 0.85rem',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.82rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          marginBottom: '1rem',
          fontWeight: 600,
        }}>
          💡 Headline Keynote: Delivering high-impact strategic frameworks for 1,000+ HR decision-makers.
        </div>
      )}

      <div style={{ flex: 1 }} />

      <Link to="/agenda" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
        color: 'var(--color-brand-purple)', textDecoration: 'none',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--color-subtle)',
      }}>
        View Keynote Details <ChevronRight size={15} />
      </Link>
    </div>
  </motion.div>
);

/* ─── Main Component ─── */
export const HomePage: React.FC = () => {
  const trackSliderRef = useRef<HTMLDivElement>(null);

  const scrollTracks = (direction: 'left' | 'right') => {
    if (trackSliderRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      trackSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 700], ['0%', '15%']);

  // Live countdown to HRWest 2027 — updates every second
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const eventDate = new Date('2027-03-23T08:00:00');
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, eventDate.getTime() - now.getTime());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
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
          {/* Sleek, Non-Distracting Date & Countdown Badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
              background: 'linear-gradient(135deg, rgba(145,39,140,0.08), rgba(239,20,110,0.08))',
              border: '1.5px solid rgba(145,39,140,0.22)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1.1rem 0.45rem 0.65rem',
              marginBottom: '1.75rem',
              width: 'fit-content',
              boxShadow: '0 4px 15px rgba(145,39,140,0.06)',
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--gradient-brand)', color: '#fff',
              borderRadius: 'var(--radius-full)', padding: '0.22rem 0.75rem',
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem',
              boxShadow: '0 2px 8px rgba(145,39,140,0.3)',
            }}>
              March 23–24, 2027
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-brand-purple)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              South San Francisco, CA · <Clock size={13} style={{ color: 'var(--color-brand-pink)' }} /> {countdown.days} Days Away
            </span>
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

        {/* RIGHT: Parallax Auditorium Background + Centered Video Card Lockup */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 2rem',
          minHeight: '100%',
        }}>
          {/* Background Auditorium Image with Gradient Overlay */}
          <div className="hero-image-clip" style={{
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
            {/* Inner gradient overlay for background legibility */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to left, rgba(11,15,23,0.3) 0%, var(--color-canvas) 100%), linear-gradient(to top, rgba(11,15,23,0.7) 0%, transparent 60%)',
            }} />
          </div>

          {/* Centered Glassmorphic Video Card — Muted Autoplay, Loop, No Suggested Videos (rel=0) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            style={{
              position: 'relative',
              zIndex: 3,
              width: '92%',
              maxWidth: '520px',
              margin: 'auto',
            }}
          >
            <div style={{
              background: 'rgba(11, 15, 23, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.25rem',
              border: '1.5px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(145, 39, 140, 0.25)',
              color: '#ffffff',
            }}>
              {/* 16:9 Video Frame: Autoplay=1, Mute=1, Rel=0, Loop=1 */}
              <div style={{
                position: 'relative',
                paddingTop: '56.25%',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(0,0,0,0.65)',
                marginBottom: '1rem',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <iframe
                  src="https://www.youtube.com/embed/noHEBlrp1EU?autoplay=1&mute=1&rel=0&loop=1&playlist=noHEBlrp1EU"
                  title="HRWest 2027 Conference Experience"
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    border: 'none',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* High-Converting Title & Subtitle */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                }}>
                  Experience the Energy of HRWest 2027
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginTop: '0.3rem',
                  lineHeight: 1.55,
                }}>
                  Join 1,000+ HR leaders and solution providers in South San Francisco to drive your career and company forward.
                </div>
              </div>
            </div>
          </motion.div>

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
          1.5. EARLY BIRD URGENCY STRIP
         ══════════════════════════════════════════ */}
      <div style={{
        background: 'linear-gradient(90deg, var(--color-brand-purple) 0%, var(--color-brand-pink) 100%)',
        padding: '0.85rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated shimmer */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
          animation: 'shimmer 3s infinite',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🔥</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.9rem', color: '#fff', letterSpacing: '-0.01em' }}>
            Early Bird Registration Open
          </span>
          <span style={{
            background: 'rgba(255,255,255,0.2)', color: '#fff',
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.72rem',
            padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>Save up to 30%</span>
        </div>
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.3)' }} />
        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
          Rates increase after September 30 — lock in your spot now.
        </span>
        <Link to="/register" style={{
          background: '#fff',
          color: 'var(--color-brand-purple)',
          fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.82rem',
          padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)',
          textDecoration: 'none', whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
        }}>
          Register Now <ArrowRight size={14} />
        </Link>
      </div>

      {/* ══════════════════════════════════════════
          2. SOCIAL PROOF — Dual-Row Photo & Sponsor Marquee
         ══════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-surface)',
        padding: '3.5rem 0',
        borderTop: '1px solid var(--color-subtle)',
        borderBottom: '1px solid var(--color-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}>
        <div style={{ textAlign: 'center', padding: '0 2rem' }}>
          <span className="eyebrow" style={{ marginBottom: '0.5rem', display: 'block' }}>Trusted by HR Leaders. Backed by Industry</span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em',
            margin: 0,
          }}>
            See Who Shows Up at HRWest
          </h2>
        </div>

        {/* Row 1 — Photos from HRWest 2026 (Scrolls Left) */}
        <div className="marquee-container">
          <div className="marquee-content">
            {HRWEST_PHOTOS.concat(HRWEST_PHOTOS).map((p, i) => (
              <div key={i} className="photo-marquee-card">
                <img src={p.url} alt={p.title} loading="lazy" />
                <div style={{
                  position: 'absolute', bottom: 0, insetInline: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  padding: '1.25rem 0.85rem 0.6rem',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                }}>
                  {p.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — Enterprise Sponsor Logos (Scrolls Right) */}
        <div className="marquee-container">
          <div className="marquee-content-reverse">
            {SPONSORS.concat(SPONSORS).map((s, i) => (
              <div key={i} className="sponsor-logo-pill">
                <img src={s.logo} alt={s.name} loading="lazy" />
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', textWrap: 'balance', maxWidth: '750px', margin: '0 auto' }}>
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
          4. SPEAKERS — Featured Spotlight & 4-Column Faculty
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container-wide">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '720px', marginInline: 'auto' }}
          >
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'block' }}>Learn From World-Class Thought Leaders</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', margin: 0, textWrap: 'balance' }}>
              Real Experts Who Help HR Move Forward
            </h2>
          </motion.div>

          {/* ROW 1: 3-Column Spotlight Grid (Jason Averbook | Editorial Callout | Allison West) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch',
            marginBottom: '3rem',
          }}>
            {/* Left: Jason Averbook */}
            <SpeakerCard spk={REAL_SPEAKERS[0]} idx={0} />

            {/* Center: Social Proof Conversion Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'var(--gradient-brand-soft)',
                border: '2px solid rgba(145,39,140,0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                boxShadow: '0 12px 35px rgba(145,39,140,0.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle orb */}
              <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(145,39,140,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="badge badge-purple" style={{ marginBottom: '1.5rem', padding: '0.35rem 0.85rem', display: 'inline-flex' }}>
                  <Sparkles size={13} /> Why Attendees Come Back
                </span>

                {/* Social proof stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
                  {[
                    { value: '92%', label: 'Satisfaction rate', sub: 'post-event survey' },
                    { value: '8 in 10', label: 'Attendees return', sub: 'year after year' },
                    { value: '20+', label: 'SHRM & HRCI', sub: 'recert credits' },
                    { value: '#1', label: 'West Coast HR', sub: 'conference by size' },
                  ].map((s, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.9rem 0.75rem',
                      border: '1px solid rgba(145,39,140,0.12)',
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1.1 }}>{s.value}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.75rem', color: 'var(--color-text-primary)', marginTop: '0.2rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Mini quote */}
                <div style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.85rem 1rem',
                  marginBottom: '1.5rem',
                  borderLeft: '3px solid var(--color-brand-purple)',
                  textAlign: 'left',
                }}>
                  <p style={{ fontSize: '0.83rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', lineHeight: 1.55, margin: 0 }}>
                    "The sessions were immediately applicable. I used three frameworks at work the very next week."
                  </p>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brand-purple)', marginTop: '0.4rem' }}>— VP People Ops, SaaS Company</div>
                </div>
              </div>

              <Link to="/speakers" className="btn btn-primary btn-lg" style={{
                width: '100%',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(145,39,140,0.4)',
                gap: '0.6rem',
                padding: '0.9rem 1.5rem',
                position: 'relative',
                zIndex: 1,
              }}>
                Explore All 2027 Speakers <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Right: Allison West */}
            <SpeakerCard spk={REAL_SPEAKERS[1]} idx={1} />
          </div>

          {/* ROW 2: 4-Column Sub-Faculty Grid (Full Justified) */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.8rem',
              textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-brand-purple)'
            }}>
              2026/2027 Keynote & Session Faculty
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            width: '100%',
          }}>
            {REAL_SPEAKERS.slice(2, 6).map((spk, idx) => (
              <SpeakerCard key={spk.name} spk={spk} idx={idx + 2} />
            ))}
          </div>

          {/* Prominent Bottom Action Banner */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/speakers" className="btn btn-primary btn-lg" style={{
              padding: '1rem 2.5rem', fontSize: '1.05rem',
              boxShadow: '0 10px 30px rgba(145,39,140,0.35)',
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            }}>
              View Full 2027 Speaker Roster & Bios <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. 6 DEEP-DIVE CONFERENCE TRACKS (Horizontal Slider — 2.5 Peek View)
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '5rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background mesh */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 70% 50%, rgba(145,39,140,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(239,20,110,0.05) 0%, transparent 50%)',
        }} />

        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>

          {/* Section Header with Slider Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'block' }}>Curate Your Experience</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', margin: 0, textWrap: 'balance' }}>
                6 Deep-Dive Conference Tracks
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '560px' }}>
                Tailor your HRWest 2027 agenda across 6 specialized learning tracks. Drag or use controls to explore.
              </p>
            </div>

            {/* Slider Controls (Left / Right Arrow Navigation Buttons) */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={() => scrollTracks('left')}
                aria-label="Previous Track"
                style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: 'var(--color-elevated)', border: '1.5px solid var(--color-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--color-brand-purple)',
                  boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-brand-purple)'; e.currentTarget.style.background = 'var(--gradient-brand-soft)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-subtle)'; e.currentTarget.style.background = 'var(--color-elevated)'; }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={() => scrollTracks('right')}
                aria-label="Next Track"
                style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: 'var(--gradient-brand)', border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(145,39,140,0.35)', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Horizontal Track Slider (Cards: 2.5 visible peek layout) */}
          <div
            ref={trackSliderRef}
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              paddingBottom: '1.5rem',
              paddingTop: '0.5rem',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
          >
            {TRACKS.map((track, idx) => {
              const Icon = track.icon;
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  style={{
                    flex: '0 0 clamp(300px, 30.5vw, 390px)',
                    scrollSnapAlign: 'start',
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1.5px solid var(--color-subtle)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(145,39,140,0.5)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(145,39,140,0.18)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-subtle)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Link to="/agenda" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* Top Image Banner */}
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: 'var(--color-surface)' }}>
                      <img
                        src={track.image}
                        alt={track.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Gradient overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, var(--color-elevated) 0%, transparent 60%)',
                      }} />
                      {/* Top Badges over image */}
                      <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                          background: 'var(--gradient-brand)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 14px rgba(145,39,140,0.4)',
                        }}>
                          <Icon size={20} color="#fff" />
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.25rem 0.65rem', backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.92)' }}>{track.tag}</span>
                          <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '0.25rem 0.65rem', backdropFilter: 'blur(8px)' }}>{track.credits}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div style={{ padding: '1.5rem 1.75rem 1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Track Title */}
                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 900,
                        fontSize: '1.35rem', letterSpacing: '-0.02em',
                        color: 'var(--color-text-primary)', marginBottom: '0.6rem',
                      }}>
                        {track.label}
                      </h3>

                      {/* Track Description */}
                      <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                        {track.desc}
                      </p>

                      {/* Highlight Box */}
                      <div style={{
                        padding: '0.9rem 1.1rem',
                        background: 'var(--gradient-brand-soft)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '3.5px solid var(--color-brand-purple)',
                      }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.72rem', color: 'var(--color-brand-purple)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                          Key Takeaway
                        </div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.45 }}>
                          {track.highlight}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Dots + CTA Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            {/* Dot indicators — 6 tracks total */}
            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
              {TRACKS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === 0 ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === 0 ? 'var(--gradient-brand)' : 'var(--color-subtle)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem', fontWeight: 600 }}>6 Tracks</span>
            </div>
            <Link to="/agenda" className="btn btn-primary btn-lg" style={{
              padding: '0.9rem 2.25rem', fontSize: '1rem',
              boxShadow: '0 10px 30px rgba(145,39,140,0.35)',
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            }}>
              View Full 2-Day Conference Agenda <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. BOSS CONVINCER WIDGET TEASER — On-Brand Glass Split
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '5rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle ambient glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(145,39,140,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '35%', height: '70%', background: 'radial-gradient(circle, rgba(239,20,110,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              <Calculator size={13} /> Instant Approval Toolkit
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', textWrap: 'balance', maxWidth: '700px', margin: '0 auto' }}>
              Need Your Boss's Sign-Off on HRWest?
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginTop: '0.85rem', lineHeight: 1.7 }}>
              Generate a polished ROI business case email in under 60 seconds.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }}
          >
            {/* Left: ROI bars + checklist + CTAs */}
            <div>
              <div style={{
                background: 'var(--color-elevated)',
                border: '1.5px solid rgba(145,39,140,0.18)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                marginBottom: '1.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.72rem', color: 'var(--color-brand-purple)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Why It Gets Approved</div>
                {[
                  { label: 'SHRM/HRCI Credit Value', value: '$400+', bar: 80 },
                  { label: 'Networking ROI (avg)', value: '2.8×', bar: 70 },
                  { label: 'Total Estimated Return', value: '3.4×', bar: 92 },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: i < 2 ? '1.1rem' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.87rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{item.label}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{item.value}</span>
                    </div>
                    <div style={{ height: '5px', background: 'var(--color-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${item.bar}%` }} viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: i * 0.2, ease: 'easeOut' }}
                        style={{ height: '100%', background: 'var(--gradient-brand)', borderRadius: '3px' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  'Calculates full ROI — credits, networking & sessions',
                  'Pre-written email template, customizable to your goals',
                  'Team savings calculator — up to 35% off for 3+ attendees',
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <CheckCircle size={12} color="#ffffff" />
                    </div>
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{f}</span>
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

            {/* Right: Email preview mock + testimonial */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: 'var(--color-elevated)',
                border: '1px solid var(--color-subtle)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
              }}>
                <div style={{ background: 'var(--color-surface)', padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-subtle)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {['#ef4444', '#f59e0b', '#22c55e'].map(c => <span key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                  <span style={{ flex: 1, background: 'var(--color-canvas)', borderRadius: 'var(--radius-sm)', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', border: '1px solid var(--color-subtle)' }}>
                    New Email Draft
                  </span>
                </div>
                <div style={{ padding: '1.5rem', fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong>To:</strong> manager@company.com<br />
                    <strong>Subject:</strong> Attending HRWest 2027 — ROI Business Case
                    <hr style={{ margin: '0.75rem 0', borderColor: 'var(--color-subtle)' }} />
                  </div>
                  <p style={{ marginBottom: '0.6rem' }}>Hi [Manager Name],</p>
                  <p style={{ marginBottom: '0.6rem' }}>I'd like to attend <strong>HRWest 2027</strong> in South San Francisco (March 23–24):</p>
                  <ul style={{ paddingLeft: '1.1rem', marginBottom: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <li>50+ actionable HR strategy sessions</li>
                    <li>20+ SHRM/HRCI credits (saves ~$400 in external training)</li>
                    <li>Direct access to top Silicon Valley HR tech vendors</li>
                  </ul>
                  <p style={{ color: 'var(--color-brand-purple)', fontWeight: 700, fontSize: '0.9rem' }}>Net ROI estimate: 3.4× total cost ✓</p>
                </div>
              </div>

              <div style={{
                background: 'var(--gradient-brand-soft)',
                border: '1.5px solid rgba(145,39,140,0.2)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 1.5rem',
              }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--color-brand-purple)', marginBottom: '0.4rem', lineHeight: 1, fontFamily: 'Georgia, serif' }}>"</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  Sent the email on a Thursday, got approval by Monday. The ROI breakdown made it a no-brainer for my CHRO.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>S</div>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Sarah M.</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>HR Director, Bay Area Tech Firm</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. TESTIMONIALS SPOTLIGHT — 2 Featured Stories + Hub CTA
         ══════════════════════════════════════════ */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '5rem', paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <span className="eyebrow" style={{ marginBottom: '0.75rem', display: 'block' }}>Verified Attendee & Partner Feedback</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.03em', textWrap: 'balance', maxWidth: '720px', margin: '0 auto' }}>
              Why 1,000+ HR Leaders Return to HRWest
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginTop: '0.85rem' }}>
              Real experiences from HR decision-makers and solution providers.
            </p>
          </motion.div>

          {/* 2 High-Impact Spotlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {/* Card 1: Attendee Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(145,39,140,0.15)' }}
              style={{
                background: 'var(--color-elevated)',
                border: '2px solid rgba(145,39,140,0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(145,39,140,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="badge badge-purple" style={{ padding: '0.35rem 0.85rem' }}>
                    <Sparkles size={12} /> Attendee Spotlight
                  </span>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#ef146e" color="#ef146e" />
                    ))}
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  "I picked up some great practical tips that I can take back to my office and use right away. The caliber of speakers was phenomenal!"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-subtle)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'var(--gradient-brand)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(145,39,140,0.25)',
                }}>
                  H
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-primary)' }}>
                    HR Director & Practitioner
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Fortune 500 Enterprise
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Sponsor Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -6, boxShadow: '0 20px 45px rgba(239,20,110,0.15)' }}
              style={{
                background: 'var(--gradient-brand-soft)',
                border: '2px solid rgba(239,20,110,0.25)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(239,20,110,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="badge" style={{ background: 'rgba(239,20,110,0.12)', color: 'var(--color-brand-pink)', border: '1px solid rgba(239,20,110,0.25)', padding: '0.35rem 0.85rem' }}>
                    <Sparkles size={12} /> Sponsor Success Story
                  </span>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#ef146e" color="#ef146e" />
                    ))}
                  </div>
                </div>

                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.01em',
                }}>
                  "We had people coming up to our booth throughout the whole conference. It was an excellent experience for us, and we will be back!"
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(145,39,140,0.15)', paddingTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-brand-pink), var(--color-brand-purple))', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(239,20,110,0.25)',
                }}>
                  G
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-brand-purple)' }}>
                    Gregg Ward
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    The Center for Respectful Leadership
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Prominent CTA to Full Testimonials Page */}
          <div style={{ textAlign: 'center' }}>
            <Link
              to="/testimonials"
              className="btn btn-primary btn-lg"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.05rem',
                boxShadow: '0 10px 30px rgba(145,39,140,0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              View All Attendee & Sponsor Testimonials <ArrowRight size={18} />
            </Link>
          </div>
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
                  src={ssfVenue}
                  alt="South San Francisco Conference Center Atrium"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. FINAL CTA BLOCK — Split High-Converting Banner
         ══════════════════════════════════════════ */}
      <section style={{ background: 'var(--color-canvas)', padding: '5rem 0' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={{
              background: 'var(--gradient-brand-soft)',
              borderRadius: 'var(--radius-xl)',
              padding: '3.5rem 3.5rem',
              border: '1.5px solid rgba(145,39,140,0.2)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            {/* Glow blobs */}
            <div style={{ position: 'absolute', top: '-30%', left: '10%', width: '40%', height: '80%', background: 'radial-gradient(circle, rgba(145,39,140,0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-30%', right: '5%', width: '35%', height: '80%', background: 'radial-gradient(circle, rgba(239,20,110,0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

            {/* Left Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="eyebrow" style={{ marginBottom: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <TrendingUp size={13} /> Lock In Your 2027 Spot
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 3.2vw, 3rem)', letterSpacing: '-0.04em', marginBottom: '1.1rem', textWrap: 'balance' }}>
                Your Most Impactful HR Year Starts Here
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '2.25rem', lineHeight: 1.65 }}>
                Join thousands of HR professionals on the leading edge of AI, culture, and workforce innovation. Pre-register today — early access rates won't last.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/register" className="btn btn-primary btn-lg" style={{ boxShadow: 'var(--shadow-brand)' }}>
                  Pre-Register for HRWest 2027 <ArrowRight size={20} />
                </Link>
                <Link to="/attend/team" className="btn btn-outline btn-lg">
                  Bring Your Team <Sparkles size={18} />
                </Link>
              </div>
            </div>

            {/* Right Cheering HR Leaders Photo Frame */}
            <div style={{ position: 'relative', zIndex: 1, borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '320px', boxShadow: 'var(--shadow-lg)', border: '2px solid rgba(145,39,140,0.25)' }}>
              <img
                src={ctaCheeringHR}
                alt="Cheering HR Professionals at HRWest"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(145,39,140,0.25) 0%, transparent 60%)',
              }} />
              <div style={{
                position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem',
                background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-md)', padding: '0.65rem 1rem',
                fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-brand-purple)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Sparkles size={16} /> 1,000+ HR Leaders Joining in 2027
              </div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};
