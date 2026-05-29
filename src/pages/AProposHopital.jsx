import React from 'react';
import { 
  Box, Typography, Paper, Grid, Button, Stack, Divider, Container 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  FaHospital, FaShieldAlt, FaHandHoldingHeart, FaMicroscope, 
  FaClock, FaUserCheck, FaMapMarkerAlt, FaPhoneAlt 
} from 'react-icons/fa';

const engagements = [
  {
    title: "Sécurité des soins",
    desc: "Nous appliquons les protocoles sanitaires internationaux les plus stricts pour garantir un environnement stérile et sécurisé.",
    icon: <FaShieldAlt color="#1976d2" size={30} />
  },
  {
    title: "Disponibilité 24/7",
    desc: "Parce que la santé n'attend pas, notre service d'urgence et notre garde médicale sont opérationnels jour et nuit.",
    icon: <FaClock color="#1976d2" size={30} />
  },
  {
    title: "Éthique & Confidentialité",
    desc: "Le respect du secret médical et de la dignité de nos patients est le socle de notre pratique quotidienne.",
    icon: <FaUserCheck color="#1976d2" size={30} />
  }
];

export default function AProposHopital() {
  return (
    <Box sx={{ bgcolor: '#ffffff' }}>
      {/* 1. HERO SECTION INSTITUTIONNELLE */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #115293 100%)', 
        color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center', px: 2 
      }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ letterSpacing: 3, fontWeight: 'bold', opacity: 0.8 }}>
            Établissement de Santé de Référence
          </Typography>
          <Typography variant="h2" fontWeight="900" sx={{ mb: 3, mt: 1 }}>
            Centre Médical BOMPIKILIKI
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 300, lineHeight: 1.6, opacity: 0.9 }}>
            Depuis notre fondation à Masina, nous redéfinissons les standards de soins de proximité en alliant innovation médicale et compassion.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -5, pb: 8 }}>
        {/* 2. CARTES D'ENGAGEMENT (Flottantes sur le Hero) */}
        <Grid container spacing={3} sx={{ mb: 10 }}>
          {engagements.map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={4} sx={{ p: 4, height: '100%', borderRadius: 4, textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                <Box sx={{ mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* 3. SECTION PRÉSENTATION DÉTAILLÉE */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
              Notre Engagement envers la Communauté
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#444' }}>
              Le <strong>Centre Médical BOMPIKILIKI</strong> n'est pas seulement une infrastructure de santé ; c'est un projet humain né au cœur de Kinshasa. Notre établissement répond aux besoins croissants de soins spécialisés avec une rigueur constante.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#444', mb: 3 }}>
              Nous investissons continuellement dans des équipements de diagnostic de dernière génération (Imagerie, Laboratoire automatisé) pour offrir à nos patients des résultats rapides et fiables, essentiels à un traitement efficace.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="secondary">10+</Typography>
                <Typography variant="caption" fontWeight="bold">Spécialités</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="secondary">24/7</Typography>
                <Typography variant="caption" fontWeight="bold">Urgences</Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="secondary">100%</Typography>
                <Typography variant="caption" fontWeight="bold">Digitalisé</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              component="img"
              src="https://unsplash.com"
              alt="Hôpital Moderne"
              sx={{ width: '100%', borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            />
          </Grid>
        </Grid>

        {/* 4. SECTION VISION ET VALEURS */}
        <Paper sx={{ p: { xs: 4, md: 8 }, bgcolor: '#f8fbff', borderRadius: 8, mb: 10 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Notre Vision
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Devenir le leader des soins de santé de proximité en République Démocratique du Congo, reconnu pour l'excellence de son plateau technique et son intégrité.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                L'Innovation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nous intégrons le numérique dans tout le parcours patient, de la prise de rendez-vous en ligne au dossier médical partagé, pour une gestion fluide et sans erreur.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                Accessibilité
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Situé à Masina (Abattoir), nous nous engageons à offrir des tarifs justes et transparents pour permettre à chaque famille d'accéder au meilleur de la médecine.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* 5. INFOS DE CONTACT ET ACCÈS */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" mb={4}>Comment nous trouver ?</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <FaMapMarkerAlt size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold">Adresse</Typography>
                <Typography variant="body2" textAlign="center">
                  Av/ MOBUTU N°424, Q/ ABATOIR<br />
                  C/ MASINA, Référence : 2 Pailottes
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <FaPhoneAlt size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold">Contact Direct</Typography>
                <Typography variant="body2">
                  +243 813 456 203<br />
                  +243 974 100 891
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6 }}>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/doctor-planning"
              sx={{ px: 6, py: 2, borderRadius: 10, fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Planifier une visite
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
