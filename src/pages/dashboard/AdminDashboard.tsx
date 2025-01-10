import React from 'react';
import { useAuth } from '../../context/AuthContext';

export function AdminDashboard() {
  const { user, userRole } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover"
            alt="Admin dashboard"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Painel Administrativo
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Gerencie todos os aspectos da plataforma em um só lugar.
              </p>
              <div className="flex gap-4">
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100">
                  Adicionar Professor
                </button>
                <button className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10">
                  Ver Relatórios
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Platform Stats Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Estatísticas da Plataforma</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total de Usuários</span>
                  <span className="text-white font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Cursos Ativos</span>
                  <span className="text-white font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Professores</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Receita Mensal</span>
                  <span className="text-white font-semibold">R$ 45.678</span>
                </div>
              </div>
            </div>

            {/* Recent Activities Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Atividades Recentes</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">👨‍🏫</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Novo Professor</p>
                    <p className="text-gray-400 text-xs">João Silva adicionado</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">📚</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Novo Curso</p>
                    <p className="text-gray-400 text-xs">Machine Learning Basics</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 text-red-600">💰</div>
                  </div>
                  <div>
                    <p className="text-white text-sm">Nova Transação</p>
                    <p className="text-gray-400 text-xs">R$ 1.234,56</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Gerenciar Usuários
                </button>
                <button className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600/10">
                  Configurações da Plataforma
                </button>
                <button className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600/10">
                  Relatórios Financeiros
                </button>
                <button className="w-full py-2 px-4 border border-red-600 text-red-600 rounded-md hover:bg-red-600/10">
                  Logs do Sistema
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
