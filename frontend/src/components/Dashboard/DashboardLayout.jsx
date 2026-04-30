import { useState } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen md:h-screen bg-background text-foreground md:flex">

      <div className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-main bg-background/90 px-4 backdrop-blur-xl md:hidden">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="rounded-lg border border-main px-3 py-1 text-main"
        >
          Menu
        </button>
        <h2 className="font-display text-lg text-main">CareerPath</h2>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-200 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
      </div>

      {/* SIDEBAR */}
      <div className="hidden w-64 fixed left-0 top-0 h-screen z-40 md:block">
        <Sidebar />
      </div>

      {/* MAIN */}
      <div className="flex-1 md:ml-64 md:h-screen md:overflow-y-auto">
        <div className="p-4 md:p-6 space-y-6">
          {children}
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;