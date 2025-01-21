"use client";
import React from "react";
import Sidebar from "@/components/chat/sidebar";
import ChatArea from "@/components/chat/chat-area";

export default function Home() {
  const [activeChatId, setActiveChatId] = React.useState<string>("");

  return (
    <main>
      <div className="flex h-screen">
        <Sidebar onChatSelect={setActiveChatId} />
        {activeChatId ? (
          <ChatArea chatId={activeChatId} />
        ) : (
          <div className="flex flex-1 items-center justify-center bg-gray-100">
            <p>Selecione ou crie um chat para começar!</p>
          </div>
        )}
      </div>
    </main>
  );
}
