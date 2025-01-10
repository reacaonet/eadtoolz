import { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type UserRole = 'admin' | 'teacher' | 'student';

interface AuthContextType {
  user: User | null;
  userRole: UserRole;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: 'student',
  loading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      
      if (user) {
        try {
          // Referência ao documento do usuário
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (!userDocSnap.exists()) {
            // Se o documento não existir, criar com role padrão
            await setDoc(userDocRef, {
              email: user.email,
              role: 'student',
              createdAt: new Date()
            });
            setUserRole('student');
          } else {
            // Se existir, usar o role existente
            const userData = userDocSnap.data();
            setUserRole(userData?.role || 'student');
          }
        } catch (error) {
          console.error('Erro ao carregar role do usuário:', error);
          setUserRole('student');
        }
      } else {
        setUserRole('student');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export { AuthContext };