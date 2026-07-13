import { motion } from "framer-motion";
import { Filter, FileX, Tags, FileText } from "lucide-react";

const items = [
  {
    icon: Filter,
    title: "What is ATS?",
    description:
      "Applicant Tracking Systems are software used by 98% of Fortune 500 companies to filter, rank, and manage resumes before a recruiter ever sees them.",
  },
  {
    icon: FileX,
    title: "Why Resumes Get Rejected",
    description:
      "Missing keywords, poor formatting, unoptimized file types, and lack of job-specific tailoring are the top reasons ATS systems filter out qualified candidates.",
  },
  {
    icon: Tags,
    title: "Keyword Optimization",
    description:
      "Using the right keywords from the job description can increase your resume's match rate by over 70%, dramatically improving your chances of getting an interview.",
  },
  {
    icon: FileText,
    title: "Formatting Matters",
    description:
      "Clean, ATS-friendly formatting with standard section headings ensures your resume is parsed correctly and your qualifications are properly categorized.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EducationSection() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-main tracking-tight">
            Why ATS Matters
          </h2>
          <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
            Most companies use ATS software to filter resumes before they reach
            human eyes. Understanding how it works is the first step to getting
            hired.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 border border-line flex gap-5"
              whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.05)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-main mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
