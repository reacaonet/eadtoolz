import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBook, FiPackage, FiSettings } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/admin', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/plans', icon: FiPackage, label: 'Planos' },
    { path: '/admin/users', icon: FiUsers, label: 'Usuários' },
    { path: '/admin/courses', icon: FiBook, label: 'Cursos' },
    { path: '/admin/settings', icon: FiSettings, label: 'Configurações' }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <span className="text-xl font-semibold">EADToolz</span>
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
