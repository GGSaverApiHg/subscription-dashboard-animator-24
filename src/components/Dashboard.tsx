import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RotateCw, Shield } from "lucide-react";
import { Octokit } from "octokit";

interface User {
  username: string;
  password: string;
  subscription: string;
  expireDate: string;
  hwidResets?: number;
  hwid: string;
  key: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const MAX_RESETS = 15;
  const GITHUB_TOKEN = "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";
  const REPO_OWNER = "GGSaverApiHg";
  const REPO_NAME = "user-management";
  const FILE_PATH = "users.json";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (typeof parsedUser.hwidResets === 'undefined') {
        parsedUser.hwidResets = 0;
      }
      setUser(parsedUser);
    }
  }, []);

  const updateGithubRepo = async (updatedUser: User) => {
    try {
      const octokit = new Octokit({
        auth: GITHUB_TOKEN
      });

      // First, get the current file content
      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      // Type guard to ensure fileData is a single file object
      if (Array.isArray(fileData) || !('content' in fileData)) {
        throw new Error('Invalid response format');
      }

      // Decode the content
      const content = atob(fileData.content);
      const users = JSON.parse(content);

      // Update the specific user's HWID
      const updatedUsers = users.map((u: User) => 
        u.username === updatedUser.username ? { ...u, hwid: "" } : u
      );

      // Update the file in GitHub
      await octokit.rest.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Reset HWID for user ${updatedUser.username}`,
        content: btoa(JSON.stringify(updatedUsers, null, 2)),
        sha: fileData.sha
      });

      return true;
    } catch (error) {
      console.error('Error updating GitHub:', error);
      return false;
    }
  };

  const handleHWIDReset = async () => {
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
      hwid: "",
      hwidResets: (user.hwidResets || 0) + 1
    };

    // Update GitHub repository
    const githubUpdateSuccess = await updateGithubRepo(updatedUser);
    
    if (githubUpdateSuccess) {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast({
        title: "HWID Reset Successful",
        description: `HWID has been cleared (Reset count: ${updatedUser.hwidResets}/${MAX_RESETS})`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: "Failed to update HWID. Please try again later."
      });
    }
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
              <span className="font-mono">{user?.hwid || "Not Set"}</span>
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
              <span>{user?.subscription}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Expiration Date</span>
              <span>{user?.expireDate}</span>
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
                disabled={user?.hwidResets >= MAX_RESETS}
                className="bg-cyan-500 hover:bg-cyan-600"
              >
                <RotateCw className="mr-2 h-4 w-4" />
                Reset Device ID ({user?.hwidResets || 0}/{MAX_RESETS})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};