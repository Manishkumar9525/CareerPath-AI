import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaRegEnvelope, FaRegUser } from "react-icons/fa6";
import ThemeToggle from "../components/common/ThemeToggle";
import { signupUser } from "../services/authService";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ NEW
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ✅ Basic validation
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("All fields are required");
      return;
    }

    // ✅ Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // ✅ Strong password check
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must have 6+ chars, uppercase, lowercase, number & special character"
      );
      return;
    }

    // ✅ MOST IMPORTANT (backend match)
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await signupUser({
        name: fullName,
        email,
        password,
        passwordConfirm: confirmPassword, // ✅ CORRECT
      });

      toast.success("OTP sent successfully ");

      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 400);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-display text-2xl leading-none">
              CareerPath
            </span>
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
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none focus:border-primary"
                />
              </Field>

              <Field label="Email" icon={<FaRegEnvelope />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none focus:border-primary"
                />
              </Field>

              <Field label="Password" icon={<FaLock />}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none focus:border-primary"
                />
              </Field>

              {/* ✅ NEW FIELD */}
              <Field label="Confirm Password" icon={<FaLock />}>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="h-11 w-full rounded-xl border border-border bg-surface px-4 outline-none focus:border-primary"
                />
              </Field>

              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-primary text-primary-foreground"
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