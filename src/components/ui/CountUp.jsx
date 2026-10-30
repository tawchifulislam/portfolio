'use client';

import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'motion/react';

export default function CountUp({ value }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    const target = Number(value);
    if (!node || reduce || !Number.isFinite(target)) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.textContent = '0';
    let controls;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        controls = animate(0, target, {
          duration: 1.4,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: current => {
            node.textContent = String(Math.round(current));
          },
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [value, reduce]);

  return <span ref={ref}>{value}</span>;
}
