import { useState, useEffect } from 'react';
import { planService } from '../../../services/planService';
import { Plan } from '../../../types/plan';
import { Spinner } from '../../shared/Spinner';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { PlanForm } from './PlanForm';

export function PlanManagement() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      const fetchedPlans = await planService.getPlans();
      setPlans(fetchedPlans);
    } catch (err) {
      setError('Erro ao carregar os planos');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleDelete = async (planId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      try {
        await planService.deletePlan(planId);
        await loadPlans();
      } catch (err) {
        setError('Erro ao excluir o plano');
      }
    }
  };

  const handleSave = async (plan: Partial<Plan>) => {
    try {
      if (editingPlan) {
        await planService.updatePlan(editingPlan.id, plan);
      } else {
        await planService.createPlan(plan as Omit<Plan, 'id'>);
      }
      setShowForm(false);
      setEditingPlan(null);
      await loadPlans();
    } catch (err) {
      setError('Erro ao salvar o plano');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Gerenciar Planos</h1>
          <button
            onClick={() => {
              setEditingPlan(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Novo Plano
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {showForm ? (
          <PlanForm
            plan={editingPlan}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingPlan(null);
            }}
          />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <li key={plan.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <div className="flex text-sm">
                          <p className="font-medium text-blue-600 truncate">{plan.name}</p>
                          {plan.isPopular && (
                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
                              (Popular)
                            </p>
                          )}
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <p>
                              R$ {plan.price}/{plan.billingPeriod === 'monthly' ? 'mês' : 'ano'}
                            </p>
                            <span className="mx-2">•</span>
                            <p>Até {plan.maxUsers} usuários</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
