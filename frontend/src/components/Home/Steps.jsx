export default function Steps() {
  const steps = [
    {
      num: "01",
      title: "Tell us your goal",
      desc: "Pick a target role, set a timeline, and share what you already know.",
    },
    {
      num: "02",
      title: "Get your roadmap",
      desc: "AI builds a month-by-month plan with weekly tasks and curated resources.",
    },
    {
      num: "03",
      title: "Learn & track",
      desc: "Complete tasks, ask the AI mentor questions, and watch your progress climb.",
    },
  ];

  return (
    <section className="relative py-20 px-6 border-y border-green-500/20 dark:border-white/10">

      {/* subtle bg strip */}
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        {/* TOP LABEL */}
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
          HOW IT WORKS
        </p>

        {/* HEADING */}
        <h2 className="font-display text-4xl md:text-4xl leading-[1.1] text-primary">
          Three steps. One clear path.
        </h2>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="
                text-left rounded-2xl p-7 md:p-8 transition-all duration-300

                border border-green-500/20 dark:border-white/10
                bg-green-500/[0.02] dark:bg-white/[0.02]
                hover:bg-green-500/[0.05] dark:hover:bg-white/[0.04]
              "
            >
              {/* number */}
              <p className="text-xs text-green-600/50 dark:text-white/40 mb-4">
                {step.num}
              </p>

              {/* title */}
              <h3 className="font-display text-xl text-primary mb-3">
                {step.title}
              </h3>

              {/* desc */}
              <p className="text-green-600/70 dark:text-white/60 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}