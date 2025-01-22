"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/types/chat";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: Message) => void;
}) => {
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: "user",
      content: input.trim(),
      timestamp: Date.now().toString(),
    };

    onSendMessage(newMessage);
    setInput("");
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center gap-2 bg-white p-4">
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
};
export default ChatForm;
