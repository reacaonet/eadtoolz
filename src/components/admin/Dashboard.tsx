import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FiUsers, FiBookOpen, FiPackage } from 'react-icons/fi';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalPlans: number;
}

export function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalPlans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      const [usersSnap, coursesSnap, plansSnap] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'courses')),
        getDocs(collection(db, 'plans')),
      ]);

      setStats({
        totalStudents: usersSnap.size,
        totalCourses: coursesSnap.size,
        totalPlans: plansSnap.size,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const cards = [
    {
      title: 'Total de Alunos',
      value: loading ? '-' : stats.totalStudents,
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      title: 'Total de Cursos',
      value: loading ? '-' : stats.totalCourses,
      icon: FiBookOpen,
      color: 'bg-green-500',
    },
    {
      title: 'Total de Planos',
      value: loading ? '-' : stats.totalPlans,
      icon: FiPackage,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-full`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`pt-16 ${isSidebarCollapsed ? 'pl-20' : 'pl-64'} transition-all duration-300`}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
