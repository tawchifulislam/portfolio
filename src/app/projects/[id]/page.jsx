import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectDetail from './ProjectDetail';

export async function generateStaticParams() {
  return projects.map(project => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  // ডাটাতে id স্ট্রিং হিসেবে আছে, তাই সরাসরি id ব্যবহার করুন
  const project = projects.find(p => p.id === id);

  if (!project) return {};

  return {
    title: `${project.title} — Tawchiful Islam`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  // টাইপ মেলানোর জন্য সরাসরি id দিয়ে খুঁজুন
  const project = projects.find(p => p.id === id);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
