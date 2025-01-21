"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getChats, saveChats } from "@/utils/localStorage";
import { Message } from "@/types/chat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash } from "lucide-react";

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
    const date = new Date();
    const formattedDate = date.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    const newChatId = `Chat - ${formattedDate}`;
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
              <span
                className="flex-grow cursor-pointer"
                onClick={() => onChatSelect(chatId)}
              >
                {chatId}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white">
                    ...
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Pencil />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash className="text-red-500" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
