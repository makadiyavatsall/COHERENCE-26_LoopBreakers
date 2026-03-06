import { useState } from 'react';
import { X, FlaskConical, Plus, Trash2 } from 'lucide-react';

export default function NewTrialModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    trialName: '',
    disease: '',
    minAge: '',
    maxAge: '',
    inclusions: [''],
    exclusions: [''],
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleListChange = (field, index, value) => {
    setForm(prev => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addListItem = (field) => {
    setForm(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeListItem = (field, index) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...form,
        inclusions: form.inclusions.filter(v => v.trim()),
        exclusions: form.exclusions.filter(v => v.trim()),
      });
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
            <div className="space-y-2">
              {form.inclusions.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListChange('inclusions', idx, e.target.value)}
                    placeholder={`Inclusion criterion ${idx + 1}`}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition-all"
                  />
                  {form.inclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem('inclusions', idx)}
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('inclusions')}
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Inclusion
              </button>
            </div>
          </div>

          {/* Exclusion Criteria */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Exclusion Criteria
            </label>
            <div className="space-y-2">
              {form.exclusions.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListChange('exclusions', idx, e.target.value)}
                    placeholder={`Exclusion criterion ${idx + 1}`}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all"
                  />
                  {form.exclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeListItem('exclusions', idx)}
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem('exclusions')}
                className="flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Exclusion
              </button>
            </div>
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
