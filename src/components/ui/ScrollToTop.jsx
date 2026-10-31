'use client';

import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useScrollTop } from '@/hooks/useScrollTop';

export default function ScrollToTop() {
  const lenis = useLenis();
  const { isVisible } = useScrollTop(600);

  const goTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      inert={!isVisible}
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-night text-chalk shadow-lg transition-all duration-300 hover:bg-signal hover:text-night ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
