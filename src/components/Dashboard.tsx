import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Octokit } from "octokit";
import { AccountInfo } from "./dashboard/AccountInfo";
import { HWIDReset } from "./dashboard/HWIDReset";
import { SubscriptionStatus } from "./dashboard/SubscriptionStatus";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const MAX_RESETS = 15;
  const REPO_OWNER = "GGSaverApiHg";
  const REPO_NAME = "user-management";
  const FILE_PATH = "users.json";

  const fetchUserData = async (username: string) => {
    const githubToken = localStorage.getItem("github_token");
    
    if (!githubToken) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please login again"
      });
      navigate("/");
      return;
    }

    try {
      const octokit = new Octokit({
        auth: githubToken
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
        localStorage.setItem("user", JSON.stringify(githubUser));
        setUser(githubUser);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch user data. Please login again."
      });
      navigate("/");
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      fetchUserData(parsedUser.username);
    }
  }, []);

  const updateGithubRepo = async (updatedUser: User) => {
    const githubToken = localStorage.getItem("github_token");
    
    if (!githubToken) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please login again"
      });
      navigate("/");
      return;
    }

    try {
      const octokit = new Octokit({
        auth: githubToken
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
