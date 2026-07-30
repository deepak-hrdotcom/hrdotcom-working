import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sponsorsHero from '../assets/sponsors_hero.png';
import { ArrowRight, Sparkles, ChevronRight, Download, ExternalLink } from 'lucide-react';

interface SponsorLogo {
  name: string;
  logo: string;
  url: string;
}

const ALL_SPONSORS: SponsorLogo[] = [
  { name: "SAP SuccessFactors", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/sap-sf-1382x167.png", url: "https://www.hr.com/directory/company/sap_successfactors_4" },
  { name: "UKG", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/ukg-logo.jpg", url: "https://www.hr.com/directory/company/ukg_ultimate_kronos_group__2" },
  { name: "Robert Half", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/robert-half-logo.jpg", url: "https://www.hr.com/directory/company/robert_half_intl_inc_1" },
  { name: "Insperity", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/insperity-logo.jpg", url: "https://www.hr.com/directory/company/insperity_28" },
  { name: "Alliant Insurance", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/alliant-logo.jpg", url: "https://www.hr.com/directory/company/alliant_insurance_services" },
  { name: "Built", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/built-logo.jpg", url: "https://www.hr.com/directory/company/built__1" },
  { name: "GuidedChoice", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/guidedchoice-logo.jpg", url: "https://www.hr.com/directory/company/guidedchoice" },
  { name: "HRCP", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/hrcp-logo.jpg", url: "https://www.hr.com/directory/company/hrcp_1" },
  { name: "HUB International", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/hub-logo.jpg", url: "https://www.hr.com/directory/company/hub_international_ltd_2" },
  { name: "Pacific Service Credit Union", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/pacific-service-logo.jpg", url: "https://www.hr.com/directory/company/pacific_service_credit_union_2" },
  { name: "PerformYard", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/performyard-logo.jpg", url: "https://www.hr.com/directory/company/performyard_1" },
  { name: "ScholarShare 529", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/scholarshare-logo.jpg", url: "https://www.hr.com/directory/company/scholarshare_529" },
  { name: "The FruitGuys", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/the-fruitguys-logo.jpg", url: "https://www.hr.com/directory/company/the_fruitguys" },
  { name: "United Concordia Dental", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/united-concordia-dental-logo.jpg", url: "https://www.hr.com/directory/company/united_concordia_dental" },
  { name: "Xobin", logo: "https://public-cdn.hr.com/remoteimages/website-images/Vendor_SplashPages/2026-awards/xobin-logo.jpg", url: "https://www.hr.com/directory/company/xobin" },
  { name: "V.A. Brown Consulting", logo: "https://public-cdn.hr.com/remoteimages/website-images/Vendor_SplashPages/2026-awards/va-brown-logo.jpg", url: "https://www.hr.com/directory/company/v_a_brown_consulting_3" },
  { name: "AwardCo", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/awardco-logo.jpg", url: "https://www.hr.com/directory/company/awardco_1" },
  { name: "Zapier", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/zapier-logo.jpg", url: "https://www.hr.com/directory/company/zapier_1" },
  { name: "LHH", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/lhh-logo.jpg", url: "https://www.hr.com/directory/company/lee_hecht_harrison_knightsbridge_2" },
  { name: "ChangeEngine", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/change-engine-logo.jpg", url: "https://www.hr.com/directory/company/changeengine" },
  { name: "Stadium", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/stadium-logo.jpg", url: "https://www.hr.com/directory/company/stadium" },
  { name: "Wellify", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/wellify-logo.jpg", url: "https://www.hr.com/directory/company/wellify_app" },
  { name: "ComplyEQ", logo: "https://public-cdn.hr.com/remoteimages/website-images/2026_siteupdate/hrwest-2026/complyeq-logo.jpg", url: "https://www.hr.com/directory/company/complyeq" },
  { name: "Bay Area Commuter Benefits", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-bay-area-commuter-benefits-program-logo.jpg", url: "https://www.hr.com/directory/company/bay_area_commuter_benefits_program_1" },
  { name: "Corporate Traditions", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-corporate-traditions-logo.jpg", url: "https://www.hr.com/directory/company/corporate_traditions" },
  { name: "Express Evaluations", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-express-evaluations-logo.jpg", url: "https://www.hr.com/directory/company/express_evaluations_1" },
  { name: "Performance Pro", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-performance-pro-logo.jpg", url: "https://www.hr.com/directory/company/hr_performance_solutions" },
  { name: "RXBenefits", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-rxbenefits-logo.jpg", url: "https://www.hr.com/directory/company/rxbenefits" },
  { name: "VM Mastered", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-vm-mastered-logo.jpg", url: "https://www.hr.com/directory/company/vm_mastered_llc" },
  { name: "Wave Life", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-wave-logo.jpg", url: "https://www.hr.com/directory/company/wave_life_inc_" },
  { name: "Teamtailor", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-teamtailor-logo.jpg", url: "https://www.hr.com/directory/company/teamtailor" },
  { name: "CandorIQ", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-candor-logo.png", url: "https://www.hr.com/directory/company/candoriq_1" },
  { name: "Akwentis", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-akwentis-logo.png", url: "https://www.hr.com/directory/company/akwentis_llc" },
  { name: "Tremendous", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-tremendous-logo.jpg", url: "https://www.hr.com/directory/company/tremendous" },
  { name: "Printfection", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-printfection-logo.jpg", url: "https://www.hr.com/directory/company/printfection_1" },
  { name: "OneSpan", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-onespan2-logo.jpg", url: "https://www.hr.com/directory/company/onespan_1" },
  { name: "Center for Respectful Leadership", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-CRL-logo.jpg", url: "https://www.hr.com/directory/company/the_center_for_respectful_leadership" },
  { name: "Nava Benefits", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-nava-logo.jpg", url: "https://www.hr.com/directory/company/nava_benefits" },
  { name: "Tango", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-tango-logo.jpg", url: "https://www.hr.com/directory/company/tango_card" },
  { name: "Cypress Resilience", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-cypress-resilience-project-logo.jpg", url: "https://www.hr.com/directory/company/cypress_resilience_project" },
  { name: "Ramsey SmartDollar", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-ramsey-smartdollar-logo.jpg", url: "https://www.hr.com/directory/company/smartdollar__ramsey_solutions" },
  { name: "OrgChart", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-orgchart-logo.jpg", url: "https://www.hr.com/directory/company/orgchart" },
  { name: "Rocket Station", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-rocket-station-logo.jpg", url: "https://www.hr.com/directory/company/rocket_station_1" },
  { name: "Sparrow", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-sparrow-logo.jpg", url: "https://www.hr.com/directory/company/sparrow" },
  { name: "Inspira Financial", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-inspira-financial-logo.jpg", url: "https://www.hr.com/directory/company/inspira_financial__1" },
  { name: "Scalis", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-scalis-logo.jpg", url: "https://www.hr.com/directory/company/scalis" },
  { name: "Spot Pet Insurance", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-spot-pet-insurance-logo.jpg", url: "https://www.hr.com/directory/company/spot_pet_insurance" },
  { name: "SimpliVerified", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-simpli-verified-logo.jpg", url: "https://www.hr.com/directory/company/simpliverified_1" },
  { name: "Brown & Brown", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-brown-and-brown-logo.jpg", url: "https://www.hr.com/directory/company/brown__brown_2" },
  { name: "Genomic Life", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-genomic-life-logo.jpg", url: "https://www.hr.com/directory/company/genomic_life" },
  { name: "OneDigital", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-onedigital-logo.jpg", url: "https://www.hr.com/directory/company/onedigital_4" },
  { name: "WorkBright", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-workbright-logo.jpg", url: "https://www.hr.com/directory/company/workbright_1" },
  { name: "RemoFirst", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-remofirst-logo.jpg", url: "https://www.hr.com/directory/company/remofirst" },
  { name: "Benepass", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-benepass-logo.jpg", url: "https://www.hr.com/directory/company/benepass" },
  { name: "Bevi", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/hr-west-hr-conference-sponsor-bevi-logo.jpg", url: "https://www.hr.com/directory/company/bevi_1" },
  { name: "AlignHQ", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-AlignHQ-Logo.webp", url: "https://www.hr.com/buyersguide/company/alignhq" },
  { name: "McAfee", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-McAfee-Digital-Wellness-Logo.webp", url: "https://www.hr.com/buyersguide/company/mcafee" },
  { name: "Take Command", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-HR-Conference-Sponsor-Take-Command-Logo.webp", url: "https://www.hr.com/buyersguide/company/take_command_health" },
  { name: "Motus", logo: "https://public-cdn.hr.com/remoteimages/website-images/2023_siteupdate/HR-west-2024/images/sponsor-logos/HR-West-Conference-Sponsor-Motus-Logo.jpg", url: "https://www.hr.com/buyersguide/company/motus" },
];

export const SponsorHallPage: React.FC = () => {
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
          backgroundImage: `url(${sponsorsHero})`,
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
            {/* Title in ONE SINGLE LINE */}
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(2rem, 3.5vw, 3.4rem)',
              letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#fff',
              marginBottom: '1rem',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}>
              HRWest{' '}
              <span style={{
                background: 'linear-gradient(135deg, #e07ee0 0%, #ef146e 60%, #ff6ba0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Sponsors</span>
            </h1>

            <p style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.5, marginBottom: '2rem', maxWidth: '420px',
              fontFamily: 'var(--font-body)', fontWeight: 500,
            }}>
              Companies that have used HRWest to connect with the West Coast HR community.
            </p>

            {/* CTA Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/why-sponsor" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                background: 'linear-gradient(135deg, #91278c, #ef146e)',
                color: '#fff', borderRadius: 'var(--radius-full)',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.88rem',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(239,20,110,0.45)',
                transition: 'all 0.25s ease',
              }}>
                <Download size={16} /> Download Sponsorship Brochure
              </Link>
            </div>
          </motion.div>

          {/* CENTRE: Empty spacer */}
          <div />

          {/* RIGHT: Floating Sponsor Logo Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              position: 'relative', height: '360px', width: '100%', display: 'flex',
              flexDirection: 'column', justifyContent: 'center'
            }}
          >
            {[
              { sp: ALL_SPONSORS[0], offset: '0px', rotate: '-2deg', delay: 0.2 },
              { sp: ALL_SPONSORS[1], offset: '16px', rotate: '1.5deg', delay: 0.3 },
              { sp: ALL_SPONSORS[2], offset: '8px', rotate: '-1deg', delay: 0.4 },
              { sp: ALL_SPONSORS[3], offset: '20px', rotate: '2deg', delay: 0.5 },
            ].map(({ sp, offset, rotate, delay }, i) => (
              <motion.div
                key={sp.name}
                initial={{ opacity: 0, y: 20, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  top: `${i * 85 + 10}px`,
                  left: offset,
                  width: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(24px)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.25rem',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                  zIndex: 4 - i,
                  height: '75px',
                }}
              >
                <img src={sp.logo} alt={sp.name} style={{ maxHeight: '48px', maxWidth: '200px', objectFit: 'contain' }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SPONSOR LOGO WALL GRID (LOGO ONLY, NO NAMES, NO TIERS) ── */}
      <section style={{ background: 'var(--color-canvas)', padding: '4rem 0 6rem' }}>
        <div className="container-wide">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={13} /> Trusted Enterprise Partners
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
              Past HRWest Sponsors & Exhibitors
            </h2>
          </div>

          {/* Logo Wall Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}>
            {ALL_SPONSORS.map((sponsor, idx) => (
              <motion.a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 8) * 0.03 }}
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(145,39,140,0.18)', borderColor: 'rgba(145,39,140,0.35)' }}
                style={{
                  background: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1.5px solid var(--color-subtle)',
                  padding: '2.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '120px',
                  boxShadow: 'var(--shadow-sm)',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  style={{
                    maxHeight: '65px',
                    maxWidth: '170px',
                    objectFit: 'contain',
                    filter: 'grayscale(10%) contrast(105%)',
                    transition: 'all 0.25s ease',
                  }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </motion.a>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div style={{ marginTop: '5rem', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'var(--gradient-brand-soft)',
                border: '1.5px solid rgba(145,39,140,0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: '3rem 2.5rem',
                maxWidth: '850px',
                margin: '0 auto',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.6rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
                Partner with HRWest 2027
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 1.75rem auto', lineHeight: 1.6 }}>
                Connect directly with over 1,000+ HR directors, CHROs, and talent executives in Silicon Valley.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/why-sponsor" className="btn btn-primary btn-lg">
                  Download Sponsorship Brochure <Download size={18} />
                </Link>
                <Link to="/register" className="btn btn-outline btn-lg">
                  Pre-Register for 2027 <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SponsorHallPage;
