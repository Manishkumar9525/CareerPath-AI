import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const WeekTabs = ({ weeks = [], onToggleTask }) => {
  const [active, setActive] = useState(0);
  const [loadingKey, setLoadingKey] = useState(null);

  // ✅ RESET ONLY WHEN WEEKS CHANGE
  useEffect(() => {
    setActive(0);
  }, [weeks]);

  // ❗ EMPTY STATE
  if (!weeks.length) {
    return (
      <div className="text-sub text-sm mt-4">
        No weeks available
      </div>
    );
  }

  const handleToggle = async (wIndex, tIndex) => {
    const key = `${wIndex}-${tIndex}`;

    if (loadingKey === key) return;

    try {
      setLoadingKey(key);
      await onToggleTask(wIndex, tIndex);
    } finally {
      setLoadingKey(null);
    }
  };

  return (
    <div>

      {/* WEEK TABS */}
      <div className="flex gap-2 bg-glass p-1.5 rounded-xl mb-6 w-full overflow-x-auto whitespace-nowrap">
        {weeks.map((week, i) => (
          <button
            key={`${week.week}-${i}`}
            onClick={() => setActive(i)}
            className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap transition ${active === i
                ? "bg-linear-to-r from-purple-500 to-indigo-500 text-white"
                : "text-sub hover:bg-white/5"
              }`}
          >
            {week.week || `Week ${i + 1}`}
          </button>
        ))}
      </div>

      {/* TASKS */}
      <div className="space-y-4">

        {(weeks[active]?.tasks || []).length > 0 ? (
          weeks[active].tasks.map((task, i) => {
            const key = `${active}-${i}`;
            const isLoading = loadingKey === key;

            return (
              <TaskCard
                key={key}
                task={task}
                index={i}
                onToggle={() => handleToggle(active, i)}
                loading={isLoading} // 🔥 pass loading
              />
            );
          })
        ) : (
          <div className="text-sub text-sm">
            No tasks for this week
          </div>
        )}

      </div>

    </div>
  );
};

export default WeekTabs;