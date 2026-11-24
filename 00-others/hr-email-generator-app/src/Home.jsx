export default function Home({ go }) {
  return (
    <div className="home">
      <style>{CSS}</style>
      <div className="home-in">
        <p className="home-eyebrow">HR.com</p>
        <h1>Webcast Email Builder</h1>
        <p className="home-sub">Make a webcast promo email from the webcast page, ready for Google Drive.</p>
        <div className="home-cards">
          <button className="home-card main" onClick={() => go('create')}>
            <strong>Create Emailer</strong>
            <span>Step-by-step: pick the event type and design, paste the webcast page, and Claude writes the copy. Saves to Google Drive.</span>
          </button>
          <button className="home-card" onClick={() => go('manual')}>
            <strong>Manual mode</strong>
            <span>The previous editor: fill in every field yourself and use the Gemini prompt.</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const CSS = `
.home { min-height: 100vh; background: #F1F5F9; display: flex; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; color: #1E293B; }
.home-in { max-width: 760px; width: 100%; }
.home-eyebrow { margin: 0; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #02588E; }
.home h1 { font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; font-size: 32px; margin: 6px 0 8px; }
.home-sub { color: #64748B; margin: 0 0 28px; font-size: 15px; }
.home-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.home-card { text-align: left; background: #fff; border: 2px solid #E2E8F0; border-radius: 16px; padding: 24px; cursor: pointer; font: inherit; display: flex; flex-direction: column; gap: 8px; color: inherit; }
.home-card strong { font-size: 18px; font-family: 'Plus Jakarta Sans', 'Inter', sans-serif; }
.home-card span { font-size: 14px; color: #64748B; line-height: 1.5; }
.home-card:hover { border-color: #93C5FD; }
.home-card.main { background: #02588E; border-color: #02588E; color: #fff; }
.home-card.main span { color: #DBEAFE; }
.home-card.main:hover { background: #01436D; }
`;
