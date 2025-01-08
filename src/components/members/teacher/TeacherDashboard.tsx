import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Teacher, Student } from '../../../types/user';
import { userService } from '../../../services/userService';
import { useAuth } from '../../../contexts/AuthContext';
import { Spinner } from '../../shared/Spinner';

export function TeacherDashboard() {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadTeacherData = async () => {
      if (!currentUser) return;
      
      try {
        const teacherData = await userService.getTeacherDetails(currentUser.uid);
        setTeacher(teacherData);

        if (teacherData) {
          const studentsList = await userService.getTeacherStudents(teacherData.id);
          setStudents(studentsList);
        }
      } catch (error) {
        console.error('Error loading teacher data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTeacherData();
  }, [currentUser]);

  if (loading) {
    return <Spinner />;
  }

  if (!teacher) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Erro ao carregar dados do professor
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
            src={teacher.avatar || 'https://via.placeholder.com/100'}
            alt={teacher.name}
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{teacher.name}</h1>
            <p className="text-gray-500">Professor</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Estatísticas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800">Cursos</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-900">
              {teacher.courses.length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800">Alunos</h3>
            <p className="mt-2 text-3xl font-semibold text-green-900">
              {teacher.totalStudents || 0}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800">Avaliação</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-900">
              {teacher.rating?.toFixed(1) || '-'}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-800">Especialidades</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-900">
              {teacher.specialties?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Course Management */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Gerenciamento de Cursos
          </h2>
          <div className="space-y-4">
            <Link
              to="/teacher/courses/new"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Criar Novo Curso
            </Link>
            <Link
              to="/teacher/courses"
              className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Gerenciar Cursos Existentes
            </Link>
          </div>
        </div>

        {/* Profile Management */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Perfil do Professor
          </h2>
          <div className="space-y-4">
            <Link
              to="/teacher/profile"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Editar Perfil
            </Link>
            <Link
              to="/teacher/specialties"
              className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Gerenciar Especialidades
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Students */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Alunos Recentes</h2>
          <Link
            to="/teacher/students"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todos os alunos
          </Link>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Você ainda não tem alunos
            </h3>
            <p className="text-gray-500">
              Comece criando e publicando seus cursos
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aluno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progresso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Acesso
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={student.avatar || 'https://via.placeholder.com/32'}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {/* Nome do curso será adicionado quando integrarmos com o serviço de cursos */}
                        Curso {student.enrolledCourses[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                student.progress[student.enrolledCourses[0]]
                                  ?.progressPercentage || 0
                              }%`,
                            }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {student.progress[student.enrolledCourses[0]]
                            ?.progressPercentage || 0}
                          %
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(
                        student.progress[student.enrolledCourses[0]]?.lastAccessed ||
                          student.updatedAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
