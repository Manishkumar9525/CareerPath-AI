import { FiTarget } from "react-icons/fi";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function About() {
  return (
    <div className="bg-background text-foreground">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative py-28 px-6 text-center overflow-hidden">

        <div className="absolute inset-0 grid-bg opacity-90 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.05] dark:via-white/[0.03] to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto">

          <h1 className="font-display text-5xl md:text-6xl leading-tight">
            We help you grow
            <br />
            <span className="italic text-muted-foreground">
              with clarity, not confusion.
            </span>
          </h1>

          <p className="mt-6 text-muted-foreground text-lg">
            CareerPath AI turns overwhelming learning into structured, actionable roadmaps.
          </p>

        </div>
      </section>

      {/* ================= VALUE CARDS ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">

          {[
            "Distinguish yourself",
            "Enterprise insights",
            "Data-driven learning",
            "Boost your career",
          ].map((title, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-border bg-card backdrop-blur-xl hover:bg-accent transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm">
                Build real skills with guided roadmaps and curated learning.
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="px-6 py-20 border-y border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">

          {[
            { value: "10k+", label: "Learners" },
            { value: "500+", label: "Roadmaps created" },
            { value: "95%", label: "Completion rate" },
            { value: "3x", label: "Faster growth" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card hover:bg-accent transition"
            >
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="px-6 py-24 border-y border-border text-center">

        <div className="max-w-5xl mx-auto">

          <div className="flex justify-center mb-6 text-muted-foreground">
            <FiTarget size={22} />
          </div>

          <h2 className="text-4xl font-display mb-6">
            Our mission is simple
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            We believe learning should be structured, not scattered.
            CareerPath AI removes the guesswork and gives you a clear path forward.
          </p>

        </div>
      </section>

      {/* ================= DIVIDER ================= */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-70"></div>
      </div>

      {/* ================= TIMELINE (FIXED) ================= */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">

          <div className="flex justify-center mb-6 text-green-500 dark:text-white/50">
            ✦
          </div>

          <h2 className="text-3xl font-display mb-16">
            Our journey
          </h2>

          <div className="relative">

            {/* CENTER LINE */}
            <div className="absolute left-1/2 top-0 h-full w-px bg-border -translate-x-1/2"></div>

            <div className="space-y-16">

              {[
                {
                  year: "2024",
                  title: "Idea started",
                  desc: "Solving confusion in learning paths.",
                },
                {
                  year: "2025",
                  title: "Built AI roadmap engine",
                  desc: "Created intelligent roadmaps tailored to every learner.",
                },
                {
                  year: "2026",
                  title: "Helping thousands grow faster",
                  desc: "Empowering learners to achieve goals.",
                },
              ].map((item, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div key={i} className="relative flex items-center">

                    {/* LEFT */}
                    <div className={`w-1/2 ${isLeft ? "pr-10 text-right" : "opacity-0"}`}>
                      {isLeft && (
                        <>
                          <p className="text-green-500 text-sm mb-1">{item.year}</p>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </>
                      )}
                    </div>

                    {/* DOT */}
                    <div className="relative z-10">
                      <div className="w-3 h-3 bg-green-500 rounded-full border-4 border-background shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                    </div>

                    {/* RIGHT */}
                    <div className={`w-1/2 ${!isLeft ? "pl-10 text-left" : "opacity-0"}`}>
                      {!isLeft && (
                        <>
                          <p className="text-green-500 text-sm mb-1">{item.year}</p>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </>
                      )}
                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}