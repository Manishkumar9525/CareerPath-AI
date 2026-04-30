import api from "./api";

// ✅ SEND MESSAGE
export const sendMessage = async (message, chatId) => {
  const res = await api.post("/chat", { message, chatId });

  // ✅ always return clean object
  return {
    reply: res.data.reply,
    chatId: res.data.chatId,
  };
};

// ✅ GET ALL CHATS
export const getChats = async () => {
  const res = await api.get("/chat");

  return res.data.chats || [];
};

// ✅ GET SINGLE CHAT
export const getSingleChat = async (id) => {
  const res = await api.get(`/chat/${id}`);

  return res.data.chat || null;
};

// ✅ DELETE CHAT
export const deleteChat = async (id) => {
  await api.delete(`/chat/${id}`);
};