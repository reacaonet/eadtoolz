import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserData } from '../types/user';

export function useUser(firebaseUser: User | null) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!firebaseUser) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          // Se o documento não existe, cria um novo usuário com role padrão 'student'
          const newUser: UserData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            role: 'student',
            photoURL: firebaseUser.photoURL || undefined,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setUserData(newUser);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch user data'));
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [firebaseUser]);

  return { userData, loading, error };
}
