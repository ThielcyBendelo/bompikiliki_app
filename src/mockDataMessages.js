// Mock des fils de discussion et messages
export const threads = [
  {
    id: 1,
    patientId: 1,
    doctorId: 2,
    subject: "Suivi consultation cardiologie",
    messages: [
      { id: 1, sender: "patient", text: "Bonjour docteur, j'ai une question sur mon traitement.", date: "2025-11-10 09:00" },
      { id: 2, sender: "medecin", text: "Bonjour, je vous écoute.", date: "2025-11-10 09:05" }
    ]
  },
  {
    id: 2,
    patientId: 6,
    doctorId: 7,
    subject: "Demande de rendez-vous pédiatrie",
    messages: [
      { id: 1, sender: "patient", text: "Bonjour, puis-je prendre rendez-vous pour mon enfant ?", date: "2025-11-12 14:00" },
      { id: 2, sender: "medecin", text: "Oui, bien sûr. Quel âge a-t-il ?", date: "2025-11-12 14:02" }
    ]
  }
]
