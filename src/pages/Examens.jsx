import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Modal, TextField, Stack, IconButton } from '@mui/material';
import { Edit, Delete, PictureAsPdf, FileDownload } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import { mockExams } from '../mockData';

export default function Examens() {
  const [exams, setExams] = useState(mockExams);
  const [filterDate, setFilterDate] = useState('');
  const [filterPaid, setFilterPaid] = useState('');
  const patientList = Array.from(new Set(exams.map(e => e.patient)));
  const [filterPatient, setFilterPatient] = useState('');
  // Filtrage des examens
  let filteredExams = exams;
  if (filterPatient) filteredExams = filteredExams.filter(e => e.patient === filterPatient);
  if (filterDate) filteredExams = filteredExams.filter(e => e.date === filterDate);
  if (filterPaid) filteredExams = filteredExams.filter(e => filterPaid === 'payé' ? e.paid : !e.paid);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ patient: '', name: '', date: '', result: '', paid: false });

  // Ajout/édition
  const handleOpen = (exam = null, idx = null) => {
    setOpen(true);
    setEditIdx(idx);
    setForm(exam ? { ...exam } : { patient: '', name: '', date: '', result: '', paid: false });
  };
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    if (editIdx !== null) {
      const updated = [...exams];
      updated[editIdx] = { ...form };
      setExams(updated);
    } else {
      setExams([...exams, { ...form }]);
    }
    setOpen(false);
  };
  // Suppression
  const handleDelete = idx => {
    setExams(exams.filter((_, i) => i !== idx));
  };
  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Liste des examens médicaux', 20, 20);
    doc.setFontSize(12);
    let y = 35;
    exams.forEach((e, i) => {
      doc.text(`${i + 1}. ${e.patient} | ${e.name} | ${e.date} | ${e.result || '-'} | ${e.paid ? 'Payé' : 'Non payé'}`.substring(0, 90), 20, y);
      y += 8;
      if (y > 280) { doc.addPage(); y = 20; }
    });
    doc.save('examens.pdf');
  };
  // Export CSV
  const handleExportCSV = () => {
    const header = 'Patient,Examen,Date,Résultat,Payé\n';
    const rows = exams.map(e => `${e.patient},${e.name},${e.date},${e.result || '-'},${e.paid ? 'Oui' : 'Non'}`).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'examens.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">Gestion des examens médicaux</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => handleOpen()}>Ajouter examen</Button>
        <Button variant="outlined" color="primary" startIcon={<FileDownload />} onClick={handleExportCSV}>Exporter CSV</Button>
        <Button variant="outlined" color="success" startIcon={<PictureAsPdf />} onClick={handleExportPDF}>Exporter PDF</Button>
        <TextField
          select
          label="Filtrer par patient"
          value={filterPatient}
          onChange={e => setFilterPatient(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <option value="">Tous</option>
          {patientList.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </TextField>
        <TextField
          label="Filtrer par date"
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
          sx={{ minWidth: 180 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Statut paiement"
          value={filterPaid}
          onChange={e => setFilterPaid(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <option value="">Tous</option>
          <option value="payé">Payé</option>
          <option value="nonpayé">Non payé</option>
        </TextField>
      </Stack>
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Examen</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Résultat</TableCell>
              <TableCell>Payé</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExams.map((e, idx) => (
              <TableRow key={idx}>
                <TableCell>{e.patient}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.result || '-'}</TableCell>
                <TableCell>{e.paid ? 'Oui' : 'Non'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(e, idx)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(idx)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, minWidth: 320, mx: 'auto', mt: 8 }}>
          <Typography variant="h6" mb={2}>{editIdx !== null ? 'Modifier' : 'Ajouter'} un examen</Typography>
          <Stack spacing={2}>
            <TextField label="Patient" value={form.patient} onChange={e => setForm(f => ({ ...f, patient: e.target.value }))} fullWidth />
            <TextField label="Examen" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
            <TextField label="Date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="Résultat" value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))} fullWidth />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography>Payé :</Typography>
              <Button variant={form.paid ? 'contained' : 'outlined'} color={form.paid ? 'success' : 'inherit'} onClick={() => setForm(f => ({ ...f, paid: !f.paid }))}>{form.paid ? 'Oui' : 'Non'}</Button>
            </Stack>
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
