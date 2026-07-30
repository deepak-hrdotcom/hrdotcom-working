import React from 'react';
import { motion } from 'framer-motion';
import locationHero from '../assets/location_hero.png';
import { MapPin, Plane, Car, Train, Hotel, ExternalLink, Navigation } from 'lucide-react';

export const LocationPage: React.FC = () => {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>

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
          backgroundImage: `url(${locationHero})`,
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
            background: 'radial-gradient(circle, rgba(145,39,140,0.22) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-60px', left: '30%',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(239,20,110,0.18) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(50px)',
          }} />
        </div>

        {/* 4. Content grid */}
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
              textWrap: 'initial' as const,
            }}>
              South San<br />
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Francisco</span>
            </h1>

            <p style={{
              fontSize: '1rem', color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '400px',
              fontFamily: 'var(--font-body)', fontWeight: 400,
            }}>
              The South San Francisco Conference Center — minutes from SFO, with hotels, dining, and BART access on-site.
            </p>

            {/* CTA Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#map" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.65rem 1.5rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
              }}>
                Get Directions <Navigation size={15} />
              </a>
              <a href="#hotels" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.6rem 1.3rem',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem',
                textDecoration: 'none',
              }}>
                <Hotel size={14} /> Book Hotel
              </a>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating venue info card stack */}
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
              { icon: Plane, title: 'SFO Airport', detail: '12 min drive (3.5 miles)', rotate: '-2deg', offset: '0px', delay: 0.2 },
              { icon: Train, title: 'BART Transit', detail: 'Free shuttle from SSF Station', rotate: '1.5deg', offset: '16px', delay: 0.32 },
              { icon: Car, title: 'On-Site Parking', detail: 'Complimentary covered parking', rotate: '-1deg', offset: '8px', delay: 0.44 },
            ].map(({ icon: Icon, title, detail, rotate, offset, delay }, i) => (
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
                  background: 'rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.18)',
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
                  background: 'linear-gradient(135deg, rgba(239,20,110,0.25), rgba(145,39,140,0.35))',
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
                    fontSize: '0.7rem', color: 'rgba(255,255,255,0.65)',
                    fontFamily: 'var(--font-body)', fontWeight: 500
                  }}>
                    {detail}
                  </div>
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

      {/* ── Quick Travel Stats ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '3.5rem 0' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: Plane, title: 'Airport Access', stat: '5 min', desc: 'Only 3.5 miles north of SFO. Free airport shuttles available.' },
              { icon: Train, title: 'Public Transit', stat: 'BART Direct', desc: 'South San Francisco Station with connecting shuttle loops.' },
              { icon: Car, title: 'Parking', stat: 'Free', desc: 'Complimentary multi-level covered parking for all attendees.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem',
                    border: '1px solid var(--color-subtle)',
                    boxShadow: 'var(--shadow-sm)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 4px 14px rgba(145,39,140,0.3)' }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.75rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.3rem' }}>
                    {item.stat}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{item.title}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Hotel Deals ── */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 0 5rem' }}>
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(145,39,140,0.3)' }}>
                <Hotel size={22} color="#fff" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
                Official Partner Hotels & Discount Blocks
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '600px' }}>
              Discounted room rates secured for HRWest 2027 attendees. Reserve early before block rates expire.
            </p>
          </motion.div>

          <div className="grid-2">
            {[
              { name: 'Embassy Suites by Hilton SFO', address: '250 Gateway Blvd, South San Francisco, CA', rate: '$219', perks: 'Complimentary breakfast, evening reception, shuttle to venue' },
              { name: 'DoubleTree by Hilton SFO Bayfront', address: '835 Airport Blvd, Burlingame, CA', rate: '$199', perks: 'Bay views, pool, fitness center, 10 min from venue' },
            ].map((hotel, idx) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: 'var(--color-elevated)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem',
                  border: '1px solid var(--color-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-text-primary)' }}>{hotel.name}</h3>
                  <span className="badge badge-purple">{hotel.rate}/night</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>{hotel.address}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', padding: '0.75rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-brand-purple)' }}>
                  {hotel.perks}
                </div>
                <a href="#" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  Book Hotel Block <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map Embed Placeholder ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0' }}>
        <div className="container-wide" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{
              background: 'var(--gradient-brand-soft)',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              border: '1.5px solid rgba(145,39,140,0.2)',
              boxShadow: 'var(--shadow-md)',
            }}>
              <MapPin size={36} style={{ color: 'var(--color-brand-purple)', marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.5rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                South San Francisco Conference Center
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                255 South Airport Blvd, South San Francisco, CA 94080
              </p>
              <a href="https://maps.google.com/?q=South+San+Francisco+Conference+Center" target="_blank" rel="noreferrer" className="btn btn-primary">
                Open in Google Maps <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
