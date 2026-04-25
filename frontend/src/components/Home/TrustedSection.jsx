export default function TrustedSection() {
  const brands = [
    "Stanford",
    "MIT",
    "Google",
    "Stripe",
    "Notion",
    "Vercel",
    "Linear",
  ];

  return (
    <section className="relative py-2 md:py-8 px-4 border-y border-green-500/20 dark:border-white/10 bg-green-500/[0.02] dark:bg-white/[0.02]">

      {/* 🔥 CENTER SOFT LIGHT */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.05] dark:via-white/[0.04] to-transparent pointer-events-none"></div>

      {/* 🔥 TOP + BOTTOM FADE LINE */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500/30 dark:via-white/20 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-500/30 dark:via-white/20 to-transparent"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* TOP TEXT */}
        <p className="text-xs tracking-[0.3em] text-muted-foreground mb-7">
          TRUSTED BY LEARNERS FROM
        </p>

        {/* BRANDS */}
        <div className="flex flex-wrap justify-center gap-12 text-green-600/80 dark:text-white/70 text-lg font-display">
          {brands.map((brand, i) => (
            <span
              key={i}
              className="hover:text-green-700 dark:hover:text-white transition duration-300 cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}