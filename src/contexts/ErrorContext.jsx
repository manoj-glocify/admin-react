import React, { createContext, useState, useContext, useEffect } from 'react';
import { errorEventEmitter } from '../services/api';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const clearError = () => setError(null);

  useEffect(() => {
    const unsubscribe = errorEventEmitter.subscribe(setError);
    return () => unsubscribe();
  }, []);

  return (
    <ErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}; 