import React, { useContext, useState, useEffect } from 'react';
// Importation standard de Grid
import { Box, Typography, Button, Container, Paper, Stack, Grid } from '@mui/material';
import { LangContext } from '../contexts/LangContextDef.js';
import { Link } from 'react-router-dom';
import { background, background1, background3, background5 } from '../assets';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarCheck, FaUserMd, FaWallet, FaBell, FaMobileAlt } from 'react-icons/fa';

export default function Home() {
  const backgrounds = [background, background1, background3, background5];
  const [bgIndex, setBgIndex] = useState(0);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const translations = {
    fr: {
      welcome: 'Votre Santé, Notre Priorité Absolue',
      subtitle: 'Le Centre Médical BOMPIKILIKI met à votre disposition une plateforme moderne pour gérer vos soins au cœur de Masina.',
      book: 'Prendre rendez-vous',
      about: 'Découvrir le centre',
      featureTitle: 'Pourquoi nous choisir ?',
      features: [
        { title: 'RDV Rapide', desc: 'Réservez en ligne 24h/7.', icon: <FaCalendarCheck /> },
        { title: 'Experts', desc: 'Médecins spécialisés.', icon: <FaUserMd /> },
        { title: 'Paiement', desc: 'Gestion sécurisée.', icon: <FaWallet /> },
        { title: 'Alertes', desc: 'Rappels automatiques.', icon: <FaBell /> },
        { title: 'Mobile', desc: 'Suivi smartphone.', icon: <FaMobileAlt /> },
      ],
    }
  };

  const t = translations[lang] || translations.fr;

  return (
    <Box>
      {/* SECTION HERO */}
      <Box sx={{ 
        height: '85vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden', 
        color: 'white' 
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${backgrounds[bgIndex]})`,
              backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -1
            }}
          />
        </AnimatePresence>

        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="h2" fontWeight="900" sx={{ lineHeight: 1.2, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
              {t.welcome}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 300, maxWidth: 600, opacity: 0.9 }}>
              {t.subtitle}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button component={Link} to="/doctor-planning" variant="contained" size="large" sx={{ borderRadius: '30px', px: 4, py: 1.5, fontWeight: 'bold' }}>
                {t.book}
              </Button>
              <Button component={Link} to="/a-propos" variant="outlined" size="large" sx={{ color: 'white', borderColor: 'white', borderRadius: '30px', px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                {t.about}
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* SECTION FEATURES AVEC GRID STANDARD */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={6}>{t.featureTitle}</Typography>
        <Grid container spacing={3}>
          {t.features.map((f, i) => (
            <Grid item xs={12} sm={6} md={2.4} key={i}>
              <Paper elevation={0} sx={{ 
                p: 3, textAlign: 'center', borderRadius: 4, bgcolor: '#f8fbff', 
                border: '1px solid #e3f2fd', height: '100%' 
              }}>
                <Box sx={{ fontSize: 40, color: '#1976d2', mb: 1.5 }}>{f.icon}</Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
