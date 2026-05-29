import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotConnected() {
  const navigate = useNavigate();
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" color="error" fontWeight="bold" mb={2}>Accès refusé</Typography>
      <Typography variant="body1" mb={3}>Vous devez être connecté pour accéder à cette page.</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/auth')}>Se connecter</Button>
    </Box>
  );
}
