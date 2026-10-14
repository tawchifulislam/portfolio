import { getAllProjectsMeta } from '@/lib/projects';
import Work from '@/components/sections/Work';

export const metadata = {
  title: 'Work - Tawchiful Islam',
  description:
    'Full-stack projects and internship capstones, presented as case studies.',
};

export default function ProjectsPage() {
  return <Work projects={getAllProjectsMeta()} />;
}
