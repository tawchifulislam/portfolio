import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-32">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mb-3 mt-3 font-display text-h1 leading-[1.1]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mb-8 text-muted">
          The link may be broken, or the page may have moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
