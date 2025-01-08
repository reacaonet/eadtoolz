import { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect?: (category: string) => void;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

export function CategoryModal({ isOpen, onClose, onCategorySelect }: CategoryModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  async function fetchCategories() {
    try {
      setLoading(true);
      const categoriesRef = collection(db, 'categories');
      const q = query(categoriesRef);
      const querySnapshot = await getDocs(q);
      
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      setError('Nome da categoria é obrigatório');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const categoriesRef = collection(db, 'categories');
      await addDoc(categoriesRef, {
        name: newCategory.name.trim(),
        description: newCategory.description.trim(),
        createdAt: new Date()
      });

      setNewCategory({ name: '', description: '' });
      await fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      setError('Erro ao adicionar categoria');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCategory(categoryId: string) {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      return;
    }

    try {
      setLoading(true);
      await deleteDoc(doc(db, 'categories', categoryId));
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError('Erro ao excluir categoria');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gerenciar Categorias</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleAddCategory} className="mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nome da Categoria</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Digite o nome da categoria"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={2}
              placeholder="Digite uma descrição (opcional)"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50"
          >
            <FiPlus /> Adicionar Categoria
          </button>
        </form>

        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  onClick={() => onCategorySelect?.(category.name)}
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{category.name}</h3>
                    {category.description && (
                      <p className="text-xs text-gray-500">{category.description}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category.id);
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
