const WIDTH = 120;
const HEIGHT = 44;

// lines from the left edge merge into one point, like many requests into one event
export default function ConvergeGraphic({ from }) {
  const count = Math.min(Math.max(from, 1), 12);
  const cy = HEIGHT / 2;
  const gap = count > 1 ? (HEIGHT - 8) / (count - 1) : 0;

  return (
    <svg
      viewBox={`-1 0 ${WIDTH + 8} ${HEIGHT}`}
      className="h-8 w-auto shrink-0 overflow-visible sm:h-11"
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, i) => {
        const y = count === 1 ? cy : 4 + i * gap;
        return (
          <path
            key={i}
            className="converge-line"
            pathLength="1"
            style={{ '--i': i }}
            d={`M0 ${y} C${WIDTH * 0.55} ${y}, ${WIDTH * 0.45} ${cy}, ${WIDTH} ${cy}`}
          />
        );
      })}
      <circle className="converge-node" cx={WIDTH} cy={cy} r="3.5" />
    </svg>
  );
}
