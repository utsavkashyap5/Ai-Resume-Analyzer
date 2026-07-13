import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

const stats = [
  {
    target: 98,
    suffix: "%",
    label: "Recruiters Use ATS",
    description:
      "Applicant Tracking Systems filter resumes before humans ever see them.",
  },
  {
    target: 75,
    suffix: "%",
    label: "Qualified Resumes Rejected",
    description:
      "Qualified candidates are rejected due to missing keywords and poor formatting.",
  },
  {
    target: 7,
    suffix: " seconds",
    label: "Average Review Time",
    description:
      "Recruiters spend just 6-8 seconds scanning a resume before deciding.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function InsightSection() {
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
            The Reality of Modern Hiring
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Understanding the numbers behind ATS-driven recruitment.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 border border-line text-center"
              whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-5xl sm:text-6xl font-bold text-primary mb-3">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
