import { db } from '../config/firebase';
import { collection, doc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { User, Student, Teacher, Admin } from '../types/user';

class UserService {
  private usersCollection = collection(db, 'users');

  async getCurrentUser(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      if (!userDoc.exists()) return null;
      
      const userData = userDoc.data();
      return {
        id: userDoc.id,
        ...userData,
        createdAt: userData.createdAt.toDate(),
        updatedAt: userData.updatedAt.toDate(),
      } as User;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, data: Partial<User>): Promise<boolean> {
    try {
      const userRef = doc(this.usersCollection, userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date(),
      });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }

  async getStudentDetails(userId: string): Promise<Student | null> {
    try {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      if (!userDoc.exists() || userDoc.data().role !== 'student') return null;
      
      return {
        id: userDoc.id,
        ...userDoc.data(),
        createdAt: userDoc.data().createdAt.toDate(),
        updatedAt: userDoc.data().updatedAt.toDate(),
      } as Student;
    } catch (error) {
      console.error('Error getting student details:', error);
      return null;
    }
  }

  async getTeacherDetails(userId: string): Promise<Teacher | null> {
    try {
      const userDoc = await getDoc(doc(this.usersCollection, userId));
      if (!userDoc.exists() || userDoc.data().role !== 'teacher') return null;
      
      return {
        id: userDoc.id,
        ...userDoc.data(),
        createdAt: userDoc.data().createdAt.toDate(),
        updatedAt: userDoc.data().updatedAt.toDate(),
      } as Teacher;
    } catch (error) {
      console.error('Error getting teacher details:', error);
      return null;
    }
  }

  async updateStudentProgress(
    studentId: string,
    courseId: string,
    lessonId: string,
    progressPercentage: number
  ): Promise<boolean> {
    try {
      const userRef = doc(this.usersCollection, studentId);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists() || userDoc.data().role !== 'student') return false;

      const currentProgress = userDoc.data().progress || {};
      const courseProgress = currentProgress[courseId] || {
        completed: false,
        lastAccessed: new Date(),
        progressPercentage: 0,
        completedLessons: [],
      };

      // Atualiza o progresso do curso
      courseProgress.lastAccessed = new Date();
      courseProgress.progressPercentage = progressPercentage;
      if (!courseProgress.completedLessons.includes(lessonId)) {
        courseProgress.completedLessons.push(lessonId);
      }

      await updateDoc(userRef, {
        [`progress.${courseId}`]: courseProgress,
        updatedAt: new Date(),
      });

      return true;
    } catch (error) {
      console.error('Error updating student progress:', error);
      return false;
    }
  }

  async getTeacherStudents(teacherId: string): Promise<Student[]> {
    try {
      const teacher = await this.getTeacherDetails(teacherId);
      if (!teacher) return [];

      const studentsQuery = query(
        this.usersCollection,
        where('role', '==', 'student'),
        where('enrolledCourses', 'array-contains-any', teacher.courses)
      );

      const studentsSnapshot = await getDocs(studentsQuery);
      return studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as Student[];
    } catch (error) {
      console.error('Error getting teacher students:', error);
      return [];
    }
  }
}

export const userService = new UserService();
