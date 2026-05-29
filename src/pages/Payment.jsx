import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Alert, List, ListItem, ListItemText, Divider } from '@mui/material';
import { addPayment } from '../apiPayments';
import { users } from '../mockData';

export default function Payment() {
  const [amount, setAmount] = useState('');
  const [paid, setPaid] = useState(false);
  const user = JSON.parse(localStorage.getItem('authUser'));

  const handlePay = () => {
    if (amount && !isNaN(amount) && user) {
      // Récupérer infos patient
      const patient = users.find(u => u.id === user.id);
      addPayment({
        userId: user.id,
        patientName: patient?.name || '',
        patientEmail: patient?.email || '',
        amount: parseFloat(amount),
        date: new Date().toISOString()
      });
      setPaid(true);
      setAmount('');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>Paiement de la consultation</Typography>
        <TextField
          label="Montant (€)"
          type="number"
          fullWidth
          value={amount}
          onChange={e => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="secondary" fullWidth onClick={handlePay} disabled={paid}>
          {paid ? 'Payé' : 'Payer'}
        </Button>
        {paid && <Alert severity="success" sx={{ mt: 2 }}>Paiement simulé avec succès !</Alert>}
      </Paper>
    </Box>
  );
}
