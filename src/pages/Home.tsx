import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Zap, Globe } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Aprenda. Evolua.
                <br />
                <span className="text-red-600">Conquiste.</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6">
                A plataforma de ensino gamificada que transforma sua jornada de aprendizado em uma experiência única.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100"
                >
                  Começar Agora
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10"
                >
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">1000+</div>
              <div className="text-gray-400 mt-2">Alunos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">50+</div>
              <div className="text-gray-400 mt-2">Cursos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">98%</div>
              <div className="text-gray-400 mt-2">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">24/7</div>
              <div className="text-gray-400 mt-2">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por que escolher a EadToolZ?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Nossa plataforma combina educação de qualidade com elementos de gamificação para tornar seu aprendizado mais envolvente e efetivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Conteúdo Premium</h3>
              <p className="text-gray-400">
                Acesso a cursos criados por especialistas da indústria, constantemente atualizados.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Sistema de Conquistas</h3>
              <p className="text-gray-400">
                Ganhe pontos, conquiste medalhas e acompanhe seu progresso em tempo real.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Comunidade Global</h3>
              <p className="text-gray-400">
                Conecte-se com estudantes de todo o mundo e compartilhe experiências.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-red-600">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800" />
            </div>
            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pronto para começar sua jornada?
              </h2>
              <p className="text-red-100 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de estudantes que já estão transformando suas vidas através da educação gamificada.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50"
              >
                Criar Conta Grátis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}