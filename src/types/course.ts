export interface Course {
<<<<<<< HEAD
  id?: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  instructorId: string;
  instructorName: string;
  thumbnail: string;
  modules: CourseModule[];
  createdAt?: Date;
  updatedAt?: Date;
  rating?: number;
  totalStudents?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // em minutos
  type: 'video' | 'quiz' | 'assignment';
  content: string; // URL do vídeo ou conteúdo da lição
  order: number;
  isPreview?: boolean;
}
=======
  id: string;
  title: string;
  description: string;
  coverImage: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
>>>>>>> 36b2f35 (feat: implementação do perfil de usuário com upload de foto)
