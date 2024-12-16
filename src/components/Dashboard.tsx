import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RotateCw, Shield, AlertTriangle } from "lucide-react";
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
    <div className="container py-6 md:py-10 fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Info Card */}
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

        {/* Instructions Card */}
        <Card>
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle className="text-blue-700 dark:text-blue-300">Instructions For Matrix Supreme / External</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Step 1: Connect Your Discord Account</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>After purchasing our panel, the first thing you need to do is:</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Visit our website dashboard and log in to your account.</li>
                    <li>Connect your Discord account by following the on-screen instructions.</li>
                    <li>Once connected, you will automatically receive all the roles related to your product.</li>
                    <li>If you don't receive the roles, click the <span className="font-semibold">Update Roles</span> button.</li>
                    <li>After getting your roles, check out the recent messages in the client notice section to stay updated.</li>
                    <li>If you have any questions, you can create a support ticket or ask in the client chat.</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Step 2: Download the Panel</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>You can download the panel from the Downloads section of our website.</p>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md mt-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <p>Make sure to disable Windows Defender's real-time protection or any other antivirus software before downloading.</p>
                        <p className="mt-2">All antivirus software might detect the panel as a virus because it modifies the emulator, so this step is crucial.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Step 3: Install the Recommended Emulator</h3>
                <p className="text-sm text-muted-foreground">Follow the installation guide provided in our Discord server.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HWID Reset Card */}
      <Card className="mt-6">
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