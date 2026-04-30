import WeekTabs from "./WeekTabs";
import { FaTools, FaLightbulb, FaBook, FaCode } from "react-icons/fa";

// 🔥 ICON MAPPING
const iconMap = {
  Skills: <FaCode size={12} />,
  Tools: <FaTools size={12} />,
  Resources: <FaBook size={12} />,
  "Project Ideas": <FaLightbulb size={12} />,
};

const Tag = ({ title, items }) => (
  <div>
    <p className="text-xs text-sub mb-2 uppercase tracking-wide">
      {title}
    </p>

    <div className="flex flex-wrap gap-2">
      {(items || []).map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-2 px-3 py-1.5 text-sm 
          bg-input border border-main rounded-full 
          text-main hover:scale-105 transition"
        >
          {/* 🔥 ICON */}
          <span className="opacity-70">
            {iconMap[title]}
          </span>

          {/* TEXT */}
          {typeof item === "object" ? item.title : item}
        </span>
      ))}
    </div>
  </div>
);

const MonthSection = ({ month, index, toggleTask, mIndex }) => {

  const isMonthCompleted = (month.weeks || []).every((w) =>
    (w.tasks || []).every((t) => t.completed)
  );

  const totalTasks = (month.weeks || []).reduce(
    (acc, w) => acc + (w.tasks?.length || 0),
    0
  );

  const completedTasks = (month.weeks || []).reduce(
    (acc, w) =>
      acc + (w.tasks || []).filter((t) => t.completed).length,
    0
  );

  return (
    <div className="space-y-8">

      <div className="relative surface rounded-2xl px-4 sm:px-6 md:px-10 py-6 md:py-8 border border-main shadow-lg">

        {/* STEP CIRCLE */}
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center text-sm shadow-md mb-4 md:mb-0 md:absolute md:-left-6 md:top-10
          ${isMonthCompleted
              ? "bg-main text-white"
              : "border-main text-sub bg-background"
            }
        `}
        >
          {isMonthCompleted ? "✓" : index + 1}
        </div>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-6">
          <div className="min-w-0">
            <p className="text-xs text-sub uppercase mb-1">
              Step {index + 1}
            </p>

            <h2
              className={`text-2xl font-semibold ${isMonthCompleted
                  ? "line-through text-sub"
                  : "text-main"
                } wrap-break-word`}
            >
              {month.title}
            </h2>

            <p className="text-sub mt-2 max-w-xl wrap-break-word">
              {month.description}
            </p>

            <p className="text-xs text-sub mt-3">
              {completedTasks}/{totalTasks} tasks completed
            </p>
          </div>

          <div
            className={`px-4 py-2 text-sm rounded-full border ${isMonthCompleted
                ? "bg-main text-white"
                : "border-main text-sub"
              } self-start whitespace-nowrap`}
          >
            {isMonthCompleted ? "✓ Completed" : "In Progress"}
          </div>
        </div>

        {/* TAGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Tag title="Skills" items={month.skills} />
          <Tag title="Tools" items={month.tools} />
          <Tag
            title="Resources"
            items={(month.resources || []).map((r) => r.title)}
          />
          <Tag title="Project Ideas" items={month.projectIdeas} />
        </div>
      </div>

      <WeekTabs
        weeks={month.weeks || []}
        onToggleTask={(wIndex, tIndex) =>
          toggleTask(mIndex, wIndex, tIndex)
        }
      />
    </div>
  );
};

export default MonthSection;