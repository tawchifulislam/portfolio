export default function Logo() {
  return (
    <div className="pf-logo">
      <svg viewBox="0 0 100 100" width="36" height="36" aria-hidden="true">
        <rect x="14" y="15" width="72" height="6" fill="currentColor" />
        <rect x="46" y="15" width="8" height="70" fill="currentColor" />
        <rect x="64" y="34" width="6" height="46" fill="currentColor" />
        <rect x="58" y="34" width="18" height="4" fill="currentColor" />
        <rect x="58" y="76" width="18" height="4" fill="currentColor" />
        <rect x="88" y="10" width="5" height="5" fill="#e3a13a" />
      </svg>
      <span className="pf-logo__text">
        Tawchiful<span>.</span>
      </span>
    </div>
  );
}
