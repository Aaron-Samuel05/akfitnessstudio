'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC = 'https://videos.pexels.com/video-files/4746014/4746014-uhd_3840_2160_25fps.mp4';
const HERO_POSTER = 'https://images.unsplash.com/photo-1691916164036-445c4635edcd?auto=format&fit=crop&w=3840&q=92';
const steps = [
  { id: 'home', kicker: 'AK FITNESS STUDIO / INDIA', title: <>TRAIN<br/><span>HARD.</span></>, body: 'A performance-driven training studio built around strength, discipline and showing up.' },
  { id: 'training', kicker: 'THE METHOD', title: <>BUILT<br/><span>TO MOVE.</span></>, body: 'Strength. Conditioning. Personal training. No shortcuts, no noise — just better work.' },
  { id: 'space', kicker: 'THE SPACE', title: <>IRON.<br/><span>FOCUS.</span></>, body: 'A stripped-back training floor designed to keep the attention exactly where it belongs.' },
  { id: 'studio', kicker: 'THE STUDIO', title: <>SHOW<br/><span>UP.</span></>, body: 'Small-group energy, serious coaching and a community that expects more from itself.' },
  { id: 'contact', kicker: 'START HERE', title: <>MAKE<br/><span>NOISE.</span></>, body: 'Ready to train differently? Enter the studio and make your next session count.' },
];

export default function VideoScroll() {
  const videoRef = useRef<HTMLVideoElement>(null); const frameRef = useRef<number | null>(null); const targetProgress = useRef(0); const currentProgress = useRef(0); const lastScrollY = useRef(0); const scrollVelocity = useRef(0); const lastFrame = useRef(0); const lastSeekTime = useRef(0); const [active,setActive] = useState(0); const [ready,setReady] = useState(false);
  useEffect(() => {
    const video=videoRef.current; const section=video?.closest('.video-scroll'); if(!video||!section)return;
    let queued=false; let idle:ReturnType<typeof setTimeout>|undefined;
    const measure=()=>{const rect=section.getBoundingClientRect();const travel=Math.max(1,rect.height-window.innerHeight);targetProgress.current=Math.min(1,Math.max(0,-rect.top/travel));const y=window.scrollY;scrollVelocity.current=Math.max(-4,Math.min(4,(y-lastScrollY.current)/18));lastScrollY.current=y;const next=Math.min(steps.length-1,Math.floor(targetProgress.current*steps.length));setActive(v=>v===next?v:next);queued=false;};
    const onScroll=()=>{if(!queued){queued=true;requestAnimationFrame(measure)}if(idle)clearTimeout(idle);idle=setTimeout(()=>{scrollVelocity.current=0},90)};
    const tick=(now:number)=>{const dt=Math.min(32,now-(lastFrame.current||now-16.67));lastFrame.current=now;if(video.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA&&Number.isFinite(video.duration)&&video.duration>0){const target=targetProgress.current,current=currentProgress.current,error=target-current,velocity=scrollVelocity.current;if(velocity>.025&&error>.0005){video.playbackRate=Math.min(3.2,Math.max(.55,Math.abs(error)*10+velocity*.42));if(video.paused)void video.play().catch(()=>{});currentProgress.current=video.currentTime/video.duration}else{video.pause();const next=current+error*Math.min(1,dt/105);const nextTime=Math.max(0,Math.min(video.duration,next*video.duration));if(Math.abs(nextTime-video.currentTime)>.028&&now-lastSeekTime.current>42){if(Math.abs(nextTime-video.currentTime)>.4&&'fastSeek'in video)video.fastSeek(nextTime);else video.currentTime=nextTime;lastSeekTime.current=now}currentProgress.current=next;}}
      frameRef.current=requestAnimationFrame(tick);
    };
    measure();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',measure);frameRef.current=requestAnimationFrame(tick);
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',measure);if(idle)clearTimeout(idle);if(frameRef.current)cancelAnimationFrame(frameRef.current)};
  },[]);
  const scrollTo=(id:string)=>document.getElementById(`video-${id}`)?.scrollIntoView({behavior:'smooth'});
  return <section className="video-scroll" aria-label="AK Fitness cinematic story"><div className="video-sticky"><video ref={videoRef} className="scroll-video" src={VIDEO_SRC} poster={HERO_POSTER} muted playsInline preload="auto" disablePictureInPicture controlsList="nodownload noplaybackrate noremoteplayback" onLoadedMetadata={()=>setReady(true)} aria-hidden="true"/><div className="video-shade"/><div className="video-progress"><span>{String(active+1).padStart(2,'0')}</span><i/><span>{String(steps.length).padStart(2,'0')}</span></div><div className="video-copy-wrap">{steps.map((step,index)=><article key={step.id} className={`video-copy ${index===active?'is-active':''}`}><p className="video-kicker"><b/>{step.kicker}</p><h1>{step.title}</h1><p className="video-body">{step.body}</p><button className="video-arrow" onClick={()=>scrollTo(steps[Math.min(index+1,steps.length-1)].id)}>{index===steps.length-1?'ENTER THE STUDIO ↗':'SCROLL TO CONTINUE ↓'}</button></article>)}</div><div className="video-status"><span className={ready?'ready':''}>{ready?'FILM / 4K SOURCE':'LOADING FILM'}</span><span>SCROLL CONTROLLED / HARDWARE DECODE</span></div></div><div className="video-track" aria-hidden="true">{steps.map(step=><div key={step.id} id={`video-${step.id}`} className="video-marker" style={{height:'100vh'}}/>)}</div></section>;
}
