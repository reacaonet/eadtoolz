import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tv, Search, User, LogOut, BookOpen } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { auth } from '../lib/firebase';

export function Navbar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-black/75 to-transparent z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/browse" className="flex items-center space-x-2">
              <Tv className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-white">Itamídia IPTV</span>
            </Link>
            
            <Link 
              to="/courses" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Cursos</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search className="h-5 w-5" />
            </button>
            
            {user && (
              <>
                <Link 
                  to="/profile" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}