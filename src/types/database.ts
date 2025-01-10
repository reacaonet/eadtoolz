export type UserRole = 'admin' | 'instructor' | 'student';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  instructor_id: string | null;
  title: string;
  description: string | null;
  cover_image: string | null;
  duration: string | null;
  level: 'beginner' | 'intermediate' | 'advanced';
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sequence_number: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  duration: string | null;
  sequence_number: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  enrolled_at: string;
}

export interface Progress {
  id: string;
  student_id: string;
  lesson_id: string;
  completed_at: string;
}