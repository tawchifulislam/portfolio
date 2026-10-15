'use client';

import { useEffect, useRef } from 'react';

const TEXT_FIELDS = 'input, textarea, select, [contenteditable="true"]';
const INTERACTIVE = 'a, button, summary, [role="button"], label[for]';
const FOLLOW_SPEED = 0.2;

export default function CustomCursor() {
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!ring || !label || !canHover.matches || reducedMotion.matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let started = false;

    const draw = () => {
      ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const tick = () => {
      x += (targetX - x) * FOLLOW_SPEED;
      y += (targetY - y) * FOLLOW_SPEED;
      draw();
      const settled =
        Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = event => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!started) {
        started = true;
        x = targetX;
        y = targetY;
        draw();
        ring.dataset.visible = 'true';
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onOver = event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest(TEXT_FIELDS)) {
        ring.dataset.state = 'text';
        return;
      }
      if (target.closest(INTERACTIVE)) {
        ring.dataset.state = 'link';
        return;
      }
      const dragZone = target.closest('[data-cursor="drag"]');
      if (dragZone) {
        label.textContent = dragZone.dataset.cursorLabel ?? 'Drag';
        ring.dataset.state = 'drag';
        return;
      }
      ring.dataset.state = 'idle';
    };

    const onDown = () => {
      ring.dataset.pressed = 'true';
    };
    const onUp = () => {
      delete ring.dataset.pressed;
    };
    const onLeave = () => {
      ring.dataset.visible = 'false';
    };
    const onEnter = () => {
      if (started) ring.dataset.visible = 'true';
    };

    const root = document.documentElement;
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    root.addEventListener('mouseleave', onLeave);
    root.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      root.removeEventListener('mouseleave', onLeave);
      root.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      data-state="idle"
      data-visible="false"
      className="cursor-ring"
    >
      <span ref={labelRef} className="cursor-ring__label" />
    </div>
  );
}
