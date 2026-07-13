import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Globe, Code2, Mail } from "lucide-react";

const links = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "GitHub", href: "#", icon: Code2 },
  { label: "LinkedIn", href: "#", icon: Globe },
  { label: "Contact", href: "#", icon: Mail },
];

export default function Footer() {
  return (
    <motion.footer
      className="py-12 px-6 bg-main"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-white text-lg tracking-tight">
              HireMatch
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-1.5"
              >
                {link.icon && <link.icon className="w-3.5 h-3.5" />}
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} HireMatch. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
