import { ImageResponse } from 'next/og';
import { getProfile } from '@/lib/cms';

export const alt = 'Tawchiful Islam, full-stack developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const { personalInfo } = await getProfile();
  const heights = [200, 280, 360, 440];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: '#2a3cf2',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {heights.map((h, i) => (
            <div
              key={h}
              style={{
                width: 36,
                height: h / 4,
                borderRadius: 8,
                background: i === 3 ? '#ffd23f' : '#ffffff',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            {personalInfo.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 24, color: '#dfe3ff' }}>
            {personalInfo.title}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
