import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pencil, Trash } from "lucide-react";

interface ChatItemProps {
  chatName: string;
  chatId: string;
  onSelect: (chatId: string) => void;
  onEdit: (chatId: string) => void;
  onRemove: (chatId: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  chatName,
  onSelect,
  onEdit,
  onRemove,
}) => {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-700">
      <span className="flex-grow" onClick={() => onSelect(chatId)}>
        {chatName}
      </span>
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
    </div>
  );
};

export default ChatItem;
