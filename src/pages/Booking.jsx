import React, { useState } from 'react';
import { doctors } from '../mockData';
import { addAppointment } from '../api';
import { useSnackbar } from '../hooks/useSnackbar';
import { Paper, Typography, Box, TextField, MenuItem, Button, Alert } from '@mui/material';

export default function Booking() {
  const [form, setForm] = useState({ name: '', doctor: '', date: '', time: '' });
  const { showSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.doctor || !form.date || !form.time) {
      setError('Tous les champs sont obligatoires.');
      setSuccess(false);
      showSnackbar('Tous les champs sont obligatoires.', 'error');
      return;
    }
    // Simule un userId (ici 1 pour démo, à relier à l'utilisateur connecté)
    const appointment = {
      userId: 1,
      doctor: form.doctor,
      date: form.date,
      time: form.time,
      status: 'confirmé',
    };
    addAppointment(appointment);
    setSuccess(true);
    setError('');
    showSnackbar('Rendez-vous réservé avec succès !', 'success');
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, maxWidth: { xs: '100%', sm: 400, md: 500 }, mx: 'auto' }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          Réservation de rendez-vous
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Votre nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Médecin"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {doctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.name}>{doc.name} ({doc.specialty})</MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Date"
            name="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="time"
            label="Heure"
            name="time"
            value={form.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Réserver
          </Button>
        </form>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Rendez-vous réservé avec succès !</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 3 }} onClick={() => window.open('https://meet.jit.si/MedRendezVousDemo', '_blank')}>
          Lancer la téléconsultation vidéo (démo)
        </Button>
      </Paper>
    </Box>
  );
}
