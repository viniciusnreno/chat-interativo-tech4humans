"use client";
import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatContent = ({ messages }: { messages: Message[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 overflow-hidden p-4">
      {messages.map((message) => {
        const date = new Date(Number(message.timestamp));
        const time = `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        return (
          <div
            key={message.timestamp}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Card
              className={`my-1 max-w-max bg-white ${
                message.sender === "user"
                  ? "text-primary"
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
          </div>
        );
      })}
      <div ref={scrollRef}></div>
    </ScrollArea>
  );
};

export default ChatContent;
