import { useState } from 'react';
import { FlaskConical, Calendar, Users, ShieldOff, Eye, X } from 'lucide-react';
import { clinicalTrials, matches, getPatientById } from '../data/mockData';

function EligiblePatientsModal({ trial, matchData, onClose }) {
  return (
    <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{trial.name}</h2>
              <p className="text-sm text-slate-500 mt-1">Eligible patients based on AI matching</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-3 overflow-y-auto max-h-[60vh]">
          {matchData && matchData.patients.length > 0 ? matchData.patients.map((mp) => {
            const patient = getPatientById(mp.patientId);
            return (
              <div key={mp.patientId} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-sky-700">{mp.patientId.split('-')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{mp.patientId}</p>
                  <p className="text-xs text-slate-400">{patient?.disease} · Age {patient?.age}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold ${
                    mp.matchScore >= 90 ? 'text-emerald-600' : mp.matchScore >= 80 ? 'text-sky-600' : 'text-amber-600'
                  }`}>
                    {mp.matchScore}%
                  </span>
                  <div className="w-20 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full match-bar-fill ${
                        mp.matchScore >= 90 ? 'bg-emerald-500' : mp.matchScore >= 80 ? 'bg-sky-500' : 'bg-amber-500'
                      }`}
                      style={{ '--bar-width': `${mp.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          }) : (
            <p className="text-sm text-slate-400 text-center py-8">No eligible patients found for this trial.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClinicalTrials() {
  const [selectedTrial, setSelectedTrial] = useState(null);

  const statusColors = {
    'Recruiting': 'text-emerald-700 bg-emerald-50 ring-emerald-200',
    'Active': 'text-sky-700 bg-sky-50 ring-sky-200',
    'Completed': 'text-slate-600 bg-slate-100 ring-slate-200',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Clinical Trials</h1>
        <p className="text-sm text-slate-500 mt-1">{clinicalTrials.length} active trials in the system</p>
      </div>

      {/* Trial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clinicalTrials.map((trial, i) => {
          const matchData = matches.find(m => m.trialId === trial.id);
          const eligibleCount = matchData ? matchData.patients.length : 0;

          return (
            <div
              key={trial.id}
              className={`fade-in stagger-${(i % 4) + 1} bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col`}
              style={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100">
                  <FlaskConical className="w-5 h-5 text-violet-600" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${statusColors[trial.status] || statusColors['Active']}`}>
                  {trial.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug">{trial.name}</h3>
              <p className="text-xs text-slate-400 mb-4">{trial.sponsor}</p>

              {/* Details */}
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <div className="p-1 rounded bg-red-50">
                    <ShieldOff className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <span className="font-medium">Disease:</span>
                  <span className="text-slate-500">{trial.disease}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <div className="p-1 rounded bg-sky-50">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <span className="font-medium">Age Range:</span>
                  <span className="text-slate-500">{trial.ageRange}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                  <div className="p-1 rounded bg-amber-50">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <span className="font-medium">Start:</span>
                  <span className="text-slate-500">{trial.startDate}</span>
                </div>
              </div>

              {/* Exclusions */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Exclusion Conditions</p>
                <div className="flex flex-wrap gap-1.5">
                  {trial.exclusions.map(ex => (
                    <span key={ex} className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-md ring-1 ring-red-100">{ex}</span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedTrial(trial)}
                className="mt-5 w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 py-2.5 rounded-xl shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 transition-all"
              >
                <Eye className="w-4 h-4" />
                View Eligible Patients ({eligibleCount})
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedTrial && (
        <EligiblePatientsModal
          trial={selectedTrial}
          matchData={matches.find(m => m.trialId === selectedTrial.id)}
          onClose={() => setSelectedTrial(null)}
        />
      )}
    </div>
  );
}
