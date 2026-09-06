'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CornerMarks from '@/components/ui/CornerMarks';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="sheet max-w-md w-full p-10 flex flex-col items-center text-center gap-6">
        <CornerMarks />

        <p className="font-mono text-6xl text-line">404</p>

        <div className="flex flex-col items-center gap-3">
          <span className="stamp">SHEET NOT FOUND</span>
          <h2 className="font-display text-h3 font-semibold text-paper">
            Lost in the void.
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            The page you are looking for does not exist or has been moved
            somewhere else.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-6 py-3 border border-line text-muted hover:text-paper hover:border-faint text-xs font-medium tracking-wide transition-colors duration-300"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      </div>
    </div>
  );
}
