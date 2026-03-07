import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronDown, FlaskConical, Users, ShieldOff, ChevronUp } from 'lucide-react';

const API_BASE = 'http://localhost:5000';

export default function Patients() {
  const [search, setSearch] = useState('');
  const [diseaseFilter, setDiseaseFilter] = useState('All');
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchTrials();
  }, []);

  const fetchTrials = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/trials`);
      const data = await res.json();
      if (data.success) setTrials(data.data);
    } catch (err) {
      console.error('Failed to fetch trials:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique diseases for filter
  const diseases = useMemo(() => {
    const set = new Set(trials.map(t => t.disease));
    return [...set];
  }, [trials]);

  // Filter trials
  const filtered = useMemo(() => {
    return trials.filter(t => {
      const matchesSearch =
        t.trial_id?.toLowerCase().includes(search.toLowerCase()) ||
        t.trialName?.toLowerCase().includes(search.toLowerCase()) ||
        t.disease?.toLowerCase().includes(search.toLowerCase());
      const matchesDisease = diseaseFilter === 'All' || t.disease === diseaseFilter;
      return matchesSearch && matchesDisease;
    });
  }, [trials, search, diseaseFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Clinical Trials Registry</h1>
          <p className="text-sm text-slate-500 mt-1">{trials.length} trials in the registry</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by trial ID, name, or disease..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={diseaseFilter}
            onChange={(e) => setDiseaseFilter(e.target.value)}
            className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all cursor-pointer"
          >
            <option value="All">All Diseases</option>
            {diseases.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Table */
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Trial ID</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Trial Name</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Disease</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Age Range</th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Created</th>
                  <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((trial) => (
                  <>
                    <tr key={trial._id} className="border-b border-slate-50 hover:bg-sky-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">{trial.trial_id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-700">{trial.trialName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ShieldOff className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-sm text-slate-600">{trial.disease}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-sm text-slate-600">{trial.minAge} – {trial.maxAge} yrs</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(trial.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setExpandedId(expandedId === trial._id ? null : trial._id)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-lg transition-all"
                        >
                          {expandedId === trial._id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          {expandedId === trial._id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expandedId === trial._id && (
                      <tr key={`${trial._id}-details`} className="bg-slate-50/50">
                        <td colSpan="6" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {trial.inclusions && (
                              <div>
                                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Inclusion Criteria</p>
                                <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100">{trial.inclusions}</p>
                              </div>
                            )}
                            {trial.exclusions && (
                              <div>
                                <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Exclusion Criteria</p>
                                <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-100">{trial.exclusions}</p>
                              </div>
                            )}
                            {trial.screeningQuestions?.length > 0 && (
                              <div className="md:col-span-2">
                                <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-2">Screening Questions</p>
                                <div className="space-y-2">
                                  {trial.screeningQuestions.map((q, i) => (
                                    <div key={i} className="bg-white p-3 rounded-lg border border-slate-100">
                                      <p className="text-sm font-medium text-slate-700">{i + 1}. {q.question}</p>
                                      <p className="text-xs text-sky-600 mt-1">Answer: {q.expectedAnswer}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">No trials found matching your criteria.</div>
          )}
        </div>
      )}
    </div>
  );
}
