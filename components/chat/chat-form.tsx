"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Message } from "@/types/chat";

const ChatForm = ({
  onSendMessage,
  useChatGPT,
  setUseChatGPT,
}: {
  onSendMessage: (message: Message) => void;
  useChatGPT: boolean;
  setUseChatGPT: (value: boolean) => void;
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
      <div className="flex flex-col items-center gap-2 bg-white p-4 sm:flex-row">
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Enviar</Button>
        <div className="flex items-center gap-2">
          <Label htmlFor="useChatGPT">ChatGPT</Label>
          <Switch
            id="useChatGPT"
            checked={useChatGPT}
            onCheckedChange={setUseChatGPT}
          />
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
