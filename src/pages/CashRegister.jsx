
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Box, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, TextField, Select, MenuItem, Alert, InputAdornment, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { Edit, Delete } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { mockPayments, mockExams } from '../mockData';

export default function CashRegister() {
  // ...existing code...
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // ...existing code...
  // Edition/Suppression
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({ type: '', amount: '', patient: '', exam: '', date: '' });
  const [deleteIdx, setDeleteIdx] = useState(null);
  const handleEditOpen = (idx) => {
    setEditIdx(idx);
    setEditData({ ...filteredPayments[idx] });
  };
  const handleEditClose = () => setEditIdx(null);
  const handleEditSave = () => {
    const updated = [...payments];
    const realIdx = payments.findIndex(p => p.date === filteredPayments[editIdx].date && p.patient === filteredPayments[editIdx].patient);
    updated[realIdx] = { ...editData };
    setPayments(updated);
    setEditIdx(null);
  };
  const handleDeleteOpen = (idx) => setDeleteIdx(idx);
  const handleDeleteClose = () => setDeleteIdx(null);
  const handleDeleteConfirm = () => {
    const toDelete = filteredPayments[deleteIdx];
    setPayments(payments.filter(p => !(p.date === toDelete.date && p.patient === toDelete.patient)));
    setDeleteIdx(null);
  };
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('consultation');
  const [amount, setAmount] = useState('');
  const [patient, setPatient] = useState('');
  const [exam, setExam] = useState('');
  const [success, setSuccess] = useState(false);
  const [payments, setPayments] = useState(mockPayments);
  // Filtres
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPatient, setFilterPatient] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const handleOpen = () => { setOpen(true); setSuccess(false); };
  const handleClose = () => setOpen(false);
  const handleAdd = () => {
    if (amount && patient && (type === 'consultation' || exam)) {
      setPayments([...payments, { type, amount, patient, exam: type === 'examen' ? exam : '', date: new Date().toLocaleString() }]);
      setSuccess(true);
      setTimeout(() => setOpen(false), 1200);
    }
  };

  const handleDownloadPDF = (p) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reçu de paiement', 20, 20);
    doc.setFontSize(12);
    doc.text(`Type: ${p.type}`, 20, 35);
    doc.text(`Patient: ${p.patient}`, 20, 45);
    doc.text(`Examen: ${p.exam || '-'}`, 20, 55);
    doc.text(`Montant: ${p.amount} €`, 20, 65);
    doc.text(`Date: ${p.date}`, 20, 75);
    doc.save(`recu_${p.patient}_${p.date.replace(/\s|:/g, '_')}.pdf`);
  };

  // Filtrage des paiements
  const filteredPayments = payments.filter(p => {
    const matchSearch = search === '' || p.patient.toLowerCase().includes(search.toLowerCase()) || p.type.toLowerCase().includes(search.toLowerCase()) || p.exam?.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === '' || p.type === filterType;
    const matchPatient = filterPatient === '' || p.patient === filterPatient;
    const matchDate = filterDate === '' || p.date.startsWith(filterDate);
    return matchSearch && matchType && matchPatient && matchDate;
  });

  // Liste unique des patients pour le filtre
  const patientList = Array.from(new Set(payments.map(p => p.patient)));

  // Préparation des données pour le graphique
  const monthlyData = {};
  filteredPayments.forEach(p => {
    const [datePart] = p.date.split(' ');
    const [year, month] = datePart.split('-');
    const key = `${year}-${month}`;
    monthlyData[key] = (monthlyData[key] || 0) + Number(p.amount);
  });
  const chartData = Object.entries(monthlyData).map(([month, total]) => ({ month, total }));

  // Calculs totaux
  const total = filteredPayments.reduce((sum, p) => sum + Number(p.amount), 0);
  const totalConsult = filteredPayments.filter(p => p.type === 'consultation').reduce((sum, p) => sum + Number(p.amount), 0);
  const totalExam = filteredPayments.filter(p => p.type === 'examen').reduce((sum, p) => sum + Number(p.amount), 0);

  // Export CSV
    // Paginated payments (après filteredPayments)
    const paginatedPayments = filteredPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handleExportCSV = () => {
    const header = 'Type,Patient,Examen,Montant,Date\n';
    const rows = filteredPayments.map(p => `${p.type},${p.patient},${p.exam || '-'},${p.amount},${p.date}`).join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'caisse_paiements.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Rapport PDF global
  const handleGlobalPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Rapport global de la caisse', 20, 20);
    doc.setFontSize(12);
    let y = 35;
    doc.text(`Total: ${total} €`, 20, y);
    y += 10;
    doc.text(`Consultations: ${totalConsult} €`, 20, y);
    y += 10;
    doc.text(`Examens: ${totalExam} €`, 20, y);
    y += 15;
    doc.text('Liste des paiements:', 20, y);
    y += 10;
    filteredPayments.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.type} | ${p.patient} | ${p.exam || '-'} | ${p.amount} € | ${p.date} | ${(Number(p.amount) % 2 === 0) ? 'Validé' : 'En attente'}`.substring(0, 90), 20, y);
      y += 8;
      if (y > 280) { doc.addPage(); y = 20; }
    });
    doc.save('rapport_caisse.pdf');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">Gestion de la caisse</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleOpen}>Ajouter paiement</Button>
        <Button variant="outlined" color="primary" onClick={handleExportCSV}>Exporter CSV</Button>
        <Button variant="outlined" color="success" onClick={handleGlobalPDF}>Rapport PDF global</Button>
      </Stack>
      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ width: '100%', height: 260, mb: 2 }}>
          <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>Revenus par mois</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#1976d2" name="Revenus (€)" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', gap: 4, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="subtitle1" color="primary">Solde total : <b>{total} €</b></Typography>
          <Typography variant="subtitle2" color="secondary">Consultations : <b>{totalConsult} €</b></Typography>
          <Typography variant="subtitle2" color="secondary">Examens : <b>{totalExam} €</b></Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                    <TextField
                      label="Montant min (€)"
                      value={minAmount}
                      onChange={e => setMinAmount(e.target.value)}
                      size="small"
                      sx={{ minWidth: 120 }}
                      type="number"
                    />
                    <TextField
                      label="Montant max (€)"
                      value={maxAmount}
                      onChange={e => setMaxAmount(e.target.value)}
                      size="small"
                      sx={{ minWidth: 120 }}
                      type="number"
                    />
          <TextField
            label="Recherche"
            value={search}
            onChange={e => setSearch(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
            InputProps={{ endAdornment: <InputAdornment position="end">🔍</InputAdornment> }}
          />
          <Select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            displayEmpty
            size="small"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">Type</MenuItem>
            <MenuItem value="consultation">Consultation</MenuItem>
            <MenuItem value="examen">Examen</MenuItem>
          </Select>
          <Select
            value={filterPatient}
            onChange={e => setFilterPatient(e.target.value)}
            displayEmpty
            size="small"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">Patient</MenuItem>
            {patientList.map((pat, i) => <MenuItem key={i} value={pat}>{pat}</MenuItem>)}
          </Select>
          <TextField
            label="Date (AAAA-MM-JJ)"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            size="small"
            sx={{ minWidth: 140 }}
          />
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Examen</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPayments.map((p, idx) => (
              <TableRow key={page * rowsPerPage + idx}>
                <TableCell>{p.type}</TableCell>
                <TableCell>{p.patient}</TableCell>
                <TableCell>{p.exam || '-'}</TableCell>
                <TableCell>{p.amount} €</TableCell>
                <TableCell>{p.date}</TableCell>
                <TableCell>{(Number(p.amount) % 2 === 0) ? 'Validé' : 'En attente'}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" size="small" onClick={() => handleDownloadPDF(p)}>
                    Télécharger PDF
                  </Button>
                  <IconButton color="info" size="small" onClick={() => handleEditOpen(page * rowsPerPage + idx)} sx={{ ml: 1 }}><Edit /></IconButton>
                  <IconButton color="error" size="small" onClick={() => handleDeleteOpen(page * rowsPerPage + idx)} sx={{ ml: 1 }}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
                        <TablePagination
                          component="div"
                          count={filteredPayments.length}
                          page={page}
                          onPageChange={handleChangePage}
                          rowsPerPage={rowsPerPage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                {/* Modale édition paiement */}
                <Dialog open={editIdx !== null} onClose={handleEditClose}>
                  <DialogTitle>Modifier le paiement</DialogTitle>
                  <DialogContent>
                    <Select value={editData.type} onChange={e => setEditData(d => ({ ...d, type: e.target.value }))} fullWidth sx={{ mb: 2 }}>
                      <option value="consultation">Consultation</option>
                      <option value="examen">Examen</option>
                    </Select>
                    <TextField label="Patient" value={editData.patient} onChange={e => setEditData(d => ({ ...d, patient: e.target.value }))} fullWidth sx={{ mb: 2 }} />
                    {editData.type === 'examen' && (
                      <Select value={editData.exam} onChange={e => setEditData(d => ({ ...d, exam: e.target.value }))} fullWidth sx={{ mb: 2 }}>
                        <option value="">Choisir examen</option>
                        {mockExams.map((ex, i) => <option key={i} value={ex}>{ex}</option>)}
                      </Select>
                    )}
                    <TextField label="Montant (€)" type="number" value={editData.amount} onChange={e => setEditData(d => ({ ...d, amount: e.target.value }))} fullWidth sx={{ mb: 2 }} />
                    <TextField label="Date" value={editData.date} onChange={e => setEditData(d => ({ ...d, date: e.target.value }))} fullWidth sx={{ mb: 2 }} />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleEditClose}>Annuler</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">Enregistrer</Button>
                  </DialogActions>
                </Dialog>
                {/* Modale suppression paiement */}
                <Dialog open={deleteIdx !== null} onClose={handleDeleteClose}>
                  <DialogTitle>Confirmer la suppression</DialogTitle>
                  <DialogContent>Voulez-vous vraiment supprimer ce paiement ?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleDeleteClose}>Annuler</Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error">Supprimer</Button>
                  </DialogActions>
                </Dialog>
          </TableBody>
        </Table>
      </Paper>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-caisse">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, minWidth: 320 }}>
          <Typography id="modal-caisse" variant="h6" fontWeight="bold" mb={2} color="primary">Ajouter un paiement</Typography>
          <Select value={type} onChange={e => setType(e.target.value)} fullWidth sx={{ mb: 2 }}>
            <MenuItem value="consultation">Consultation</MenuItem>
            <MenuItem value="examen">Examen</MenuItem>
          </Select>
          <TextField label="Patient" value={patient} onChange={e => setPatient(e.target.value)} fullWidth sx={{ mb: 2 }} />
          {type === 'examen' && (
            <Select value={exam} onChange={e => setExam(e.target.value)} fullWidth sx={{ mb: 2 }}>
              {mockExams.map((ex, i) => <MenuItem key={i} value={ex}>{ex}</MenuItem>)}
            </Select>
          )}
          <TextField label="Montant (€)" type="number" value={amount} onChange={e => setAmount(e.target.value)} fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" color="secondary" onClick={handleAdd} fullWidth disabled={!amount || !patient || (type === 'examen' && !exam)}>Valider</Button>
          {success && <Alert severity="success" sx={{ mt: 2 }}>Paiement enregistré !</Alert>}
        </Box>
      </Modal>
    </Box>
  );
}
