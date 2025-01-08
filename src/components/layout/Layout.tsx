import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../admin/Navbar';
import { Sidebar } from '../admin/Sidebar';
import { TeacherSidebar } from '../teacher/TeacherSidebar';
import { StudentSidebar } from '../student/StudentSidebar';
import { FiMenu, FiX, FiHome, FiUser, FiBook, FiUsers, FiAward, FiBarChart2, FiPackage, FiSettings } from 'react-icons/fi';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export function Layout() {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Redirecionar com base no papel do usuário
    if (userData) {
      const path = location.pathname;
      console.log('Layout Effect - Current User:', currentUser); // Debug
      console.log('Layout Effect - User Data:', userData); // Debug
      console.log('Layout Effect - Current Path:', path); // Debug

      // Se estiver na página de perfil, não redirecionar
      if (path === '/profile') {
        return;
      }

      // Verificar se o usuário está tentando acessar uma rota permitida
      const isAdminRoute = path.startsWith('/admin');
      const isTeacherRoute = path.startsWith('/teacher');
      const isStudentRoute = path.startsWith('/student');

      console.log('Checking role:', userData.role); // Debug

      switch (userData.role) {
        case 'admin':
          if (path === '/' || (!isAdminRoute && path !== '/profile')) {
            console.log('Redirecting admin to /admin'); // Debug
            navigate('/admin');
          }
          break;
        case 'teacher':
          if (path === '/' || (!isTeacherRoute && path !== '/profile')) {
            console.log('Redirecting teacher to /teacher/dashboard'); // Debug
            navigate('/teacher/dashboard');
          }
          break;
        case 'student':
          if (path === '/' || (!isStudentRoute && path !== '/profile')) {
            console.log('Redirecting student to /student/dashboard'); // Debug
            navigate('/student/dashboard');
          }
          break;
        default:
          console.log('Unknown role, redirecting to login'); // Debug
          navigate('/login');
      }
    }
  }, [currentUser, userData, navigate, location]);

  if (!currentUser || !userData) {
    console.log('Layout render - No user data, returning null'); // Debug
    return null;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getMenuItems = (role?: string): MenuItem[] => {
    if (!role) return [];

    const roleSpecificItems: Record<string, MenuItem[]> = {
      student: [
        { name: 'Dashboard', path: '/student/dashboard', icon: FiHome },
        { name: 'Perfil', path: '/profile', icon: FiUser },
        { name: 'Meus Cursos', path: '/my-courses', icon: FiBook },
        { name: 'Certificados', path: '/certificates', icon: FiAward },
      ],
      teacher: [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: FiHome },
        { name: 'Perfil', path: '/profile', icon: FiUser },
        { name: 'Meus Cursos', path: '/teacher/courses', icon: FiBook },
        { name: 'Alunos', path: '/teacher/students', icon: FiUsers },
        { name: 'Análises', path: '/teacher/analytics', icon: FiBarChart2 },
      ],
      admin: [
        { name: 'Dashboard', path: '/admin', icon: FiHome },
        { name: 'Planos', path: '/admin/plans', icon: FiPackage },
        { name: 'Usuários', path: '/admin/users', icon: FiUsers },
        { name: 'Cursos', path: '/admin/courses', icon: FiBook },
        { name: 'Configurações', path: '/admin/settings', icon: FiSettings },
      ],
    };

    return roleSpecificItems[role] || [];
  };

  const renderSidebar = () => {
    switch (userData.role) {
      case 'admin':
        return <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} menuItems={getMenuItems(userData.role)} />;
      case 'teacher':
        return <TeacherSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />;
      case 'student':
        return <StudentSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onMenuClick={toggleSidebar} />
      {renderSidebar()}
      
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
