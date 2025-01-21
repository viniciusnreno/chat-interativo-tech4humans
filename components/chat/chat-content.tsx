"use client";
import { Message } from "@/types/chat";
const ChatContent = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`my-1 rounded-md p-2 ${
              message.sender === "user"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-white text-gray-800"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ChatContent;
