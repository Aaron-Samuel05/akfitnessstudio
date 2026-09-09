'use client';

import dynamic from 'next/dynamic';
import { ArrowDownRight, ArrowUpRight, Instagram, MapPin, Menu, MoveUpRight, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const GymScene = dynamic(() => import('../components/3d/GymScene'), { ssr: false, loading: () => <div className="scene-loader">LOADING / 3D</div> });

const programs = [
  ['01', 'STRENGTH', 'Build power. Master the basics. Progress with intent.'],
  ['02', 'CONDITIONING', 'Engine work that makes every other session better.'],
  ['03', 'PERSONAL TRAINING', 'One-on-one programming built around your body and goals.'],
];

const stats = [['12+', 'YEARS IN MOTION'], ['4.9', 'MEMBER RATING'], ['24/7', 'ACCESS'], ['100%', 'NO EXCUSES']];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    const reveal = () => document.querySelectorAll('.reveal').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * .86) el.classList.add('visible');
    });
    window.addEventListener('scroll', reveal, { passive: true }); reveal();
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('scroll', reveal); };
  }, []);

  return <main>
    <div className="cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
    <header className="nav">
      <a href="#top" className="brand">AK<span>®</span></a>
      <div className="nav-links"><a href="#programs">TRAINING</a><a href="#space">THE SPACE</a><a href="#story">STUDIO</a><a href="#contact">CONTACT</a></div>
      <a className="nav-cta" href="#contact">JOIN THE STUDIO <ArrowUpRight size={15}/></a>
      <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
    </header>
    {menu && <div className="mobile-menu"><a href="#programs" onClick={() => setMenu(false)}>TRAINING</a><a href="#space" onClick={() => setMenu(false)}>THE SPACE</a><a href="#story" onClick={() => setMenu(false)}>STUDIO</a><a href="#contact" onClick={() => setMenu(false)}>CONTACT</a></div>}

    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span className="dot"/> EST. 2012 / INDIA</div>
        <h1>TRAIN<br/><em>HARD.</em><br/>LIVE <span>LOUD.</span></h1>
        <p className="hero-intro">A performance-driven training studio for people who take showing up personally.</p>
        <a className="hero-link" href="#programs">EXPLORE THE METHOD <ArrowDownRight size={19}/></a>
      </div>
      <div className="hero-scene"><GymScene/></div>
      <div className="hero-index">01 <span>/</span> 08</div>
      <div className="scroll-hint">SCROLL TO ENTER <span>↓</span></div>
    </section>

    <section className="ticker" aria-label="Studio values"><div>DISCIPLINE — INTENSITY — CONSISTENCY — COMMUNITY — DISCIPLINE — INTENSITY — CONSISTENCY — COMMUNITY —</div></section>

    <section className="statement reveal" id="story">
      <div className="section-kicker">/ 01 — THE STUDIO</div>
      <div><p className="mega">WE DON'T BUILD<br/><span>WORKOUTS.</span><br/>WE BUILD <b>CAPACITY.</b></p><p className="statement-body">AK is a raw, focused training environment where serious work gets done. No gimmicks. No intimidation. Just smart programming, good people and equipment that earns its floor space.</p></div>
    </section>

    <section className="stats"><div className="section-kicker">/ 02 — BY THE NUMBERS</div><div className="stats-grid">{stats.map(([n,l]) => <div className="stat reveal" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section>

    <section className="programs reveal" id="programs"><div className="section-kicker">/ 03 — THE METHOD</div><div className="program-head"><h2>TRAIN<br/><i>WITH INTENT.</i></h2><p>Three pillars. One standard: leave stronger than you arrived.</p></div><div className="program-list">{programs.map(([num,title,desc]) => <article className="program" key={num}><span>{num}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight className="program-arrow"/></article>)}</div></section>

    <section className="space reveal" id="space"><div className="space-visual"><div className="fake-photo photo-a"><span>01 / RACKS</span></div><div className="fake-photo photo-b"><span>02 / IRON</span></div><div className="space-stamp">AK<br/><small>THE SPACE</small></div></div><div className="space-copy"><div className="section-kicker">/ 04 — THE SPACE</div><h2>BUILT LIKE<br/><i>A MACHINE.</i></h2><p>Raw steel. Concrete. Black rubber. Enough room to move and enough weight to make it count.</p><a href="#contact">SEE THE STUDIO <MoveUpRight size={17}/></a></div></section>

    <section className="manifesto reveal"><div className="manifesto-mark">AK</div><p>“THE BEST VERSION OF YOU ISN'T<br/>WAITING FOR MOTIVATION.<br/><strong>IT'S WAITING FOR REP 01.</strong>”</p></section>

    <section className="contact reveal" id="contact"><div className="section-kicker">/ 05 — GET IN</div><div className="contact-grid"><div><h2>READY<br/><i>TO WORK?</i></h2><a className="big-cta" href="mailto:hello@akfitnessstudio.com">START A CONVERSATION <ArrowUpRight/></a></div><div className="contact-details"><p><MapPin size={17}/> AK FITNESS STUDIO<br/>YOUR CITY / INDIA</p><p>MON — SUN<br/>05:00 — 23:00</p><p><Instagram size={17}/> @AKFITNESSSTUDIO</p></div></div></section>

    <footer><span>AK FITNESS STUDIO © 2026</span><span>DESIGNED FOR THE OBSESSED</span><a href="#top">BACK TO TOP ↑</a></footer>
  </main>;
}
