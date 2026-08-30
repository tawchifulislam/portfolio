'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 };
  const dotX = useSpring(0, { stiffness: 600, damping: 30 });
  const dotY = useSpring(0, { stiffness: 600, damping: 30 });
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = e => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Add hover listeners after DOM is ready
    const timer = setTimeout(addHoverListeners, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(timer);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches
  )
    return null;

  return (
    <>
      {/* Dot - fast, precise */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-99999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* Ring - slow, lags behind */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 1.8 : isClicked ? 0.8 : 1,
          borderColor: isHovered
            ? 'rgba(167, 139, 250, 0.8)'
            : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { type: 'spring', stiffness: 200, damping: 15 },
          borderColor: { duration: 0.2 },
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-99998 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
