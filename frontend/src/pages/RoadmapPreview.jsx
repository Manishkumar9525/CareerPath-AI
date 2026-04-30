import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoadmapById } from "../services/roadmapService";
import DashboardLayout from "../components/Dashboard/DashboardLayout";

// icons
import { FaCode, FaLightbulb } from "react-icons/fa";

const RoadmapPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const res = await getRoadmapById(id);
        setRoadmap(res.data.roadmap);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoadmap();
  }, [id]);

  if (!roadmap) {
    return (
      <DashboardLayout>
        <p className="p-10 text-sub">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-main leading-tight wrap-break-word">
            {roadmap.goal} <span className="text-sub">Roadmap</span>
          </h1>

          <p className="text-sub mt-3 max-w-xl">
            A structured path to achieve your goal step-by-step.
          </p>
        </div>

        {/* STEPS */}
        <div className="space-y-8">

          {roadmap.steps.map((month, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-glass border border-main shadow-card hover:shadow-pop transition-all duration-300"
            >
              {/* MAIN FLEX */}
              <div className="flex flex-col md:flex-row md:items-stretch gap-6">

                {/* LEFT */}
                <div className="flex items-start gap-4 flex-1">

                  {/* STEP FIXED */}
                  <div className="px-3 sm:px-4 py-2 rounded-xl bg-main/15 text-main text-sm font-semibold whitespace-nowrap flex items-center h-fit">
                    STEP {index + 1}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-main">
                      {month.title}
                    </h2>

                    <p className="text-sub mt-2 max-w-xl leading-relaxed wrap-break-word">
                      {month.description}
                    </p>

                    {/* SKILLS */}
                    <div className="flex flex-wrap gap-3 mt-5">
                      {month.skills?.slice(0, 4).map((skill, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-input border border-main text-sm text-main hover:scale-105 transition"
                        >
                          <FaCode size={12} className="opacity-70" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 🔥 BRIGHT DIVIDER */}
                <div className="hidden md:block w-0.5 bg-linear-to-b from-transparent via-green-500/70 to-transparent dark:via-white/70"></div>

                {/* RIGHT */}
                <div className="hidden md:block min-w-60 shrink-0">

                  <p className="text-xs text-sub mb-2">
                    Objective
                  </p>

                  <div className="p-4 rounded-xl bg-input border border-main">

                    <div className="flex items-start gap-2">
                      <FaLightbulb className="mt-1 text-main" size={14} />

                      <p className="text-sm text-main leading-relaxed">
                        {month.projectIdeas?.[0] ||
                          "Build projects and strengthen core concepts"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-glass border border-main text-center shadow-card">

          <h3 className="text-xl font-semibold text-main">
            Ready to start learning?
          </h3>

          <p className="text-sub mt-2">
            Follow this roadmap step-by-step and track your progress.
          </p>

          <button
            onClick={() => {
              localStorage.setItem("currentRoadmapId", roadmap._id);

              navigate("/roadmap", {
                state: { roadmapId: roadmap._id },
              });
            }}
            className="mt-4 px-6 py-3 rounded-full bg-main text-on-main font-medium shadow-soft hover:scale-105 transition"
          >
            Start Learning
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default RoadmapPreview;