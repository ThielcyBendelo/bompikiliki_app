import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, GlobalStyles } from '@mui/material';
import { FaHeartbeat } from 'react-icons/fa';

export default function ProfessionalSplashScreen({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const loadingSteps = useMemo(() => [
    { label: 'CONNEXION AUX SERVEURS CLINIQUES', duration: 800 },
    { label: 'CHARGEMENT DES AGENDAS MÉDICAUX', duration: 1000 },
    { label: 'SÉCURISATION DES DONNÉES PATIENTS', duration: 700 },
    { label: 'INITIALISATION DE L\'INTERFACE', duration: 500 },
  ], []);

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          const target = (currentStep + 1) * (100 / loadingSteps.length);
          if (prev >= target) {
            clearInterval(progressInterval);
            return target;
          }
          return prev + 0.8; // Vitesse lissée pour éviter les micro-saccades
        });
      }, 20);

      stepTimeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, step.duration);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => onComplete && onComplete(), 600);
      }, 400);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, onComplete, loadingSteps]);

  return (
    <AnimatePresence>
      {isLoading && (
        <Box
          component={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999, // Priorité absolue sur la Navbar
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#0a192f',
            color: '#ffffff',
            overflow: 'hidden',
            userSelect: 'none'
          }}
        >
          {/* Blocage du défilement de la page en arrière-plan */}
          <GlobalStyles styles={{ body: { overflow: 'hidden !important' } }} />

          {/* LOGO CENTRAL MÉDICAL */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mb: 6,
              zIndex: 2
            }}
          >
            {/* Pulsation Cardiaque Réaliste */}
            <Box
              component={motion.div}
              animate={{ scale: [1, 1.18, 1, 1.18, 1] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
              sx={{
                color: '#1976d2',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                p: 2.5,
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 40px rgba(25, 118, 210, 0.25)',
                display: 'flex'
              }}
            >
              <FaHeartbeat size={42} />
            </Box>
            
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '1.5px', color: '#ffffff' }}>
              BOMPI<Box component="span" sx={{ color: '#4caf50' }}>KILIKI</Box>
            </Typography>
            
            <Typography variant="caption" sx={{ letterSpacing: '4px', textTransform: 'uppercase', color: '#90caf9', opacity: 0.7, fontSize: '0.7rem', fontWeight: 600 }}>
              Centre Médical & Urgences
            </Typography>
          </Box>

          {/* CONTENEUR DE PROGRESSION ÉLÉGANT */}
          <Box sx={{ width: { xs: 260, sm: 320 }, zIndex: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1.5 }}>
              <Box sx={{ overflow: 'hidden', height: 20, flexGrow: 1, mr: 2 }}>
                <AnimatePresence mode="wait">
                  <Typography
                    key={currentStep}
                    component={motion.span}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      color: '#90caf9',
                      display: 'block',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {loadingSteps[currentStep]?.label}
                  </Typography>
                </AnimatePresence>
              </Box>
              
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#4caf50', fontFamily: 'monospace' }}>
                {Math.round(progress)}%
              </Typography>
            </Box>

            {/* Barre de progression chirurgicale haut de gamme */}
            <Box sx={{ height: '3px', w: '100%', bgcolor: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
              <Box
                component={motion.div}
                style={{ width: `${progress}%` }}
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  background: 'linear-gradient(90deg, #1976d2, #4caf50)',
                  borderRadius: '4px'
                }}
              />
            </Box>
          </Box>

          {/* FOND GRILLE ÉLECTROCARDIOGRAMME (MUI SYNTAXE) */}
          <Box 
            sx={{ 
              position: 'absolute',
              inset: 0,
              opacity: 0.025,
              pointerEvents: 'none',
              zIndex: 1,
              backgroundImage: 'linear-gradient(rgba(25, 118, 210, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(25, 118, 210, 0.5) 1px, transparent 1px)',
              backgroundSize: '35px 35px'
            }} 
          />
        </Box>
      )}
    </AnimatePresence>
  );
}
