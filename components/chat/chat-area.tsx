"use client";

import React, { useState } from "react";
import ChatContent from "@/components/chat/chat-content";
import ChatForm from "@/components/chat/chat-form";
import { useMessages } from "@/hooks/useMessages";

interface ChatAreaProps {
  chatId: string;
}

const ChatArea: React.FC<ChatAreaProps> = ({ chatId }) => {
  const [useChatGPT, setUseChatGPT] = useState(false);
  const { messages, addMessage, loading } = useMessages(chatId, useChatGPT);

  return (
    <div className="flex h-screen flex-1 flex-col bg-gray-100">
      <ChatContent messages={messages} />
      <ChatForm
        addMessage={addMessage}
        useChatGPT={useChatGPT}
        setUseChatGPT={setUseChatGPT}
        loading={loading}
      />
    </div>
  );
};

export default ChatArea;
