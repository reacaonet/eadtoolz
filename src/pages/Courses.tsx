import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseRow } from '../components/CourseRow';
import { FeaturedCourse } from '../components/FeaturedCourse';
import { Course } from '../types/database';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Code, Database, Globe, Server, Smartphone } from 'lucide-react';

const CATEGORIES = [
  { id: 'web', name: 'Desenvolvimento Web', icon: Globe },
  { id: 'mobile', name: 'Desenvolvimento Mobile', icon: Smartphone },
  { id: 'backend', name: 'Backend', icon: Server },
  { id: 'frontend', name: 'Frontend', icon: Code },
  { id: 'database', name: 'Banco de Dados', icon: Database },
  { id: 'all', name: 'Todos os Cursos', icon: BookOpen },
];

// Sample data - In production, this would come from your database
const FEATURED_COURSE: Course = {
  id: '1',
  title: 'Web Development Masterclass',
  description: 'Learn modern web development with React, Node.js, and TypeScript. Build real-world projects and master the latest web technologies.',
  cover_image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=2070&h=1080',
  duration: '40 hours',
  level: 'intermediate',
  instructor_id: '1',
  is_published: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const COURSES: { [key: string]: Course[] } = {
  'Trending Now': [
    {
      id: '2',
      title: 'React Advanced Patterns',
      description: 'Master advanced React patterns and techniques',
      cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070&h=1080',
      duration: '20 hours',
      level: 'advanced',
      instructor_id: '2',
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Node.js Microservices',
      description: 'Build scalable microservices with Node.js',
      cover_image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=2070&h=1080',
      duration: '30 hours',
      level: 'advanced',
      instructor_id: '3',
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
  ],
  'Most Popular': [
    {
      id: '4',
      title: 'TypeScript Fundamentals',
      description: 'Learn TypeScript from scratch',
      cover_image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=2070&h=1080',
      duration: '15 hours',
      level: 'beginner',
      instructor_id: '4',
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
  ],
};

export function Courses() {
  const { user, userRole } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src={FEATURED_COURSE.cover_image}
            className="w-full h-full object-cover"
            alt="Featured course"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {FEATURED_COURSE.title}
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                {FEATURED_COURSE.description}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate(`/course/${FEATURED_COURSE.id}`)}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100"
                >
                  Começar Agora
                </button>
                <button
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10"
                >
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-4">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full border ${
                      selectedCategory === category.id
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-600 text-gray-300 hover:border-white hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="whitespace-nowrap">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <section className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {Object.entries(COURSES).map(([sectionTitle, courses]) => (
              <div key={sectionTitle}>
                <h2 className="text-2xl font-bold text-white mb-6">{sectionTitle}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
                      onClick={() => navigate(`/course/${course.id}`)}
                    >
                      <img
                        src={course.cover_image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{course.duration}</span>
                          <span className="text-sm text-gray-400 capitalize">{course.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}