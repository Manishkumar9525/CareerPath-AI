import { useEffect, useState } from "react";
import { getRoadmapById } from "../../../services/roadmapService";

const FocusSection = ({ roadmaps = [] }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("No roadmap");
  const [weekLabel, setWeekLabel] = useState("");

  useEffect(() => {
    const roadmapId = localStorage.getItem("currentRoadmapId");

    const fetchFocus = async () => {
      try {
        if (!roadmapId) return;

        const cachedRoadmap = roadmaps.find((roadmap) => roadmap._id === roadmapId);
        const roadmap = cachedRoadmap || (await getRoadmapById(roadmapId)).data.roadmap;

        if (!roadmap) return;

        // 🔥 find first incomplete week
        let foundWeek = null;

        for (let m of roadmap.steps || []) {
          for (let w of m.weeks || []) {
            const hasIncomplete = (w.tasks || []).some(t => !t.completed);

            if (hasIncomplete) {
              foundWeek = w;
              setTitle(roadmap.career || roadmap.goal);
              setWeekLabel(w.week);
              setTasks(w.tasks || []);
              return;
            }
          }
        }

        // ✅ fallback (all completed)
        if (roadmap.steps?.length) {
          const firstMonth = roadmap.steps[0];
          const firstWeek = firstMonth.weeks?.[0];

          setTitle(roadmap.career || roadmap.goal);
          setWeekLabel(firstWeek?.week || "Week 1");
          setTasks(firstWeek?.tasks || []);
        }

      } catch (err) {
        console.error("Focus section error:", err.message);
      }
    };

    fetchFocus();
  }, [roadmaps]);

  return (
    <div className="p-6 rounded-2xl bg-glass border border-main shadow-card">

      <h3 className="text-lg font-semibold">This week's focus</h3>

      <p className="text-sub text-sm mt-1">
        {title} · {weekLabel}
      </p>

      <ul className="mt-5 space-y-4">
        {tasks.length > 0 ? (
          tasks.slice(0, 3).map((task, i) => (
            <li key={i} className="flex items-center gap-3">

              <div className="w-6 h-6 rounded-full border border-main flex items-center justify-center text-xs">
                {i + 1}
              </div>

              <span
                className={`text-sm ${task.completed ? "line-through text-sub" : ""
                  } wrap-break-word`}
              >
                {task.title}
              </span>

            </li>
          ))
        ) : (
          <p className="text-sub text-sm">No tasks available</p>
        )}
      </ul>

    </div>
  );
};

export default FocusSection;