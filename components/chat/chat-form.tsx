"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Message } from "@/types/chat";

const ChatForm = ({
  addMessage,
  useChatGPT,
  setUseChatGPT,
  loading,
}: {
  addMessage: (message: Message) => void;
  useChatGPT: boolean;
  setUseChatGPT: (value: boolean) => void;
  loading: boolean;
}) => {
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: Message = {
      sender: "user",
      content: input.trim(),
      timestamp: Date.now().toString(),
    };

    addMessage(newMessage);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-col gap-2 bg-white p-4 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 gap-2">
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </div>

      <div className="mx-auto mt-2 flex items-center gap-2 sm:mx-0 sm:ml-2 sm:mt-0">
        <Label htmlFor="useChatGPT" className="text-sm">
          gpt-3.5-turbo
        </Label>
        <Switch
          id="useChatGPT"
          checked={useChatGPT}
          onCheckedChange={setUseChatGPT}
        />
      </div>
    </form>
  );
};

export default ChatForm;
