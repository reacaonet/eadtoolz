import { FiHome, FiBook, FiUsers, FiBarChart2, FiUser } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

interface TeacherSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function TeacherSidebar({ isOpen, onToggle }: TeacherSidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: FiHome },
    { name: 'Meus Cursos', path: '/teacher/courses', icon: FiBook },
    { name: 'Alunos', path: '/teacher/students', icon: FiUsers },
    { name: 'Análises', path: '/teacher/analytics', icon: FiBarChart2 },
    { name: 'Perfil', path: '/profile', icon: FiUser },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen pt-16 transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 w-64`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
