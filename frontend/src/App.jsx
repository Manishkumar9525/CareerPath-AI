import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Otp from "./pages/Otp";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import CreateRoadmap from "./pages/CreateRoadmap";
import AIChat from "./pages/AIChat"; 
import Completed from "./pages/Completed";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Roadmap from "./pages/Roadmap";

import RoadmapPreview from "./pages/RoadmapPreview";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<Otp />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-roadmap"
          element={
            <ProtectedRoute>
              <CreateRoadmap />
            </ProtectedRoute>
          }
        />

        {/* ✅ PREVIEW PAGE */}
        <Route
          path="/roadmap-preview/:id"
          element={
            <ProtectedRoute>
              <RoadmapPreview />
            </ProtectedRoute>
          }
        />

        {/* ✅ MAIN ROADMAP PAGE */}
        <Route
          path="/roadmap"
          element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <Completed />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;