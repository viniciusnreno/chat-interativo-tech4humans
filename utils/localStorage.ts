import { Message } from "@/types/chat";

// criar chat
export function saveChats(chats: { [key: string]: Message[] }) {
  window.localStorage.setItem("chats", JSON.stringify(chats));
}

// obter chat
export function getChats(): { [key: string]: Message[] } {
  const data = window.localStorage.getItem("chats");
  return data ? JSON.parse(data) : {};
}

// remover chat
export function removeChat(chatId: string) {
  const chats = getChats();
  delete chats[chatId];
  saveChats(chats);
}

// atualizar chat
export function updateChat(oldChatId: string, newChatId: string) {
  const chats = getChats();
  if (chats[oldChatId]) {
    const updatedChats = {
      [newChatId]: chats[oldChatId],
      ...Object.keys(chats)
        .filter((key) => key !== oldChatId)
        .reduce(
          (obj, key) => {
            obj[key] = chats[key];
            return obj;
          },
          {} as { [key: string]: Message[] }
        ),
    };

    // Salvar os chats reorganizados
    saveChats(updatedChats);
  }
}

// enviar e receber mensagens
export function saveMessage(chatId: string, value: Message) {
  const chats = getChats();
  console.log(chats);
  const updatedChat = [...(chats[chatId] || []), value];
  chats[chatId] = updatedChat;
  saveChats(chats);
}

export function getMessages(chatId: string): Message[] {
  const chats = getChats();
  return chats[chatId] || [];
}
