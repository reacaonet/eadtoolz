import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiStar, FiUsers, FiClock } from 'react-icons/fi';
import { Course } from '../../types/course';

export function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<Course['status'] | 'all'>('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const coursesRef = collection(db, 'courses');
      const q = query(coursesRef);
      const querySnapshot = await getDocs(q);
      
      const coursesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Date ? data.createdAt : 
                    data.createdAt?.toDate?.() || data.createdAt || null,
          updatedAt: data.updatedAt instanceof Date ? data.updatedAt : 
                    data.updatedAt?.toDate?.() || data.updatedAt || null,
        };
      });
      
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Erro ao carregar os cursos');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(courseId: string) {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await deleteDoc(doc(db, 'courses', courseId));
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        setError('Erro ao excluir o curso');
      }
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(courses.filter(course => course?.category).map(course => course.category)));

  const getLevelColor = (level: Course['level']) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };
    return colors[level];
  };

  const getStatusColor = (status: Course['status']) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

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
        <h1 className="text-2xl font-bold">Gerenciar Cursos</h1>
        <button
          onClick={() => navigate('/admin/courses/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <FiPlus /> Novo Curso
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Course['status'] | 'all')}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">Todos os status</option>
          <option value="draft">Rascunho</option>
          <option value="published">Publicado</option>
          <option value="archived">Arquivado</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/courses/edit/${course.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Editar curso"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Excluir curso"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags?.map((tag, index) => (
                  <span
                    key={`${course.id}-${tag}-${index}`}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FiClock />
                  <span>{course.duration}h</span>
                </div>
                {course.rating && (
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                )}
                {course.totalStudents !== undefined && (
                  <div className="flex items-center gap-1">
                    <FiUsers />
                    <span>{course.totalStudents}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(course.level)}`}>
                  {course.level === 'beginner' ? 'Iniciante' :
                   course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(course.status)}`}>
                  {course.status === 'draft' ? 'Rascunho' :
                   course.status === 'published' ? 'Publicado' : 'Arquivado'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
