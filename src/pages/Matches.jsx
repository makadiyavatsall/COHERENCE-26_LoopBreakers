import { FlaskConical, Sparkles } from 'lucide-react';
import { matches, getPatientById } from '../data/mockData';

function getBarColor(score) {
  if (score >= 90) return 'from-emerald-400 to-emerald-500';
  if (score >= 80) return 'from-sky-400 to-sky-500';
  if (score >= 70) return 'from-amber-400 to-amber-500';
  return 'from-red-400 to-red-500';
}

function getBadgeColor(score) {
  if (score >= 90) return 'text-emerald-700 bg-emerald-50';
  if (score >= 80) return 'text-sky-700 bg-sky-50';
  if (score >= 70) return 'text-amber-700 bg-amber-50';
  return 'text-red-700 bg-red-50';
}

export default function Matches() {
  const totalMatches = matches.reduce((acc, m) => acc + m.patients.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AI Matching Results</h1>
          <p className="text-sm text-slate-500 mt-1">{totalMatches} patients matched across {matches.length} trials</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-violet-700 bg-violet-50 px-4 py-2 rounded-xl">
          <Sparkles className="w-4 h-4" />
          Powered by AI
        </div>
      </div>

      {/* Match Groups */}
      <div className="space-y-6">
        {matches.map((group, gi) => (
          <div
            key={group.trialId}
            className={`fade-in stagger-${(gi % 4) + 1} bg-white rounded-2xl border border-slate-100 overflow-hidden`}
            style={{ opacity: 0 }}
          >
            {/* Trial Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-sky-50/50 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-md shadow-sky-200">
                  <FlaskConical className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-800">{group.trialName}</h2>
                  <p className="text-xs text-slate-500">{group.patients.length} eligible patients found</p>
                </div>
              </div>
            </div>

            {/* Patient Rows */}
            <div className="divide-y divide-slate-50">
              {group.patients.map((mp) => {
                const patient = getPatientById(mp.patientId);
                return (
                  <div key={mp.patientId} className="flex items-center gap-4 px-6 py-4 hover:bg-sky-50/30 transition-colors">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-sky-700">{mp.patientId.split('-')[1]}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-700">{mp.patientId}</p>
                        {patient && (
                          <span className="text-xs text-slate-400">· {patient.disease} · Age {patient.age}</span>
                        )}
                      </div>
                      {/* Score Bar */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${getBarColor(mp.matchScore)} match-bar-fill`}
                            style={{ '--bar-width': `${mp.matchScore}%` }}
                          />
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getBadgeColor(mp.matchScore)}`}>
                          {mp.matchScore}% match
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
