/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef } from 'react';
import { useScrollFrame } from '@/src/hooks/useScrollFrame';

const TOTAL_FRAMES = 240;
const PRELOAD_RADIUS = 4;

function getFrameSrc(frame: number) {
  return `/frames/inital/frame-${String(frame).padStart(5, '0')}.jpg`;
}

function preloadFrame(frame: number) {
  if (frame < 1 || frame > TOTAL_FRAMES) return;

  const image = new Image();
  image.src = getFrameSrc(frame);
}

export default function InitialHero() {
  const frameSectionRef = useRef<HTMLDivElement | null>(null);
  const frame = useScrollFrame({
    targetRef: frameSectionRef,
    totalFrames: TOTAL_FRAMES,
  });

  useEffect(() => {
    for (let offset = -PRELOAD_RADIUS; offset <= PRELOAD_RADIUS; offset += 1) {
      preloadFrame(frame + offset);
    }
  }, [frame]);

  return (
    <section className="bg-black text-white">
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
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.4em] text-white/60">
              Frame {String(frame).padStart(5, '0')} /{' '}
              {String(TOTAL_FRAMES).padStart(5, '0')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
