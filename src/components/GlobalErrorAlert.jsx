import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useError } from '../contexts/ErrorContext';

const GlobalErrorAlert = () => {
  const { error, clearError } = useError();

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={clearError} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      {error && <Alert onClose={clearError} severity="error">{error}</Alert>}
    </Snackbar>
  );
};

export default GlobalErrorAlert; 