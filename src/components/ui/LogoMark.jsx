export default function LogoMark({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <rect width="64" height="64" rx="18" fill="#2a3cf2" />
      <rect x="11.5" y="13" width="8" height="22" rx="4" fill="#ffffff" />
      <rect x="22.5" y="13" width="8" height="22" rx="4" fill="#ffffff" />
      <rect x="33.5" y="13" width="8" height="22" rx="4" fill="#ffffff" />
      <rect x="44.5" y="13" width="8" height="38" rx="4" fill="#ffd23f" />
    </svg>
  );
}
