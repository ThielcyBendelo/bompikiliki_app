import { useState, useEffect } from 'react'; // AJOUTÉ pour la gestion du Splash Screen
import ProfessionalSplashScreen from './components/ProfessionalSplashScreen'; // AJOUTÉ

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
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppComponent() {
  // Gestion de l'affichage du Splash Screen (AJOUTÉ)
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
            
            {/* Condition d'affichage du Splash Screen (AJOUTÉ) */}
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
