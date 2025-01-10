import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
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
            <p className="mt-4 text-gray-400">
              Transformando a educação através da gamificação. Nossa missão é tornar o aprendizado mais envolvente e efetivo.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-white">
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-white font-semibold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            {new Date().getFullYear()} EadToolZ. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}