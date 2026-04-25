import { FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <div className="bg-background text-foreground">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative py-28 px-6 text-center overflow-hidden">

        {/* GRID */}
        <div className="absolute inset-0 grid-bg opacity-80"></div>

        {/* SOFT GLOW */}
        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-green-500/10 blur-[140px] rounded-full"></div>

        <div className="relative z-10 max-w-3xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-display">
            Let’s talk.
          </h1>

          <p className="mt-4 text-muted-foreground">
            Questions, ideas, feedback — we’re here to help you grow faster.
          </p>

        </div>
      </section>

      {/* ================= MAIN ================= */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-8">

            <h2 className="text-3xl font-display">
              We’re always listening
            </h2>

            <p className="text-muted-foreground max-w-md">
              Whether you're stuck, curious, or just exploring — reach out.
              We usually respond within 24 hours.
            </p>

            {/* CARDS */}
            <div className="space-y-4">

              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent transition">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <FiMail />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground text-sm">
                    support@careerpath.ai
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent transition">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500/10 text-green-500">
                  <FiMessageSquare />
                </div>
                <div>
                  <p className="font-medium">Live chat</p>
                  <p className="text-muted-foreground text-sm">
                    Available 24/7 with AI mentor
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE FORM ================= */}
          <div className="relative">

            {/* GLOW BORDER */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-xl opacity-40"></div>

            <div className="relative p-8 rounded-3xl border border-border bg-card backdrop-blur-xl">

              <h3 className="text-xl font-semibold mb-6">
                Send a message
              </h3>

              <form className="space-y-5">

                {/* INPUT */}
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <textarea
                  rows="4"
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-green-500 text-white dark:bg-white dark:text-black px-6 py-3 rounded-full
                    hover:scale-[1.02] transition  ">
                  <FiSend />
                  Send message
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

      <Footer />

    </div>
  );
}