import React, { useState } from 'react';
import { Mail, Copy, Check, FileText } from 'lucide-react';

export const ConvinceBossPage: React.FC = () => {
  const [attendeeName, setAttendeeName] = useState('Alex Morgan');
  const [bossName, setBossName] = useState('Sarah Jenkins');
  const [companyName, setCompanyName] = useState('Acme Corp');
  const [selectedTrack, setSelectedTrack] = useState('HR Strategy & AI');
  const [copied, setCopied] = useState(false);

  const generatedEmail = `Subject: Professional Development & Approval Request: HRWest 2027 Conference

Hi ${bossName},

I would like to request approval to attend HRWest 2027, taking place March 23–24, 2027 at the South San Francisco Conference Center.

Attending this 2-day conference will directly benefit ${companyName} by allowing me to gain actionable insights in ${selectedTrack}, legal compliance updates, and AI implementation strategies.

Here is a quick summary of the ROI for ${companyName}:
1. Recertification Credits: I will earn 20+ SHRM & HRCI recertification credits, saving on separate training courses.
2. High-Impact Sessions: Keynotes include global HR leader Jason Averbook and employment law authority Allison West, Esq.
3. Actionable Takeaways: I will bring back a post-conference debrief document and session slides to share with our entire HR team.

Estimated Expenses:
- Conference Pass: $995 (Early Bird Rate)
- Travel & Hotel: Minimal local Bay Area transit

Thank you for considering this investment in our HR capabilities. I look forward to discussing this with you.

Best regards,
${attendeeName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="section-padding" style={{ backgroundColor: '#f8fafc' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '3rem', maxWidth: '800px' }}>
          <span className="wireframe-badge" style={{ marginBottom: '0.75rem' }}>Employer Approval Toolkit</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Get Your Employer to Send You to HRWest 2027
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Need manager sign-off? Use our interactive ROI justification generator below to create a customized approval request email in under 60 seconds.
          </p>
        </div>

        {/* Generator Grid */}
        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Input Controls */}
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText color="#0284c7" size={20} /> Customize Your Justification Request
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Your Name</label>
                <input
                  type="text"
                  value={attendeeName}
                  onChange={e => setAttendeeName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Manager's Name</label>
                <input
                  type="text"
                  value={bossName}
                  onChange={e => setBossName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>Primary Focus Track</label>
                <select
                  value={selectedTrack}
                  onChange={e => setSelectedTrack(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #cbd5e1', borderRadius: '6px', backgroundColor: '#ffffff' }}
                >
                  <option>HR Strategy & AI</option>
                  <option>Legal & Compliance</option>
                  <option>HR Tech & Analytics</option>
                  <option>Talent Acquisition</option>
                  <option>Leadership & Culture</option>
                  <option>Health & Wellness</option>
                </select>
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="wireframe-box" style={{ backgroundColor: '#ffffff', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail color="#0284c7" size={20} /> Generated Email Preview
              </h3>
              <button
                onClick={copyToClipboard}
                className={copied ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Text</>}
              </button>
            </div>

            <textarea
              readOnly
              value={generatedEmail}
              style={{
                width: '100%',
                height: '320px',
                padding: '1rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                resize: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
