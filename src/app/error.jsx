'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import CornerMarks from '@/components/ui/CornerMarks';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="sheet max-w-md w-full p-10 flex flex-col items-center text-center gap-6">
        <CornerMarks />

        <p className="font-mono text-6xl text-line">500</p>

        <div className="flex flex-col items-center gap-3">
          <span className="stamp">RENDER FAILED</span>
          <h2 className="font-display text-h3 font-semibold text-paper">
            Something broke on this sheet.
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            An unexpected error occurred while rendering this page. Try again,
            or head back home.
          </p>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 border border-line text-muted hover:text-paper hover:border-faint text-xs font-medium tracking-wide transition-colors duration-300"
        >
          <RefreshCw size={14} /> Try Again
        </button>
      </div>
    </div>
  );
}
