'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

const MAX_CELLS = 12;
const SHAPE = 'rounded-[2rem] rounded-br-[6rem]';

function ReplayCard({ requests, winners, reduce }) {
  const cells = Math.min(requests, MAX_CELLS);
  const winCount = Math.max(1, Math.min(winners, cells));
  const start = Math.min(2, cells - winCount);
  const cycle = cells + 16;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick(value => (value + 1) % cycle), 150);
    return () => clearInterval(id);
  }, [reduce, cycle]);

  const resolved = reduce || tick >= cells + 2;
  const lit = reduce ? cells : Math.min(tick, cells);

  return (
    <div
      role="img"
      aria-label={`${requests} concurrent requests, ${winners} applied`}
      className="absolute -bottom-1 left-3 z-10 w-60 rounded-2xl border border-line-3 bg-ink/85 p-4 backdrop-blur-md sm:-left-8"
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-subtle">
        Concurrent × {requests}
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: cells }, (_, index) => {
          const isWinner = index >= start && index < start + winCount;
          let state = 'bg-line-2';
          if (index < lit) state = 'bg-paper';
          if (resolved) {
            state = isWinner
              ? 'scale-110 bg-brass'
              : 'scale-75 bg-line-3 opacity-60';
          }
          return (
            <span
              key={index}
              className={`h-3.5 flex-1 rounded-xs transition-all duration-200 ${state}`}
            />
          );
        })}
      </div>
      <p className="mt-3 font-mono text-xs text-paper">
        <span className="text-brass">{winners} applied</span>
        {' · '}
        {Math.max(requests - winners, 0)} ignored
      </p>
    </div>
  );
}

export default function HeroPhoto({ src, alt, flow }) {
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();
  const cardRef = useRef(null);
  const controls = useRef([]);
  const mx = useMotionValue(50);
  const my = useMotionValue(38);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 140, damping: 16 });
  const rotateY = useSpring(tiltY, { stiffness: 140, damping: 16 });
  const spotlight = useMotionTemplate`radial-gradient(circle 190px at ${mx}% ${my}%, #000 0%, rgba(0,0,0,0.6) 55%, transparent 100%)`;
  const { scrollY } = useScroll();
  const slabY = useTransform(scrollY, [0, 800], [0, -48]);
  const imageY = useTransform(scrollY, [0, 800], [0, 48]);
  const imageScale = useTransform(scrollY, [0, 800], [1.06, 1.2]);

  useEffect(() => {
    if (reduce) return;
    controls.current = [
      animate(mx, [28, 72, 45, 66, 28], {
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(my, [30, 55, 70, 35, 30], {
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
    ];
    return () => controls.current.forEach(control => control.stop());
  }, [reduce, mx, my]);

  const handlePointerMove = event => {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    controls.current.forEach(control => control.stop());
    mx.set(px * 100);
    my.set(py * 100);
    if (event.pointerType === 'mouse') {
      tiltX.set((0.5 - py) * 10);
      tiltY.set((px - 0.5) * 12);
    }
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const layerStyle = reduce ? undefined : { y: imageY, scale: imageScale };

  return (
    <div className="relative mx-auto w-full max-w-sm pb-8 sm:max-w-md lg:max-w-md">
      <motion.div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 aspect-4/5 translate-x-3 translate-y-3 bg-brass sm:translate-x-5 sm:translate-y-5 ${SHAPE}`}
        style={reduce ? undefined : { y: slabY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative aspect-4/5 overflow-hidden border border-line-3 bg-panel-2 ${SHAPE}`}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        initial={
          reduce
            ? { opacity: 0 }
            : { clipPath: 'inset(100% 0% 0% 0%)' }
        }
        animate={
          reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }
        }
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {failed || !src ? (
          <div className="flex h-full w-full items-center justify-center font-display text-8xl text-brass">
            TI
          </div>
        ) : (
          <>
            <motion.div className="absolute inset-0" style={layerStyle}>
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(min-width: 1024px) 448px, 90vw"
                onError={() => setFailed(true)}
                className="object-cover object-top grayscale contrast-110"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-brass opacity-25 mix-blend-multiply"
              />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={
                reduce
                  ? undefined
                  : { maskImage: spotlight, WebkitMaskImage: spotlight }
              }
            >
              <motion.div className="absolute inset-0" style={layerStyle}>
                <Image
                  src={src}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 448px, 90vw"
                  className="object-cover object-top"
                />
              </motion.div>
            </motion.div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(11,18,32,0.55) 1px, transparent 1.6px)',
                backgroundSize: '7px 7px',
                WebkitMaskImage:
                  'linear-gradient(to top, #000, transparent 65%)',
                maskImage: 'linear-gradient(to top, #000, transparent 65%)',
              }}
            />
          </>
        )}
      </motion.div>

      {flow && (
        <ReplayCard
          requests={flow.requests}
          winners={flow.winners}
          reduce={reduce}
        />
      )}
    </div>
  );
}
