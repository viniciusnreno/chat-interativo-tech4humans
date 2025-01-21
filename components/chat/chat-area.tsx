"use client";
import React, { useEffect } from "react";
import { getMessages } from "@/utils/localStorage";
import ChatContent from "@/components/chat/chat-content";
import ChatForm from "@/components/chat/chat-form";
import { Message } from "@/types/chat";
const ChatArea = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  useEffect(() => {
    setMessages(getMessages("chatMessages"));
  }, [messages]);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <ChatContent messages={messages} />
      <ChatForm />
    </div>
  );
};

export default ChatArea;
