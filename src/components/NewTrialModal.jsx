import { useState } from 'react';
import { X, FlaskConical } from 'lucide-react';

export default function NewTrialModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    trialName: '',
    disease: '',
    minAge: '',
    maxAge: '',
    inclusions: '',
    exclusions: '',
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ ...form });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">New Clinical Trial</h2>
              <p className="text-sm text-violet-100">Register a new trial for AI matching</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh] space-y-5">
          {/* Trial Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Trial Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.trialName}
              onChange={(e) => handleChange('trialName', e.target.value)}
              placeholder="e.g. Diabetes Drug Trial — Phase III"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
            />
          </div>

          {/* Disease */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Disease / Condition <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.disease}
              onChange={(e) => handleChange('disease', e.target.value)}
              placeholder="e.g. Type 2 Diabetes"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
            />
          </div>

          {/* Age Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Min Age <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                max="120"
                value={form.minAge}
                onChange={(e) => handleChange('minAge', e.target.value)}
                placeholder="e.g. 18"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Max Age <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                max="120"
                value={form.maxAge}
                onChange={(e) => handleChange('maxAge', e.target.value)}
                placeholder="e.g. 65"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all"
              />
            </div>
          </div>

          {/* Inclusion Criteria */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Inclusion Criteria
            </label>
            <textarea
              value={form.inclusions}
              onChange={(e) => handleChange('inclusions', e.target.value)}
              placeholder="Describe the inclusion criteria for this trial..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all resize-none"
            />
          </div>

          {/* Exclusion Criteria */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Exclusion Criteria
            </label>
            <textarea
              value={form.exclusions}
              onChange={(e) => handleChange('exclusions', e.target.value)}
              placeholder="Describe the exclusion criteria for this trial..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 py-3 rounded-xl shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-all"
            >
              <FlaskConical className="w-4 h-4" />
              Create Trial
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
