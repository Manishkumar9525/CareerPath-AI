import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import {
  getUserRoadmaps,
  toggleTask as toggleTaskAPI,
} from "../services/roadmapService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activeRoadmapId, setActiveRoadmapId] = useState(null);

  const extractCurrentWeekTasks = (roadmap) => {
    if (!roadmap) {
      return [];
    }

    for (let mIndex = 0; mIndex < (roadmap.steps || []).length; mIndex++) {
      const month = roadmap.steps[mIndex];

      for (let wIndex = 0; wIndex < (month.weeks || []).length; wIndex++) {
        const week = month.weeks[wIndex];
        const hasIncomplete = (week.tasks || []).some((t) => !t.completed);

        if (hasIncomplete) {
          return (week.tasks || []).map((task, tIndex) => ({
            ...task,
            roadmapId: roadmap._id,
            monthIndex: mIndex,
            weekIndex: wIndex,
            taskIndex: tIndex,
            track: roadmap.career || roadmap.goal,
            week: week.week,
          }));
        }
      }
    }

    const firstMonth = roadmap.steps?.[0];
    const firstWeek = firstMonth?.weeks?.[0];

    return (firstWeek?.tasks || []).map((task, tIndex) => ({
      ...task,
      roadmapId: roadmap._id,
      monthIndex: 0,
      weekIndex: 0,
      taskIndex: tIndex,
      track: roadmap.career || roadmap.goal,
      week: firstWeek?.week || "Week 1",
    }));
  };

  // ✅ FETCH ONLY CURRENT WEEK TASKS
  const fetchTasks = async () => {
    try {
      const res = await getUserRoadmaps();
      const roadmaps = res.data.roadmaps || [];

      let selectedRoadmap = null;
      const savedRoadmapId = localStorage.getItem("currentRoadmapId");

      if (savedRoadmapId) {
        selectedRoadmap = roadmaps.find((r) => r._id === savedRoadmapId) || null;
      }

      if (!selectedRoadmap) {
        for (const roadmap of roadmaps) {
          const hasIncomplete = (roadmap.steps || []).some((month) =>
            (month.weeks || []).some((week) =>
              (week.tasks || []).some((task) => !task.completed)
            )
          );

          if (hasIncomplete) {
            selectedRoadmap = roadmap;
            break;
          }
        }
      }

      if (!selectedRoadmap && roadmaps.length > 0) {
        selectedRoadmap = roadmaps[0];
      }

      setActiveRoadmapId(selectedRoadmap?._id || null);
      setTasks(extractCurrentWeekTasks(selectedRoadmap));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ TOGGLE TASK
  const toggleTask = async (task) => {
    try {
      const res = await toggleTaskAPI(task.roadmapId, {
        monthIndex: task.monthIndex,
        weekIndex: task.weekIndex,
        taskIndex: task.taskIndex,
      });

      if (res.data?.roadmap && task.roadmapId === activeRoadmapId) {
        setTasks(extractCurrentWeekTasks(res.data.roadmap));
      } else {
        fetchTasks();
      }

    } catch (err) {
      console.error(err);
    }
  };

  const openTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sub text-sm">Current focus</p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mt-2 text-main">
            Your tasks.
          </h1>
        </div>

        {/* ❌ NO TASK */}
        {tasks.length === 0 && (
          <p className="text-sub">No tasks found</p>
        )}

        {/* OPEN TASKS */}
        {openTasks.length > 0 && (
          <div className="mb-10">
            <p className="text-sub text-xs tracking-widest mb-3">
              OPEN • {openTasks.length}
            </p>

            <div className="rounded-3xl border border-main bg-glass overflow-hidden">

              {openTasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border-b border-main last:border-none hover:bg-glass transition"
                >
                  {/* CHECKBOX */}
                  <button
                    onClick={() => toggleTask(task)}
                    className="w-5 h-5 mt-1 rounded-full border border-main flex items-center justify-center hover:scale-110 transition"
                  />

                  {/* CONTENT */}
                  <div className="min-w-0">
                    <p className="text-main font-medium break-words">
                      {task.title}
                    </p>

                    <p className="text-sub text-sm mt-1">
                      {task.track} • {task.week}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* COMPLETED TASKS */}
        {completedTasks.length > 0 && (
          <div>
            <p className="text-sub text-xs tracking-widest mb-3">
              COMPLETED • {completedTasks.length}
            </p>

            <div className="rounded-3xl border border-main bg-glass overflow-hidden">

              {completedTasks.map((task, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 border-b border-main last:border-none opacity-70"
                >
                  {/* CHECKED */}
                  <div className="w-5 h-5 mt-1 rounded-full bg-main text-white flex items-center justify-center text-xs">
                    ✓
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0">
                    <p className="text-main line-through break-words">
                      {task.title}
                    </p>

                    <p className="text-sub text-sm mt-1">
                      {task.track} • {task.week}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default Tasks;