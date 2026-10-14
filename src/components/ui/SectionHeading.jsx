export default function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <div className="mb-10">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-2.5 mb-2 font-display text-h1 leading-[1.1]">
        {title}
      </h2>
      {description && <p className="max-w-140 text-muted">{description}</p>}
    </div>
  );
}
