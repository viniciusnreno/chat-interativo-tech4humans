import ChatForm from "./chat-form";

const ChatArea = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-2">teste</div>
      </div>
      <ChatForm />
    </div>
  );
};

export default ChatArea;
