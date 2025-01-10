import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Course } from '../types/database';
import { CourseCard } from './CourseCard';

interface CourseRowProps {
  title: string;
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

export function CourseRow({ title, courses, onCourseClick }: CourseRowProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <button className="text-gray-400 hover:text-white flex items-center">
          See all <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto px-4 pb-4 scrollbar-hide">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseClick(course)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}