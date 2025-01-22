"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getUserName } from "@/utils/userService";

const ChatContent = ({ messages }: { messages: Message[] }) => {
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
  }, [messages]);

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <ScrollArea className="flex-1 overflow-hidden p-4">
      {messages.map((message) => {
        const date = new Date(Number(message.timestamp));
        const time = `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        const isUserMessage = message.sender === "user";

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
              <div className="ms-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                {userInitial}
              </div>
            )}
          </div>
        );
      })}
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
};

export default ChatContent;
