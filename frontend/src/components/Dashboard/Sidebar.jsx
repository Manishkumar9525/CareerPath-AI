import {
  FaHome, FaTasks, FaCheckCircle, FaRobot, FaUser, FaSignOutAlt
} from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { MdOutlineMap } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import SidebarItem from "./ui/SidebarItem";
import ThemeToggle from "../common/ThemeToggle";

const Sidebar = ({ onNavigate }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onNavigate?.();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ important
    navigate("/login");
    onNavigate?.();
  };

  return (
    <div className="w-64 h-screen bg-glass border-r border-main flex flex-col justify-between px-5 py-6">

      {/* TOP */}
      <div>
        {/* ✅ CLICKABLE LOGO */}
        <div
          onClick={() => goTo("/")}
          className="flex items-center gap-3 mb-6 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-glass border border-main flex items-center justify-center text-lg">
            ✦
          </div>

          <h1 className="font-display text-xl tracking-tight text-main">
            CareerPath
          </h1>
        </div>

        <nav>

          <SidebarItem
            icon={<FaHome />}
            label="Dashboard"
            active={location.pathname.startsWith("/dashboard")}
            onClick={() => goTo("/dashboard")}
          />

          <SidebarItem
            icon={<MdOutlineMap />}
            label="Create Roadmap"
            active={location.pathname === "/create-roadmap"}
            onClick={() => goTo("/create-roadmap")}
          />

          <SidebarItem
            icon={<FaRoute />}
            label="Roadmap"
            active={location.pathname === "/roadmap"}
            onClick={() => goTo("/roadmap")}
          />

          <SidebarItem
            icon={<FaTasks />}
            label="Tasks"
            active={location.pathname === "/tasks"}
            onClick={() => goTo("/tasks")}
          />

          <SidebarItem
            icon={<FaCheckCircle />}
            label="Completed"
            active={location.pathname === "/completed"}
            onClick={() => goTo("/completed")}
          />

          <SidebarItem
            icon={<FaRobot />}
            label="AI Chat"
            badge="NEW"
            active={location.pathname === "/ai-chat"}
            onClick={() => goTo("/ai-chat")}
          />

          <SidebarItem
            icon={<FaUser />}
            label="Profile"
            active={location.pathname === "/profile"}
            onClick={() => goTo("/profile")}
          />

        </nav>
      </div>

      {/* BOTTOM */}
      <div className="mt-8 pt-6 border-t border-main">

        <div className="flex items-center gap-3 px-3 py-2">
          <ThemeToggle />
          <span className="text-sm text-sub">Theme</span>
        </div>

        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Sign out"
          danger
          onClick={handleLogout}
        />

      </div>
    </div>
  );
};

export default Sidebar;