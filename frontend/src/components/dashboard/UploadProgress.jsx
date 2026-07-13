import { motion } from 'framer-motion';
import { FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const UploadProgress = ({ status, fileName, progress, error, onRetry }) => {
  if (status === 'idle') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-4 rounded-lg border text-sm',
        status === 'uploading' && 'border-[#D4A373]/20 bg-[#D4A373]/5',
        status === 'success' && 'border-[#4F7D5C]/20 bg-[#4F7D5C]/5',
        status === 'error' && 'border-[#C65A5A]/20 bg-[#C65A5A]/5',
      )}
    >
      <div className="flex items-start gap-3">
        {status === 'uploading' && <Loader2 className="w-5 h-5 text-[#D4A373] animate-spin mt-0.5" />}
        {status === 'success' && <CheckCircle className="w-5 h-5 text-[#4F7D5C] mt-0.5" />}
        {status === 'error' && <AlertCircle className="w-5 h-5 text-[#C65A5A] mt-0.5" />}

        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#2D2A26]">
            {status === 'uploading' && 'Uploading...'}
            {status === 'success' && 'Upload successful'}
            {status === 'error' && 'Upload failed'}
          </p>
          {fileName && (
            <p className="text-[#6B665F] truncate mt-0.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
              {fileName}
            </p>
          )}
          {status === 'uploading' && progress > 0 && (
            <div className="mt-2 w-full max-w-xs h-1.5 rounded-full bg-[#E8DDD0] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-full bg-[#D4A373]"
              />
            </div>
          )}
          {status === 'error' && error && (
            <p className="text-[#C65A5A] text-xs mt-1">{error}</p>
          )}
        </div>

          {status === 'error' && onRetry && (
          <button
            onClick={onRetry}
            className="text-xs font-medium text-[#D4A373] hover:text-[#C89463] transition-colors whitespace-nowrap"
          >
            Retry
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default UploadProgress;
