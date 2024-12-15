import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Header = () => {
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
          <Link to="/logout" className="text-sm font-medium transition-colors hover:text-primary">
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
};