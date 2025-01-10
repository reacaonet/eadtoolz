import React from 'react';
import { Clock, BookOpen } from 'lucide-react';
import { Course } from '../types/database';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <div
      className="flex-none w-72 group cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <img
          src={course.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
            <div className="flex items-center space-x-4 text-sm">
              {course.duration && (
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </span>
              )}
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {course.level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}