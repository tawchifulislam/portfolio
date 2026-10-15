'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-32">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mb-3 mt-3 font-display text-h1 leading-[1.1]">
          This page hit an unexpected error.
        </h1>
        <p className="mb-8 text-muted">
          Try again, or head back to the home page.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <button type="button" onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
