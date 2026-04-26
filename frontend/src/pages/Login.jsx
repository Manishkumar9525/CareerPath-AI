import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaRegEnvelope } from "react-icons/fa6";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-display text-2xl leading-none">CareerPath</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_480px]">
          <section>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="mt-2 font-display text-5xl leading-[1.04] sm:text-6xl">
              Sign in to your account.
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Continue where you left off and pick up your personalized career roadmap.
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Email" icon={<FaRegEnvelope />}>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jane@example.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none transition focus:border-primary"
                />
              </Field>

              <Field label="Password" icon={<FaLock />}>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none transition focus:border-primary"
                />
              </Field>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[color:var(--color-primary)]" />
                  Remember me
                </label>
                <button type="button" className="font-medium text-foreground">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-primary font-medium text-primary-foreground shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="font-semibold text-foreground">
                  Sign up
                </Link>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium">
        <span className="text-muted-foreground">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}
