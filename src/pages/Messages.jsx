import React, { useState } from 'react';
import { threads } from '../mockDataMessages';
import { Box, Typography, List, ListItem, ListItemText, Button, TextField, Paper } from '@mui/material';

export default function Messages({ user }) {
  const [selectedThread, setSelectedThread] = useState(null);
  const [message, setMessage] = useState('');

  const handleSelectThread = (thread) => {
    setSelectedThread(thread);
    setMessage('');
  };

  const handleSend = () => {
    if (message.trim() && selectedThread) {
      selectedThread.messages.push({
        id: selectedThread.messages.length + 1,
        sender: user.role,
        text: message,
        date: new Date().toISOString().slice(0, 16).replace('T', ' ')
      });
      setMessage('');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, p: 3 }}>
      <Paper sx={{ minWidth: 300, maxWidth: 350, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Fils de discussion</Typography>
        <List>
          {threads.filter(t => t.patientId === user.id || t.doctorId === user.id).map(thread => (
            <ListItem button key={thread.id} selected={selectedThread?.id === thread.id} onClick={() => handleSelectThread(thread)}>
              <ListItemText primary={thread.subject} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Paper sx={{ flex: 1, p: 2, minHeight: 350 }}>
        {selectedThread ? (
          <>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>{selectedThread.subject}</Typography>
            <List sx={{ mb: 2 }}>
              {selectedThread.messages.map(msg => (
                <ListItem key={msg.id} alignItems="flex-start">
                  <ListItemText primary={msg.text} secondary={msg.sender + ' - ' + msg.date} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField fullWidth size="small" value={message} onChange={e => setMessage(e.target.value)} placeholder="Votre message..." />
              <Button variant="contained" onClick={handleSend}>Envoyer</Button>
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">Sélectionnez un fil pour afficher les messages.</Typography>
        )}
      </Paper>
    </Box>
  );
}
