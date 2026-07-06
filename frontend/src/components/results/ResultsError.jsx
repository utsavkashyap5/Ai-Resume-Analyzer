import { useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import Button from '../common/Button';

const ResultsError = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-16 h-16 rounded-full bg-[#C65A5A]/10 flex items-center justify-center mb-4">
        <RefreshCw className="w-8 h-8 text-[#C65A5A]" />
      </div>
      <h3 className="text-lg font-semibold text-[#2D2A26] mb-1">Analysis data not found</h3>
      <p className="text-sm text-[#6B665F] text-center max-w-sm mb-6">
        {message || 'No analysis data was provided. Please run a new analysis from the dashboard.'}
      </p>
      <Button variant="primary" onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </div>
  );
};

export default ResultsError;
