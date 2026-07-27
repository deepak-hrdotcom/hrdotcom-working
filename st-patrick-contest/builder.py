import re

def process_file():
    with open('e:/HR/00-html/st-patrick-contest/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Replace all specific classes with spc- prefixed versions
    classes_to_prefix = [
        'inner', 'rainbow-rule', 'dots', 'btn', 'btn-gold', 'btn-outline-white',
        'btn-white-solid', 'btn-pill', 'btn-lg', 'sr-only', 'hero', 'hero-copy',
        'hero-logo', 'hero-decos', 'hero-headline', 'hero-subhead', 'hero-date',
        'hero-actions', 'hero-visual', 'hero-img', 'emoji', 'prize-band',
        'prize-band-heading', 'pot', 'prize-band-meta', 'prize-band-item',
        'prize-band-sep', 'prize-band-value', 'guarantee', 'guarantee-grid',
        'guarantee-trust', 'guarantee-tag', 'guarantee-heading', 'guarantee-points',
        'guarantee-point', 'guarantee-point-icon', 'guarantee-point-text',
        'guarantee-action', 'action-eyebrow', 'action-heading', 'action-cta',
        'guarantee-divider', 'action-notify', 'date-hl', 'certs', 'certs-label',
        'certs-pills', 'cert-pill', 'certs-conditions', 'leadgen', 'leadgen-card',
        'leadgen-heading', 'contact', 'contact-heading', 'contact-row',
        'contact-item', 'contact-ico'
    ]

    for cls in sorted(classes_to_prefix, key=len, reverse=True):
        # CSS class selectors
        content = re.sub(r'\.' + cls + r'(\b|:)', r'.spc-' + cls + r'\1', content)
        # HTML class attributes
        content = re.sub(r'class="([^"]*)(\b' + cls + r'\b)([^"]*)"', r'class="\1spc-' + cls + r'\3"', content)
        content = re.sub(r'class="([^"]*)(\b' + cls + r'\b)([^"]*)"', r'class="\1spc-' + cls + r'\3"', content) # Run twice in case of multiple classes backwards/forwards

    # Step 2: Inject strict CSS reset just below the scoping rule comment
    reset_css = """
        /* ── Strict CMS Reset for Semantic Elements ───────────────── */
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
    """

    content = content.replace("        /* ── Host-page isolation ─────────────────────────────────────", reset_css + "\n        /* ── Host-page isolation ─────────────────────────────────────")

    # Step 3: Replace old font sizes and clamps with specific var references
    reps = {
        r'font-size:\s*clamp\(14px,\s*1.1vw,\s*16px\)': r'font-size: var(--fs-base)',
        r'font-size:\s*clamp\(2rem,\s*3.5vw,\s*3.8rem\)': r'font-size: var(--fs-hero-title)',
        r'font-size:\s*clamp\(1.2rem,\s*2.5vw,\s*2.2rem\)': r'font-size: var(--fs-hero-sub)',
        r'font-size:\s*clamp\(0.9rem,\s*1.5vw,\s*1.1rem\)': r'font-size: var(--fs-hero-date)',
        r'font-size:\s*clamp\(1.4rem,\s*2.8vw,\s*3rem\)': r'font-size: var(--fs-prize-title)',
        r'font-size:\s*clamp\(0.9rem,\s*1.5vw,\s*1.2rem\)': r'font-size: var(--fs-prize-item)',
        r'font-size:\s*clamp\(1.6rem,\s*3vw,\s*3rem\)': r'font-size: var(--fs-guarantee-title)',
        r'font-size:\s*clamp\(0.7rem,\s*1vw,\s*0.82rem\)': r'font-size: var(--fs-guarantee-tag)',
        r'font-size:\s*clamp\(0.95rem,\s*1.5vw,\s*1.15rem\)': r'font-size: var(--fs-guarantee-pt)',
        r'font-size:\s*clamp\(1rem,\s*1.8vw,\s*1.5rem\)': r'font-size: var(--fs-action-title)',
        r'font-size:\s*clamp\(0.75rem,\s*1vw,\s*0.9rem\)': r'font-size: var(--fs-certs-label)',
        r'font-size:\s*clamp\(0.9rem,\s*1.2vw,\s*1.2rem\)': r'font-size: var(--fs-cert-pill)',
        r'font-size:\s*clamp\(1.3rem,\s*2.5vw,\s*2.4rem\)': r'font-size: var(--fs-leadgen-title)',
        r'font-size:\s*clamp\(1.1rem,\s*2vw,\s*1.8rem\)': r'font-size: var(--fs-contact-title)',
    }

    # Remove the variables from root that are now clamps, they will be replaced directly where used instead
    # Wait, the clamps were directly on the elements. I will just replace `font-size: clamp(...)` with `font-size: var(...)`
    for old, new in reps.items():
        content = re.sub(old, new, content)
        
    # Let's fix button font size which is hardcoded 'font-size: 1.05rem;' to var(--fs-base) * 1.05... 
    # Or keep it as is. Prompt says hardcode all sizes to pixels. 
    content = re.sub(r'font-size:\s*1.05rem', 'font-size: calc(var(--fs-base) * 1.05)', content)
    content = re.sub(r'font-size:\s*1.1rem', 'font-size: calc(var(--fs-base) * 1.1)', content)
    content = re.sub(r'font-size:\s*1.2rem', 'font-size: calc(var(--fs-base) * 1.2)', content)
    content = re.sub(r'font-size:\s*0.78rem', 'font-size: calc(var(--fs-base) * 0.78)', content)
    content = re.sub(r'font-size:\s*0.9rem', 'font-size: calc(var(--fs-base) * 0.9)', content)
    content = re.sub(r'font-size:\s*0.875rem', 'font-size: calc(var(--fs-base) * 0.875)', content)
    content = re.sub(r'font-size:\s*0.97rem', 'font-size: calc(var(--fs-base) * 0.97)', content)
    content = re.sub(r'font-size:\s*0.7em', 'font-size: calc(var(--fs-base) * 0.7)', content)
    content = re.sub(r'font-size:\s*0.85rem', 'font-size: calc(var(--fs-base) * 0.85)', content)

    # Some floating emojis had rems
    content = re.sub(r'font-size:\s*7rem', 'font-size: calc(var(--fs-base) * 7)', content)
    content = re.sub(r'font-size:\s*4rem', 'font-size: calc(var(--fs-base) * 4)', content)
    content = re.sub(r'font-size:\s*8.5rem', 'font-size: calc(var(--fs-base) * 8.5)', content)
    content = re.sub(r'font-size:\s*3.5rem', 'font-size: calc(var(--fs-base) * 3.5)', content)

    # Convert paddings/margins in rem to pixel equivalent via var(--fs-base) 
    # Or leave them, the request specifically asked for "font sizes should be hard coded to pixels".
    
    with open('e:/HR/00-html/st-patrick-contest/index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process_file()
