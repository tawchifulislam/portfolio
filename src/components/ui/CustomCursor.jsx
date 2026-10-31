'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="button"], summary, label[for]';
const TEXT_FIELDS = 'input, textarea, select';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const setState = element => {
      if (!element) {
        ring.dataset.state = 'idle';
        return;
      }
      if (element.closest(TEXT_FIELDS)) {
        ring.dataset.state = 'text';
        return;
      }
      const view = element.closest('[data-cursor="view"]');
      if (view) {
        label.textContent = view.getAttribute('data-cursor-label') || 'View';
        ring.dataset.state = 'view';
        return;
      }
      ring.dataset.state = element.closest(INTERACTIVE) ? 'link' : 'idle';
    };

    const onMove = event => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (ring.dataset.visible !== 'true') {
        current.x = event.clientX;
        current.y = event.clientY;
        ring.dataset.visible = 'true';
      }
    };
    const onOver = event => setState(event.target);
    const onLeave = () => {
      ring.dataset.visible = 'false';
    };
    const onDown = () => {
      ring.dataset.pressed = 'true';
    };
    const onUp = () => {
      ring.dataset.pressed = 'false';
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="cursor-ring"
      data-state="idle"
      data-visible="false"
    >
      <span ref={labelRef} className="cursor-ring__label" />
    </div>
  );
}
