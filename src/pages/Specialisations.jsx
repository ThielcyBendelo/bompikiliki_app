import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, Container, Button, Stack, 
  IconButton, Modal, TextField, Alert, CircularProgress, Divider // <-- AJOUTÉ ICI
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { 
  FaStethoscope, FaSyringe, FaBaby, FaChevronLeft, 
  FaChevronRight, FaArrowRight, FaTimes, FaTooth, FaEye, FaMicroscope 
} from 'react-icons/fa';


// Vos imports d'images
import imgGeneral from '../assets/consultation.jpg';
import imgChirurgie from '../assets/chirurgie.jpg';
import imgGyneco from '../assets/gyneco.jpg';
import imgPediatrie from '../assets/pediatrie.jpg';
import imgCPN from '../assets/cpn.jpg';
import imgPlanning from '../assets/planningfa.jpg';
import imgOphtalmo from '../assets/ophat.png';
import imgDentiste from '../assets/dentisterie.png';
import imgLabo from '../assets/laboratoire.png';
import imgEcho from '../assets/echographie.png';

const specializations = [
  { name: 'Consultation Générale', img: imgGeneral, desc: 'Diagnostic complet et suivi préventif personnalisé.', icon: <FaStethoscope /> },
  { name: 'Chirurgie', img: imgChirurgie, desc: 'Blocs opératoires équipés de technologies de pointe.', icon: <FaSyringe /> },
  { name: 'Gynéco-Obstétrique', img: imgGyneco, desc: 'Accompagnement bienveillant pour les futures mamans.', icon: <FaStethoscope /> },
  { name: 'Pédiatrie', img: imgPediatrie, desc: 'Expertise dédiée à la santé de vos enfants.', icon: <FaBaby /> },
  { name: 'CPN CPS', img: imgCPN, desc: 'Soins prénatals et suivi postnatal attentif.', icon: <FaBaby /> },
  { name: 'Planning familial', img: imgPlanning, desc: 'Conseils personnalisés pour une planification responsable.', icon: <FaStethoscope /> },
  { name: 'Ophtamologie', img: imgOphtalmo, desc: 'Expertise dédiée à votre santé oculaire.', icon: <FaEye /> },
  { name: 'Dentisterie', img: imgDentiste, desc: 'Hygiène et bien-être de votre sourire.', icon: <FaTooth /> },
  { name: 'Laboratoire', img: imgLabo, desc: 'Analyses précises pour un diagnostic fiable.', icon: <FaMicroscope /> },
  { name: 'Échographie', img: imgEcho, desc: 'Imagerie de pointe pour un suivi précis.', icon: <FaMicroscope /> },
];

