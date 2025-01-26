export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

export interface Model {
  active: boolean;
  name: string;
}

export interface ChatFormProps {
  addMessage: (message: Message) => void;
  model: Model;
  setModel: (value: Model) => void;
  loading: boolean;
}

export interface ChatItemProps {
  chatName: string;
  chatId: string;
  isSelected: boolean;
  onSelect: (chatId: string) => void;
  onEdit: (chatId: string) => void;
  onRemove: (chatId: string) => void;
}

export interface ChatAreaProps {
  chatId: string;
}

export interface SidebarProps {
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
}

export interface ChatContextProps {
  chats: Chat[];
  createNewChat: () => Chat;
  handleRemoveChat: (chatId: string) => void;
  handleUpdateChat: (chatId: string, newName: string) => void;
}

export interface ChatContentProps {
  messages: Message[];
  loading: boolean;
}

export interface EditChatDialogProps {
  chatId: string;
  onClose: () => void;
  onSave: (oldChatId: string, newChatId: string) => void;
}

export interface UserNameDialogProps {
  onSave: (userName: string) => void;
}
