import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaRegEnvelope, FaRegUser } from "react-icons/fa6";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/verify-otp", { state: { email } });
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
            <p className="text-sm text-muted-foreground">Get started</p>
            <h1 className="mt-2 font-display text-5xl leading-[1.04] sm:text-6xl">
              Create your account.
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Start your personalized career roadmap in minutes. We will verify your
              email with a one-time code.
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Full name" icon={<FaRegUser />}>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none transition focus:border-primary"
                />
              </Field>

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
                  placeholder="Create a secure password"
                  autoComplete="new-password"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none transition focus:border-primary"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-primary font-medium text-primary-foreground shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed"
              >
                {loading ? "Sending code..." : "Continue"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-foreground">
                  Sign in
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
