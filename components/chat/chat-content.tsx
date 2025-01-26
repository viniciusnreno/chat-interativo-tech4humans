"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserName } from "@/utils/userService";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatContentProps } from "@/types/chat";

const ChatContent: React.FC<ChatContentProps> = ({ messages, loading }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = getUserName();
    setUserName(storedUserName);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <ScrollArea className="flex-1 overflow-hidden p-4">
      {messages.map((message) => {
        const date = new Date(Number(message.timestamp));
        const time = `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        const isUserMessage = message.role === "user";

        return (
          <div
            key={message.timestamp}
            className={`flex items-center ${
              isUserMessage ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`my-1 max-w-max ${
                isUserMessage
                  ? "bg-primary text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <CardContent className="px-3 py-2">
                <div>{message.content}</div>
                <div className="mt-1 text-right text-xs text-gray-500">
                  {time}
                </div>
              </CardContent>
            </Card>
            {isUserMessage && (
              <Avatar>
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
      {loading && (
        <div className="flex items-center justify-start">
          <Card className="my-1 max-w-max bg-white text-gray-800">
            <CardContent className="px-3 py-2">
              <div>Pensando...</div>
            </CardContent>
          </Card>
        </div>
      )}
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
};

export default ChatContent;
