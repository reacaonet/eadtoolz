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
