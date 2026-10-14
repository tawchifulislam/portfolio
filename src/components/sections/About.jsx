const paragraphs = [
  "I'm a self-taught full-stack developer from Chittagong. My formal programming journey began in 2025, though I'd been absorbing how software is made long before I wrote my first line of code. Since then I've built and deployed complete products: a gym management platform, a doctor appointment system, a travel discovery platform with an AI assistant, and a crowdfunding app.",
  'What I enjoy most is the moment a hard problem finally makes sense. I try to build the parts users never see but always depend on: role-based access, payments, scheduled jobs, and graceful handling of retries and dropped connections.',
  'In 2026 I completed the FlyRank AI Internship Program in the Backend AI Engineering track. Each of my three approved capstones ships with a design document, a build log and recorded evidence of its checks, along with a plain list of what it does not do.',
  "Away from the keyboard, you'll find me with a book, any genre, or playing football.",
];

const focuses = [
  {
    title: 'Real problems first',
    text: "Booking a doctor, managing a gym, planning a trip. Every project starts from someone's actual need.",
  },
  {
    title: 'Whole-system thinking',
    text: 'React and Next.js interfaces, Express APIs and MongoDB schemas, built as one system with clear boundaries between the parts.',
  },
  {
    title: 'Interfaces that feel considered',
    text: 'Responsive, accessible and quick to load, built with Tailwind and Framer Motion.',
  },
  {
    title: 'Dependable by design',
    text: 'JWT auth, role-based access, idempotent writes, verified webhooks and honest error codes are planned in from the start, not patched on.',
  },
];

export default function About() {
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
            Self-taught, and building things that hold up.
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
