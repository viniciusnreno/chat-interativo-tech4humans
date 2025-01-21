"use client";
import React from "react";
import { getMessages, saveMessage } from "@/utils/localStorage";
import ChatContent from "@/components/chat/chat-content";
import ChatForm from "@/components/chat/chat-form";
import { Message } from "@/types/chat";

const ChatArea = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    const storedMessages = getMessages("chatMessages");
    setMessages(storedMessages || []);
  }, []);

  const handleSendMessage = (newMessage: Message) => {
    saveMessage("chatMessages", newMessage);
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
