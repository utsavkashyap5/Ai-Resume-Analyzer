import { motion } from "framer-motion";
import { Upload, ClipboardPaste, Brain, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Drag and drop your PDF resume securely. Files are encrypted in transit and at rest.",
  },
  {
    icon: ClipboardPaste,
    title: "Paste Job Description",
    description: "Copy and paste the job description you're targeting for analysis.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our AI compares your resume against the job description, checking ATS compatibility.",
  },
  {
    icon: FileCheck,
    title: "Instant ATS Report",
    description: "Receive a detailed report with scores, keyword gaps, and actionable suggestions.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-main tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Get your ATS analysis in four simple steps.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col lg:flex-1 items-center">
              <motion.div
                variants={stepVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white text-xs font-bold mb-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-main mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center px-4 pt-8">
                  <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A373"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ x: -5, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </motion.svg>
                </div>
              )}

              {index < steps.length - 1 && (
                <div className="flex lg:hidden flex-col items-center py-3">
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A373"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ y: -5, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </motion.svg>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
