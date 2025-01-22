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
import { Menu } from "lucide-react";

interface SidebarProps {
  onChatSelect: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false); // Estado para controlar a sidebar no mobile

  useEffect(() => {
    const savedChats = getData();
    setChats(savedChats);
  }, []);

  const handleCreateChat = () => {
    const newChat = createChat();
    setChats((prevChats) => [newChat, ...prevChats]);
    onChatSelect(newChat.id);
    setSidebarVisible(false);
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
    <>
      <Button
        variant="ghost"
        className={`absolute left-2 top-2 z-50 md:hidden ${sidebarVisible ? "hidden" : ""}`}
        onClick={() => setSidebarVisible(true)}
      >
        <Menu size={24} />
      </Button>
      <div
        className={`fixed inset-y-0 left-0 z-40 h-full w-72 transform bg-primary text-primary-foreground transition-transform md:static md:translate-x-0 ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Card className="bg-primary text-primary-foreground">
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
                  onSelect={(chatId) => {
                    onChatSelect(chatId);
                    setSidebarVisible(false); // Fecha a sidebar ao selecionar um chat no mobile
                  }}
                  onEdit={() => setSelectedChatId(chat.id)}
                  onRemove={() => handleRemoveChat(chat.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para editar o nome do chat */}
      {selectedChatId && (
        <EditChatDialog
          chatId={selectedChatId}
          onClose={() => setSelectedChatId(null)}
          onSave={handleEditChat}
        />
      )}

      {/* Background para fechar a sidebar ao clicar fora no mobile */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarVisible(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
