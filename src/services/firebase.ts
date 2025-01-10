import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import type { 
  User,
  Course,
  Module,
  Lesson,
  Progress,
  Achievement,
  UserAchievement
} from '../types/models';

// Coleções
const USERS = 'users';
const COURSES = 'courses';
const MODULES = 'modules';
const LESSONS = 'lessons';
const PROGRESS = 'progress';
const ACHIEVEMENTS = 'achievements';
const USER_ACHIEVEMENTS = 'user_achievements';

// Funções de usuário
export async function createUser(userData: Omit<User, 'createdAt'>) {
  const userRef = doc(db, USERS, userData.uid);
  await setDoc(userRef, {
    ...userData,
    createdAt: new Date(),
    points: 0
  });
}

export async function getUser(uid: string) {
  const userRef = doc(db, USERS, uid);
  const userDoc = await getDoc(userRef);
  return userDoc.exists() ? userDoc.data() as User : null;
}

// Funções de curso
export async function getCourses(lastCourse?: DocumentSnapshot, pageSize = 12) {
  const coursesRef = collection(db, COURSES);
  let q = query(
    coursesRef,
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  if (lastCourse) {
    q = query(q, startAfter(lastCourse));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Course);
}

export async function getCourse(courseId: string) {
  const courseRef = doc(db, COURSES, courseId);
  const courseDoc = await getDoc(courseRef);
  return courseDoc.exists() ? { id: courseDoc.id, ...courseDoc.data() } as Course : null;
}

// Funções de progresso
export async function updateProgress(progressData: Progress) {
  const progressRef = doc(db, PROGRESS, `${progressData.userId}_${progressData.lessonId}`);
  await setDoc(progressRef, {
    ...progressData,
    completedAt: progressData.completed ? new Date() : null
  });

  if (progressData.completed) {
    await updateUserPoints(progressData.userId, 10); // 10 pontos por lição completada
  }
}

export async function getUserProgress(userId: string, courseId: string) {
  const progressRef = collection(db, PROGRESS);
  const q = query(
    progressRef,
    where('userId', '==', userId),
    where('courseId', '==', courseId)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as Progress);
}

// Funções de gamificação
async function updateUserPoints(userId: string, pointsToAdd: number) {
  const userRef = doc(db, USERS, userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    const currentPoints = userDoc.data().points || 0;
    await updateDoc(userRef, {
      points: currentPoints + pointsToAdd
    });

    // Verificar conquistas
    await checkAchievements(userId, currentPoints + pointsToAdd);
  }
}

async function checkAchievements(userId: string, currentPoints: number) {
  const achievementsRef = collection(db, ACHIEVEMENTS);
  const q = query(
    achievementsRef,
    where('condition.type', '==', 'points_reached'),
    where('condition.value', '<=', currentPoints)
  );

  const snapshot = await getDocs(q);
  const achievements = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Achievement);

  for (const achievement of achievements) {
    // Verificar se o usuário já tem essa conquista
    const userAchievementRef = doc(db, USER_ACHIEVEMENTS, `${userId}_${achievement.id}`);
    const userAchievementDoc = await getDoc(userAchievementRef);

    if (!userAchievementDoc.exists()) {
      await setDoc(userAchievementRef, {
        userId,
        achievementId: achievement.id,
        earnedAt: new Date()
      });
    }
  }
}

// Função para upload de arquivos
export async function uploadFile(file: File, path: string) {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}
