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
import { UserNameDialogProps } from "@/types/chat";

const UserNameDialog: React.FC<UserNameDialogProps> = ({ onSave }) => {
  const [userName, setUserName] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError("O nome é obrigatório.");
      return;
    }

    setError(null);

    onSave(userName.trim());
  };

  return (
    <Dialog open>
      <DialogContent className="[&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Bem-vindo! Como deseja ser chamado?</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="mt-1"
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserNameDialog;
