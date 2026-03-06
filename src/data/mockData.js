// ── Patients ──────────────────────────────────────────
export const patients = [
  { id: 'P-1021', age: 58, disease: 'Type 2 Diabetes', conditions: ['Hypertension', 'Obesity'], medications: ['Metformin', 'Lisinopril'], status: 'Eligible' },
  { id: 'P-8765', age: 45, disease: 'Type 2 Diabetes', conditions: ['High Cholesterol'], medications: ['Insulin', 'Atorvastatin'], status: 'Eligible' },
  { id: 'P-3452', age: 62, disease: 'Type 2 Diabetes', conditions: ['Neuropathy'], medications: ['Metformin', 'Gabapentin'], status: 'Eligible' },
  { id: 'P-2198', age: 34, disease: 'Breast Cancer', conditions: ['Anemia'], medications: ['Tamoxifen', 'Iron Supplements'], status: 'Eligible' },
  { id: 'P-5567', age: 41, disease: 'Breast Cancer', conditions: ['Fatigue', 'Nausea'], medications: ['Letrozole'], status: 'Not Eligible' },
  { id: 'P-7734', age: 52, disease: 'Lung Cancer', conditions: ['COPD', 'Hypertension'], medications: ['Pembrolizumab', 'Amlodipine'], status: 'Not Eligible' },
  { id: 'P-9012', age: 67, disease: 'Lung Cancer', conditions: ['Emphysema'], medications: ['Osimertinib'], status: 'Eligible' },
  { id: 'P-4401', age: 29, disease: 'Rheumatoid Arthritis', conditions: ['Joint Stiffness', 'Fatigue'], medications: ['Methotrexate', 'Prednisone'], status: 'Eligible' },
  { id: 'P-6623', age: 55, disease: 'Rheumatoid Arthritis', conditions: ['Osteoporosis'], medications: ['Adalimumab'], status: 'Eligible' },
  { id: 'P-1190', age: 73, disease: 'Alzheimer\'s', conditions: ['Memory Loss', 'Confusion'], medications: ['Donepezil', 'Memantine'], status: 'Eligible' },
  { id: 'P-3378', age: 68, disease: 'Alzheimer\'s', conditions: ['Depression', 'Insomnia'], medications: ['Rivastigmine', 'Sertraline'], status: 'Not Eligible' },
  { id: 'P-2045', age: 48, disease: 'Chronic Kidney Disease', conditions: ['Hypertension', 'Edema'], medications: ['Losartan', 'Furosemide'], status: 'Eligible' },
  { id: 'P-8891', age: 37, disease: 'Asthma', conditions: ['Allergies', 'Sinusitis'], medications: ['Fluticasone', 'Montelukast'], status: 'Eligible' },
  { id: 'P-5504', age: 60, disease: 'Heart Failure', conditions: ['Arrhythmia', 'Edema'], medications: ['Carvedilol', 'Spironolactone'], status: 'Eligible' },
  { id: 'P-7210', age: 44, disease: 'Multiple Sclerosis', conditions: ['Numbness', 'Vision Issues'], medications: ['Ocrelizumab'], status: 'Eligible' },
];

// ── Clinical Trials ──────────────────────────────────
export const clinicalTrials = [
  { id: 'CT-001', name: 'Diabetes Drug Trial — Phase III', disease: 'Type 2 Diabetes', ageRange: '40–70', exclusions: ['Liver Disease', 'Pregnancy'], sponsor: 'PharmaCorp', startDate: '2026-01-15', status: 'Recruiting' },
  { id: 'CT-002', name: 'Breast Cancer Immunotherapy Study', disease: 'Breast Cancer', ageRange: '25–55', exclusions: ['Heart Disease', 'Renal Failure'], sponsor: 'OncoGen Labs', startDate: '2026-02-01', status: 'Recruiting' },
  { id: 'CT-003', name: 'Lung Cancer Targeted Therapy', disease: 'Lung Cancer', ageRange: '45–75', exclusions: ['COPD Stage IV', 'Liver Failure'], sponsor: 'BioMedica', startDate: '2026-02-20', status: 'Active' },
  { id: 'CT-004', name: 'Rheumatoid Arthritis Biologic Trial', disease: 'Rheumatoid Arthritis', ageRange: '20–65', exclusions: ['Tuberculosis', 'Hepatitis'], sponsor: 'ImmunoTech', startDate: '2026-03-01', status: 'Recruiting' },
  { id: 'CT-005', name: 'Early Alzheimer\'s Intervention Study', disease: 'Alzheimer\'s', ageRange: '60–85', exclusions: ['Severe Depression', 'Epilepsy'], sponsor: 'NeuroVita', startDate: '2025-11-10', status: 'Active' },
  { id: 'CT-006', name: 'CKD Progression Slowdown Trial', disease: 'Chronic Kidney Disease', ageRange: '30–70', exclusions: ['Dialysis', 'Transplant History'], sponsor: 'RenalCare Inc', startDate: '2026-01-05', status: 'Recruiting' },
  { id: 'CT-007', name: 'Asthma Biologic Therapy — Phase II', disease: 'Asthma', ageRange: '18–60', exclusions: ['Smoking', 'COPD'], sponsor: 'RespiGen', startDate: '2026-03-05', status: 'Recruiting' },
  { id: 'CT-008', name: 'Heart Failure Gene Therapy Pilot', disease: 'Heart Failure', ageRange: '40–75', exclusions: ['Cancer', 'Stroke History'], sponsor: 'CardioNova', startDate: '2026-02-15', status: 'Active' },
];

