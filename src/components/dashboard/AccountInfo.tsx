import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccountInfoProps {
  user: {
    username: string;
    hwid: string;
  };
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <Card className="bg-[#1A1F2C] border-gray-800">
      <CardHeader className="bg-secondary">
        <CardTitle className="text-center">Account Info</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-l-4 border-green-500 pl-4">
            <span className="text-xl text-white">Username</span>
            <span className="text-xl text-white">{user?.username}</span>
          </div>
          <div className="flex justify-between items-center border-l-4 border-green-500 pl-4">
            <span className="text-xl text-white">Password</span>
            <span className="text-xl text-white">********</span>
          </div>
          <div className="flex justify-between items-center border-l-4 border-green-500 pl-4">
            <span className="text-xl text-white">Status</span>
            <Badge className="bg-blue-500 hover:bg-blue-600">Active</Badge>
          </div>
          <div className="flex justify-between items-center border-l-4 border-green-500 pl-4">
            <span className="text-xl text-white">Current HWID</span>
            <span className="font-mono text-xl text-white truncate max-w-[200px]">{user?.hwid || "Not Set"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};