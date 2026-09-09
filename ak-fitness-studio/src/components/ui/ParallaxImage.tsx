'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef } from 'react';

type Props = Omit<ImageProps, 'alt'> & {
  alt: string;
  className?: string;
  intensity?: number;
};

export default function ParallaxImage({ alt, className = '', intensity = 16, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight;
      const image = ref.current.querySelector('img');
      if (image) image.style.transform = `scale(1.08) translate3d(0, ${progress * intensity}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={`parallax-image ${className}`}>
      <Image {...props} alt={alt} fill sizes="(max-width: 800px) 100vw, 70vw" />
    </div>
  );
}
