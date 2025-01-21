export interface Message {
  sender: "user" | "bot";
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}
