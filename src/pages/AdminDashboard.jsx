import React, { useContext } from 'react';
import { users, doctors, appointments } from '../mockData';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Grid } from '@mui/material';
import { LangContext } from '../contexts/LangContextDef.js';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { lang } = useContext(LangContext);
  const t = {
    fr: {
      title: 'Dashboard Admin',
      stats: 'Statistiques',
      users: 'Utilisateurs',
      doctors: 'Médecins',
      appointments: 'Rendez-vous',
      listUsers: 'Liste des utilisateurs',
      listDoctors: 'Liste des médecins',
    },
    en: {
      title: 'Admin Dashboard',
      stats: 'Statistics',
      users: 'Users',
      doctors: 'Doctors',
      appointments: 'Appointments',
      listUsers: 'User list',
      listDoctors: 'Doctor list',
    }
  }[lang] || t.fr;

  // Préparation des données pour les graphiques
  const roleData = Object.entries(users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {})).map(([role, value]) => ({ name: role, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const appointmentsData = appointments.map(a => ({ name: a.doctor, value: 1 }));

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, maxWidth: { xs: '100%', sm: 900, md: 1100 }, mx: 'auto' }} elevation={4}>
        <Typography variant="h5" fontWeight="bold" mb={2} color="primary">
          {t.title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" mb={2}>{t.stats}</Typography>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{t.users}</Typography>
              <Typography variant="h4" color="primary">{users.length}</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={roleData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                    {roleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{t.doctors}</Typography>
              <Typography variant="h4" color="primary">{doctors.length}</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={doctors.map(d => ({ name: d.name, value: 1 }))}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Bar dataKey="value" fill="#8884d8" />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{t.appointments}</Typography>
              <Typography variant="h4" color="primary">{appointments.length}</Typography>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={appointmentsData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Bar dataKey="value" fill="#00C49F" />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h6" mb={1}>{t.listUsers}</Typography>
        <List>
          {users.map(u => (
            <ListItem key={u.id}>
              <ListItemText primary={`${u.name} (${u.role})`} secondary={u.email} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" mb={1}>{t.listDoctors}</Typography>
        <List>
          {doctors.map(d => (
            <ListItem key={d.id}>
              <ListItemText primary={d.name} secondary={d.specialty} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
