'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC =
  'https://videos.pexels.com/video-files/4746014/4746014-uhd_3840_2160_25fps.mp4';

const steps = [
  {
    id: 'home',
    index: '01',
    kicker: 'AK FITNESS STUDIO / INDIA',
    title: <>TRAIN<br /><span>HARD.</span></>,
    body: 'A performance-driven training studio built around strength, discipline and showing up.',
  },
  {
    id: 'training',
    index: '02',
    kicker: 'THE METHOD',
    title: <>BUILT<br /><span>TO MOVE.</span></>,
    body: 'Strength. Conditioning. Personal training. No shortcuts, no noise — just better work.',
  },
  {
    id: 'space',
    index: '03',
    kicker: 'THE SPACE',
    title: <>IRON.<br /><span>FOCUS.</span></>,
    body: 'A stripped-back training floor designed to keep the attention exactly where it belongs.',
  },
  {
    id: 'studio',
    index: '04',
    kicker: 'THE STUDIO',
    title: <>SHOW<br /><span>UP.</span></>,
    body: 'Small-group energy, serious coaching and a community that expects more from itself.',
  },
  {
    id: 'contact',
    index: '05',
    kicker: 'START HERE',
    title: <>MAKE<br /><span>NOISE.</span></>,
    body: 'Ready to train differently? Enter the studio and make your next session count.',
  },
];

export default function VideoScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetTime = useRef(0);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => {
      const rect = video.closest('.video-scroll')?.getBoundingClientRect();
      if (!rect) return;

      const travel = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, travel)));
      targetTime.current = progress * Math.max(0, video.duration || 0);

      const next = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length),
      );
      setActive((current) => (current === next ? current : next));
    };

    const tick = () => {
      if (video.readyState >= 2 && Number.isFinite(video.duration)) {
        const difference = targetTime.current - video.currentTime;
        if (Math.abs(difference) > 0.015) {
          video.currentTime += difference * 0.16;
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => update();
    const onResize = () => update();

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="video-scroll" aria-label="AK Fitness cinematic story">
      <div className="video-sticky">
        <video
          ref={videoRef}
          className="scroll-video"
          src={VIDEO_SRC}
          poster="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=2200"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => setReady(true)}
          aria-hidden="true"
        />
        <div className="video-shade" />
        <div className="video-grain" />

        <header className="video-nav">
          <button className="video-logo" onClick={() => scrollTo('home')} aria-label="AK Fitness home">AK</button>
          <nav>
            <button onClick={() => scrollTo('training')}>TRAINING</button>
            <button onClick={() => scrollTo('space')}>THE SPACE</button>
            <button onClick={() => scrollTo('studio')}>STUDIO</button>
            <button onClick={() => scrollTo('contact')}>CONTACT</button>
          </nav>
          <button className="video-join" onClick={() => scrollTo('contact')}>JOIN THE STUDIO ↗</button>
        </header>

        <div className="video-progress">
          <span>{String(active + 1).padStart(2, '0')}</span>
          <i />
          <span>{String(steps.length).padStart(2, '0')}</span>
        </div>

        <div className="video-copy-wrap">
          {steps.map((step, index) => (
            <article key={step.id} className={`video-copy ${index === active ? 'is-active' : ''}`}>
              <p className="video-kicker"><b />{step.kicker}</p>
              <h1>{step.title}</h1>
              <p className="video-body">{step.body}</p>
              <button className="video-arrow" onClick={() => scrollTo(steps[Math.min(index + 1, steps.length - 1)].id)}>
                {index === steps.length - 1 ? 'ENTER THE STUDIO ↗' : 'SCROLL TO CONTINUE ↓'}
              </button>
            </article>
          ))}
        </div>

        <div className="video-status">
          <span className={ready ? 'ready' : ''}>{ready ? 'VIDEO / READY' : 'LOADING FILM'}</span>
          <span>SCROLL CONTROLLED</span>
        </div>
      </div>

      <div className="video-track" aria-hidden="true">
        {steps.map((step) => <div key={step.id} id={step.id} className="video-marker" />)}
      </div>
    </section>
  );
}