// ── Matches ──────────────────────────────────────────
export const matches = [
  { trialId: 'CT-001', trialName: 'Diabetes Drug Trial — Phase III', patients: [
      { patientId: 'P-1021', matchScore: 95 },
      { patientId: 'P-8765', matchScore: 90 },
      { patientId: 'P-3452', matchScore: 88 },
    ]
  },
  { trialId: 'CT-002', trialName: 'Breast Cancer Immunotherapy Study', patients: [
      { patientId: 'P-2198', matchScore: 93 },
      { patientId: 'P-5567', matchScore: 72 },
    ]
  },
  { trialId: 'CT-003', trialName: 'Lung Cancer Targeted Therapy', patients: [
      { patientId: 'P-9012', matchScore: 91 },
      { patientId: 'P-7734', matchScore: 65 },
    ]
  },
  { trialId: 'CT-004', trialName: 'Rheumatoid Arthritis Biologic Trial', patients: [
      { patientId: 'P-4401', matchScore: 97 },
      { patientId: 'P-6623', matchScore: 89 },
    ]
  },
  { trialId: 'CT-005', trialName: 'Early Alzheimer\'s Intervention Study', patients: [
      { patientId: 'P-1190', matchScore: 94 },
      { patientId: 'P-3378', matchScore: 60 },
    ]
  },
  { trialId: 'CT-006', trialName: 'CKD Progression Slowdown Trial', patients: [
      { patientId: 'P-2045', matchScore: 92 },
    ]
  },
  { trialId: 'CT-007', trialName: 'Asthma Biologic Therapy — Phase II', patients: [
      { patientId: 'P-8891', matchScore: 96 },
    ]
  },
  { trialId: 'CT-008', trialName: 'Heart Failure Gene Therapy Pilot', patients: [
      { patientId: 'P-5504', matchScore: 87 },
    ]
  },
];

// ── Chart Data (Matches Over Time) ───────────────────
export const matchesOverTime = [
  { month: 'Sep', matches: 12 },
  { month: 'Oct', matches: 19 },
  { month: 'Nov', matches: 25 },
  { month: 'Dec', matches: 31 },
  { month: 'Jan', matches: 38 },
  { month: 'Feb', matches: 45 },
  { month: 'Mar', matches: 52 },
];

// ── Recent Matches (for Dashboard Table) ─────────────
export const recentMatches = [
  { patientId: 'P-4401', patientDisease: 'Rheumatoid Arthritis', trialName: 'RA Biologic Trial', matchScore: 97, date: '2026-03-05' },
  { patientId: 'P-8891', patientDisease: 'Asthma', trialName: 'Asthma Biologic Therapy', matchScore: 96, date: '2026-03-05' },
  { patientId: 'P-1021', patientDisease: 'Type 2 Diabetes', trialName: 'Diabetes Drug Trial', matchScore: 95, date: '2026-03-04' },
  { patientId: 'P-1190', patientDisease: 'Alzheimer\'s', trialName: 'Alzheimer\'s Intervention', matchScore: 94, date: '2026-03-04' },
  { patientId: 'P-2198', patientDisease: 'Breast Cancer', trialName: 'Breast Cancer Immunotherapy', matchScore: 93, date: '2026-03-03' },
  { patientId: 'P-2045', patientDisease: 'CKD', trialName: 'CKD Progression Trial', matchScore: 92, date: '2026-03-03' },
];

// Helper: get patient by ID
export const getPatientById = (id) => patients.find(p => p.id === id);

// Helper: get unique diseases
export const getDiseases = () => [...new Set(patients.map(p => p.disease))];
