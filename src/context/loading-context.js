"use client"

import React, { createContext, useState, useContext } from 'react';


// Tạo Context
const LoadingContext = createContext(null);

// Provider cho Context
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
 
    </LoadingContext.Provider>
  );
};

// Hook để sử dụng Context
export const useLoading = () => useContext(LoadingContext);
