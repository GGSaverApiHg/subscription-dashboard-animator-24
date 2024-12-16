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
    <Card className="mb-6 lg:mb-0">
      <CardHeader>
        <CardTitle>Account Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Username</span>
            <span>{user?.username}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Password</span>
            <span>********</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <Badge variant="default">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current HWID</span>
            <span className="font-mono text-sm truncate max-w-[200px]">{user?.hwid || "Not Set"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};