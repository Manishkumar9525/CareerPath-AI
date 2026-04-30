import { useState } from "react";

const suggestions = [
  "What should I learn next?",
  "Explain async/await with a real example",
  "Give me a portfolio project idea",
  "How do I prepare for system design interview?",
];

const EmptyState = ({ setMessages }) => {
  const [clicked, setClicked] = useState(false); // ✅ prevent spam

  const handleClick = (text) => {
    if (clicked) return;

    setClicked(true);

    // ✅ trigger chat
    setMessages([{ type: "user", text }]);

    // reset after short delay
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center">

      {/* ICON */}
      <div className="w-16 h-16 rounded-2xl bg-glass border border-main flex items-center justify-center mb-6">
        ✦
      </div>

      {/* TITLE */}
      <h1 className="font-display text-4xl text-main">
        How can I help today?
      </h1>

      <p className="text-sub mt-3 max-w-md">
        Ask about your roadmap, a tricky concept, or what to learn next.
      </p>

      {/* SUGGESTIONS */}
      <div className="grid md:grid-cols-2 gap-4 mt-8 max-w-2xl">
        {suggestions.map((item, i) => (
          <button
            key={i}
            onClick={() => handleClick(item)}
            className="px-5 py-4 rounded-xl border border-main bg-glass text-main hover:scale-105 transition text-left"
          >
            {item}
          </button>
        ))}
      </div>

    </div>
  );
};

export default EmptyState;