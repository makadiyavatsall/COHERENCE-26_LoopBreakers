import { Bell, Shield, Palette, Database, Globe } from 'lucide-react';

const settingSections = [
  {
    title: 'Notifications',
    description: 'Configure how you receive alerts and updates',
    icon: Bell,
    color: 'sky',
    settings: [
      { label: 'Email notifications for new matches', enabled: true },
      { label: 'Browser push notifications', enabled: false },
      { label: 'Weekly digest report', enabled: true },
    ],
  },
  {
    title: 'Privacy & Security',
    description: 'Manage data access and security preferences',
    icon: Shield,
    color: 'emerald',
    settings: [
      { label: 'Two-factor authentication', enabled: true },
      { label: 'Data anonymization in exports', enabled: true },
      { label: 'Audit logging', enabled: true },
    ],
  },
  {
    title: 'Appearance',
    description: 'Customize the look and feel of the dashboard',
    icon: Palette,
    color: 'violet',
    settings: [
      { label: 'Dark mode', enabled: false },
      { label: 'Compact table view', enabled: false },
      { label: 'Show animations', enabled: true },
    ],
  },
  {
    title: 'Data Sources',
    description: 'Manage connected data sources and APIs',
    icon: Database,
    color: 'amber',
    settings: [
      { label: 'Auto-sync patient records', enabled: true },
      { label: 'ClinicalTrials.gov integration', enabled: true },
      { label: 'EHR data import', enabled: false },
    ],
  },
];

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your platform preferences</p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {settingSections.map((section, i) => {
          const Icon = section.icon;
          const colorMap = {
            sky: 'from-sky-100 to-blue-100 text-sky-600',
            emerald: 'from-emerald-100 to-teal-100 text-emerald-600',
            violet: 'from-violet-100 to-purple-100 text-violet-600',
            amber: 'from-amber-100 to-orange-100 text-amber-600',
          };

          return (
            <div
              key={section.title}
              className={`fade-in stagger-${i + 1} bg-white rounded-2xl border border-slate-100 p-6`}
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorMap[section.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">{section.title}</h3>
                  <p className="text-xs text-slate-400">{section.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {section.settings.map((setting) => (
                  <div key={setting.label} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="text-sm text-slate-600">{setting.label}</span>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        setting.enabled ? 'bg-sky-500' : 'bg-slate-200'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                        setting.enabled ? 'left-[22px]' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* API Key Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 text-rose-600">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">API Configuration</h3>
            <p className="text-xs text-slate-400">Manage API keys and endpoints</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">AI Matching API Key</label>
            <div className="flex gap-2">
              <input
                type="password"
                value="sk-xxxx-xxxx-xxxx-xxxx-xxxx"
                readOnly
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 font-mono"
              />
              <button className="px-4 py-2.5 text-sm font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors">
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
