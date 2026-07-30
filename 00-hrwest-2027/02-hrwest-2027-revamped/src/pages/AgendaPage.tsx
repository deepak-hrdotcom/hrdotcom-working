import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowRight, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

import agendaHero from '../assets/agenda_hero.png';

interface Presenter {
  name: string;
  title: string;
  company: string;
  avatar: string;
}

interface Session {
  id: string;
  day: number;
  dateStr: string;
  time: string;
  title: string;
  description: string;
  track: string;
  room: string;
  credits?: string;
  presenters: Presenter[];
}

const AGENDA_DATA: Session[] = [
  {
    id: 's1',
    day: 1,
    dateStr: 'Jun 9, 2026',
    time: '8:30 am – 9:05 am PT',
    title: 'Welcome to HRWest 2026!',
    description: 'Welcome to HRWest 2026! In this opening session, Yael Schy and Jason Averbook will welcome attendees and set the tone for a conference built on community, learning, and shared growth as we work together to Rise Above the Fog.',
    track: 'HR Strategy & AI',
    room: 'Main Stage',
    credits: '1.0 Credits',
    presenters: [
      { name: 'Debbie McGrath', title: 'CEO / Founder and Chief Instigator', company: 'HR.com', avatar: 'https://public-cdn.hr.com/profile_images/2005/6/22/1119462527946_120' },
      { name: 'Jason Averbook', title: 'Co-Founder', company: 'Now to Next', avatar: 'https://public-cdn.hr.com/profile_images/2026/3/27/1774614743093_120' },
      { name: 'Yael Schy', title: 'Founder', company: 'Zoomers to Boomers Improv', avatar: 'https://public-cdn.hr.com/profile_images/2026/4/1/1775062601734_120' },
    ],
  },
  {
    id: 's2',
    day: 1,
    dateStr: 'Jun 9, 2026',
    time: '9:10 am – 10:00 am PT',
    title: 'The AI-First HR Function: Strategy, Structure, and Systems',
    description: 'This is an immersive, hands-on workshop for HR leaders to gain the education and inspiration needed to produce a clear vision and scalable strategies for enabling AI for workforce and business outcomes. Attendees will get a clear understanding of the different types and applications of AI in workforce technologies, a framework for deployment, success, and a scaled approach for realizing business value.',
    track: 'HR Strategy & AI',
    room: 'Main Stage',
    credits: '1.25 Credits',
    presenters: [
      { name: 'Jason Averbook', title: 'Co-Founder', company: 'Now to Next', avatar: 'https://public-cdn.hr.com/profile_images/2026/3/27/1774614743093_120' },
    ],
  },
  {
    id: 's3',
    day: 1,
    dateStr: 'Jun 9, 2026',
    time: '10:00 am – 10:45 am PT',
    title: 'Expo Time, Coffee Break and Intro to Replit',
    description: 'Take this time to visit the exhibit hall to learn about the latest HR solutions, grab some coffee, and hear a brief demo from Replit. It’s the perfect opportunity to reconnect with HR friends and make new connections.',
    track: 'HR Tech & Analytics',
    room: 'Exhibit Hall',
    credits: '—',
    presenters: [
      { name: 'Stacey La Torre', title: 'Chief People Officer', company: 'Replit', avatar: 'https://public-cdn.hr.com/profile_images/2023/3/31/1680271725473_120' },
    ],
  },
  {
    id: 's4',
    day: 1,
    dateStr: 'Jun 9, 2026',
    time: '10:45 am – 11:15 am PT',
    title: 'Rethinking Leadership in Modern Organizations',
    description: 'Most organizations don’t have a retention problem—they have a leadership blind spot. Leaders often make assumptions about why employees stay or leave without ever truly understanding their people. In this session, Natalie Grabher challenges common misconceptions around retention and performance, showing why hiring is not a quick fix but a long-term investment. Attendees will leave with practical strategies to lead more intentionally.',
    track: 'Leadership & Culture',
    room: 'Baden 2',
    credits: '1.0 Credits',
    presenters: [
      { name: 'Natalie Grabher', title: 'VP of HR', company: 'Hall of Frames', avatar: 'https://public-cdn.hr.com/profile_images/2026/4/1/1775070992009_120' },
    ],
  },
  {
    id: 's5',
    day: 1,
    dateStr: 'Jun 9, 2026',
    time: '10:45 am – 11:15 am PT',
    title: 'The 2026 Workplace Reset: Employment Law Shifts Employers Can’t Ignore',
    description: 'This interactive session will tackle some of the most challenging areas for in-house counsel and HR professionals in 2026, including the latest developments on remote-work accommodations and leave requests, as well as updates on new "stay-or-pay" restrictions that every practitioner should know.',
    track: 'Legal & Compliance',
    room: 'Oyster Room',
    credits: '1.0 Legal Credits',
    presenters: [
      { name: 'Holly Sutton', title: 'Co-Managing Partner', company: 'Farella Braun + Martel LLP', avatar: 'https://public-cdn.hr.com/profile_images/2022/12/19/1671474471189_120' },
    ],
  },
  {
    id: 's6',
    day: 1,
    dateStr: 'Jun 9, 2026',
    time: '10:45 am – 11:15 am PT',
    title: 'The Road Ahead: Predictions and Possibilities for the Future of Work',
    description: 'The future of work will not follow a single path—multiple, competing futures are already emerging. This session explores predictions across the Future of Working and also examines diverging future scenarios—from AI-driven productivity to AI-enabled human amplification.',
    track: 'HR Strategy & AI',
    room: 'Main Stage',
    credits: '1.0 Credits',
    presenters: [
      { name: 'Dr. Lauren S. Park', title: 'Quantitative Science Team Lead', company: 'SAP SuccessFactors', avatar: 'https://public-cdn.hr.com/profile_images/2019/4/2/1554228707129_120' },
    ],
  },
  {
    id: 's7',
    day: 2,
    dateStr: 'Jun 10, 2026',
    time: '9:00 am – 10:00 am PT',
    title: 'Day 2 Keynote: Skills-Based Hiring & AI Talent Acquisition',
    description: 'Discover how top West Coast tech employers transition to skills-based hiring frameworks using AI talent acquisition tools, boosting retention and speed-to-hire across competitive tech talent markets.',
    track: 'Talent Acquisition',
    room: 'Main Stage',
    credits: '1.25 Credits',
    presenters: [
      { name: 'Edie Goldberg', title: 'President & Founder', company: 'E. L. Goldberg & Associates', avatar: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/edie-goldberg.jpg' },
    ],
  },
  {
    id: 's8',
    day: 2,
    dateStr: 'Jun 10, 2026',
    time: '10:30 am – 11:30 am PT',
    title: 'Coaching Hybrid Leadership Teams for Retention',
    description: 'Practical executive coaching frameworks to build psychological safety, improve manager effectiveness, and drive team performance across hybrid enterprise structures.',
    track: 'Leadership & Culture',
    room: 'Baden 1',
    credits: '1.0 Credits',
    presenters: [
      { name: 'Lee Cage Jr.', title: 'Director, Enterprise Transformation', company: 'BDO USA', avatar: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/lee-cage-350x350.jpg' },
    ],
  },
  {
    id: 's9',
    day: 2,
    dateStr: 'Jun 10, 2026',
    time: '11:45 am – 12:45 pm PT',
    title: 'Preventing Workplace Burnout: Sustainable Wellness ROI',
    description: 'How to design mental health and wellness benefits that cut corporate healthcare spend while driving a 40% boost in employee retention across distributed teams.',
    track: 'Health & Wellness',
    room: 'Oyster Room',
    credits: '1.0 Credits',
    presenters: [
      { name: 'Debbie McGrath', title: 'CEO & Founder', company: 'HR.com', avatar: 'https://public-cdn.hr.com/profile_images/2005/6/22/1119462527946_120' },
    ],
  },
  {
    id: 's10',
    day: 2,
    dateStr: 'Jun 10, 2026',
    time: '2:00 pm – 3:00 pm PT',
    title: 'Closing Panel: What West Coast HR Leaders Will Do Differently in 2027',
    description: 'Executive CHRO roundtable reflecting on key conference insights, AI adoption roadmaps, and actionable strategies to take back to your organization on Monday morning.',
    track: 'HR Strategy & AI',
    room: 'Main Stage',
    credits: '1.0 Credits',
    presenters: [
      { name: 'Jason Averbook', title: 'Co-Founder', company: 'Now to Next', avatar: 'https://public-cdn.hr.com/profile_images/2026/3/27/1774614743093_120' },
      { name: 'Treena Diebolt', title: 'Vice President, People', company: 'Otter.ai', avatar: 'https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/speakers/treena-diebolt-350x350.jpg' },
    ],
  },
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

const TRACKS = ['All', 'HR Strategy & AI', 'Legal & Compliance', 'HR Tech & Analytics', 'Talent Acquisition', 'Leadership & Culture', 'Health & Wellness'];

export const AgendaPage: React.FC = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('All');

  const filteredSessions = AGENDA_DATA.filter(s => s.day === activeDay && (selectedTrack === 'All' || s.track === selectedTrack));

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ══════════ HERO SECTION ══════════ */}
      <section style={{
        position: 'relative',
        minHeight: '440px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${agendaHero})`,
          backgroundSize: 'cover',
          backgroundPosition: '55% center',
        }} />

        {/* Multi-layer gradient overlay */}
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

        {/* Ambient glow orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-80px', left: '-80px',
            width: '400px', height: '400px',
            background: 'radial-gradient(circle, rgba(145,39,140,0.22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
        </div>

        {/* Content Container */}
        <div className="container-wide" style={{
          position: 'relative', zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '5fr 3fr 4fr',
          gap: '0',
          alignItems: 'center',
          justifyItems: 'start',
          height: '100%',
          paddingTop: '3rem',
          paddingBottom: '3rem',
        }}>
          {/* LEFT: Main Hero Text Block */}
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
            {/* Live Context Badge Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              background: 'rgba(239, 20, 110, 0.15)',
              border: '1px solid rgba(239, 20, 110, 0.35)',
              backdropFilter: 'blur(12px)',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1rem',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef146e', boxShadow: '0 0 10px #ef146e' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.76rem', color: '#ff6ba0', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Stay Tuned for the 2027 Schedule
              </span>
            </div>

            {/* Title in ONE SINGLE LINE */}
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(1.9rem, 3.2vw, 3rem)',
              letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#fff',
              marginBottom: '0.85rem',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}>
              HRWest{' '}
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>2027 Agenda</span>
            </h1>

            {/* Reduced description text */}
            <p style={{
              fontSize: '0.98rem', color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.5, marginBottom: '1.75rem', maxWidth: '440px',
              fontFamily: 'var(--font-body)', fontWeight: 500,
            }}>
              Stay tuned for the 2027 Schedule. Previous year's session lineup displayed below for reference.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
              }}>
                Pre-Register for 2027 <ArrowRight size={15} />
              </Link>
              <a href="#agenda-grid" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.3rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none',
              }}>
                <Calendar size={14} /> View Reference Agenda
              </a>
            </div>
          </motion.div>

          {/* CENTRE COLUMN: transparent spacer — lets stage photo bleed through */}
          <div />

          {/* RIGHT COLUMN: Floating Glass Mini Session Cards Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              position: 'relative',
              height: '360px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {[
              {
                time: '8:30 AM – 9:05 AM',
                title: 'Welcome to HRWest 2026!',
                speaker: 'Debbie McGrath & Jason Averbook',
                track: 'HR Strategy & AI',
                color: '#e07ee0',
                offset: '0px',
                rotate: '-2deg',
                delay: 0.2,
              },
              {
                time: '9:10 AM – 10:00 AM',
                title: 'The AI-First HR Function',
                speaker: 'Jason Averbook — Now to Next',
                track: 'HR Strategy & AI',
                color: '#ef146e',
                offset: '16px',
                rotate: '1.5deg',
                delay: 0.32,
              },
              {
                time: '10:45 AM – 11:15 AM',
                title: '2026 Employment Law Shifts',
                speaker: 'Holly Sutton — Farella Braun',
                track: 'Legal & Compliance',
                color: '#ff6ba0',
                offset: '8px',
                rotate: '-1deg',
                delay: 0.44,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: item.rotate }}
                transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: `${i * 110 + 5}px`,
                  left: item.offset,
                  width: '280px',
                  background: 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '16px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  zIndex: 3 - i,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.12)', padding: '0.15rem 0.5rem', borderRadius: '99px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={10} />{item.time}
                  </span>
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, color: item.color, background: 'rgba(255,255,255,0.15)', border: `1px solid ${item.color}40`, padding: '0.1rem 0.5rem', borderRadius: '99px', textTransform: 'uppercase' }}>
                    {item.track}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.88rem', color: '#fff', lineHeight: 1.25, marginBottom: '0.2rem' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                  {item.speaker}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Day Tabs + Track Filters ── */}
      <section id="agenda-grid" style={{ background: 'var(--color-canvas)', padding: '2.5rem 0 1rem' }}>
        <div className="container-wide">
          {/* Clean Unified Section Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)', margin: '0 0 0.4rem 0' }}>
              HRWest Conference Sessions
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', margin: 0, fontWeight: 500 }}>
              Browse keynotes, interactive workshops, and recertification tracks for June 9 & June 10, 2026.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            background: 'var(--color-elevated)',
            padding: '0.85rem 1.5rem',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--color-subtle)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            {/* GROUP 1: DISTINCT DAY SELECTOR SEGMENT */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--color-surface)',
              padding: '0.3rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid rgba(145,39,140,0.2)',
            }}>
              {[
                { day: 1, label: 'Day 1 — June 9' },
                { day: 2, label: 'Day 2 — June 10' },
              ].map(item => (
                <button
                  key={item.day}
                  onClick={() => setActiveDay(item.day)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    background: activeDay === item.day ? 'var(--gradient-brand)' : 'transparent',
                    color: activeDay === item.day ? '#fff' : 'var(--color-text-secondary)',
                    boxShadow: activeDay === item.day ? 'var(--shadow-brand)' : 'none',
                    transition: 'all 0.25s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                >
                  <Calendar size={14} />
                  {item.label}
                </button>
              ))}
            </div>

            {/* VERTICAL DIVIDER */}
            <div style={{ width: '1.5px', height: '28px', background: 'rgba(145,39,140,0.2)', display: 'inline-block' }} />

            {/* GROUP 2: TRACK TOPIC FILTERS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', flex: 1, justifyContent: 'flex-end' }}>
              {TRACKS.map(track => (
                <button
                  key={track}
                  onClick={() => setSelectedTrack(track)}
                  style={{
                    padding: '0.4rem 0.95rem',
                    borderRadius: 'var(--radius-full)',
                    border: selectedTrack === track ? '1px solid transparent' : '1px solid var(--color-subtle)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    background: selectedTrack === track ? 'var(--gradient-brand)' : 'var(--color-surface)',
                    color: selectedTrack === track ? '#fff' : 'var(--color-text-muted)',
                    boxShadow: selectedTrack === track ? '0 4px 14px rgba(145,39,140,0.3)' : 'none',
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

      {/* ── SESSIONS TIMELINE (MATCHING LIVE SITE CARDS & PRESENTERS) ── */}
      <section className="section" style={{ background: 'var(--color-canvas)', paddingTop: '1rem', paddingBottom: '5rem' }}>
        <div className="container-wide">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${selectedTrack}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {filteredSessions.map((session, idx) => {
                const trackColor = TRACK_COLORS[session.track] || 'var(--color-text-muted)';
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
                    style={{
                      background: 'var(--color-elevated)',
                      border: '1.5px solid var(--color-subtle)',
                      borderRadius: 'var(--radius-xl)',
                      padding: '2rem',
                      boxShadow: 'var(--shadow-md)',
                      borderLeft: `5px solid ${trackColor}`,
                      transition: 'all 0.25s ease',
                      display: 'grid',
                      gridTemplateColumns: '220px 1fr',
                      gap: '2rem',
                      alignItems: 'start',
                    }}
                  >
                    {/* LEFT COLUMN: Date, Time & Metadata */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {session.dateStr}
                      </span>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                        {session.time}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700,
                          color: trackColor, background: `${trackColor}12`, padding: '0.25rem 0.65rem',
                          borderRadius: 'var(--radius-sm)', border: `1px solid ${trackColor}30`,
                          width: 'fit-content',
                        }}>
                          <Sparkles size={12} /> {session.track}
                        </span>

                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600,
                        }}>
                          <MapPin size={13} style={{ color: 'var(--color-brand-purple)' }} /> {session.room}
                        </span>

                        {session.credits && session.credits !== '—' && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                            fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 700,
                            color: 'var(--color-brand-purple)', background: 'var(--gradient-brand-soft)',
                            padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', width: 'fit-content',
                          }}>
                            <Award size={13} /> {session.credits}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: Title, Description & Presenters */}
                    <div>
                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 900,
                        fontSize: '1.3rem', color: 'var(--color-text-primary)',
                        marginBottom: '0.75rem', lineHeight: 1.3, letterSpacing: '-0.01em',
                      }}>
                        {session.title}
                      </h3>

                      <p style={{
                        fontSize: '0.9rem', color: 'var(--color-text-muted)',
                        lineHeight: 1.65, marginBottom: '1.5rem', margin: '0 0 1.5rem 0',
                      }}>
                        {session.description}
                      </p>

                      {/* PRESENTERS SECTION (MATCHING LIVE SITE) */}
                      {session.presenters && session.presenters.length > 0 && (
                        <div style={{
                          background: 'var(--color-surface)',
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.1rem 1.25rem',
                          border: '1px solid var(--color-subtle)',
                        }}>
                          <div style={{
                            fontFamily: 'var(--font-display)', fontWeight: 800,
                            fontSize: '0.75rem', textTransform: 'uppercase',
                            letterSpacing: '0.08em', color: 'var(--color-brand-purple)',
                            marginBottom: '0.85rem',
                          }}>
                            Presenters
                          </div>

                          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            {session.presenters.map((p, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  style={{
                                    width: '42px', height: '42px', borderRadius: '50%',
                                    objectFit: 'cover', border: '1.5px solid var(--color-brand-purple)',
                                    flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                  }}
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <div>
                                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.88rem', color: 'var(--color-text-primary)' }}>
                                    {p.name}
                                  </div>
                                  <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.3 }}>
                                    {p.title}
                                  </div>
                                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-brand-purple)' }}>
                                    {p.company}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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

      {/* ── BOTTOM CTA ── */}
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

export default AgendaPage;
