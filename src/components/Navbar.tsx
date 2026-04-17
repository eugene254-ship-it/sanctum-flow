import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight gradient-text">Atlas Sanctum</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }} className="hover:text-foreground transition">Explore</Link>
          <Link to="/launch" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Launch</Link>
          <Link to="/dashboard" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Dashboard</Link>
          <Link to="/wallet" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Wallet</Link>
        </nav>
        <ConnectWalletButton />
      </div>
    </header>
  );
}
