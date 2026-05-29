import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getPayments } from '../apiPayments';

export default function PaymentsAdmin() {
  const payments = getPayments();

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>Gestion des paiements</Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {payments.length === 0 && <ListItem><ListItemText primary="Aucun paiement enregistré." /></ListItem>}
          {payments.map(p => (
            <ListItem key={p.id}>
              <ListItemText
                primary={`Montant : ${p.amount} € | Patient : ${p.patientName} (${p.patientEmail})`}
                secondary={`Date : ${new Date(p.date).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
