import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccountInfoProps {
  user: {
    username: string;
    hwid: string;
    subscription: string;
    expireDate: string;
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
            <Badge className="bg-blue-500 hover:bg-blue-600">Active</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Current HWID</span>
            <span className="font-mono text-sm truncate max-w-[200px]">{user?.hwid || "Not Set"}</span>
          </div>
        </div>

        {/* Subscription Status Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Subscription Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Package</span>
              <span>{user?.subscription || "None"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Expiration Date</span>
              <span>{user?.expireDate || "N/A"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};