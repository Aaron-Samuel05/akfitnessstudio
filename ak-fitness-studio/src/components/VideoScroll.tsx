'use client';

import { useEffect, useRef, useState } from 'react';

// Keep the source configurable so a self-hosted 60fps master can be dropped into
// /public/video/ak-fitness-60.mp4 without changing the component again.
const VIDEO_SRC = '/video/ak-fitness-60.mp4';
const FALLBACK_SRC =
  'https://videos.pexels.com/video-files/4746014/4746014-uhd_3840_2160_25fps.mp4';

const steps = [
  { id: 'home', kicker: 'AK FITNESS STUDIO / INDIA', title: <>TRAIN<br /><span>HARD.</span></>, body: 'A performance-driven training studio built around strength, discipline and showing up.' },
  { id: 'training', kicker: 'THE METHOD', title: <>BUILT<br /><span>TO MOVE.</span></>, body: 'Strength. Conditioning. Personal training. No shortcuts, no noise — just better work.' },
  { id: 'space', kicker: 'THE SPACE', title: <>IRON.<br /><span>FOCUS.</span></>, body: 'A stripped-back training floor designed to keep the attention exactly where it belongs.' },
  { id: 'studio', kicker: 'THE STUDIO', title: <>SHOW<br /><span>UP.</span></>, body: 'Small-group energy, serious coaching and a community that expects more from itself.' },
  { id: 'contact', kicker: 'START HERE', title: <>MAKE<br /><span>NOISE.</span></>, body: 'Ready to train differently? Enter the studio and make your next session count.' },
];

export default function VideoScroll() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const lastFrame = useRef(0);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = video?.closest('.video-scroll');
    if (!video || !section) return;

    let ticking = false;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      targetProgress.current = progress;

      const y = window.scrollY;
      scrollVelocity.current = Math.max(-3, Math.min(3, (y - lastScrollY.current) / 24));
      lastScrollY.current = y;

      const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActive((current) => current === next ? current : next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { scrollVelocity.current = 0; }, 90);
    };

    const tick = (now: number) => {
      const dt = Math.min(32, now - lastFrame.current || 16.67);
      lastFrame.current = now;

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && Number.isFinite(video.duration) && video.duration > 0) {
        const target = targetProgress.current;
        const current = currentProgress.current;
        const error = target - current;
        const velocity = scrollVelocity.current;

        // While scrolling forward, let the browser's hardware video decoder play
        // continuously instead of forcing a 4K seek on every scroll event.
        // This is dramatically smoother on high-refresh-rate displays.
        if (Math.abs(velocity) > 0.03 && velocity > 0) {
          const rate = Math.min(3.5, Math.max(0.65, Math.abs(error) * 10 + Math.abs(velocity) * 0.45));
          video.playbackRate = rate;
          if (video.paused) void video.play().catch(() => {});
          currentProgress.current += ((video.currentTime / video.duration) - current) * 0.35;
        } else {
          // For reverse scrolling / when the user stops, converge to the exact
          // scroll position. Use fastSeek for large jumps when supported.
          video.pause();
          const next = current + error * Math.min(1, dt / 85);
          const nextTime = next * video.duration;
          if (Math.abs(nextTime - video.currentTime) > 0.012) {
            if (Math.abs(nextTime - video.currentTime) > 0.35 && 'fastSeek' in video) {
              video.fastSeek(Math.max(0, Math.min(video.duration, nextTime)));
            } else {
              video.currentTime = Math.max(0, Math.min(video.duration, nextTime));
            }
          }
          currentProgress.current = next;
        }

        // If playback has caught the scroll position, stop without introducing
        // another expensive seek.
        if (Math.abs(error) < 0.004 && Math.abs(velocity) < 0.03 && !video.paused) {
          video.pause();
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (idleTimer) clearTimeout(idleTimer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="video-scroll" aria-label="AK Fitness cinematic story">
      <div className="video-sticky">
        <video
          ref={videoRef}
          className="scroll-video"
          src={usingFallback ? FALLBACK_SRC : VIDEO_SRC}
          poster="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=2600"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          onLoadedMetadata={() => setReady(true)}
          onError={() => {
            if (!usingFallback) {
              setUsingFallback(true);
              setReady(false);
            }
          }}
          aria-hidden="true"
        />
        <div className="video-shade" />
        <div className="video-grain" />

        <div className="video-progress">
          <span>{String(active + 1).padStart(2, '0')}</span><i /><span>{String(steps.length).padStart(2, '0')}</span>
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
          <span className={ready ? 'ready' : ''}>{ready ? (usingFallback ? 'VIDEO / FALLBACK' : 'VIDEO / READY') : 'LOADING FILM'}</span>
          <span>SCROLL CONTROLLED / HIGH FPS</span>
        </div>
      </div>

      <div className="video-track" aria-hidden="true">
        {steps.map((step) => <div key={step.id} id={step.id} className="video-marker" />)}
      </div>
    </section>
  );
}
