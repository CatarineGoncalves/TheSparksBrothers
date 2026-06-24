/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

function getFrameSrc(frame: number) {
  return `/frames/inital/frame-${String(frame).padStart(5, '0')}.jpg`;
}

export default function InitalHero() {
  const [frame, setFrame] = useState(1);

  const sectionRef = useRef<HTMLElement | null>(null);
  const textSectionRef = useRef<HTMLDivElement | null>(null);
  const frameSectionRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const preloadFrames = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
      }
    };

    const updateFrame = () => {
      const frameSection = frameSectionRef.current;

      if (!frameSection) return;

      const rect = frameSection.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;

      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);

      const currentFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.ceil(progress * TOTAL_FRAMES)),
      );

      setFrame(currentFrame);
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateFrame();
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    preloadFrames();
    updateFrame();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateFrame);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateFrame);
    };
  }, []);

  const scrollToFrames = () => {
    frameSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section ref={sectionRef} className="bg-black text-white">
      {/* PRIMEIRA PARTE: TEXTO CHAMANDO AS PESSOAS */}
      <div
        ref={textSectionRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_35%),linear-gradient(180deg,#050505_0%,#000_100%)]" />

        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:80px_80px]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.55em] text-white/60 md:text-sm">
            Uma nova aventura está começando
          </p>

          <h1 className="text-5xl font-black leading-[0.9] tracking-[-0.08em] md:text-8xl lg:text-9xl">
            Entre no universo
            <br />
            dos Sparks Brothers.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">
            Role a página para revelar os últimos frames do vídeo, como se a
            cena estivesse ganhando vida conforme o seu movimento.
          </p>

          <button
            type="button"
            onClick={scrollToFrames}
            className="mt-10 rounded-full border border-white/30 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:scale-105 hover:bg-white/85"
          >
            Começar experiência
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/45">
            Role para descobrir
          </p>

          <div className="mx-auto h-14 w-[1px] overflow-hidden bg-white/20">
            <div className="h-1/2 w-full animate-pulse bg-white" />
          </div>
        </div>
      </div>

      {/* SEGUNDA PARTE: FRAMES POR SCROLL */}
      <div ref={frameSectionRef} className="relative h-[500vh] bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img
            src={getFrameSrc(frame)}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.5em] text-white/70">
                Seu novo desenho favorito
              </p>

              <img
                src="/assets/logo_pt.png"
                alt="The Sparks Brothers"
                className="mx-auto h-auto w-full max-w-md object-contain drop-shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
                draggable={false}
              />

              <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
                Cada rolagem revela um novo instante. O fim do vídeo vira uma
                experiência cinematográfica frame por frame.
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-white/60">
              Frame {String(frame).padStart(5, '0')} /{' '}
              {String(TOTAL_FRAMES).padStart(5, '0')}
            </p>

            <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: `${(frame / TOTAL_FRAMES) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}