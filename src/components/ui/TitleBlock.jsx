export default function TitleBlock({ sheetNumber, total, status, action }) {
  return (
    <div className="title-block px-6 sm:px-8 py-4">
      <span>
        SHEET <strong>{sheetNumber}</strong> / {total}
      </span>
      <span className="hidden sm:inline">REV 2026</span>
      {status && (
        <span className="stamp ml-auto sm:ml-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brass" />
          {status}
        </span>
      )}
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}
