import { useNavigate } from "react-router-dom";
import RoadmapCard from "../ui/RoadmapCard";

const RoadmapsSection = ({ roadmaps = [] }) => {
  const navigate = useNavigate();

  // ✅ show max 6 recent
  const visibleRoadmaps = roadmaps.slice(0, 6);

  return (
    <div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-2xl">Recent roadmaps</h2>

        {/* ✅ show only if > 6 */}
        {roadmaps.length > 6 && (
          <span
            onClick={() => navigate("/roadmap")}
            className="text-sub cursor-pointer"
          >
            View all
          </span>
        )}
      </div>

      {/* ❌ NO ROADMAP */}
      {roadmaps.length === 0 ? (
        <div
          onClick={() => navigate("/create-roadmap")}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-glass h-40 cursor-pointer hover:bg-white/5 transition"
        >
          <span className="text-2xl">＋</span>
          <span className="text-sm text-sub">
            Create your first roadmap
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* ✅ dynamic cards */}
          {visibleRoadmaps.map((r) => (
            <RoadmapCard
              key={r._id}
              id={r._id}
              title={r.career || r.goal}
              steps={r.steps?.length || 0}
              duration={r.duration}
              progress={r.progress || 0}
            />
          ))}

          {/* ➕ CREATE ANOTHER */}
          <div
            onClick={() => navigate("/create-roadmap")}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-glass h-40 cursor-pointer hover:bg-white/5 transition"
          >
            <span className="text-2xl">＋</span>
            <span className="text-sm text-sub">Create another</span>
          </div>

        </div>
      )}

    </div>
  );
};

export default RoadmapsSection;