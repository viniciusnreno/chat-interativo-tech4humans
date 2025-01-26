import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatItemProps } from "@/types/chat";

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  chatName,
  onSelect,
  onEdit,
  onRemove,
  isSelected,
}) => {
  return (
    <Card
      className={`cursor-pointer bg-primary text-secondary shadow-none transition-all hover:bg-zinc-700 ${isSelected ? "bg-zinc-700" : ""}`}
      onClick={() => onSelect(chatId)}
    >
      <CardContent className="flex items-center justify-between p-2">
        <span className="flex-grow">{chatName}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="me-2">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(chatId)}>
              <Pencil />
              Renomear
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRemove(chatId)}>
              <Trash className="text-red-500" />
              Remover
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default ChatItem;
