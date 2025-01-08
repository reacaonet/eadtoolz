import { signOut } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

interface UserData {
  role: 'student' | 'teacher' | 'admin';
  name: string;
  email: string;
}

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  newUsers: number;
  pendingCourses: number;
  revenueGrowth: number;
  activeStudents: number;
  activeTeachers: number;
}

export function Dashboard() {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    newUsers: 0,
    pendingCourses: 0,
    revenueGrowth: 0,
    activeStudents: 0,
    activeTeachers: 0
  });

  useEffect(() => {
    if (!userData) return;

    // Redireciona com base no papel do usuário
    switch (userData.role) {
      case 'admin':
        loadAdminStats();
        break;
      case 'teacher':
        loadTeacherStats();
        break;
      case 'student':
        loadStudentStats();
        break;
      default:
        navigate('/login');
    }
  }, [userData]);

  const loadAdminStats = async () => {
    try {
      const usersRef = collection(db, 'users');
      const coursesRef = collection(db, 'courses');

      // Contagem total de usuários
      const usersSnapshot = await getDocs(usersRef);
      const totalUsers = usersSnapshot.size;

      // Contagem de estudantes ativos
      const studentsQuery = query(usersRef, where('role', '==', 'student'), where('status', '==', 'active'));
      const studentsSnapshot = await getDocs(studentsQuery);
      const activeStudents = studentsSnapshot.size;

      // Contagem de professores ativos
      const teachersQuery = query(usersRef, where('role', '==', 'teacher'), where('status', '==', 'active'));
      const teachersSnapshot = await getDocs(teachersQuery);
      const activeTeachers = teachersSnapshot.size;

      // Contagem total de cursos
      const coursesSnapshot = await getDocs(coursesRef);
      const totalCourses = coursesSnapshot.size;

      setStats({
        ...stats,
        totalUsers,
        totalCourses,
        activeStudents,
        activeTeachers
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const loadTeacherStats = async () => {
    if (!userData) return;

    try {
      const coursesRef = collection(db, 'courses');
      const studentsRef = collection(db, 'users');

      // Cursos do professor
      const teacherCoursesQuery = query(coursesRef, where('teacherId', '==', userData.id));
      const teacherCoursesSnapshot = await getDocs(teacherCoursesQuery);
      const totalCourses = teacherCoursesSnapshot.size;

      // Alunos matriculados nos cursos do professor
      const activeStudentsQuery = query(studentsRef, where('role', '==', 'student'), where('status', '==', 'active'));
      const activeStudentsSnapshot = await getDocs(activeStudentsQuery);
      const activeStudents = activeStudentsSnapshot.size;

      setStats({
        ...stats,
        totalCourses,
        activeStudents
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas do professor:', error);
    }
  };

  const loadStudentStats = async () => {
    if (!userData) return;

    try {
      // Implementar estatísticas do estudante
      setStats({
        ...stats,
        totalCourses: 0, // Cursos matriculados
        activeTeachers: 0 // Professores dos cursos matriculados
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas do estudante:', error);
    }
  };

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total de Usuários</h3>
        <p className="text-3xl font-bold">{stats.totalUsers}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total de Cursos</h3>
        <p className="text-3xl font-bold">{stats.totalCourses}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Estudantes Ativos</h3>
        <p className="text-3xl font-bold">{stats.activeStudents}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Professores Ativos</h3>
        <p className="text-3xl font-bold">{stats.activeTeachers}</p>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Meus Cursos</h3>
        <p className="text-3xl font-bold">{stats.totalCourses}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Alunos Ativos</h3>
        <p className="text-3xl font-bold">{stats.activeStudents}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Cursos Pendentes</h3>
        <p className="text-3xl font-bold">{stats.pendingCourses}</p>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Cursos Matriculados</h3>
        <p className="text-3xl font-bold">{stats.totalCourses}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Professores</h3>
        <p className="text-3xl font-bold">{stats.activeTeachers}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Progresso Geral</h3>
        <p className="text-3xl font-bold">0%</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      {userData?.role === 'admin' && renderAdminDashboard()}
      {userData?.role === 'teacher' && renderTeacherDashboard()}
      {userData?.role === 'student' && renderStudentDashboard()}
    </div>
  );
}
