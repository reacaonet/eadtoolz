import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Monitor, Smartphone, Tablet, BookOpen } from 'lucide-react';

export function Landing() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=2070&h=1080"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative">
          <header className="px-4 py-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Tv className="h-8 w-8 text-red-600" />
                  <span className="text-2xl font-bold text-white">Itamídia IPTV</span>
                </div>
                <Link
                  to="/courses"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Cursos</span>
                </Link>
              </div>
              <Link
                to="/login"
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Entrar
              </Link>
            </div>
          </header>

          <div className="max-w-4xl mx-auto text-center px-4 py-32">
            <h1 className="text-5xl font-bold text-white mb-6">
              Filmes, séries e muito mais, sem limites
            </h1>
            <p className="text-xl text-white mb-8">
              Assista onde quiser. Cancele quando quiser.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-white text-lg">
                Pronto para assistir? Faça login para acessar.
              </p>
              <Link
                to="/login"
                className="bg-red-600 text-white px-8 py-4 rounded-md text-xl hover:bg-red-700 transition-colors"
              >
                Começar agora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="border-t-8 border-gray-800">
        <div className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-white mb-4">
                Aproveite na sua TV
              </h2>
              <p className="text-xl text-gray-400">
                Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, aparelhos de Blu-ray e outros dispositivos.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=1000"
                alt="TV"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-8 border-gray-800">
        <div className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000"
                alt="Mobile devices"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1 text-center md:text-left mb-8 md:mb-0 md:pl-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Assista quando quiser
              </h2>
              <p className="text-xl text-gray-400">
                Assista no celular, tablet, smart TV ou notebook sem pagar a mais por isso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-8 border-gray-800">
        <div className="bg-black py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Disponível em seus dispositivos favoritos
              </h2>
              <p className="text-xl text-gray-400">
                Transmita em todos os seus dispositivos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Monitor className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">TV</h3>
                <p className="text-gray-400">Smart TVs</p>
              </div>
              <div className="text-center">
                <Smartphone className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Smartphone</h3>
                <p className="text-gray-400">iPhone & Android</p>
              </div>
              <div className="text-center">
                <Tablet className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Tablet</h3>
                <p className="text-gray-400">iPad & Android</p>
              </div>
              <div className="text-center">
                <Monitor className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Computador</h3>
                <p className="text-gray-400">Chrome OS, Windows, Mac</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-gray-400 font-bold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Sobre nós</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Carreiras</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Imprensa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold mb-4">Ajuda</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-300">FAQ</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Central de Ajuda</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Privacidade</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 font-bold mb-4">Social</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Facebook</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Twitter</a></li>
                <li><a href="#" className="text-gray-500 hover:text-gray-300">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-gray-500">
            <p>&copy; 2024 Itamídia IPTV. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}