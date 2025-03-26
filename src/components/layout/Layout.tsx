
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  LineChart, 
  PlusCircle, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full px-6 py-4 blur-backdrop border-b border-border">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-xl font-medium">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-block w-8 h-8 bg-primary rounded-lg"></span>
              <span>Metrics</span>
            </Link>
          </h1>
          <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Settings">
            <User className="w-5 h-5" />
          </Button>
          <nav className="hidden sm:flex gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-sm font-medium hover:text-primary transition-colors">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-6xl py-6 animate-fade-in">
        {children}
      </main>

      {/* Bottom navigation for mobile */}
      <nav className="sticky bottom-0 w-full px-8 py-3 blur-backdrop border-t border-border md:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Link to="/dashboard" className={cn(
            "flex flex-col items-center text-xs font-medium transition-colors", 
            isActive("/dashboard") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}>
            <Home className="w-5 h-5 mb-1" />
            <span>Home</span>
          </Link>
          
          <Link to="/metrics" className={cn(
            "flex flex-col items-center text-xs font-medium transition-colors", 
            isActive("/metrics") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}>
            <LineChart className="w-5 h-5 mb-1" />
            <span>Metrics</span>
          </Link>
          
          <Link to="/add-metric" className="flex flex-col items-center text-xs font-medium">
            <div className="flex items-center justify-center w-12 h-12 -mt-6 rounded-full bg-primary text-primary-foreground shadow-md btn-hover">
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="mt-1">Add</span>
          </Link>
          
          <Link to="/profile" className={cn(
            "flex flex-col items-center text-xs font-medium transition-colors", 
            isActive("/profile") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}>
            <User className="w-5 h-5 mb-1" />
            <span>Profile</span>
          </Link>
          
          <Link to="/settings" className={cn(
            "flex flex-col items-center text-xs font-medium transition-colors", 
            isActive("/settings") ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}>
            <Settings className="w-5 h-5 mb-1" />
            <span>Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
