import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Logo />
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-foreground hover:text-primary"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-end space-x-4">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-background border-b border-border/40 md:hidden">
            <nav className="container py-4 flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/store" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Store
              </Link>
              <Link 
                to="/orders" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
              <Link 
                to="/redeem" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Redeem
              </Link>
              <Link 
                to="/download" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Download
              </Link>
              <Link 
                to="/guides" 
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Guides
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-sm font-medium transition-colors hover:text-primary text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};