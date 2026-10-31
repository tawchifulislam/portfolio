'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="theme-cobalt flex min-h-screen items-center px-5 py-32 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-340">
        <h1 className="mb-4 max-w-3xl font-display text-huge leading-[1.02]">
          This page hit an unexpected error.
        </h1>
        <p className="mb-8 max-w-md text-lg text-soft">
          Try again, or go back to the home page.
        </p>
        <div className="flex flex-wrap gap-3.5">
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
