export default function TitleBlock({ index, total, status, action }) {
  return (
    <div className="title-block px-6 sm:px-8 py-4">
      {index && total && (
        <span>
          <strong>{index}</strong> / {total}
        </span>
      )}
      {status && (
        <span className="stamp">
          <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          {status}
        </span>
      )}
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}
