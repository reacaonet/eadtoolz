import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Student } from '../../../types/user';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../contexts/AuthContext';
import { Spinner } from '../../shared/Spinner';

export function StudentDashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadStudentData = async () => {
      if (!currentUser) return;
      
      try {
        const studentData = await userService.getStudentDetails(currentUser.uid);
        setStudent(studentData);
      } catch (error) {
        console.error('Error loading student data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, [currentUser]);

  if (loading) {
    return <Spinner />;
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Erro ao carregar dados do aluno
        </h2>
        <p className="mt-2 text-gray-600">
          Por favor, tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={student.avatar || 'https://via.placeholder.com/100'}
            alt={student.name}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-500">Aluno</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Visão Geral do Progresso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Cursos Ativos</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-900">
              {student.enrolledCourses.length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Aulas Completadas</h3>
            <p className="mt-2 text-3xl font-semibold text-green-900">
              {Object.values(student.progress).reduce(
                (total, course) => total + course.completedLessons.length,
                0
              )}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-800">Média de Progresso</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-900">
              {Object.values(student.progress).length > 0
                ? Math.round(
                    Object.values(student.progress).reduce(
                      (total, course) => total + course.progressPercentage,
                      0
                    ) / Object.values(student.progress).length
                  )
                : 0}
              %
            </p>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Meus Cursos</h2>
          <Link
            to="/courses"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos os cursos
          </Link>
        </div>
        
        {student.enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Você ainda não está matriculado em nenhum curso
            </h3>
            <p className="text-gray-500 mb-4">
              Explore nossos cursos e comece sua jornada de aprendizado
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Explorar Cursos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student.enrolledCourses.map((courseId) => {
              const progress = student.progress[courseId];
              return (
                <div
                  key={courseId}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {/* Nome do curso será adicionado quando integrarmos com o serviço de cursos */}
                      Curso {courseId}
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${progress?.progressPercentage || 0}%`,
                          }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {progress?.progressPercentage || 0}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {progress?.completedLessons.length || 0} aulas completadas
                      </span>
                      <Link
                        to={`/course/${courseId}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Continuar
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
