import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../shared/Card';
import type { Course } from '../../types/models';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, progress }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/course/${course.id}`)}
      className="group relative w-full aspect-video"
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-colors">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-bold mb-1">{course.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{course.description}</p>
          
          {progress !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-300 text-xs mt-1">{progress}% concluído</p>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-white text-xs bg-red-600 px-2 py-1 rounded">
              {course.level}
            </span>
            <span className="text-white text-xs">
              {Math.floor(course.duration / 60)}h {course.duration % 60}min
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
