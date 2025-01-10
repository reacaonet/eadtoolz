export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'teacher' | 'student';
  photoURL?: string;
  points?: number;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacherId: string;
  duration: number; // em minutos
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl?: string;
  content?: string;
  duration: number;
  order: number;
  type: 'video' | 'text' | 'quiz';
}

export interface Progress {
  userId: string;
  courseId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  lastPosition?: number; // para vídeos
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
  condition: {
    type: 'course_completion' | 'watch_time' | 'points_reached';
    value: number;
  };
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  earnedAt: Date;
}
