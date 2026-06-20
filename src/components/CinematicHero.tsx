/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 120;

function getFrameSrc(frame: number) {
  return `/frames/hero/frame_${String(frame).padStart(4, '0')}.webp`;
}

export default function CinematicHero() {
  const [frame, setFrame] = useState(1);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const preloadFrames = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
      }
    };

    const updateFrame = () => {
      const section = sectionRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      const currentFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(progress * TOTAL_FRAMES)),
      );

      setFrame(currentFrame);
    };

    preloadFrames();
    updateFrame();

    window.addEventListener('scroll', updateFrame, { passive: true });
    window.addEventListener('resize', updateFrame);

    return () => {
      window.removeEventListener('scroll', updateFrame);
      window.removeEventListener('resize', updateFrame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <img
          src={getFrameSrc(frame)}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.5em] text-white/70">
              Seu novo desenho favorito
            </p>

            <img
              src="/assets/logo_pt.png"
              alt="Logo"
              className="mx-auto h-auto w-full max-w-md object-contain"
              draggable={false}
            />

            {/* <button className="mt-10 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-xl transition hover:bg-white hover:text-black">
              Entrar na sessão
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
