import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  signUp: (email: string, password: string, name: string, role: 'student' | 'teacher') => Promise<void>;
  login: (email: string, password: string) => Promise<UserData>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string, name: string, role: 'student' | 'teacher') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
      };

      // Salvar dados adicionais do usuário no Firestore
      await setDoc(doc(db, 'users', user.uid), userData);
      
      setUserData(userData);
      return userData;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  }

  async function login(email: string, password: string): Promise<UserData> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('Usuário não encontrado no Firestore');
      }

      const userData = userDoc.data() as UserData;
      console.log('User Data from Firestore:', userData); // Debug
      setUserData(userData);
      return userData;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      setUserData(null);
      setCurrentUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth State Changed:', user); // Debug
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            console.log('User Data on Auth Change:', userData); // Debug
            setUserData(userData);
          } else {
            console.error('Dados do usuário não encontrados no Firestore');
            setUserData(null);
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signUp,
    login,
    signOut: handleSignOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
