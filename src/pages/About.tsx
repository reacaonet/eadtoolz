import React from 'react';
import { Users, Award, BookOpen, Target } from 'lucide-react';

export function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover"
            alt="About background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Sobre Nós
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Transformando a educação através da gamificação. Nossa missão é tornar o aprendizado mais envolvente e efetivo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg mx-auto flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Comunidade</h3>
              <p className="text-gray-400">
                Uma comunidade vibrante de estudantes e instrutores compartilhando conhecimento.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg mx-auto flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Excelência</h3>
              <p className="text-gray-400">
                Comprometidos com a qualidade e excelência em cada curso oferecido.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg mx-auto flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Aprendizado</h3>
              <p className="text-gray-400">
                Metodologia focada em resultados e experiência prática.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-lg mx-auto flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Objetivos</h3>
              <p className="text-gray-400">
                Ajudamos você a alcançar suas metas profissionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* História Section */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Nossa História</h2>
              <p className="text-gray-400 mb-4">
                A EadToolZ nasceu da visão de transformar a educação online através da gamificação. 
                Acreditamos que o aprendizado pode ser uma jornada envolvente e divertida.
              </p>
              <p className="text-gray-400">
                Desde nossa fundação, temos ajudado milhares de estudantes a alcançarem seus objetivos
                profissionais através de uma plataforma inovadora que combina educação de qualidade
                com elementos de jogos.
              </p>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070&h=1080"
                alt="Team working"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
