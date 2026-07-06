import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';

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
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading} aria-label="Confirm delete">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
