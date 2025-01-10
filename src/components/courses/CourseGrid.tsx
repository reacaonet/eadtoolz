import React from 'react';
import { CourseCard } from './CourseCard';
import type { Course } from '../../types/models';

interface CourseGridProps {
  courses: Course[];
  userProgress?: Record<string, number>;
  title?: string;
}

export const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  userProgress,
  title
}) => {
  return (
    <div className="space-y-4">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={userProgress?.[course.id]}
          />
        ))}
      </div>
    </div>
  );
};
