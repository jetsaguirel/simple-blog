import React from 'react';

const Loading = ({ message = 'Loading...', size = 'lg' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className={`loading loading-spinner loading-${size} mb-4`}></div>
        <p className="text-base-content/70">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
