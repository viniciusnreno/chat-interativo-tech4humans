import { Message } from "@/types/chat";

// Função para salvar mensagens no localStorage
export function setData(key: string, value: Message) {
  window.localStorage.setItem(key, JSON.stringify([...getData(key), value]));
}

// Função para recuperar mensagens do localStorage
export function getData(key: string): Message[] {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
