import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <h1 className="text-7xl font-bold text-[#8B5E3C] mb-4">404</h1>
        <h2 className="text-xl font-semibold text-[#2D2A26] mb-2">Page not found</h2>
        <p className="text-sm text-[#6B665F] mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" icon={Home}>
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
