import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import RoadmapPage from "../components/Roadmap/RoadmapPage";
import { getRoadmapById } from "../services/roadmapService";

const Roadmap = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const roadmapId =
    location.state?.roadmapId ||
    localStorage.getItem("currentRoadmapId");

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roadmapId) {
      localStorage.setItem("currentRoadmapId", roadmapId);
    }

    const fetchRoadmap = async () => {
      try {
        if (!roadmapId) {
          setLoading(false);
          return;
        }

        const res = await getRoadmapById(roadmapId);
        setRoadmap(res.data?.roadmap || null);
      } catch (err) {
        console.error("Roadmap load error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [roadmapId]);

  // 🔄 LOADING
  if (loading) {
    return (
      <DashboardLayout>
        <p className="p-10 text-sub">Loading roadmap...</p>
      </DashboardLayout>
    );
  }

  // ❌ NO ROADMAP
  if (!roadmap) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">

          <h2 className="text-xl sm:text-2xl font-semibold text-main">
            🚀 No roadmap yet
          </h2>

          <p className="text-sub mt-2 max-w-md">
            Create your first career roadmap and start your journey.
          </p>

          <button
            onClick={() => navigate("/create-roadmap")}
            className="mt-6 px-5 sm:px-6 py-3 rounded-full bg-main text-on-main font-medium shadow-soft hover:scale-105 transition whitespace-nowrap"
          >
            Generate Roadmap
          </button>

        </div>
      </DashboardLayout>
    );
  }

  // ✅ ROADMAP EXISTS
  return (
    <DashboardLayout>
      <RoadmapPage roadmap={roadmap} setRoadmap={setRoadmap} />
    </DashboardLayout>
  );
};

export default Roadmap;