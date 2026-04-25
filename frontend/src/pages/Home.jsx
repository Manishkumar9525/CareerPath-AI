import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import Steps from "../components/Home/Steps";
import CTA from "../components/Home/CTA";
import Footer from "../components/layout/Footer";
import Dashboard from "../components/Home/DashboardPreview/DashboardPreview";
import TrustedSection from "../components/Home/TrustedSection";
import Product from "../components/Home/Product";
import Benefits from "../components/Home/Benefits";

export default function Home() {
  const location = useLocation();

  // 🔥 SCROLL FIX
  useEffect(() => {
    if (location.state?.scrollTo === "features") {
      setTimeout(() => {
        document.getElementById("features")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }, [location]);

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Dashboard />
      <TrustedSection />

      {/* ✅ IMPORTANT */}
      <div id="features">
        <Features />
      </div>

      <Steps />
      <Product />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}