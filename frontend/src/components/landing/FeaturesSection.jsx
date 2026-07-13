import { motion } from "framer-motion";
import {
  Gauge,
  ListChecks,
  Sparkles,
  Target,
  Percent,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Gauge,
    title: "ATS Score Analysis",
    description:
      "Comprehensive analysis of your resume's ATS compatibility with a precise score and detailed breakdown.",
  },
  {
    icon: ListChecks,
    title: "Keyword Gap Detection",
    description:
      "Identify missing keywords from job descriptions and optimize your resume to pass ATS filters.",
  },
  {
    icon: Sparkles,
    title: "AI Resume Suggestions",
    description:
      "Get intelligent, actionable suggestions to improve your resume content, structure, and impact.",
  },
  {
    icon: Target,
    title: "Skills Gap Analysis",
    description:
      "Compare your skills against job requirements and discover exactly what you need to add.",
  },
  {
    icon: Percent,
    title: "Job Match Score",
    description:
      "See how well your resume matches specific job descriptions with a detailed compatibility percentage.",
  },
  {
    icon: Shield,
    title: "Secure PDF Upload",
    description:
      "Your documents are encrypted and processed securely. We never share your data with third parties.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-papaya">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-main tracking-tight">
            Everything You Need
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Powerful tools to optimize your resume and land more interviews.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 border border-line"
              whileHover={{
                y: -6,
                boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                borderColor: "#D4A373",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-main mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
