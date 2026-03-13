import { Link } from './Router';
import { StarButton } from '@/components/ui/star-button';
import { Info, HelpCircle, SunMoon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onLogout?: () => void;
}

export default function Navbar({ isAuthenticated, userRole, onLogout }: NavbarProps) {
  const { toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Smart Classroom Management
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {/* Simple static buttons without dock animations */}
              <Link href="/about">
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center cursor-pointer group relative">
                  <Info className="w-6 h-6 text-white" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    About Us
                  </span>
                </button>
              </Link>
              
              <Link href="/help">
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center cursor-pointer group relative">
                  <HelpCircle className="w-6 h-6 text-white" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Help
                  </span>
                </button>
              </Link>
              
              {/* Theme button */}
              <button
                onClick={toggleTheme}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group relative"
                title="Change Theme"
              >
                <SunMoon className="w-6 h-6 text-white" />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Change Theme
                </span>
              </button>
            </div>

            <div className="flex gap-3">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <StarButton lightColor="#ffffff" className="h-auto py-2">
                      Dashboard
                    </StarButton>
                  </Link>
                  <StarButton
                    onClick={onLogout}
                    lightColor="#ffffff"
                    className="h-auto py-2"
                  >
                    Logout
                  </StarButton>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Login
                  </Link>
                  <Link href="/signup">
                    <StarButton lightColor="#ffffff" className="h-auto py-2">
                      Signup
                    </StarButton>
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
