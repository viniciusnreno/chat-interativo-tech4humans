"use client";
import React from "react";
import Sidebar from "@/components/chat/sidebar";
import ChatArea from "@/components/chat/chat-area";
import UserNameDialog from "@/components/chat/user-name-dialog";
import { useChatContext } from "@/contexts/chat-context";
import { getUserName, setUserName } from "@/utils/userService";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { createNewChat } = useChatContext();
  const [userName, setUserNameState] = React.useState<string | null>(null);
  const [activeChatId, setActiveChatId] = React.useState<string>("");

  React.useEffect(() => {
    const savedName = getUserName();
    if (savedName) {
      setUserNameState(savedName);
    }
  }, []);

  const handleSaveUserName = (name: string) => {
    setUserName(name);
    setUserNameState(name);
  };

  if (!userName) {
    return <UserNameDialog onSave={handleSaveUserName} />;
  }

  return (
    <main>
      <div className="flex h-screen">
        <Sidebar onChatSelect={setActiveChatId} />
        {activeChatId ? (
          <ChatArea chatId={activeChatId} />
        ) : (
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="mb-3 text-xl">
              Olá, {userName}! Como posso te ajudar?
            </h1>
            <Button
              onClick={() => {
                const newChat = createNewChat();
                setActiveChatId(newChat.id);
              }}
            >
              Novo Chat
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
