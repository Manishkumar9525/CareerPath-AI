const SidebarItem = ({ icon, label, active, badge, danger, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200

        ${active
          ? "bg-glass text-main border border-main shadow-inner"
          : "text-sub hover:text-main hover:bg-glass"
        }

        ${danger ? "hover:text-red-500" : ""}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>

      {badge && (
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-glass border border-main text-main">
          {badge}
        </span>
      )}
    </div>
  );
};

export default SidebarItem;