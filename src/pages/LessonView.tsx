import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/shared/Button';
import type { Lesson, Module, Progress } from '../types/models';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export function LessonView() {
  const { lessonId } = useParams();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!lessonId || !user) return;

      try {
        // Buscar dados da lição
        const lessonDoc = await getDoc(doc(db, 'lessons', lessonId));
        if (lessonDoc.exists()) {
          const lessonData = { id: lessonDoc.id, ...lessonDoc.data() } as Lesson;
          setLesson(lessonData);

          // Buscar dados do módulo
          const moduleDoc = await getDoc(doc(db, 'modules', lessonData.moduleId));
          if (moduleDoc.exists()) {
            setModule({ id: moduleDoc.id, ...moduleDoc.data() } as Module);
          }

          // Buscar progresso
          const progressRef = collection(db, 'progress');
          const progressQuery = query(
            progressRef,
            where('userId', '==', user.uid),
            where('lessonId', '==', lessonId)
          );
          const progressSnapshot = await getDocs(progressQuery);
          if (!progressSnapshot.empty) {
            setProgress(progressSnapshot.docs[0].data() as Progress);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados da lição:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [lessonId, user]);

  const handleComplete = async () => {
    if (!user || !lesson || !module) return;

    try {
      const progressData: Progress = {
        userId: user.uid,
        courseId: module.courseId,
        moduleId: module.id,
        lessonId: lesson.id,
        completed: true,
        completedAt: new Date()
      };

      await setDoc(
        doc(db, 'progress', `${user.uid}_${lesson.id}`),
        progressData
      );

      setProgress(progressData);

      // Encontrar próxima lição
      const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
      if (currentIndex < module.lessons.length - 1) {
        const nextLesson = module.lessons[currentIndex + 1];
        navigate(`/lesson/${nextLesson.id}`);
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  if (!lesson || !module) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Lição não encontrada</p>
      </div>
    );
  }

  const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
  const previousLesson = currentIndex > 0 ? module.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < module.lessons.length - 1 ? module.lessons[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegação superior */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(`/course/${module.courseId}`)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Voltar para o curso
            </button>

            <div className="flex items-center gap-4">
              {previousLesson && (
                <button
                  onClick={() => navigate(`/lesson/${previousLesson.id}`)}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Anterior
                </button>
              )}

              {nextLesson && (
                <button
                  onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  Próxima
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2 space-y-8">
            {lesson.type === 'video' && lesson.videoUrl && (
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <video
                  src={lesson.videoUrl}
                  controls
                  className="w-full h-full"
                  poster={lesson.thumbnail}
                />
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {lesson.title}
              </h1>
              
              <div className="prose max-w-none">
                {lesson.content && (
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                )}
              </div>
            </div>
          </div>

          {/* Barra lateral */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Seu Progresso
              </h2>

              <div className="space-y-4">
                {progress?.completed ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Lição concluída</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="w-full"
                  >
                    Marcar como concluída
                  </Button>
                )}

                <div className="text-sm text-gray-500">
                  Lição {currentIndex + 1} de {module.lessons.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
