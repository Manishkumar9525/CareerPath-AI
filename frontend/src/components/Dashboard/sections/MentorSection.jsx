import { useNavigate } from "react-router-dom";

const MentorSection = () => {
  const navigate = useNavigate();

  const questions = [
    "What should I learn next?",
    "Explain async/await",
    "Give me a project idea",
  ];

  const handleOpenChat = (question) => {
    navigate("/ai-chat", {
      state: { question }, // 👉 pass question to AI chat
    });
  };

  return (
    <div className="p-6 rounded-2xl bg-glass border border-main shadow-card">

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Ask the AI mentor</h3>
          <p className="text-sub text-sm">
            Get unstuck in seconds
          </p>
        </div>

        {/* ✅ OPEN CHAT BUTTON */}
        <button
          onClick={() => handleOpenChat("")}
          className="px-4 py-1.5 rounded-full bg-white/10 text-sm hover:bg-white/20 transition"
        >
          Open chat
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {questions.map((q, i) => (
          <div
            key={i}
            onClick={() => handleOpenChat(q)} // ✅ click question → AI chat
            className="px-4 py-3 rounded-xl border border-main bg-white/5 text-sm cursor-pointer hover:bg-white/10 transition"
          >
            {q}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MentorSection;