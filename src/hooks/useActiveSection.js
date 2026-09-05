'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds, options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: options.rootMargin ?? '-45% 0px -45% 0px',
        threshold: options.threshold ?? [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds, options.rootMargin, options.threshold]);

  return activeSection;
}
