import React from 'react';
import { motion } from 'framer-motion';
import locationHero from '../assets/location_hero.png';
import { MapPin, Plane, Car, Train, Hotel, ExternalLink, Navigation, Sparkles } from 'lucide-react';

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

      {/* ── Seamless Brand-Aligned Venue Spotlight Card ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '3.5rem 0 1.5rem' }}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'var(--color-elevated)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid rgba(145,39,140,0.2)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '0',
            }}
          >
            {/* LEFT: Premium Brand Gradient & Golden Gate Bridge Photo Overlay Tile */}
            <div style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '3rem 2.5rem',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '340px',
            }}>
              {/* Gradient Overlay for Brand Colors & Crisp Contrast */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(239,20,110,0.82) 0%, rgba(145,39,140,0.92) 100%)',
              }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.1em', background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(10px)', padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)', marginBottom: '1.5rem',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                }}>
                  <Sparkles size={12} /> Silicon Valley 2027
                </span>

                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', opacity: 0.95, lineHeight: 1.1 }}>
                  San Francisco
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 3.6rem)', letterSpacing: '-0.04em', lineHeight: 1, margin: '0.2rem 0 1rem 0', color: '#ffffff' }}>
                  California
                </h2>
              </div>

              <div style={{
                position: 'relative', zIndex: 2,
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.25)',
                fontSize: '0.9rem',
                fontWeight: 600,
                opacity: 0.95,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <MapPin size={16} /> South San Francisco Conference Center
              </div>
            </div>

            {/* RIGHT: Detailed Copy & Action CTAs */}
            <div style={{ padding: '3.25rem 2.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="eyebrow" style={{ marginBottom: '0.5rem', color: 'var(--color-brand-purple)' }}>
                Venue & Accommodation Overview
              </span>
              
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--color-text-secondary)',
                marginBottom: '2rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}>
                We’re thrilled to bring the <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>HRWest Conference</strong> back to the San Francisco Bay Area! Hosted at the modern <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>South San Francisco Conference Center</strong>, with our official partner hotel at the <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>DoubleTree by Hilton San Francisco Airport North Bayfront</strong> just steps away — offering a seamless setting for learning, executive networking, and team growth.
              </p>

              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <a href="#map" className="btn btn-primary btn-sm">
                  View Map & Directions <MapPin size={15} />
                </a>
                <a href="#hotels" className="btn btn-outline btn-sm">
                  Book Hotel Group Rate <Hotel size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Travel Stats ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2.5rem 0 3.5rem' }}>
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

      {/* ── Hotel Deals & Parking Details ── */}
      <section style={{ background: 'var(--color-surface)', padding: '4rem 0 5rem' }}>
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(145,39,140,0.3)' }}>
                <Hotel size={22} color="#fff" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
                Official Accommodations & Dining Guide
              </h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', maxWidth: '600px' }}>
              Special group room rates and nearby amenities for HRWest 2027 attendees.
            </p>
          </motion.div>

          <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
            {/* Official Hotel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{
                background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2rem',
                border: '1.5px solid rgba(145, 39, 140, 0.25)', boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-text-primary)' }}>
                  DoubleTree by Hilton San Francisco South Airport Blvd
                </h3>
                <span className="badge badge-purple">Official Hotel</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                275 South Airport Blvd, South San Francisco, CA 94080 • Tel: +1 650-873-3550
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', padding: '0.75rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-brand-purple)' }}>
                Steps away from the conference center • Bayfront walking paths • On-site dining & lounge • Fitness center
              </div>
              <a href="tel:+16508733550" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                Contact Hotel for Group Rate <ExternalLink size={14} />
              </a>
            </motion.div>

            {/* Dining & Cafes Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2rem',
                border: '1.5px solid rgba(239, 20, 110, 0.2)', boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                Nearby Restaurants & Cafes Guide
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Explore curated dining options, coffee shops, and lunch spots within walking distance or a short drive from the South San Francisco Conference Center.
              </p>
              <a
                href="https://drive.google.com/file/d/1z1sFpPJC-fvZcnRpm2xKzJ_svqWfCwt9/view"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                View Restaurants & Cafes Guide <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>

          {/* Parking & Transit Information Box */}
          <div style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--color-subtle)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Car size={20} style={{ color: 'var(--color-brand-purple)' }} /> Parking & Shuttles Information
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
              <strong>Complimentary Parking:</strong> Free shared parking is available across the South San Francisco Conference Center, Park Pointe Hotel, and DoubleTree Hotel lots, plus an off-site lot located between Travelodge and Best Western Plus Grosvenor Hotel. No permit or validation required.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
              <strong>Public Transit Shuttles:</strong> Free commuter shuttles run Monday through Friday during commute hours connecting the Conference Center directly to the South San Francisco BART Station, CalTrain Station, and Ferry Terminal.
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive Map Embed ── */}
      <section id="map" style={{ background: 'var(--color-canvas)', padding: '4rem 0' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-brand-purple)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <MapPin size={14} /> Venue Location
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', letterSpacing: '-0.02em', margin: 0 }}>
              South San Francisco Conference Center
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
              255 South Airport Blvd, South San Francisco, CA 94080
            </p>
          </div>

          <div style={{
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '2px solid rgba(145,39,140,0.2)',
            boxShadow: 'var(--shadow-md)',
            height: '420px',
          }}>
            <iframe
              title="South San Francisco Conference Center Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.0741560366914!2d-122.4043781!3d37.647460599999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f79b47d5d81ad%3A0xfd9c1f0af6155a3d!2sSouth%20San%20Francisco%20Conference!5e0!3m2!1sen!2sin!4v1773852453849!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
