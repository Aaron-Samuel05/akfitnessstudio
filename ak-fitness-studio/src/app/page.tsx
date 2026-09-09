'use client';

import { ArrowDown, ArrowUpRight, Check, Clock3, Instagram, MapPin, Menu, Phone, Play, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import VideoScroll from '../components/VideoScroll';
import JoinModal from '../components/JoinModal';

const images = {
  floor: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2400&q=90',
  athlete: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1a?auto=format&fit=crop&w=1800&q=90',
  training: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1800&q=90',
  strength: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1800&q=90',
  portrait: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=90',
};

const plans = [
  { name: 'STARTER', price: 'ENQUIRE', copy: 'A simple entry point for building a consistent training habit.', items: ['Full gym access', 'Equipment orientation', 'Goal consultation'] },
  { name: 'PERFORMANCE', price: 'ENQUIRE', copy: 'Structured coaching for people who want measurable progress.', items: ['Full gym access', 'Training programme', 'Progress tracking', 'Coach support'], featured: true },
  { name: 'PERSONAL', price: 'ENQUIRE', copy: 'One-to-one attention with a plan built around your body and goals.', items: ['Personal training', 'Individual programme', 'Progress assessments', 'Nutrition guidance'] },
];

const classes = [
  ['06:00', 'STRENGTH', 'MON / WED / FRI', '60 MIN'],
  ['07:30', 'CONDITIONING', 'MON / TUE / THU', '45 MIN'],
  ['18:00', 'PERFORMANCE', 'MON / WED / FRI', '60 MIN'],
  ['19:15', 'FUNCTIONAL', 'TUE / THU / SAT', '50 MIN'],
];

const faqs = [
  ['Do I need to be experienced?', 'No. We coach beginners and experienced lifters. Your starting point determines the programme, not your ego.'],
  ['Can I try the gym before joining?', 'Yes. Use the Join Now form and choose Free Trial. The team can confirm the best available slot.'],
  ['Do you offer personal training?', 'Yes. Personal training can be built around strength, body composition, performance and your individual goals.'],
  ['What should I bring?', 'Training clothes, shoes, water and the willingness to work. We handle the rest.'],
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);

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
          <button onClick={() => go('training')}>TRAINING</button><button onClick={() => go('programs')}>PROGRAMS</button><button onClick={() => go('space')}>THE SPACE</button><button onClick={() => go('membership')}>MEMBERSHIP</button><button onClick={() => go('contact')}>CONTACT</button>
        </nav>
        <button className="nav-cta" onClick={() => setJoinOpen(true)}>JOIN NOW <ArrowUpRight size={15} /></button>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Open navigation">{menu ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      {menu && <div className="mobile-menu"><button onClick={() => go('training')}>TRAINING</button><button onClick={() => go('programs')}>PROGRAMS</button><button onClick={() => go('space')}>THE SPACE</button><button onClick={() => go('membership')}>MEMBERSHIP</button><button onClick={() => setJoinOpen(true)}>JOIN NOW ↗</button><button onClick={() => go('contact')}>CONTACT</button></div>}

      <div id="home"><VideoScroll /></div>

      <section className="statement" id="training">
        <div className="section-index">01 / THE METHOD</div>
        <div><p className="eyebrow">NOT A MEMBERSHIP. A STANDARD.</p><h2>TRAIN WITH<br /><span>INTENTION.</span></h2><p className="statement-copy">AK is built around the idea that great training should be coached, measurable and repeatable. Whether you are starting from zero or chasing your next level, every session has a purpose.</p><button className="lime-link" onClick={() => go('programs')}>EXPLORE TRAINING <ArrowDown size={16} /></button></div>
      </section>

      <section className="image-break"><img src={images.athlete} alt="Athlete training in a gym" /><div className="image-break-caption"><span>REAL PEOPLE</span><span>REAL WORK</span><span>NO SHORTCUTS</span></div></section>

      <section className="programs" id="programs">
        <div className="section-index">02 / PROGRAMS</div><div className="section-heading"><p className="eyebrow">FIND YOUR LANE</p><h2>BUILT<br /><span>AROUND YOU.</span></h2></div>
        <div className="program-grid">
          {[['01','STRENGTH','Build force, muscle and confidence.','strength'],['02','CONDITIONING','Move better. Work harder. Recover faster.','training'],['03','PERSONAL TRAINING','A programme built around your body and your goals.','athlete']].map(([num,title,copy,img]) => <article className="program-card" key={num}><img src={images[img as keyof typeof images]} alt="Training at AK Fitness" /><div className="program-overlay" /><span className="program-num">{num}</span><div className="program-bottom"><h3>{title}</h3><p>{copy}</p><ArrowUpRight /></div></article>)}
        </div>
      </section>

      <section className="space" id="space">
        <div className="space-copy"><p className="eyebrow">03 / THE SPACE</p><h2>10,000<br /><span>REASONS.</span></h2><p>Serious equipment. Open training space. A floor designed for movement, strength and people who actually want to train.</p><button className="lime-link" onClick={() => go('gallery')}>SEE THE FLOOR <ArrowUpRight size={16} /></button></div><div className="space-image"><img src={images.floor} alt="Gym floor and equipment" /><span>01 / THE FLOOR</span></div></section>

      <section className="gallery" id="gallery"><div className="gallery-head"><div className="section-index">04 / THE FLOOR</div><h2>COME<br /><span>SEE IT.</span></h2><p>Don&apos;t judge a gym from a brochure. Walk onto the floor.</p></div><div className="gallery-grid"><img className="gallery-tall" src={images.strength} alt="Strength training" /><img src={images.training} alt="Fitness training" /><img src={images.athlete} alt="Athlete workout" /></div></section>

      <section className="membership" id="membership">
        <div className="section-index">05 / MEMBERSHIP</div><div className="membership-head"><p className="eyebrow">YOUR NEXT SESSION STARTS HERE</p><h2>CHOOSE<br /><span>YOUR LEVEL.</span></h2><p>Plans and pricing can be tailored by the AK team. Pick the path that sounds right and start a conversation today.</p></div>
        <div className="plan-grid">{plans.map((plan) => <article className={`plan-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>{plan.featured && <div className="popular">MOST POPULAR</div>}<span className="plan-name">{plan.name}</span><strong>{plan.price}</strong><p>{plan.copy}</p><ul>{plan.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><button onClick={() => setJoinOpen(true)}>START THIS PLAN <ArrowUpRight size={16} /></button></article>)}</div>
      </section>

      <section className="schedule" id="schedule"><div className="section-index">06 / SCHEDULE</div><div className="schedule-head"><p className="eyebrow">TRAIN ON YOUR TIME</p><h2>THIS WEEK<br /><span>ON THE FLOOR.</span></h2><button onClick={() => setJoinOpen(true)}>BOOK A TRIAL <ArrowUpRight size={16} /></button></div><div className="schedule-list">{classes.map(([time,name,days,duration]) => <div className="class-row" key={time + name}><strong>{time}</strong><div><h3>{name}</h3><span>{days}</span></div><span>{duration}</span><button onClick={() => setJoinOpen(true)}>BOOK ↗</button></div>)}</div></section>

      <section className="social-proof"><div className="proof-quote">“THE BEST TRAINING IS THE TRAINING YOU KEEP SHOWING UP FOR.”</div><div className="proof-stats"><div><strong>01</strong><span>COACHED<br />SESSIONS</span></div><div><strong>02</strong><span>MEASURABLE<br />PROGRESS</span></div><div><strong>03</strong><span>REAL<br />COMMUNITY</span></div></div></section>

      <section className="faq"><div className="section-index">07 / QUESTIONS</div><div><p className="eyebrow">BEFORE YOU START</p><h2>NO<br /><span>GUESSWORK.</span></h2></div><div className="faq-list">{faqs.map(([q,a], i) => <button className={`faq-row ${faq === i ? 'open' : ''}`} key={q} onClick={() => setFaq(faq === i ? null : i)}><span>0{i+1}</span><div><h3>{q}</h3>{faq === i && <p>{a}</p>}</div><strong>{faq === i ? '−' : '+'}</strong></button>)}</div></section>

      <section className="contact-end" id="contact"><div className="after-kicker">/ 08 — GET IN</div><div className="contact-end-grid"><div><p className="contact-title">READY<br /><span>TO WORK?</span></p><p className="contact-lede">The fastest way to start is to tell us what you want and let the team take it from there.</p><button className="hero-join" onClick={() => setJoinOpen(true)}>JOIN AK NOW <ArrowUpRight size={20} /></button></div><div><div className="contact-box"><MapPin /><span>AK FITNESS STUDIO<br />INDIA<br /><small>Address / phone can be updated here</small></span></div><div className="contact-box"><Clock3 /><span>OPEN DAILY<br />05:00 — 23:00</span></div><div className="contact-box"><Phone /><span>CALL THE STUDIO<br />+91 — YOUR NUMBER</span></div><div className="contact-social"><Instagram size={18} /> FOLLOW THE FLOOR</div></div></div></section>

      <footer><span>AK FITNESS STUDIO © 2026</span><span>DISCIPLINE / INTENSITY / CONSISTENCY</span><button onClick={() => go('home')}>BACK TO TOP ↑</button></footer>
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </main>
  );
}
