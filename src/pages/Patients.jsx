import { useState, useMemo } from 'react';
import { Search, Filter, Eye, ChevronDown } from 'lucide-react';
import { patients, getDiseases } from '../data/mockData';
import PatientModal from '../components/PatientModal';

export default function Patients() {
  const [search, setSearch] = useState('');
  const [diseaseFilter, setDiseaseFilter] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const diseases = getDiseases();

  const filtered = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch =
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.disease.toLowerCase().includes(search.toLowerCase()) ||
        p.conditions.some(c => c.toLowerCase().includes(search.toLowerCase()));
      const matchesDisease = diseaseFilter === 'All' || p.disease === diseaseFilter;
      return matchesSearch && matchesDisease;
    });
  }, [search, diseaseFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
          <p className="text-sm text-slate-500 mt-1">{patients.length} patients in the registry</p>
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
            placeholder="Search by patient ID, disease, or condition..."
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Patient ID</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Age</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Disease</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Conditions</th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient, i) => (
                <tr key={patient.id} className="border-b border-slate-50 hover:bg-sky-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">{patient.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.age}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">{patient.disease}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.map(c => (
                        <span key={c} className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      patient.status === 'Eligible'
                        ? 'text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200'
                        : 'text-red-700 bg-red-50 ring-1 ring-red-200'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-2 rounded-lg transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No patients found matching your criteria.</div>
        )}
      </div>

      {/* Patient Modal */}
      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}
