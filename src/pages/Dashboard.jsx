import { useState, useEffect } from 'react';
import { Users, FlaskConical, GitCompareArrows, TrendingUp, ArrowUpRight, Plus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NewTrialModal from '../components/NewTrialModal';
import Toast from '../components/Toast';

const API_BASE = 'http://localhost:5000';

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
        <p className="text-lg font-bold text-sky-600">{payload[0].value} trials</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [showNewTrial, setShowNewTrial] = useState(false);
  const [toast, setToast] = useState(null);
  const [trials, setTrials] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trialsRes, entriesRes] = await Promise.all([
        fetch(`${API_BASE}/api/trials`),
        fetch(`${API_BASE}/api/entry-patient`),
      ]);
      const trialsData = await trialsRes.json();
      const entriesData = await entriesRes.json();

      if (trialsData.success) setTrials(trialsData.data);
      if (entriesData.success) setEntries(entriesData.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTrialSubmit = async (data) => {
    try {
      const token = localStorage.getItem('mediwell_token');
      const response = await fetch(`${API_BASE}/api/trials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setToast({ message: `Trial created successfully! ID: ${result.data.trial_id}`, type: 'success' });
        fetchData(); // Refresh data
      } else {
        setToast({ message: `Error: ${result.message}`, type: 'error' });
      }
    } catch (error) {
      setToast({ message: `Failed to connect to server: ${error.message}`, type: 'error' });
    }
  };

  // Build stats from real data
  const totalPatients = entries.length;
  const activeTrials = trials.length;
  const eligibleMatches = entries.filter(e => e.status === 'accepted').length;
  const thisMonth = new Date().getMonth();
  const newTrialsThisMonth = trials.filter(t => new Date(t.createdAt).getMonth() === thisMonth).length;

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients,
      icon: Users,
      gradient: 'from-sky-500 to-cyan-400',
      shadow: 'shadow-sky-200',
    },
    {
      title: 'Active Clinical Trials',
      value: activeTrials,
      icon: FlaskConical,
      gradient: 'from-violet-500 to-purple-400',
      shadow: 'shadow-violet-200',
    },
    {
      title: 'Accepted Matches',
      value: eligibleMatches,
      icon: GitCompareArrows,
      gradient: 'from-emerald-500 to-teal-400',
      shadow: 'shadow-emerald-200',
    },
    {
      title: 'New Trials This Month',
      value: newTrialsThisMonth,
      icon: TrendingUp,
      gradient: 'from-amber-500 to-orange-400',
      shadow: 'shadow-amber-200',
    },
  ];

  // Build chart data from trials by month
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chartData = (() => {
    const counts = {};
    trials.forEach(t => {
      const d = new Date(t.createdAt);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([month, trials]) => ({ month, trials })).slice(-7);
  })();

  // Recent entries (last 6)
  const recentEntries = entries.slice(0, 6);

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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
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
                    <span className="flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg text-emerald-700 bg-emerald-50">
                      <ArrowUpRight className="w-3 h-3" />
                      Live
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

          {/* Chart + Recent Entries */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Chart */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Trials Created Over Time</h2>
                  <p className="text-sm text-slate-500">Monthly clinical trials trend</p>
                </div>
                <span className="text-xs font-medium text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg">
                  {chartData.length > 0 ? `Last ${chartData.length} months` : 'No data yet'}
                </span>
              </div>
              <div className="h-72">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="matchGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="trials"
                        stroke="#0ea5e9"
                        strokeWidth={2.5}
                        fill="url(#matchGradient)"
                        dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-slate-400">
                    No trial data yet. Create your first trial!
                  </div>
                )}
              </div>
            </div>

            {/* Recent Entries */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Recent Entries</h2>
                  <p className="text-sm text-slate-500">Latest patient entries</p>
                </div>
              </div>
              <div className="space-y-3">
                {recentEntries.length > 0 ? recentEntries.map((entry, i) => (
                  <div key={entry._id || i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-sky-700">{entry.patient_id?.split('-')[1] || '#'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700 truncate">{entry.patient_id}</p>
                      <p className="text-xs text-slate-400 truncate">Trial: {entry.trial_id}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getScoreColor(entry.score)}`}>
                        {entry.score}%
                      </span>
                      <p className={`text-[10px] font-semibold mt-1 ${
                        entry.status === 'accepted' ? 'text-emerald-600' : entry.status === 'rejected' ? 'text-red-500' : 'text-amber-600'
                      }`}>
                        {entry.status?.toUpperCase()}
                      </p>
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400 text-center py-8">No patient entries yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

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
