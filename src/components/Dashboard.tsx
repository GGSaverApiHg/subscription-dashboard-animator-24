import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RotateCw, Shield } from "lucide-react";

interface User {
  username: string;
  password: string;
  subscription: string;
  expireDate: string;
  hwidResets?: number;
}

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const MAX_RESETS = 15;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Initialize HWID resets if not present
      if (typeof parsedUser.hwidResets === 'undefined') {
        parsedUser.hwidResets = 0;
      }
      setUser(parsedUser);
    }
  }, []);

  const handleHWIDReset = () => {
    if (!user) return;

    if (user.hwidResets >= MAX_RESETS) {
      toast({
        variant: "destructive",
        title: "Reset limit reached",
        description: "You have reached the maximum number of HWID resets (15)."
      });
      return;
    }

    const updatedUser = {
      ...user,
      hwidResets: (user.hwidResets || 0) + 1
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    toast({
      title: "HWID Reset Successful",
      description: `Reset count: ${updatedUser.hwidResets}/${MAX_RESETS}`,
    });
  };

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

      <Card className="mb-8">
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

      <Card>
        <CardHeader className="bg-secondary">
          <CardTitle className="text-center">Reset Device ID</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6 text-center">
            <p className="text-muted-foreground">
              If you want to reset your windows or if you see "Please login from registered device" then click the reset button below
            </p>
            <p className="text-red-500 flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              Warning: If you try to use the panel in a different pc, then your account will be suspended.
            </p>
            <div className="flex flex-col items-center gap-2">
              <Button 
                variant="default"
                onClick={handleHWIDReset}
                disabled={user.hwidResets >= MAX_RESETS}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Reset Device ID ({user.hwidResets || 0}/{MAX_RESETS})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};