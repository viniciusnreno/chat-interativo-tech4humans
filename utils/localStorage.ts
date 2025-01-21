import { Message } from "@/types/chat";

const isBrowser = typeof window !== "undefined";

export function saveMessage(key: string, value: Message) {
  if (isBrowser) {
    window.localStorage.setItem(
      key,
      JSON.stringify([...getMessages(key), value])
    );
  }
}

export function getMessages(key: string): Message[] {
  if (!isBrowser) return [];
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
