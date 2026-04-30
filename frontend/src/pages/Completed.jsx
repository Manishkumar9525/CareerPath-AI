import { useEffect, useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { getUserRoadmaps } from "../services/roadmapService";

const Completed = () => {
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await getUserRoadmaps();
        const all = res.data.roadmaps || [];

        // ✅ filter completed
        const completed = all.filter((r) => r.progress === 100);

        setRoadmaps(completed);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCompleted();
  }, []);

  // 🔥 STATS
  const totalCompleted = roadmaps.length;

  const totalTasks = roadmaps.reduce((acc, r) => {
    let count = 0;
    r.steps?.forEach((m) =>
      m.weeks?.forEach((w) => {
        count += w.tasks?.length || 0;
      })
    );
    return acc + count;
  }, 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <p className="text-sub text-sm">Achievements</p>

          <h1 className="font-display text-5xl mt-2 text-main">
            Completed roadmaps.
          </h1>

          <p className="text-sub mt-3">
            A growing record of everything you've finished.
          </p>
        </div>

        {/* ❌ NO COMPLETED */}
        {roadmaps.length === 0 && (
          <p className="text-sub mb-10">
            No completed roadmaps yet 🚀
          </p>
        )}

        {/* 🔥 STATS */}
        {roadmaps.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-500/30 to-indigo-500/30 border border-main">
              <div className="text-2xl mb-3">🏆</div>

              <h2 className="text-3xl font-bold text-main">
                {totalCompleted}
              </h2>

              <p className="text-sub text-sm mt-1">
                Roadmaps finished
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-glass border border-main">
              <div className="text-2xl mb-3">🎯</div>

              <h2 className="text-3xl font-bold text-main">
                {totalTasks}
              </h2>

              <p className="text-sub text-sm mt-1">
                Tasks completed
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-glass border border-main">
              <div className="text-2xl mb-3">⏳</div>

              <h2 className="text-3xl font-bold text-main">
                {roadmaps.length}x
              </h2>

              <p className="text-sub text-sm mt-1">
                Learning cycles
              </p>
            </div>

          </div>
        )}

        {/* ROADMAP CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {roadmaps.map((item) => (
            <div
              key={item._id}
              className="p-6 rounded-3xl bg-glass border border-main transition-all duration-300 hover:scale-[1.02] hover:border-green-400/40"
            >

              {/* TOP */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl">🏅</div>

                <span className="text-xs px-3 py-1 rounded-full bg-glass border border-main text-sub">
                  Completed
                </span>
              </div>

              {/* TITLE */}
              <h2 className="text-lg font-semibold text-main">
                {item.goal}
              </h2>

              {/* META */}
              <p className="text-sub text-sm mt-2">
                {item.duration} •{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>

              <p className="text-sub text-sm">
                Progress: {item.progress}%
              </p>

              {/* BAR */}
              <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full bg-white rounded-full"></div>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  localStorage.setItem("currentRoadmapId", item._id);
                  window.location.href = "/roadmap";
                }}
                className="mt-5 text-sm text-main opacity-80 hover:opacity-100 transition"
              >
                Review ↗
              </button>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Completed;