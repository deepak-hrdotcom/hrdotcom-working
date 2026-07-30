import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, ShieldCheck, ArrowRight, CheckCircle, Award, Calendar, Users, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<'early' | 'team' | 'virtual'>('early');
  const [ticketCount, setTicketCount] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);

  const tiers = [
    {
      key: 'early' as const,
      name: 'Super Early Bird',
      price: 995,
      desc: 'Individual 2-Day All-Access Pass',
      badge: 'Best Value',
      features: ['All Keynotes & 50+ Breakout Sessions', '20+ SHRM & HRCI Credits', 'Full Sponsor Hall Access & Meals', 'Post-Event Session Recordings'],
      popular: true,
    },
    {
      key: 'team' as const,
      name: 'Team Group Pass (3+)',
      price: 845,
      desc: 'Discounted rate for 3+ team members',
      badge: 'Team Savings',
      features: ['Everything in Early Bird', '15% to 35% Team Discount', 'Post-Event Team Debrief Kit', 'Priority Group Seating'],
      popular: false,
    },
    {
      key: 'virtual' as const,
      name: 'Virtual Live Pass',
      price: 495,
      desc: 'Online Livestream & On-Demand Access',
      badge: 'Remote',
      features: ['Live Keynote Livestream', 'On-Demand Session Recordings', 'Digital SHRM/HRCI Certificate', 'Virtual Networking Lounge'],
      popular: false,
    },
  ];

  const currentTier = tiers.find(t => t.key === selectedTier)!;
  const totalPrice = currentTier.price * ticketCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: '100%' }}>

      {/* ── Hero Banner ── */}
      <section style={{ background: 'var(--gradient-brand)', padding: '5rem 0 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
        <div className="container-wide" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.2)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', color: '#ffffff', marginBottom: '1.25rem' }}>
              <Ticket size={13} /> Secure Pre-Registration
            </span>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '0.75rem' }}>
              Pre-Register for HRWest 2027
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Lock in Super Early Bird pricing. Full access to 50+ sessions, 20+ SHRM/HRCI credits, and world-class networking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Tier Cards ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0 2rem' }}>
        <div className="container-wide">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {tiers.map((tier, idx) => {
              const isSelected = selectedTier === tier.key;
              return (
                <motion.div
                  key={tier.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedTier(tier.key)}
                  style={{
                    background: 'var(--color-elevated)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2.25rem',
                    border: isSelected ? '2px solid var(--color-brand-purple)' : '1px solid var(--color-subtle)',
                    boxShadow: isSelected ? '0 8px 30px rgba(145,39,140,0.18)' : 'var(--shadow-sm)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'var(--transition-base)',
                  }}
                >
                  {tier.popular && (
                    <div style={{
                      position: 'absolute', top: '14px', right: '14px',
                    }}>
                      <span className="badge badge-purple"><Sparkles size={11} /> Most Popular</span>
                    </div>
                  )}
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--gradient-brand)' }} />
                  )}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{tier.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      ${tier.price}
                    </span>
                    {tier.key === 'team' && <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>/ ticket</span>}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{tier.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {tier.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle size={16} style={{ color: 'var(--color-brand-purple)', flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Checkout Form + Order Summary ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '2rem 0 5rem' }}>
        <div className="container-wide">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ background: 'var(--color-elevated)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', border: '1px solid var(--color-subtle)', boxShadow: 'var(--shadow-md)' }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Ticket size={22} style={{ color: 'var(--color-brand-purple)' }} /> Attendee Information
              </h3>

              {submitted ? (
                <div style={{ padding: '2rem', background: 'var(--gradient-brand-soft)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(145,39,140,0.2)' }}>
                  <CheckCircle size={40} style={{ color: 'var(--color-brand-purple)', marginBottom: '0.75rem' }} />
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Pre-Registration Confirmed!</strong>
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                    Confirmation email and invoice have been sent. See you March 23–24 in South San Francisco!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                  {[
                    { label: 'Full Name', type: 'text' },
                    { label: 'Work Email', type: 'email' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>{f.label}</label>
                      <input type={f.type} required style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)', outline: 'none', transition: 'var(--transition-fast)' }}
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--color-brand-purple)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--color-subtle)'}
                      />
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Job Title</label>
                      <input type="text" required style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Company</label>
                      <input type="text" required style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Number of Tickets</label>
                    <input type="number" min="1" max="50" value={ticketCount} onChange={e => setTicketCount(parseInt(e.target.value) || 1)} style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--color-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontFamily: 'var(--font-body)', background: 'var(--color-canvas)' }} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Complete Pre-Registration (${totalPrice.toLocaleString()}) <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: 'var(--gradient-brand)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>
                  Order Summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
                  {[
                    { label: 'Pass Type', value: currentTier.name },
                    { label: 'Rate per Ticket', value: `$${currentTier.price}` },
                    { label: 'Quantity', value: `${ticketCount} Ticket(s)` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                      <span style={{ color: 'rgba(255,255,255,0.75)' }}>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: '1rem' }}>
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <ShieldCheck size={22} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                    100% refundable pre-registration guarantee until January 30, 2027.
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {[
                    { icon: Calendar, text: 'March 23–24, 2027' },
                    { icon: Award, text: '20+ SHRM & HRCI Credits' },
                    { icon: Users, text: '1,000+ HR Professionals' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)' }}>
                      <Icon size={16} /> {text}
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
