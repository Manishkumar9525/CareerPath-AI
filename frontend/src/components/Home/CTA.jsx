import { FiZap } from "react-icons/fi";

export default function CTA() {
  return (
    <section className="relative py-28 px-6">

      {/* CONTAINER */}
      <div className="
        relative
        max-w-5xl mx-auto text-center
        rounded-3xl backdrop-blur-xl

        border border-green-500/20 dark:border-white/10
        bg-gradient-to-b from-green-500/[0.05] to-green-500/[0.02] 
        dark:from-white/[0.05] dark:to-white/[0.02]

        shadow-[0_40px_100px_rgba(0,0,0,0.7)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]

        px-8 py-20
      ">

        {/* GLOW */}
        <div className="
          absolute inset-0 grid-bg
          bg-gradient-to-b 
          from-transparent 
          via-green-500/[0.05] 
          dark:via-white/[0.03] 
          to-transparent 
          pointer-events-none 
          rounded-3xl
        "></div>

        {/* ICON */}
        <div className="relative z-10 flex justify-center mb-6 text-green-600/60 dark:text-white/40">
          <FiZap size={22} />
        </div>

        {/* HEADING */}
        <h2 className="relative z-10 font-display text-4xl md:text-5xl leading-tight text-primary">
          Your next chapter
          <br />
          <span className="italic text-green-600/70 dark:text-white/70">
            starts today.
          </span>
        </h2>

        {/* SUBTEXT */}
        <p className="relative z-10 mt-6 text-green-600/70 dark:text-white/60 max-w-xl mx-auto text-lg">
          Join thousands of learners turning ambition into a clear plan.
        </p>

        {/* BUTTONS */}
        <div className="relative z-10 mt-10 flex flex-col sm:flex-row justify-center gap-4">

          {/* PRIMARY */}
          <button className="
           px-6 py-3 rounded-full font-medium transition
          bg-green-600 text-white
          dark:bg-white dark:text-black
          hover:scale-105
          ">
            Start free
          </button>

          {/* SECONDARY */}
          <button className="
            border border-green-500/30 dark:border-white/20 
            text-green-700 dark:text-white 
            px-6 py-3 rounded-full

            hover:bg-green-500/10 dark:hover:bg-white/10
            transition
          ">
            Talk to AI mentor
          </button>

        </div>

      </div>
    </section>
  );
}