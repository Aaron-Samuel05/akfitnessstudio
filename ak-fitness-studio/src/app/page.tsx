'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ArrowDownRight, ArrowUpRight, Instagram, MapPin, Menu, MoveUpRight, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MagneticButton from '../components/ui/MagneticButton';
import ParallaxImage from '../components/ui/ParallaxImage';
import RevealText from '../components/ui/RevealText';

const GymScene = dynamic(() => import('../components/3d/GymScene'), { ssr: false, loading: () => <div className="scene-loader">INITIALIZING / 3D EQUIPMENT</div> });

type Focus = 'barbell' | 'plate' | 'dumbbell' | 'rack';

const images = {
  hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=90',
  athlete: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=2000&q=90',
  lift: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2000&q=90',
  training: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1800&q=90',
  weights: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=2000&q=90',
  interior: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=2000&q=90',
};

const programs = [
  { num: '01', title: 'STRENGTH', desc: 'Build power. Master the basics. Progress with intent.', image: images.lift },
  { num: '02', title: 'CONDITIONING', desc: 'Engine work that makes every other session better.', image: images.training },
  { num: '03', title: 'PERSONAL TRAINING', desc: 'One-on-one programming built around your body and goals.', image: images.athlete },
];

const stats = [['12+', 'YEARS IN MOTION'], ['4.9', 'MEMBER RATING'], ['24/7', 'ACCESS'], ['100%', 'NO EXCUSES']];
const equipmentItems: { num: string; title: string; text: string; focus: Focus; image: string }[] = [
  { num: '01', title: 'THE BAR', text: 'Olympic steel, knurled for control. The foundation of the floor.', focus: 'barbell', image: images.lift },
  { num: '02', title: 'THE IRON', text: 'Competition-style plates with a hard, machined finish.', focus: 'plate', image: images.weights },
  { num: '03', title: 'THE TOOL', text: 'Compact equipment designed around clean movement, not decoration.', focus: 'dumbbell', image: images.training },
  { num: '04', title: 'THE RACK', text: 'A rigid frame that disappears when the work begins.', focus: 'rack', image: images.interior },
];

