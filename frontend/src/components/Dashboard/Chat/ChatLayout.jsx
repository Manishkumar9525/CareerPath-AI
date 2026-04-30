import { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { getChats } from "../../../services/chatService";

const ChatLayout = () => {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ load chats on mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        const chats = await getChats(); // ✅ FIXED

        setHistory(chats || []);
      } catch (error) {
        console.error("Failed to load chats", error);
      }
    };

    loadChats();
  }, []);

  return (
    <div className="h-screen bg-background md:flex">

      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-main bg-background/90 px-4 backdrop-blur-xl md:hidden">
        <button
          type="button"
          aria-label="Toggle chat sidebar"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="rounded-lg border border-main px-3 py-1 text-main"
        >
          Chats
        </button>
        <h2 className="text-main font-medium">AI Mentor</h2>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close chat sidebar overlay"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-main bg-glass backdrop-blur-xl transition-transform duration-200 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <ChatSidebar
          setMessages={setMessages}
          history={history}
          setChatId={setChatId}
          setHistory={setHistory}
          activeChatId={chatId}
          onSelectChat={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="hidden w-72 border-r border-main bg-glass backdrop-blur-xl md:block">
        <ChatSidebar
          setMessages={setMessages}
          history={history}
          setChatId={setChatId}
          setHistory={setHistory}
          activeChatId={chatId}
        />
      </div>

      <div className="h-[calc(100vh-3.5rem)] md:h-full flex-1">
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          setHistory={setHistory}
          chatId={chatId}
          setChatId={setChatId}
        />
      </div>

    </div>
  );
};

export default ChatLayout;