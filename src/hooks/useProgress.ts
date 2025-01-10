import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthContext } from '../context/AuthContext';
import type { Progress } from '../types/models';

export function useProgress(courseId?: string) {
  const { user } = useAuthContext();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setProgress([]);
        setLoading(false);
        return;
      }

      try {
        const progressRef = collection(db, 'progress');
        let progressQuery = query(
          progressRef,
          where('userId', '==', user.uid)
        );

        if (courseId) {
          progressQuery = query(
            progressRef,
            where('userId', '==', user.uid),
            where('courseId', '==', courseId)
          );
        }

        const snapshot = await getDocs(progressQuery);
        setProgress(snapshot.docs.map(doc => doc.data() as Progress));
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user, courseId]);

  const calculateCourseProgress = (targetCourseId: string) => {
    const courseProgress = progress.filter(p => p.courseId === targetCourseId);
    if (!courseProgress.length) return 0;

    const completedLessons = courseProgress.filter(p => p.completed).length;
    const totalLessons = courseProgress.length;

    return Math.round((completedLessons / totalLessons) * 100);
  };

  return {
    progress,
    loading,
    calculateCourseProgress
  };
}
