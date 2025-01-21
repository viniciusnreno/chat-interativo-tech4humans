import { Message, Chat } from "@/types/chat";

export function setData(chats: Chat[]) {
  window.localStorage.setItem("chats", JSON.stringify(chats));
}

export function getData(): Chat[] {
  const data = window.localStorage.getItem("chats");
  return data ? JSON.parse(data) : [];
}

//cria um novo chat
export function createChat(): Chat {
  const newChat: Chat = {
    id: Date.now().toString(),
    name: "Chat",
    messages: [],
  };

  const chats = getData();
  chats.push(newChat);
  setData(chats);

  return newChat;
}

//remove um chat
export function removeChat(chatId: string): void {
  const chats = getData();
  const updatedChats = chats.filter((chat) => chat.id !== chatId);
  setData(updatedChats);
}

//atualiza um chat
export function updateChat(chatId: string, newName: string): void {
  const chats = getData();
  const updatedChats = chats.map((chat) =>
    chat.id === chatId ? { ...chat, name: newName } : chat
  );
  setData(updatedChats);
}

//salva uma mensagem
export function setMessage(chatId: string, value: Message): void {
  const chats = getData();
  const updatedChats = chats.map((chat) =>
    chat.id === chatId ? { ...chat, messages: [...chat.messages, value] } : chat
  );
  setData(updatedChats);
}

//obtem as mensagens
export function getMessages(chatId: string): Message[] {
  const chats = getData();
  const chat = chats.find((chat) => chat.id === chatId);
  return chat ? chat.messages : [];
}
