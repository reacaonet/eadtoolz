import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type UserRole = 'admin' | 'teacher' | 'student';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student'); // default role
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          setUserRole(userData?.role || 'student');
        } catch (error) {
          console.error('Erro ao carregar role do usuário:', error);
          setUserRole('student'); // fallback para student em caso de erro
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    userRole,
    loading,
    isAdmin: userRole === 'admin',
    isTeacher: userRole === 'teacher',
    isStudent: userRole === 'student'
  };
}