'use client';

import { ArrowUp } from 'lucide-react';
import { useScrollTop } from '@/hooks/useScrollTop';

export default function ScrollToTop() {
  const { isVisible, scrollToTop } = useScrollTop();

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      inert={!isVisible}
      className={`fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line-3 bg-panel/90 text-soft backdrop-blur-sm transition duration-200 hover:border-brass hover:text-brass-hover sm:right-8 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ArrowUp size={18} />
    </button>
  );
}
