import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  MenuItem, 
  Button, 
  Grid, 
  Paper, 
  Stack,
  Alert,
  Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaCalendarPlus, FaUser, FaPhone, FaEnvelope, FaNotesMedical } from 'react-icons/fa';

export default function AppointmentForm() {
  // Liste des spécialités disponibles au centre
  const specialties = [
    { value: 'general', label: 'Médecine Générale' },
    { value: 'pediatrie', label: 'Pédiatrie' },
    { value: 'gynecologie', label: 'Gynécologie & Obstétrique' },
    { value: 'cardiologie', label: 'Cardiologie' },
    { value: 'dentaire', label: 'Chirurgie Dentaire' },
  ];

  // État initial du formulaire
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    date: '',
    time: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi à l'API ou au backend ici
    console.log('Rendez-vous soumis :', formData);
    setSubmitted(true);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 6,
            borderTop: '6px solid #1976d2',
            boxShadow: '0 15px 40px rgba(0,0,0,0.06)'
          }}
        >
          {/* En-tête textuel */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box 
              sx={{ 
                display: 'inline-flex', 
                p: 2, 
                bgcolor: 'rgba(25, 118, 210, 0.08)', 
                color: '#1976d2', 
                borderRadius: '50%',
                mb: 2 
              }}
            >
              <FaCalendarPlus size={32} />
            </Box>
            <Typography variant="h4" fontWeight="800" sx={{ color: '#0a192f', mb: 1 }}>
              Prendre un Rendez-vous
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Remplissez ce formulaire pour planifier votre consultation au centre Bompikiliki.
            </Typography>
          </Box>

          {submitted && (
            <Alert severity="success" sx={{ mb: 4, borderRadius: 3, fontWeight: 500 }}>
              Votre demande de rendez-vous a bien été enregistrée ! Un agent va vous contacter par téléphone pour confirmation.
            </Alert>
          )}

          {/* Début du Formulaire */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              
              {/* Nom complet */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <FaUser color="#1976d2" size={14} />
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Nom complet *</Typography>
                </Stack>
                <TextField
                  required
                  fullWidth
                  name="name"
                  placeholder="Ex: Jean Mukendi"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>

              {/* Téléphone */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <FaPhone color="#1976d2" size={14} />
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Numéro de téléphone *</Typography>
                </Stack>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  placeholder="Ex: +243 812 345 678"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <FaEnvelope color="#1976d2" size={14} />
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Adresse Email (Optionnel)</Typography>
                </Stack>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="patient@exemple.com"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>

              {/* Choix de la Spécialité */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <FaNotesMedical color="#1976d2" size={14} />
                  <Typography variant="body2" fontWeight="600" color="text.secondary">Service / Spécialité *</Typography>
                </Stack>
                <TextField
                  select
                  required
                  fullWidth
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                >
                  {specialties.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Date souhaitée */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600" color="text.secondary" sx={{ mb: 1 }}>
                  Date souhaitée *
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>

              {/* Heure souhaitée */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight="600" color="text.secondary" sx={{ mb: 1 }}>
                  Heure souhaitée *
                </Typography>
                <TextField
                  required
                  fullWidth
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>

              {/* Motif de consultation */}
              <Grid item xs={12}>
                <Typography variant="body2" fontWeight="600" color="text.secondary" sx={{ mb: 1 }}>
                  Motif de consultation ou symptômes (Optionnel)
                </Typography>
                <TextField
                  fullWidth
                  name="notes"
                  multiline
                  rows={3}
                  placeholder="Décrivez brièvement votre situation médicale ou le motif de votre visite..."
                  value={formData.notes}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                />
              </Grid>

              {/* Bouton de Validation Soumission */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    borderRadius: '16px', 
                    textTransform: 'none', 
                    fontWeight: 'bold', 
                    py: 1.8,
                    fontSize: '1.05rem',
                    background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                    boxShadow: '0 4px 15px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #0d47a1)',
                    }
                  }}
                >
                  Confirmer la demande de rendez-vous
                </Button>
              </Grid>

            </Grid>
          </form>
        </Paper>
      </motion.div>

      {/* Notification Toast de réussite en bas de l'écran */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', borderRadius: 2 }}>
          Demande transmise avec succès !
        </Alert>
      </Snackbar>
    </Container>
  );
}
