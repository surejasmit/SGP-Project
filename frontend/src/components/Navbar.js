import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, User, Home, AlertCircle, History, Moon, Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated()) {
    return null;
  }

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/labs', icon: AlertCircle, label: 'Labs & Classrooms' },
    ...(isAdmin() ? [{ to: '/issues', icon: History, label: 'Issue History' }] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 nav-glass backdrop-blur-xl border-b border-white/20 dark:border-dark-700/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            >
              Lab Tracker
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link group"
                >
                  <Icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:scale-110"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                </div>
                <div className="avatar">
                  <User size={16} className="text-white" />
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn-ghost hover:text-danger-600 dark:hover:text-danger-400"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden md:inline ml-2">Logout</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-dark-700 py-4 animate-slide-down">
            <div className="flex flex-col space-y-2">
              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-800 rounded-lg">
                <div className="avatar">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="nav-link justify-start"
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="nav-link justify-start w-full"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;