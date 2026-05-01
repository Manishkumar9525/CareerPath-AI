import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative text-center py-19 px-6 overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none"></div>

      {/* SOFT LIGHT */}
      <div className="absolute top-[-180px] left-[-180px] w-[400px] h-[400px] bg-green-500/10 dark:bg-white/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* TAG */}
        <div className="inline-flex items-center gap-2 rounded-full 
          border border-green-500/20 dark:border-white/10 
          bg-green-500/10 dark:bg-white/5 
          px-4 py-1 text-xs text-muted-foreground backdrop-blur">
          ✨ New · AI Mentor chat is live
        </div>

        {/* HEADING */}
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-[-0.02em] font-[Instrument_Serif] text-primary">
          Build your career
          <br />
          <span className="italic text-muted-foreground font-[Instrument_Serif]">
            with an AI mentor.
          </span>
        </h1>

        {/* TEXT */}
        <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-muted-foreground">
          Personalized roadmaps, curated learning, and progress tracking —
          all powered by AI. Stop guessing. Start growing.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-center gap-4">

          {/* ✅ START FREE → SIGNUP */}
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-full font-medium transition
             bg-green-600 text-white
            dark:bg-white dark:text-black
            hover:scale-105 px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
          >
            Start free →
          </button>

          {/* ✅ SEE FEATURES → LOGIN */}
          <button
            onClick={() => navigate("/login")}
            className="
              border border-green-500/20 dark:border-white/10
              px-6 py-3 rounded-full text-muted-foreground
              hover:text-green-700 dark:hover:text-white
              hover:bg-green-500/10 dark:hover:bg-white/5
              transition
            "
          >
            See features
          </button>

        </div>

        {/* FOOT */}
        <p className="mt-4 text-xs text-muted-foreground">
          Free forever for individuals · No credit card
        </p>

      </div>
    </section>
  );
}