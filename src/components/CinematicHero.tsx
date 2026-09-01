/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef } from 'react';
import { useScrollFrame } from '@/src/hooks/useScrollFrame';

const TOTAL_FRAMES = 120;
const PRELOAD_RADIUS = 4;

function getFrameSrc(frame: number) {
  return `/frames/hero/frame_${String(frame).padStart(4, '0')}.webp`;
}

function preloadFrame(frame: number) {
  if (frame < 1 || frame > TOTAL_FRAMES) return;

  const image = new Image();
  image.src = getFrameSrc(frame);
}

export default function CinematicHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frame = useScrollFrame({
    targetRef: sectionRef,
    totalFrames: TOTAL_FRAMES,
  });

  useEffect(() => {
    for (let offset = -PRELOAD_RADIUS; offset <= PRELOAD_RADIUS; offset += 1) {
      preloadFrame(frame + offset);
    }
  }, [frame]);

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
              alt="The Sparks Brothers"
              className="mx-auto h-auto w-full max-w-md object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
