import { motion } from "framer-motion";

const radius = 36;
const circumference = 2 * Math.PI * radius;
const score = 85;
const offset = circumference * (1 - score / 100);

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function DashboardMockup() {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative bg-white rounded-2xl shadow-xl border border-line p-5 overflow-hidden">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="bg-cream rounded-xl p-4 flex flex-col items-center"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            <p className="text-xs text-muted font-medium mb-2">ATS Score</p>
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r={radius}
                fill="none" stroke="#E8DDD0" strokeWidth="6"
              />
              <motion.circle
                cx="50" cy="50" r={radius}
                fill="none" stroke="#D4A373" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                transform="rotate(-90 50 50)"
              />
              <motion.text
                x="50" y="48" textAnchor="middle"
                fill="#2D2A26" fontSize="26" fontWeight="700"
                fontFamily="Inter, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {score}
              </motion.text>
              <text
                x="50" y="62" textAnchor="middle"
                fill="#6B665F" fontSize="10"
                fontFamily="Inter, sans-serif"
              >
                /100
              </text>
            </svg>
          </motion.div>

          <motion.div
            className="bg-papaya rounded-xl p-4 flex flex-col justify-center"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            <p className="text-xs text-muted font-medium mb-1">Resume Strength</p>
            <span className="text-2xl font-bold text-main">Strong</span>
            <div className="w-full h-1.5 bg-line rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-muted mt-1">78% match rate</p>
          </motion.div>

          <motion.div
            className="bg-cream rounded-xl p-4"
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            <p className="text-xs text-muted font-medium mb-2">Matched Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {["React", "Node.js", "Python"].map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-papaya rounded-xl p-4"
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            <p className="text-xs text-muted font-medium mb-2">Missing Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {["TypeScript", "AWS", "Docker"].map((kw) => (
                <span
                  key={kw}
                  className="text-xs px-2 py-0.5 bg-red-100 text-red-500 rounded-full font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-3 bg-cream rounded-xl p-4"
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.3 } }}
        >
          <p className="text-xs text-muted font-medium mb-1">AI Suggestions</p>
          <p className="text-sm text-main">
            Add quantifiable achievements to strengthen your experience section.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute -bottom-2 -right-2 w-full h-full border-2 border-primary/20 rounded-2xl -z-10"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
