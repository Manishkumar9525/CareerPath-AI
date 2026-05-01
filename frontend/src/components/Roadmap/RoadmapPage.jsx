import MonthSection from "./MonthSection";
import {
  getRoadmapById,
  toggleTask as toggleTaskAPI,
} from "../../services/roadmapService";

const RoadmapPage = ({ roadmap, setRoadmap }) => {

  const toggleTask = async (mIndex, wIndex, tIndex) => {
    try {
      const toggleRes = await toggleTaskAPI(roadmap._id, {
        monthIndex: mIndex,
        weekIndex: wIndex,
        taskIndex: tIndex,
      });

      if (!toggleRes.data?.roadmap) {
        throw new Error("Failed to update roadmap");
      }

      const roadmapRes = await getRoadmapById(roadmap._id);
      setRoadmap(roadmapRes.data?.roadmap || roadmap);

    } catch (err) {
      console.error("Roadmap toggle error:", err.message);
    }
  };

  const progress = roadmap.progress ?? 0;

  return (
    <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">

      {/* HEADER */}
      <div className="space-y-5">
        <p className="text-sub text-sm">Your roadmap</p>

        <h1 className="text-3xl md:text-4xl font-display text-main wrap-break-word">
          {roadmap.goal}
        </h1>

        {/* PROGRESS */}
        <div>
          <div className="flex justify-between text-sm text-sub mb-3">
            <span>Overall progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-2 bg-glass rounded-full overflow-hidden">
            <div
              className="h-full bg-main transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* MONTHS */}
      {(roadmap.steps || []).map((month, mIndex) => (
        <MonthSection
          key={mIndex}
          month={month}
          index={mIndex}
          toggleTask={toggleTask}
          mIndex={mIndex}
        />
      ))}
    </div>
  );
};

export default RoadmapPage;