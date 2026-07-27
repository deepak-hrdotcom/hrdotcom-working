---
name: modern-ui-interactions
description: A snippet and guideline skill for adding CMS-safe modern UI interactions like IntersectionObserver scroll animations, hover states, and glassmorphism.
---

# Modern UI Interactions

This skill provides the standard implementation patterns for adding modern, premium interactivity to our digital assets (CMS HTML pages, Landing Pages, Research Pages, and Emails).

## Context & Scope
This skill is **application-agnostic**. It applies to:
1. **CMS Landing & Marketing Pages**: Full freedom to use Vanilla JavaScript, IntersectionObserver, and modern CSS (Grid, Glassmorphism).
2. **Research & Forecast Pages**: Can utilize interactive data reveals, tabbed content, and scroll-storytelling.
3. **HTML Emails**: **STRICT LIMITATIONS**. Emails cannot execute JavaScript and have limited CSS support. They must rely exclusively on table-based layouts and inline CSS fallbacks.

## When to Use This Skill
- Adding scroll-triggered entrance animations to web sections or cards.
- Adding engaging hover effects and micro-interactions that elevate the user experience.
- Implementing glassmorphism and background mesh gradients for visual depth.
- Building interactive components like countdown timers, scratch-offs, or interactive bento boxes.

---

## Pattern 1: HTML Email Constraints (NO JAVASCRIPT)
When designing for **Emails**, you must completely abandon JavaScript and advanced CSS (`clamp`, `Grid`, `backdrop-filter`).
- **Layout**: Structure using `<table>`, `<tr>`, `<td>`.
- **Styling**: Use strictly inline CSS (`<td style="...">`).
- **Interactivity**: Limited solely to basic CSS `:hover` states on anchor tags (`<a>`), but even these may fall back to static text in Outlook/Gmail.
- **Fallbacks**: Always provide solid background colors if using gradients.

## Core Patterns

### 1. Scroll-Triggered Entrance Animations (IntersectionObserver)
Use Vanilla JavaScript to add visibility classes to elements as they scroll into view.

**CSS Pattern:**
```css
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}
/* Staggered delays for children if needed */
.reveal-group .reveal-on-scroll:nth-child(1) { transition-delay: 0.1s; }
.reveal-group .reveal-on-scroll:nth-child(2) { transition-delay: 0.2s; }
```

**JavaScript Pattern:**
```html
<script>
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
</script>
```

### 2. Micro-Interactions (Hover States)
Scale buttons slightly and elevate cards with shadow to simulate depth and interactivity.

```css
.modern-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.modern-btn {
  transition: transform 0.2s ease, filter 0.2s ease;
}
.modern-btn:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
```

### 3. Glassmorphism & Mesh Gradients
Create a premium look by combining blurred backgrounds with semi-transparent cards.

```css
.mesh-bg {
  /* Example using HR.com brand colors softly glowing */
  background: radial-gradient(circle at top left, rgba(239, 74, 61, 0.15) 0%, transparent 50%),
              radial-gradient(circle at bottom right, rgba(74, 196, 214, 0.15) 0%, transparent 50%);
  background-color: #fafafa;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}
```

---

## Pattern 5: Interactive Reveal / Scratch-Off (Vanilla JS)
Used for engagement campaigns to reveal discount codes, "Pots of Gold", or exclusive research data.
```html
<style>
.reveal-container { position: relative; display: inline-block; cursor: pointer; }
.reveal-cover { position: absolute; inset: 0; background: #2A343E; color: #fff; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s ease; z-index: 2; border-radius: 8px;}
.reveal-content { padding: 1rem 2rem; background: #f4f5f7; border-radius: 8px; font-weight: bold; }
.revealed .reveal-cover { opacity: 0; pointer-events: none; }
</style>

<div class="reveal-container" onclick="this.classList.add('revealed')">
  <div class="reveal-cover">Click to Reveal Prize!</div>
  <div class="reveal-content">Free Exam Voucher ($695 Value)</div>
</div>
```

## Pattern 6: Magnetic Buttons (Vanilla JS)
A premium interaction for primary Call-to-Actions where the button slightly follows the user's cursor.
```html
<script>
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = `translate(0px, 0px)`;
  });
});
</script>
```

## Rules
- Always use `!important` on layout-critical properties if CMS global styles interfere.
- Do not use jQuery or animation libraries (GSAP, Framer Motion) unless explicitly allowed; stick to CSS transitions and `IntersectionObserver`.
