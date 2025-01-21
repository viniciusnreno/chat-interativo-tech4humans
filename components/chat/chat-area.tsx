"use client";
import React from "react";
import { getMessages, saveMessage } from "@/utils/localStorage";
import ChatContent from "@/components/chat/chat-content";
import ChatForm from "@/components/chat/chat-form";
import { Message } from "@/types/chat";

interface ChatAreaProps {
  chatId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId }) => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    const storedMessages = getMessages(chatId);
    setMessages(storedMessages || []);
  }, [chatId]);

  const handleSendMessage = (newMessage: Message) => {
    saveMessage(chatId, newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <ChatContent messages={messages} />
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatArea;