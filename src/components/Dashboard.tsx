import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Octokit } from "octokit";
import { AccountInfo } from "./dashboard/AccountInfo";
import { HWIDReset } from "./dashboard/HWIDReset";
import { SubscriptionStatus } from "./dashboard/SubscriptionStatus";

interface User {
  username: string;
  password: string;
  subscription: string;
  expireDate: string;
  hwidResets: number;
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

  const fetchUserData = async (username: string) => {
    try {
      const octokit = new Octokit({
        auth: GITHUB_TOKEN
      });

      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      if (Array.isArray(fileData) || !('content' in fileData)) {
        throw new Error('Invalid response format');
      }

      const content = atob(fileData.content);
      const users = JSON.parse(content);
      const githubUser = users.find((u: User) => u.username === username);
      
      if (githubUser) {
        // Update local storage with the latest data from GitHub
        localStorage.setItem("user", JSON.stringify(githubUser));
        setUser(githubUser);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Always fetch the latest data from GitHub when component mounts
      fetchUserData(parsedUser.username);
    }
  }, []);

  const updateGithubRepo = async (updatedUser: User) => {
    try {
      const octokit = new Octokit({
        auth: GITHUB_TOKEN
      });

      const { data: fileData } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      if (Array.isArray(fileData) || !('content' in fileData)) {
        throw new Error('Invalid response format');
      }

      const content = atob(fileData.content);
      const users = JSON.parse(content);

      const updatedUsers = users.map((u: User) => 
        u.username === updatedUser.username 
          ? { ...u, hwid: "", hwidResets: (u.hwidResets || 0) + 1 }
          : u
      );

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

    // Get the latest user data before proceeding
    await fetchUserData(user.username);

    if (!user || user.hwidResets >= MAX_RESETS) {
      toast({
        variant: "destructive",
        title: "Reset limit reached",
        description: "You have reached the maximum number of HWID resets (15)."
      });
      return;
    }

    const githubUpdateSuccess = await updateGithubRepo(user);
    
    if (githubUpdateSuccess) {
      // Fetch the latest data after successful update
      await fetchUserData(user.username);

      toast({
        title: "HWID Reset Successful",
        description: `HWID has been cleared (Reset count: ${(user.hwidResets || 0) + 1}/${MAX_RESETS})`,
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
      <div className="grid gap-6">
        <AccountInfo user={user} />
        <SubscriptionStatus user={user} />
        <HWIDReset 
          hwidResets={user.hwidResets || 0}
          maxResets={MAX_RESETS}
          onReset={handleHWIDReset}
        />
      </div>
    </div>
  );
};