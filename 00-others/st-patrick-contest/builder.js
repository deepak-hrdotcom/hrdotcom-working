const fs = require('fs');

let content = fs.readFileSync('e:/HR/00-html/st-patrick-contest/index.html', 'utf-8');

const classesToPrefix = [
    'inner', 'rainbow-rule', 'dots', 'btn-gold', 'btn-outline-white',
    'btn-white-solid', 'btn-pill', 'btn-lg', 'btn', 'sr-only', 'hero-copy',
    'hero-logo', 'hero-decos', 'hero-headline', 'hero-subhead', 'hero-date',
    'hero-actions', 'hero-visual', 'hero-img', 'hero', 'emoji', 'prize-band-heading',
    'prize-band-meta', 'prize-band-item',
    'prize-band-sep', 'prize-band-value', 'prize-band', 'pot', 'guarantee-grid',
    'guarantee-trust', 'guarantee-tag', 'guarantee-heading', 'guarantee-points',
    'guarantee-point-icon', 'guarantee-point-text', 'guarantee-point',
    'guarantee-action', 'guarantee-divider', 'guarantee', 'action-eyebrow', 'action-heading', 'action-cta',
    'action-notify', 'date-hl', 'certs-label',
    'certs-pills', 'cert-pill', 'certs-conditions', 'certs', 'leadgen-card',
    'leadgen-heading', 'leadgen', 'contact-heading', 'contact-row',
    'contact-item', 'contact-ico', 'contact'
];

classesToPrefix.forEach(cls => {
    // Replace in CSS selectors e.g., .cls or .cls:hover
    const cssRegex = new RegExp(`\\.${cls}(\\b|:)`, 'g');
    content = content.replace(cssRegex, `.spc-${cls}$1`);

    // Replace in HTML class=""
    const htmlRegex = new RegExp(`class="([^"]*)(\\b${cls}\\b)([^"]*)"`, 'g');
    content = content.replace(htmlRegex, `class="$1spc-${cls}$3"`);
    content = content.replace(htmlRegex, `class="$1spc-${cls}$3"`);
});

const resetCSS = `
        /* ── Strict CMS Reset for Semantic Elements ───────────────── */
        #st-patrick-contest,
        #st-patrick-contest * {
            box-sizing: border-box;
        }
        
        #st-patrick-contest h1, #st-patrick-contest h2, #st-patrick-contest h3,
        #st-patrick-contest h4, #st-patrick-contest h5, #st-patrick-contest h6,
        #st-patrick-contest p, #st-patrick-contest a, #st-patrick-contest span,
        #st-patrick-contest div, #st-patrick-contest header, #st-patrick-contest footer,
        #st-patrick-contest section, #st-patrick-contest article, #st-patrick-contest main,
        #st-patrick-contest aside, #st-patrick-contest nav, #st-patrick-contest figure,
        #st-patrick-contest figcaption, #st-patrick-contest ul, #st-patrick-contest ol,
        #st-patrick-contest li {
            margin: 0;
            padding: 0;
            font-family: inherit;
            vertical-align: baseline;
            background: transparent;
            border: 0;
            outline: 0;
            list-style: none;
            text-decoration: none;
            max-width: none;
        }

        #st-patrick-contest img, #st-patrick-contest svg {
            display: block;
            width: auto;
            height: auto;
            max-width: 100%;
            margin: 0;
            padding: 0;
            border: 0;
        }

        /* ── Hardcoded CSS Variables per Screen Size ───────────────── */
        #st-patrick-contest {
            /* Mobile (base) */
            --pad-x: 16px;
            --section-y: 40px;
            --fs-base: 14px;
            --fs-hero-title: 32px;
            --fs-hero-sub: 19px;
            --fs-hero-date: 14px;
            --fs-prize-title: 22px;
            --fs-prize-item: 14px;
            --fs-guarantee-title: 25px;
            --fs-guarantee-tag: 11px;
            --fs-guarantee-pt: 15px;
            --fs-action-title: 16px;
            --fs-certs-label: 12px;
            --fs-cert-pill: 14px;
            --fs-leadgen-title: 20px;
            --fs-contact-title: 17px;
            --fs-contact-item: 15px;
        }

        @media (min-width: 600px) {
            #st-patrick-contest {
                --pad-x: 24px; --section-y: 50px;
                --fs-base: 14px;
                --fs-hero-title: 38px; --fs-hero-sub: 22px; --fs-hero-date: 15px;
                --fs-prize-title: 28px; --fs-prize-item: 15px;
                --fs-guarantee-title: 30px; --fs-guarantee-tag: 11px; --fs-guarantee-pt: 16px;
                --fs-action-title: 18px;
                --fs-certs-label: 12px; --fs-cert-pill: 15px;
                --fs-leadgen-title: 24px;
                --fs-contact-title: 19px; --fs-contact-item: 15px;
            }
        }
        @media (min-width: 900px) {
            #st-patrick-contest {
                --pad-x: 32px; --section-y: 60px;
                --fs-base: 15px;
                --fs-hero-title: 45px; --fs-hero-sub: 26px; --fs-hero-date: 16px;
                --fs-prize-title: 34px; --fs-prize-item: 16px;
                --fs-guarantee-title: 36px; --fs-guarantee-tag: 12px; --fs-guarantee-pt: 17px;
                --fs-action-title: 20px;
                --fs-certs-label: 13px; --fs-cert-pill: 16px;
                --fs-leadgen-title: 28px;
                --fs-contact-title: 22px; --fs-contact-item: 16px;
            }
        }
        @media (min-width: 1200px) {
            #st-patrick-contest {
                --pad-x: 40px; --section-y: 70px;
                --fs-base: 16px;
                --fs-hero-title: 55px; --fs-hero-sub: 32px; --fs-hero-date: 17px;
                --fs-prize-title: 42px; --fs-prize-item: 18px;
                --fs-guarantee-title: 44px; --fs-guarantee-tag: 13px; --fs-guarantee-pt: 18px;
                --fs-action-title: 22px;
                --fs-certs-label: 14px; --fs-cert-pill: 18px;
                --fs-leadgen-title: 34px;
                --fs-contact-title: 26px; --fs-contact-item: 16px;
            }
        }
        @media (min-width: 1600px) {
            #st-patrick-contest {
                --pad-x: 48px; --section-y: 80px;
                --fs-base: 16px;
                --fs-hero-title: 60px; --fs-hero-sub: 35px; --fs-hero-date: 18px;
                --fs-prize-title: 48px; --fs-prize-item: 19px;
                --fs-guarantee-title: 48px; --fs-guarantee-tag: 13px; --fs-guarantee-pt: 18px;
                --fs-action-title: 24px;
                --fs-certs-label: 14px; --fs-cert-pill: 19px;
                --fs-leadgen-title: 38px;
                --fs-contact-title: 28px; --fs-contact-item: 16px;
            }
        }
`;

