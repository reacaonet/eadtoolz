import React from 'react';
import { useAuth } from '../../context/AuthContext';

export function TeacherDashboard() {
  const { user, userRole } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover"
            alt="Teacher dashboard"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Bem-vindo, Professor {user?.displayName}!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Gerencie seus cursos e acompanhe o progresso dos seus alunos.
              </p>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100">
                Criar Novo Curso
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Stats Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Estatísticas dos Cursos</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total de Cursos</span>
                  <span className="text-white font-semibold">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Alunos Ativos</span>
                  <span className="text-white font-semibold">128</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Avaliação Média</span>
                  <span className="text-white font-semibold">4.8/5.0</span>
                </div>
              </div>
            </div>

            {/* Recent Activities Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Atividades Recentes</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">👨‍🎓</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Novo Aluno Inscrito</p>
                    <p className="text-gray-400 text-xs">Web Development Masterclass</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">💬</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Nova Pergunta</p>
                    <p className="text-gray-400 text-xs">React Hooks Avançado</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">⭐</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Nova Avaliação</p>
                    <p className="text-gray-400 text-xs">5 estrelas - TypeScript Basics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Criar Nova Aula
                </button>
                <button className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600/10">
                  Gerenciar Cursos
                </button>
                <button className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600/10">
                  Ver Relatórios
                </button>
                <button className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600/10">
                  Responder Dúvidas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
