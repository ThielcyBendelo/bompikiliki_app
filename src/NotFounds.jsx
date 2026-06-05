import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHome, FaCalendarAlt } from 'react-icons/fa';

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          minHeight: '75vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          py: 6, 
          position: 'relative', 
          overflow: 'hidden' 
        }}
      >
        {/* Graphique d'impulsion cardiaque animé */}
        <Box 
          component={motion.div} 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6 }} 
          sx={{ 
            color: '#d32f2f', // Rouge d'urgence médicale
            bgcolor: 'rgba(211, 47, 47, 0.04)', 
            p: 3, 
            borderRadius: '50%', 
            border: '2px dashed rgba(211, 47, 47, 0.2)', 
            mb: 4, 
            display: 'inline-flex', 
            boxShadow: '0 0 30px rgba(211, 47, 47, 0.1)' 
          }}
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1, 1, 1.3, 1, 1], rotate: [0, -5, 5, 0, 0, 0, 0] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <FaHeartbeat size={65} />
          </motion.div>
        </Box>

        {/* Code d'erreur géant */}
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '6rem', sm: '9rem' }, 
            fontWeight: 900, 
            lineHeight: 1, 
            color: '#0a192f', 
            letterSpacing: '-2px', 
            fontFamily: 'monospace', 
            mb: 1 
          }}
        >
          404
        </Typography>

        {/* Titre contextuel */}
        <Typography 
          variant="h4" 
          fontWeight="800" 
          sx={{ color: '#1976d2', mb: 2, px: 2, fontSize: { xs: '1.5rem', sm: '2.1rem' } }}
        >
          Signal Perdu : Page Introuvable
        </Typography>

        {/* Message d'accompagnement professionnel */}
        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ maxWidth: 540, mx: 'auto', mb: 5, px: 3, lineHeight: 1.7 }}
        >
          Il semble que l'adresse demandée n'existe pas ou qu'elle ait été déplacée vers un autre service clinique. Ne vous inquiétez pas, nos systèmes de santé restent pleinement opérationnels.
        </Typography>

        {/* Boutons d'action pour rediriger l'utilisateur */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center" 
          sx={{ width: { xs: '100%', sm: 'auto' }, px: 3 }}
        >
          <Button 
            component={Link} 
            to="/" 
            variant="contained" 
            size="large" 
            startIcon={<FaHome />} 
            sx={{ 
              borderRadius: '14px', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              px: 4, 
              py: 1.6, 
              bgcolor: '#1976d2', 
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)', 
              '&:hover': { bgcolor: '#1565c0' } 
            }}
          >
            Retour à l'accueil
          </Button> 
          
          <Button 
            component={Link} 
            to="/booking" 
            variant="outlined" 
            size="large" 
            startIcon={<FaCalendarAlt />} 
            sx={{ 
              borderRadius: '14px', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              px: 4, 
              py: 1.6, 
              color: '#0a192f', 
              borderColor: '#0a192f', 
              '&:hover': { borderColor: '#1976d2', bgcolor: 'rgba(10, 25, 47, 0.02)', color: '#1976d2' } 
            }}
          >
            Prendre rendez-vous
          </Button>
        </Stack>

        {/* Filigrane d'arrière-plan discret */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: -20, 
            opacity: 0.015, 
            fontSize: '12rem', 
            fontWeight: 900, 
            zIndex: -1, 
            userSelect: 'none', 
            color: '#1976d2' 
          }}
        >
          BOMPIKILIKI
        </Box>
      </Box>
    </Container>
  );
}
