import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../lib/firebase';

export function Navbar() {
  const { user, userRole } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <div className="absolute inset-0 bg-red-600 transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                EadToolZ
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/courses" className="text-white hover:text-red-500">
                  Cursos
                </Link>
                <Link to="/profile" className="text-white hover:text-red-500">
                  Perfil
                </Link>
                {userRole === 'admin' && (
                  <Link to="/dashboard/admin" className="text-white hover:text-red-500">
                    Admin
                  </Link>
                )}
                {userRole === 'teacher' && (
                  <Link to="/dashboard/teacher" className="text-white hover:text-red-500">
                    Professor
                  </Link>
                )}
                <button
                  onClick={() => auth.signOut()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-red-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
