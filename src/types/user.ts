<<<<<<< HEAD
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date | null;
  updatedAt: Date | null;
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  enrolledCourses: string[]; // IDs dos cursos matriculados
  progress: {
    [courseId: string]: {
      completed: boolean;
      lastAccessed: Date;
      progressPercentage: number;
      completedLessons: string[]; // IDs das lições completadas
    };
  };
}

export interface Teacher extends User {
  role: 'teacher';
  courses: string[]; // IDs dos cursos que leciona
  bio?: string;
  specialties?: string[];
  rating?: number;
  totalStudents?: number;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
=======
export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)
}
