import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  GitCompareArrows,
  Settings,
} from 'lucide-react';
import Logo from '../assets/Logo.svg';

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
        <img src={Logo} alt="Mediwell Logo" className="w-10 h-10 rounded-xl shadow-lg shadow-sky-200" />
        <div>
          <h1 className="text-lg font-bold text-slate-800 leading-tight">Mediwell</h1>
          <p className="text-[11px] font-medium text-sky-500 tracking-wide uppercase">Health Care</p>
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
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                ? 'bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1.5 rounded-lg transition-all ${isActive
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
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 leading-relaxed text-center">
          Built by{' '}
          <a href="https://rohit-mali-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            This Guy
          </a>
          {' '}· The source code is available on{' '}
          <a href="https://github.com/rohittt-29" target="_blank" rel="noopener noreferrer" className="font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            GitHub
          </a>
        </p>
      </div>
    </aside>
  );
}
