import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import type { Achievement, UserAchievement } from '../types/models';
import { Trophy } from 'lucide-react';

export function Achievements() {
  const { user, userRole } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (!user) return;

      try {
        // Buscar todas as conquistas
        const achievementsRef = collection(db, 'achievements');
        const achievementsSnapshot = await getDocs(achievementsRef);
        const achievementsData = achievementsSnapshot.docs.map(
          doc => ({ id: doc.id, ...doc.data() }) as Achievement
        );
        setAchievements(achievementsData);

        // Buscar conquistas do usuário
        const userAchievementsRef = collection(db, 'user_achievements');
        const userAchievementsQuery = query(
          userAchievementsRef,
          where('userId', '==', user.uid)
        );
        const userAchievementsSnapshot = await getDocs(userAchievementsQuery);
        const userAchievementsData = userAchievementsSnapshot.docs.map(
          doc => doc.data() as UserAchievement
        );
        setUserAchievements(userAchievementsData);
      } catch (error) {
        console.error('Erro ao carregar conquistas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Suas Conquistas
        </h1>
        <p className="text-lg text-gray-600">
          Continue aprendendo e desbloqueie mais conquistas!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => {
          const userAchievement = userAchievements.find(
            ua => ua.achievementId === achievement.id
          );
          const isUnlocked = !!userAchievement;

          return (
            <div
              key={achievement.id}
              className={`
                relative bg-white rounded-xl shadow-sm p-6
                ${isUnlocked ? 'border-2 border-yellow-400' : 'opacity-75'}
              `}
            >
              {isUnlocked && (
                <div className="absolute -top-3 -right-3">
                  <div className="bg-yellow-400 rounded-full p-2">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <div className={`
                  rounded-full p-4
                  ${isUnlocked ? 'bg-yellow-100' : 'bg-gray-100'}
                `}>
                  <img
                    src={achievement.icon}
                    alt=""
                    className="h-8 w-8"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {achievement.title}
                  </h3>
                  <p className="text-yellow-600 font-medium">
                    {achievement.points} pontos
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                {achievement.description}
              </p>

              {isUnlocked && (
                <p className="text-sm text-gray-500">
                  Conquistado em {new Date(userAchievement.earnedAt).toLocaleDateString()}
                </p>
              )}

              {!isUnlocked && achievement.condition && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-500">
                    {achievement.condition.type === 'course_completion' && (
                      <>Complete {achievement.condition.value} curso(s)</>
                    )}
                    {achievement.condition.type === 'watch_time' && (
                      <>Assista {achievement.condition.value} minutos de aulas</>
                    )}
                    {achievement.condition.type === 'points_reached' && (
                      <>Alcance {achievement.condition.value} pontos</>
                    )}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
