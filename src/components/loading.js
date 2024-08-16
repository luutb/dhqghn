import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-32">
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
