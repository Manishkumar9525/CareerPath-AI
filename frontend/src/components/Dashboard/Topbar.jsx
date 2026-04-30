const Topbar = () => {
  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-xl">

      <h2 className="font-semibold">Dashboard</h2>

      <button className="bg-brand text-brand-foreground px-4 py-2 rounded-full shadow-soft">
        ✨ New roadmap
      </button>

    </div>
  );
};

export default Topbar;