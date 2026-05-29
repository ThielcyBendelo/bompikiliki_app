import React, { useState } from 'react';
import { Box, Typography, Paper, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { appointments, mockPayments, users, doctors } from '../mockData';

const COLORS = ['#1976d2', '#388e3c', '#fbc02d', '#d32f2f', '#7b1fa2'];

function getStatsData() {
  // Simule les stats (le paramètre period pourra être utilisé pour filtrer dans une version avancée)
  // Préparer les données pour le graphique rendez-vous par mois
  const monthlyCounts = {};
  appointments.forEach(a => {
    const [year, month] = a.date.split('-');
    const key = `${year}-${month}`;
    monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
  });
  const chartData = Object.entries(monthlyCounts).map(([month, value]) => ({ label: month, value }));

  return {
    appointments: appointments.length,
    patients: users.filter(u => u.role === 'patient').length,
    doctors: doctors.length,
    payments: mockPayments.reduce((sum, p) => sum + Number(p.amount), 0),
    topDoctors: doctors.slice(0, 3),
    topExams: [],
    chartData,
  };
}

export default function DashboardStatistiques() {
  const [period, setPeriod] = useState('mois');
  const stats = getStatsData(period);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} color="primary">Dashboard Statistiques</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
          <Box>
            <Typography variant="subtitle1">Rendez-vous</Typography>
            <Typography variant="h5" color="secondary">{stats.appointments}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Patients</Typography>
            <Typography variant="h5" color="secondary">{stats.patients}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Médecins</Typography>
            <Typography variant="h5" color="secondary">{stats.doctors}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1">Revenus (€)</Typography>
            <Typography variant="h5" color="secondary">{stats.payments}</Typography>
          </Box>
        </Stack>
      </Paper>
      <FormControl sx={{ mb: 2, minWidth: 180 }}>
        <InputLabel>Période</InputLabel>
        <Select value={period} label="Période" onChange={e => setPeriod(e.target.value)}>
          <MenuItem value="mois">Ce mois</MenuItem>
          <MenuItem value="annee">Cette année</MenuItem>
          <MenuItem value="custom">Personnalisé</MenuItem>
        </Select>
      </FormControl>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" mb={2}>Rendez-vous par mois</Typography>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={stats.chartData}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#1976d2" name="Rendez-vous" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" mb={2}>Top médecins</Typography>
        <Stack direction="row" spacing={2}>
          {stats.topDoctors.map((doc) => (
            <Box key={doc.id} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2 }}>
              <Typography variant="body1">{doc.name}</Typography>
              <Typography variant="body2" color="secondary">Spécialité: {doc.specialty}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
      {/* Ajout d'autres graphiques/statistiques ici */}
    </Box>
  );
}
