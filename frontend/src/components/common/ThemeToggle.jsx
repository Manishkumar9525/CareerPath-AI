import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // 👉 load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // 👉 apply theme
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="
        w-9 h-9 flex items-center justify-center rounded-full
        border border-border
        bg-accent/40 dark:bg-white/5
        hover:bg-accent/60 dark:hover:bg-white/10
        transition-all duration-200 hover:scale-105
      "
    >
      {theme === "dark" ? (
        <FaSun className="text-[13px]" />
      ) : (
        <FaMoon className="text-[13px]" />
      )}
    </button>
  );
}