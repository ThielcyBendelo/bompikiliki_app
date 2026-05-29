export const mockPayments = [
  { type: 'consultation', amount: 50, patient: 'Jean Dupont', exam: '', date: '2025-11-10 10:00' },
  { type: 'examen', amount: 80, patient: 'Alice Martin', exam: 'Radio', date: '2025-11-11 14:30' },
];
export const mockExams = [
  { patient: 'Jean Dupont', name: 'Radio', date: '2025-11-11', result: 'Normal', paid: true },
  { patient: 'Alice Martin', name: 'Scanner', date: '2025-11-12', result: 'Observation', paid: false },
  { patient: 'Paul SuperAdmin', name: 'IRM', date: '2025-11-13', result: 'Normal', paid: true },
  { patient: 'Sophie Secretaire', name: 'Analyse sanguine', date: '2025-11-14', result: 'Anémie', paid: false },
  { patient: 'Dr. Karim El', name: 'ECG', date: '2025-11-15', result: 'Tachycardie', paid: true }
];
// Mock base de données pour utilisateurs et rendez-vous
export const users = [
  { id: 1, name: 'Alice Martin', email: 'alice@mail.com', password: 'alice123', role: 'patient' },
  { id: 2, name: 'Jean Dupont', email: 'jean@mail.com', password: 'jean123', role: 'medecin' },
  { id: 3, name: 'Admin User', email: 'bendelothielcy@gmail.com', password: 'bendelo1996$$$$$', role: 'admin' },
  { id: 4, name: 'Sophie Secretaire', email: 'secret@mail.com', password: 'secret123', role: 'secretaire' },
  { id: 5, name: 'Paul SuperAdmin', email: 'superadmin@mail.com', password: 'superadmin123', role: 'superadmin' },
  { id: 6, name: 'Patient Test', email: 'patient@mail.com', password: 'patient123', role: 'patient' },
  { id: 7, name: 'Dr. Karim El', email: 'karim@mail.com', password: 'karim123', role: 'medecin' },
];

export const appointments = [
  { id: 1, userId: 1, doctor: 'Dr. Jean Dupont', date: '2025-11-15', time: '10:00', status: 'confirmé' },
];

export const doctors = [
  { id: 1, name: 'Dr. Alice Martin', specialty: 'Généraliste' },
  { id: 2, name: 'Dr. Jean Dupont', specialty: 'Cardiologue' },
  { id: 3, name: 'Dr. Sarah Ben', specialty: 'Dermatologue' },
];
