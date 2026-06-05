import { useState, useEffect } from 'react';
import ProfessionalSplashScreen from './components/ProfessionalSplashScreen';
import CashRegister from './pages/CashRegister.jsx';
import Specialisations from './pages/Specialisations.jsx';
import DashboardStatistiques from './pages/DashboardStatistiques.jsx';
import Examens from './pages/Examens.jsx';
import NotificationsMessagerie from './pages/NotificationsMessagerie.jsx';
import ParametresProfil from './pages/ParametresProfil.jsx';
import Patients from './pages/Patients.jsx';
import AProposHopital from './pages/AProposHopital.jsx';
import PaymentsAdmin from './pages/PaymentsAdmin.jsx';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';
import Doctors from './pages/Doctors.jsx';
import Account from './pages/Account.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import DoctorPlanning from './pages/DoctorPlanning.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Auth from './pages/Auth.jsx';
import Payment from './pages/Payment.jsx';
import MedicalRecords from './pages/MedicalRecords.jsx';
import Messages from './pages/Messages.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Footer from './components/Footer.jsx';
import { AnimatePresence } from 'framer-motion';
import { LangProvider } from './contexts/LangContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { SnackbarProvider } from './components/SnackbarContext.jsx';
import { NotificationProvider } from './components/NotificationProvider.jsx';
import Navbar from './components/Navbar.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { FaHeartbeat, FaHome, FaCalendarAlt } from 'react-icons/fa';
// Note : import { motion } from 'framer-motion'; et import { Link } from 'react-router-dom'; sont déjà présents dans votre fichier.


 

function NotFound() {
  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 6, position: 'relative', overflow: 'hidden' }} >
        <Box component={motion.div} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} sx={{ color: '#d32f2f', bgcolor: 'rgba(211, 47, 47, 0.04)', p: 3, borderRadius: '50%', border: '2px dashed rgba(211, 47, 47, 0.2)', mb: 4, display: 'inline-flex', boxShadow: '0 0 30px rgba(211, 47, 47, 0.1)' }} >
          <motion.div animate={{ scale: [1, 1.2, 1, 1, 1.3, 1, 1], rotate: [0, -5, 5, 0, 0, 0, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} >
            <FaHeartbeat size={65} />
          </motion.div>
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: '6rem', sm: '9rem' }, fontWeight: 900, lineHeight: 1, color: '#0a192f', letterSpacing: '-2px', fontFamily: 'monospace', mb: 1 }} >
          404
        </Typography>
        <Typography variant="h4" fontWeight="800" sx={{ color: '#1976d2', mb: 2, px: 2, fontSize: { xs: '1.5rem', sm: '2.1rem' } }} >
          Signal Perdu : Page Introuvable
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 540, mx: 'auto', mb: 5, px: 3, lineHeight: 1.7 }} >
          Il semble que l'adresse demandée n'existe pas ou qu'elle ait été déplacée vers un autre service clinique. Ne vous inquiétez pas, nos systèmes de santé restent pleinement opérationnels.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ width: { xs: '100%', sm: 'auto' }, px: 3 }} >
          <Button component={Link} to="/" variant="contained" size="large" startIcon={<FaHome />} sx={{ borderRadius: '14px', textTransform: 'none', fontWeight: 'bold', px: 4, py: 1.6, bgcolor: '#1976d2', boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)', '&:hover': { bgcolor: '#1565c0' } }} >
            Retour à l'accueil
          </Button>
          <Button component={Link} to="/booking" variant="outlined" size="large" startIcon={<FaCalendarAlt />} sx={{ borderRadius: '14px', textTransform: 'none', fontWeight: 'bold', px: 4, py: 1.6, color: '#0a192f', borderColor: '#0a192f', '&:hover': { borderColor: '#1976d2', bgcolor: 'rgba(10, 25, 47, 0.02)', color: '#1976d2' } }} >
            Prendre rendez-vous
          </Button>
        </Stack>
        <Box sx={{ position: 'absolute', bottom: -20, opacity: 0.015, fontSize: '12rem', fontWeight: 900, zIndex: -1, userSelect: 'none', color: '#1976d2' }} >
          BOMPIKILIKI
        </Box>
      </Box>
    </Container>
  );
}

// ==========================================
// 2. VOTRE COMPOSANT PRINCIPAL APPCOMPONENT
// ==========================================
function AppComponent() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenBompikilikiSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenBompikilikiSplash', 'true');
    setShowSplash(false);
  };

  return (
    <LangProvider>
      <AuthProvider>
        <SnackbarProvider>
          <NotificationProvider>
            
            {showSplash ? (
              <ProfessionalSplashScreen onComplete={handleSplashComplete} />
            ) : (
              <Router>
                <Navbar />
                
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    <Route path="/doctor-dashboard" element={<ProtectedRoute role="medecin"><DoctorDashboard /></ProtectedRoute>} />
                    <Route path="/doctor-planning" element={<ProtectedRoute role="medecin"><DoctorPlanning user={JSON.parse(localStorage.getItem('authUser'))} /></ProtectedRoute>} />
                    <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/payments-admin" element={<ProtectedRoute role="admin"><PaymentsAdmin /></ProtectedRoute>} />
                    <Route path="/payment" element={<ProtectedRoute role="patient"><Payment /></ProtectedRoute>} />
                    <Route path="/medical-records" element={<ProtectedRoute role="patient"><MedicalRecords user={JSON.parse(localStorage.getItem('authUser'))} /></ProtectedRoute>} />
                    <Route path="/messages" element={<ProtectedRoute><Messages user={JSON.parse(localStorage.getItem('authUser'))} /></ProtectedRoute>} />
                    <Route path="/cash-register" element={<ProtectedRoute role={["admin","medecin"]}><CashRegister /></ProtectedRoute>} />
                    <Route path="/dashboard-statistiques" element={<ProtectedRoute role={["admin","medecin"]}><DashboardStatistiques /></ProtectedRoute>} />
                    <Route path="/examens" element={<ProtectedRoute role={["admin","medecin"]}><Examens /></ProtectedRoute>} />
                    <Route path="/notifications-messagerie" element={<ProtectedRoute><NotificationsMessagerie /></ProtectedRoute>} />
                    <Route path="/parametres-profil" element={<ProtectedRoute><ParametresProfil /></ProtectedRoute>} />
                    <Route path="/patients" element={<ProtectedRoute role={["admin","secretaire"]}><Patients /></ProtectedRoute>} />
                    <Route path="/a-propos" element={<AProposHopital />} />
                    <Route path="/specialisations" element={<Specialisations />} />
                    
                    {/* ROUTE CAPTURE TOUT (404) - APPELLE LE COMPOSANT DU DESSUS */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
                
                <Footer />
              </Router>
            )}

          </NotificationProvider>
        </SnackbarProvider>
      </AuthProvider>
    </LangProvider>
  );
}

export default AppComponent;

