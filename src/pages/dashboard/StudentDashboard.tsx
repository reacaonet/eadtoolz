import React from 'react';
import { useAuth } from '../../context/AuthContext';

export function StudentDashboard() {
  const { user, userRole } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover"
            alt="Student dashboard"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Bem-vindo, {user?.displayName}!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Continue sua jornada de aprendizado. Acompanhe seu progresso e conquistas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Seu Progresso</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Cursos Completados</span>
                    <span>3/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Conquistas</span>
                    <span>12/20</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Current Course Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Curso Atual</h3>
              <div className="space-y-4">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3"
                    alt="Current course"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-white font-medium">Web Development Masterclass</h4>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Progresso: 60%</span>
                  <span>12/20 aulas</span>
                </div>
                <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Continuar Curso
                </button>
              </div>
            </div>

            {/* Recent Activities Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Atividades Recentes</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">🏆</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Conquista Desbloqueada</p>
                    <p className="text-gray-400 text-xs">Completou 5 lições seguidas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">📚</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Aula Completada</p>
                    <p className="text-gray-400 text-xs">Introdução ao React</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">✅</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Quiz Concluído</p>
                    <p className="text-gray-400 text-xs">Nota: 9/10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
