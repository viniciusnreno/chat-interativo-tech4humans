import { useState, useEffect } from "react";
import { getMessages, setMessage } from "@/utils/chatService";
import axios from "axios";
import { Message } from "@/types/chat";
import { getUserName } from "@/utils/userService";
import { toast } from "sonner";

export const useMessages = (
  chatId: string,
  model: { active: boolean; name: string }
) => {
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
      const res = await axios.post(
        `/api/chat/${model.active ? model.name : "presetList"}`,
        {
          message: newMessage.content,
          username: getUserName(),
          history: messages.map((m) => {
            return { role: m.role, content: m.content };
          }),
        }
      );

      const botMessage: Message = {
        role: "assistant",
        content: res.data.response,
        timestamp: Date.now().toString(),
      };

      setMessage(chatId, botMessage);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error(
        `Não foi possível conectar ao modelo ${model.name}. Por favor, tente novamente.`
      );

      console.error("Erro na integração com o modelo: ", model.name, error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, addMessage, loading };
};
