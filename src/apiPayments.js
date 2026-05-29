// API simulée pour paiements avec persistance localStorage
const PAYMENTS_KEY = 'payments';

export function getPayments() {
  const data = localStorage.getItem(PAYMENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addPayment(payment) {
  const current = getPayments();
  const newPayment = { ...payment, id: Date.now() };
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify([...current, newPayment]));
  return newPayment;
}

export function getPaymentsByUser(userId) {
  return getPayments().filter(p => p.userId === userId);
}
