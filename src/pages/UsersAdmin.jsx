import React, { useEffect, useState } from 'react';
import { api } from '../api/apiService';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Paper, IconButton, TableContainer } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const [editIdx, setEditIdx] = useState(null);

  useEffect(() => { api.getUsers().then(setUsers); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    const newUser = await api.createUser(form);
    setUsers([...users, newUser]);
    setForm({ name: '', email: '', password: '', role: 'patient' });
  };

  const handleEdit = idx => { setEditIdx(idx); setForm(users[idx]); };

  const handleUpdate = async () => {
    const id = users[editIdx].id;
    const updated = await api.updateUser(id, form);
    setUsers(users.map((u, i) => i === editIdx ? updated : u));
    setEditIdx(null); setForm({ name: '', email: '', password: '', role: 'patient' });
  };

  const handleDelete = async idx => {
    const id = users[idx].id;
    await api.deleteUser(id);
    setUsers(users.filter((_, i) => i !== idx));
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 4 }, py: { xs: 2, sm: 4 }, width: '100%' }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ fontSize: { xs: 22, sm: 28, md: 36 } }}>Gestion des utilisateurs</Typography>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3, maxWidth: { xs: '100%', sm: 700 }, mx: 'auto' }}>
        <Typography variant="h6" mb={2} sx={{ fontSize: { xs: 16, sm: 20 } }}>{editIdx !== null ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField label="Nom" name="name" value={form.name} onChange={handleChange} size="small" />
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} size="small" />
          <TextField label="Mot de passe" name="password" value={form.password} onChange={handleChange} size="small" type="password" />
          <TextField label="Rôle" name="role" value={form.role} onChange={handleChange} size="small" />
          {editIdx !== null ? (
            <Button variant="contained" color="primary" onClick={handleUpdate}>Mettre à jour</Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleCreate}>Ajouter</Button>
          )}
        </Box>
      </Paper>
      <TableContainer component={Paper} sx={{ maxHeight: 400, overflowX: 'auto', boxShadow: 1 }}>
        <Table stickyHeader sx={{ minWidth: 400 }}>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, idx) => (
              <TableRow key={u.id || idx}>
                <TableCell sx={{ fontSize: { xs: 13, sm: 15 } }}>{u.name}</TableCell>
                <TableCell sx={{ fontSize: { xs: 13, sm: 15 } }}>{u.email}</TableCell>
                <TableCell sx={{ fontSize: { xs: 13, sm: 15 } }}>{u.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(idx)} size="small"><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(idx)} size="small"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
