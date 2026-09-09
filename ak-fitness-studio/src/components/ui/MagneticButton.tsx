'use client';

import { useRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

export default function MagneticButton({ children, className = '', ...props }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.14;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.14;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <a ref={ref} onMouseMove={move} onMouseLeave={reset} className={`magnetic ${className}`} {...props}>
      {children}
    </a>
  );
}
