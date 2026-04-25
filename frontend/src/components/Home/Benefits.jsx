import { FiStar } from "react-icons/fi";

export default function Benefits() {
  const benefits = [
    {
      title: "Save 100+ hours",
      desc: "Stop curating resources yourself. Get a plan that's ready to execute.",
    },
    {
      title: "Stay accountable",
      desc: "Streaks, progress bars, and weekly check-ins keep you moving.",
    },
    {
      title: "Learn deliberately",
      desc: "Each task ladders to a real, portfolio-worthy outcome.",
    },
  ];

  return (
    <section className="relative py-18 px-6 border-y border-green-500/20 dark:border-white/10">

      {/* glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.04] dark:via-white/[0.03] to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        {/* TOP TEXT */}
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-6">
          BENEFITS
        </p>

        {/* HEADING */}
        <h2 className="font-display text-4xl md:text-5xl text-primary mb-16">
          Why people stay.
        </h2>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {benefits.map((b, i) => (
            <div
              key={i}
              className="
                text-left p-8 rounded-2xl transition

                border border-green-500/20 dark:border-white/10
                bg-gradient-to-b from-green-500/[0.04] to-green-500/[0.02] 
                dark:from-white/[0.04] dark:to-white/[0.02]
                backdrop-blur-xl

                hover:bg-green-500/[0.06] dark:hover:bg-white/[0.06]

                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
              "
            >
              {/* ICON */}
              <div className="
                w-10 h-10 mb-6 flex items-center justify-center rounded-full
                bg-green-500/10 dark:bg-white/[0.05]
                border border-green-500/20 dark:border-white/10
                text-green-700 dark:text-white/70
              ">
                <FiStar />
              </div>

              {/* TITLE */}
              <h3 className="font-display text-xl text-primary mb-2">
                {b.title}
              </h3>

              {/* DESC */}
              <p className="text-green-600/70 dark:text-white/60 text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}