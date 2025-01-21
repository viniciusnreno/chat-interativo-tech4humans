import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createChat,
  getData,
  removeChat,
  updateChat,
} from "@/utils/chatService";
import EditChatDialog from "@/components/chat/edit-dialog";
import { Chat } from "@/types/chat";
import ChatItem from "@/components/chat/chat-item";

interface SidebarProps {
  onChatSelect: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const savedChats = getData();
    setChats(savedChats);
  }, []);

  const handleCreateChat = () => {
    const newChat = createChat();
    setChats((prevChats) => [...prevChats, newChat]);
    onChatSelect(newChat.id);
  };

  const handleRemoveChat = (chatId: string) => {
    removeChat(chatId);
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };

  const handleEditChat = (chatId: string, newName: string) => {
    updateChat(chatId, newName);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, name: newName } : chat
      )
    );
  };

  return (
    <Card className="h-screen w-72 bg-primary text-primary-foreground transition-colors">
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
          {chats.map((chat) => (
            <ChatItem
              key={chat.id}
              chatId={chat.id}
              chatName={chat.name}
              onSelect={onChatSelect}
              onEdit={() => setSelectedChatId(chat.id)}
              onRemove={() => handleRemoveChat(chat.id)}
            />
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
