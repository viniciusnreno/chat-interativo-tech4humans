import { Message } from "@/types/chat";

// Função para salvar mensagens no localStorage
export function saveMessage(key: string, value: Message) {
  window.localStorage.setItem(
    key,
    JSON.stringify([...getMessages(key), value])
  );
}

// Função para recuperar mensagens do localStorage
export function getMessages(key: string): Message[] {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