function EquipmentStory() {
  const [active, setActive] = useState<Focus>('barbell');

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-equipment-step]'));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.getAttribute('data-focus') as Focus);
    }, { threshold: [0.25, 0.5, 0.75] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="equipment-story" id="equipment">
      <div className="equipment-story-head"><span>/ 03 — EQUIPMENT / 3D</span><span>SCROLL TO CHANGE THE OBJECT</span></div>
      <div className="equipment-sticky"><div className="equipment-canvas"><GymScene focus={active}/><div className="object-orbit"/><div className="object-tag">AK / PRECISION</div></div></div>
      <div className="equipment-steps">
        {equipmentItems.map((item) => <article key={item.num} data-equipment-step data-focus={item.focus} className={`equipment-step ${active === item.focus ? 'is-active' : ''}`}>
          <div className="step-number">{item.num}</div><div className="step-copy"><span>EQUIPMENT / {item.num}</span><h3>{item.title}</h3><p>{item.text}</p></div><div className="step-image"><Image src={item.image} alt={item.title} fill sizes="320px" /></div>
        </article>)}
      </div>
    </section>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  useEffect(() => { const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY }); window.addEventListener('mousemove', move, { passive: true }); return () => window.removeEventListener('mousemove', move); }, []);

  return (
    <main>
      <div className="cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} /><div className="grain" aria-hidden="true" />
      <header className="nav"><a href="#top" className="brand">AK<span>®</span></a><nav className="nav-links"><a href="#training">TRAINING</a><a href="#space">THE SPACE</a><a href="#equipment">EQUIPMENT</a><a href="#contact">CONTACT</a></nav><MagneticButton className="nav-cta" href="#contact">JOIN THE STUDIO <ArrowUpRight size={15}/></MagneticButton><button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button></header>
      {menu && <div className="mobile-menu"><a href="#training" onClick={() => setMenu(false)}>TRAINING</a><a href="#space" onClick={() => setMenu(false)}>THE SPACE</a><a href="#equipment" onClick={() => setMenu(false)}>EQUIPMENT</a><a href="#contact" onClick={() => setMenu(false)}>CONTACT</a></div>}

      <section className="hero" id="top"><div className="hero-image"><Image src={images.hero} alt="Dark industrial gym interior" fill priority sizes="100vw" /></div><div className="hero-vignette" /><div className="hero-copy"><div className="eyebrow"><span className="dot"/> EST. 2012 / INDIA</div><RevealText><h1>TRAIN<br/><em>HARD.</em><br/>LIVE <span>LOUD.</span></h1></RevealText><p className="hero-intro">A performance-driven training studio for people who take showing up personally.</p><MagneticButton className="hero-link" href="#story">ENTER THE METHOD <ArrowDownRight size={19}/></MagneticButton></div><div className="hero-scene"><GymScene focus="barbell"/></div><div className="hero-index">01 <span>/</span> 08</div><div className="hero-side-label">POWER / PERFORMANCE / PRESENCE</div><div className="scroll-hint">SCROLL TO ENTER <span>↓</span></div></section>

      <section className="ticker"><div>DISCIPLINE — INTENSITY — CONSISTENCY — COMMUNITY — PERFORMANCE — DISCIPLINE — INTENSITY — CONSISTENCY — COMMUNITY —</div></section>
      <section className="story" id="story"><div className="section-kicker">/ 01 — THE STUDIO</div><div className="story-main"><RevealText><p className="mega">WE DON'T BUILD<br/><span>WORKOUTS.</span><br/>WE BUILD <b>CAPACITY.</b></p></RevealText><div className="story-copy"><span className="vertical-line"/><p>AK is a raw, focused training environment where serious work gets done. No gimmicks. No intimidation. Just smart programming, good people and equipment that earns its floor space.</p></div></div></section>
      <section className="cinematic-band"><ParallaxImage src={images.athlete} alt="Athlete training with heavy weights" priority intensity={10}/><div className="band-overlay"><span>02 / THE WORK</span><strong>SHOW<br/><i>UP.</i></strong><small>EVERY REP COUNTS.</small></div><div className="band-play"><Play size={17} fill="currentColor"/> FILM / 00:48</div></section>
      <section className="stats"><div className="section-kicker">/ 02 — BY THE NUMBERS</div><div className="stats-grid">{stats.map(([n,l]) => <div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>

      <EquipmentStory />

      <section className="programs" id="training"><div className="section-kicker">/ 04 — THE METHOD</div><div className="program-head"><RevealText><h2>TRAIN<br/><i>WITH INTENT.</i></h2></RevealText><p>Three pillars. One standard: leave stronger than you arrived.</p></div><div className="program-list">{programs.map((program) => <article className="program" key={program.num}><span className="program-num">{program.num}</span><div className="program-title"><h3>{program.title}</h3><p>{program.desc}</p></div><div className="program-image"><Image src={program.image} alt={program.title} fill sizes="320px" /></div><ArrowUpRight className="program-arrow"/></article>)}</div></section>

      <section className="gallery" aria-label="Training gallery"><div className="gallery-intro"><span>/ 05 — THE FLOOR</span><p>Heavy things. Loud breathing. Quiet focus.</p></div><div className="gallery-grid"><figure className="gallery-large"><ParallaxImage src={images.lift} alt="Athlete training in a dark gym" intensity={8}/><figcaption>01 / STRENGTH</figcaption></figure><figure className="gallery-small"><ParallaxImage src={images.weights} alt="Gym weights and equipment" intensity={14}/><figcaption>02 / IRON</figcaption></figure><figure className="gallery-wide"><ParallaxImage src={images.interior} alt="Industrial gym interior" intensity={10}/><figcaption>03 / THE FLOOR</figcaption></figure></div></section>
      <section className="space" id="space"><div className="space-visual"><div className="space-main"><ParallaxImage src={images.interior} alt="AK Fitness Studio interior" intensity={12}/><span>01 / RACKS</span></div><div className="space-secondary"><ParallaxImage src={images.weights} alt="Weight plates close-up" intensity={16}/><span>02 / IRON</span></div><div className="space-stamp">AK<br/><small>THE SPACE</small></div></div><div className="space-copy"><div className="section-kicker">/ 06 — THE SPACE</div><RevealText><h2>BUILT LIKE<br/><i>A MACHINE.</i></h2></RevealText><p>Raw steel. Concrete. Black rubber. Enough room to move and enough weight to make it count.</p><div className="space-specs"><span>03 / CONDITIONING</span><span>04 / THE FLOOR</span><span>05 / RECOVERY</span></div><a href="#contact">SEE THE STUDIO <MoveUpRight size={17}/></a></div></section>
      <section className="manifesto"><div className="manifesto-mark">AK</div><RevealText><p>“THE BEST VERSION OF YOU ISN'T<br/>WAITING FOR MOTIVATION.<br/><strong>IT'S WAITING FOR REP 01.</strong>”</p></RevealText></section>
      <section className="contact" id="contact"><div className="section-kicker">/ 07 — GET IN</div><div className="contact-grid"><div><RevealText><h2>READY<br/><i>TO WORK?</i></h2></RevealText><MagneticButton className="big-cta" href="mailto:hello@akfitnessstudio.com">START A CONVERSATION <ArrowUpRight/></MagneticButton></div><div className="contact-details"><p><MapPin size={17}/> AK FITNESS STUDIO<br/>YOUR CITY / INDIA</p><p>MON — SUN<br/>05:00 — 23:00</p><p><Instagram size={17}/> @AKFITNESSSTUDIO</p></div></div></section>
      <footer><span>AK FITNESS STUDIO © 2026</span><span>DESIGNED FOR THE OBSESSED</span><a href="#top">BACK TO TOP ↑</a></footer>
    </main>
  );
}
