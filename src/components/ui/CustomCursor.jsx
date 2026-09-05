'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const crossX = useSpring(0, { stiffness: 600, damping: 30 });
  const crossY = useSpring(0, { stiffness: 600, damping: 30 });
  const ringX = useSpring(0, { stiffness: 250, damping: 26, mass: 0.5 });
  const ringY = useSpring(0, { stiffness: 250, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = e => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      crossX.set(e.clientX);
      crossY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label',
      );
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const timer = setTimeout(addHoverListeners, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timer);
    };
  }, [crossX, crossY, ringX, ringY]);

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  )
    return null;

  return (
    <>
      <motion.div
        style={{ x: crossX, y: crossY }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 pointer-events-none z-99999 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-2.5 h-2.5">
          <span className="absolute top-1/2 left-0 w-full h-px bg-brass -translate-y-1/2" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-brass -translate-x-1/2" />
        </div>
      </motion.div>

      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered
            ? 'var(--color-brass)'
            : 'rgba(237, 232, 220, 0.25)',
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 200, damping: 16 },
          borderColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 w-7 h-7 border pointer-events-none z-99998 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
