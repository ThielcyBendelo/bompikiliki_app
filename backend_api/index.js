import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Example route
app.get('/api', (req, res) => {
  res.json({ message: 'API backend is running!' });
});

// Patients CRUD
let patients = [];
app.get('/api/patients', (req, res) => res.json(patients));
app.post('/api/patients', (req, res) => {
  const patient = { ...req.body, id: Date.now().toString() };
  patients.push(patient);
  res.json(patient);
});
app.put('/api/patients/:id', (req, res) => {
  const idx = patients.findIndex((p) => p.id === req.params.id);
  if (idx !== -1) {
    patients[idx] = { ...patients[idx], ...req.body };
    res.json(patients[idx]);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});
app.delete('/api/patients/:id', (req, res) => {
  patients = patients.filter((p) => p.id !== req.params.id);
  res.json({ success: true });
});

// Add other CRUD routes here (users, payments, etc.)
// Utilisateurs CRUD
let users = [];
app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => {
  const user = { ...req.body, id: Date.now().toString() };
  users.push(user);
  res.json(user);
});
app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex((u) => u.id === req.params.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...req.body };
    res.json(users[idx]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});
app.delete('/api/users/:id', (req, res) => {
  users = users.filter((u) => u.id !== req.params.id);
  res.json({ success: true });
});

// Paiements CRUD
let payments = [];
app.get('/api/payments', (req, res) => res.json(payments));
app.post('/api/payments', (req, res) => {
  const payment = { ...req.body, id: Date.now().toString() };
  payments.push(payment);
  res.json(payment);
});
app.put('/api/payments/:id', (req, res) => {
  const idx = payments.findIndex((p) => p.id === req.params.id);
  if (idx !== -1) {
    payments[idx] = { ...payments[idx], ...req.body };
    res.json(payments[idx]);
  } else {
    res.status(404).json({ error: 'Payment not found' });
  }
});
app.delete('/api/payments/:id', (req, res) => {
  payments = payments.filter((p) => p.id !== req.params.id);
  res.json({ success: true });
});

// Statistiques (exemple simple)
// Examens CRUD
let exams = [];
app.get('/api/exams', (req, res) => res.json(exams));
app.post('/api/exams', (req, res) => {
  const exam = { ...req.body, id: Date.now().toString() };
  exams.push(exam);
  res.json(exam);
});
app.put('/api/exams/:id', (req, res) => {
  const idx = exams.findIndex((e) => e.id === req.params.id);
  if (idx !== -1) {
    exams[idx] = { ...exams[idx], ...req.body };
    res.json(exams[idx]);
  } else {
    res.status(404).json({ error: 'Exam not found' });
  }
});
app.delete('/api/exams/:id', (req, res) => {
  exams = exams.filter((e) => e.id !== req.params.id);
  res.json({ success: true });
});

// Statistiques (dashboard avancé)
// Rendez-vous CRUD
// Dossiers médicaux CRUD
let medicalRecords = [];
app.get('/api/medical-records/:patientId', (req, res) => {
  const record = medicalRecords.find(
    (r) => r.patientId === req.params.patientId
  );
  res.json(
    record || { patientId: req.params.patientId, history: [], documents: [] }
  );
});
app.post('/api/medical-records/:patientId/documents', (req, res) => {
  let record = medicalRecords.find((r) => r.patientId === req.params.patientId);
  if (!record) {
    record = { patientId: req.params.patientId, history: [], documents: [] };
    medicalRecords.push(record);
  }
  const doc = { id: Date.now().toString(), ...req.body, url: '#' };
  record.documents.push(doc);
  res.json(doc);
});
// Ajout d'un historique médical
// Messages CRUD
let messages = [];
app.get('/api/messages', (req, res) => res.json(messages));
app.post('/api/messages', (req, res) => {
  const message = {
    ...req.body,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  messages.push(message);
  res.json(message);
});
app.delete('/api/messages/:id', (req, res) => {
  messages = messages.filter((m) => m.id !== req.params.id);
  res.json({ success: true });
});
app.post('/api/medical-records/:patientId/history', (req, res) => {
  let record = medicalRecords.find((r) => r.patientId === req.params.patientId);
  if (!record) {
    record = { patientId: req.params.patientId, history: [], documents: [] };
    medicalRecords.push(record);
  }
  const entry = { id: Date.now().toString(), ...req.body };
  record.history.push(entry);
  res.json(entry);
});
let appointments = [];
app.get('/api/appointments', (req, res) => res.json(appointments));
app.post('/api/appointments', (req, res) => {
  const appointment = { ...req.body, id: Date.now().toString() };
  appointments.push(appointment);
  res.json(appointment);
});
app.put('/api/appointments/:id', (req, res) => {
  const idx = appointments.findIndex((a) => a.id === req.params.id);
  if (idx !== -1) {
    appointments[idx] = { ...appointments[idx], ...req.body };
    res.json(appointments[idx]);
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});
app.delete('/api/appointments/:id', (req, res) => {
  appointments = appointments.filter((a) => a.id !== req.params.id);
  res.json({ success: true });
});
app.get('/api/stats', (req, res) => {
  // Exemple de chartData : nombre de patients par mois (mock)
  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return d.toLocaleString('default', { month: 'short', year: 'numeric' });
  }).reverse();
  const chartData = months.map((month) => ({
    label: month,
    value: Math.floor(Math.random() * 10) + 1,
  }));
  res.json({
    appointments: patients.length,
    patients: patients.length,
    doctors: users.filter((u) => u.role === 'medecin').length,
    payments: payments.reduce((sum, p) => sum + Number(p.amount || 0), 0),
    topDoctors: users.filter((u) => u.role === 'medecin').slice(0, 3),
    chartData,
    exams: exams.length,
  });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}/api`);
});
