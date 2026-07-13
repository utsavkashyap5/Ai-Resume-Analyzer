import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main tracking-tight leading-tight">
            Ready to Improve Your Resume?
          </h2>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto">
            Upload your resume today and receive an AI-powered ATS report within
            seconds. No credit card required.
          </p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-base font-medium rounded-xl transition-colors duration-300 hover:bg-primary-hover"
            >
              Analyze My Resume
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
