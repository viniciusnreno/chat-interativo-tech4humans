"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditChatDialogProps } from "@/types/chat";

const EditChatDialog: React.FC<EditChatDialogProps> = ({
  chatId,
  onClose,
  onSave,
}) => {
  const [newChatName, setNewChatName] = useState(" ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChatName.trim() && newChatName !== chatId) {
      onSave(chatId, newChatName.trim());
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renomear Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              placeholder="Digite o novo nome do chat"
              required
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditChatDialog;
