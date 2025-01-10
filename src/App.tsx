import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
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
import { MainLayout } from './components/layout/MainLayout';

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
