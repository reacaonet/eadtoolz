import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiEdit2, FiTrash2, FiPlus, FiClock, FiCopy } from 'react-icons/fi';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  days: number;
  features: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    try {
      const plansSnapshot = await getDocs(collection(db, 'plans'));
      const plansData = plansSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          description: data.description || '',
          price: data.price || 0,
          days: data.days || 30, // Padrão: 30 dias
          features: data.features || [],
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Plan;
      });
      setPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Erro ao carregar planos');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(planId: string) {
    if (window.confirm('Tem certeza que deseja excluir este plano?')) {
      try {
        await deleteDoc(doc(db, 'plans', planId));
        await fetchPlans();
      } catch (error) {
        console.error('Error deleting plan:', error);
        setError('Erro ao excluir plano');
      }
    }
  }

  async function handleClone(plan: Plan) {
    try {
      const newPlanRef = doc(collection(db, 'plans'));
      const newPlan = {
        name: `${plan.name} (Cópia)`,
        description: plan.description,
        price: plan.price,
        days: plan.days,
        features: [...plan.features],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(newPlanRef, newPlan);
      await fetchPlans();
    } catch (error) {
      console.error('Error cloning plan:', error);
      setError('Erro ao clonar plano');
    }
  }

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function formatDuration(days: number): string {
    if (days === 15) return 'Trial (15 dias)';
    if (days === 30) return 'Mensal';
    if (days === 180) return 'Semestral';
    if (days === 365) return 'Anual';
    return `${days} dias`;
  }

  function getPricePerMonth(price: number, days: number): number {
    return (price * 30) / days;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Planos</h1>
        <button
          onClick={() => navigate('/admin/plans/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <FiPlus /> Novo Plano
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar planos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {filteredPlans.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum plano encontrado
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <FiClock className="w-4 h-4" />
                    {formatDuration(plan.days)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/plans/edit/${plan.id}`)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    title="Editar plano"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleClone(plan)}
                    className="text-green-500 hover:text-green-700 p-1"
                    title="Clonar plano"
                  >
                    <FiCopy />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Excluir plano"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{plan.description}</p>
              <div className="mb-4">
                <p className="text-2xl font-bold text-blue-600">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(plan.price)}
                </p>
                {plan.days > 30 && (
                  <p className="text-sm text-gray-500">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(getPricePerMonth(plan.price, plan.days))} /mês
                  </p>
                )}
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.updatedAt && (
                <p className="text-xs text-gray-500 mt-4">
                  Última atualização: {plan.updatedAt.toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
