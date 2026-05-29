import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Avatar, Stack, MenuItem, Select } from '@mui/material';

const mockUser = {
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  role: 'patient',
  language: 'fr',
  avatar: '',
};

export default function ParametresProfil() {
  const [user, setUser] = useState(mockUser);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(user);

  const handleEdit = () => {
    setEdit(true);
    setForm(user);
  };
  const handleCancel = () => setEdit(false);
  const handleSave = () => {
    setUser(form);
    setEdit(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">Paramètres & Profil</Typography>
      <Paper sx={{ p: 3, mb: 3, maxWidth: 400 }}>
        <Stack spacing={2} alignItems="center">
          <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
          {!edit ? (
            <>
              <Typography variant="h6">{user.name}</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">Rôle : {user.role}</Typography>
              <Typography variant="body2">Langue : {user.language}</Typography>
              <Button variant="contained" color="primary" onClick={handleEdit}>Modifier</Button>
            </>
          ) : (
            <>
              <TextField label="Nom" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
              <TextField label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} fullWidth />
              <TextField label="Avatar (URL)" value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} fullWidth />
              <Select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} fullWidth>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="en">English</MenuItem>
              </Select>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>Enregistrer</Button>
                <Button variant="outlined" onClick={handleCancel}>Annuler</Button>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
