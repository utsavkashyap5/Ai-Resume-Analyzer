import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import { useAuth } from "../../context/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={childVariants}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full w-fit"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            AI-Powered Resume Analysis
          </motion.span>

          <motion.h1
            variants={childVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-main tracking-tight leading-[1.08]"
          >
            Land More Interviews with{" "}
            <span className="text-primary">AI-Powered</span> Resume Intelligence
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg text-muted leading-relaxed max-w-lg"
          >
            HireMatch analyzes your resume against job descriptions, detects ATS
            compatibility issues, identifies missing keywords, and provides
            actionable AI suggestions to help you land more interviews.
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg overflow-hidden transition-colors duration-300 hover:bg-primary-hover"
            >
              <span className="relative z-10">Analyze Resume</span>

              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />

              <motion.span
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{
                  scale: 2,
                  opacity: 1,
                  transition: { duration: 0.4 },
                }}
              />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 border border-line text-main text-sm font-medium rounded-lg hover:bg-papaya transition-colors duration-200"
            >
              <Play className="w-4 h-4" />
              View Demo
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
