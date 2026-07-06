import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="h-14 sm:h-16 bg-[#FFFCF7] border-b border-[#E8DDD0] flex items-center justify-between px-3 sm:px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg text-[#6B665F] hover:bg-[#F8F5F0] transition-colors lg:hidden focus-visible:outline-2 focus-visible:outline-[#8B5E3C]"
        aria-label="Open sidebar menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-3">
        {user && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[#2D2A26]">{user.fullName}</p>
              <p className="text-xs text-[#6B665F]">{user.email}</p>
            </div>
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B5E3C] flex items-center justify-center text-white text-xs sm:text-sm font-medium select-none"
              aria-label={user.fullName}
            >
              {getInitials(user.fullName)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
