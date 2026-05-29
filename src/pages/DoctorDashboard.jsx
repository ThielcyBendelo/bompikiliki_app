import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAppointments } from '../api';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const appointments = getAppointments().filter(a => a.doctor === user.name);

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, maxWidth: { xs: '100%', sm: 500, md: 600 }, mx: 'auto' }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Dashboard Médecin
        </Typography>
        <Typography variant="subtitle1" mb={2}>Bienvenue Dr. {user.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" mb={1}>Rendez-vous à venir :</Typography>
        <List>
          {appointments.length === 0 ? (
            <ListItem><ListItemText primary="Aucun rendez-vous pour l'instant." /></ListItem>
          ) : appointments.map(a => (
            <ListItem key={a.id}>
              <ListItemText
                primary={`${a.date} à ${a.time} - Patient ID: ${a.userId}`}
                secondary={`Statut : ${a.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
