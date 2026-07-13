import Modal from '../common/Modal';
import { Loader2, AlertTriangle } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-[#C65A5A]/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-[#C65A5A]" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-[#2D2A26] mb-2" id="delete-modal-title">Delete Analysis</h3>
        <p className="text-sm text-[#6B665F] mb-6">
          Are you sure you want to delete this analysis? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium text-[#6B665F] hover:text-[#2D2A26] hover:bg-[#FAEDCD] rounded-xl transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2.5 text-sm font-medium bg-[#C65A5A] hover:bg-[#B04A4A] text-white rounded-xl transition-colors duration-200 flex items-center gap-2"
            aria-label="Confirm delete"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
