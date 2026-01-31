import { Link } from './Router';
import { StarButton } from '@/components/ui/star-button';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Info, HelpCircle, SunMoon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onLogout?: () => void;
}

export default function Navbar({ isAuthenticated, userRole, onLogout }: NavbarProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            Smart Classroom Management
          </Link>
          
          <div className="flex items-center gap-6">
            <Dock magnification={60} distance={100} panelHeight={48}>
              <Link href="/about">
                <DockItem className="aspect-square rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <DockLabel>About Us</DockLabel>
                  <DockIcon>
                    <Info className="h-full w-full text-white" />
                  </DockIcon>
                </DockItem>
              </Link>
              <DockItem className="aspect-square rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                <DockLabel>Help</DockLabel>
                <DockIcon>
                  <HelpCircle className="h-full w-full text-white" />
                </DockIcon>
              </DockItem>
              <DockItem 
                className="aspect-square rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 cursor-pointer"
                onClick={toggleTheme}
              >
                <DockLabel>Change Theme</DockLabel>
                <DockIcon>
                  <SunMoon className="h-full w-full text-white" />
                </DockIcon>
              </DockItem>
            </Dock>

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
                  <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white">
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
