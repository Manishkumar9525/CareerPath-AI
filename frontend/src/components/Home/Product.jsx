import { FiCheck, FiCpu } from "react-icons/fi";

export default function Product() {
  return (
    <section className="relative py-28 px-6 border-y border-green-500/20 dark:border-white/10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center perspective-[1400px]">

        {/* LEFT SIDE */}
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
            PRODUCT
          </p>

          <h2 className="font-display text-5xl md:text-6xl leading-[1.1] text-primary">
            Designed for focus.
          </h2>

          <p className="mt-6 text-green-600/70 dark:text-white/60 max-w-md">
            A premium interface that gets out of your way — so you can do the work.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">
            {[
              "Month-by-month roadmaps with weekly tasks",
              "Inline resources — no tab switching",
              "AI chat that knows your roadmap",
              "Light & dark themes, both gorgeous",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-green-600/80 dark:text-white/80">

                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 dark:bg-white/[0.08]">
                  <FiCheck className="text-green-700 dark:text-white text-sm" />
                </div>

                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button className="mt-8 bg-green-600 text-white dark:bg-white dark:text-black px-6 py-3 rounded-full hover:scale-105 transition">
            Open dashboard
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
          rounded-2xl border border-green-500/20 dark:border-white/10
          bg-gradient-to-b from-green-500/[0.04] to-green-500/[0.02] 
          dark:from-white/[0.04] dark:to-white/[0.02]
          backdrop-blur-xl overflow-hidden

          shadow-[0_30px_80px_rgba(0,0,0,0.6)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]

          transform
          rotate-x-[-6deg] rotate-y-[-14deg]
          origin-right
          max-w-[620px] ml-auto mr-6
        "
        >

          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-3 
            border-b border-green-500/20 dark:border-white/10 
            bg-green-500/[0.03] dark:bg-white/[0.03]">

            <div className="flex items-center gap-2 text-primary">
              <FiCpu />
              <span>AI Mentor</span>
            </div>

            <span className="text-xs text-green-600 dark:text-white">
              Online
            </span>
          </div>

          {/* CHAT */}
          <div className="p-6 space-y-4 text-sm">

            {/* USER */}
            <div className="flex justify-end">
              <div className="bg-green-600 text-white dark:bg-white dark:text-black px-4 py-2 rounded-full max-w-xs">
                What should I learn after React basics?
              </div>
            </div>

            {/* AI */}
            <div className="bg-green-500/[0.05] dark:bg-white/[0.04] border border-green-500/20 dark:border-white/10 px-4 py-3 rounded-xl text-green-700 dark:text-white/80 max-w-md">
              Nice progress! Next up: <b>state management</b> (TanStack Query),
              routing, and a small full-stack project. I added 3 tasks to Week 4 of your roadmap.
            </div>

            {/* USER */}
            <div className="flex justify-end">
              <div className="bg-green-600 text-white dark:bg-white dark:text-black px-4 py-2 rounded-full">
                Give me a project idea.
              </div>
            </div>

            {/* AI */}
            <div className="bg-green-500/[0.05] dark:bg-white/[0.04] border border-green-500/20 dark:border-white/10 px-4 py-3 rounded-xl text-green-700 dark:text-white/80 max-w-md">
              A <b>personal finance dashboard</b> — auth, charts, CRUD.
              Stretch goal: monthly insights with AI.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}