import { Link } from './Router';
import { Info, HelpCircle, SunMoon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onLogout?: () => void;
}

export default function Navbar({ isAuthenticated, onLogout }: NavbarProps) {
  const { toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold tracking-wider text-foreground">
            Smart Classroom Management
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Link href="/about">
                <button className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center cursor-pointer group relative text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors">
                  <Info className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    About Us
                  </span>
                </button>
              </Link>
              
              <Link href="/help">
                <button className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center cursor-pointer group relative text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors">
                  <HelpCircle className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Help
                  </span>
                </button>
              </Link>
              
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center cursor-pointer group relative text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
                title="Change Theme"
              >
                <SunMoon className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Change Theme
                </span>
              </button>
            </div>

            <div className="flex gap-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <button className="px-4 py-2 rounded-full border border-foreground/20 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-all">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded-full border border-foreground/20 text-foreground/60 text-sm font-medium hover:text-foreground hover:border-foreground/30 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-foreground/60 hover:text-foreground text-sm font-medium transition-colors">
                    Login
                  </Link>
                  <Link href="/signup">
                    <button className="px-4 py-2 rounded-full border border-foreground/20 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-all">
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
