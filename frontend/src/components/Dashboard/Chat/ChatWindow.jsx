import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import EmptyState from "./EmptyState";
import { sendMessage } from "../../../services/chatService";
import { toast } from "react-toastify";

const ChatWindow = ({
  messages,
  setMessages,
  setHistory,
  chatId,
  setChatId,
}) => {
  const bottomRef = useRef(null);
  const intervalRef = useRef(null);
  const lastIndexRef = useRef(-1); // ✅ FIX (no duplicate bug)

  // ✅ auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ detect new user message (SAFE & CORRECT)
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];

    if (!lastMsg || lastMsg.type !== "user") return;

    // ✅ prevent duplicate trigger (index based)
    if (lastIndexRef.current === messages.length - 1) return;

    lastIndexRef.current = messages.length - 1;

    handleAIResponse(lastMsg.text);
  }, [messages]);

  const handleAIResponse = async (text) => {
    // ✅ clear previous typing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    try {
      const data = await sendMessage(text, chatId);

      // ✅ NEW CHAT → set chatId + add history only once
      if (!chatId && data.chatId) {
        setChatId(data.chatId);

        if (setHistory) {
          setHistory((prev) => {
            if (prev.some((c) => c._id === data.chatId)) return prev;

            return [
              {
                _id: data.chatId,
                title: text,
                updatedAt: new Date(),
              },
              ...prev,
            ];
          });
        }
      }

      // ✅ add empty bot message safely
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "" }
      ]);

      let i = 0;

      // ✅ smooth typing effect (safe)
      intervalRef.current = setInterval(() => {
        i++;

        setMessages((prev) => {
          const updated = [...prev];

          if (updated.length > 0) {
            updated[updated.length - 1].text = data.reply.slice(0, i);
          }

          return updated;
        });

        if (i >= data.reply.length) {
          clearInterval(intervalRef.current);
        }
      }, 15);

    } catch (error) {
      console.error(error);
      toast.error("AI failed to respond");
    }
  };

  // ✅ cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">

      {/* HEADER */}
      <div className="p-4 border-b border-main flex justify-between">
        <h2 className="text-main font-medium">AI Mentor</h2>
        <span className="text-sub text-sm">Knows your roadmap</span>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-6">

        {messages.length === 0 ? (
          <EmptyState setMessages={setMessages} />
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} {...msg} />
            ))}
            <div ref={bottomRef} />
          </div>
        )}

      </div>

      {/* INPUT */}
      <ChatInput setMessages={setMessages} />

    </div>
  );
};

export default ChatWindow;