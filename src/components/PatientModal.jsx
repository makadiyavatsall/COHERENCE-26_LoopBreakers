import { X, User, Pill, Activity, FlaskConical } from 'lucide-react';
import { matches, clinicalTrials } from '../data/mockData';

function getBarColor(score) {
  if (score >= 90) return 'from-emerald-400 to-emerald-500';
  if (score >= 80) return 'from-sky-400 to-sky-500';
  if (score >= 70) return 'from-amber-400 to-amber-500';
  return 'from-red-400 to-red-500';
}

export default function PatientModal({ patient, onClose }) {
  // Find recommended trials for this patient
  const recommendedTrials = matches
    .filter(m => m.patients.some(p => p.patientId === patient.id))
    .map(m => {
      const matchInfo = m.patients.find(p => p.patientId === patient.id);
      const trial = clinicalTrials.find(t => t.id === m.trialId);
      return {
        trialName: m.trialName,
        matchScore: matchInfo.matchScore,
        disease: trial?.disease,
        ageRange: trial?.ageRange,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[85vh] overflow-hidden fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{patient.id}</h2>
              <p className="text-sm text-sky-100">Age {patient.age} · {patient.disease}</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Patient Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conditions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.conditions.map(c => (
                  <span key={c} className="text-xs text-slate-700 bg-white px-2.5 py-1 rounded-lg ring-1 ring-slate-200">{c}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="w-4 h-4 text-violet-500" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Medications</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {patient.medications.map(m => (
                  <span key={m} className="text-xs text-slate-700 bg-white px-2.5 py-1 rounded-lg ring-1 ring-slate-200">{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-600">Eligibility Status:</span>
            <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
              patient.status === 'Eligible'
                ? 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200'
                : 'text-red-700 bg-red-50 ring-1 ring-red-200'
            }`}>
              {patient.status}
            </span>
          </div>

          {/* Recommended Trials */}
          {recommendedTrials.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-sky-500" />
                <h3 className="text-sm font-bold text-slate-800">Recommended Trials</h3>
              </div>
              <div className="space-y-3">
                {recommendedTrials.map((trial, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4 hover:bg-sky-50/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">{trial.trialName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{trial.disease} · Age {trial.ageRange}</p>
                      </div>
                      <span className={`text-sm font-bold ${
                        trial.matchScore >= 90 ? 'text-emerald-600' : trial.matchScore >= 80 ? 'text-sky-600' : 'text-amber-600'
                      }`}>
                        {trial.matchScore}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${getBarColor(trial.matchScore)} match-bar-fill`}
                        style={{ '--bar-width': `${trial.matchScore}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
