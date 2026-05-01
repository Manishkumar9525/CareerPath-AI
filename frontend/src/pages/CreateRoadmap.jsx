import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import { generateRoadmap } from "../services/roadmapService";

const CreateRoadmap = () => {
  const navigate = useNavigate();

  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [duration, setDuration] = useState("6 months");
  const [loading, setLoading] = useState(false);

  const durations = ["3 months", "6 months", "9 months", "12 months"];

  const handleGenerate = async () => {
    try {
      if (!goal) {
        alert("Please enter your goal");
        return;
      }

      setLoading(true);

      const res = await generateRoadmap({
        goal,
        skills,
        duration,
      });

      const roadmap = res.data?.roadmap;

      if (!roadmap?._id) {
        throw new Error("Invalid roadmap response");
      }

      localStorage.setItem("currentRoadmapId", roadmap._id);

      // 👉 redirect to preview page
      navigate(`/roadmap-preview/${roadmap._id}`);

    } catch (err) {
      console.error("Roadmap Error:", err.message);
      alert(err.response?.data?.message || err.message || "Something went wrong while generating roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sub text-sm">New roadmap</p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mt-2 text-main">
            Generate a roadmap.
          </h1>

          <p className="text-sub mt-3 max-w-xl">
            Tell us your goal and timeline. AI will draft a step-by-step plan.
          </p>
        </div>

        {/* CARD */}
        <div className="p-5 sm:p-6 md:p-8 rounded-3xl bg-glass border border-main shadow-card space-y-6 backdrop-blur-xl">

          {/* GOAL */}
          <div>
            <label className="text-sm text-main font-medium">Goal</label>

            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Become a Full-Stack Engineer"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-main bg-input text-main placeholder:text-sub focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          {/* SKILLS */}
          <div>
            <label className="text-sm text-main font-medium">
              Current skills
            </label>

            <textarea
              rows={3}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="HTML, CSS, JavaScript..."
              className="mt-2 w-full px-4 py-3 rounded-xl border border-main bg-input text-main placeholder:text-sub focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>

          {/* DURATION */}
          <div>
            <label className="text-sm text-main font-medium">Duration</label>

            <div className="flex gap-3 mt-3 flex-wrap">
              {durations.map((item) => (
                <button
                  key={item}
                  onClick={() => setDuration(item)}
                  className={`px-4 py-2 rounded-full border transition-all duration-200 ${duration === item
                    ? "bg-main text-on-main border-main shadow-soft"
                    : "border-main text-sub hover:bg-glass hover:text-main"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 px-6 py-3 rounded-full bg-main text-on-main font-medium shadow-soft hover:scale-105 transition disabled:opacity-60"
          >
            {loading ? "Generating..." : "✨ Generate roadmap"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateRoadmap;