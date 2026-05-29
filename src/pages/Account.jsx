import React, { useState, useEffect } from 'react';
import { users } from '../mockData';
import { getAppointmentsByUser, getAppointments } from '../api';
import { Paper, Typography, Box, List, ListItem, ListItemText, Divider, TextField, Button, Alert } from '@mui/material';
import { useSnackbar } from '../hooks/useSnackbar';

export default function Account() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const found = users.find(u => u.email === email);
    if (found) {
      setUser(found);
      setError('');
    } else {
      setError('Utilisateur non trouvé.');
    }
  };

  const [appointments, setAppointments] = useState(getAppointmentsByUser(user?.id || 0));

  const { showSnackbar } = useSnackbar();
  const handleCancel = (id) => {
    const all = getAppointments();
    const updated = all.map(a => a.id === id ? { ...a, status: 'annulé' } : a);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated.filter(a => a.userId === user.id));
    showSnackbar('Rendez-vous annulé.', 'info');
  };

  useEffect(() => {
    if (user) {
      // Utilise une fonction pour éviter le warning React
      const updateAppointments = () => {
        setAppointments(getAppointmentsByUser(user.id));
      };
      updateAppointments();
    }
  }, [user]);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, maxWidth: { xs: '100%', sm: 400, md: 500 }, mx: 'auto' }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Mon compte
        </Typography>
        {!user ? (
          <>
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
              Voir mes rendez-vous
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>
              Bonjour, {user.name} ({user.role})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" mb={1}>Mes rendez-vous :</Typography>
            <List>
              {appointments.length === 0 ? (
                <ListItem><ListItemText primary="Aucun rendez-vous." /></ListItem>
              ) : appointments.map(a => (
                <ListItem key={a.id} secondaryAction={a.status !== 'annulé' ? (
                  <Button color="error" onClick={() => handleCancel(a.id)}>
                    Annuler
                  </Button>
                ) : null}>
                  <ListItemText
                    primary={`${a.doctor} - ${a.date} à ${a.time}`}
                    secondary={`Statut : ${a.status}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Box>
  );
}
