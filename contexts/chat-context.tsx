"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createChat,
  getData,
  removeChat,
  updateChat,
} from "@/utils/chatService";
import { Chat } from "@/types/chat";

interface ChatContextProps {
  chats: Chat[];
  createNewChat: () => Chat;
  handleRemoveChat: (chatId: string) => void;
  handleUpdateChat: (chatId: string, newName: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const savedChats = getData();
    setChats(savedChats);
  }, []);

  const createNewChat = (): Chat => {
    const newChat = createChat();
    setChats((prevChats) => [newChat, ...prevChats]);
    return newChat;
  };

  const handleRemoveChat = (chatId: string) => {
    removeChat(chatId);
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };

  const handleUpdateChat = (chatId: string, newName: string) => {
    updateChat(chatId, newName);
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, name: newName } : chat
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{ chats, createNewChat, handleRemoveChat, handleUpdateChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext deve ser usado dentro de um ChatProvider");
  }
  return context;
};
