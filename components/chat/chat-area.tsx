"use client";
import React, { useEffect, useState } from "react";
import ChatContent from "@/components/chat/chat-content";
import ChatForm from "@/components/chat/chat-form";
import { getMessages, setMessage } from "@/utils/chatService";
import { Message } from "@/types/chat";
import axios from "axios";

interface ChatAreaProps {
  chatId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [useChatGPT, setUseChatGPT] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMessages = getMessages(chatId);
    setMessages(storedMessages || []);
  }, [chatId]);

  const handleSendMessage = async (newMessage: Message) => {
    setMessage(chatId, newMessage);
    setMessages((prev) => [...prev, newMessage]);

    if (useChatGPT) {
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
        console.error("Erro na integração com a API do ChatGPT:", error);
      } finally {
        setLoading(false);
      }
    } else {
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
        console.error("Erro ao processar a mensagem padrão:", error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col bg-gray-100">
      <ChatContent messages={messages} />
      <ChatForm
        onSendMessage={handleSendMessage}
        useChatGPT={useChatGPT}
        setUseChatGPT={setUseChatGPT}
        loading={loading}
      />
    </div>
  );
};

export default ChatArea;
