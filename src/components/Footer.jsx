import React from 'react';
import { Box, Typography, Link as MuiLink, Container, Grid, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom'; // Important pour une Single Page Application
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebook, FaWhatsapp, FaClock } from 'react-icons/fa';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#0a192f', // Un bleu nuit encore plus profond et haut de gamme
        color: 'white', 
        pt: 8, 
        pb: 4, 
        mt: 8, 
        position: 'relative', 
        zIndex: 2,
        borderTop: '4px solid #2e7d32' // Rappel discret du vert médical de la marque
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Colonne 1 : À propos & Engagement */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="900" gutterBottom sx={{ color: '#90caf9', letterSpacing: '0.5px' }}>
              BOMPI<span style={{ color: '#4caf50' }}>KILIKI</span>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.8, mb: 3, textAlign: 'justify' }}>
              Votre partenaire santé de confiance au cœur de Masina. Nous nous engageons à fournir des soins d'excellence accessibles à tous, portés par une équipe médicale dévouée et des équipements de pointe.
            </Typography>
            <Stack direction="row" spacing={2}>
              <MuiLink 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener" 
                color="inherit"
                sx={{ '&:hover': { color: '#90caf9', transform: 'translateY(-3px)' }, transition: '0.3s' }}
              >
                <FaFacebook size={22} />
              </MuiLink>
              <MuiLink 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener" 
                color="inherit"
                sx={{ '&:hover': { color: '#4caf50', transform: 'translateY(-3px)' }, transition: '0.3s' }}
              >
                <FaWhatsapp size={22} />
              </MuiLink>
            </Stack>
          </Grid>

          {/* Colonne 2 : Liens Rapides de Navigation */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#90caf9', mb: 2 }}>
              Liens Rapides
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Prendre rendez-vous', path: '/doctor-planning' },
                { label: 'À propos du centre', path: '/a-propos' },
                { label: 'Nos spécialités', path: '/specialisations' },
                { label: 'Laboratoire & Examens', path: '/examens' }
              ].map((link) => (
                <MuiLink 
                  key={link.label}
                  component={Link} 
                  to={link.path} 
                  color="inherit" 
                  underline="none" 
                  sx={{ 
                    opacity: 0.8,
                    fontSize: '0.9rem',
                    transition: '0.2s',
                    '&:hover': { color: '#90caf9', opacity: 1, pl: 0.5 } 
                  }}
                >
                  • {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Colonne 3 : Contact & Horaires (Crucial pour le SEO local) */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#90caf9', mb: 2 }}>
              Contact & Urgences
            </Typography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <FaMapMarkerAlt color="#90caf9" style={{ marginTop: '3px', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Av/ MOBUTU N°424, Q/ ABATOIR, Masina, Kinshasa, RDC
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FaPhoneAlt color="#90caf9" sx={{ flexShrink: 0 }} />
                <Typography variant="body2" fontWeight="600" sx={{ opacity: 0.85 }}>
                  +243 813 456 203 | +243 974 100 891
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FaEnvelope color="#90caf9" sx={{ flexShrink: 0 }} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  contact@bompikiliki.cd
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FaClock color="#4caf50" sx={{ flexShrink: 0 }} />
                <Typography variant="body2" fontWeight="bold" sx={{ color: '#4caf50' }}>
                  Urgences & Garde : 24h/24 & 7j/7
                </Typography>
              </Box>
            </Stack>
          </Grid>

        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.08)' }} />

        {/* Section Basse : Copyright & Mentions Légales SEO */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: 2,
            opacity: 0.7 
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="caption" display="block" sx={{ fontSize: '0.8rem' }}>
              &copy; {new Date().getFullYear()} Centre Médical Bompikiliki. Tous droits réservés.
            </Typography>
            <Typography variant="caption" display="block" sx={{ fontSize: '0.75rem', mt: 0.5 }}>
              Établissement de soins de santé enregistré – Masina, Kinshasa.
            </Typography>
          </Box>

          {/* Liens Juridiques et de Confidentialité réglementaires */}
          <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            <MuiLink component={Link} to="/mentions-legales" color="inherit" underline="hover" sx={{ fontSize: '0.75rem' }}>
              Mentions Légales
            </MuiLink>
            <MuiLink component={Link} to="/confidentialite" color="inherit" underline="hover" sx={{ fontSize: '0.75rem' }}>
              Protection des Données
            </MuiLink>
            <MuiLink component={Link} to="/charte-patient" color="inherit" underline="hover" sx={{ fontSize: '0.75rem' }}>
              Charte du Patient
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
