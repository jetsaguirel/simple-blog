import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 shadow-xl max-w-md">
        <div className="card-body text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="card-title justify-center">Oops! Something went wrong</h2>
          <p className="text-base-content/70 mb-4">
            {message || 'An unexpected error occurred. Please try again.'}
          </p>
          {onRetry && (
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={onRetry}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
