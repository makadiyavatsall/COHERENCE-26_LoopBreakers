import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  GitCompareArrows,
  Settings,
  Heart,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/patients', icon: Users, label: 'Patients' },
  { to: '/clinical-trials', icon: FlaskConical, label: 'Clinical Trials' },
  { to: '/matches', icon: GitCompareArrows, label: 'Matches' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-30 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-200">
          <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">ClinMatch</h1>
          <p className="text-[11px] font-medium text-sky-500 tracking-wide uppercase">AI Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 shadow-sm'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sky-100 text-sky-600'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  <Icon className="w-4.5 h-4.5" strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                <span>{label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
            <FlaskConical className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">AI Engine</p>
            <p className="text-[10px] text-emerald-600 font-medium">● Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
