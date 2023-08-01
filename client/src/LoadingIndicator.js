import React from 'react';

const LoadingIndicator = () => {
  return (
    <div>
    <div className="spinner-border text-primary" role="status">
    </div>
    <span>Loading... Please wait up to 20 seconds if there has not been activity in the past hour.</span>
    </div>
  );
}

export default LoadingIndicator;