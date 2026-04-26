import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShieldHalved } from "react-icons/fa6";
import ThemeToggle from "../components/common/ThemeToggle";

export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!otp.trim()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/", { replace: true });
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
            <p className="text-sm text-muted-foreground">Verify your email</p>
            <h1 className="mt-2 font-display text-5xl leading-[1.04] sm:text-6xl">
              Enter the one-time code.
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              We sent a 6-digit verification code to {email}. Enter it below to finish
              creating your account.
            </p>
          </section>

          <section className="rounded-3xl border border-border bg-card p-7 shadow-card sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Verification code" icon={<FaShieldHalved />}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="000000"
                  maxLength={6}
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 tracking-[0.35em] outline-none transition focus:border-primary"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-primary font-medium text-primary-foreground shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify code"}
              </button>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <button type="button" className="font-medium text-foreground">
                  Resend code
                </button>
                <Link to="/signup" className="font-medium text-foreground">
                  Change email
                </Link>
              </div>
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
