import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0 ${
              isSuccess
                ? 'bg-[#080A0E]/95 border-[#00FFDF]/40 text-white'
                : isError
                ? 'bg-[#080A0E]/95 border-red-500/40 text-white'
                : 'bg-[#080A0E]/95 border-[#7F27FF]/40 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 size={18} className="text-[#00FFDF] shrink-0" />}
              {isError && <AlertCircle size={18} className="text-red-400 shrink-0" />}
              {!isSuccess && !isError && <Info size={18} className="text-[#7F27FF] shrink-0" />}
              <span className="text-sm font-paragraph font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/40 hover:text-white p-1 ml-2 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
