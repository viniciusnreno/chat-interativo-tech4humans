import { Message } from "@/types/chat";

const isBrowser = typeof window !== "undefined";

export function saveChats(chats: { [key: string]: Message[] }) {
  if (isBrowser) {
    window.localStorage.setItem("chats", JSON.stringify(chats));
  }
}

export function getChats(): { [key: string]: Message[] } {
  if (!isBrowser) return {};
  const data = window.localStorage.getItem("chats");
  return data ? JSON.parse(data) : {};
}

export function saveMessage(chatId: string, value: Message) {
  if (isBrowser) {
    const chats = getChats();
    const updatedChat = [...(chats[chatId] || []), value];
    chats[chatId] = updatedChat;
    saveChats(chats);
  }
}

export function getMessages(chatId: string): Message[] {
  if (isBrowser) {
    const chats = getChats();
    return chats[chatId] || [];
  }
  return [];
}
export function removeChat(chatId: string) {
  if (isBrowser) {
    const chats = getChats();
    delete chats[chatId];
    saveChats(chats);
  }
}

export function updateChat(oldChatId: string, newChatId: string) {
  if (isBrowser) {
    const chats = getChats();
    if (chats[oldChatId]) {
      chats[newChatId] = chats[oldChatId];
      delete chats[oldChatId];
      saveChats(chats);
    }
  }
}
