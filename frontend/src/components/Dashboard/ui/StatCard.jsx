const StatCard = ({ title, value = 0, extra }) => {
  return (
    <div className="p-6 rounded-2xl bg-glass border border-main shadow-card backdrop-blur-xl">

      {/* TITLE */}
      <p className="text-sub text-sm">
        {title}
      </p>

      {/* VALUE (safe fallback) */}
      <h2 className="text-3xl font-display mt-2">
        {value ?? 0}
      </h2>

      {/* EXTRA (optional render) */}
      {extra && (
        <p className="text-xs text-sub mt-2">
          {extra}
        </p>
      )}

    </div>
  );
};

export default StatCard;