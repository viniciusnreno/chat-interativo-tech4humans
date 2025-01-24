"use client";

import React, { useState } from "react";
import ChatContent from "@/components/chat/chat-content";
import ChatForm from "@/components/chat/chat-form";
import { useMessages } from "@/hooks/useMessages";

interface ChatAreaProps {
  chatId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId }) => {
  const [model, setModel] = useState({
    active: false,
    name: "gpt-3.5-turbo-instruct",
  });
  const { messages, addMessage, loading } = useMessages(chatId, model);

  return (
    <div className="flex h-screen flex-1 flex-col bg-gray-100">
      <ChatContent messages={messages} />
      <ChatForm
        addMessage={addMessage}
        model={model}
        setModel={setModel}
        loading={loading}
      />
    </div>
  );
};

export default ChatArea;
