'use client';

import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
