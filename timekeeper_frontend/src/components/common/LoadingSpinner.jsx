import React from 'react';

const LoadingSpinner = ({ size = 'medium', pesan = 'Memuat...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div 
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-500 ${sizeClasses[size]}`}
        role="status"
      />
      {pesan && (
        <p className="mt-2 text-gray-600">{pesan}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;