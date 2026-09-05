import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Reads from the filesystem, only import this inside Server Components.
const PROJECTS_DIR = path.join(process.cwd(), 'src/content/projects');

function getProjectFiles() {
  return fs.readdirSync(PROJECTS_DIR).filter(file => file.endsWith('.mdx'));
}

export function getAllProjectsMeta() {
  const projects = getProjectFiles().map(file => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8');
    const { data } = matter(raw);
    return data;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects() {
  return getAllProjectsMeta().filter(project => project.featured);
}

export function getProjectSlugs() {
  return getProjectFiles().map(file => file.replace(/\.mdx$/, ''));
}

export async function getProjectBySlug(slug, components = {}) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, frontmatter } = await compileMDX({
    source: raw,
    components,
    options: { parseFrontmatter: true },
  });

  return { content, frontmatter };
}

export function getAdjacentProject(slug) {
  const projects = getAllProjectsMeta();
  const index = projects.findIndex(project => project.slug === slug);
  if (index === -1) return null;

  return projects[(index + 1) % projects.length];
}
