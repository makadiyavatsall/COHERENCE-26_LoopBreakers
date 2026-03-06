import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import ClinicalTrials from './pages/ClinicalTrials';
import Matches from './pages/Matches';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div className="min-h-screen bg-healthcare-bg">
      <Sidebar />
      <Navbar />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/clinical-trials" element={<ClinicalTrials />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
