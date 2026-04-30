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

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await getUserRoadmaps();
        setRoadmaps(res.data.roadmaps || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoadmaps();
  }, []);

  return (
    <DashboardLayout>
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