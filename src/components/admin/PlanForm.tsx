import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiSave, FiX, FiTrash2, FiPlus } from 'react-icons/fi';

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

interface FormData {
  name: string;
  description: string;
  price: string;
  days: string;
  features: string[];
}

const initialFormData: FormData = {
  name: '',
  description: '',
  price: '',
  days: '30',
  features: [''],
};

const durationOptions = [
  { value: '15', label: 'Trial (15 dias)' },
  { value: '30', label: 'Mensal (30 dias)' },
  { value: '180', label: 'Semestral (180 dias)' },
  { value: '365', label: 'Anual (365 dias)' },
];

export function PlanForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (id) {
      fetchPlan();
    } else {
      setLoading(false);
    }
  }, [id]);

  async function fetchPlan() {
    try {
      const planDoc = await getDoc(doc(db, 'plans', id!));
      if (planDoc.exists()) {
        const planData = planDoc.data() as Plan;
        setFormData({
          name: planData.name || '',
          description: planData.description || '',
          price: planData.price?.toString() || '',
          days: planData.days?.toString() || '30',
          features: planData.features?.length ? planData.features : [''],
        });
      } else {
        setError('Plano não encontrado');
        navigate('/admin/plans');
      }
    } catch (error) {
      console.error('Error fetching plan:', error);
      setError('Erro ao carregar o plano');
    } finally {
      setLoading(false);
    }
  }

  function handleFeatureChange(index: number, value: string) {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  }

  function addFeature() {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    });
  }

  function removeFeature(index: number) {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      setFormData({ ...formData, features: newFeatures });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validação
    if (!formData.name.trim()) {
      setError('Nome do plano é obrigatório');
      return;
    }

    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
      setError('Preço inválido');
      return;
    }

    if (!formData.days || isNaN(parseInt(formData.days)) || parseInt(formData.days) < 1) {
      setError('Duração inválida');
      return;
    }

    const nonEmptyFeatures = formData.features.filter(f => f.trim() !== '');
    if (nonEmptyFeatures.length === 0) {
      setError('Adicione pelo menos um recurso ao plano');
      return;
    }

    try {
      const planData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        days: parseInt(formData.days),
        features: nonEmptyFeatures,
        updatedAt: new Date(),
      };

      if (id) {
        await updateDoc(doc(db, 'plans', id), planData);
      } else {
        const newPlanRef = doc(collection(db, 'plans'));
        await setDoc(newPlanRef, {
          ...planData,
          createdAt: new Date(),
        });
      }

      navigate('/admin/plans');
    } catch (error) {
      console.error('Error saving plan:', error);
      setError('Erro ao salvar o plano');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  function getPricePerMonth(): string {
    const price = parseFloat(formData.price);
    const days = parseInt(formData.days);
    if (!price || !days || days < 1) return '';
    const monthlyPrice = (price * 30) / days;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(monthlyPrice);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {id ? 'Editar Plano' : 'Novo Plano'}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Deseja descartar as alterações?')) {
                navigate('/admin/plans');
              }
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            <FiX /> Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <FiSave /> Salvar
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Plano</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Plano Básico"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preço</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
              {formData.price && formData.days && parseInt(formData.days) > 30 && (
                <p className="text-sm text-gray-500 mt-1">
                  Equivalente a {getPricePerMonth()} /mês
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duração do Plano</label>
            <select
              value={formData.days}
              onChange={(e) => setFormData({ ...formData, days: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Descreva os benefícios do plano..."
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Recursos do Plano</label>
              <button
                type="button"
                onClick={addFeature}
                className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
              >
                <FiPlus /> Adicionar Recurso
              </button>
            </div>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Acesso ilimitado aos cursos"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Remover recurso"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
