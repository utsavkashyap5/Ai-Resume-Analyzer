import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];
  const { isAuthenticated, logout } = useAuth();
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${scrolled
        ? "bg-page-bg/80 backdrop-blur-xl border-b border-line"
        : "bg-transparent"
        }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-semibold text-main text-lg tracking-tight">
            HireMatch
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-main transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-sm font-medium px-4 py-2 bg-primary text-white rounded-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-main"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-page-bg border-b border-line overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted hover:text-main transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {
                isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-primary"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="text-left text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium text-primary"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-medium px-4 py-2 bg-primary text-white rounded-lg text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
