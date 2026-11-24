// Dev-only page (/preview.html): one template design in all four event types side by side,
// at desktop or phone width, light or dark. Reloads on every templates.js save.
import { TEMPLATES, VARIANT_KEYS } from './templates';
import { renderEmail } from './render';

const SAMPLE = {
  subject: 'Six bets for 2027 your HR strategy can\'t ignore',
  preheader: 'Six shifts reshaping HR in 2027. Get your free pass.',
  logo: 'https://public-cdn.hr.com/system/app/media/rs/2023/11/30/lplk0sc9/120.jpg',
  logoAlt: 'Cornerstone',
  logoHeight: '40',
  title: 'Six Bets for 2027: Where AI Agents, Talent and Learning Collide',
  dateTime: 'January 13, 2027 at 12:00 PM - 12:55 PM ET',
  intro: 'Has the hype ever been louder? As AI agents reshape everyday work, annual predictions are harder to make, yet HR, talent and learning leaders must still prepare their people for continuous change, ethically and responsibly.\n\nCornerstone experts unpack six shifts for the year ahead, from making workforce readiness a C-suite job and pairing AI agents with the SaaS you own, to managing agents, responsible AI and more human learning.',
  learn1: 'Discover six shifts shaping HR, talent and learning in 2027',
  learn2: 'Make workforce readiness a priority for the whole C-suite',
  learn3: 'Integrate AI agents with the technology you already own',
  learn4: 'Turn responsible AI into a true competitive differentiator',
  apShortcode: 'https://web.hr.com/nsmi',
  veName: 'State of AI in HR and the Future of Work',
  veShortcode: 'https://web.hr.com/mobf',
  creditValue: '1 BUSINESS Credit',
  showCredits: true,
  hosts: [
    { name: 'Kate Graham', title: 'Senior Director, Market Insights at Cornerstone', image: 'https://public-cdn.hr.com/profile_images/2016/9/2/1472804996764_120', alt: 'Kate Graham' },
    { name: 'Joe Olszewski', title: 'Principal, Strategy & Advisory Services at Cornerstone', image: 'https://public-cdn.hr.com/profile_images/2018/5/31/1527770388671_120', alt: 'Joe Olszewski' },
  ],
};

const params = new URLSearchParams(location.search);
const state = { v: Number(params.get('v') || 0), w: params.get('w') || '600', theme: params.get('theme') || 'light' };

function group(id, items, key) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  for (const [value, label] of items) {
    const b = document.createElement('button');
    b.textContent = label;
    if (String(state[key]) === String(value)) b.className = 'on';
    b.onclick = () => { state[key] = value; history.replaceState(null, '', `?v=${state.v}&w=${state.w}&theme=${state.theme}`); draw(); };
    el.appendChild(b);
  }
}

function draw() {
  group('variants', VARIANT_KEYS.map((_, i) => [i, `${i + 1}. ${TEMPLATES.demo.variants[i].label}`]), 'v');
  group('widths', [['600', 'Desktop'], ['375', 'Phone']], 'w');
  group('themes', [['light', 'Light'], ['dark', 'Dark']], 'theme');
  const cols = document.getElementById('cols');
  cols.innerHTML = '';
  for (const type of ['standalone', 'virtual', 'demo', 'ondemand']) {
    const fields = { ...SAMPLE, showCredits: type !== 'demo', dateTime: type === 'ondemand' ? '' : SAMPLE.dateTime };
    let html = renderEmail(TEMPLATES[type].variants[state.v], fields);
    if (state.theme === 'dark') html = html.replace('<html ', '<html data-ogsc data-ogsb ');
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `<h3>${TEMPLATES[type].name}</h3>`;
    const frame = document.createElement('iframe');
    frame.style.width = `${Number(state.w) + (state.w === '600' ? 40 : 0)}px`;
    frame.srcdoc = html;
    frame.onload = () => { frame.style.height = `${frame.contentDocument.documentElement.scrollHeight}px`; };
    col.appendChild(frame);
    cols.appendChild(col);
  }
}

draw();
if (import.meta.hot) import.meta.hot.accept(['./templates', './render'], () => location.reload());
