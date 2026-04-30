import StatCard from "../ui/StatCard";

const StatsCards = ({ roadmaps = [] }) => {
  // ✅ Active roadmaps
  const activeRoadmaps = roadmaps.length;

  // ✅ Avg progress
  const avgProgress =
    roadmaps.length > 0
      ? Math.round(
        roadmaps.reduce((acc, r) => acc + (r.progress || 0), 0) /
        roadmaps.length
      )
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Active roadmaps"
        value={activeRoadmaps}
        extra={
          activeRoadmaps === 0
            ? "Start your journey 🚀"
            : `${activeRoadmaps} active`
        }
      />

      {/* 🔥 keep as it is (static for now) */}
      <StatCard
        title="Day streak"
        value="12"
        extra="Keep it up 🔥"
      />

      <StatCard
        title="Avg progress"
        value={`${avgProgress}%`}
        extra={
          avgProgress === 0
            ? "No progress yet"
            : "Keep going 💪"
        }
      />
    </div>
  );
};

export default StatsCards;