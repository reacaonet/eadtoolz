import React from 'react';
import { Play, Info } from 'lucide-react';
import { Course } from '../types/database';

interface FeaturedCourseProps {
  course: Course;
  onPlay: () => void;
  onMoreInfo: () => void;
}

export function FeaturedCourse({ course, onPlay, onMoreInfo }: FeaturedCourseProps) {
  return (
    <div className="relative h-[70vh] mb-8">
      <img
        src={course.cover_image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
        <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-4">{course.title}</h1>
          <p className="text-lg text-gray-200 mb-6">{course.description}</p>
          <div className="flex space-x-4">
            <button
              onClick={onPlay}
              className="flex items-center px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Learning
            </button>
            <button
              onClick={onMoreInfo}
              className="flex items-center px-6 py-3 bg-gray-600/80 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}