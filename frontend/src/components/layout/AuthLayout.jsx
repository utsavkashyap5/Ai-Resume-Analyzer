import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F5F0] flex flex-col">
      <div className="px-6 py-5">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8B5E3C] flex items-center justify-center">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-[#2D2A26]">HireMatch</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
