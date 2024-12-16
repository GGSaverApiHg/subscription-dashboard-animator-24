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
        <CardTitle className="text-center text-muted-foreground">Account Info</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-sm text-muted-foreground">Username</span>
            <span className="text-sm text-muted-foreground">{user?.username}</span>
          </div>
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-sm text-muted-foreground">Password</span>
            <span className="text-sm text-muted-foreground">********</span>
          </div>
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge>Active</Badge>
          </div>
          <div className="flex justify-between items-center border-l-4 pl-4">
            <span className="text-sm text-muted-foreground">Current HWID</span>
            <span className="font-mono text-sm text-muted-foreground truncate max-w-[200px]">{user?.hwid || "Not Set"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};