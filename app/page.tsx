import Sidebar from "@/components/chat/sidebar";
import ChatArea from "@/components/chat/chat-area";

export default function Home() {
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar />
        <ChatArea />
      </div>
    </main>
  );
}
