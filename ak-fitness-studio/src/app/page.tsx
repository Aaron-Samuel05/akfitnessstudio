'use client';

import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import VideoScroll from '../components/VideoScroll';

export default function Home() {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  const go = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <header className="nav video-site-nav">
        <button className="brand" onClick={() => go('home')} aria-label="AK Fitness home">AK<span>®</span></button>
        <nav className="nav-links">
          <button onClick={() => go('training')}>TRAINING</button>
          <button onClick={() => go('space')}>THE SPACE</button>
          <button onClick={() => go('studio')}>STUDIO</button>
          <button onClick={() => go('contact')}>CONTACT</button>
        </nav>
        <button className="nav-cta" onClick={() => go('contact')}>JOIN THE STUDIO <ArrowUpRight size={15} /></button>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Open navigation">
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menu && (
        <div className="mobile-menu">
          <button onClick={() => go('training')}>TRAINING</button>
          <button onClick={() => go('space')}>THE SPACE</button>
          <button onClick={() => go('studio')}>STUDIO</button>
          <button onClick={() => go('contact')}>CONTACT</button>
        </div>
      )}

      <VideoScroll />

      <section className="after-video" id="studio">
        <div className="after-kicker">/ 06 — AFTER THE FILM</div>
        <div>
          <p className="after-title">THE WORK<br /><span>CONTINUES.</span></p>
          <p className="after-copy">The film gets you through the door. The floor is where the transformation happens. Train with people who expect you to come back tomorrow.</p>
          <button className="after-link" onClick={() => go('contact')}>JOIN THE STUDIO <ArrowUpRight size={18} /></button>
        </div>
      </section>

      <section className="contact-end" id="contact">
        <div className="after-kicker">/ 07 — GET IN</div>
        <div className="contact-end-grid">
          <p className="contact-title">READY<br /><span>TO WORK?</span></p>
          <div>
            <p className="contact-meta">AK FITNESS STUDIO<br />INDIA<br /><br />MON — SUN / 05:00 — 23:00</p>
            <a className="contact-mail" href="mailto:hello@akfitnessstudio.com">hello@akfitnessstudio.com <ArrowUpRight size={18} /></a>
          </div>
        </div>
      </section>

      <footer>
        <span>AK FITNESS STUDIO © 2026</span>
        <span>DISCIPLINE / INTENSITY / CONSISTENCY</span>
        <button onClick={() => go('home')}>BACK TO TOP ↑</button>
      </footer>
    </main>
  );
}
