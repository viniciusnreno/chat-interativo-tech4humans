"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChats, saveChats } from "@/utils/localStorage";
import { Message } from "@/types/chat";

interface SidebarProps {
  onChatSelect: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const [chats, setChats] = React.useState<{ [key: string]: Message[] }>({});

  React.useEffect(() => {
    const savedChats = getChats();
    setChats(savedChats);
  }, []);

  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    const newChats = { ...chats, [newChatId]: [] };
    setChats(newChats);
    saveChats(newChats);
    onChatSelect(newChatId);
  };

  return (
    <Card className="h-screen w-64 bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Chats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="secondary" className="w-full" onClick={handleNewChat}>
          Novo Chat
        </Button>
        <div className="space-y-2">
          {Object.keys(chats).map((chatId) => (
            <div
              key={chatId}
              className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-700"
              onClick={() => onChatSelect(chatId)}
            >
              <span>{chatId}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
