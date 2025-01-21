"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getChats,
  saveChats,
  removeChat,
  updateChat,
} from "@/utils/localStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import EditChatDialog from "@/components/chat/edit-dialog";
import { Message } from "@/types/chat";

interface SidebarProps {
  onChatSelect: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<{ [key: string]: Message[] }>({});
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  //carrega os chats salvos no local storage
  React.useEffect(() => {
    const savedChats = getChats();
    setChats(savedChats);
  }, []);

  //cria um novo chat
  const handleCreateChat = () => {
    const formattedDate = new Date().toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });
    const newChatId = `Chat - ${formattedDate}`;
    const newChats = { ...chats, [newChatId]: [] };
    setChats(newChats);
    saveChats(newChats);
    onChatSelect(newChatId);
  };

  const handleRemoveChat = (chatId: string) => {
    removeChat(chatId);
    const updatedChats = { ...chats };
    delete updatedChats[chatId];
    setChats(updatedChats);
  };

  const handleEditChat = (oldChatId: string, newChatId: string) => {
    updateChat(oldChatId, newChatId);
    const updatedChats = getChats();
    setChats(updatedChats);
    onChatSelect(newChatId);
  };

  return (
    <Card className="h-screen w-64 bg-primary text-primary-foreground transition-colors">
      <CardHeader>
        <CardTitle className="text-lg">Chats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleCreateChat}
        >
          Novo Chat
        </Button>
        <div className="max-h-[calc(100vh-10rem)] space-y-2 overflow-y-auto">
          {Object.keys(chats).map((chatId) => (
            <div
              key={chatId}
              className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-700"
            >
              <span className="flex-grow" onClick={() => onChatSelect(chatId)}>
                {chatId}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="me-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedChatId(chatId)}>
                    <Pencil />
                    Renomear
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRemoveChat(chatId)}>
                    <Trash className="text-red-500" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
      {selectedChatId && (
        <EditChatDialog
          chatId={selectedChatId}
          onClose={() => setSelectedChatId(null)}
          onSave={handleEditChat}
        />
      )}
    </Card>
  );
};

export default Sidebar;
