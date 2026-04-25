import {
  FaMapMarkedAlt,
  FaBookOpen,
  FaChartLine,
  FaComments,
  FaBullseye,
  FaBolt,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: FaMapMarkedAlt,
      title: "AI roadmaps",
      desc: "Tell us your goal. Get a clear, step-by-step plan tailored to your skills and timeline.",
    },
    {
      icon: FaBookOpen,
      title: "Curated resources",
      desc: "Hand-picked courses, articles, and projects for every step. No more decision fatigue.",
    },
    {
      icon: FaChartLine,
      title: "Progress tracking",
      desc: "Mark tasks done, watch your roadmap fill, and keep streaks alive across weeks.",
    },
    {
      icon: FaComments,
      title: "AI mentor chat",
      desc: "Ask anything — what to learn next, how to debug a concept, or where to find resources.",
    },
    {
      icon: FaBullseye,
      title: "Goal-aligned tasks",
      desc: "Every task ladders up to a real outcome — a portfolio, a job, a promotion.",
    },
    {
      icon: FaBolt,
      title: "Adaptive plans",
      desc: "Roadmaps that adjust as you grow, slow down, or change direction.",
    },
  ];

  return (
    <section className="relative py-24 px-6">

      <div className="max-w-7xl mx-auto text-center">

        {/* HEADER */}
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
          FEATURES
        </p>

        <h2 className="font-display text-5xl md:text-6xl leading-[1.1] text-primary">
          Everything you need to grow.
        </h2>

        <p className="mt-6 text-green-600/70 dark:text-white/60 text-lg">
          A focused toolkit for ambitious learners — beautifully simple, deeply powerful.
        </p>

        {/* MAIN CONTAINER */}
        <div className="
          mt-14 rounded-3xl overflow-hidden backdrop-blur-xl

          border border-green-500/20 dark:border-white/10
          bg-green-500/[0.02] dark:bg-white/[0.02]
        ">

          <div className="grid md:grid-cols-3">

            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <div
                  key={i}
                  className={`
                    p-6 md:p-7 text-left transition-all duration-300

                    border-green-500/20 dark:border-white/10
                    ${i % 3 !== 2 ? "md:border-r" : ""}
                    ${i < 3 ? "border-b" : ""}

                    hover:bg-green-500/[0.05] dark:hover:bg-white/[0.04]
                  `}
                >
                  {/* ICON */}
                  <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-white/5 flex items-center justify-center mb-4">
                    <Icon size={15} className="text-green-700 dark:text-white/80" />
                  </div>

                  {/* TITLE */}
                  <h3 className="font-display text-lg text-primary mb-1">
                    {f.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-green-600/70 dark:text-white/60 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}