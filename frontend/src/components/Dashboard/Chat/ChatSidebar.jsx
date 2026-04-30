import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSingleChat, deleteChat } from "../../../services/chatService";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const ChatSidebar = ({
  setMessages,
  history = [],
  setChatId,
  activeChatId,
  setHistory,
  onSelectChat,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // ✅ search filter safe
  const filteredHistory = history.filter((chat) =>
    (chat.title || "").toLowerCase().includes(query.toLowerCase())
  );

  // ✅ SELECT CHAT (FIXED)
  const handleSelectChat = async (chat) => {
    try {
      const data = await getSingleChat(chat._id);

      // ✅ FIX: direct object (no .chat)
      if (!data) {
        toast.error("Chat not found");
        return;
      }

      setMessages(data.messages || []);
      setChatId(chat._id);
      onSelectChat?.();

    } catch (error) {
      console.error(error);
      toast.error("Failed to load chat");
    }
  };

  // ✅ DELETE CHAT
  const handleDelete = async (id, e) => {
    e.stopPropagation();

    try {
      await deleteChat(id);

      // remove from UI
      setHistory((prev) => prev.filter((c) => c._id !== id));

      // reset if active chat deleted
      if (id === activeChatId) {
        setMessages([]);
        setChatId(null);
      }

      toast.success("Chat deleted");

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">

      <h1 className="font-display text-xl text-main mb-6">CareerPath</h1>

      {/* NEW CHAT */}
      <button
        onClick={() => {
          setMessages([]);
          setChatId(null);
          onSelectChat?.();
        }}
        className="mb-4 px-4 py-2 rounded-full bg-main text-on-main"
      >
        + New chat
      </button>

      {/* SEARCH */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search conversations"
        className="px-3 py-2 rounded-lg bg-input border border-main text-main placeholder:text-sub mb-4"
      />

      <p className="text-xs text-sub mb-2">HISTORY</p>

      <div className="space-y-2 flex-1 overflow-y-auto">

        {history.length === 0 ? (
          <p className="text-xs text-sub">No chats yet</p>
        ) : filteredHistory.length === 0 ? (
          <p className="text-xs text-sub">No matching chats</p>
        ) : (
          filteredHistory.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleSelectChat(chat)}
              className={`p-3 rounded-xl cursor-pointer border flex justify-between items-center
                ${activeChatId === chat._id
                  ? "bg-main text-on-main border-main"
                  : "hover:bg-glass border-transparent"
                }`}
            >
              {/* TEXT */}
              <div className="min-w-0 pr-3">
                <p className="text-sm truncate">{chat.title}</p>
                <p className="text-xs opacity-70">
                  {new Date(chat.updatedAt).toLocaleDateString()}
                </p>
              </div>

              {/* DELETE ICON */}
              <FaTrash
                onClick={(e) => handleDelete(chat._id, e)}
                className="text-red-400 hover:text-red-600 cursor-pointer text-sm"
              />
            </div>
          ))
        )}
      </div>

      <div className="border-t"></div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-4 text-sm text-sub hover:text-main"
      >
        ← Back to dashboard
      </button>

    </div>
  );
};

export default ChatSidebar;