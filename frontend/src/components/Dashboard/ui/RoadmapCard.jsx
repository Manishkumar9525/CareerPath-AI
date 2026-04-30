import { useNavigate } from "react-router-dom";

const RoadmapCard = ({ id, title, steps, duration, progress }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        // ✅ save for refresh safety
        localStorage.setItem("currentRoadmapId", id);

        // ✅ open full roadmap page
        navigate("/roadmap", {
          state: { roadmapId: id },
        });
      }}
      className="p-5 sm:p-6 rounded-2xl bg-glass border border-main shadow-card cursor-pointer hover:scale-[1.02] transition"
    >

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold break-words">{title}</h3>
          <p className="text-sub text-sm">
            {steps} steps • {duration}
          </p>
        </div>

        <div className="w-8 h-8 rounded-full border border-main flex items-center justify-center">
          ↗
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-sm text-sub mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 bg-white/10 rounded-full">
          <div
            className="h-full bg-brand rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
};

export default RoadmapCard;