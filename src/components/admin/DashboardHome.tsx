import { Link } from '@payloadcms/ui';
import { SITE_URL } from '@/lib/constants';

export default async function DashboardHome({ payload }: { payload: any }) {
  const siteUrl =
    process.env.NODE_ENV === 'production' ? SITE_URL : 'http://localhost:3000';

  const [projects, experience, techStack, unread] = await Promise.all([
    payload.count({ collection: 'projects' }),
    payload.count({ collection: 'experience' }),
    payload.count({ collection: 'tech-stack' }),
    payload.count({
      collection: 'messages',
      where: { isRead: { equals: false } },
    }),
  ]);

  const stats = [
    {
      label: 'Projects',
      value: projects.totalDocs,
      href: '/admin/collections/projects',
    },
    {
      label: 'Experience',
      value: experience.totalDocs,
      href: '/admin/collections/experience',
    },
    {
      label: 'Tech stack',
      value: techStack.totalDocs,
      href: '/admin/collections/tech-stack',
    },
    {
      label: 'Unread messages',
      value: unread.totalDocs,
      href: '/admin/collections/messages',
      alert: unread.totalDocs > 0,
    },
  ];

  const actions = [
    { label: 'New project', href: '/admin/collections/projects/create' },
    { label: 'Hero and profile', href: '/admin/globals/profile' },
    { label: 'About', href: '/admin/globals/about' },
    { label: 'Upload image', href: '/admin/collections/media/create' },
  ];

  return (
    <section className="pf-home">
      <header className="pf-home__head">
        <div>
          <h2 className="pf-home__title">Portfolio</h2>
          <p className="pf-home__sub">
            Edit anything here. Changes appear on the site within seconds.
          </p>
        </div>
        <a
          className="pf-home__site"
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View site ↗
        </a>
      </header>

      <div className="pf-home__stats">
        {stats.map(stat => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`pf-stat${stat.alert ? ' pf-stat--alert' : ''}`}
          >
            <span className="pf-stat__value">{stat.value}</span>
            <span className="pf-stat__label">{stat.label}</span>
          </Link>
        ))}
      </div>

      <div className="pf-home__actions">
        {actions.map(action => (
          <Link key={action.label} href={action.href} className="pf-action">
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
