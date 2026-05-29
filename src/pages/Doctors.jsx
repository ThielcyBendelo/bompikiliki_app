import React, { useState } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Avatar, Button, 
  Modal, TextField, Alert, Container, IconButton, Chip, Stack 
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaTimes, FaUserMd } from 'react-icons/fa';
// Importation des assets
import { doctor1, doctor2, doctor3, doctor4, doctor5, doctor6, doctor7 } from '../assets';

const doctors = [
  { name: 'Dr. Gaetan Rubi', specialty: 'Gynécologue', img: doctor1, bio: 'Expert en santé reproductive et suivi de grossesse.' },
  { name: 'Dr. Grady ', specialty: 'Cardiologue', img: doctor2, bio: 'Spécialiste des pathologies cardiaques et vasculaires.' },
  { name: 'Dr. Mylor', specialty: 'Dermatologue', img: doctor3, bio: 'Expert en soins de la peau et traitements laser.' },
  { name: 'Dr. Sarah K.', specialty: 'Pédiatre', img: doctor4, bio: 'Accompagnement et soins pour le bien-être des enfants.' },
  { name: 'Dr. David L.', specialty: 'Ophtalmologue', img: doctor5, bio: 'Spécialiste de la vision et chirurgie oculaire.' },
  { name: 'Dr. Amina R.', specialty: 'Dentiste', img: doctor6, bio: 'Soins dentaires complets et esthétique du sourire.' },
  { name: 'Dr. Marc T.', specialty: 'Neurologue', img: doctor7, bio: 'Expert en troubles du système nerveux.' },
];

// Animation des variantes pour la grille
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Doctors() {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleOpen = (doc) => {
    setSelectedDoctor(doc);
    setOpen(true);
    setMessage('');
    setSent(false);
  };

  const handleClose = () => setOpen(false);

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setTimeout(() => setOpen(false), 2000);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fbff', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        {/* TITRE ANIMÉ */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h3" fontWeight="900" color="primary" textAlign="center" gutterBottom>
            Nos Praticiens Experts
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6, fontWeight: 300 }}>
            Une équipe pluridisciplinaire dévouée à votre santé 24h/24 au Centre Médical BOMPIKILIKI.
          </Typography>
        </motion.div>

{/* GRILLE DES MÉDECINS */}
<Grid 
  component={motion.div} 
  variants={containerVariants} 
  initial="hidden" 
  animate="visible" 
  container 
  spacing={4}
  sx={{ py: 4 }}
>
  {doctors.map((doc, i) => (
    <Grid item xs={12} sm={6} md={4} key={i}>
      <motion.div 
        variants={itemVariants} 
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card sx={{ 
          borderRadius: 6, 
          overflow: 'hidden', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.04)', 
          border: '1px solid #eef2f6', 
          textAlign: 'center', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'relative',
          background: '#ffffff',
          '&:hover': {
            boxShadow: '0 20px 50px rgba(25, 118, 210, 0.12)',
            borderColor: 'rgba(25, 118, 210, 0.2)',
            '& .doctor-avatar': {
              transform: 'scale(1.08)',
              borderColor: '#1976d2'
            },
            '& .doctor-banner': {
              background: 'linear-gradient(45deg, #1976d2, #1565c0)'
            }
          }
        }}>
          {/* Bannière arrière-plan fluide */}
          <Box 
            className="doctor-banner"
            sx={{ 
              background: 'linear-gradient(45deg, #2196f3, #1976d2)', 
              height: 100, 
              mb: -6,
              transition: '0.4s ease'
            }} 
          />
          
          <CardContent sx={{ pt: 0, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', px: 3, pb: 3 }}>
            
            {/* Photo du médecin agrandie et animée */}
            <Avatar 
              src={doc.img} 
              className="doctor-avatar"
              sx={{ 
                width: 180, 
                height: 180, 
                mx: 'auto', 
                mb: 2, 
                border: '5px solid white', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)', 
                bgcolor: '#fff',
                transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.4s ease'
              }} 
            >
              <FaUserMd size={55} color="#1976d2" />
            </Avatar>

            {/* Badge Spécialité */}
            <Chip 
              label={doc.specialty} 
              color="primary" 
              size="small" 
              sx={{ 
                mb: 2, 
                fontWeight: '700', 
                letterSpacing: '0.5px',
                px: 1.5,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                bgcolor: 'rgba(25, 118, 210, 0.08)',
                color: '#1976d2',
                border: 'none'
              }} 
            />

            {/* Nom du médecin */}
            <Typography variant="h6" fontWeight="800" sx={{ color: '#1a237e', mb: 1, lineHeight: 1.3 }}>
              {doc.name || 'Médecin Consultant'}
            </Typography>

            {/* Biographie / Description */}
            <Typography variant="body2" color="text.secondary" sx={{ px: 1, mb: 4, flexGrow: 1, lineHeight: 1.6, fontSize: '0.875rem' }}>
              {doc.bio || 'Consultant spécialisé disponible pour vos soins au centre.'}
            </Typography>

            {/* Bouton de contact avec micro-animation */}
            <Button 
              component={motion.button}
              whileTap={{ scale: 0.96 }}
              variant="contained" 
              fullWidth 
              startIcon={<FaEnvelope />} 
              onClick={() => handleOpen(doc)} 
              sx={{ 
                borderRadius: '16px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                py: 1.5,
                fontSize: '0.95rem',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                transition: '0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0, #0d47a1)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)'
                }
              }} 
            >
              Contacter le médecin
            </Button>
            
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>


        {/* MODALE DE CONTACT PROFESSIONNELLE */}
        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <AnimatePresence>
            {open && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.9, opacity: 0 }}
                  style={{ width: '90%', maxWidth: 450 }}
                >
                  <Paper sx={{ p: 4, borderRadius: 4, position: 'relative', boxShadow: 24 }}>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                      <FaTimes />
                    </IconButton>
                    
                    <Stack alignItems="center" spacing={2} sx={{ mb: 3 }}>
                      <Avatar src={selectedDoctor?.img} sx={{ width: 70, height: 70, boxShadow: 2 }} />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold">Contacter le {selectedDoctor?.name}</Typography>
                        <Typography variant="caption" color="primary">{selectedDoctor?.specialty}</Typography>
                      </Box>
                    </Stack>

                    <TextField
                      label="Écrivez votre message ici..."
                      multiline
                      rows={4}
                      fullWidth
                      variant="filled"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      sx={{ mb: 3 }}
                    />

                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={handleSend} 
                      disabled={sent || !message.trim()} 
                      fullWidth
                      sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                    >
                      {sent ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>

                    {sent && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Alert severity="success" sx={{ mt: 2, borderRadius: 2 }}>
                          Votre demande a été transmise avec succès !
                        </Alert>
                      </motion.div>
                    )}
                  </Paper>
                </motion.div>
              </Box>
            )}
          </AnimatePresence>
        </Modal>
      </Container>
    </Box>
  );
}

// Import manquant pour la modale
import { Paper } from '@mui/material';
