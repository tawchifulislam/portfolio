import { ImageResponse } from 'next/og';

export const alt = 'Tawchiful Islam, Full-Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#0b1220',
        backgroundImage:
          'radial-gradient(circle at 88% 12%, rgba(227,161,58,0.3), rgba(11,18,32,0) 45%)',
        color: '#f1ebdd',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="56" height="56" viewBox="0 0 100 100">
          <rect x="14" y="15" width="72" height="6" fill="#f1ebdd" />
          <rect x="46" y="15" width="8" height="70" fill="#f1ebdd" />
          <rect x="64" y="34" width="6" height="46" fill="#f1ebdd" />
          <rect x="58" y="34" width="18" height="4" fill="#f1ebdd" />
          <rect x="58" y="76" width="18" height="4" fill="#f1ebdd" />
          <rect x="88" y="10" width="5" height="5" fill="#e3a13a" />
        </svg>
        <span style={{ fontSize: 32, fontWeight: 700 }}>Tawchiful.</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
          Tawchiful Islam
        </span>
        <span style={{ fontSize: 40, color: '#e3a13a' }}>
          Full-Stack Developer
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 26,
          color: '#8e9cb6',
        }}
      >
        <span>Chittagong, Bangladesh</span>
        <span>tawchif.vercel.app</span>
      </div>
    </div>,
    { ...size },
  );
}
