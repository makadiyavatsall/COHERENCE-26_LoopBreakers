import { Bell, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-slate-200 flex items-center justify-between px-8 z-20">
      {/* Left: Page context */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, trials..."
            className="w-72 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-300 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-slate-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-md shadow-sky-200 group-hover:shadow-lg group-hover:shadow-sky-300 transition-all">
            <span className="text-sm font-bold text-white">RM</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-700">Dr. Rohit Mali</p>
            <p className="text-xs text-slate-400">Researcher</p>
          </div>
        </div>
      </div>
    </header>
  );
}
