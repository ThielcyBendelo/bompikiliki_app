// Mock dossiers médicaux
export const records = [
  {
    patientId: 1,
    history: [
      { date: '2025-10-01', type: 'consultation', doctor: 'Dr. Jean Dupont', notes: 'Suivi tension artérielle.' },
      { date: '2025-10-15', type: 'ordonnance', doctor: 'Dr. Jean Dupont', notes: 'Prescription antihypertenseur.' }
    ],
    documents: [
      { id: 1, name: 'analyse_octobre.pdf', url: '#' }
    ]
  },
  {
    patientId: 6,
    history: [
      { date: '2025-09-20', type: 'consultation', doctor: 'Dr. Karim El', notes: 'Contrôle pédiatrique.' }
    ],
    documents: []
  }
]
