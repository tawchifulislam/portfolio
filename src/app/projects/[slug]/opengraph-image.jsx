import { ImageResponse } from 'next/og';
import { getAllProjectsMeta, getProjectSlugs } from '@/lib/projects';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  return getProjectSlugs().map(slug => ({ slug }));
}

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const project = getAllProjectsMeta().find(p => p.slug === slug);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        background: '#0b1420',
        color: '#ede8dc',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 20,
          color: '#8a93a0',
        }}
      >
        <span>TAWCHIFUL ISLAM</span>
        <span>CASE STUDY</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontSize: 64, fontWeight: 600 }}>
          {project?.title ?? 'Project'}
        </span>
        <span style={{ fontSize: 24, color: '#8a93a0', maxWidth: 900 }}>
          {project?.summary ?? ''}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 12, height: 12, background: '#d99a3d' }} />
        <span style={{ fontSize: 18, color: '#8a93a0' }}>
          tawchif.vercel.app
        </span>
      </div>
    </div>,
    { ...size },
  );
}
