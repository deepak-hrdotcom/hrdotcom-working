import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import volunteerHero from '../assets/volunteer_hero.png';
import { HeartHandshake, CheckCircle, Send, Award, Calendar, Sparkles, ChevronRight, Gift, Users, ShieldCheck, Mail, Clock } from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

      {/* ══════════ CINEMATIC HERO ══════════ */}
      <section style={{
        position: 'relative',
        height: '460px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Full-bleed background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${volunteerHero})`,
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

        {/* Content grid */}
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
            }}>
              Volunteer &<br />
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Attend Free</span>
            </h1>

            <p style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '420px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              Commit to 8 hours of volunteer shifts and receive a complimentary full-conference pass for HRWest 2027.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#apply" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.75rem 1.6rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.86rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
              }}>
                Apply to Volunteer <ChevronRight size={15} />
              </a>
              <a href="#email-apply" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.35rem',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.84rem',
                textDecoration: 'none',
              }}>
                <Mail size={14} /> Contact Us Direct
              </a>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Volunteer perks card stack */}
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
              { icon: Gift, title: 'Free Full Pass', desc: 'Complimentary ticket for 8 hr shift', rotate: '-2deg', offset: '0px', delay: 0.2 },
              { icon: Users, title: 'Peer Networking', desc: 'Connect with Bay Area HR leaders', rotate: '1.5deg', offset: '16px', delay: 0.32 },
              { icon: ShieldCheck, title: 'Event Operations', desc: 'Hands-on conference experience', rotate: '-1deg', offset: '8px', delay: 0.44 },
            ].map(({ icon: Icon, title, desc, rotate, offset, delay }, i) => (
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
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(239,20,110,0.3), rgba(145,39,140,0.4))',
                  border: '1px solid rgba(239,20,110,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={19} color="#ff6ba0" />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '0.86rem', color: '#fff', marginBottom: '0.15rem'
                  }}>
                    {title}
                  </div>
                  <div style={{
                    fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'var(--font-body)', fontWeight: 500
                  }}>
                    {desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAM DETAILS & DIRECT EMAIL APPLY SECTION (MATCHING LIVE SITE) ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0 5rem' }}>
        <div className="container-wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}>

            {/* LEFT COLUMN: LIVE SITE PROGRAM CONTENT */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={13} /> HRWest Volunteer Program
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
                Join the HRWest Team & Attend for Free
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Block 1 */}
                <div style={{ background: 'var(--color-elevated)', padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Gift size={18} color="var(--color-brand-purple)" /> Free Conference Pass Opportunity
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    HR professionals can enjoy the HRWest conference for free by joining our Volunteer Program. Volunteers receive a <strong>free conference pass</strong> for committing to a minimum of <strong>8 hours in volunteer shifts</strong> during the course of the conference.
                  </p>
                </div>

                {/* Block 2 */}
                <div style={{ background: 'var(--color-elevated)', padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HeartHandshake size={18} color="var(--color-brand-pink)" /> Why Volunteer With Us?
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                    This is a great option if the registration fee is over your budget, if your company won't support your attendance, or if you'd just like to play a key role in making the conference a success. It's also an incredible way to network and meet new HR friends.
                  </p>
                </div>

                {/* Block 3 */}
                <div style={{ background: 'var(--color-elevated)', padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={18} color="var(--color-brand-purple)" /> Roles & Duties
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                    Volunteers will help with badge checking, room monitoring, speaker introductions, providing direction, roundtable management, and being friendly faces around the event.
                  </p>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-brand-purple)', fontWeight: 600, background: 'var(--gradient-brand-soft)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-brand-purple)' }}>
                    ✨ You may attend any session on the day(s) you volunteer, and room monitors can watch all live presentations while on duty!
                  </div>
                </div>

                {/* Orientation requirement */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                  <Clock size={16} color="var(--color-brand-purple)" /> Note: Volunteers are required to attend a brief virtual orientation session prior to the conference.
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: DIRECT EMAIL CARD (MATCHING SCREENSHOT) + FORM */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Direct Email Application Card (Screenshot Replica) */}
              <motion.div
                id="email-apply"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: 'var(--gradient-brand-soft)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2.25rem 2rem',
                  border: '1.5px solid rgba(145,39,140,0.25)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 14px rgba(145,39,140,0.3)' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', color: 'var(--color-text-primary)', margin: 0 }}>
                      Want to Volunteer at HRWest?
                    </h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-purple)', fontWeight: 700 }}>Direct Email Application</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.94rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  Awesome! Simply send an email to us at <a href="mailto:hrwest@hr.com?subject=Interested%20in%20volunteering%20at%20HRWest" style={{ color: 'var(--color-brand-pink)', fontWeight: 800, textDecoration: 'underline' }}>hrwest@hr.com</a> with the subject line <em>"Interested in volunteering at HRWest,"</em> and we’ll put you directly on our official volunteer list.
                </p>

                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  We encourage you to reach out even if you can't 100% commit at this time — we'd be happy to keep you updated on shift schedules. We hope you can join us!
                </p>

                <a
                  href="mailto:hrwest@hr.com?subject=Interested%20in%20volunteering%20at%20HRWest"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  Contact Us (Email hrwest@hr.com) <Mail size={16} />
                </a>
              </motion.div>

              {/* Online Application Form */}
              <motion.div
                id="apply"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.25rem 2rem', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-sm)' }}
              >
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <HeartHandshake size={20} style={{ color: 'var(--color-brand-purple)' }} /> Quick Online Application
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  Or submit your details below and our team will get in touch:
                </p>

                {submitted ? (
                  <div style={{ padding: '1.75rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(145,39,140,0.2)' }}>
                    <CheckCircle size={36} style={{ color: 'var(--color-brand-purple)', marginBottom: '0.5rem' }} />
                    <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', display: 'block', marginBottom: '0.35rem', color: 'var(--color-text-primary)' }}>Application Received!</strong>
                    <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      Thank you for volunteering for HRWest 2027. We will contact you within 2 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    {[
                      { label: 'Full Name', type: 'text', placeholder: 'e.g. Sarah Jenkins' },
                      { label: 'Email Address', type: 'email', placeholder: 'sarah@company.com' },
                      { label: 'Current HR Title / Organization', type: 'text', placeholder: 'e.g. HR Generalist, Acme Corp' },
                    ].map(f => (
                      <div key={f.label}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.3rem' }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} required style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)' }}
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.3rem' }}>Preferred Shift Availability</label>
                      <select style={{ width: '100%', padding: '0.7rem 0.9rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', cursor: 'pointer' }}>
                        <option>Day 1 Morning (June 9, 2026)</option>
                        <option>Day 1 Afternoon (June 9, 2026)</option>
                        <option>Day 2 Morning (June 10, 2026)</option>
                        <option>Day 2 Afternoon (June 10, 2026)</option>
                        <option>Full Conference Both Days (June 9 & 10)</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-md" style={{ width: '100%', marginTop: '0.4rem' }}>
                      Submit Volunteer Application <Send size={16} />
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
