import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

const ALLOWED_TYPE = 'application/pdf';

const UploadDropzone = ({ onUpload, disabled }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const validateFile = useCallback((f) => {
    if (!f) return 'No file selected';
    if (f.type !== ALLOWED_TYPE) return 'Only PDF files are accepted';
    if (f.size > 10 * 1024 * 1024) return 'File must be under 10MB';
    return '';
  }, []);

  const handleFile = useCallback(async (f) => {
    const err = validateFile(f);
    if (err) {
      setError(err);
      setStatus('error');
      return;
    }
    setError('');
    setFile(f);
    setUploading(true);
    setStatus('uploading');
    setProgress(0);

    try {
      await onUpload(f, (e) => {
        if (e.total > 0) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
      setStatus('success');
    } catch (e) {
      setError(e.message || 'Upload failed');
      setStatus('error');
      setFile(null);
    } finally {
      setUploading(false);
    }
  }, [onUpload, validateFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleChange = useCallback((e) => {
    const f = e.target.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const reset = useCallback(() => {
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleClick = () => {
    if (disabled || uploading) return;
    inputRef.current?.click();
  };

  const isDisabled = disabled || uploading;

  return (
    <div>
      <motion.div
        initial={false}
        animate={
          status === 'success'
            ? { borderColor: '#4F7D5C' }
            : status === 'error'
            ? { borderColor: '#C65A5A' }
            : dragOver
            ? { borderColor: '#D4A373', backgroundColor: '#FAEDCD' }
            : { borderColor: '#E8DDD0' }
        }
        onDragOver={(e) => { e.preventDefault(); if (!disabled && !uploading) setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
        role="button"
        tabIndex={0}
        aria-label={status === 'success' ? `Uploaded ${file?.name}. Click to change file.` : 'Upload your resume PDF'}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-300',
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FAEDCD] hover:border-[#E7C8A0]',
          status === 'success' && 'border-[#4F7D5C] bg-[#4F7D5C]/5',
          status === 'error' && 'border-[#C65A5A] bg-[#C65A5A]/5',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          className="hidden"
          disabled={isDisabled}
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#4F7D5C]/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-[#4F7D5C]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2D2A26]">{file?.name}</p>
                <p className="text-xs text-[#6B665F] mt-0.5">Upload successful</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); reset(); }}
                className="text-xs text-[#6B665F] hover:text-[#C65A5A] underline transition-colors"
              >
                Remove and re-upload
              </button>
            </motion.div>
          ) : status === 'uploading' ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-[#D4A373]/10 flex items-center justify-center">
                <FileText className="w-7 h-7 text-[#D4A373]" />
              </div>
              <p className="text-sm text-[#6B665F]">Uploading {file?.name}...</p>
              <div className="w-full max-w-xs h-2 rounded-full bg-[#E8DDD0] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full bg-[#D4A373]"
                />
              </div>
              <p className="text-xs text-[#6B665F] tabular-nums">{progress}%</p>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div
              key="error"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#C65A5A]/10 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-[#C65A5A]" />
              </div>
              <p className="text-sm text-[#C65A5A] font-medium">{error}</p>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); reset(); }}
                className="text-xs text-[#6B665F] hover:text-[#D4A373] underline transition-colors"
              >
                Try again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-[#FAEDCD] flex items-center justify-center"
                animate={dragOver ? { scale: 1.1, backgroundColor: '#D4A37320' } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="w-7 h-7 text-[#D4A373]" />
              </motion.div>
              <div>
                <p className="text-sm font-medium text-[#2D2A26]">
                  {dragOver ? 'Drop your file here' : 'Drop your resume here'}
                </p>
                <p className="text-xs text-[#6B665F] mt-1">
                  or click to browse &middot; PDF up to 10MB
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UploadDropzone;
