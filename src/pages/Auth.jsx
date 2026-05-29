import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Paper, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../hooks/useSnackbar';

export default function Auth() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = login(form.email, form.password);
    if (!ok) {
      setError('Email ou mot de passe incorrect.');
      showSnackbar('Email ou mot de passe incorrect.', 'error');
    } else {
      setError('');
      showSnackbar('Connexion réussie !', 'success');
      setTimeout(() => navigate('/'), 800);
    }
  };

  const handleLogout = () => {
    logout();
    showSnackbar('Déconnexion réussie.', 'info');
    setTimeout(() => navigate('/'), 500);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, maxWidth: 400, mx: 'auto' }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Connexion
        </Typography>
        {!user ? (
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mot de passe"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Se connecter
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </form>
        ) : (
          <>
            <Alert severity="success" sx={{ mb: 2 }}>Connecté en tant que {user.name} ({user.role})</Alert>
            <Button variant="outlined" color="secondary" onClick={handleLogout} fullWidth>
              Se déconnecter
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}
