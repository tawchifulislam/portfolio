'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

const MAX_CELLS = 12;
const EASE = [0.22, 1, 0.36, 1];

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
      className="w-60 rounded-2xl border border-line-3 bg-ink/85 p-4 backdrop-blur-md"
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
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const sy = useSpring(rawY, { stiffness: 60, damping: 18 });
  const { scrollY } = useScroll();

  const discX = useTransform(sx, [-0.5, 0.5], [16, -16]);
  const discPointerY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const discScrollY = useTransform(scrollY, [0, 700], [0, -90]);
  const discY = useTransform([discPointerY, discScrollY], ([a, b]) => a + b);
  const ringRotate = useTransform(scrollY, [0, 1400], [0, 160]);
  const portraitX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const portraitY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const portraitScale = useTransform(scrollY, [0, 700], [1, 1.08]);
  const cardX = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    if (reduce) return;
    const sweepX = animate(rawX, [-0.22, 0.22, -0.22], {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    const sweepY = animate(rawY, [-0.12, 0.12, -0.12], {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
    });
    const onMove = event => {
      sweepX.stop();
      sweepY.stop();
      rawX.set(event.clientX / window.innerWidth - 0.5);
      rawY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      sweepX.stop();
      sweepY.stop();
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce, rawX, rawY]);

  const hasImage = Boolean(src) && !failed;

  return (
    <div className="relative mx-auto aspect-4/5 w-full max-w-sm sm:max-w-md lg:max-w-md">
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[4%] left-1/2 aspect-square w-[80%] -translate-x-1/2"
        style={reduce ? undefined : { x: discX, y: discY }}
        initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          style={reduce ? undefined : { rotate: ringRotate }}
        >
          <circle
            cx="50"
            cy="50"
            r="62"
            fill="none"
            stroke="var(--color-brass)"
            strokeOpacity="0.5"
            strokeWidth="0.8"
            strokeDasharray="0.4 3"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="74"
            fill="none"
            stroke="var(--color-brass)"
            strokeOpacity="0.18"
            strokeWidth="0.4"
          />
        </motion.svg>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f3c26b,#e3a13a_55%,#c98a22)]" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: reduce ? 0 : 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.35, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0 origin-bottom"
          style={
            reduce
              ? undefined
              : { x: portraitX, y: portraitY, scale: portraitScale }
          }
        >
          {hasImage ? (
            <div
              className="absolute inset-0"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to top, transparent 0%, #000 10%)',
                maskImage: 'linear-gradient(to top, transparent 0%, #000 10%)',
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(min-width: 1024px) 448px, 90vw"
                onError={() => setFailed(true)}
                className="object-contain object-bottom drop-shadow-[0_0_28px_rgba(227,161,58,0.28)]"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-8xl text-ink">
              TI
            </div>
          )}
        </motion.div>
      </motion.div>

      {flow && (
        <motion.div
          className="absolute bottom-8 left-0 z-10 sm:-left-8"
          style={reduce ? undefined : { x: cardX, y: cardY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <ReplayCard
            requests={flow.requests}
            winners={flow.winners}
            reduce={reduce}
          />
        </motion.div>
      )}
    </div>
  );
}
