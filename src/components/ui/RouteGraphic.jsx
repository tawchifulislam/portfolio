// a dotted route drawn between two numbers
export default function RouteGraphic() {
  return (
    <svg
      viewBox="0 0 120 36"
      className="route h-8 w-auto shrink-0 overflow-visible sm:h-11"
      aria-hidden="true"
    >
      <path className="route-arc" d="M4 24 Q60 -4 116 24" />
      <circle className="route-start" cx="4" cy="24" r="3" />
      <circle className="route-end" cx="116" cy="24" r="3.5" />
    </svg>
  );
}
