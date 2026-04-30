import { useState } from "react";

const TaskCard = ({ task, index, onToggle }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e) => {
    e?.stopPropagation();

    if (loading) return;

    try {
      setLoading(true);
      await onToggle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface-2 rounded-2xl border border-main overflow-hidden 
    hover:border-purple-500/40 hover:shadow-lg transition-all duration-300">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between px-4 sm:px-6 py-4 sm:py-5 gap-4">

        {/* LEFT */}
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">

          {/* TICK */}
          <button
            type="button"
            onClick={handleToggle}
            className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 transition 
            ${task.completed
                ? "bg-linear-to-r from-green-400 to-emerald-500 text-white"
                : "border border-main"
              } 
            ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}`}
          >
            {task.completed && "✓"}
          </button>

          {/* TEXT */}
          <div className="flex-1 min-w-0">

            <p className="text-xs text-sub uppercase mb-1 tracking-wide">
              Step {index + 1}
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-main leading-snug wrap-break-word">
              {task.title}
            </h3>

            {task.description && (
              <p className="text-sm text-sub mt-1 leading-relaxed wrap-break-word">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3 sm:shrink-0 self-end sm:self-auto">

          {/* DROPDOWN */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-sub hover:text-main transition text-lg"
          >
            {open ? "▲" : "▼"}
          </button>

          {/* COMPLETE BUTTON */}
          <button
            type="button"
            onClick={handleToggle}
            disabled={loading}
            className={`px-3 sm:px-4 py-2 text-sm rounded-full border transition-all duration-200 whitespace-nowrap
            ${task.completed
                ? "bg-linear-to-r from-green-400 to-emerald-500 text-white border-none shadow"
                : "border-main hover:bg-glass hover:scale-105"
              }
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {task.completed ? "✓ Completed" : "Mark complete"}
          </button>

        </div>
      </div>

      {/* DROPDOWN CONTENT */}
      {open && (
        <div className="px-4 sm:px-6 pb-5 pt-4 border-t border-main grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COURSES */}
          {task.resources?.courses?.length > 0 && (
            <div>
              <p className="text-xs text-sub uppercase mb-2">Courses</p>
              <div className="space-y-2">
                {task.resources.courses.map((c, i) => (
                  <a
                    key={i}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-main 
                    bg-linear-to-r from-purple-500/10 to-indigo-500/10 
                    border border-purple-500/20 px-3 py-2 rounded-lg hover:opacity-80 wrap-break-word"
                  >
                    ▶ {c.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* YOUTUBE */}
          {task.resources?.youtube?.length > 0 && (
            <div>
              <p className="text-xs text-sub uppercase mb-2">Videos</p>
              <div className="space-y-2">
                {task.resources.youtube.map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-main 
                    bg-linear-to-r from-blue-500/10 to-cyan-500/10 
                    border border-blue-500/20 px-3 py-2 rounded-lg hover:opacity-80 wrap-break-word"
                  >
                    📺 {r.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* DOCS */}
          {task.resources?.docs?.length > 0 && (
            <div>
              <p className="text-xs text-sub uppercase mb-2">Docs</p>
              <div className="space-y-2">
                {task.resources.docs.map((d, i) => (
                  <a
                    key={i}
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-main 
                    bg-linear-to-r from-emerald-500/10 to-green-500/10 
                    border border-emerald-500/20 px-3 py-2 rounded-lg hover:opacity-80 wrap-break-word"
                  >
                    📄 {d.title}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default TaskCard;