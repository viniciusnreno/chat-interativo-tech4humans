"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ChatFormProps, Message } from "@/types/chat";

const ChatForm: React.FC<ChatFormProps> = ({
  addMessage,
  model,
  setModel,
  loading,
}) => {
  const models = [
    "gpt-3.5-turbo-instruct",
    "deepseek-r1:8b (local)",
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama3-70b-8192",
    "llama3-8b-8192",
    "gemma2-9b-it",
  ];

  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage: Message = {
      role: "user",
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
        <Label htmlFor="use-ai" className="text-sm">
          AI
        </Label>
        <Switch
          id="use-ai"
          checked={model.active}
          onCheckedChange={(active) => setModel({ ...model, active })}
        />
        {model.active && (
          <Select
            value={model.name}
            onValueChange={(name) => setModel({ ...model, name })}
          >
            <SelectTrigger className="w-[200px]">{model.name}</SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </form>
  );
};

export default ChatForm;
