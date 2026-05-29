// API simulée pour rendez-vous avec persistance localStorage
const APPOINTMENTS_KEY = 'appointments';

export function getAppointments() {
  const data = localStorage.getItem(APPOINTMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addAppointment(appointment) {
  const current = getAppointments();
  const newAppointment = { ...appointment, id: Date.now() };
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([...current, newAppointment]));
  return newAppointment;
}

export function getAppointmentsByUser(userId) {
  return getAppointments().filter(a => a.userId === userId);
}
