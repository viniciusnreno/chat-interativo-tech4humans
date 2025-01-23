export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}
