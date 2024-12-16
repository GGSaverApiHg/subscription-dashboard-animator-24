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
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Account Info</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-xl">Username</span>
            <span className="text-xl">{user?.username}</span>
          </div>
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-xl">Password</span>
            <span className="text-xl">********</span>
          </div>
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-xl">Status</span>
            <Badge>Active</Badge>
          </div>
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-xl">Current HWID</span>
            <span className="font-mono text-xl truncate max-w-[200px]">{user?.hwid || "Not Set"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};