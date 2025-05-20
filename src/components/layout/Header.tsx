import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StickyNote, LogOut, CheckSquare } from 'lucide-react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-amber-500 p-2 rounded-md">
                <StickyNote size={24} className="text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Sticky Notes</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          {user && (
            <nav className="flex-1 flex justify-center max-w-lg mx-8">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActivePath('/') 
                        ? 'bg-amber-100 text-amber-900' 
                        : 'text-gray-700 hover:text-amber-900 hover:bg-amber-50'
                    } transition-colors duration-200`}
                  >
                    Active Notes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/completed"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      isActivePath('/completed') 
                        ? 'bg-amber-100 text-amber-900' 
                        : 'text-gray-700 hover:text-amber-900 hover:bg-amber-50'
                    } transition-colors duration-200`}
                  >
                    Completed Notes
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {/* User Actions */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700 hidden sm:block">
                  Hi, {user.name}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  rightIcon={<LogOut size={16} />}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;