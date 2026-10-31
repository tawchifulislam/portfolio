import { ImageResponse } from 'next/og';
import { getProject } from '@/lib/cms';

export const alt = 'Project case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  const { slug } = await params;
  const project = await getProject(slug);
  const title = project?.title ?? 'Project';
  const summary = project?.summary ?? '';

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
          background: '#0a0f2e',
          color: '#ffffff',
        }}
      >
        <div style={{ fontSize: 32, color: '#ffd23f' }}>Tawchiful Islam</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 36, marginTop: 28, color: '#c9cdf5' }}>
            {summary.slice(0, 120)}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
