import { useState } from "react";

const ChatInput = ({ setMessages }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!text.trim() || sending) return;

    setSending(true);

    setMessages((prev) => [
      ...prev,
      { type: "user", text }
    ]);

    setText("");

    // ✅ safer reset (slightly longer)
    setTimeout(() => setSending(false), 800);
  };

  return (
    <div className="p-4 border-t border-main flex gap-2">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        placeholder="Ask the AI mentor anything..."
        className="flex-1 px-4 py-3 rounded-full border border-main bg-input text-main placeholder:text-sub"
      />

      <button
        onClick={handleSend}
        disabled={sending}
        className="px-4 rounded-full bg-main text-on-main"
      >
        {sending ? "..." : "➤"} {/* ✅ better UX */}
      </button>

    </div>
  );
};

export default ChatInput;