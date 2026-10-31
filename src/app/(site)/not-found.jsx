import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="theme-cobalt flex min-h-screen items-center px-5 py-32 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-340">
        <h1 className="mb-4 max-w-3xl font-display text-huge leading-[1.02]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mb-8 max-w-md text-lg text-soft">
          The link may be broken, or the page may have moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
