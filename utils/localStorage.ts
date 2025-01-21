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
  if (typeof window !== "undefined") {
    const existingMessages = getMessages(chatId);
    window.localStorage.setItem(
      chatId,
      JSON.stringify([...existingMessages, value])
    );
  }
}

export function getMessages(chatId: string): Message[] {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(chatId);
    return data ? JSON.parse(data) : [];
  }
  return [];
}
