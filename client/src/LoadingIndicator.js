import React from 'react';

const LoadingIndicator = () => {
  return (
    <div>
    <div className="spinner-border text-primary" role="status">
    </div>
    <span>Loading... Please wait up to 10 seconds.</span>
    </div>
  );
}

export default LoadingIndicator;