content = content.replace("        /* ── Host-page isolation ─────────────────────────────────────", resetCSS + "\n        /* ── Host-page isolation ─────────────────────────────────────");

const reps = {
    'font-size: clamp\\(14px, 1.1vw, 16px\\)': 'font-size: var(--fs-base)',
    'font-size: clamp\\(2rem, 3.5vw, 3.8rem\\)': 'font-size: var(--fs-hero-title)',
    'font-size: clamp\\(1.2rem, 2.5vw, 2.2rem\\)': 'font-size: var(--fs-hero-sub)',
    'font-size: clamp\\(0.9rem, 1.5vw, 1.1rem\\)': 'font-size: var(--fs-hero-date)',
    'font-size: clamp\\(1.4rem, 2.8vw, 3rem\\)': 'font-size: var(--fs-prize-title)',
    'font-size: clamp\\(0.9rem, 1.5vw, 1.2rem\\)': 'font-size: var(--fs-prize-item)',
    'font-size: clamp\\(1.6rem, 3vw, 3rem\\)': 'font-size: var(--fs-guarantee-title)',
    'font-size: clamp\\(0.7rem, 1vw, 0.82rem\\)': 'font-size: var(--fs-guarantee-tag)',
    'font-size: clamp\\(0.95rem, 1.5vw, 1.15rem\\)': 'font-size: var(--fs-guarantee-pt)',
    'font-size: clamp\\(1rem, 1.8vw, 1.5rem\\)': 'font-size: var(--fs-action-title)',
    'font-size: clamp\\(0.75rem, 1vw, 0.9rem\\)': 'font-size: var(--fs-certs-label)',
    'font-size: clamp\\(0.9rem, 1.2vw, 1.2rem\\)': 'font-size: var(--fs-cert-pill)',
    'font-size: clamp\\(1.3rem, 2.5vw, 2.4rem\\)': 'font-size: var(--fs-leadgen-title)',
    'font-size: clamp\\(1.1rem, 2vw, 1.8rem\\)': 'font-size: var(--fs-contact-title)',

    'font-size: 1.05rem': 'font-size: calc(var(--fs-base) * 1.05)',
    'font-size: 1.1rem': 'font-size: calc(var(--fs-base) * 1.1)',
    'font-size: 1.2rem': 'font-size: calc(var(--fs-base) * 1.2)',
    'font-size: 0.78rem': 'font-size: calc(var(--fs-base) * 0.78)',
    'font-size: 0.9rem': 'font-size: calc(var(--fs-base) * 0.9)',
    'font-size: 0.875rem': 'font-size: calc(var(--fs-base) * 0.875)',
    'font-size: 0.97rem': 'font-size: calc(var(--fs-base) * 0.97)',
    'font-size: 0.7em': 'font-size: calc(var(--fs-base) * 0.7)',
    'font-size: 0.85rem': 'font-size: calc(var(--fs-base) * 0.85)',
    'font-size: 7rem': 'font-size: calc(var(--fs-base) * 7)',
    'font-size: 4rem': 'font-size: calc(var(--fs-base) * 4)',
    'font-size: 8.5rem': 'font-size: calc(var(--fs-base) * 8.5)',
    'font-size: 3.5rem': 'font-size: calc(var(--fs-base) * 3.5)'
};

for (const [oldVal, newVal] of Object.entries(reps)) {
    content = content.replace(new RegExp(oldVal, 'g'), newVal);
}

fs.writeFileSync('e:/HR/00-html/st-patrick-contest/index.html', content, 'utf-8');
console.log('Done!');
