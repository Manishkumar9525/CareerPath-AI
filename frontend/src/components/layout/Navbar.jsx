import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const nav = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "features", label: "Features", isScroll: true }, // 🔥 special
    { path: "/contact", label: "Contact" },
  ];

  const handleFeaturesClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("features")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("features")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="font-display text-xl tracking-tight">
          CareerPath
        </h1>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-1 text-sm p-1 rounded-full">

          {nav.map((item) => {
            const active =
              item.isScroll
                ? location.pathname === "/"
                : location.pathname === item.path;

            // 🔥 Features special case
            if (item.isScroll) {
              return (
                <button
                  key={item.label}
                  onClick={handleFeaturesClick}
                  className="px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-white/5"
                >
                  {item.label}
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-white/10 dark:bg-white/10 text-foreground backdrop-blur-md shadow-sm border border-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition px-2 py-1 rounded-md"
            >
              Sign in
            </Link>
          </div>

          <Link
            to="/signup"
            className="bg-foreground text-background px-5 py-2 rounded-full shadow-soft hover:scale-105 transition"
          >
            Get started
          </Link>

        </div>

      </div>
    </header>
  );
}