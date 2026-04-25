import SidebarItem from "./SidebarItem";
import StatCard from "./StatCard";

export default function DashboardPreview() {
  return (
    <section className="relative px-6 pb-28">

      <div className="max-w-5xl mx-auto">

        {/* MAIN CARD */}
        <div className="
          rounded-2xl backdrop-blur-xl overflow-hidden shadow-2xl

          border border-green-500/20 dark:border-white/10
          bg-green-500/[0.04] dark:bg-white/5
        ">

          {/* TOP BAR */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400/70"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/70"></div>

            <span className="ml-4 text-xs text-muted-foreground">
              careerpath.ai/dashboard
            </span>
          </div>

          {/* CONTENT */}
          <div className="flex">

            {/* SIDEBAR */}
            <div className="w-56 border-r border-border p-5 space-y-2">
              <SidebarItem active label="Dashboard" />
              <SidebarItem label="Create Roadmap" />
              <SidebarItem label="Tasks" />
              <SidebarItem label="Completed" />
              <SidebarItem label="AI Chat" />
            </div>

            {/* MAIN AREA */}
            <div className="flex-1 p-5 space-y-6">

              {/* HEADER */}
              <div>
                <p className="text-sm text-muted-foreground">Welcome back</p>
                <h2 className="text-2xl font-semibold mt-1 text-primary">
                  Jane
                </h2>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="Roadmaps" value="3" />
                <StatCard title="Day streak" value="12" />
                <StatCard title="Avg progress" value="55%" />
              </div>

              {/* PROGRESS */}
              <div className="
                rounded-xl p-5
                border border-border
                bg-green-500/[0.04] dark:bg-white/5
              ">

                <div className="flex justify-between text-sm mb-3">
                  <span className="text-foreground">Full-Stack Engineer</span>
                  <span className="text-muted-foreground">60%</span>
                </div>

                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-primary rounded-full"></div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}