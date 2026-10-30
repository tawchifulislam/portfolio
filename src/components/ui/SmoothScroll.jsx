'use client';

import 'lenis/dist/lenis.css';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll() {
  return <ReactLenis root options={{ anchors: { offset: -72 } }} />;
}
