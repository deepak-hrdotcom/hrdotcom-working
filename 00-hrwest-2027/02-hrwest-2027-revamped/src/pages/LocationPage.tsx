import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Car, Train, Hotel, ExternalLink } from 'lucide-react';

export const LocationPage: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner with Venue Image ── */}
      <section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://public-cdn.hr.com/remoteimages/website-images/2024_Siteupdate/HRWest-2025/images/hrwest-sponsors-page-banner-image.webp"
            alt="South San Francisco Conference Center"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(145,39,140,0.88), rgba(239,20,110,0.75))' }} />
        </div>
        <div className="container-wide" style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <MapPin size={13} /> Venue & Travel Logistics
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem' }}>
              South San Francisco Conference Center
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', lineHeight: 1.7 }}>
              Located in the heart of Silicon Valley's biotech corridor, just minutes from SFO airport with BART direct access.
            </p>
          </motion.div>
        </div>
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
