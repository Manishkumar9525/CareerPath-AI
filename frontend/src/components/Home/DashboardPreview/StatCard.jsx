export default function StatCard({ title, value }) {
  return (
    <div className="
      rounded-xl p-4 transition

      border border-green-500/20 dark:border-white/10
      bg-green-500/[0.03] dark:bg-white/5

      hover:bg-green-500/[0.06] dark:hover:bg-white/[0.06]
    ">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="text-xl mt-1 text-primary font-semibold">
        {value}
      </p>
    </div>
  );
}