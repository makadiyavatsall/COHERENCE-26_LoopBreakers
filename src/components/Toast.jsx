import { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[100] fade-in">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-lg max-w-md ${
        type === 'success'
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-800'
          : 'bg-red-50/90 border-red-200 text-red-800'
      }`}>
        {type === 'success'
          ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        }
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-2 p-1 rounded-lg hover:bg-black/5 transition-colors flex-shrink-0">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
