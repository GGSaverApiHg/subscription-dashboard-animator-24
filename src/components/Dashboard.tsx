import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
  username: string;
  password: string;
  subscription: string;
  expireDate: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="container py-10 fade-in">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Username</span>
              <span>{user.username}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Password</span>
              <span>********</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="default">Active</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Package</span>
              <span>{user.subscription}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Expiration Date</span>
              <span>{user.expireDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};