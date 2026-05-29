// src/api/apiService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const api = {
  // Paiements
  getPayments: () => axios.get(`${API_BASE}/payments`).then(res => res.data),
  createPayment: (data) => axios.post(`${API_BASE}/payments`, data).then(res => res.data),

  // Utilisateurs
  getUsers: () => axios.get(`${API_BASE}/users`).then(res => res.data),
  createUser: (data) => axios.post(`${API_BASE}/users`, data).then(res => res.data),
  updateUser: (id, data) => axios.put(`${API_BASE}/users/${id}`, data).then(res => res.data),
  deleteUser: (id) => axios.delete(`${API_BASE}/users/${id}`).then(res => res.data),

  // Statistiques
  getStats: () => axios.get(`${API_BASE}/stats`).then(res => res.data),
  createStat: (data) => axios.post(`${API_BASE}/stats`, data).then(res => res.data),

  // Devis
  getQuotes: () => axios.get(`${API_BASE}/quotes`).then(res => res.data),
  createQuote: (data) => axios.post(`${API_BASE}/quotes`, data).then(res => res.data),

  // Examens
  getExams: () => axios.get(`${API_BASE}/exams`).then(res => res.data),
  createExam: (data) => axios.post(`${API_BASE}/exams`, data).then(res => res.data),
  updateExam: (id, data) => axios.put(`${API_BASE}/exams/${id}`, data).then(res => res.data),
  deleteExam: (id) => axios.delete(`${API_BASE}/exams/${id}`).then(res => res.data),

  // Rendez-vous
  getAppointments: () => axios.get(`${API_BASE}/appointments`).then(res => res.data),
  createAppointment: (data) => axios.post(`${API_BASE}/appointments`, data).then(res => res.data),

  // Messages
  getMessages: () => axios.get(`${API_BASE}/messages`).then(res => res.data),
  sendMessage: (data) => axios.post(`${API_BASE}/messages`, data).then(res => res.data),
  deleteMessage: (id) => axios.delete(`${API_BASE}/messages/${id}`).then(res => res.data),

  // Commissions
  getCommissions: () => axios.get(`${API_BASE}/commissions`).then(res => res.data),

  // Patients
  getPatients: () => axios.get(`${API_BASE}/patients`).then(res => res.data),
  createPatient: (data) => axios.post(`${API_BASE}/patients`, data).then(res => res.data),
  updatePatient: (id, data) => axios.put(`${API_BASE}/patients/${id}`, data).then(res => res.data),
  deletePatient: (id) => axios.delete(`${API_BASE}/patients/${id}`).then(res => res.data),

  // Dossiers médicaux
  getMedicalRecord: (patientId) => axios.get(`${API_BASE}/medical-records/${patientId}`).then(res => res.data),
  addMedicalDocument: (patientId, data) => axios.post(`${API_BASE}/medical-records/${patientId}/documents`, data).then(res => res.data),
  addMedicalHistory: (patientId, data) => axios.post(`${API_BASE}/medical-records/${patientId}/history`, data).then(res => res.data),
};
