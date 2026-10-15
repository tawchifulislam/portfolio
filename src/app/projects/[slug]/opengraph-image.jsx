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
        background: '#0b1220',
        color: '#f1ebdd',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 20,
          color: '#8e9cb6',
        }}
      >
        <span>TAWCHIFUL ISLAM</span>
        <span>CASE STUDY</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontSize: 72, fontWeight: 700 }}>
          {project?.title ?? 'Project'}
        </span>
        <span style={{ fontSize: 26, color: '#b7c2d8', maxWidth: 900 }}>
          {project?.summary ?? ''}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: '#e3a13a',
          }}
        />
        <span style={{ fontSize: 20, color: '#8e9cb6' }}>
          tawchif.vercel.app
        </span>
      </div>
    </div>,
    { ...size },
  );
}
