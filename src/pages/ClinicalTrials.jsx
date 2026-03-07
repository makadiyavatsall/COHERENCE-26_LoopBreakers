import { useState, useEffect } from 'react';
import { FlaskConical, Users, ShieldOff, Eye, X, CheckCircle, XCircle, ChevronDown, ChevronUp, FileText } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

function EligiblePatientsModal({ trial, onClose }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/entry-patient/trial/${trial.trial_id}`);
      const data = await res.json();
      if (data.success) setPatients(data.data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/entry-patient/${id}/accept`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setPatients(prev => prev.map(p => p._id === id ? { ...p, status: 'accepted' } : p));
      }
    } catch (err) {
      console.error('Accept failed:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/entry-patient/${id}/reject`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setPatients(prev => prev.map(p => p._id === id ? { ...p, status: 'rejected' } : p));
      }
    } catch (err) {
      console.error('Reject failed:', err);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'accepted') return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">Accepted</span>;
    if (status === 'rejected') return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 ring-1 ring-red-200">Rejected</span>;
    return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 ring-1 ring-amber-200">Pending</span>;
  };

  return (
    <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden fade-in" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-5">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{trial.trialName}</h2>
              <p className="text-sm text-sky-100">Eligible patients for this trial</p>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="p-6 space-y-3 overflow-y-auto max-h-[65vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
            </div>
          ) : patients.length > 0 ? (
            patients.map((patient) => (
              <div key={patient._id} className="rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all">
                {/* Patient Row */}
                <div className="flex items-center gap-4 p-4 bg-slate-50">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-sky-700">{patient.patientName ? patient.patientName[0].toUpperCase() : '#'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{patient.patientName || 'Unknown'}</p>
                    <p className="text-xs text-slate-400">{patient.patient_id} · Score: <span className={`font-bold ${
                      patient.score >= 90 ? 'text-emerald-600' : patient.score >= 70 ? 'text-sky-600' : 'text-amber-600'
                    }`}>{patient.score}%</span></p>
                  </div>

                  {/* Status Badge */}
                  {getStatusBadge(patient.status)}

                  {/* Accept / Reject */}
                  {patient.status === 'pending' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAccept(patient._id)}
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                        title="Accept"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleReject(patient._id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => setExpandedId(expandedId === patient._id ? null : patient._id)}
                    className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 transition-colors"
                  >
                    {expandedId === patient._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedId === patient._id && (
                  <div className="px-4 pb-4 pt-2 bg-white border-t border-slate-100 space-y-3">
                    {/* Detail */}
                    {patient.detail && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Detail</p>
                        <p className="text-sm text-slate-600">{patient.detail}</p>
                      </div>
                    )}

                    {/* Score Bar */}
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Match Score</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              patient.score >= 90 ? 'bg-emerald-500' : patient.score >= 70 ? 'bg-sky-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${patient.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{patient.score}%</span>
                      </div>
                    </div>

                    {/* PDF Link */}
                    {patient.pdfFilePath && (
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Report</p>
                        <a
                          href={`${API_BASE}/${patient.pdfFilePath.replace(/\\/g, '/')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-lg transition-all"
                        >
                          <FileText className="w-4 h-4" />
                          View PDF Report
                        </a>
                      </div>
                    )}

                    {/* Timestamps */}
                    <p className="text-xs text-slate-400">
                      Added: {new Date(patient.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400 text-center py-12">No eligible patients found for this trial.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClinicalTrials() {
  const [trials, setTrials] = useState([]);
  const [entryCounts, setEntryCounts] = useState({});
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all trials
      const trialsRes = await fetch(`${API_BASE}/api/trials`);
      const trialsData = await trialsRes.json();

      // Fetch all entry patients for counts
      const entriesRes = await fetch(`${API_BASE}/api/entry-patient`);
      const entriesData = await entriesRes.json();

      if (trialsData.success) setTrials(trialsData.data);

      // Count entries per trial_id
      if (entriesData.success) {
        const counts = {};
        entriesData.data.forEach(entry => {
          counts[entry.trial_id] = (counts[entry.trial_id] || 0) + 1;
        });
        setEntryCounts(counts);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Clinical Trials</h1>
        <p className="text-sm text-slate-500 mt-1">{trials.length} trials in the system</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      ) : trials.length === 0 ? (
        <div className="text-center py-20">
          <FlaskConical className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">No clinical trials yet.</p>
          <p className="text-sm text-slate-400 mt-1">Create your first trial from the Dashboard.</p>
        </div>
      ) : (
        /* Trial Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trials.map((trial, i) => {
            const eligibleCount = entryCounts[trial.trial_id] || 0;

            return (
              <div
                key={trial._id}
                className={`fade-in stagger-${(i % 4) + 1} bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col`}
                style={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-100 to-purple-100">
                    <FlaskConical className="w-5 h-5 text-violet-600" />
                  </div>
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full ring-1 ring-sky-200">
                    {trial.trial_id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-800 mb-1 leading-snug">{trial.trialName}</h3>
                <p className="text-xs text-slate-400 mb-4">{trial.disease}</p>

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
                    <span className="text-slate-500">{trial.minAge} – {trial.maxAge} years</span>
                  </div>
                </div>

                {/* Inclusion / Exclusion */}
                {(trial.inclusions || trial.exclusions) && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {trial.inclusions && (
                      <div>
                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Inclusion</p>
                        <p className="text-xs text-slate-500 line-clamp-2">{trial.inclusions}</p>
                      </div>
                    )}
                    {trial.exclusions && (
                      <div>
                        <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Exclusion</p>
                        <p className="text-xs text-slate-500 line-clamp-2">{trial.exclusions}</p>
                      </div>
                    )}
                  </div>
                )}

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
      )}

      {/* Modal */}
      {selectedTrial && (
        <EligiblePatientsModal
          trial={selectedTrial}
          onClose={() => setSelectedTrial(null)}
        />
      )}
    </div>
  );
}
