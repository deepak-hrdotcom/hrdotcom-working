import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, ShieldCheck, ArrowRight, CheckCircle, Award, Calendar, Users, Sparkles, ChevronRight, Check, User, Briefcase } from 'lucide-react';
import registerHero from '../assets/register_hero.webp';

export const RegisterPage: React.FC = () => {
  const [selectedPass, setSelectedPass] = useState<'attendee' | 'vendor'>('attendee');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);

  const passes = {
    attendee: {
      name: 'HR Attendee Pass',
      category: 'HR Professional',
      earlyPrice: 399,
      regularPrice: 799,
      intended: 'Intended for practicing, aspiring, and in-transition HR professionals.',
    },
    vendor: {
      name: 'Vendor Pass',
      category: 'HR Solution Providers',
      earlyPrice: 899,
      regularPrice: 1299,
      intended: 'Intended for Consultants and Solution providers of HR products and services.',
    },
  };

  const currentPass = passes[selectedPass];
  const totalPrice = currentPass.earlyPrice * ticketCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* CINEMATIC HERO */}
      <section style={{
        position: 'relative',
        minHeight: '460px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${registerHero})`,
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
            background: 'radial-gradient(circle, var(--brand-glow-22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
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
              paddingRight: '1rem',
            }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)',
              letterSpacing: '-0.04em', lineHeight: 1.05,
              color: '#fff',
              marginBottom: '1.1rem',
              textAlign: 'left',
            }}>
              Register for<br />
              <span style={{
                background: 'var(--gradient-brand-glow)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>HRWest 2027</span>
            </h1>

            <p style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '420px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              Choose your pass below. Early Bird rates available until January 15, 2027.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#passes" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.75rem 1.6rem',
                background: 'var(--gradient-brand)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.86rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px var(--brand-pink-glow-45, var(--brand-glow-40))',
              }}>
                Select Your Pass <ChevronRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating feature cards stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              position: 'relative', height: '360px', display: 'flex',
              flexDirection: 'column', justifyContent: 'center', width: '100%'
            }}
          >
            {[
              { title: 'Full Event Access', sub: 'All Keynotes & Breakout Sessions', rotate: '-2deg', offset: '0px', delay: 0.2 },
              { title: '20+ Recert Credits', sub: 'SHRM & HRCI Approved', rotate: '1.5deg', offset: '16px', delay: 0.32 },
              { title: 'Early Bird Savings', sub: 'Save up to $400 before Jan 15', rotate: '-1deg', offset: '8px', delay: 0.44 },
            ].map(({ title, sub, rotate, offset, delay }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: `${i * 105 + 10}px`,
                  left: offset,
                  width: '260px',
                  maxWidth: 'calc(100% - 16px)',
                  background: 'rgba(255,255,255,0.11)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: '16px',
                  padding: '0.85rem 1rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  zIndex: 3 - i,
                }}
              >
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: 'var(--brand-pink-glow-25)', border: '1px solid rgba(239,20,110,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <Check size={13} color="var(--color-brand-pink)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.86rem', color: '#fff', marginBottom: '0.15rem' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PASS SELECTION CARDS */}
      <section id="passes" style={{ background: 'var(--color-canvas)', padding: '4rem 0 3rem' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.4rem' }}><Sparkles size={13} /> Select Conference Pass</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>Choose Your HRWest 2027 Pass</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>All passes include full 2-day access, sponsor hall, and post-event session slides.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '960px', margin: '0 auto', alignItems: 'stretch' }}>

            {/* CARD 1: HR ATTENDEE PASS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              onClick={() => setSelectedPass('attendee')}
              style={{ background: selectedPass === 'attendee' ? 'var(--gradient-brand-soft)' : 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.25rem 1.75rem', position: 'relative', boxShadow: selectedPass === 'attendee' ? '0 12px 40px var(--brand-glow-20)' : 'var(--shadow-md)', border: selectedPass === 'attendee' ? '2.5px solid var(--color-brand-purple)' : '1.5px solid var(--color-subtle)', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {selectedPass === 'attendee' && <div style={{ position: 'absolute', top: '-1px', right: '1.5rem', background: 'var(--gradient-brand)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.25rem 0.75rem', borderRadius: '0 0 var(--radius-sm) var(--radius-sm)' }}>Selected</div>}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><User size={12} /> HR Practitioner</span>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-brand-purple)', background: 'var(--brand-glow-12)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--brand-glow-20)' }}>Save $400</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>HR Attendee Pass</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '3rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>$399</span>
                  <span style={{ textDecoration: 'line-through', fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>$799</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>/ early rate</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.5 }}>*Intended for practicing, aspiring, and in-transition HR professionals.</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', padding: 0 }}>
                  {['Full 2-Day All-Access Pass (Keynotes & Breakouts)', 'Earn 20+ SHRM & HRCI Recertification Credits', 'Full Sponsor Hall Access & Included Meals', 'Post-Event Session Slides & Materials'].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.87rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      <CheckCircle size={16} color="var(--color-brand-purple)" style={{ flexShrink: 0 }} /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={selectedPass === 'attendee' ? 'btn btn-primary btn-lg' : 'btn btn-outline btn-lg'} style={{ width: '100%' }}>
                Select Attendee Pass <ChevronRight size={18} />
              </button>
            </motion.div>

            {/* CARD 2: VENDOR PASS */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedPass('vendor')}
              style={{ background: selectedPass === 'vendor' ? 'rgba(239,20,110,0.04)' : 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.25rem 1.75rem', position: 'relative', boxShadow: selectedPass === 'vendor' ? '0 12px 40px var(--brand-glow-20)' : 'var(--shadow-md)', border: selectedPass === 'vendor' ? '2.5px solid var(--color-brand-pink)' : '1.5px solid var(--color-subtle)', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {selectedPass === 'vendor' && <div style={{ position: 'absolute', top: '-1px', right: '1.5rem', background: 'var(--color-brand-pink)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.25rem 0.75rem', borderRadius: '0 0 var(--radius-sm) var(--radius-sm)' }}>Selected</div>}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="badge badge-pink" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}><Briefcase size={12} /> Solution Provider</span>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--color-brand-pink)', background: 'rgba(239,20,110,0.1)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--brand-glow-20)' }}>Save $400</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Vendor Pass</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '3rem', color: 'var(--color-brand-pink)', lineHeight: 1 }}>$899</span>
                  <span style={{ textDecoration: 'line-through', fontSize: '1.1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>$1,299</span>
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>/ early rate</span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.5 }}>*Intended for Consultants and Solution providers of HR products and services.</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', padding: 0 }}>
                  {['Full 2-Day All-Access Pass for Solution Providers', 'Direct Access to 1,000+ HR Decision-Makers', 'Sponsor Exhibit Hall & Networking Receptions', 'Access to Official Conference Networking App'].map((feat, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.87rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      <CheckCircle size={16} color="var(--color-brand-authority)" style={{ flexShrink: 0 }} /> {feat}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={selectedPass === 'vendor' ? 'btn btn-primary btn-lg' : 'btn btn-outline btn-lg'} style={{ width: '100%' }}>
                Select Vendor Pass <ChevronRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING COMPARISON TABLE */}
      <section style={{ background: 'var(--color-canvas)', padding: '1rem 0 4rem' }}>
        <div className="container-wide" style={{ maxWidth: '960px' }}>
          <div className="table-glass">
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr style={{ background: 'var(--gradient-brand)', color: '#ffffff' }}>
                  <th style={{ padding: '1.25rem 1.75rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem' }}>Timeframe</th>
                  <th style={{ padding: '1.25rem 1.75rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem', textAlign: 'center' }}>Attendee Rate</th>
                  <th style={{ padding: '1.25rem 1.75rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem', textAlign: 'center' }}>Vendor Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-subtle)', background: 'var(--gradient-brand-soft)' }}>
                  <td style={{ padding: '1.2rem 1.75rem' }}>
                    <strong style={{ display: 'block', color: 'var(--color-brand-purple)', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800 }}>Early Bird Rate</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--color-brand-pink)', fontWeight: 700 }}>Ends Jan 15, 2027</span>
                  </td>
                  <td style={{ padding: '1.2rem 1.75rem', textAlign: 'center', fontWeight: 900, fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-brand-purple)' }}>$399</td>
                  <td style={{ padding: '1.2rem 1.75rem', textAlign: 'center', fontWeight: 900, fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-brand-pink)' }}>$899</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-subtle)' }}>
                  <td style={{ padding: '1.2rem 1.75rem' }}>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 800 }}>Regular Rate</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Jan 16 - Mar 22, 2027</span>
                  </td>
                  <td style={{ padding: '1.2rem 1.75rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>$799</td>
                  <td style={{ padding: '1.2rem 1.75rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>$1,299</td>
                </tr>
                <tr>
                  <td style={{ padding: '1.2rem 1.75rem' }}>
                    <strong style={{ display: 'block', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 800 }}>Onsite Rate</strong>
                    <span style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>June 9-10, 2027</span>
                  </td>
                  <td style={{ padding: '1.2rem 1.75rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>$999</td>
                  <td style={{ padding: '1.2rem 1.75rem', textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>$1,499</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CHECKOUT FORM + ORDER SUMMARY */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 0 5rem', borderTop: '1px solid var(--color-subtle)' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)', margin: 0 }}>Complete Your Registration</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>Secure your seat at HRWest 2027 — South San Francisco, June 9 & 10.</p>
          </div>
          <div className="responsive-grid-2" style={{ alignItems: 'start' }}>
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1.5px solid var(--color-subtle)', boxShadow: 'var(--shadow-lg)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ticket size={22} style={{ color: 'var(--color-brand-purple)' }} /> Complete Pass Registration
              </h3>
              {submitted ? (
                <div style={{ padding: '2rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1.5px solid var(--brand-glow-20)' }}>
                  <CheckCircle size={42} style={{ color: 'var(--color-brand-purple)', marginBottom: '0.75rem' }} />
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Registration Confirmed!</strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>Confirmation email and official tax invoice have been sent. See you at HRWest 2027 in South San Francisco!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {[
                    { label: 'Full Name', type: 'text', placeholder: 'e.g. Rachel Adams' },
                    { label: 'Work Email', type: 'email', placeholder: 'rachel@company.com' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)', boxSizing: 'border-box' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                      />
                    </div>
                  ))}
                  <div className="responsive-grid-2" style={{ gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Job Title</label>
                      <input type="text" placeholder="VP of People" required style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Company</label>
                      <input type="text" placeholder="Acme Inc." required style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Number of Passes</label>
                    <input type="number" min="1" max="50" value={ticketCount} onChange={e => setTicketCount(parseInt(e.target.value) || 1)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1.5px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', boxSizing: 'border-box' }} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Complete Registration (${totalPrice.toLocaleString()}) <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-xl)', padding: '2rem', color: 'var(--color-text-primary)', position: 'relative', overflow: 'hidden', border: '1.5px solid var(--brand-glow-25)', boxShadow: 'var(--shadow-lg)' }}
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1.5px solid var(--brand-glow-18)', color: 'var(--color-brand-purple)' }}>Order Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
                  {[
                    { label: 'Pass Type', value: currentPass.name },
                    { label: 'Category', value: currentPass.category },
                    { label: 'Rate per Pass', value: `$${currentPass.earlyPrice}` },
                    { label: 'Quantity', value: `${ticketCount} Pass(es)` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>{row.label}</span>
                      <strong style={{ color: 'var(--color-text-primary)' }}>{row.value}</strong>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 900, borderTop: '1.5px solid var(--brand-glow-18)', paddingTop: '1rem' }}>
                    <span style={{ color: 'var(--color-text-primary)' }}>Total</span>
                    <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', border: '1.5px solid var(--brand-glow-15)', boxShadow: 'var(--shadow-sm)' }}>
                  <ShieldCheck size={22} style={{ flexShrink: 0, color: '#16a34a' }} />
                  <span style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>100% refundable pre-registration guarantee until January 30, 2027.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { icon: Calendar, text: 'June 9 & June 10, 2027' },
                    { icon: Award, text: '20+ SHRM & HRCI Recertification Credits' },
                    { icon: Users, text: '1,000+ HR Professionals' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      <Icon size={16} style={{ color: 'var(--color-brand-purple)' }} /> {text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
