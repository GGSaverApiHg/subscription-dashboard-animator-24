import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Logo />
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/store" className="text-sm font-medium transition-colors hover:text-primary">
            Store
          </Link>
          <Link to="/orders" className="text-sm font-medium transition-colors hover:text-primary">
            Orders
          </Link>
          <Link to="/redeem" className="text-sm font-medium transition-colors hover:text-primary">
            Redeem
          </Link>
          <Link to="/download" className="text-sm font-medium transition-colors hover:text-primary">
            Download
          </Link>
          <Link to="/guides" className="text-sm font-medium transition-colors hover:text-primary">
            Guides
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};