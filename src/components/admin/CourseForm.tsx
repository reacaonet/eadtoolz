import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc, setDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Course } from '../../types/course';
import { FiSave, FiX, FiPlus } from 'react-icons/fi';
import { CategoryModal } from './CategoryModal';

interface Category {
  id: string;
  name: string;
  description?: string;
}

export function CourseForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    level: 'beginner' as Course['level'],
    category: '',
    tags: [''],
    status: 'draft' as Course['status'],
    instructorId: '',
    instructorName: '',
    modules: [],
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
  });

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchCourse();
    }
  }, [id]);

  async function fetchCategories() {
    try {
      const categoriesRef = collection(db, 'categories');
      const querySnapshot = await getDocs(categoriesRef);
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Erro ao carregar categorias');
    }
  }

  async function fetchCourse() {
    try {
      setLoading(true);
      const courseRef = doc(db, 'courses', id!);
      const courseSnap = await getDoc(courseRef);
      
      if (courseSnap.exists()) {
        const courseData = courseSnap.data();
        setFormData({
          title: courseData.title || '',
          description: courseData.description || '',
          price: courseData.price?.toString() || '',
          duration: courseData.duration?.toString() || '',
          level: courseData.level || 'beginner',
          category: courseData.category || '',
          tags: Array.isArray(courseData.tags) ? courseData.tags : [''],
          status: courseData.status || 'draft',
          instructorId: courseData.instructorId || '',
          instructorName: courseData.instructorName || '',
          modules: Array.isArray(courseData.modules) ? courseData.modules : [],
          thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
        });
      } else {
        setError('Curso não encontrado');
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Erro ao carregar o curso');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const courseData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price) || 0,
        duration: parseFloat(formData.duration) || 0,
        level: formData.level,
        category: formData.category.trim(),
        tags: formData.tags.filter(tag => tag.trim() !== ''),
        status: formData.status,
        instructorId: formData.instructorId.trim() || 'default',
        instructorName: formData.instructorName.trim() || 'Instrutor Padrão',
        modules: formData.modules,
        thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        updatedAt: new Date(),
      };

      if (id) {
        const courseRef = doc(db, 'courses', id);
        await updateDoc(courseRef, courseData);
      } else {
        const coursesRef = collection(db, 'courses');
        const newCourseRef = doc(coursesRef);
        await setDoc(newCourseRef, {
          ...courseData,
          createdAt: new Date(),
        });
      }

      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      setError('Erro ao salvar o curso');
    } finally {
      setLoading(false);
    }
  }

  function handleTagChange(index: number, value: string) {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  }

  function addTag() {
    setFormData({
      ...formData,
      tags: [...formData.tags, ''],
    });
  }

  function removeTag(index: number) {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
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
        <h1 className="text-2xl font-bold">{id ? 'Editar Curso' : 'Novo Curso'}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/admin/courses')}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600"
          >
            <FiX /> Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <FiSave /> Salvar
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div>
          <label className="block text-sm font-medium mb-1">Imagem do Curso</label>
          <div className="flex items-start gap-4">
            <div className="w-48 h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={formData.thumbnail}
                alt="Thumbnail do curso"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="URL da imagem (ex: https://...)"
                />
                <p className="text-sm text-gray-500">
                  Cole a URL de uma imagem (JPG, PNG ou WebP)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Preço</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duração (horas)</label>
            <input
              type="number"
              step="0.5"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nível</label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value as Course['level'] })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Course['status'] })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID do Instrutor</label>
            <input
              type="text"
              value={formData.instructorId}
              onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="ID do instrutor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Instrutor</label>
            <input
              type="text"
              value={formData.instructorName}
              onChange={(e) => setFormData({ ...formData, instructorName: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Nome do instrutor"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <div className="flex gap-2">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="flex-1 p-2 border rounded"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-gray-100 text-gray-600 px-3 py-2 rounded hover:bg-gray-200 flex items-center gap-1"
              title="Gerenciar categorias"
            >
              <FiPlus /> Categoria
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Digite uma tag"
              />
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FiX />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTag}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            + Adicionar tag
          </button>
        </div>
      </form>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          fetchCategories(); // Recarrega as categorias ao fechar o modal
        }}
        onCategorySelect={(category) => {
          setFormData({ ...formData, category });
          setIsCategoryModalOpen(false);
        }}
      />
    </div>
  );
}
