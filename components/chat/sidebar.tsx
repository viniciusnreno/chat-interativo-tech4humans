import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatItem from "@/components/chat/chat-item";
import EditChatDialog from "@/components/chat/edit-dialog";
import { useChatContext } from "@/contexts/chat-context";
import { Menu } from "lucide-react";

interface SidebarProps {
  onChatSelect: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onChatSelect }) => {
  const { chats, createNewChat, handleRemoveChat, handleUpdateChat } =
    useChatContext();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
              onClick={() => {
                const newChat = createNewChat();
                onChatSelect(newChat.id);
                setSidebarVisible(false);
              }}
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
                    setSidebarVisible(false);
                  }}
                  onEdit={() => setSelectedChatId(chat.id)}
                  onRemove={() => handleRemoveChat(chat.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {selectedChatId && (
        <EditChatDialog
          chatId={selectedChatId}
          onClose={() => setSelectedChatId(null)}
          onSave={handleUpdateChat}
        />
      )}
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
