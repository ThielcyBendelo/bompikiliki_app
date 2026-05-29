import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const mockNotifications = [
  { id: 1, type: 'rendez-vous', message: 'Nouveau rendez-vous confirmé pour le 15/11/2025 à 10h.' },
  { id: 2, type: 'paiement', message: 'Paiement reçu pour la consultation du 12/11/2025.' },
  { id: 3, type: 'message', message: 'Nouveau message du Dr. Martin.' },
];

const mockMessages = [
  { id: 1, from: 'Dr. Martin', to: 'Vous', content: 'Bonjour, merci de confirmer votre venue demain.' },
  { id: 2, from: 'Vous', to: 'Dr. Martin', content: 'Bonjour docteur, je confirme ma présence.' },
];

export default function NotificationsMessagerie() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, from: 'Vous', to: 'Dr. Martin', content: message }]);
      setMessage('');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">Notifications & Messagerie</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" mb={2}>Notifications</Typography>
        <List>
          {mockNotifications.map(n => (
            <ListItem key={n.id}>
              <ListItemText primary={n.message} secondary={n.type} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" mb={2}>Messagerie patient-médecin</Typography>
        <List>
          {messages.map(m => (
            <ListItem key={m.id}>
              <ListItemText primary={m.content} secondary={`${m.from} → ${m.to}`} />
            </ListItem>
          ))}
        </List>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Votre message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSend}>Envoyer</Button>
        </Stack>
      </Paper>
    </Box>
  );
}
