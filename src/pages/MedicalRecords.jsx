import React, { useState, useContext } from 'react';
import { records } from '../mockDataRecords';
import { LangContext } from '../contexts/LangContextDef.js';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, TextField } from '@mui/material';

export default function MedicalRecords({ user }) {
  const record = records.find(r => r.patientId === user.id);
  const [docName, setDocName] = useState('');
  const { lang } = useContext(LangContext);

  const t = {
    fr: {
      title: 'Dossier médical',
      history: 'Historique',
      documents: 'Documents',
      view: 'Voir',
      add: 'Ajouter',
      docName: 'Nom du document',
      noHistory: 'Aucun historique',
      noDocs: 'Aucun document',
    },
    en: {
      title: 'Medical Records',
      history: 'History',
      documents: 'Documents',
      view: 'View',
      add: 'Add',
      docName: 'Document name',
      noHistory: 'No history',
      noDocs: 'No document',
    }
  }[lang] || t.fr;

  const handleUpload = () => {
    if (docName && record) {
      record.documents.push({ id: record.documents.length + 1, name: docName, url: '#' });
      setDocName('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>{t.title}</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">{t.history}</Typography>
        <List>
          {record?.history.length ? record.history.map((h, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={h.date + ' - ' + h.type} secondary={h.doctor + ' : ' + h.notes} />
            </ListItem>
          )) : <ListItem><ListItemText primary={t.noHistory} /></ListItem>}
        </List>
      </Paper>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold">{t.documents}</Typography>
        <List>
          {record?.documents.length ? record.documents.map(doc => (
            <ListItem key={doc.id}>
              <ListItemText primary={doc.name} />
              <Button variant="outlined" size="small" href={doc.url} target="_blank">{t.view}</Button>
            </ListItem>
          )) : <ListItem><ListItemText primary={t.noDocs} /></ListItem>}
        </List>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <TextField size="small" label={t.docName} value={docName} onChange={e => setDocName(e.target.value)} />
          <Button variant="contained" onClick={handleUpload}>{t.add}</Button>
        </Box>
      </Paper>
    </Box>
  );
}
