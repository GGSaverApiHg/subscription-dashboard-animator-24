import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "./Logo";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const GITHUB_TOKEN = "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";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api.github.com/repos/GGSaverApiHg/user-management/contents/users.json",
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      const users = JSON.parse(atob(data.content));
      
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
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