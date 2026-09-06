export default function LogoMark({ className = 'w-8 h-8' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="14" y="15" width="72" height="6" fill="currentColor" />
      <rect x="46" y="15" width="8" height="70" fill="currentColor" />

      <rect x="64" y="34" width="6" height="46" fill="currentColor" />
      <rect x="58" y="34" width="18" height="4" fill="currentColor" />
      <rect x="58" y="76" width="18" height="4" fill="currentColor" />

      <path
        d="M8 8h9M8 8v9"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
      <path
        d="M92 92h-9M92 92v-9"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />

      <rect x="88" y="10" width="5" height="5" className="fill-brass" />
    </svg>
  );
}
