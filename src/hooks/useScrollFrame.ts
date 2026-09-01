'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

type UseScrollFrameOptions = {
  targetRef: RefObject<HTMLElement | null>;
  totalFrames: number;
};

export function useScrollFrame({ targetRef, totalFrames }: UseScrollFrameOptions) {
  const [frame, setFrame] = useState(1);
  const ticking = useRef(false);

  useEffect(() => {
    const updateFrame = () => {
      const target = targetRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const nextFrame = Math.min(
        totalFrames,
        Math.max(1, Math.floor(progress * (totalFrames - 1)) + 1),
      );

      setFrame((currentFrame) =>
        currentFrame === nextFrame ? currentFrame : nextFrame,
      );
    };

    const scheduleUpdate = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        updateFrame();
        ticking.current = false;
      });
    };

    scheduleUpdate();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [targetRef, totalFrames]);

  return frame;
}
