import { FiCpu } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-green-500/20 dark:border-white/10 mt-10">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">

        {/* LEFT BRAND */}
        <div>
          <div className="flex items-center gap-2 text-primary text-lg font-semibold mb-4">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-white flex items-center justify-center text-black">
              <FiCpu size={16} />
            </div>
            CareerPath
          </div>

          <p className="text-green-600/70 dark:text-white/60 text-sm leading-relaxed max-w-xs">
            Personalized AI roadmaps to grow into the career you want — without the guesswork.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className="text-primary mb-4 font-medium">Product</h4>
          <ul className="space-y-2 text-green-600/70 dark:text-white/60 text-sm">
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Features</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Pricing</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Dashboard</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">AI Chat</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4 className="text-primary mb-4 font-medium">Resources</h4>
          <ul className="space-y-2 text-green-600/70 dark:text-white/60 text-sm">
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Roadmaps</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Guides</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Changelog</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Help center</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-primary mb-4 font-medium">Company</h4>
          <ul className="space-y-2 text-green-600/70 dark:text-white/60 text-sm">
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">About</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Careers</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Contact</li>
            <li className="hover:text-green-700 dark:hover:text-white cursor-pointer transition">Privacy</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-green-500/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between text-green-600/60 dark:text-white/50 text-sm">

          <p>© 2026 CareerPath AI. All rights reserved.</p>

          <p className="mt-2 md:mt-0">Crafted with care.</p>

        </div>
      </div>

    </footer>
  );
}