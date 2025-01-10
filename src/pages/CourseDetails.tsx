import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/shared/Button';
import type { Course, Module, Progress } from '../types/models';
import { Play, Clock, Award, BarChart2 } from 'lucide-react';

export function CourseDetails() {
  const { courseId } = useParams();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;

      try {
        const courseDoc = await getDoc(doc(db, 'courses', courseId));
        if (courseDoc.exists()) {
          setCourse({ id: courseDoc.id, ...courseDoc.data() } as Course);

          // Buscar módulos
          const modulesRef = collection(db, 'modules');
          const modulesQuery = query(modulesRef, where('courseId', '==', courseId), orderBy('order'));
          const modulesSnapshot = await getDocs(modulesQuery);
          setModules(modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Module));

          // Buscar progresso se usuário estiver logado
          if (user) {
            const progressRef = collection(db, 'progress');
            const progressQuery = query(
              progressRef,
              where('userId', '==', user.uid),
              where('courseId', '==', courseId)
            );
            const progressSnapshot = await getDocs(progressQuery);
            setProgress(progressSnapshot.docs.map(doc => doc.data() as Progress));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do curso:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Curso não encontrado</p>
      </div>
    );
  }

  const calculateProgress = () => {
    if (!modules.length || !progress.length) return 0;
    const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = progress.filter(p => p.completed).length;
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const courseProgress = calculateProgress();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-gray-200 text-lg mb-6">{course.description}</p>
            
            <div className="flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{Math.floor(course.duration / 60)}h {course.duration % 60}min</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="capitalize">{course.level}</span>
              </div>
              {courseProgress > 0 && (
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  <span>{courseProgress}% concluído</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conteúdo do Curso</h2>
            
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={module.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Módulo {index + 1}: {module.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {module.lessons.length} aulas
                    </span>
                  </div>
                  
                  <div className="divide-y">
                    {module.lessons.map((lesson) => {
                      const lessonProgress = progress.find(p => p.lessonId === lesson.id);
                      
                      return (
                        <div
                          key={lesson.id}
                          className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                          onClick={() => navigate(`/lesson/${lesson.id}`)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`
                              rounded-full p-2
                              ${lessonProgress?.completed
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-600'}
                            `}>
                              <Play className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-medium">
                                {lesson.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {lesson.duration} min
                              </p>
                            </div>
                          </div>
                          
                          {lessonProgress?.completed && (
                            <span className="text-green-600 text-sm font-medium">
                              Concluído
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Comece Agora</h2>
            
            {user ? (
              <Button
                onClick={() => {
                  const firstLesson = modules[0]?.lessons[0];
                  if (firstLesson) {
                    navigate(`/lesson/${firstLesson.id}`);
                  }
                }}
                className="w-full"
              >
                {courseProgress > 0 ? 'Continuar Curso' : 'Começar Curso'}
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Faça login para começar este curso e acompanhar seu progresso.
                </p>
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full"
                >
                  Fazer Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
