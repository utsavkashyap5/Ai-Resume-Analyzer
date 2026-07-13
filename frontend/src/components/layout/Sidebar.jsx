import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Clock,
  User,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/results', label: 'Results', icon: FileText },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/profile', label: 'Profile', icon: User },
];

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      //
    }
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-[#FCF4D7] border-r border-[#E8DDD0] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-5 h-14 sm:h-16 border-b border-[#E8DDD0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D4A373] flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-[#2D2A26]">HireMatch</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B665F] hover:bg-[#FAEDCD] transition-colors lg:hidden focus-visible:outline-2 focus-visible:outline-[#D4A373]"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-[#D4A373]/10 text-[#D4A373] font-semibold'
                    : 'text-[#6B665F] hover:bg-[#FAEDCD] hover:text-[#2D2A26]'
                )
              }
              aria-label={item.label}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#E8DDD0]">
          {user && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-[#2D2A26] truncate">{user.fullName}</p>
              <p className="text-xs text-[#6B665F] truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[#6B665F] hover:bg-[#FAEDCD] hover:text-[#C65A5A] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C65A5A]"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </AnimatePresence>
  );
};

export default Sidebar;
