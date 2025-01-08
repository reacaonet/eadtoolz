import { useState } from 'react';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  const { userData, signOut } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <span className="ml-4 text-xl font-semibold">EADToolz</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
            >
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                {userData?.name?.charAt(0).toUpperCase() || <FiUser />}
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                <button
                  onClick={handleProfileClick}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FiUser className="mr-2" />
                  Perfil
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <FiLogOut className="mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
