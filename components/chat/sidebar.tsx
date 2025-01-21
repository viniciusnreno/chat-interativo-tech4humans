import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Sidebar = () => {
  return (
    <Card className="h-screen w-64 bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Chats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="secondary" className="w-full">
          Novo Chat
        </Button>
        <div className="space-y-2">
          <div className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-700">
            <span>teste</span>
            <Button variant="ghost" size="sm">
              🗑️
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
