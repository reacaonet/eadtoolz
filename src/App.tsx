<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './components/auth/Login';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Profile } from './components/profile/Profile';
import { Plans } from './components/admin/Plans';
import { Users } from './components/admin/Users';
import { Courses } from './components/admin/Courses';
import { Settings } from './components/admin/Settings';
import { CourseForm } from './components/admin/CourseForm';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          {/* Admin Routes */}
          <Route path="admin" element={<Dashboard />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/plans" element={<Plans />} />
          <Route path="admin/courses" element={<Courses />} />
          <Route path="admin/courses/new" element={<CourseForm />} />
          <Route path="admin/courses/edit/:id" element={<CourseForm />} />
          <Route path="admin/settings" element={<Settings />} />

          {/* Teacher Routes */}
          <Route path="teacher/dashboard" element={<Dashboard />} />
          <Route path="teacher/courses" element={<Dashboard />} />
          <Route path="teacher/students" element={<Dashboard />} />
          <Route path="teacher/analytics" element={<Dashboard />} />

          {/* Student Routes */}
          <Route path="student/dashboard" element={<Dashboard />} />
          <Route path="student/courses" element={<Dashboard />} />
          <Route path="student/progress" element={<Dashboard />} />
          <Route path="student/certificates" element={<Dashboard />} />

          {/* Shared Routes */}
          <Route path="profile" element={<Profile />} />
          
          <Route index element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Courses } from './pages/Courses';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { TeacherDashboard } from './pages/dashboard/TeacherDashboard';
import { StudentDashboard } from './pages/dashboard/StudentDashboard';
import { RoleRoute } from './components/auth/RoleRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rotas Protegidas */}
            <Route 
              path="/profile" 
              element={
                <RoleRoute role={['admin', 'teacher', 'student']}>
                  <Profile />
                </RoleRoute>
              } 
            />

            {/* Rotas do Dashboard */}
            <Route 
              path="/dashboard"
              element={<Navigate to="/dashboard/student" replace />} 
            />
            
            <Route 
              path="/dashboard/admin" 
              element={
                <RoleRoute role="admin">
                  <AdminDashboard />
                </RoleRoute>
              } 
            />
            
            <Route 
              path="/dashboard/teacher" 
              element={
                <RoleRoute role="teacher">
                  <TeacherDashboard />
                </RoleRoute>
              } 
            />
            
            <Route 
              path="/dashboard/student" 
              element={
                <RoleRoute role="student">
                  <StudentDashboard />
                </RoleRoute>
              } 
            />

            {/* Rota de fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)
