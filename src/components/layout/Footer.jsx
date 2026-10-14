export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 sm:px-8 lg:px-14">
      <div className="mx-auto flex max-w-340 flex-wrap items-center justify-between gap-3 py-7 text-[0.8125rem] text-subtle">
        <span>© {year} Tawchiful Islam</span>
        <span>Built with React and Next.js.</span>
      </div>
    </footer>
  );
}
