export default function SidebarItem({ label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
        active
          ? "bg-green-500/20 dark:bg-white/10 text-primary"
          : "text-muted-foreground hover:bg-green-500/10 dark:hover:bg-white/5 hover:text-green-700 dark:hover:text-white"
      }`}
    >
      <div className="w-4 h-4 bg-green-500/40 dark:bg-white/30 rounded-sm"></div>
      {label}
    </div>
  );
}