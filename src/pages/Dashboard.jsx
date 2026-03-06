import { useState } from 'react';
import { Users, FlaskConical, GitCompareArrows, TrendingUp, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { patients, clinicalTrials, matches, matchesOverTime, recentMatches } from '../data/mockData';
import NewTrialModal from '../components/NewTrialModal';
import Toast from '../components/Toast';

const stats = [
  {
    title: 'Total Patients',
    value: patients.length,
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'sky',
    gradient: 'from-sky-500 to-cyan-400',
    shadow: 'shadow-sky-200',
  },
  {
    title: 'Active Clinical Trials',
    value: clinicalTrials.length,
    change: '+3',
    trend: 'up',
    icon: FlaskConical,
    color: 'violet',
    gradient: 'from-violet-500 to-purple-400',
    shadow: 'shadow-violet-200',
  },
  {
    title: 'Eligible Matches',
    value: matches.reduce((acc, m) => acc + m.patients.length, 0),
    change: '+18%',
    trend: 'up',
    icon: GitCompareArrows,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-200',
  },
  {
    title: 'New Trials This Month',
    value: 3,
    change: '-1',
    trend: 'down',
    icon: TrendingUp,
    color: 'amber',
    gradient: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-200',
  },
];

function getScoreColor(score) {
  if (score >= 90) return 'text-emerald-600 bg-emerald-50';
  if (score >= 80) return 'text-sky-600 bg-sky-50';
  if (score >= 70) return 'text-amber-600 bg-amber-50';
  return 'text-red-600 bg-red-50';
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-100">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-lg font-bold text-sky-600">{payload[0].value} matches</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [showNewTrial, setShowNewTrial] = useState(false);
  const [toast, setToast] = useState(null);

  const handleTrialSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setToast({ message: `Trial created successfully! ID: ${result.data.trial_id}`, type: 'success' });
      } else {
        setToast({ message: `Error: ${result.message}`, type: 'error' });
      }
    } catch (error) {
      setToast({ message: `Failed to connect to server: ${error.message}`, type: 'error' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of clinical trial matching activity</p>
        </div>
        <button
          onClick={() => setShowNewTrial(true)}
          className="flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 px-5 py-2.5 rounded-xl shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Clinical Trial
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`fade-in stagger-${i + 1} bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default`}
              style={{ opacity: 0 }}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} ${stat.shadow} shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg ${
                  stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-extrabold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart + Recent Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Matches Over Time</h2>
              <p className="text-sm text-slate-500">Monthly AI-matched patients trend</p>
            </div>
            <span className="text-xs font-medium text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg">Last 7 months</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={matchesOverTime} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="matchGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="matches"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  fill="url(#matchGradient)"
                  dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Matches Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Matches</h2>
              <p className="text-sm text-slate-500">Latest AI results</p>
            </div>
          </div>
          <div className="space-y-3">
            {recentMatches.map((match, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-sky-700">{match.patientId.split('-')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{match.patientId}</p>
                  <p className="text-xs text-slate-400 truncate">{match.trialName}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getScoreColor(match.matchScore)}`}>
                  {match.matchScore}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Trial Modal */}
      {showNewTrial && (
        <NewTrialModal
          onClose={() => setShowNewTrial(false)}
          onSubmit={handleTrialSubmit}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
