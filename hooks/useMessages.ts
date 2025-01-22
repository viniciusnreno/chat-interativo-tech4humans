import { useState, useEffect } from "react";
import { getMessages, setMessage } from "@/utils/chatService";
import axios from "axios";
import { Message } from "@/types/chat";

export const useMessages = (chatId: string, useChatGPT: boolean) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMessages = getMessages(chatId);
    setMessages(storedMessages || []);
  }, [chatId]);

  const addMessage = async (newMessage: Message) => {
    setMessage(chatId, newMessage);
    setMessages((prev) => [...prev, newMessage]);

    setLoading(true);
    try {
      const res = await axios.post("/api/chat", {
        message: newMessage.content,
        useChatGPT,
      });

      const botMessage: Message = {
        sender: "bot",
        content: res.data.response,
        timestamp: Date.now().toString(),
      };

      setMessage(chatId, botMessage);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro na integração com o ChatGPT:", error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, addMessage, loading };
};