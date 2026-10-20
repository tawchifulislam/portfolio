import { getSiteData } from '@/lib/cms';

export default async function About() {
  const { about } = await getSiteData();
  const { paragraphs, focuses } = about;
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-5 pb-8 pt-24 sm:px-8 lg:px-14"
    >
      <div className="mx-auto grid max-w-340 grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="eyebrow">About</p>
          <h2
            id="about-heading"
            className="mb-6 mt-2.5 font-display text-h1 leading-[1.1]"
          >
            {about.heading}
          </h2>
          <div className="flex max-w-136 flex-col gap-4 text-soft">
            {paragraphs.map(text => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,13.75rem),1fr))] content-start gap-5">
          {focuses.map(item => (
            <li key={item.title} className="card p-6">
              <h3 className="mb-1.5 font-display text-[1.0625rem]">
                {item.title}
              </h3>
              <p className="text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
