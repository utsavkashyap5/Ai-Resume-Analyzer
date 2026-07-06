import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: 'border-l-4 border-l-[#4F7D5C]',
  error: 'border-l-4 border-l-[#C65A5A]',
  info: 'border-l-4 border-l-[#8B5E3C]',
};

const ToastItem = ({ toast, onDismiss }) => {
  const Icon = icons[toast.type] || Info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg bg-[#FFFCF7] border border-[#E8DDD0] shadow-lg min-w-[320px] max-w-md',
        styles[toast.type]
      )}
    >
      <Icon className={cn(
        'w-5 h-5 mt-0.5 flex-shrink-0',
        toast.type === 'success' && 'text-[#4F7D5C]',
        toast.type === 'error' && 'text-[#C65A5A]',
        toast.type === 'info' && 'text-[#8B5E3C]',
      )} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#2D2A26]">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-[#6B665F] mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-0.5 rounded text-[#6B665F] hover:text-[#2D2A26] transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message, duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const toast = {
    success: (title, message) => addToast('success', title, message),
    error: (title, message) => addToast('error', title, message),
    info: (title, message) => addToast('info', title, message),
  };

  const dismiss = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
