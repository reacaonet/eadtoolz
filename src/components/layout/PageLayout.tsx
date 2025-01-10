import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
} 