export default function Specialisations() {
  const [index, setIndex] = useState(0);
  const [openBooking, setOpenBooking] = useState(false);
  const [bookingData, setBookingData] = useState({ service: '', date: '', name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % specializations.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextStep = () => setIndex((prev) => (prev + 1) % specializations.length);
  const prevStep = () => setIndex((prev) => (prev === 0 ? specializations.length - 1 : prev - 1));

  const allDoctors = [
    { name: 'Dr. Gaetan Rubi', specialty: 'Gynéco-Obstétrique' },
    { name: 'Dr. Jean Paul', specialty: 'Consultation Générale' },
    { name: 'Dr. Mylor', specialty: 'Laboratoire' },
    { name: 'Dr. Sarah K.', specialty: 'Pédiatrie' },
    { name: 'Dr. David L.', specialty: 'Ophtamologie' },
    { name: 'Dr. Amina R.', specialty: 'Dentisterie' },
    { name: 'Dr. Marc T.', specialty: 'Echographie' },
    { name: 'Dr. Sophie M.', specialty: 'Planning familial' },
  ];

  const handleBooking = () => {
    setIsSubmitting(true);
    
    const templateParams = {
      patient_name: bookingData.name,
      patient_phone: bookingData.phone,
      medical_service: bookingData.service,
      doctor_name: bookingData.doctor,
      appointment_date: bookingData.date,
      reply_to: "contact@bompikiliki.cd"
    };

    emailjs.send(
      'VOTRE_SERVICE_ID', 
      'VOTRE_TEMPLATE_ID', 
      templateParams, 
      'VOTRE_PUBLIC_KEY'
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setSent(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setOpenBooking(false);
        setSent(false);
      }, 3000);
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      setIsSubmitting(false);
    });
  };


  return (
    <Box sx={{ bgcolor: '#ffffff' }}>
      {/* HERO SLIDER DYNAMIQUE */}
      <Box sx={{ height: { xs: '80vh', md: '75vh' }, position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', color: 'white', bgcolor: 'black' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={specializations[index].img}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          />
        </AnimatePresence>

        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)', zIndex: 1 }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: { xs: '100%', md: 750 } }}>
            <motion.div key={`content-${index}`} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Typography variant="overline" sx={{ letterSpacing: 4, fontWeight: 'bold', color: '#64b5f6', display: 'block', mb: 1 }}>
                PLATEAU TECHNIQUE D'EXCELLENCE
              </Typography>
              <Typography variant="h1" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.2rem', md: '4rem' }, lineHeight: 1.1 }}>
                {specializations[index].name}
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, fontWeight: 300, opacity: 0.9, lineHeight: 1.6, maxWidth: 600 }}>
                {specializations[index].desc}
              </Typography>
              <Button onClick={() => setOpenBooking(true)} variant="contained" size="large" endIcon={<FaArrowRight />} sx={{ borderRadius: '50px', px: 5, py: 1.8, bgcolor: '#1976d2', fontWeight: 'bold' }}>
                Prendre rendez-vous
              </Button>
            </motion.div>
          </Box>
        </Container>

        <Stack direction="row" spacing={2} sx={{ position: 'absolute', bottom: 40, right: { xs: 20, md: 60 }, zIndex: 10 }}>
          <IconButton onClick={prevStep} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}><FaChevronLeft /></IconButton>
          <IconButton onClick={nextStep} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.4)' }}><FaChevronRight /></IconButton>
        </Stack>
      </Box>

      {/* SECTION CARTES INFÉRIEURES */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="800" gutterBottom>Tous nos départements</Typography>
          <Box sx={{ width: 60, height: 4, bgcolor: '#1976d2', mx: 'auto', borderRadius: 2 }} />
        </Box>
        
        <Grid container spacing={4}>
          {specializations.map((spec, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ 
                borderRadius: 5, p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #f0f0f0', boxShadow: 'none', transition: '0.4s', 
                '&:hover': { borderColor: '#1976d2', transform: 'translateY(-10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } 
              }}>
                <Box>
                  <Box sx={{ fontSize: 45, color: '#1976d2', mb: 2.5 }}>{spec.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>{spec.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Expertise médicale garantie 24h/24 par nos spécialistes à Masina.
                  </Typography>
                </Box>
                <Button 
                  onClick={() => { setBookingData({...bookingData, service: spec.name}); setOpenBooking(true); }}
                  endIcon={<FaArrowRight style={{ fontSize: '12px' }} />}
                  sx={{ fontWeight: 'bold', textTransform: 'none', color: '#1976d2' }}
                >
                  Réserver
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

     {/* MODALE DE RENDEZ-VOUS INTELLIGENTE MISE À JOUR */}
<Modal open={openBooking} onClose={() => setOpenBooking(false)} closeAfterTransition>
  <Box sx={{ 
    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
    width: { xs: '95%', sm: 550 }, bgcolor: 'background.paper', borderRadius: 4, 
    boxShadow: 24, p: 4, outline: 'none', maxHeight: '90vh', overflowY: 'auto' 
  }}>
    <IconButton onClick={() => setOpenBooking(false)} sx={{ position: 'absolute', top: 10, right: 10 }}>
      <FaTimes />
    </IconButton>

    <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center" mb={3}>
      Réservation Spécialisée
    </Typography>

    <Stack spacing={2.5}>
      {/* 1. Sélection du Service */}
      <TextField 
        select label="Service Médical" 
        fullWidth SelectProps={{ native: true }} 
        value={bookingData.service} 
        onChange={(e) => setBookingData({...bookingData, service: e.target.value, doctor: ''})}
      >
        <option value="">Choisissez un service...</option>
        {specializations.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
      </TextField>

      {/* 2. Sélection du Docteur FILTRÉE */}
      <TextField 
        select 
        label="Médecin Spécialiste" 
        fullWidth 
        SelectProps={{ native: true }}
        value={bookingData.doctor}
        disabled={!bookingData.service}
        onChange={(e) => setBookingData({...bookingData, doctor: e.target.value})}
        helperText={!bookingData.service ? "Sélectionnez d'abord un service" : ""}
      >
        <option value="">-- Choisir un médecin --</option>
        {allDoctors
          .filter(doc => doc.specialty === bookingData.service)
          .map((doc) => (
            <option key={doc.name} value={doc.name}>{doc.name}</option>
          ))
        }
        {bookingData.service && allDoctors.filter(doc => doc.specialty === bookingData.service).length === 0 && (
            <option value="Premier disponible">Le premier médecin disponible</option>
        )}
      </TextField>

      {/* 3. Date et Heure CONNECTÉES */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            label="Date" 
            type="date" 
            fullWidth 
            InputLabelProps={{ shrink: true }}
            value={bookingData.date || ''}
            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            select label="Heure" 
            fullWidth 
            SelectProps={{ native: true }}
            value={bookingData.time || ''}
            onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
          >
            <option value="">Choisir...</option>
            <option value="08:00">08:00</option>
            <option value="10:00">10:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
          </TextField>
        </Grid>
      </Grid>

      <Divider sx={{ my: 1 }}>
        <Typography variant="caption" color="text.disabled">COORDONNÉES DU PATIENT</Typography>
      </Divider>

      {/* 4. Nom et Téléphone CONNECTÉS */}
      <TextField 
        label="Nom du Patient" 
        fullWidth 
        value={bookingData.name || ''}
        onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
      />
      
      <TextField 
        label="Téléphone" 
        fullWidth 
        placeholder="+243..." 
        value={bookingData.phone || ''}
        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
      />

      <Button 
        variant="contained" 
        fullWidth size="large" 
        onClick={handleBooking} 
        disabled={isSubmitting || !bookingData.service || !bookingData.name || !bookingData.phone}
        sx={{ py: 2, borderRadius: 2, fontWeight: 'bold' }}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Confirmer mon Rendez-vous"}
      </Button>

      {sent && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Rendez-vous enregistré avec succès pour le service {bookingData.service} !
        </Alert>
      )}
    </Stack>
  </Box>
</Modal>
    </Box>
  );
}
