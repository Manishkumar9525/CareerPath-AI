import { useEffect, useState } from "react";

import DashboardLayout from "../components/Dashboard/DashboardLayout";
import WelcomeHeader from "../components/Dashboard/sections/WelcomeHeader";
import StatsCards from "../components/Dashboard/sections/StatsCards";
import RoadmapsSection from "../components/Dashboard/sections/RoadmapsSection";

import FocusSection from "../components/Dashboard/sections/FocusSection";
import MentorSection from "../components/Dashboard/sections/MentorSection";

import { getUserRoadmaps } from "../services/roadmapService";

const Dashboard = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setError(null);
        const res = await getUserRoadmaps();
        setRoadmaps(res.data.roadmaps || []);
      } catch (err) {
        console.error("Dashboard roadmaps error:", err.message);
        setError("Failed to load roadmaps");
      }
    };

    fetchRoadmaps();
  }, []);

  return (
    <DashboardLayout>
      {error && (
        <div className="mb-6 rounded-2xl border border-main bg-glass px-4 py-3 text-sm text-sub">
          {error}
        </div>
      )}

      <WelcomeHeader />

      {/* ✅ dynamic stats */}
      <StatsCards roadmaps={roadmaps} />

      {/* ✅ real roadmap list */}
      <RoadmapsSection roadmaps={roadmaps} />

      {/* ✅ pass roadmap for future use */}
      <div className="grid md:grid-cols-2 gap-6">
        <FocusSection roadmaps={roadmaps} />
        <MentorSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;