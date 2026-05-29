import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Modal, TextField, Stack, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const initialPatients = [
  { id: 1, name: 'Jean Dupont', age: 45, gender: 'Homme', address: 'Paris', phone: '0601020304', disease: 'Hypertension' },
  { id: 2, name: 'Alice Martin', age: 32, gender: 'Femme', address: 'Lyon', phone: '0605060708', disease: 'Diabète' },
];

export default function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', age: '', gender: '', address: '', phone: '', disease: '' });

  const handleOpen = (patient = null, idx = null) => {
    setOpen(true);
    setEditIdx(idx);
    setForm(patient ? { ...patient } : { name: '', age: '', gender: '', address: '', phone: '', disease: '' });
  };
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    if (editIdx !== null) {
      const updated = [...patients];
      updated[editIdx] = { ...form };
      setPatients(updated);
    } else {
      setPatients([...patients, { ...form, id: patients.length + 1 }]);
    }
    setOpen(false);
  };
  const handleDelete = idx => {
    setPatients(patients.filter((_, i) => i !== idx));
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">Gestion des patients et malades</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => handleOpen()}>Ajouter patient</Button>
      </Stack>
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Âge</TableCell>
              <TableCell>Sexe</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Maladie</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.age}</TableCell>
                <TableCell>{p.gender}</TableCell>
                <TableCell>{p.address}</TableCell>
                <TableCell>{p.phone}</TableCell>
                <TableCell>{p.disease}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(p, idx)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(idx)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, minWidth: 320, mx: 'auto', mt: 8 }}>
          <Typography variant="h6" mb={2}>{editIdx !== null ? 'Modifier' : 'Ajouter'} un patient</Typography>
          <Stack spacing={2}>
            <TextField label="Nom" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
            <TextField label="Âge" type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))} fullWidth />
            <TextField label="Sexe" value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))} fullWidth />
            <TextField label="Adresse" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} fullWidth />
            <TextField label="Téléphone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} fullWidth />
            <TextField label="Maladie" value={form.disease} onChange={e => setForm(f => ({ ...f, disease: e.target.value }))} fullWidth />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="primary" onClick={handleSave}>Enregistrer</Button>
              <Button variant="outlined" onClick={handleClose}>Annuler</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
