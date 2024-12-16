import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "./Logo";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [githubToken, setGithubToken] = useState(localStorage.getItem("github_token") || "");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubToken) {
      toast({
        variant: "destructive",
        title: "GitHub Token Required",
        description: "Please enter a valid GitHub token"
      });
      return;
    }

    try {
      const response = await fetch(
        "https://api.github.com/repos/GGSaverApiHg/user-management/contents/users.json",
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const users = JSON.parse(atob(data.content));
      
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("github_token", githubToken);
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid username or password"
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your GitHub token and try again"
      });
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            discord.gg/matrixregedit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="GitHub Token"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};