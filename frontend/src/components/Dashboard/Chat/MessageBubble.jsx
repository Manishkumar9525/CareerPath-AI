import ReactMarkdown from "react-markdown";

const MessageBubble = ({ type, text }) => {
  return (
    <div
      className={`flex ${type === "user" ? "justify-end" : "justify-start"
        }`}
    >
      <div
        className={`max-w-xl px-4 py-3 rounded-2xl border border-main wrap-break-word whitespace-pre-wrap ${type === "user"
            ? "bg-main text-on-main"
            : "bg-glass text-main"
          }`}
      >
        {/* ✅ Proper markdown rendering */}
        <ReactMarkdown>
          {text || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;